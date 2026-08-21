import { expect, test } from '@playwright/test';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const OdhinAdaptiveReporter = require('../../common/reporters/odhin-adaptive.reporter.cjs');
const enhancerModule = require('../../common/reporters/odhin-report-enhancer.cjs');

const createEmptyFeatureStat = enhancerModule.createEmptyFeatureStat as (name: string) => { name: string; totalTests: number };
const deriveFeatureName = enhancerModule.deriveFeatureName as (filePath: string) => string;

const odhinAdaptiveTest = OdhinAdaptiveReporter.__test__ as {
  addFailureSource: (
    test: { title: string },
    result: { status: string; errors: Array<{ message: string; stack?: string }> }
  ) => {
    errors: Array<{ message: string; stack?: string }>;
  };
  deriveFailureSource: (errorMessage: string) => string | null;
  isFinalResult: (status: string, retry: number, retries: number) => boolean;
  normalizeFinalStatus: (status: string, retry: number) => string;
  normalizeTestOutputMode: (raw: unknown) => true | false | 'only-on-failure';
  normalizeRuntimeHookTimeoutMs: (raw: unknown, fallbackMs: number) => number;
  withTimeout: <T>(promise: Promise<T>, timeoutMs: number) => Promise<T>;
  trimResult: (
    result: Record<string, unknown>,
    options: { lightweight: boolean; testOutputMode: true | false | 'only-on-failure' }
  ) => {
    nextResult: Record<string, unknown>;
    trimmedCounts: { output: number; heavyArtifacts: number };
  };
};

test.describe('odhin adaptive reporter', { tag: '@svc-internal' }, () => {
  test('adds an explicit source to session-capture setup failures before Odhín renders them', () => {
    const result = odhinAdaptiveTest.addFailureSource(
      { title: 'searches a global case' },
      {
        status: 'failed',
        errors: [
          {
            message: 'SessionCaptureError: IDAM login surface did not render within 20000ms',
            stack: 'SessionCaptureError: IDAM login surface did not render within 20000ms\n    at test',
          },
        ],
      }
    );

    expect(result.errors[0]).toMatchObject({
      message: expect.stringContaining('[Failure source: XUI/IDAM authentication session capture]'),
      stack: expect.stringContaining('[Failure source: XUI/IDAM authentication session capture]'),
    });
    expect(odhinAdaptiveTest.deriveFailureSource('Failed to fetch direct CCD event token (HTTP 504)')).toBe(
      'CCD Data Store direct event-token route: GET /data/caseworkers/:uid/jurisdictions/:jurisdiction/case-types/:caseType/event-triggers/:eventId/token'
    );
    expect(odhinAdaptiveTest.deriveFailureSource('Direct CCD case create failed with HTTP 504')).toBe(
      'CCD Data Store direct case-create route: POST /data/caseworkers/:uid/jurisdictions/:jurisdiction/case-types/:caseType/cases?ignore-warning=false'
    );
  });

  test('uses the test title to identify a generic external configuration failure', () => {
    const result = odhinAdaptiveTest.addFailureSource(
      { title: 'serves external configuration without authentication' },
      {
        status: 'failed',
        errors: [
          { message: 'ApiClientError: Request failed with status 503', stack: 'ApiClientError: Request failed with status 503' },
        ],
      }
    );

    expect(result.errors[0].stack).toContain('[Failure source: XUI external configuration route]');
  });

  test('identifies a session-reuse app-shell timeout as session capture infrastructure', () => {
    expect(
      odhinAdaptiveTest.deriveFailureSource(
        'App shell not detected within 60000ms\n    at waitForAuthenticatedAppShell (sessionCapture.ts:1067:9)'
      )
    ).toBe('XUI/IDAM authentication session capture');
  });

  test('normalizes test output mode inputs', () => {
    expect(odhinAdaptiveTest.normalizeTestOutputMode(undefined)).toBe('only-on-failure');
    expect(odhinAdaptiveTest.normalizeTestOutputMode('true')).toBe(true);
    expect(odhinAdaptiveTest.normalizeTestOutputMode('false')).toBe(false);
    expect(odhinAdaptiveTest.normalizeTestOutputMode('junk')).toBe('only-on-failure');
  });

  test('normalizes runtime hook timeout inputs', () => {
    expect(odhinAdaptiveTest.normalizeRuntimeHookTimeoutMs(undefined, 15000)).toBe(15000);
    expect(odhinAdaptiveTest.normalizeRuntimeHookTimeoutMs('2500', 15000)).toBe(2500);
    expect(odhinAdaptiveTest.normalizeRuntimeHookTimeoutMs('junk', 15000)).toBe(15000);
  });

  test('normalizes final status and final-attempt detection for grouped feature stats', () => {
    expect(odhinAdaptiveTest.normalizeFinalStatus('passed', 0)).toBe('passed');
    expect(odhinAdaptiveTest.normalizeFinalStatus('passed', 1)).toBe('flaky');
    expect(odhinAdaptiveTest.isFinalResult('failed', 0, 1)).toBe(false);
    expect(odhinAdaptiveTest.isFinalResult('failed', 1, 1)).toBe(true);
    expect(deriveFeatureName('/tmp/playwright_tests_new/integration/test/caseLinking/caseLinking.positive.spec.ts')).toBe(
      'caseLinking'
    );
    expect(createEmptyFeatureStat('caseFileView')).toMatchObject({ name: 'caseFileView', totalTests: 0 });
  });

  test('trims passed-test output and heavy artifacts in lightweight mode', () => {
    const { nextResult, trimmedCounts } = odhinAdaptiveTest.trimResult(
      {
        status: 'passed',
        stdout: [{ text: 'pass out' }],
        stderr: [{ text: 'pass err' }],
        steps: [{ title: 'step' }],
        attachments: [{ name: 'trace' }],
      },
      { lightweight: true, testOutputMode: 'only-on-failure' }
    );

    expect(nextResult.stdout).toEqual([]);
    expect(nextResult.stderr).toEqual([]);
    expect(nextResult.steps).toEqual([]);
    expect(nextResult.attachments).toEqual([]);
    expect(trimmedCounts).toEqual({ output: 1, heavyArtifacts: 1 });
  });

  test('keeps failure artifacts when only-on-failure mode is used', () => {
    const originalResult = {
      status: 'failed',
      stdout: [{ text: 'fail out' }],
      stderr: [{ text: 'fail err' }],
      steps: [{ title: 'step' }],
      attachments: [{ name: 'trace' }],
    };
    const { nextResult, trimmedCounts } = odhinAdaptiveTest.trimResult(originalResult, {
      lightweight: true,
      testOutputMode: 'only-on-failure',
    });

    expect(nextResult).toEqual(originalResult);
    expect(trimmedCounts).toEqual({ output: 0, heavyArtifacts: 0 });
  });

  test('keeps timed-out test artifacts when only-on-failure mode is used', () => {
    const timedOutResult = {
      status: 'timedOut',
      stdout: [{ text: 'timeout out' }],
      stderr: [{ text: 'timeout err' }],
      steps: [{ title: 'timeout step' }],
      attachments: [{ name: 'trace' }],
    };
    const { nextResult, trimmedCounts } = odhinAdaptiveTest.trimResult(timedOutResult, {
      lightweight: true,
      testOutputMode: 'only-on-failure',
    });

    expect(nextResult).toEqual(timedOutResult);
    expect(trimmedCounts).toEqual({ output: 0, heavyArtifacts: 0 });
  });

  test('times out stalled runtime hook promises', async () => {
    const stalledPromise = new Promise<never>(() => {});

    await expect(odhinAdaptiveTest.withTimeout(stalledPromise, 10)).rejects.toMatchObject({
      code: 'ODHIN_TIMEOUT',
    });
  });
});

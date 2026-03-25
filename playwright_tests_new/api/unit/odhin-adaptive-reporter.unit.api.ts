import { expect, test } from '@playwright/test';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const OdhinAdaptiveReporter = require('../../common/reporters/odhin-adaptive.reporter.cjs');

const odhinAdaptiveTest = OdhinAdaptiveReporter.__test__ as {
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

  test('times out stalled runtime hook promises', async () => {
    const stalledPromise = new Promise<never>(() => {});

    await expect(odhinAdaptiveTest.withTimeout(stalledPromise, 10)).rejects.toMatchObject({
      code: 'ODHIN_TIMEOUT',
    });
  });
});

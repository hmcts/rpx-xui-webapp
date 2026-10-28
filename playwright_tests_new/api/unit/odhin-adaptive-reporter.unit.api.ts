import { expect, test } from '@playwright/test';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const OdhinAdaptiveReporter = require('../../common/reporters/odhin-adaptive.reporter.cjs');
const enhancerModule = require('../../common/reporters/odhin-report-enhancer.cjs');

const createEmptyFeatureStat = enhancerModule.createEmptyFeatureStat as (name: string) => { name: string; totalTests: number };
const deriveFeatureName = enhancerModule.deriveFeatureName as (filePath: string) => string;
const enhanceDashboardHtml = enhancerModule.enhanceDashboardHtml as (
  html: string,
  featureStats: unknown[],
  evidenceEntries: unknown[],
  perfettoFiles: string[]
) => string;

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
  buildFailureMetadata: (test: unknown, result: unknown) => Record<string, unknown> | null;
  trimResult: (
    result: Record<string, unknown>,
    options: { lightweight: boolean; testOutputMode: true | false | 'only-on-failure'; trimFailedArtifacts?: boolean }
  ) => {
    nextResult: Record<string, unknown>;
    trimmedCounts: { output: number; heavyArtifacts: number };
  };
};

test.describe('odhin adaptive reporter', { tag: '@svc-internal' }, () => {
  test('links external Perfetto files even when no dashboard extensions are present', () => {
    const html = enhanceDashboardHtml('<html><body><main>Tests</main></body></html>', [], [], ['perfetto.json']);

    expect(html).toContain('href="../test-results/perfetto.json"');
  });

  test('preserves native optional columns for string and array configurations', () => {
    for (const testListColumns of ['group,retry', ['GROUP', 'RETRY']]) {
      let configured: string[] = [];
      new OdhinAdaptiveReporter({
        testListColumns,
        createInnerReporter: (options: { testListColumns: string[] }) => {
          configured = options.testListColumns;
          return {};
        },
      });
      expect(configured).toEqual(['GROUP', 'RETRY', 'PROJECT', 'FILE']);
    }
  });

  test('keeps retry metadata keyed to the Odhín modal target without altering final feature totals', async () => {
    const reporter = new OdhinAdaptiveReporter({ createInnerReporter: () => ({ onTestEnd() {} }), lightweight: true });
    const testCase = {
      id: 'project-scoped-id',
      retries: 1,
      tags: ['@integration'],
      location: { file: '/tmp/playwright_tests_new/integration/test/hearings/details.spec.ts' },
      annotations: [{ type: 'Failure location', description: 'hearingDetails.spec.ts:42:7' }],
    };
    await reporter.onTestEnd(testCase, { status: 'failed', retry: 0, duration: 2000, stdout: [], stderr: [] });
    await reporter.onTestEnd(testCase, { status: 'passed', retry: 1, duration: 1000, stdout: [], stderr: [] });
    expect(reporter.testMetadata).toHaveLength(2);
    expect(reporter.testMetadata[0]).toMatchObject({
      target: '#project-scoped-id-0',
      testId: 'project-scoped-id',
      feature: 'hearings',
      tags: ['@integration'],
      retry: 0,
      durationMs: 2000,
      status: 'failed',
      failure: {
        status: 'failed',
        classification: 'UNKNOWN',
        confidence: 'observed',
        failureLocation: 'hearingDetails.spec.ts:42:7',
      },
    });
    expect(reporter.testMetadata[1]).toEqual({
      target: '#project-scoped-id-1',
      testId: 'project-scoped-id',
      feature: 'hearings',
      tags: ['@integration'],
      retry: 1,
      durationMs: 1000,
      status: 'passed',
    });
    expect(reporter.featureStats.get('hearings')).toMatchObject({ totalTests: 1, flaky: 1, failed: 0 });
  });

  test('always externalises attachments, including when embedding is requested', () => {
    const receivedOptions: Array<Record<string, unknown>> = [];
    const createInnerReporter = (options: Record<string, unknown>) => {
      receivedOptions.push(options);
      return {};
    };

    new OdhinAdaptiveReporter({ createInnerReporter });
    new OdhinAdaptiveReporter({ createInnerReporter, embedAttachments: true });

    expect(receivedOptions[0]?.embedAttachments).toBe(false);
    expect(receivedOptions[1]?.embedAttachments).toBe(false);
  });

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
        stdout: ['pass out'],
        stderr: ['pass err'],
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

  test('trims failed Odhín payloads and bounds each output stream to 64 KiB', () => {
    const largeUnicodeOutput = '𐐷'.repeat(20_000);
    const originalResult = {
      status: 'failed',
      stdout: [largeUnicodeOutput],
      stderr: [Buffer.alloc(70_000, 65)],
      steps: [{ title: 'step' }],
      attachments: [{ name: 'trace' }],
    };
    const { nextResult, trimmedCounts } = odhinAdaptiveTest.trimResult(originalResult, {
      lightweight: false,
      testOutputMode: 'only-on-failure',
    });

    const stdoutText = (nextResult.stdout as string[])[0];
    const stderrBuffer = (nextResult.stderr as Buffer[])[0];
    expect(nextResult).not.toBe(originalResult);
    expect(Buffer.byteLength(stdoutText, 'utf8')).toBeLessThanOrEqual(64 * 1024);
    expect(stdoutText).not.toContain('�');
    expect(stderrBuffer.byteLength).toBeLessThanOrEqual(64 * 1024);
    expect(stderrBuffer.buffer.byteLength).toBeLessThanOrEqual(64 * 1024);
    expect(nextResult.steps).toEqual([{ title: 'step' }]);
    expect(nextResult.attachments).toEqual([]);
    expect(originalResult.steps).toHaveLength(1);
    expect(originalResult.attachments).toHaveLength(1);
    expect(trimmedCounts).toEqual({ output: 1, heavyArtifacts: 1 });
  });

  test('caps oversized string chunks before creating UTF-8 buffers', () => {
    const maxBytes = 64 * 1024;
    const oversizedOutput = 'x'.repeat(maxBytes * 16);
    const encodedStringLengths: number[] = [];
    const originalBufferFrom = Buffer.from;
    Buffer.from = new Proxy(originalBufferFrom, {
      apply(target, thisArg, args) {
        if (typeof args[0] === 'string') {
          encodedStringLengths.push(args[0].length);
        }
        return Reflect.apply(target, thisArg, args);
      },
    });

    try {
      const { nextResult } = odhinAdaptiveTest.trimResult(
        { status: 'failed', stdout: [oversizedOutput], stderr: [] },
        { lightweight: false, testOutputMode: 'only-on-failure' }
      );

      expect((nextResult.stdout as string[])[0]).toBe('x'.repeat(maxBytes));
      expect(encodedStringLengths.every((length) => length <= maxBytes)).toBe(true);
    } finally {
      Buffer.from = originalBufferFrom;
    }
  });

  test('does not split a three-byte UTF-8 character at the 64 KiB output boundary', () => {
    const maxBytes = 64 * 1024;
    const output = `${'a'.repeat(maxBytes - 2)}€`;
    const { nextResult } = odhinAdaptiveTest.trimResult(
      { status: 'failed', stdout: [output], stderr: [] },
      { lightweight: false, testOutputMode: 'only-on-failure' }
    );

    const stdoutText = (nextResult.stdout as string[])[0];
    expect(Buffer.byteLength(stdoutText, 'utf8')).toBeLessThanOrEqual(maxBytes);
    expect(stdoutText).not.toContain('�');
    expect(stdoutText).toBe('a'.repeat(maxBytes - 2));
  });

  test('does not split a three-byte UTF-8 character in a Buffer at the 64 KiB output boundary', () => {
    const maxBytes = 64 * 1024;
    const output = Buffer.from(`${'a'.repeat(maxBytes - 2)}€`);
    const { nextResult } = odhinAdaptiveTest.trimResult(
      { status: 'failed', stdout: [output], stderr: [] },
      { lightweight: false, testOutputMode: 'only-on-failure' }
    );

    const stdoutBuffer = (nextResult.stdout as Buffer[])[0];
    expect(stdoutBuffer.byteLength).toBeLessThanOrEqual(maxBytes);
    expect(stdoutBuffer.toString('utf8')).not.toContain('�');
    expect(stdoutBuffer.toString('utf8')).toBe('a'.repeat(maxBytes - 2));
  });

  test('preserves path-backed failure evidence and excludes body-backed attachments', async () => {
    let forwardedResult: Record<string, unknown> | undefined;
    const reporter = new OdhinAdaptiveReporter({
      lightweight: false,
      profile: false,
      createInnerReporter: () => ({
        onTestEnd: (_test: unknown, result: Record<string, unknown>) => {
          forwardedResult = result;
        },
      }),
    });
    const attachments = [
      {
        name: 'screenshot',
        contentType: 'image/png',
        path: '/tmp/playwright-results/failure.png',
        body: Buffer.alloc(256 * 1024),
      },
      { name: 'video', contentType: 'video/webm', path: '/tmp/playwright-results/failure.webm' },
      { name: 'trace', contentType: 'application/zip', path: '/tmp/playwright-results/failure-trace.zip' },
      { name: 'inline screenshot', contentType: 'image/png', body: Buffer.alloc(64 * 1024, 1) },
      { name: 'oversized screenshot', contentType: 'image/png', body: Buffer.alloc(2 * 1024 * 1024 + 1) },
      { name: 'inline summary', contentType: 'text/html', body: '<p>not an image</p>' },
      { name: 'second inline screenshot', contentType: 'image/png', body: Buffer.alloc(32 * 1024, 2) },
    ];
    const testCase = {
      title: 'failed with external evidence',
      id: 'path-backed-evidence',
      retries: 0,
      location: { file: 'case.spec.ts' },
    };

    for (const status of ['failed', 'timedOut', 'interrupted']) {
      const { nextResult } = odhinAdaptiveTest.trimResult(
        { status, stdout: [], stderr: [], steps: [{ title: 'step' }], attachments },
        { lightweight: false, testOutputMode: 'only-on-failure' }
      );
      expect
        .soft(
          (nextResult.attachments as Array<Record<string, unknown>>).map(({ name, contentType, path, body }) => ({
            name,
            contentType,
            path,
            hasBody: body !== undefined,
          }))
        )
        .toEqual([
          { name: 'screenshot', contentType: 'image/png', path: '/tmp/playwright-results/failure.png', hasBody: false },
          { name: 'video', contentType: 'video/webm', path: '/tmp/playwright-results/failure.webm', hasBody: false },
          { name: 'trace', contentType: 'application/zip', path: '/tmp/playwright-results/failure-trace.zip', hasBody: false },
        ]);
      expect(nextResult.steps).toEqual([{ title: 'step' }]);
    }

    await reporter.onTestEnd(testCase, {
      status: 'failed',
      retry: 0,
      stdout: [],
      stderr: [],
      attachments,
      steps: [{ title: 'step' }],
    });
    await reporter.flushInnerCallbacks();

    const forwardedAttachments = forwardedResult?.attachments as Array<{
      name: string;
      contentType: string;
      path?: string;
      body?: Buffer;
    }>;
    expect
      .soft(
        forwardedAttachments.map(({ name, contentType, path, body }) => ({
          name,
          contentType,
          path,
          hasBody: body !== undefined,
        }))
      )
      .toEqual([
        { name: 'screenshot', contentType: 'image/png', path: '/tmp/playwright-results/failure.png', hasBody: false },
        { name: 'video', contentType: 'video/webm', path: '/tmp/playwright-results/failure.webm', hasBody: false },
        { name: 'trace', contentType: 'application/zip', path: '/tmp/playwright-results/failure-trace.zip', hasBody: false },
      ]);
    expect(forwardedResult?.steps).toEqual([{ title: 'step' }]);
    expect.soft(JSON.stringify(forwardedResult)).not.toContain('oversized screenshot');
    expect.soft(JSON.stringify(forwardedResult)).not.toContain('inline summary');
  });

  test('bounds failed output in explicit full-output mode and suppresses raw streaming callbacks', async () => {
    const forwarded: string[] = [];
    let forwardedResult: Record<string, unknown> | undefined;
    const reporter = new OdhinAdaptiveReporter({
      lightweight: false,
      profile: false,
      testOutput: true,
      createInnerReporter: () => ({
        onStdOut: () => forwarded.push('stdout'),
        onStdErr: () => forwarded.push('stderr'),
        onTestEnd: (_test: unknown, result: Record<string, unknown>) => {
          forwarded.push('result');
          forwardedResult = result;
        },
      }),
    });
    const testCase = {
      title: 'failed with explicit full output',
      id: 'bounded-full-output',
      retries: 0,
      location: { file: 'case.spec.ts' },
    };
    const result = {
      status: 'failed',
      retry: 0,
      stdout: ['a'.repeat(32 * 1024), '😀'.repeat(20_000)],
      stderr: [Buffer.alloc(40_000, 66), Buffer.alloc(30_000, 67)],
      steps: [{ title: 'step' }],
    };

    await reporter.onStdOut('x'.repeat(70_000), testCase, result);
    await reporter.onStdErr(Buffer.alloc(70_000, 68), testCase, result);
    await reporter.onTestEnd(testCase, result);
    await reporter.flushInnerCallbacks();

    const stdout = forwardedResult?.stdout as Array<string | Buffer>;
    const stderr = forwardedResult?.stderr as Array<string | Buffer>;
    expect.soft(forwarded).toEqual(['result']);
    expect.soft(stdout.reduce((total, chunk) => total + Buffer.byteLength(chunk), 0)).toBeLessThanOrEqual(64 * 1024);
    expect.soft(stderr.reduce((total, chunk) => total + Buffer.byteLength(chunk), 0)).toBeLessThanOrEqual(64 * 1024);
    expect.soft(stdout.join('').includes('�')).toBe(false);
    expect.soft(forwardedResult?.steps).toEqual([{ title: 'step' }]);
  });

  test('keeps failed artifacts when trimming is explicitly disabled', () => {
    const originalResult = {
      status: 'failed',
      stdout: ['fail out'],
      stderr: ['fail err'],
      steps: [{ title: 'step' }],
      attachments: [
        {
          name: 'screenshot',
          contentType: 'image/png',
          path: '/tmp/playwright-results/failure.png',
          body: Buffer.from('sensitive screenshot data'),
        },
        { name: 'inline screenshot', contentType: 'image/png', body: Buffer.from('sensitive inline screenshot data') },
      ],
    };

    for (const status of ['failed', 'timedOut', 'interrupted']) {
      const result = { ...originalResult, status };
      const { nextResult, trimmedCounts } = odhinAdaptiveTest.trimResult(result, {
        lightweight: false,
        testOutputMode: 'only-on-failure',
        trimFailedArtifacts: false,
      });

      expect(nextResult).toEqual({
        ...result,
        attachments: [{ name: 'screenshot', contentType: 'image/png', path: '/tmp/playwright-results/failure.png' }],
      });
      expect(trimmedCounts).toEqual({ output: 0, heavyArtifacts: 1 });
    }
  });

  test('excludes body-backed attachments through the reporter when failure trimming is disabled', async () => {
    const forwardedResults: Array<Record<string, unknown>> = [];
    const reporter = new OdhinAdaptiveReporter({
      lightweight: false,
      profile: false,
      testOutput: true,
      trimFailedArtifacts: false,
      createInnerReporter: () => ({
        onTestEnd: (_test: unknown, result: Record<string, unknown>) => forwardedResults.push(result),
      }),
    });
    const path = '/tmp/playwright-results/failure-trace.zip';
    const attachments = [
      { name: 'trace', contentType: 'application/zip', path, body: Buffer.from('private trace body') },
      { name: 'screenshot', contentType: 'image/png', body: Buffer.from('private screenshot body') },
    ];

    const statuses = ['failed', 'timedOut', 'interrupted', 'passed'];
    for (const status of statuses) {
      await reporter.onTestEnd(
        { title: `failed with ${status}`, id: `failed-${status}`, retries: 0, location: { file: 'case.spec.ts' } },
        {
          status,
          retry: 0,
          duration: 10,
          stdout: ['retained stdout'],
          stderr: ['retained stderr'],
          steps: [{ title: 'retained step' }],
          attachments,
        }
      );
    }
    await reporter.flushInnerCallbacks();

    expect(forwardedResults).toHaveLength(statuses.length);
    for (const [index, status] of statuses.entries()) {
      expect(forwardedResults[index]).toMatchObject({
        status,
        stdout: ['retained stdout'],
        stderr: ['retained stderr'],
        steps: [{ title: 'retained step' }],
      });
      expect(
        (forwardedResults[index].attachments as Array<Record<string, unknown>>).map(
          ({ name, contentType, path: attachmentPath, body }) => ({
            name,
            contentType,
            path: attachmentPath,
            hasBody: body !== undefined,
          })
        )
      ).toEqual([{ name: 'trace', contentType: 'application/zip', path, hasBody: false }]);
      expect(JSON.stringify(forwardedResults[index])).not.toContain('private trace body');
      expect(JSON.stringify(forwardedResults[index])).not.toContain('private screenshot body');
    }
  });

  test('filters body-backed step attachments at every depth regardless of result status or failure trimming', async () => {
    const path = '/tmp/playwright-results/step-trace.zip';
    const nestedPath = '/tmp/playwright-results/nested-screenshot.png';
    const steps = [
      {
        title: 'outer step',
        duration: 10,
        category: 'test.step',
        attachments: [
          { name: 'inline screenshot', contentType: 'image/png', body: Buffer.from('private outer screenshot') },
          { name: 'path-backed trace', contentType: 'application/zip', path, body: Buffer.from('private outer trace') },
        ],
        steps: [
          {
            title: 'inner step',
            duration: 5,
            category: 'test.attach',
            attachments: [
              { name: 'nested inline screenshot', contentType: 'image/png', body: Buffer.from('private nested screenshot') },
              {
                name: 'nested path-backed screenshot',
                contentType: 'image/png',
                path: nestedPath,
                body: Buffer.from('private nested image'),
              },
            ],
          },
        ],
      },
    ];
    const expectedSteps = [
      {
        title: 'outer step',
        duration: 10,
        category: 'test.step',
        attachments: [{ name: 'path-backed trace', contentType: 'application/zip', path }],
        steps: [
          {
            title: 'inner step',
            duration: 5,
            category: 'test.attach',
            attachments: [{ name: 'nested path-backed screenshot', contentType: 'image/png', path: nestedPath }],
          },
        ],
      },
    ];

    for (const status of ['failed', 'timedOut', 'interrupted', 'passed']) {
      for (const trimFailedArtifacts of [true, false]) {
        let forwardedResult: Record<string, unknown> | undefined;
        const reporter = new OdhinAdaptiveReporter({
          lightweight: false,
          profile: false,
          testOutput: true,
          trimFailedArtifacts,
          createInnerReporter: () => ({
            onTestEnd: (_test: unknown, result: Record<string, unknown>) => {
              forwardedResult = result;
            },
          }),
        });

        await reporter.onTestEnd(
          {
            title: `${status} nested attachment`,
            id: `${status}-${trimFailedArtifacts}`,
            retries: 0,
            location: { file: 'case.spec.ts' },
          },
          { status, retry: 0, duration: 10, stdout: [], stderr: [], steps }
        );
        await reporter.flushInnerCallbacks();

        expect(forwardedResult?.steps).toEqual(expectedSteps);
        expect(JSON.stringify(forwardedResult)).not.toContain('private outer screenshot');
        expect(JSON.stringify(forwardedResult)).not.toContain('private outer trace');
        expect(JSON.stringify(forwardedResult)).not.toContain('private nested screenshot');
        expect(JSON.stringify(forwardedResult)).not.toContain('private nested image');
      }
    }
  });

  test('trims timed-out Odhín payloads without changing the test result status', () => {
    const timedOutResult = {
      status: 'timedOut',
      stdout: ['timeout out'],
      stderr: ['timeout err'],
      steps: [{ title: 'timeout step' }],
      attachments: [{ name: 'trace' }],
    };
    const { nextResult, trimmedCounts } = odhinAdaptiveTest.trimResult(timedOutResult, {
      lightweight: false,
      testOutputMode: 'only-on-failure',
    });

    expect(nextResult.status).toBe('timedOut');
    expect(nextResult.steps).toEqual([{ title: 'timeout step' }]);
    expect(nextResult.attachments).toEqual([]);
    expect(nextResult.stdout).toEqual(['timeout out']);
    expect(nextResult.stderr).toEqual(['timeout err']);
    expect(trimmedCounts).toEqual({ output: 0, heavyArtifacts: 1 });
  });

  test('does not forward streaming output in only-on-failure mode when final result carries the bounded copy', async () => {
    const forwarded: string[] = [];
    let forwardedResult: Record<string, unknown> | undefined;
    const reporter = new OdhinAdaptiveReporter({
      lightweight: false,
      profile: false,
      createInnerReporter: () => ({
        onStdOut: () => forwarded.push('stdout'),
        onStdErr: () => forwarded.push('stderr'),
        onTestEnd: (_test: unknown, result: Record<string, unknown>) => {
          forwarded.push('result');
          forwardedResult = result;
        },
      }),
    });
    const testCase = {
      title: 'failed with bounded output',
      id: 'bounded-output',
      retries: 0,
      location: { file: 'case.spec.ts' },
    };
    const result = {
      status: 'failed',
      retry: 0,
      stdout: ['x'.repeat(70_000)],
      stderr: ['y'.repeat(70_000)],
      steps: [{ title: 'step' }],
      attachments: [{ name: 'trace' }],
    };

    await reporter.onStdOut('streamed output', testCase, result);
    await reporter.onStdErr('streamed error', testCase, result);
    await reporter.onTestEnd(testCase, result);
    await reporter.flushInnerCallbacks();

    expect(forwarded).toEqual(['result']);
    expect((forwardedResult?.stdout as string[])[0]).toHaveLength(64 * 1024);
    expect((forwardedResult?.stderr as string[])[0]).toHaveLength(64 * 1024);
    expect(forwardedResult?.steps).toEqual([{ title: 'step' }]);
    expect(forwardedResult?.attachments).toEqual([]);
    expect(result.steps).toHaveLength(1);
  });

  test('streams obey configured output policy: disabled mode suppresses a passing test', async () => {
    const forwarded: string[] = [];
    let forwardedResult: Record<string, unknown> | undefined;
    const reporter = new OdhinAdaptiveReporter({
      lightweight: false,
      profile: false,
      testOutput: false,
      trimFailedArtifacts: true,
      createInnerReporter: () => ({
        onStdOut: () => forwarded.push('stdout'),
        onStdErr: () => forwarded.push('stderr'),
        onTestEnd: (_test: unknown, result: Record<string, unknown>) => {
          forwarded.push('result');
          forwardedResult = result;
        },
      }),
    });
    const testCase = { title: 'passing with output disabled', id: 'output-disabled', retries: 0 };
    const result = { status: 'passed', retry: 0, stdout: ['captured stdout'], stderr: ['captured stderr'], steps: [] };

    await reporter.onStdOut('captured stdout', testCase, result);
    await reporter.onStdErr('captured stderr', testCase, result);
    await reporter.onTestEnd(testCase, result);
    await reporter.flushInnerCallbacks();

    expect(forwarded).toEqual(['result']);
    expect(forwardedResult).toMatchObject({ stdout: [], stderr: [] });
  });

  test('streams obey configured output policy: only-on-failure hides pass chunks when trimming is disabled', async () => {
    const forwarded: string[] = [];
    const forwardedResults: Record<string, unknown>[] = [];
    const reporter = new OdhinAdaptiveReporter({
      lightweight: false,
      profile: false,
      testOutput: 'only-on-failure',
      trimFailedArtifacts: false,
      createInnerReporter: () => ({
        onStdOut: () => forwarded.push('stdout'),
        onStdErr: () => forwarded.push('stderr'),
        onTestEnd: (_test: unknown, result: Record<string, unknown>) => {
          forwarded.push(`result:${result.status}`);
          forwardedResults.push(result);
        },
      }),
    });
    const passingTest = { title: 'passing in only-on-failure mode', id: 'only-on-failure-pass', retries: 0 };
    const passingResult = {
      status: 'passed',
      retry: 0,
      stdout: ['passing stdout'],
      stderr: ['passing stderr'],
      steps: [],
    };
    const failingTest = { title: 'failed in only-on-failure mode', id: 'only-on-failure-fail', retries: 0 };
    const failingResult = {
      status: 'failed',
      retry: 0,
      stdout: ['failure stdout'],
      stderr: ['failure stderr'],
      steps: [],
    };

    await reporter.onStdOut('passing stdout', passingTest, passingResult);
    await reporter.onStdErr('passing stderr', passingTest, passingResult);
    await reporter.onTestEnd(passingTest, passingResult);
    await reporter.onStdOut('failure stdout', failingTest, failingResult);
    await reporter.onStdErr('failure stderr', failingTest, failingResult);
    await reporter.onTestEnd(failingTest, failingResult);
    await reporter.flushInnerCallbacks();

    expect(forwarded).toEqual(['result:passed', 'result:failed']);
    expect(forwardedResults[0]).toMatchObject({ stdout: [], stderr: [] });
    expect(forwardedResults[1]).toMatchObject({ stdout: ['failure stdout'], stderr: ['failure stderr'] });
  });

  test('streams obey configured output policy: explicit full-output mode retains stream callbacks', async () => {
    const forwarded: string[] = [];
    const reporter = new OdhinAdaptiveReporter({
      lightweight: false,
      profile: false,
      testOutput: true,
      trimFailedArtifacts: false,
      createInnerReporter: () => ({
        onStdOut: () => forwarded.push('stdout'),
        onStdErr: () => forwarded.push('stderr'),
        onTestEnd: () => forwarded.push('result'),
      }),
    });
    const testCase = { title: 'passing with full output', id: 'full-output-pass', retries: 0 };
    const result = { status: 'passed', retry: 0, stdout: ['full stdout'], stderr: ['full stderr'], steps: [] };

    await reporter.onStdOut('full stdout', testCase, result);
    await reporter.onStdErr('full stderr', testCase, result);
    await reporter.onTestEnd(testCase, result);
    await reporter.flushInnerCallbacks();

    expect(forwarded).toEqual(['stdout', 'stderr', 'result']);
  });

  test('times out stalled runtime hook promises', async () => {
    const stalledPromise = new Promise<never>(() => {});

    await expect(odhinAdaptiveTest.withTimeout(stalledPromise, 10)).rejects.toMatchObject({
      code: 'ODHIN_TIMEOUT',
    });
  });
});

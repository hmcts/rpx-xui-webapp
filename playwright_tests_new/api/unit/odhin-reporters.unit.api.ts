import { expect, test } from '@playwright/test';

let OdhinProgressReporter: {
  new (options?: Record<string, unknown>): {
    onBegin: (config: unknown, suite: { allTests: () => unknown[] }) => void;
    onEnd: () => void;
    onExit: () => void;
  };
};
let OdhinAdaptiveReporter: {
  new (options?: Record<string, unknown>): {
    onTestEnd: (test: unknown, result: unknown) => Promise<void>;
    onEnd: (result: unknown) => Promise<void>;
    runtimeHookStats: { queued: number; completed: number; timedOut: number; failed: number };
  };
  __test__: {
    trimResult: (
      result: Record<string, unknown>,
      options: { lightweight: boolean; testOutputMode: true | false | 'only-on-failure' }
    ) => {
      nextResult: Record<string, unknown>;
      trimmedCounts: { output: number; heavyArtifacts: number };
    };
  };
};

test.describe.configure({ mode: 'serial' });

test.describe('Odhin reporter unit tests', { tag: '@svc-internal' }, () => {
  test.beforeAll(async () => {
    const progressModule = await import('../../common/reporters/odhin-progress.reporter.cjs');
    OdhinProgressReporter = (progressModule.default ?? progressModule) as typeof OdhinProgressReporter;

    const adaptiveModule = await import('../../common/reporters/odhin-adaptive.reporter.cjs');
    OdhinAdaptiveReporter = (adaptiveModule.default ?? adaptiveModule) as typeof OdhinAdaptiveReporter;
  });

  test('adaptive reporter trims passed-test output and heavy artifacts in lightweight mode', () => {
    const result = {
      status: 'passed',
      stdout: [{ text: 'stdout' }],
      stderr: [{ text: 'stderr' }],
      steps: [{ title: 'step' }],
      attachments: [{ name: 'trace.zip' }],
    };

    const { nextResult, trimmedCounts } = OdhinAdaptiveReporter.__test__.trimResult(result, {
      lightweight: true,
      testOutputMode: 'only-on-failure',
    });

    expect(nextResult).toMatchObject({
      stdout: [],
      stderr: [],
      steps: [],
      attachments: [],
    });
    expect(trimmedCounts).toEqual({
      output: 1,
      heavyArtifacts: 1,
    });
  });

  test('adaptive reporter preserves failed-test artifacts', () => {
    const result = {
      status: 'failed',
      stdout: [{ text: 'stdout' }],
      stderr: [{ text: 'stderr' }],
      steps: [{ title: 'step' }],
      attachments: [{ name: 'trace.zip' }],
    };

    const { nextResult, trimmedCounts } = OdhinAdaptiveReporter.__test__.trimResult(result, {
      lightweight: true,
      testOutputMode: 'only-on-failure',
    });

    expect(nextResult).toEqual(result);
    expect(trimmedCounts).toEqual({
      output: 0,
      heavyArtifacts: 0,
    });
  });

  test('progress reporter suppresses finalization logs when onExit happens before the grace window elapses', async () => {
    const reporter = new OdhinProgressReporter({
      enabled: true,
      graceMs: 50,
      intervalMs: 1000,
      hardTimeoutMs: 0,
    });
    const writes: string[] = [];
    const originalWrite = process.stdout.write.bind(process.stdout);
    process.stdout.write = ((chunk: string | Uint8Array) => {
      writes.push(String(chunk));
      return true;
    }) as typeof process.stdout.write;

    try {
      reporter.onBegin({}, { allTests: () => [1, 2, 3] });
      reporter.onEnd();
      await new Promise((resolve) => setTimeout(resolve, 10));
      reporter.onExit();
      await new Promise((resolve) => setTimeout(resolve, 60));
    } finally {
      process.stdout.write = originalWrite;
    }

    expect(writes).toEqual([]);
  });

  test('progress reporter emits finalization logs once the grace window is exceeded', async () => {
    const reporter = new OdhinProgressReporter({
      enabled: true,
      graceMs: 10,
      intervalMs: 1000,
      hardTimeoutMs: 0,
    });
    const writes: string[] = [];
    const originalWrite = process.stdout.write.bind(process.stdout);
    process.stdout.write = ((chunk: string | Uint8Array) => {
      writes.push(String(chunk));
      return true;
    }) as typeof process.stdout.write;

    try {
      reporter.onBegin({}, { allTests: () => [1] });
      reporter.onEnd();
      await new Promise((resolve) => setTimeout(resolve, 25));
      reporter.onExit();
    } finally {
      process.stdout.write = originalWrite;
    }

    expect(writes.some((entry) => entry.includes('Finalizing Odhin report'))).toBe(true);
    expect(writes.some((entry) => entry.includes('Odhin report completed'))).toBe(true);
  });

  test('adaptive reporter bounds stalled runtime hooks and still reaches onEnd', async () => {
    let onEndCalls = 0;
    const reporter = new OdhinAdaptiveReporter({
      profile: false,
      runtimeHookTimeoutMs: 20,
      createInnerReporter: () => ({
        onTestEnd: async () => new Promise(() => {}),
        onEnd: async () => {
          onEndCalls += 1;
        },
      }),
    });
    const stderrWrites: string[] = [];
    const originalWrite = process.stderr.write.bind(process.stderr);
    process.stderr.write = ((chunk: string | Uint8Array) => {
      stderrWrites.push(String(chunk));
      return true;
    }) as typeof process.stderr.write;

    try {
      await reporter.onTestEnd({ title: 'stalled test' }, { status: 'passed' });
      await reporter.onEnd({ status: 'passed' });
    } finally {
      process.stderr.write = originalWrite;
    }

    expect(onEndCalls).toBe(1);
    expect(reporter.runtimeHookStats).toMatchObject({
      queued: 1,
      completed: 0,
      timedOut: 1,
      failed: 0,
    });
    expect(stderrWrites.some((entry) => entry.includes('onTestEnd timed out'))).toBe(true);
  });
});

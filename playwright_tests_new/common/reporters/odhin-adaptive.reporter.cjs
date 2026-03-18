/* global clearTimeout, process, require, module, setTimeout */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const odhinModule = require('odhin-reports-playwright');

const OdhinReporter = odhinModule.default ?? odhinModule;

class OdhinAdaptiveReporter {
  constructor(options = {}) {
    this.options = options;
    const configuredLightweight = options.lightweight;
    const envLightweight = process.env.PW_ODHIN_LIGHTWEIGHT;
    this.lightweight =
      typeof configuredLightweight === 'boolean'
        ? configuredLightweight
        : envLightweight
          ? envLightweight.toLowerCase() === 'true'
          : !process.env.CI;

    const normalizeTestOutputMode = (raw) => {
      if (raw === true || raw === false) {
        return raw;
      }
      const normalized = String(raw ?? 'only-on-failure')
        .trim()
        .toLowerCase();
      if (normalized === 'true') {
        return true;
      }
      if (normalized === 'false') {
        return false;
      }
      return 'only-on-failure';
    };

    // Keep stdout/stderr only for failed tests in default mode.
    this.testOutputMode = normalizeTestOutputMode(options.testOutput);
    this.profileEnabled =
      typeof options.profile === 'boolean'
        ? options.profile
        : process.env.PW_ODHIN_PROFILE
          ? process.env.PW_ODHIN_PROFILE.toLowerCase() === 'true'
          : true;
    const configuredRuntimeHookTimeoutMs = options.runtimeHookTimeoutMs ?? process.env.PW_ODHIN_RUNTIME_HOOK_TIMEOUT_MS;
    this.runtimeHookTimeoutMs = normalizeRuntimeHookTimeoutMs(configuredRuntimeHookTimeoutMs, process.env.CI ? 0 : 15000);
    this.statusCounts = {
      passed: 0,
      failed: 0,
      skipped: 0,
      timedOut: 0,
      interrupted: 0,
      other: 0,
    };
    this.trimmedCounts = {
      output: 0,
      heavyArtifacts: 0,
    };
    this.runtimeHookStats = {
      queued: 0,
      completed: 0,
      timedOut: 0,
      failed: 0,
    };
    this.finalizationStartedAt = 0;
    this.pendingInnerCallbacks = Promise.resolve();
    this.inner =
      typeof options.createInnerReporter === 'function' ? options.createInnerReporter(options) : new OdhinReporter(options);
  }

  async onBegin(config, suite) {
    if (typeof this.inner.onBegin === 'function') {
      await this.inner.onBegin(config, suite);
    }
  }

  async onTestEnd(test, result) {
    if (typeof this.inner.onTestEnd !== 'function') {
      return;
    }

    let nextResult = result;
    const passedOrSkipped = result?.status === 'passed' || result?.status === 'skipped';
    const shouldTrimHeavyArtifacts = this.lightweight && passedOrSkipped;

    const shouldDropTestOutput = this.testOutputMode === false || (this.testOutputMode === 'only-on-failure' && passedOrSkipped);

    if (shouldTrimHeavyArtifacts || shouldDropTestOutput) {
      nextResult = { ...result };

      if (shouldDropTestOutput) {
        nextResult.stdout = [];
        nextResult.stderr = [];
        this.trimmedCounts.output += 1;
      }

      if (shouldTrimHeavyArtifacts) {
        nextResult.steps = [];
        nextResult.attachments = [];
        this.trimmedCounts.heavyArtifacts += 1;
      }
    }

    this.recordStatus(result?.status);
    this.enqueueInnerCallback('onTestEnd', () => this.inner.onTestEnd(test, nextResult), { test });
  }

  async onEnd(result) {
    this.finalizationStartedAt = Date.now();
    if (this.profileEnabled) {
      process.stdout.write(
        `[odhin-profile] Starting Odhin finalization statusCounts=${JSON.stringify(this.statusCounts)} trimmed=${JSON.stringify(this.trimmedCounts)} runtimeHooks=${JSON.stringify(this.runtimeHookStats)} lightweight=${this.lightweight} testOutput=${this.testOutputMode}\n`
      );
    }
    await this.flushInnerCallbacks();
    if (typeof this.inner.onEnd === 'function') {
      await this.inner.onEnd(result);
    }
    if (this.profileEnabled) {
      const elapsedMs = Math.max(0, Date.now() - this.finalizationStartedAt);
      process.stdout.write(`[odhin-profile] Completed Odhin finalization in ${elapsedMs}ms.\n`);
    }
  }

  async onStdOut(chunk, test, result) {
    if (typeof this.inner.onStdOut === 'function') {
      this.enqueueInnerCallback('onStdOut', () => this.inner.onStdOut(chunk, test, result), { test });
    }
  }

  async onStdErr(chunk, test, result) {
    if (typeof this.inner.onStdErr === 'function') {
      this.enqueueInnerCallback('onStdErr', () => this.inner.onStdErr(chunk, test, result), { test });
    }
  }

  recordStatus(status) {
    switch (status) {
      case 'passed':
        this.statusCounts.passed += 1;
        break;
      case 'failed':
        this.statusCounts.failed += 1;
        break;
      case 'skipped':
        this.statusCounts.skipped += 1;
        break;
      case 'timedOut':
        this.statusCounts.timedOut += 1;
        break;
      case 'interrupted':
        this.statusCounts.interrupted += 1;
        break;
      default:
        this.statusCounts.other += 1;
    }
  }

  enqueueInnerCallback(hookName, invoke, context = {}) {
    this.runtimeHookStats.queued += 1;
    const run = async () => {
      try {
        await withTimeout(Promise.resolve().then(invoke), this.runtimeHookTimeoutMs);
        this.runtimeHookStats.completed += 1;
      } catch (error) {
        if (isTimeoutError(error)) {
          this.runtimeHookStats.timedOut += 1;
          process.stderr.write(
            `[odhin-profile] ${hookName} timed out after ${this.runtimeHookTimeoutMs}ms${formatHookContext(context)}\n`
          );
          return;
        }
        this.runtimeHookStats.failed += 1;
        process.stderr.write(`[odhin-profile] ${hookName} failed${formatHookContext(context)}: ${formatErrorMessage(error)}\n`);
      }
    };
    this.pendingInnerCallbacks = this.pendingInnerCallbacks.then(run, run);
    return this.pendingInnerCallbacks;
  }

  async flushInnerCallbacks() {
    await this.pendingInnerCallbacks;
  }
}

const normalizeRuntimeHookTimeoutMs = (raw, fallbackMs) => {
  const parsed = Number.parseInt(String(raw ?? ''), 10);
  if (Number.isFinite(parsed) && parsed >= 0) {
    return parsed;
  }
  return fallbackMs;
};

const withTimeout = async (promise, timeoutMs) => {
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
    return promise;
  }
  let timer;
  try {
    return await Promise.race([
      promise,
      new Promise((_, reject) => {
        timer = setTimeout(
          () => reject(Object.assign(new Error(`Timed out after ${timeoutMs}ms`), { code: 'ODHIN_TIMEOUT' })),
          timeoutMs
        );
        timer.unref?.();
      }),
    ]);
  } finally {
    if (timer) {
      clearTimeout(timer);
    }
  }
};

const isTimeoutError = (error) => error?.code === 'ODHIN_TIMEOUT';

const formatErrorMessage = (error) => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

const formatHookContext = ({ test } = {}) => {
  const title =
    typeof test?.titlePath === 'function' ? test.titlePath().join(' > ') : typeof test?.title === 'string' ? test.title : '';
  return title ? ` test="${title}"` : '';
};

const exportedReporter = OdhinAdaptiveReporter;
exportedReporter.__test__ = {
  normalizeTestOutputMode(raw) {
    if (raw === true || raw === false) {
      return raw;
    }
    const normalized = String(raw ?? 'only-on-failure')
      .trim()
      .toLowerCase();
    if (normalized === 'true') {
      return true;
    }
    if (normalized === 'false') {
      return false;
    }
    return 'only-on-failure';
  },
  trimResult(result, { lightweight, testOutputMode }) {
    const reporter = {
      lightweight,
      testOutputMode,
      trimmedCounts: { output: 0, heavyArtifacts: 0 },
    };
    let nextResult = result;
    const passedOrSkipped = result?.status === 'passed' || result?.status === 'skipped';
    const shouldTrimHeavyArtifacts = reporter.lightweight && passedOrSkipped;
    const shouldDropTestOutput =
      reporter.testOutputMode === false || (reporter.testOutputMode === 'only-on-failure' && passedOrSkipped);

    if (shouldTrimHeavyArtifacts || shouldDropTestOutput) {
      nextResult = { ...result };

      if (shouldDropTestOutput) {
        nextResult.stdout = [];
        nextResult.stderr = [];
        reporter.trimmedCounts.output += 1;
      }

      if (shouldTrimHeavyArtifacts) {
        nextResult.steps = [];
        nextResult.attachments = [];
        reporter.trimmedCounts.heavyArtifacts += 1;
      }
    }

    return { nextResult, trimmedCounts: reporter.trimmedCounts };
  },
  normalizeRuntimeHookTimeoutMs,
  withTimeout,
};
module.exports = exportedReporter;

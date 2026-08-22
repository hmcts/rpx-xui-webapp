/* global clearTimeout, process, require, module, setTimeout */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const odhinModule = require('odhin-reports-playwright');
const { createEmptyFeatureStat, deriveFeatureName, enhanceGeneratedReport } = require('./odhin-report-enhancer.cjs');

const OdhinReporter = odhinModule.default ?? odhinModule;
const terminalStatusesNoRetry = ['passed', 'flaky', 'skipped', 'interrupted'];

class OdhinAdaptiveReporter {
  constructor(options = {}) {
    // Odhín embeds attachments by default, which can exceed V8's string limit after retried browser failures.
    // Keep the files beside the published report; callers can explicitly opt back into embedding for a small local run.
    const reporterOptions = { embedAttachments: false, ...options };
    this.outputFolder = reporterOptions.outputFolder;
    const configuredLightweight = reporterOptions.lightweight;
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
    this.testOutputMode = normalizeTestOutputMode(reporterOptions.testOutput);
    this.profileEnabled =
      typeof reporterOptions.profile === 'boolean'
        ? reporterOptions.profile
        : process.env.PW_ODHIN_PROFILE
          ? process.env.PW_ODHIN_PROFILE.toLowerCase() === 'true'
          : true;
    const configuredRuntimeHookTimeoutMs = reporterOptions.runtimeHookTimeoutMs ?? process.env.PW_ODHIN_RUNTIME_HOOK_TIMEOUT_MS;
    this.runtimeHookTimeoutMs = normalizeRuntimeHookTimeoutMs(configuredRuntimeHookTimeoutMs, process.env.CI ? 0 : 15000);
    const configuredFinalizationTimeoutMs = reporterOptions.finalizationTimeoutMs ?? process.env.PW_ODHIN_FINALIZATION_TIMEOUT_MS;
    this.finalizationTimeoutMs = normalizeRuntimeHookTimeoutMs(configuredFinalizationTimeoutMs, 30000);
    this.trimFailedArtifacts = normalizeBoolean(
      reporterOptions.trimFailedArtifacts ?? process.env.PW_ODHIN_TRIM_FAILED_ARTIFACTS,
      false
    );
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
    this.featureStats = new Map();
    this.finalizationStartedAt = 0;
    this.pendingInnerCallbacks = Promise.resolve();
    this.inner =
      typeof reporterOptions.createInnerReporter === 'function'
        ? reporterOptions.createInnerReporter(reporterOptions)
        : new OdhinReporter(reporterOptions);
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

    let nextResult = addFailureSource(test, result);
    const passedOrSkipped = result?.status === 'passed' || result?.status === 'skipped';
    const shouldTrimHeavyArtifacts = this.lightweight && (passedOrSkipped || (this.trimFailedArtifacts && !passedOrSkipped));

    const shouldDropTestOutput = this.testOutputMode === false || (this.testOutputMode === 'only-on-failure' && passedOrSkipped);

    if (shouldTrimHeavyArtifacts || shouldDropTestOutput) {
      nextResult = { ...nextResult };

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
    this.recordFeatureStat(test, result);
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
      try {
        await withTimeout(this.inner.onEnd(result), this.finalizationTimeoutMs);
      } catch (error) {
        if (isTimeoutError(error)) {
          process.stderr.write(
            `[odhin-profile] onEnd timed out after ${this.finalizationTimeoutMs}ms; continuing with available evidence.\n`
          );
        } else {
          process.stderr.write(`[odhin-profile] onEnd failed: ${formatErrorMessage(error)}\n`);
        }
      }
    }
    try {
      enhanceGeneratedReport(this.outputFolder, this.featureStats);
    } catch (error) {
      process.stderr.write(`[odhin-profile] report enhancement failed: ${formatErrorMessage(error)}\n`);
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

  recordFeatureStat(test, result) {
    const finalStatus = normalizeFinalStatus(result?.status, result?.retry);
    if (!isFinalResult(finalStatus, result?.retry, test?.retries)) {
      return;
    }

    const featureName = deriveFeatureName(test?.location?.file);
    const current = this.featureStats.get(featureName) ?? createEmptyFeatureStat(featureName);
    current.totalTests += 1;
    current.durationMs += Number(result?.duration ?? 0);

    switch (finalStatus) {
      case 'passed':
        current.passed += 1;
        break;
      case 'failed':
        current.failed += 1;
        break;
      case 'timedOut':
        current.timedOut += 1;
        break;
      case 'skipped':
        current.skipped += 1;
        break;
      case 'interrupted':
        current.interrupted += 1;
        break;
      case 'flaky':
        current.flaky += 1;
        break;
      default:
        current.interrupted += 1;
        break;
    }

    this.featureStats.set(featureName, current);
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

function addFailureSource(test, result) {
  if (!result || !['failed', 'timedOut', 'interrupted'].includes(result.status)) {
    return result;
  }

  const errors = Array.isArray(result.errors) ? result.errors : result.error ? [result.error] : [];
  const errorText = errors.map((error) => `${error?.message ?? ''}\n${error?.stack ?? ''}`).join('\n');
  const source = deriveFailureSource(`${test?.title ?? ''}\n${errorText}`);
  if (!source || errors.some((error) => String(error?.stack ?? error?.message ?? '').startsWith('[Failure source:'))) {
    return result;
  }

  return {
    ...result,
    ...(result.error ? { error: prefixFailureSource(result.error, source) } : {}),
    ...(Array.isArray(result.errors)
      ? {
          // Odhín renders result.errors (and its stack), not result.error.
          errors: result.errors.map((error) => prefixFailureSource(error, source)),
        }
      : {}),
  };
}

function prefixFailureSource(error, source) {
  return {
    ...error,
    message: `[Failure source: ${source}]\n${error?.message ?? ''}`,
    stack: error?.stack ? `[Failure source: ${source}]\n${error.stack}` : error?.stack,
  };
}

function deriveFailureSource(errorMessage) {
  const message = String(errorMessage);
  const normalized = message.toLowerCase();

  if (/sessioncaptureerror|session capture|idam login|login surface|app shell not detected within/.test(normalized)) {
    return 'XUI/IDAM authentication session capture';
  }
  if (/direct ccd case create failed/.test(normalized)) {
    return 'CCD Data Store direct case-create route: POST /data/caseworkers/:uid/jurisdictions/:jurisdiction/case-types/:caseType/cases?ignore-warning=false';
  }
  if (/direct ccd case validate failed/.test(normalized)) {
    return 'CCD Data Store direct case-validation route: POST /data/caseworkers/:uid/jurisdictions/:jurisdiction/case-types/:caseType/validate';
  }
  if (/failed to fetch direct ccd event token/.test(normalized)) {
    return 'CCD Data Store direct event-token route: GET /data/caseworkers/:uid/jurisdictions/:jurisdiction/case-types/:caseType/event-triggers/:eventId/token';
  }
  if (/\/auth\/login/.test(normalized)) {
    return 'XUI authentication route /auth/login';
  }
  if (/\/external\/(?:config\/ui|configuration-ui)/.test(normalized)) {
    return 'XUI external configuration route';
  }
  if (/serves external (?:configuration|config\/ui alias)/.test(normalized)) {
    return 'XUI external configuration route';
  }
  if (/\/aggregated\/caseworkers\//.test(normalized)) {
    return 'XUI aggregated caseworker route';
  }
  if (/\/workallocation\//.test(normalized)) {
    return 'Work Allocation API';
  }
  if (/\/data\/(?:cases|caseworkers)|\/caseworkers\//.test(normalized)) {
    return 'CCD Data Store route';
  }
  return null;
}

const normalizeRuntimeHookTimeoutMs = (raw, fallbackMs) => {
  const parsed = Number.parseInt(String(raw ?? ''), 10);
  if (Number.isFinite(parsed) && parsed >= 0) {
    return parsed;
  }
  return fallbackMs;
};

const normalizeBoolean = (raw, fallback) => {
  if (typeof raw === 'boolean') {
    return raw;
  }
  const normalized = String(raw ?? '')
    .trim()
    .toLowerCase();
  if (normalized === 'true') {
    return true;
  }
  if (normalized === 'false') {
    return false;
  }
  return fallback;
};

const normalizeFinalStatus = (status, retry) => {
  if (status === 'passed' && Number(retry ?? 0) > 0) {
    return 'flaky';
  }
  return status;
};

const isFinalResult = (status, retry, retries) =>
  terminalStatusesNoRetry.includes(status) || Number(retry ?? 0) === Number(retries ?? 0);

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
  addFailureSource,
  deriveFailureSource,
  isFinalResult,
  normalizeFinalStatus,
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
  normalizeBoolean,
  normalizeRuntimeHookTimeoutMs,
  withTimeout,
};
module.exports = exportedReporter;

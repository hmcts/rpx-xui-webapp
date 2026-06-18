class FlakeGateReporter {
  constructor(options = {}) {
    this.totalAttempts = 0;
    this.finalOutcomesByTest = new Map();
    this.enabled = resolveBoolean(process.env.PW_ENABLE_FLAKE_GATE, options.enabled ?? true);
    this.reportOnly =
      normalizeMode(process.env.PW_FLAKE_GATE_MODE, options.mode) === 'report-only' ||
      resolveBoolean(process.env.PW_FLAKE_GATE_REPORT_ONLY, options.reportOnly ?? false);
    this.maxFlakyTests = resolveNumber(process.env.PW_MAX_FLAKY_TESTS, options.maxFlakyTests ?? 0);
    this.maxFlakyRate = resolveNumber(process.env.PW_MAX_FLAKY_RATE, options.maxFlakyRate ?? 0);
  }

  mode() {
    if (!this.enabled) {
      return 'disabled';
    }
    return this.reportOnly ? 'report-only' : 'enforce';
  }

  projectName(test) {
    try {
      const project = test?.parent?.project?.();
      return project?.name || 'default-project';
    } catch {
      return 'default-project';
    }
  }

  testKey(test) {
    if (typeof test?.id === 'string' && test.id.length > 0) {
      return `id:${test.id}`;
    }

    const project = this.projectName(test);
    const file = test.location?.file || 'unknown-file';
    const line = test.location?.line || 0;
    const column = test.location?.column || 0;
    const titlePath = typeof test.titlePath === 'function' ? test.titlePath().join(' > ') : test.title;
    return `${project}:${file}:${line}:${column}:${titlePath}`;
  }

  onTestEnd(test, result) {
    if (result.status === 'skipped') {
      return;
    }

    this.totalAttempts += 1;
    const key = this.testKey(test);
    const current = this.finalOutcomesByTest.get(key);
    if (!current || result.retry >= current.retry) {
      const outcome = typeof test.outcome === 'function' ? test.outcome() : '';
      this.finalOutcomesByTest.set(key, {
        retry: result.retry,
        status: result.status,
        outcome,
      });
    }
  }

  onEnd() {
    const finalOutcomes = Array.from(this.finalOutcomesByTest.values());
    const uniqueFinalTests = finalOutcomes.length;
    const flakyCount = finalOutcomes.filter(
      (item) => item.outcome === 'flaky' || (item.status === 'passed' && item.retry > 0)
    ).length;
    const retriedPassCount = finalOutcomes.filter((item) => item.status === 'passed' && item.retry > 0).length;
    const failedCount = finalOutcomes.filter(
      (item) => item.status === 'failed' || item.status === 'timedOut' || item.status === 'interrupted'
    ).length;
    const denominator = uniqueFinalTests > 0 ? uniqueFinalTests : 1;
    const flakyRate = flakyCount / denominator;
    const thresholdBreached = this.enabled && (flakyCount > this.maxFlakyTests || flakyRate > this.maxFlakyRate);
    const result = thresholdBreached ? 'failed' : 'passed';

    const summary = [
      `[flake-gate] finished=${uniqueFinalTests}`,
      `[flake-gate] attempts=${this.totalAttempts}`,
      `[flake-gate] flaky=${flakyCount}`,
      `[flake-gate] passed-on-retry=${retriedPassCount}`,
      `[flake-gate] failed=${failedCount}`,
      `[flake-gate] flaky-rate=${(flakyRate * 100).toFixed(2)}%`,
      `[flake-gate] thresholds: maxFlakyTests=${this.maxFlakyTests}, maxFlakyRate=${(this.maxFlakyRate * 100).toFixed(2)}%`,
      `[flake-gate] mode=${this.mode()}`,
      `[flake-gate] result=${result}`,
    ].join('\n');

    process.stdout.write(`${summary}\n`);

    if (thresholdBreached && !this.reportOnly) {
      return { status: 'failed' };
    }

    return undefined;
  }
}

function resolveBoolean(rawValue, defaultValue) {
  if (rawValue === undefined) {
    return defaultValue;
  }
  const normalized = String(rawValue).trim().toLowerCase();
  if (['1', 'true', 'yes', 'on'].includes(normalized)) {
    return true;
  }
  if (['0', 'false', 'no', 'off'].includes(normalized)) {
    return false;
  }
  return defaultValue;
}

function normalizeMode(rawValue, defaultValue) {
  const normalized = String(rawValue ?? defaultValue ?? 'enforce')
    .trim()
    .toLowerCase();
  return normalized === 'report-only' ? 'report-only' : 'enforce';
}

function resolveNumber(rawValue, defaultValue) {
  const parsed = Number(rawValue);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : defaultValue;
}

module.exports = FlakeGateReporter;

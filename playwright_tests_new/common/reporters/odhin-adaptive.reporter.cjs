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
    this.inner = new OdhinReporter(options);
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
      }

      if (shouldTrimHeavyArtifacts) {
        nextResult.steps = [];
        nextResult.attachments = [];
      }
    }

    await this.inner.onTestEnd(test, nextResult);
  }

  async onEnd(result) {
    if (typeof this.inner.onEnd === 'function') {
      await this.inner.onEnd(result);
    }
  }

  async onStdOut(chunk, test, result) {
    if (typeof this.inner.onStdOut === 'function') {
      await this.inner.onStdOut(chunk, test, result);
    }
  }

  async onStdErr(chunk, test, result) {
    if (typeof this.inner.onStdErr === 'function') {
      await this.inner.onStdErr(chunk, test, result);
    }
  }
}

module.exports = OdhinAdaptiveReporter;

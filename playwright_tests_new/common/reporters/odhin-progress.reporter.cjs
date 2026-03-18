/* global process, setInterval, setTimeout, clearInterval, clearTimeout, module */

class OdhinProgressReporter {
  constructor(options = {}) {
    this.enabled = Boolean(options.enabled);
    this.graceMs = Number.isFinite(Number(options.graceMs)) && Number(options.graceMs) >= 0 ? Number(options.graceMs) : 1500;
    this.intervalMs =
      Number.isFinite(Number(options.intervalMs)) && Number(options.intervalMs) >= 1000 ? Number(options.intervalMs) : 5000;
    this.timer = null;
    this.progressStartTimer = null;
    this.hardTimeoutTimer = null;
    this.hardTimeoutMs =
      Number.isFinite(Number(options.hardTimeoutMs)) && Number(options.hardTimeoutMs) >= 5000 ? Number(options.hardTimeoutMs) : 0;
    this.startedAt = 0;
    this.tick = 0;
    this.totalPlannedTests = 0;
    this.progressStarted = false;
    this.timeoutExitCode =
      Number.isFinite(Number(options.timeoutExitCode)) && Number(options.timeoutExitCode) >= 0
        ? Number(options.timeoutExitCode)
        : 1;
  }

  onBegin(_config, suite) {
    if (!this.enabled) {
      return;
    }
    this.totalPlannedTests = suite.allTests().length;
  }

  onEnd() {
    if (!this.enabled) {
      return;
    }
    this.startedAt = Date.now();
    if (this.graceMs <= 0) {
      this.startProgress();
      return;
    }

    this.progressStartTimer = setTimeout(() => {
      this.progressStartTimer = null;
      this.startProgress();
    }, this.graceMs);
    this.progressStartTimer.unref?.();
  }

  startProgress() {
    if (!this.enabled || this.progressStarted) {
      return;
    }

    this.progressStarted = true;
    const planned = this.totalPlannedTests > 0 ? `plannedTests=${this.totalPlannedTests}` : 'plannedTests=unknown';
    const elapsedSeconds = this.startedAt ? Math.max(0, Math.floor((Date.now() - this.startedAt) / 1000)) : 0;
    process.stdout.write(
      `[odhin-progress] All tests finished. Finalizing Odhin report... (${planned}) elapsed=${elapsedSeconds}s\n`
    );

    this.timer = setInterval(() => {
      this.tick += 1;
      const elapsedSeconds = Math.max(0, Math.floor((Date.now() - this.startedAt) / 1000));
      const dots = '.'.repeat((this.tick % 3) + 1);
      process.stdout.write(`[odhin-progress] Finalizing Odhin report${dots} elapsed=${elapsedSeconds}s\n`);
    }, this.intervalMs);

    this.timer.unref?.();

    if (this.hardTimeoutMs > 0) {
      this.hardTimeoutTimer = setTimeout(() => {
        process.stderr.write(
          `[odhin-progress] Finalization exceeded ${this.hardTimeoutMs}ms. Forcing process exit with current code.\n`
        );
        process.exit(this.timeoutExitCode);
      }, this.hardTimeoutMs);
      this.hardTimeoutTimer.unref?.();
    }
  }

  onExit() {
    if (!this.enabled) {
      return;
    }

    if (this.progressStartTimer) {
      clearTimeout(this.progressStartTimer);
      this.progressStartTimer = null;
    }
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.hardTimeoutTimer) {
      clearTimeout(this.hardTimeoutTimer);
      this.hardTimeoutTimer = null;
    }

    if (this.progressStarted) {
      const elapsedSeconds = this.startedAt ? Math.max(0, Math.floor((Date.now() - this.startedAt) / 1000)) : 0;
      process.stdout.write(`[odhin-progress] Odhin report completed in ${elapsedSeconds}s.\n`);
    }
  }
}

module.exports = OdhinProgressReporter;

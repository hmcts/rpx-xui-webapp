class OdhinProgressReporter {
  constructor(options = {}) {
    this.enabled = Boolean(options.enabled);
    this.intervalMs =
      Number.isFinite(Number(options.intervalMs)) && Number(options.intervalMs) >= 1000 ? Number(options.intervalMs) : 5000;
    this.timer = null;
    this.hardTimeoutTimer = null;
    this.hardTimeoutMs =
      Number.isFinite(Number(options.hardTimeoutMs)) && Number(options.hardTimeoutMs) >= 5000 ? Number(options.hardTimeoutMs) : 0;
    this.startedAt = 0;
    this.tick = 0;
    this.totalPlannedTests = 0;
    this.progressStarted = false;
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
    this.startProgress();
  }

  startProgress() {
    if (!this.enabled || this.progressStarted) {
      return;
    }

    this.progressStarted = true;
    this.startedAt = Date.now();
    const planned = this.totalPlannedTests > 0 ? `plannedTests=${this.totalPlannedTests}` : 'plannedTests=unknown';
    process.stdout.write(`[odhin-progress] All tests finished. Finalizing Odhin report... (${planned})\n`);

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
        process.exit(process.exitCode ?? 0);
      }, this.hardTimeoutMs);
      this.hardTimeoutTimer.unref?.();
    }
  }

  onExit() {
    if (!this.enabled) {
      return;
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

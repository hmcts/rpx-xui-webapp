const fs = require('node:fs');
const path = require('node:path');

function hookDuration(result, title) {
  return (result.steps ?? [])
    .filter((step) => step.category === 'hook' && step.title === title)
    .reduce((total, step) => total + Math.max(0, Number(step.duration) || 0), 0);
}

function identityWait(result, test) {
  const annotations = (result.annotations ?? []).filter((item) => item.type === 'identity-lease-wait');
  const markers = annotations.length
    ? annotations
    : (test.annotations ?? []).filter((item) => item.type === 'identity-lease-wait');
  return markers
    .map((marker) => Number(marker.description?.match(/(?:^|\s)waited_ms=(\d+)(?:\s|$)/)?.[1]))
    .filter((value) => Number.isFinite(value));
}

function peakOverlap(attempts) {
  const boundaries = attempts.flatMap(({ startMs, endMs }) => [
    { time: startMs, delta: 1 },
    { time: endMs, delta: -1 },
  ]);
  boundaries.sort((left, right) => left.time - right.time || left.delta - right.delta);
  let active = 0;
  let peak = 0;
  for (const boundary of boundaries) {
    active += boundary.delta;
    peak = Math.max(peak, active);
  }
  return peak;
}

class PlaywrightCapacityReporter {
  constructor(options = {}) {
    this.outputFile = options.outputFile ?? process.env.PW_CAPACITY_REPORT;
    this.attempts = [];
    this.startedAtMs = undefined;
  }

  onBegin() {
    this.startedAtMs = Date.now();
  }

  onTestEnd(test, result) {
    const startMs = result.startTime instanceof Date ? result.startTime.getTime() : Date.parse(result.startTime);
    const durationMs = Math.max(0, Number(result.duration) || 0);
    const beforeHooksMs = hookDuration(result, 'Before Hooks');
    const afterHooksMs = hookDuration(result, 'After Hooks');
    this.attempts.push({
      id: test.id,
      status: result.status,
      retry: result.retry,
      workerIndex: result.workerIndex,
      parallelIndex: result.parallelIndex,
      startMs,
      endMs: startMs + durationMs,
      durationMs,
      beforeHooksMs,
      afterHooksMs,
      identityWaits: identityWait(result, test),
    });
  }

  async onEnd(run) {
    if (!this.outputFile) throw new Error('PW_CAPACITY_REPORT must name a unique output file.');
    const valid = this.attempts.filter((attempt) => Number.isFinite(attempt.startMs) && Number.isFinite(attempt.endMs));
    const finalById = new Map();
    for (const attempt of this.attempts) finalById.set(attempt.id, attempt);
    const final = [...finalById.values()];
    const beforeHooksMs = this.attempts.reduce((total, attempt) => total + attempt.beforeHooksMs, 0);
    const afterHooksMs = this.attempts.reduce((total, attempt) => total + attempt.afterHooksMs, 0);
    const identityWaits = this.attempts.flatMap((attempt) => attempt.identityWaits);
    const report = {
      kind: 'playwright-capacity-attempt-summary',
      runStatus: run.status,
      runnerStartedAtMs: this.startedAtMs,
      firstTestStartedAtMs: valid.length ? Math.min(...valid.map((attempt) => attempt.startMs)) : null,
      lastTestEndedAtMs: valid.length ? Math.max(...valid.map((attempt) => attempt.endMs)) : null,
      reporterOnEndAtMs: Date.now(),
      attempts: this.attempts.length,
      tests: final.length,
      passed: final.filter((attempt) => attempt.status === 'passed').length,
      failed: final.filter((attempt) => ['failed', 'timedOut', 'interrupted'].includes(attempt.status)).length,
      skipped: final.filter((attempt) => attempt.status === 'skipped').length,
      flaky: final.filter((attempt) => attempt.status === 'passed' && attempt.retry > 0).length,
      retriedAttempts: this.attempts.filter((attempt) => attempt.retry > 0).length,
      observedWorkerProcesses: new Set(this.attempts.map((attempt) => attempt.workerIndex).filter((value) => value >= 0)).size,
      observedParallelSlots: new Set(this.attempts.map((attempt) => attempt.parallelIndex).filter((value) => value >= 0)).size,
      peakActiveTests: peakOverlap(valid),
      beforeHooksMs,
      afterHooksMs,
      testBodyMs: this.attempts.reduce(
        (total, attempt) => total + Math.max(0, attempt.durationMs - attempt.beforeHooksMs - attempt.afterHooksMs),
        0
      ),
      identityWaitObservedMs: identityWaits.reduce((total, value) => total + value, 0),
      identityWaitSamples: identityWaits.length,
    };
    fs.mkdirSync(path.dirname(this.outputFile), { recursive: true });
    fs.writeFileSync(this.outputFile, `${JSON.stringify(report, null, 2)}\n`, { mode: 0o600 });
  }
}

module.exports = PlaywrightCapacityReporter;

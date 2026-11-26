/* global process, module, require, console */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const os = require('node:os');

/**
 * Opt-in CPU-aware cap for agents that run several Playwright suites at once. When `PW_PARALLEL_SUITES` is a positive
 * integer, each browser suite gets at most `max(MIN_CAPPED_WORKERS, floor(cpuCount / PW_PARALLEL_SUITES))` workers;
 * otherwise the requested count is returned unchanged. The floor stops small agents from serialising a suite.
 * Plain CommonJS so the TS configs and the CJS integration config support (also loaded by plain-node scripts) share it.
 */
const MIN_CAPPED_WORKERS = 4;

const parsePositiveInt = (raw) => {
  const parsed = Number.parseInt(raw ?? '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
};

const capWorkerCountForParallelSuites = (
  requested,
  env = process.env,
  cpuCount = os.cpus().length,
  log = (message) => console.log(message)
) => {
  const parallelSuites = parsePositiveInt(env.PW_PARALLEL_SUITES?.trim());
  if (parallelSuites === undefined || !Number.isFinite(cpuCount) || cpuCount <= 0) {
    return requested;
  }
  const cap = Math.max(MIN_CAPPED_WORKERS, Math.floor(cpuCount / parallelSuites));
  if (requested <= cap) {
    return requested;
  }
  // Playwright re-evaluates the config in every worker; log once from the runner process.
  if (!env.TEST_WORKER_INDEX) {
    log(`[playwright-config] capping workers ${requested} -> ${cap} (cpus=${cpuCount}, PW_PARALLEL_SUITES=${parallelSuites})`);
  }
  return cap;
};

module.exports = { MIN_CAPPED_WORKERS, capWorkerCountForParallelSuites };

/* global process */

const integrationConfigSupport = require('../playwright.integration.config.support.cjs');

const requestedWorkers = integrationConfigSupport.resolveWorkerCount(process.env);
const poolCapacities = integrationConfigSupport.resolveConfiguredSessionPoolCapacities(process.env);
const strict = process.argv.includes('--strict');
const requiredPoolsArgument = process.argv.find((argument) => argument.startsWith('--require='));
const requiredPools = requiredPoolsArgument
  ? requiredPoolsArgument
      .slice('--require='.length)
      .split(',')
      .map((pool) => pool.trim().toUpperCase())
      .filter(Boolean)
  : [];
const issues = [];

if (/--inspect(?:-brk)?(?:=|\b)/.test(process.env.NODE_OPTIONS ?? '')) {
  issues.push('NODE_OPTIONS enables the Node inspector. Run browser tests with NODE_OPTIONS= to avoid worker shutdown hangs.');
}

for (const pool of requiredPools) {
  const capacity = poolCapacities[pool] ?? 0;
  if (capacity < requestedWorkers) {
    issues.push(`${pool} has ${capacity} configured credential pair(s), but ${requestedWorkers} workers were requested.`);
  }
}

console.log(`[playwright-preflight] workers=${requestedWorkers}`);
console.log(
  `[playwright-preflight] session-pools=${
    Object.entries(poolCapacities)
      .map(([pool, capacity]) => `${pool}:${capacity}`)
      .join(',') || 'none'
  }`
);
console.log(
  `[playwright-preflight] validation=${process.env.PW_SESSION_REUSE_VALIDATION_MODE ?? (process.env.CI ? 'strict' : 'best-effort')}`
);

if (issues.length > 0) {
  for (const issue of issues) {
    console.warn(`[playwright-preflight] warning: ${issue}`);
  }
  if (strict) {
    process.exitCode = 1;
  }
} else if (strict && requiredPools.length === 0) {
  console.error('[playwright-preflight] --strict requires --require=POOL_A,POOL_B so capacity is checked for the selected lane.');
  process.exitCode = 1;
}

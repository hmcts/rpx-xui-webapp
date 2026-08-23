/* global process */

const integrationConfigSupport = require('../playwright.integration.config.support.cjs');

const requestedWorkers = integrationConfigSupport.resolveWorkerCount(process.env);
const requiredTagsArgument = process.argv.find((argument) => argument.startsWith('--tag='));
const requiredTags = requiredTagsArgument
  ? requiredTagsArgument
      .replace('--tag=', '')
      .split(',')
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean)
  : [];
const requirements = requiredTags.length > 0 ? { tags: requiredTags } : undefined;
const poolCapacities = integrationConfigSupport.resolveConfiguredSessionPoolCapacities(process.env, requirements);
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
  if (capacity === 0) {
    issues.push(`${pool} has no configured credential identities.`);
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
console.log('[playwright-preflight] pool capacity is advisory; configured identities may be reused across workers.');
if (requiredTags.length > 0) {
  console.log(`[playwright-preflight] selected-tags=${requiredTags.join(',')}`);
}
const validationMode =
  process.env.PW_SESSION_REUSE_VALIDATION_MODE ??
  (process.env.CI === 'true' || process.env.CI === '1' ? 'strict' : 'best-effort');
console.log(`[playwright-preflight] validation=${validationMode}`);

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

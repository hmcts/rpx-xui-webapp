#!/usr/bin/env node

const { spawnSync } = require('node:child_process');
const path = require('node:path');

const ensureTagPrefix = (value) => {
  const normalized = String(value ?? '').trim();
  if (!normalized) {
    return '';
  }
  return normalized.startsWith('@') ? normalized : `@${normalized}`;
};

const splitTagInput = (raw) => {
  if (!raw) {
    return [];
  }
  const seen = new Set();
  const tags = [];
  for (const token of String(raw).split(/[\s,]+/)) {
    const tag = ensureTagPrefix(token);
    if (!tag || tag === '@none' || seen.has(tag)) {
      continue;
    }
    seen.add(tag);
    tags.push(tag);
  }
  return tags;
};

const buildSmokePlaywrightArgs = (_env = process.env, extraArgs = process.argv.slice(2)) => [
  'test',
  '--project=smoke',
  ...extraArgs,
];

const run = () => {
  const playwrightCli = path.join(path.dirname(require.resolve('playwright/package.json')), 'cli.js');
  const result = spawnSync(process.execPath, [playwrightCli, ...buildSmokePlaywrightArgs()], {
    stdio: 'inherit',
    env: { ...process.env, PLAYWRIGHT_IGNORE_GLOBAL_EXCLUDES: 'true' },
  });
  if (result.error) {
    throw result.error;
  }
  process.exit(result.status ?? 1);
};

if (require.main === module) {
  run();
}

module.exports = {
  buildSmokePlaywrightArgs,
  splitTagInput,
};

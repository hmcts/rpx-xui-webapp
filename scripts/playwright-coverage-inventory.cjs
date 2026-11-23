#!/usr/bin/env node
const { execFileSync, spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const filterVariables = [
  'API_PW_INCLUDE_TAGS',
  'API_PW_EXCLUDED_TAGS_OVERRIDE',
  'E2E_PW_INCLUDE_TAGS',
  'E2E_PW_EXCLUDED_TAGS_OVERRIDE',
  'INTEGRATION_PW_INCLUDE_TAGS',
  'INTEGRATION_PW_EXCLUDED_TAGS_OVERRIDE',
  'PLAYWRIGHT_TAGS',
  'PLAYWRIGHT_GLOBAL_EXCLUDED_TAGS',
  'API_PW_TAG_FILTER_CONFIG',
  'E2E_PW_TAG_FILTER_CONFIG',
  'INTEGRATION_PW_TAG_FILTER_CONFIG',
  'PLAYWRIGHT_INCLUDE_A11Y',
  'PLAYWRIGHT_INCLUDE_WAVE_A11Y',
];

function flatten(suites) {
  return suites.flatMap((suite) => [...(suite.specs ?? []), ...flatten(suite.suites ?? [])]);
}

function key(spec) {
  return `${spec.file}:${spec.line}:${spec.title}`;
}

function revisionMetadata(git = execFileSync) {
  const options = { cwd: root, encoding: 'utf8' };
  return {
    revision: git('git', ['rev-parse', 'HEAD'], options).trim(),
    workingTreeDirty: Boolean(git('git', ['status', '--porcelain'], options).trim()),
  };
}

function summarize({ api, integration, integrationAll, e2e, e2eA11y }) {
  const includedIntegration = new Set(integration.map(key));
  const includedE2e = new Set(e2e.map(key));
  const excluded = integrationAll
    .filter((spec) => !includedIntegration.has(key(spec)))
    .map(({ file, line, title, tags }) => ({ file, line, title, tags }))
    .sort((left, right) => key(left).localeCompare(key(right)));
  return {
    api: {
      serviceOrContract: api.filter((spec) => !spec.file.includes('/api/unit/')).length,
      supportUnit: api.filter((spec) => spec.file.includes('/api/unit/')).length,
    },
    integration: {
      runnable: integration.length,
      discovered: integrationAll.length,
      defaultExcluded: excluded.length,
      excluded,
    },
    e2e: { runnable: e2e.length },
    accessibility: { advisoryDiscovered: e2eA11y.filter((spec) => !includedE2e.has(key(spec))).length },
  };
}

function discover(config, project, overrides, outputFile) {
  const env = { ...process.env };
  for (const variable of filterVariables) delete env[variable];
  Object.assign(env, overrides, { PLAYWRIGHT_JSON_OUTPUT_FILE: outputFile });
  const run = spawnSync(
    process.execPath,
    [require.resolve('@playwright/test/cli'), 'test', '--list', `--config=${config}`, `--project=${project}`, '--reporter=json'],
    { cwd: root, env, encoding: 'utf8', maxBuffer: 1024 * 1024 }
  );
  if (run.error || run.status !== 0) {
    throw new Error(`Playwright discovery failed for ${config} (${run.error?.message ?? `exit ${run.status}`}).`);
  }
  const report = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
  if (report.errors?.length) throw new Error(`Playwright discovery reported errors for ${config}.`);
  return flatten(report.suites ?? []);
}

function run() {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'playwright-inventory-'));
  try {
    const report = summarize({
      api: discover('playwright.config.ts', 'node-api', {}, path.join(tempDir, 'api.json')),
      integration: discover('playwright.integration.config.ts', 'chromium', {}, path.join(tempDir, 'integration.json')),
      integrationAll: discover(
        'playwright.integration.config.ts',
        'chromium',
        { INTEGRATION_PW_EXCLUDED_TAGS_OVERRIDE: '@none' },
        path.join(tempDir, 'integration-all.json')
      ),
      e2e: discover('playwright.e2e.config.ts', 'chromium', {}, path.join(tempDir, 'e2e.json')),
      e2eA11y: discover(
        'playwright.e2e.config.ts',
        'chromium',
        { PLAYWRIGHT_INCLUDE_A11Y: 'true' },
        path.join(tempDir, 'e2e-a11y.json')
      ),
    });
    console.log(
      JSON.stringify(
        {
          kind: 'playwright-discovery-inventory',
          generatedAt: new Date().toISOString(),
          ...revisionMetadata(),
          ...report,
        },
        null,
        2
      )
    );
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

if (require.main === module) {
  try {
    run();
  } catch (error) {
    console.error(`[playwright-inventory] ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = { summarize, revisionMetadata };

import { test } from '@playwright/test';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const require = createRequire(import.meta.url);
const { resolveTagFilters } = require('../../../playwright-config-utils') as typeof import('../../../playwright-config-utils');

const today = new Date('2026-06-15T10:00:00Z');

let configDir: string;

test.beforeAll(() => {
  configDir = mkdtempSync(join(tmpdir(), 'tag-filter-exclusions-'));
});

test.afterAll(() => {
  rmSync(configDir, { recursive: true, force: true });
});

export const resolveWithConfig = (name: string, config: Record<string, unknown>, env: NodeJS.ProcessEnv = {}) => {
  const configPath = join(configDir, `${name}.json`);
  writeFileSync(configPath, JSON.stringify({ availableTags: ['@e2e', '@feature-a', '@feature-b', '@feature-c'], ...config }));
  const warnings: string[] = [];
  const originalWarn = console.warn;
  console.warn = (message: string) => warnings.push(message);
  try {
    const filters = resolveTagFilters({
      env: { CI: undefined, E2E_PW_TAG_FILTER_CONFIG: configPath, ...env },
      includeTagsEnvVar: 'E2E_PW_INCLUDE_TAGS',
      excludedTagsEnvVar: 'E2E_PW_EXCLUDED_TAGS_OVERRIDE',
      configPathEnvVar: 'E2E_PW_TAG_FILTER_CONFIG',
      defaultConfigPath: configPath,
      suiteTag: '@e2e',
      now: today,
    });
    return { filters, warnings };
  } finally {
    console.warn = originalWarn;
  }
};

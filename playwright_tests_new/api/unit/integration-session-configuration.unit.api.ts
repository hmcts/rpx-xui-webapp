import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { expect, test, type FullConfig } from '@playwright/test';

import {
  INTEGRATION_SESSION_CONFIGURATION_COMPLETE_FILE_ENV,
  validateIntegrationSessionConfiguration,
} from '../../common/integrationSessionConfiguration.js';
import globalSetup, {
  resolveTagFiltersExport,
  validateIntegrationSpecTagCatalogue,
} from '../../common/playwright.global.setup.js';

test.describe('integration session configuration', { tag: '@svc-internal' }, () => {
  test('resolves tag filters from ESM and CommonJS namespace shapes', () => {
    const resolveTagFilters = () => ({ includeTags: [] });

    expect(resolveTagFiltersExport({ resolveTagFilters })).toBe(resolveTagFilters);
    expect(resolveTagFiltersExport({ default: { resolveTagFilters } })).toBe(resolveTagFilters);
    expect(() => resolveTagFiltersExport({ default: {} })).toThrow('playwright-config-utils does not export resolveTagFilters');
  });

  test('validates declared identities without creating session files', () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'integration-session-config-'));
    const previousCwd = process.cwd();

    try {
      process.chdir(tempDir);
      validateIntegrationSessionConfiguration([
        {
          userIdentifier: 'CONFIGURED_USER',
          email: 'configured@example.test',
          password: 'not-used',
        },
      ]);

      expect(fs.existsSync(path.join(tempDir, '.sessions'))).toBe(false);
    } finally {
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('fails fast when a declared identity has no credential mapping', () => {
    expect(() => validateIntegrationSessionConfiguration(['UNMAPPED_INTEGRATION_USER'])).toThrow(
      'User "UNMAPPED_INTEGRATION_USER" not found'
    );
  });

  test('writes the completion marker only after every identity validates', () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'integration-session-config-marker-'));
    const completeFile = path.join(tempDir, 'complete');
    const env = { [INTEGRATION_SESSION_CONFIGURATION_COMPLETE_FILE_ENV]: completeFile } as NodeJS.ProcessEnv;

    try {
      fs.writeFileSync(completeFile, 'stale\n');
      expect(() => validateIntegrationSessionConfiguration(['UNMAPPED_INTEGRATION_USER'], env)).toThrow();
      expect(fs.existsSync(completeFile)).toBe(false);

      validateIntegrationSessionConfiguration([], env);
      expect(fs.readFileSync(completeFile, 'utf8')).toBe('complete\n');
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('does not apply integration validation to the shared nightly E2E config', async () => {
    await expect(
      globalSetup({ projects: [{ testDir: '/workspace/playwright_tests_new/E2E' }] } as FullConfig)
    ).resolves.toBeUndefined();
  });

  test('rejects integration feature tags declared by specs but absent from the tag catalogue', () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'integration-spec-tags-'));
    const specFile = path.join(tempDir, 'uncatalogued.spec.ts');

    try {
      fs.writeFileSync(specFile, "test.describe('feature', { tag: ['@integration', '@integration-uncatalogued'] }, () => {});\n");

      expect(() => validateIntegrationSpecTagCatalogue([tempDir], ['@integration'], 'tag-filter.json')).toThrow(
        /@integration-uncatalogued.*uncatalogued\.spec\.ts/
      );
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('rejects tag identifiers and spreads that cannot be validated statically', () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'integration-dynamic-spec-tags-'));
    const specFile = path.join(tempDir, 'dynamic.spec.ts');

    try {
      fs.writeFileSync(
        specFile,
        "const tags = ['@integration', '@integration-hidden'];\ntest.describe('feature', { tag: tags }, () => {});\n"
      );
      expect(() => validateIntegrationSpecTagCatalogue([tempDir], ['@integration'], 'tag-filter.json')).toThrow(
        /tag must be a static string or string array.*dynamic\.spec\.ts:2/
      );

      fs.writeFileSync(
        specFile,
        "const tag = ['@integration', '@integration-hidden'];\ntest.describe('feature', { tag }, () => {});\n"
      );
      expect(() => validateIntegrationSpecTagCatalogue([tempDir], ['@integration'], 'tag-filter.json')).toThrow(
        /tag must be a static string or string array.*dynamic\.spec\.ts:2/
      );

      fs.writeFileSync(
        specFile,
        "const metadata = { tag: ['@integration', '@integration-hidden'] };\ntest.describe('feature', { ...metadata }, () => {});\n"
      );
      expect(() => validateIntegrationSpecTagCatalogue([tempDir], ['@integration'], 'tag-filter.json')).toThrow(
        /tag must be a static string or string array.*dynamic\.spec\.ts:2/
      );

      fs.writeFileSync(
        specFile,
        "const metadata = { tag: ['@integration', '@integration-hidden'] };\ntest.describe('feature', metadata, () => {});\n"
      );
      expect(() => validateIntegrationSpecTagCatalogue([tempDir], ['@integration'], 'tag-filter.json')).toThrow(
        /tag must be a static string or string array.*dynamic\.spec\.ts:2/
      );

      fs.writeFileSync(
        specFile,
        "const extraTags = ['@integration-hidden'];\ntest.describe('feature', { tag: ['@integration', ...extraTags] }, () => {});\n"
      );
      expect(() => validateIntegrationSpecTagCatalogue([tempDir], ['@integration'], 'tag-filter.json')).toThrow(
        /tag must be a static string or string array.*dynamic\.spec\.ts:2/
      );
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('does not treat test.step options as test declaration metadata', () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'integration-step-options-'));
    const specFile = path.join(tempDir, 'step.spec.ts');

    try {
      fs.writeFileSync(
        specFile,
        "test('feature', { tag: ['@integration'] }, async () => test.step('step', async () => {}, { box: true }));\n"
      );
      expect(() => validateIntegrationSpecTagCatalogue([tempDir], ['@integration'], 'tag-filter.json')).not.toThrow();
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('rejects a catalogued spec feature tag without a session mapping', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'integration-spec-mapping-'));
    const integrationDir = path.join(tempDir, 'playwright_tests_new', 'integration');
    const tagConfig = path.join(tempDir, 'tag-filter.json');
    const previousIncludeTags = process.env.INTEGRATION_PW_INCLUDE_TAGS;
    const previousTagConfig = process.env.INTEGRATION_PW_TAG_FILTER_CONFIG;

    try {
      fs.mkdirSync(integrationDir, { recursive: true });
      fs.writeFileSync(
        path.join(integrationDir, 'unmapped.spec.ts'),
        "test.describe('feature', { tag: ['@integration', '@integration-unmapped'] }, () => {});\n"
      );
      fs.writeFileSync(tagConfig, JSON.stringify({ availableTags: ['@integration', '@integration-unmapped'], excludedTags: [] }));
      process.env.INTEGRATION_PW_INCLUDE_TAGS = '@integration-unmapped';
      process.env.INTEGRATION_PW_TAG_FILTER_CONFIG = tagConfig;

      await expect(globalSetup({ projects: [{ testDir: integrationDir }] } as FullConfig)).rejects.toThrow(
        'Integration session mappings missing for: @integration-unmapped'
      );
    } finally {
      if (previousIncludeTags === undefined) delete process.env.INTEGRATION_PW_INCLUDE_TAGS;
      else process.env.INTEGRATION_PW_INCLUDE_TAGS = previousIncludeTags;
      if (previousTagConfig === undefined) delete process.env.INTEGRATION_PW_TAG_FILTER_CONFIG;
      else process.env.INTEGRATION_PW_TAG_FILTER_CONFIG = previousTagConfig;
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('accepts a fully mocked authenticated integration tag without a session identity', async () => {
    const previousIncludeTags = process.env.INTEGRATION_PW_INCLUDE_TAGS;

    try {
      process.env.INTEGRATION_PW_INCLUDE_TAGS = '@integration-platform-services';

      await expect(
        globalSetup({ projects: [{ testDir: path.resolve('playwright_tests_new/integration') }] } as FullConfig)
      ).resolves.toBeUndefined();
    } finally {
      if (previousIncludeTags === undefined) delete process.env.INTEGRATION_PW_INCLUDE_TAGS;
      else process.env.INTEGRATION_PW_INCLUDE_TAGS = previousIncludeTags;
    }
  });
});

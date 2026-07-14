import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { expect, test, type FullConfig } from '@playwright/test';

import {
  INTEGRATION_SESSION_CONFIGURATION_COMPLETE_FILE_ENV,
  validateIntegrationSessionConfiguration,
} from '../../common/integrationSessionConfiguration.js';
import globalSetup from '../../common/playwright.global.setup.js';

test.describe('integration session configuration', { tag: '@svc-internal' }, () => {
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

  test('accepts a fully mocked authenticated integration tag without a session identity', async () => {
    const previousIncludeTags = process.env.INTEGRATION_PW_INCLUDE_TAGS;

    try {
      process.env.INTEGRATION_PW_INCLUDE_TAGS = '@integration-platform-services';

      await expect(
        globalSetup({ projects: [{ testDir: '/workspace/playwright_tests_new/integration' }] } as FullConfig)
      ).resolves.toBeUndefined();
    } finally {
      if (previousIncludeTags === undefined) delete process.env.INTEGRATION_PW_INCLUDE_TAGS;
      else process.env.INTEGRATION_PW_INCLUDE_TAGS = previousIncludeTags;
    }
  });
});

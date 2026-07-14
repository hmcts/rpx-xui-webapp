import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { expect, test, type FullConfig } from '@playwright/test';

import {
  INTEGRATION_SESSION_WARMUP_COMPLETE_ENV,
  INTEGRATION_SESSION_WARMUP_COMPLETE_FILE_ENV,
  isIntegrationSessionWarmupRequired,
  prewarmIntegrationSessions,
} from '../../common/integrationSessionWarmup.js';
import globalSetup from '../../common/playwright.global.setup.js';

test.describe('integration session warmup', { tag: '@svc-internal' }, () => {
  test('requires successful warmup in CI and when explicitly enabled', () => {
    expect(isIntegrationSessionWarmupRequired({ CI: 'true' } as NodeJS.ProcessEnv)).toBe(true);
    expect(isIntegrationSessionWarmupRequired({ PW_INTEGRATION_SESSION_WARMUP_REQUIRED: 'true' } as NodeJS.ProcessEnv)).toBe(
      true
    );
    expect(
      isIntegrationSessionWarmupRequired({ CI: 'true', PW_INTEGRATION_SESSION_WARMUP_REQUIRED: 'false' } as NodeJS.ProcessEnv)
    ).toBe(true);
    expect(
      isIntegrationSessionWarmupRequired({ CI: 'true', PW_INTEGRATION_SESSION_WARMUP_REQUIRED: 'invalid' } as NodeJS.ProcessEnv)
    ).toBe(true);
    expect(isIntegrationSessionWarmupRequired({ PW_INTEGRATION_SESSION_WARMUP_REQUIRED: 'false' } as NodeJS.ProcessEnv)).toBe(
      false
    );
  });

  test('fails fast when required warmup fails', async () => {
    const env = { CI: 'true' } as NodeJS.ProcessEnv;
    let useFailureCooldown: boolean | undefined;
    await expect(
      prewarmIntegrationSessions(['STAFF_ADMIN'], env, async (_identifiers, options) => {
        useFailureCooldown = options?.useFailureCooldown;
        throw new Error('capture failed');
      })
    ).rejects.toThrow('capture failed');
    expect(useFailureCooldown).toBe(true);
    expect(env[INTEGRATION_SESSION_WARMUP_COMPLETE_ENV]).toBeUndefined();
  });

  test('marks required warmup complete only after every capture succeeds', async () => {
    const completeFile = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'integration-warmup-')), 'complete');
    const env = {
      CI: 'true',
      [INTEGRATION_SESSION_WARMUP_COMPLETE_FILE_ENV]: completeFile,
    } as NodeJS.ProcessEnv;

    await prewarmIntegrationSessions(['STAFF_ADMIN'], env, async () => undefined);

    expect(env[INTEGRATION_SESSION_WARMUP_COMPLETE_ENV]).toBe('true');
    expect(fs.readFileSync(completeFile, 'utf8')).toBe('complete\n');
  });

  test('marks an empty required warmup complete for fully mocked authenticated tags', async () => {
    const env = { CI: 'true' } as NodeJS.ProcessEnv;

    await prewarmIntegrationSessions([], env, async (identifiers) => expect(identifiers).toEqual([]));

    expect(env[INTEGRATION_SESSION_WARMUP_COMPLETE_ENV]).toBe('true');
  });

  test('removes a stale completion signal before required capture starts', async () => {
    const completeFile = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'integration-warmup-')), 'complete');
    fs.writeFileSync(completeFile, 'stale\n', 'utf8');
    const env = {
      CI: 'true',
      [INTEGRATION_SESSION_WARMUP_COMPLETE_ENV]: 'true',
      [INTEGRATION_SESSION_WARMUP_COMPLETE_FILE_ENV]: completeFile,
    } as NodeJS.ProcessEnv;

    await expect(
      prewarmIntegrationSessions(['STAFF_ADMIN'], env, async () => {
        expect(fs.existsSync(completeFile)).toBe(false);
        throw new Error('capture failed');
      })
    ).rejects.toThrow('capture failed');

    expect(env[INTEGRATION_SESSION_WARMUP_COMPLETE_ENV]).toBeUndefined();
    expect(fs.existsSync(completeFile)).toBe(false);
  });

  test('keeps local warmup best effort', async () => {
    let useFailureCooldown: boolean | undefined;
    await expect(
      prewarmIntegrationSessions(['STAFF_ADMIN'], {} as NodeJS.ProcessEnv, async (_identifiers, options) => {
        useFailureCooldown = options?.useFailureCooldown;
        throw new Error('capture failed');
      })
    ).resolves.toBeUndefined();
    expect(useFailureCooldown).toBe(false);
  });

  test('does not apply the integration worker gate to the shared nightly E2E config', async () => {
    const previousCi = process.env.CI;
    const previousConfiguredUsers = process.env.PW_INTEGRATION_SESSION_WARMUP_USERS;
    const previousComplete = process.env[INTEGRATION_SESSION_WARMUP_COMPLETE_ENV];
    try {
      process.env.CI = 'true';
      delete process.env.PW_INTEGRATION_SESSION_WARMUP_USERS;
      delete process.env[INTEGRATION_SESSION_WARMUP_COMPLETE_ENV];

      await globalSetup({ projects: [{ testDir: '/workspace/playwright_tests_new/E2E' }] } as FullConfig);

      expect(process.env[INTEGRATION_SESSION_WARMUP_COMPLETE_ENV]).toBeUndefined();
    } finally {
      if (previousCi === undefined) delete process.env.CI;
      else process.env.CI = previousCi;
      if (previousConfiguredUsers === undefined) delete process.env.PW_INTEGRATION_SESSION_WARMUP_USERS;
      else process.env.PW_INTEGRATION_SESSION_WARMUP_USERS = previousConfiguredUsers;
      if (previousComplete === undefined) delete process.env[INTEGRATION_SESSION_WARMUP_COMPLETE_ENV];
      else process.env[INTEGRATION_SESSION_WARMUP_COMPLETE_ENV] = previousComplete;
    }
  });

  test('records required integration completion when the selected tag uses fully mocked authentication', async () => {
    const completeFile = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'integration-global-setup-')), 'complete');
    const previousCi = process.env.CI;
    const previousIncludeTags = process.env.INTEGRATION_PW_INCLUDE_TAGS;
    const previousCompleteFile = process.env[INTEGRATION_SESSION_WARMUP_COMPLETE_FILE_ENV];
    const previousComplete = process.env[INTEGRATION_SESSION_WARMUP_COMPLETE_ENV];
    try {
      process.env.CI = 'true';
      process.env.INTEGRATION_PW_INCLUDE_TAGS = '@integration-platform-services';
      process.env[INTEGRATION_SESSION_WARMUP_COMPLETE_FILE_ENV] = completeFile;
      delete process.env[INTEGRATION_SESSION_WARMUP_COMPLETE_ENV];

      await globalSetup({ projects: [{ testDir: '/workspace/playwright_tests_new/integration' }] } as FullConfig);

      expect(process.env[INTEGRATION_SESSION_WARMUP_COMPLETE_ENV]).toBe('true');
      expect(fs.readFileSync(completeFile, 'utf8')).toBe('complete\n');
    } finally {
      if (previousCi === undefined) delete process.env.CI;
      else process.env.CI = previousCi;
      if (previousIncludeTags === undefined) delete process.env.INTEGRATION_PW_INCLUDE_TAGS;
      else process.env.INTEGRATION_PW_INCLUDE_TAGS = previousIncludeTags;
      if (previousCompleteFile === undefined) delete process.env[INTEGRATION_SESSION_WARMUP_COMPLETE_FILE_ENV];
      else process.env[INTEGRATION_SESSION_WARMUP_COMPLETE_FILE_ENV] = previousCompleteFile;
      if (previousComplete === undefined) delete process.env[INTEGRATION_SESSION_WARMUP_COMPLETE_ENV];
      else process.env[INTEGRATION_SESSION_WARMUP_COMPLETE_ENV] = previousComplete;
    }
  });
});

import { expect, test } from '@playwright/test';

import { resolveWorkAllocationUser } from '../../E2E/utils/test-setup/workAllocationShell.js';

type WorkAllocationEnvSnapshot = {
  PW_E2E_MANAGE_TASKS_EMAIL?: string;
  PW_E2E_MANAGE_TASKS_PASSWORD?: string;
  PW_E2E_MANAGE_TASKS_USER?: string;
  PW_IAC_CASEOFFICER_R1_EMAIL?: string;
  PW_IAC_CASEOFFICER_R1_PASSWORD?: string;
};

const WORK_ALLOCATION_ENV_KEYS = [
  'PW_E2E_MANAGE_TASKS_EMAIL',
  'PW_E2E_MANAGE_TASKS_PASSWORD',
  'PW_E2E_MANAGE_TASKS_USER',
  'PW_IAC_CASEOFFICER_R1_EMAIL',
  'PW_IAC_CASEOFFICER_R1_PASSWORD',
] as const;

function snapshotWorkAllocationEnv(): WorkAllocationEnvSnapshot {
  return Object.fromEntries(WORK_ALLOCATION_ENV_KEYS.map((key) => [key, process.env[key]]));
}

function restoreWorkAllocationEnv(snapshot: WorkAllocationEnvSnapshot): void {
  for (const key of WORK_ALLOCATION_ENV_KEYS) {
    const value = snapshot[key];
    if (typeof value === 'string') {
      process.env[key] = value;
    } else {
      delete process.env[key];
    }
  }
}

function clearWorkAllocationEnv(): void {
  for (const key of WORK_ALLOCATION_ENV_KEYS) {
    delete process.env[key];
  }
}

test.describe('Work Allocation shell unit tests', { tag: '@svc-internal' }, () => {
  test('resolves explicit manage-tasks credentials', () => {
    const originalEnv = snapshotWorkAllocationEnv();
    clearWorkAllocationEnv();
    process.env.PW_E2E_MANAGE_TASKS_EMAIL = 'wa-user@example.test';
    process.env.PW_E2E_MANAGE_TASKS_PASSWORD = 'secret';

    try {
      expect(resolveWorkAllocationUser()).toEqual({
        userIdentifier: 'PW_E2E_MANAGE_TASKS',
        email: 'wa-user@example.test',
        password: 'secret',
        sessionKey: 'wa-user@example.test',
      });
    } finally {
      restoreWorkAllocationEnv(originalEnv);
    }
  });

  test('fails fast when only one explicit manage-tasks credential is configured', () => {
    const originalEnv = snapshotWorkAllocationEnv();
    clearWorkAllocationEnv();
    process.env.PW_E2E_MANAGE_TASKS_EMAIL = 'wa-user@example.test';

    try {
      expect(() => resolveWorkAllocationUser()).toThrow(/must be set together/);
    } finally {
      restoreWorkAllocationEnv(originalEnv);
    }
  });

  test('resolves the configured alias before the default IAC user', () => {
    const originalEnv = snapshotWorkAllocationEnv();
    clearWorkAllocationEnv();
    process.env.PW_E2E_MANAGE_TASKS_USER = 'CUSTOM_WA_USER';
    process.env.PW_IAC_CASEOFFICER_R1_EMAIL = 'iac@example.test';
    process.env.PW_IAC_CASEOFFICER_R1_PASSWORD = 'secret';

    try {
      expect(resolveWorkAllocationUser()).toBe('CUSTOM_WA_USER');
    } finally {
      restoreWorkAllocationEnv(originalEnv);
    }
  });

  test('fails clearly instead of falling back to a hard-coded user with an empty password', () => {
    const originalEnv = snapshotWorkAllocationEnv();
    clearWorkAllocationEnv();

    try {
      expect(() => resolveWorkAllocationUser()).toThrow(/Live Work Allocation E2E requires/);
    } finally {
      restoreWorkAllocationEnv(originalEnv);
    }
  });
});

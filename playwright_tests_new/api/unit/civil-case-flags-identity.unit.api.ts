import type { Browser } from '@playwright/test';
import { expect, test } from '@playwright/test';

import { configureCivilCaseFlagsRuntimeUsers } from '../../E2E/utils/test-setup/civil/civilCaseFlagsSetup';
import { clearRuntimeUserCredentials } from '../../E2E/utils/runtimeUserCredentials';

const keys = [
  'PW_CIVIL_CASE_FLAGS_COURT_STAFF_ALIAS',
  'CIVIL_COURT_STAFF_USERNAME',
  'CIVIL_COURT_STAFF_PASSWORD',
  'PW_CIVIL_COURT_STAFF_EMAIL',
  'PW_CIVIL_COURT_STAFF_PASSWORD',
  'DEFAULT_PASSWORD',
  'TEST_PASSWORD',
  'IAC_CASEOFFICER_R1_USERNAME',
  'IAC_CASEOFFICER_R1_PASSWORD',
  'IAC_CASEOFFICER_R2_USERNAME',
  'IAC_CASEOFFICER_R2_PASSWORD',
] as const;

test.describe('Civil case flags configured identity', { tag: '@svc-internal' }, () => {
  let original: Array<string | undefined>;
  test.beforeEach(() => {
    original = keys.map((key) => process.env[key]);
    keys.forEach((key) => delete process.env[key]);
  });
  test.afterEach(() => {
    keys.forEach((key, index) => {
      if (original[index] === undefined) delete process.env[key];
      else process.env[key] = original[index];
    });
    clearRuntimeUserCredentials('CIVIL_COURT_STAFF');
  });

  test('does not provision a substitute when configured credentials are missing', async () => {
    await expect(configureCivilCaseFlagsRuntimeUsers({} as Browser)).rejects.toThrow(/requires configured/);
  });

  test('does not substitute a shared password for the configured account', async () => {
    process.env.CIVIL_COURT_STAFF_USERNAME = 'civil-fixture@example.com';
    process.env.DEFAULT_PASSWORD = 'shared-fixture-password';
    await expect(configureCivilCaseFlagsRuntimeUsers({} as Browser)).rejects.toThrow(/requires configured/);
  });

  test('publishes the exact configured account for leasing', async () => {
    process.env.PW_CIVIL_COURT_STAFF_EMAIL = 'civil-fixture@example.com';
    process.env.PW_CIVIL_COURT_STAFF_PASSWORD = 'fixture-password';
    await configureCivilCaseFlagsRuntimeUsers({} as Browser);
    expect(process.env.CIVIL_COURT_STAFF_USERNAME).toBe('civil-fixture@example.com');
    expect(process.env.CIVIL_COURT_STAFF_PASSWORD).toBe('fixture-password');
  });

  test('rejects an incomplete primary pair instead of mixing accounts', async () => {
    process.env.CIVIL_COURT_STAFF_USERNAME = 'primary@example.com';
    process.env.PW_CIVIL_COURT_STAFF_EMAIL = 'alternate@example.com';
    process.env.PW_CIVIL_COURT_STAFF_PASSWORD = 'alternate-password';
    await expect(configureCivilCaseFlagsRuntimeUsers({} as Browser)).rejects.toThrow(/requires configured/);
  });

  test('does not resolve an explicit alias through a different account fallback', async () => {
    process.env.PW_CIVIL_CASE_FLAGS_COURT_STAFF_ALIAS = 'IAC_CASEOFFICER_R2';
    process.env.IAC_CASEOFFICER_R1_USERNAME = 'r1@example.com';
    process.env.IAC_CASEOFFICER_R1_PASSWORD = 'r1-password';
    await expect(configureCivilCaseFlagsRuntimeUsers({} as Browser)).rejects.toThrow(/does not have configured credentials/);
  });
});

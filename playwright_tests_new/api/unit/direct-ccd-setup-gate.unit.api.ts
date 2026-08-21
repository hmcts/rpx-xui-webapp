import { expect, test } from '@playwright/test';

import { acquireDirectCcdSetupSlot, withDirectCcdSetupGate } from '../../E2E/utils/test-setup/directCcdSetupGate.js';
import { __test__ as caseSetupTest } from '../../E2E/utils/test-setup/caseSetup.js';

test.describe('direct CCD case setup gate', { tag: '@svc-internal' }, () => {
  test('does not expose gateway HTML or field values in validation diagnostics', () => {
    expect(caseSetupTest.summarizeDirectCcdValidationFailure('<html>504 Gateway Time-out</html>')).toBe(
      'CCD did not provide structured validation errors.'
    );
    expect(
      caseSetupTest.summarizeDirectCcdValidationFailure(
        JSON.stringify({ details: { field_errors: [{ id: 'ApplicantEmail', message: 'bad email: person@example.test' }] } })
      )
    ).toBe('CCD reported validation errors for: ApplicantEmail');
  });

  test('keeps pre-write CCD recovery bounded while allowing an AAT gateway to recover', () => {
    const previousValidateWindow = process.env.PW_E2E_CASE_SETUP_VALIDATE_RETRY_WINDOW_MS;
    const previousTokenWindow = process.env.PW_E2E_CASE_SETUP_EVENT_TOKEN_RETRY_WINDOW_MS;

    try {
      delete process.env.PW_E2E_CASE_SETUP_VALIDATE_RETRY_WINDOW_MS;
      delete process.env.PW_E2E_CASE_SETUP_EVENT_TOKEN_RETRY_WINDOW_MS;
      expect(caseSetupTest.resolveValidateRetryWindowMs()).toBe(60_000);
      expect(caseSetupTest.resolveEventTokenRetryWindowMs()).toBe(60_000);

      process.env.PW_E2E_CASE_SETUP_VALIDATE_RETRY_WINDOW_MS = '5000';
      process.env.PW_E2E_CASE_SETUP_EVENT_TOKEN_RETRY_WINDOW_MS = '7000';
      expect(caseSetupTest.resolveValidateRetryWindowMs()).toBe(5000);
      expect(caseSetupTest.resolveEventTokenRetryWindowMs()).toBe(7000);
    } finally {
      if (previousValidateWindow === undefined) {
        delete process.env.PW_E2E_CASE_SETUP_VALIDATE_RETRY_WINDOW_MS;
      } else {
        process.env.PW_E2E_CASE_SETUP_VALIDATE_RETRY_WINDOW_MS = previousValidateWindow;
      }
      if (previousTokenWindow === undefined) {
        delete process.env.PW_E2E_CASE_SETUP_EVENT_TOKEN_RETRY_WINDOW_MS;
      } else {
        process.env.PW_E2E_CASE_SETUP_EVENT_TOKEN_RETRY_WINDOW_MS = previousTokenWindow;
      }
    }
  });

  test('uses an available slot and always releases it after the case setup', async () => {
    const lockedPaths: string[] = [];
    let releases = 0;
    const deps = {
      appendFile: async () => undefined,
      lock: async (file: string) => {
        lockedPaths.push(file);
        return async () => {
          releases += 1;
        };
      },
      mkdir: async () => undefined,
      now: () => 0,
      sleep: async () => undefined,
    };

    await expect(
      withDirectCcdSetupGate(
        async () => {
          throw new Error('CCD returned 504');
        },
        { PW_E2E_CCD_SETUP_CONCURRENCY: '3' },
        deps
      )
    ).rejects.toThrow('CCD returned 504');

    expect(lockedPaths).toHaveLength(1);
    expect(releases).toBe(1);
  });

  test('waits for capacity instead of treating all occupied slots as a missing-user failure', async () => {
    let now = 0;
    let attempts = 0;
    const slot = await acquireDirectCcdSetupSlot(
      { PW_E2E_CCD_SETUP_CONCURRENCY: '2', PW_E2E_CCD_SETUP_WAIT_MS: '1000' },
      {
        appendFile: async () => undefined,
        lock: async () => {
          attempts += 1;
          if (attempts <= 2) throw Object.assign(new Error('locked'), { code: 'ELOCKED' });
          return async () => undefined;
        },
        mkdir: async () => undefined,
        now: () => now,
        sleep: async () => {
          now += 500;
        },
      }
    );

    expect(slot.slot).toBe(1);
    expect(attempts).toBe(3);
  });
});

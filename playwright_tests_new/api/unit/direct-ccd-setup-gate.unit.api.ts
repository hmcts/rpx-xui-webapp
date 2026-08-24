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

  test('retries the read-only aggregated jurisdiction lookup before case creation', async () => {
    let attempts = 0;
    const recoveredResponse = { status: () => 200 };
    const request = {
      scenario: 'direct-ccd-read-recovery',
      page: {
        isClosed: () => false,
        waitForTimeout: async () => undefined,
        request: {
          get: async () => {
            attempts += 1;
            return attempts === 1 ? { status: () => 503 } : recoveredResponse;
          },
        },
      },
    } as never;

    await expect(
      caseSetupTest.requestAggregatedJurisdictionsWithRetry(request, 'aggregated/caseworkers/user/jurisdictions', 1000)
    ).resolves.toBe(recoveredResponse);
    expect(attempts).toBe(2);
  });

  test('falls back to configured CCD identifiers after bounded read-only transport failures', async () => {
    let attempts = 0;
    const request = {
      scenario: 'direct-ccd-read-fallback',
      page: {
        isClosed: () => false,
        waitForTimeout: async () => undefined,
        request: {
          get: async () => {
            attempts += 1;
            throw new Error('net::ERR_HTTP2_PROTOCOL_ERROR');
          },
        },
      },
    } as never;

    await expect(
      caseSetupTest.requestAggregatedJurisdictionsWithRetry(request, 'aggregated/caseworkers/user/jurisdictions', 1000)
    ).resolves.toBeUndefined();
    expect(attempts).toBe(3);
  });

  test('fails closed when the selected identity lacks create-access jurisdictions', async () => {
    const request = {
      scenario: 'identity-permission-denied',
      jurisdiction: 'DIVORCE',
      caseType: 'XUI Case PoC',
      page: {
        isClosed: () => false,
        waitForTimeout: async () => undefined,
        request: { get: async () => ({ status: () => 404 }) },
      },
    } as never;

    await expect(
      caseSetupTest.resolveApiIdsFromAggregatedJurisdictions({ request, userId: 'user-1', effectiveTimeoutMs: 100 })
    ).rejects.toThrow(/identity preflight failed with HTTP 404/);
  });

  test('fails closed when create access does not include the requested jurisdiction and case type', async () => {
    const request = {
      scenario: 'identity-permission-mismatch',
      jurisdiction: 'DIVORCE',
      caseType: 'XUI Case PoC',
      page: {
        isClosed: () => false,
        waitForTimeout: async () => undefined,
        request: {
          get: async () => ({
            status: () => 200,
            json: async () => [{ id: 'EMPLOYMENT', caseTypes: [{ id: 'ET_EnglandWales' }] }],
          }),
        },
      },
    } as never;

    await expect(
      caseSetupTest.resolveApiIdsFromAggregatedJurisdictions({ request, userId: 'user-1', effectiveTimeoutMs: 100 })
    ).rejects.toThrow(/did not grant 'DIVORCE' create access/);
  });

  test('fails closed when the requested case type is not granted', async () => {
    const request = {
      scenario: 'identity-case-type-mismatch',
      jurisdiction: 'DIVORCE',
      caseType: 'XUI Case PoC',
      page: {
        isClosed: () => false,
        waitForTimeout: async () => undefined,
        request: {
          get: async () => ({
            status: () => 200,
            json: async () => [{ id: 'DIVORCE', caseTypes: [{ id: 'xuiTestCaseType' }] }],
          }),
        },
      },
    } as never;

    await expect(
      caseSetupTest.resolveApiIdsFromAggregatedJurisdictions({ request, userId: 'user-1', effectiveTimeoutMs: 100 })
    ).rejects.toThrow(/did not grant case type 'XUI Case PoC'/);
  });

  test('retries transient pre-write CCD transport failures', async () => {
    let attempts = 0;
    const request = {
      scenario: 'direct-ccd-pre-write-recovery',
      page: {
        isClosed: () => false,
        waitForTimeout: async () => undefined,
      },
    } as never;

    await expect(
      caseSetupTest.retryTransientApiRequest(
        request,
        async () => {
          attempts += 1;
          if (attempts === 1) throw new Error('SSL routines: decryption failed or bad record mac');
          return 'recovered';
        },
        Date.now() + 1000,
        1,
        'direct CCD event token'
      )
    ).resolves.toBe('recovered');
    expect(attempts).toBe(2);
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

  test('caps the gate wait so case setup retains its execution budget', async () => {
    expect(caseSetupTest.resolveCaseSetupGateBudgetMs()).toBe(5 * 60_000);
    let now = 0;
    await expect(
      acquireDirectCcdSetupSlot(
        { PW_E2E_CCD_SETUP_CONCURRENCY: '1', PW_E2E_CCD_SETUP_WAIT_MS: '120000' },
        {
          appendFile: async () => undefined,
          lock: async () => {
            throw Object.assign(new Error('locked'), { code: 'ELOCKED' });
          },
          mkdir: async () => undefined,
          now: () => now,
          sleep: async () => {
            now += 500;
          },
        },
        { maxWaitMs: 1_000 }
      )
    ).rejects.toThrow('Timed out waiting 1000ms');
  });
});

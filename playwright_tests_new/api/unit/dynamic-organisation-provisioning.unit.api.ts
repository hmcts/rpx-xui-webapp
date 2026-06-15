import { expect, test } from '@playwright/test';

import {
  DynamicOrganisationProvisioningError,
  __test__ as organisationProvisioningTest,
} from '../../E2E/utils/professional-user/organisationProvisioning.js';
import { __test__ as organisationResolverTest } from '../../E2E/utils/test-setup/dynamicOrganisationResolver.js';

test.describe.configure({ mode: 'serial' });

type ApiCall = {
  method: 'GET' | 'POST' | 'PUT';
  url: string;
  data?: unknown;
};

type DynamicOrganisationEnvSnapshot = {
  PW_DYNAMIC_ORGANISATION_MODE?: string;
  PW_DYNAMIC_ORGANISATION_RUN_ID?: string;
  PW_DYNAMIC_ORGANISATION_APPROVAL_STRATEGY?: string;
};

function response(status: number, body: unknown) {
  return {
    ok: () => status >= 200 && status < 300,
    status: () => status,
    text: async () => JSON.stringify(body),
  };
}

function snapshotDynamicOrganisationEnv(): DynamicOrganisationEnvSnapshot {
  return {
    PW_DYNAMIC_ORGANISATION_MODE: process.env.PW_DYNAMIC_ORGANISATION_MODE,
    PW_DYNAMIC_ORGANISATION_RUN_ID: process.env.PW_DYNAMIC_ORGANISATION_RUN_ID,
    PW_DYNAMIC_ORGANISATION_APPROVAL_STRATEGY: process.env.PW_DYNAMIC_ORGANISATION_APPROVAL_STRATEGY,
  };
}

function restoreDynamicOrganisationEnv(snapshot: DynamicOrganisationEnvSnapshot): void {
  for (const [key, value] of Object.entries(snapshot)) {
    if (typeof value === 'string') {
      process.env[key] = value;
    } else {
      delete process.env[key];
    }
  }
}

test.describe('Dynamic organisation provisioning unit tests', { tag: '@svc-internal' }, () => {
  test('creates, approves, and polls an active organisation', async () => {
    const calls: ApiCall[] = [];
    const apiContext = {
      post: async (url: string, options: { data?: unknown }) => {
        calls.push({ method: 'POST', url, data: options.data });
        return response(201, { organisationIdentifier: 'ORG-123' });
      },
      put: async (url: string, options: { data?: unknown }) => {
        calls.push({ method: 'PUT', url, data: options.data });
        return response(200, { organisationIdentifier: 'ORG-123', status: 'ACTIVE' });
      },
      get: async (url: string) => {
        calls.push({ method: 'GET', url });
        return response(200, [{ organisationIdentifier: 'ORG-123', status: 'ACTIVE' }]);
      },
      dispose: async () => undefined,
    };

    const result = await organisationProvisioningTest.createApprovedOrganisationFlow(
      {
        runId: 'EXUI-4767',
        timeoutMs: 1_000,
        pollIntervalMs: 1,
      },
      {
        resolvePrerequisites: async () => ({
          rdProfessionalApiPath: 'https://rd-professional-api.example.test',
          headers: {
            Authorization: 'Bearer token',
            ServiceAuthorization: 'Bearer s2s',
          },
        }),
        createApiContext: async (baseURL, headers) => {
          expect(baseURL).toBe('https://rd-professional-api.example.test');
          expect(headers.ServiceAuthorization).toBe('Bearer s2s');
          return apiContext as never;
        },
        now: () => Date.now(),
        sleep: async () => undefined,
      }
    );

    expect(result).toMatchObject({
      organisationId: 'ORG-123',
      name: 'PW Dynamic Org EXUI-4767',
      status: 'ACTIVE',
      createStatus: 201,
      approveStatus: 200,
      pollAttempts: 1,
      approvalStrategy: 'rd-professional-api',
    });
    expect(result.totalElapsedMs).toEqual(expect.any(Number));
    expect(result.timings).toMatchObject([
      { stage: 'create', status: 201 },
      { stage: 'approve', status: 200, strategy: 'rd-professional-api' },
      { stage: 'poll-active', status: 200 },
    ]);
    expect(calls.map((call) => `${call.method} ${call.url}`)).toEqual([
      'POST /refdata/internal/v1/organisations',
      'PUT /refdata/internal/v1/organisations/ORG-123',
      'GET /refdata/internal/v1/organisations?status=Active',
    ]);
    expect(calls[1].data).toMatchObject({
      organisationIdentifier: 'ORG-123',
      status: 'ACTIVE',
    });
    const createPayload = calls[0].data as {
      sraId: string;
      contactInformation: Array<{ dxAddress: Array<{ dxNumber: string; dxExchange: string }> }>;
    };
    expect(createPayload.sraId.length).toBeLessThanOrEqual(15);
    expect(createPayload.sraId).toBe('PWEXUI4767');
    expect(createPayload.contactInformation[0].dxAddress[0].dxNumber.length).toBeLessThanOrEqual(13);
    expect(createPayload.contactInformation[0].dxAddress[0].dxNumber).toBe('DXEXUI4767');
    expect(createPayload.contactInformation[0].dxAddress[0].dxExchange.length).toBeLessThanOrEqual(40);
  });

  test('keeps unique run-id suffixes when bounded identifiers must be truncated', async () => {
    const calls: ApiCall[] = [];
    const apiContext = {
      post: async (url: string, options: { data?: unknown }) => {
        calls.push({ method: 'POST', url, data: options.data });
        return response(201, { organisationIdentifier: 'ORG-789' });
      },
      put: async (url: string, options: { data?: unknown }) => {
        calls.push({ method: 'PUT', url, data: options.data });
        return response(200, { organisationIdentifier: 'ORG-789', status: 'ACTIVE' });
      },
      get: async (url: string) => {
        calls.push({ method: 'GET', url });
        return response(200, [{ organisationIdentifier: 'ORG-789', status: 'ACTIVE' }]);
      },
      dispose: async () => undefined,
    };

    await organisationProvisioningTest.createApprovedOrganisationFlow(
      {
        runId: 'EXUI-4767-live-20260615144212',
        timeoutMs: 1_000,
        pollIntervalMs: 1,
      },
      {
        resolvePrerequisites: async () => ({
          rdProfessionalApiPath: 'https://rd-professional-api.example.test',
          headers: {},
        }),
        createApiContext: async () => apiContext as never,
        now: () => Date.now(),
        sleep: async () => undefined,
      }
    );

    const createPayload = calls[0].data as {
      sraId: string;
      contactInformation: Array<{ dxAddress: Array<{ dxNumber: string }> }>;
    };
    expect(createPayload.sraId).toBe('PW0260615144212');
    expect(createPayload.contactInformation[0].dxAddress[0].dxNumber).toBe('DX60615144212');
  });

  test('falls back from RD Professional approval to approve-org API when auto strategy receives 403', async () => {
    const rdCalls: ApiCall[] = [];
    const approveOrgCalls: ApiCall[] = [];
    const rdApiContext = {
      post: async (url: string, options: { data?: unknown }) => {
        rdCalls.push({ method: 'POST', url, data: options.data });
        return response(201, { organisationIdentifier: 'ORG-AUTO' });
      },
      put: async (url: string, options: { data?: unknown }) => {
        rdCalls.push({ method: 'PUT', url, data: options.data });
        return response(403, { error: 'forbidden' });
      },
      get: async (url: string) => {
        rdCalls.push({ method: 'GET', url });
        return response(200, [{ organisationIdentifier: 'ORG-AUTO', status: 'ACTIVE' }]);
      },
      dispose: async () => undefined,
    };
    const approveOrgApiContext = {
      get: async (url: string) => {
        approveOrgCalls.push({ method: 'GET', url });
        return response(200, {
          organisations: [{ organisationIdentifier: 'ORG-AUTO', name: 'PW Dynamic Org auto-approval' }],
        });
      },
      put: async (url: string, options: { data?: unknown }) => {
        approveOrgCalls.push({ method: 'PUT', url, data: options.data });
        return response(200, { organisationIdentifier: 'ORG-AUTO', status: 'ACTIVE' });
      },
      dispose: async () => undefined,
    };

    const result = await organisationProvisioningTest.createApprovedOrganisationFlow(
      {
        runId: 'auto-approval',
        approvalStrategy: 'auto',
        timeoutMs: 1_000,
        pollIntervalMs: 1,
      },
      {
        resolvePrerequisites: async () => ({
          rdProfessionalApiPath: 'https://rd-professional-api.example.test',
          headers: {},
        }),
        createApiContext: async () => rdApiContext as never,
        createApproveOrgApiContext: async (baseURL) => {
          expect(baseURL).toBe('https://administer-orgs.aat.platform.hmcts.net');
          return approveOrgApiContext as never;
        },
        now: () => Date.now(),
        sleep: async () => undefined,
      }
    );

    expect(result).toMatchObject({
      organisationId: 'ORG-AUTO',
      status: 'ACTIVE',
      approveStatus: 200,
      approvalStrategy: 'approve-org-api',
      pollAttempts: 1,
    });
    expect(rdCalls.map((call) => `${call.method} ${call.url}`)).toEqual([
      'POST /refdata/internal/v1/organisations',
      'PUT /refdata/internal/v1/organisations/ORG-AUTO',
      'GET /refdata/internal/v1/organisations?status=Active',
    ]);
    expect(approveOrgCalls.map((call) => `${call.method} ${call.url}`)).toEqual([
      'GET /api/organisations?organisationId=ORG-AUTO&version=v1',
      'PUT /api/organisations/ORG-AUTO',
    ]);
    expect(approveOrgCalls[1].data).toMatchObject({
      organisationIdentifier: 'ORG-AUTO',
      name: 'PW Dynamic Org auto-approval',
      status: 'ACTIVE',
    });
    expect(approveOrgCalls[1].data).not.toHaveProperty('organisations');
    expect(result.timings).toMatchObject([
      { stage: 'create', status: 201 },
      { stage: 'approve', status: 200, strategy: 'approve-org-api' },
      { stage: 'poll-active', status: 200 },
    ]);
  });

  test('approval strategy parsing accepts case-insensitive supported values and rejects invalid values', () => {
    const originalEnv = snapshotDynamicOrganisationEnv();
    try {
      process.env.PW_DYNAMIC_ORGANISATION_APPROVAL_STRATEGY = 'AUTO';
      expect(organisationProvisioningTest.resolveApprovalStrategy({})).toBe('auto');

      process.env.PW_DYNAMIC_ORGANISATION_APPROVAL_STRATEGY = 'approve-org-api';
      expect(organisationProvisioningTest.resolveApprovalStrategy({})).toBe('approve-org-api');

      process.env.PW_DYNAMIC_ORGANISATION_APPROVAL_STRATEGY = 'approve-org';
      expect(() => organisationProvisioningTest.resolveApprovalStrategy({})).toThrow(
        /Unsupported PW_DYNAMIC_ORGANISATION_APPROVAL_STRATEGY='approve-org'/
      );
    } finally {
      restoreDynamicOrganisationEnv(originalEnv);
    }
  });

  test('requires an approve-org storage state when approve-org approval strategy has no injected context', async () => {
    const originalStorageState = process.env.PW_APPROVE_ORG_API_STORAGE_STATE;
    delete process.env.PW_APPROVE_ORG_API_STORAGE_STATE;
    const apiContext = {
      post: async () => response(201, { organisationIdentifier: 'ORG-NO-STATE' }),
      dispose: async () => undefined,
    };

    try {
      await expect(
        organisationProvisioningTest.createApprovedOrganisationFlow(
          {
            runId: 'missing-state',
            approvalStrategy: 'approve-org-api',
            timeoutMs: 1_000,
            pollIntervalMs: 1,
          },
          {
            resolvePrerequisites: async () => ({
              rdProfessionalApiPath: 'https://rd-professional-api.example.test',
              headers: {},
            }),
            createApiContext: async () => apiContext as never,
            now: () => Date.now(),
            sleep: async () => undefined,
          }
        )
      ).rejects.toMatchObject<Partial<DynamicOrganisationProvisioningError>>({
        stage: 'approve',
        endpoint: 'https://administer-orgs.aat.platform.hmcts.net',
        status: 'unknown',
        timings: [
          { stage: 'create', status: 201 },
          { stage: 'approve', status: 'unknown' },
        ],
        responsePreview: {
          message:
            'PW_APPROVE_ORG_API_STORAGE_STATE is required when PW_DYNAMIC_ORGANISATION_APPROVAL_STRATEGY uses approve-org-api. Capture an authenticated approve-org storage state for an approval-capable user before this flow runs.',
        },
      });
    } finally {
      if (typeof originalStorageState === 'string') {
        process.env.PW_APPROVE_ORG_API_STORAGE_STATE = originalStorageState;
      } else {
        delete process.env.PW_APPROVE_ORG_API_STORAGE_STATE;
      }
    }
  });

  test('approve-org approval fails before PUT when read response has no matching organisation', async () => {
    const approveOrgCalls: ApiCall[] = [];
    const rdApiContext = {
      post: async () => response(201, { organisationIdentifier: 'ORG-MISSING' }),
      dispose: async () => undefined,
    };
    const approveOrgApiContext = {
      get: async (url: string) => {
        approveOrgCalls.push({ method: 'GET', url });
        return response(200, {
          organisations: [{ organisationIdentifier: 'ORG-OTHER', name: 'Other org' }],
        });
      },
      put: async (url: string, options: { data?: unknown }) => {
        approveOrgCalls.push({ method: 'PUT', url, data: options.data });
        return response(200, { organisationIdentifier: 'ORG-MISSING', status: 'ACTIVE' });
      },
      dispose: async () => undefined,
    };

    await expect(
      organisationProvisioningTest.createApprovedOrganisationFlow(
        {
          runId: 'missing-approve-org-match',
          approvalStrategy: 'approve-org-api',
          timeoutMs: 1_000,
          pollIntervalMs: 1,
        },
        {
          resolvePrerequisites: async () => ({
            rdProfessionalApiPath: 'https://rd-professional-api.example.test',
            headers: {},
          }),
          createApiContext: async () => rdApiContext as never,
          createApproveOrgApiContext: async () => approveOrgApiContext as never,
          now: () => Date.now(),
          sleep: async () => undefined,
        }
      )
    ).rejects.toMatchObject<Partial<DynamicOrganisationProvisioningError>>({
      stage: 'approve',
      endpoint: '/api/organisations?organisationId=ORG-MISSING&version=v1',
      status: 200,
      responsePreview: {
        message: "Approve-org API did not return organisation 'ORG-MISSING'.",
      },
    });
    expect(approveOrgCalls.map((call) => `${call.method} ${call.url}`)).toEqual([
      'GET /api/organisations?organisationId=ORG-MISSING&version=v1',
    ]);
  });

  test('surfaces sanitized create-stage diagnostics when RD Professional rejects the organisation', async () => {
    const apiContext = {
      post: async () => response(500, { message: 'downstream unavailable' }),
      dispose: async () => undefined,
    };

    await expect(
      organisationProvisioningTest.createApprovedOrganisationFlow(
        {
          runId: 'reject-me',
          timeoutMs: 1_000,
          pollIntervalMs: 1,
        },
        {
          resolvePrerequisites: async () => ({
            rdProfessionalApiPath: 'https://rd-professional-api.example.test',
            headers: {},
          }),
          createApiContext: async () => apiContext as never,
          now: () => Date.now(),
          sleep: async () => undefined,
        }
      )
    ).rejects.toMatchObject<Partial<DynamicOrganisationProvisioningError>>({
      stage: 'create',
      endpoint: '/refdata/internal/v1/organisations',
      status: 500,
      organisationName: 'PW Dynamic Org reject-me',
      responsePreview: { message: 'downstream unavailable' },
      timings: [{ stage: 'create', status: 500 }],
    });
  });

  test('resolver creates a dynamic organisation by default without a static organisation id', async () => {
    const originalEnv = snapshotDynamicOrganisationEnv();
    delete process.env.PW_DYNAMIC_ORGANISATION_MODE;
    let createCount = 0;

    try {
      const result = await organisationResolverTest.resolveDynamicOrganisationId(
        { professionalUserUtils: {} as never },
        {
          createApprovedOrganisation: async () => {
            createCount += 1;
            return {
              organisationId: 'ORG-DEFAULT',
              name: 'PW Dynamic Org local',
              status: 'ACTIVE',
              createStatus: 201,
              approveStatus: 200,
              pollAttempts: 1,
              approvalStrategy: 'rd-professional-api',
              timings: [{ stage: 'create', elapsedMs: 10, status: 201 }],
              totalElapsedMs: 10,
            };
          },
          readCache: async () => undefined,
          writeCache: async () => undefined,
          withLock: async (_lockPath, action) => action(),
          nowIso: () => '2026-06-15T00:00:00.000Z',
        }
      );

      expect(result).toMatchObject({
        source: 'dynamic',
        organisationId: 'ORG-DEFAULT',
        mode: 'dynamic',
        cacheKey: 'local',
        reusedFromCache: false,
      });
      expect(createCount).toBe(1);
    } finally {
      restoreDynamicOrganisationEnv(originalEnv);
    }
  });

  test('resolver creates and caches one active organisation when dynamic mode is enabled', async () => {
    const originalEnv = snapshotDynamicOrganisationEnv();
    process.env.PW_DYNAMIC_ORGANISATION_RUN_ID = 'EXUI-4767/run 1';
    delete process.env.PW_DYNAMIC_ORGANISATION_MODE;

    const cache: Record<string, unknown> = {};
    let createCount = 0;
    const locks: string[] = [];
    const writes: unknown[] = [];

    try {
      const result = await organisationResolverTest.resolveDynamicOrganisationId(
        { professionalUserUtils: {} as never },
        {
          createApprovedOrganisation: async (_utils, options) => {
            createCount += 1;
            expect(options.runId).toBe('EXUI-4767-run-1');
            return {
              organisationId: 'ORG-456',
              name: 'PW Dynamic Org EXUI-4767-run-1',
              status: 'ACTIVE',
              createStatus: 201,
              approveStatus: 200,
              pollAttempts: 2,
              approvalStrategy: 'rd-professional-api',
              timings: [
                { stage: 'create', elapsedMs: 10, status: 201 },
                { stage: 'approve', elapsedMs: 20, status: 200, strategy: 'rd-professional-api' },
                { stage: 'poll-active', elapsedMs: 30, status: 200 },
              ],
              totalElapsedMs: 60,
            };
          },
          readCache: async (cachePath) => cache[cachePath] as never,
          writeCache: async (cachePath, entry) => {
            cache[cachePath] = entry;
            writes.push(entry);
          },
          withLock: async (lockPath, action) => {
            locks.push(lockPath);
            return action();
          },
          nowIso: () => '2026-06-15T00:00:00.000Z',
        }
      );

      expect(result).toMatchObject({
        source: 'dynamic',
        organisationId: 'ORG-456',
        name: 'PW Dynamic Org EXUI-4767-run-1',
        status: 'ACTIVE',
        mode: 'dynamic',
        cacheKey: 'EXUI-4767-run-1',
        createStatus: 201,
        approveStatus: 200,
        pollAttempts: 2,
        approvalStrategy: 'rd-professional-api',
        totalElapsedMs: 60,
        reusedFromCache: false,
      });
      expect(result.source === 'dynamic' ? result.timings : []).toHaveLength(3);
      expect(createCount).toBe(1);
      expect(locks[0]).toContain('EXUI-4767-run-1.json.lock');
      expect(writes).toHaveLength(1);
      expect(writes[0]).toMatchObject({
        approvalStrategy: 'rd-professional-api',
        totalElapsedMs: 60,
      });

      const cached = await organisationResolverTest.resolveDynamicOrganisationId(
        { professionalUserUtils: {} as never },
        {
          createApprovedOrganisation: async () => {
            createCount += 1;
            throw new Error('should reuse cache');
          },
          readCache: async (cachePath) => cache[cachePath] as never,
          writeCache: async () => undefined,
          withLock: async (_lockPath, action) => action(),
          nowIso: () => '2026-06-15T00:00:00.000Z',
        }
      );

      expect(cached).toMatchObject({
        source: 'dynamic',
        organisationId: 'ORG-456',
        mode: 'dynamic',
        cacheKey: 'EXUI-4767-run-1',
        approvalStrategy: 'rd-professional-api',
        totalElapsedMs: 60,
        reusedFromCache: true,
      });
      expect(createCount).toBe(1);
    } finally {
      restoreDynamicOrganisationEnv(originalEnv);
    }
  });

  test('resolver ignores a cache entry that belongs to a different run id', async () => {
    const originalEnv = snapshotDynamicOrganisationEnv();
    process.env.PW_DYNAMIC_ORGANISATION_RUN_ID = 'EXUI-4767-current-run';
    const cache: Record<string, unknown> = {};
    let createCount = 0;

    try {
      const result = await organisationResolverTest.resolveDynamicOrganisationId(
        { professionalUserUtils: {} as never },
        {
          createApprovedOrganisation: async () => {
            createCount += 1;
            return {
              organisationId: 'ORG-CURRENT',
              name: 'PW Dynamic Org EXUI-4767-current-run',
              status: 'ACTIVE',
              createStatus: 201,
              approveStatus: 200,
              pollAttempts: 1,
              approvalStrategy: 'rd-professional-api',
              timings: [
                { stage: 'create', elapsedMs: 10, status: 201 },
                { stage: 'approve', elapsedMs: 10, status: 200, strategy: 'rd-professional-api' },
                { stage: 'poll-active', elapsedMs: 10, status: 200 },
              ],
              totalElapsedMs: 30,
            };
          },
          readCache: async (cachePath) => {
            cache[cachePath] ??= {
              organisationId: 'ORG-STALE',
              name: 'PW Dynamic Org stale',
              status: 'ACTIVE',
              cacheKey: 'EXUI-4767-stale-run',
              createdAt: '2026-06-14T00:00:00.000Z',
            };
            return cache[cachePath] as never;
          },
          writeCache: async (cachePath, entry) => {
            cache[cachePath] = entry;
          },
          withLock: async (_lockPath, action) => action(),
          nowIso: () => '2026-06-15T00:00:00.000Z',
        }
      );

      expect(result).toMatchObject({
        source: 'dynamic',
        organisationId: 'ORG-CURRENT',
        cacheKey: 'EXUI-4767-current-run',
        reusedFromCache: false,
      });
      expect(createCount).toBe(1);
    } finally {
      restoreDynamicOrganisationEnv(originalEnv);
    }
  });

  test('resolver rejects deprecated static or auto modes now that static org fallback is retired', async () => {
    const originalEnv = snapshotDynamicOrganisationEnv();
    try {
      for (const deprecatedMode of ['static', 'auto']) {
        process.env.PW_DYNAMIC_ORGANISATION_MODE = deprecatedMode;
        await expect(
          organisationResolverTest.resolveDynamicOrganisationId(
            { professionalUserUtils: {} as never },
            {
              createApprovedOrganisation: async () => {
                throw new Error('deprecated mode should fail before provisioning');
              },
              readCache: async () => undefined,
              writeCache: async () => undefined,
              withLock: async (_lockPath, action) => action(),
              nowIso: () => '2026-06-15T00:00:00.000Z',
            }
          )
        ).rejects.toThrow(/Static organisation fallback has been retired/);
      }
    } finally {
      restoreDynamicOrganisationEnv(originalEnv);
    }
  });

  test('resolver dynamic mode does not fall back to static org when approval fails', async () => {
    const originalEnv = snapshotDynamicOrganisationEnv();
    process.env.PW_DYNAMIC_ORGANISATION_MODE = 'dynamic';

    try {
      await expect(
        organisationResolverTest.resolveDynamicOrganisationId(
          { professionalUserUtils: {} as never },
          {
            createApprovedOrganisation: async () => {
              throw new DynamicOrganisationProvisioningError(
                'approve',
                '/refdata/internal/v1/organisations/ORG-403',
                403,
                'PW Dynamic Org mandatory',
                { message: 'forbidden' }
              );
            },
            readCache: async () => undefined,
            writeCache: async () => undefined,
            withLock: async (_lockPath, action) => action(),
            nowIso: () => '2026-06-15T00:00:00.000Z',
          }
        )
      ).rejects.toMatchObject<Partial<DynamicOrganisationProvisioningError>>({
        stage: 'approve',
        status: 403,
      });
    } finally {
      restoreDynamicOrganisationEnv(originalEnv);
    }
  });

  test('resolver explicit dynamic mode creates a dynamic org', async () => {
    const originalEnv = snapshotDynamicOrganisationEnv();
    process.env.PW_DYNAMIC_ORGANISATION_MODE = 'dynamic';
    process.env.PW_DYNAMIC_ORGANISATION_RUN_ID = 'EXUI-4767-dynamic';

    try {
      const result = await organisationResolverTest.resolveDynamicOrganisationId(
        { professionalUserUtils: {} as never },
        {
          createApprovedOrganisation: async (_utils, options) => {
            expect(options.runId).toBe('EXUI-4767-dynamic');
            return {
              organisationId: 'ORG-DYNAMIC',
              name: 'PW Dynamic Org EXUI-4767-dynamic',
              status: 'ACTIVE',
              createStatus: 201,
              approveStatus: 200,
              pollAttempts: 1,
              approvalStrategy: 'rd-professional-api',
              timings: [
                { stage: 'create', elapsedMs: 10, status: 201 },
                { stage: 'approve', elapsedMs: 10, status: 200, strategy: 'rd-professional-api' },
                { stage: 'poll-active', elapsedMs: 10, status: 200 },
              ],
              totalElapsedMs: 30,
            };
          },
          readCache: async () => undefined,
          writeCache: async () => undefined,
          withLock: async (_lockPath, action) => action(),
          nowIso: () => '2026-06-15T00:00:00.000Z',
        }
      );

      expect(result).toMatchObject({
        source: 'dynamic',
        organisationId: 'ORG-DYNAMIC',
        mode: 'dynamic',
        reusedFromCache: false,
      });
    } finally {
      restoreDynamicOrganisationEnv(originalEnv);
    }
  });
});

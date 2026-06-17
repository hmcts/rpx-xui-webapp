import { expect, test } from '@playwright/test';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

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
  headers?: Record<string, string>;
};

type DynamicOrganisationEnvSnapshot = {
  PW_DYNAMIC_ORGANISATION_MODE?: string;
  PW_DYNAMIC_ORGANISATION_RUN_ID?: string;
  PW_DYNAMIC_ORGANISATION_APPROVAL_STRATEGY?: string;
  PW_APPROVE_ORG_API_STORAGE_STATE?: string;
  GITHUB_RUN_ID?: string;
  BUILD_TAG?: string;
  JOB_NAME?: string;
  JOB_BASE_NAME?: string;
  BUILD_NUMBER?: string;
  BUILD_ID?: string;
  BUILD_BUILDID?: string;
  BUILD_BUILDNUMBER?: string;
  CI_PIPELINE_ID?: string;
  PW_TEST_RUN_ID?: string;
  CI?: string;
  JENKINS_URL?: string;
  BUILD_URL?: string;
  GITHUB_ACTIONS?: string;
  TF_BUILD?: string;
  GITLAB_CI?: string;
  APPROVE_ORG_ADMIN_USERNAME?: string;
  APPROVE_ORG_ADMIN_PASSWORD?: string;
  AO_ADMIN_USERNAME?: string;
  AO_ADMIN_PASSWORD?: string;
  TEST_EMAIL?: string;
  TEST_PASSWORD?: string;
  TEST_API_EMAIL_ADMIN?: string;
  TEST_API_PASSWORD_ADMIN?: string;
  PW_DYNAMIC_ORGANISATION_LOCK_TIMEOUT_MS?: string;
  PW_DYNAMIC_ORGANISATION_LOCK_POLL_INTERVAL_MS?: string;
  PW_DYNAMIC_ORGANISATION_LOCK_STALE_MS?: string;
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
    PW_APPROVE_ORG_API_STORAGE_STATE: process.env.PW_APPROVE_ORG_API_STORAGE_STATE,
    GITHUB_RUN_ID: process.env.GITHUB_RUN_ID,
    BUILD_TAG: process.env.BUILD_TAG,
    JOB_NAME: process.env.JOB_NAME,
    JOB_BASE_NAME: process.env.JOB_BASE_NAME,
    BUILD_NUMBER: process.env.BUILD_NUMBER,
    BUILD_ID: process.env.BUILD_ID,
    BUILD_BUILDID: process.env.BUILD_BUILDID,
    BUILD_BUILDNUMBER: process.env.BUILD_BUILDNUMBER,
    CI_PIPELINE_ID: process.env.CI_PIPELINE_ID,
    PW_TEST_RUN_ID: process.env.PW_TEST_RUN_ID,
    CI: process.env.CI,
    JENKINS_URL: process.env.JENKINS_URL,
    BUILD_URL: process.env.BUILD_URL,
    GITHUB_ACTIONS: process.env.GITHUB_ACTIONS,
    TF_BUILD: process.env.TF_BUILD,
    GITLAB_CI: process.env.GITLAB_CI,
    APPROVE_ORG_ADMIN_USERNAME: process.env.APPROVE_ORG_ADMIN_USERNAME,
    APPROVE_ORG_ADMIN_PASSWORD: process.env.APPROVE_ORG_ADMIN_PASSWORD,
    AO_ADMIN_USERNAME: process.env.AO_ADMIN_USERNAME,
    AO_ADMIN_PASSWORD: process.env.AO_ADMIN_PASSWORD,
    TEST_EMAIL: process.env.TEST_EMAIL,
    TEST_PASSWORD: process.env.TEST_PASSWORD,
    TEST_API_EMAIL_ADMIN: process.env.TEST_API_EMAIL_ADMIN,
    TEST_API_PASSWORD_ADMIN: process.env.TEST_API_PASSWORD_ADMIN,
    PW_DYNAMIC_ORGANISATION_LOCK_TIMEOUT_MS: process.env.PW_DYNAMIC_ORGANISATION_LOCK_TIMEOUT_MS,
    PW_DYNAMIC_ORGANISATION_LOCK_POLL_INTERVAL_MS: process.env.PW_DYNAMIC_ORGANISATION_LOCK_POLL_INTERVAL_MS,
    PW_DYNAMIC_ORGANISATION_LOCK_STALE_MS: process.env.PW_DYNAMIC_ORGANISATION_LOCK_STALE_MS,
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

function clearDynamicOrganisationRunEnv(): void {
  for (const key of [
    'PW_DYNAMIC_ORGANISATION_RUN_ID',
    'GITHUB_RUN_ID',
    'BUILD_TAG',
    'JOB_NAME',
    'JOB_BASE_NAME',
    'BUILD_NUMBER',
    'BUILD_ID',
    'BUILD_BUILDID',
    'BUILD_BUILDNUMBER',
    'CI_PIPELINE_ID',
    'PW_TEST_RUN_ID',
    'CI',
    'JENKINS_URL',
    'BUILD_URL',
    'GITHUB_ACTIONS',
    'TF_BUILD',
    'GITLAB_CI',
  ]) {
    delete process.env[key];
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
        if (url === '/api/environment') {
          return {
            ...response(200, { featureFlags: {} }),
            url: () => 'https://administer-orgs.aat.platform.hmcts.net/api/environment',
          };
        }
        return response(200, {
          organisations: [{ organisationIdentifier: 'ORG-AUTO', name: 'PW Dynamic Org auto-approval' }],
        });
      },
      put: async (url: string, options: { data?: unknown; headers?: Record<string, string> }) => {
        approveOrgCalls.push({ method: 'PUT', url, data: options.data, headers: options.headers });
        return response(200, { organisationIdentifier: 'ORG-AUTO', status: 'ACTIVE' });
      },
      storageState: async () => ({
        cookies: [
          {
            name: 'XSRF-TOKEN',
            value: 'xsrf-token-for-put',
            domain: 'administer-orgs.aat.platform.hmcts.net',
          },
        ],
        origins: [],
      }),
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
      'GET /api/environment',
      'PUT /api/organisations/ORG-AUTO',
    ]);
    expect(approveOrgCalls[2].headers).toEqual({ 'x-xsrf-token': 'xsrf-token-for-put' });
    expect(approveOrgCalls[2].data).toMatchObject({
      organisationIdentifier: 'ORG-AUTO',
      name: 'PW Dynamic Org auto-approval',
      status: 'ACTIVE',
    });
    expect(approveOrgCalls[2].data).not.toHaveProperty('organisations');
    expect(result.timings).toMatchObject([
      { stage: 'create', status: 201 },
      { stage: 'approve', status: 200, strategy: 'approve-org-api' },
      { stage: 'poll-active', status: 200 },
    ]);
  });

  test('recovers a pending organisation after a duplicate SRA create response', async () => {
    const calls: ApiCall[] = [];
    let approved = false;
    const apiContext = {
      post: async (url: string, options: { data?: unknown }) => {
        calls.push({ method: 'POST', url, data: options.data });
        return response(400, {
          errorMessage: '6 : SRA_ID Invalid or already exists',
          errorDescription: 'ERROR: duplicate key value violates unique constraint "sra_id_uq1"',
        });
      },
      get: async (url: string) => {
        calls.push({ method: 'GET', url });
        if (url.includes('status=Active')) {
          return response(
            200,
            approved
              ? [
                  {
                    organisationIdentifier: 'ORG-PARTIAL',
                    name: 'PW Dynamic Org partial-run',
                    sraId: 'PWpartialrun',
                    status: 'ACTIVE',
                  },
                ]
              : []
          );
        }
        return response(200, [
          {
            organisationIdentifier: 'ORG-PARTIAL',
            name: 'PW Dynamic Org partial-run',
            sraId: 'PWpartialrun',
            status: 'PENDING',
          },
        ]);
      },
      put: async (url: string, options: { data?: unknown }) => {
        calls.push({ method: 'PUT', url, data: options.data });
        approved = true;
        return response(200, { organisationIdentifier: 'ORG-PARTIAL', status: 'ACTIVE' });
      },
      dispose: async () => undefined,
    };

    const result = await organisationProvisioningTest.createApprovedOrganisationFlow(
      {
        runId: 'partial-run',
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

    expect(result).toMatchObject({
      organisationId: 'ORG-PARTIAL',
      status: 'ACTIVE',
      createStatus: 400,
      approveStatus: 200,
      pollAttempts: 1,
    });
    expect(calls.map((call) => `${call.method} ${call.url}`)).toEqual([
      'POST /refdata/internal/v1/organisations',
      'GET /refdata/internal/v1/organisations?status=Active',
      'GET /refdata/internal/v1/organisations?status=Pending',
      'PUT /refdata/internal/v1/organisations/ORG-PARTIAL',
      'GET /refdata/internal/v1/organisations?status=Active',
    ]);
  });

  test('reuses an active organisation after a duplicate SRA create response without re-approval', async () => {
    const calls: ApiCall[] = [];
    const apiContext = {
      post: async (url: string, options: { data?: unknown }) => {
        calls.push({ method: 'POST', url, data: options.data });
        return response(400, {
          errorMessage: '6 : SRA_ID Invalid or already exists',
          errorDescription: 'ERROR: duplicate key value violates unique constraint "sra_id_uq1"',
        });
      },
      get: async (url: string) => {
        calls.push({ method: 'GET', url });
        return response(200, [
          {
            organisationIdentifier: 'ORG-ACTIVE',
            name: 'PW Dynamic Org active-run',
            sraId: 'PWactiverun',
            status: 'ACTIVE',
          },
        ]);
      },
      put: async (url: string, options: { data?: unknown }) => {
        calls.push({ method: 'PUT', url, data: options.data });
        return response(500, { message: 'should not approve active existing organisation' });
      },
      dispose: async () => undefined,
    };

    const result = await organisationProvisioningTest.createApprovedOrganisationFlow(
      {
        runId: 'active-run',
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

    expect(result).toMatchObject({
      organisationId: 'ORG-ACTIVE',
      status: 'ACTIVE',
      createStatus: 400,
      approveStatus: 200,
      pollAttempts: 1,
    });
    expect(calls.map((call) => `${call.method} ${call.url}`)).toEqual([
      'POST /refdata/internal/v1/organisations',
      'GET /refdata/internal/v1/organisations?status=Active',
      'GET /refdata/internal/v1/organisations?status=Active',
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

  test('requires approve-org storage state or admin credentials when approve-org approval strategy has no injected context', async () => {
    const originalEnv = snapshotDynamicOrganisationEnv();
    process.env.PW_APPROVE_ORG_API_STORAGE_STATE = '/tmp/non-existent-approve-org-api.storage.json';
    delete process.env.APPROVE_ORG_ADMIN_USERNAME;
    delete process.env.APPROVE_ORG_ADMIN_PASSWORD;
    delete process.env.AO_ADMIN_USERNAME;
    delete process.env.AO_ADMIN_PASSWORD;
    delete process.env.TEST_EMAIL;
    delete process.env.TEST_PASSWORD;
    delete process.env.TEST_API_EMAIL_ADMIN;
    delete process.env.TEST_API_PASSWORD_ADMIN;
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
            'Approve-org API approval requires a fresh storage state or approval-capable credentials. Set PW_APPROVE_ORG_API_STORAGE_STATE to a valid authenticated storage state, or set APPROVE_ORG_ADMIN_USERNAME/APPROVE_ORG_ADMIN_PASSWORD (fallbacks: AO_ADMIN_USERNAME/AO_ADMIN_PASSWORD, TEST_EMAIL/TEST_PASSWORD, or TEST_API_EMAIL_ADMIN/TEST_API_PASSWORD_ADMIN).',
        },
      });
    } finally {
      restoreDynamicOrganisationEnv(originalEnv);
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
    clearDynamicOrganisationRunEnv();
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

  test('resolver uses standard Jenkins build identity before falling back to local', async () => {
    const originalEnv = snapshotDynamicOrganisationEnv();
    delete process.env.PW_DYNAMIC_ORGANISATION_MODE;
    clearDynamicOrganisationRunEnv();
    process.env.JENKINS_URL = 'https://build.hmcts.example.test';
    process.env.BUILD_TAG = 'jenkins-rpx-xui-webapp-5217-42';
    process.env.JOB_NAME = 'rpx-xui-webapp/PR-5217';
    process.env.BUILD_NUMBER = '42';

    try {
      expect(organisationResolverTest.resolveDynamicOrganisationCacheKey()).toBe('jenkins-rpx-xui-webapp-5217-42');
      expect(organisationProvisioningTest.resolveRunId({})).toBe('jenkins-rpx-xui-webapp-5217-42');
    } finally {
      restoreDynamicOrganisationEnv(originalEnv);
    }
  });

  test('resolver composes Jenkins job and build number when BUILD_TAG is unavailable', async () => {
    const originalEnv = snapshotDynamicOrganisationEnv();
    delete process.env.PW_DYNAMIC_ORGANISATION_MODE;
    clearDynamicOrganisationRunEnv();
    process.env.JENKINS_URL = 'https://build.hmcts.example.test';
    process.env.JOB_NAME = 'rpx-xui-webapp/PR-5217';
    process.env.BUILD_NUMBER = '43';

    try {
      expect(organisationResolverTest.resolveDynamicOrganisationCacheKey()).toBe('rpx-xui-webapp-PR-5217-43');
      expect(organisationProvisioningTest.resolveRunId({})).toBe('rpx-xui-webapp-PR-5217-43');
    } finally {
      restoreDynamicOrganisationEnv(originalEnv);
    }
  });

  test('resolver fails clearly in CI when no unique dynamic organisation run id is available', async () => {
    const originalEnv = snapshotDynamicOrganisationEnv();
    delete process.env.PW_DYNAMIC_ORGANISATION_MODE;
    clearDynamicOrganisationRunEnv();
    process.env.CI = 'true';

    try {
      expect(() => organisationResolverTest.resolveDynamicOrganisationCacheKey()).toThrow(/requires a unique run id in CI/);
      expect(() => organisationProvisioningTest.resolveRunId({})).toThrow(/requires a unique run id in CI/);
    } finally {
      restoreDynamicOrganisationEnv(originalEnv);
    }
  });

  test('resolver supports the documented CI fallback chain without sharing local cache keys', async () => {
    const originalEnv = snapshotDynamicOrganisationEnv();
    delete process.env.PW_DYNAMIC_ORGANISATION_MODE;

    const cases: Array<{ name: string; env: Record<string, string>; expected: string }> = [
      {
        name: 'GitHub run id',
        env: { CI: 'true', GITHUB_RUN_ID: 'github run 987' },
        expected: 'github-run-987',
      },
      {
        name: 'Jenkins build id',
        env: { JENKINS_URL: 'https://build.hmcts.example.test', BUILD_ID: 'jenkins-build-44' },
        expected: 'jenkins-build-44',
      },
      {
        name: 'Azure build id',
        env: { TF_BUILD: 'True', BUILD_BUILDID: 'azure build 555' },
        expected: 'azure-build-555',
      },
      {
        name: 'GitLab pipeline id',
        env: { GITLAB_CI: 'true', CI_PIPELINE_ID: 'pipeline 666' },
        expected: 'pipeline-666',
      },
      {
        name: 'Playwright test run id',
        env: { CI: 'true', PW_TEST_RUN_ID: 'playwright run 777' },
        expected: 'playwright-run-777',
      },
    ];

    try {
      for (const scenario of cases) {
        clearDynamicOrganisationRunEnv();
        for (const [key, value] of Object.entries(scenario.env)) {
          process.env[key] = value;
        }

        expect.soft(organisationResolverTest.resolveDynamicOrganisationCacheKey(), scenario.name).toBe(scenario.expected);
        expect.soft(organisationProvisioningTest.resolveRunId({}), scenario.name).toBe(scenario.expected);
      }
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

  test('resolver directory lock retires stale lock directories before creating a dynamic organisation', async () => {
    const originalEnv = snapshotDynamicOrganisationEnv();
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'dynamic-org-lock-stale-'));
    const lockPath = path.join(tempDir, 'EXUI-4767-run-1.json.lock');
    await fs.mkdir(lockPath);
    const staleTime = new Date(Date.now() - 10_000);
    await fs.utimes(lockPath, staleTime, staleTime);
    process.env.PW_DYNAMIC_ORGANISATION_LOCK_TIMEOUT_MS = '100';
    process.env.PW_DYNAMIC_ORGANISATION_LOCK_POLL_INTERVAL_MS = '1';
    process.env.PW_DYNAMIC_ORGANISATION_LOCK_STALE_MS = '1';

    try {
      const result = await organisationResolverTest.withDirectoryLock(lockPath, async () => {
        const activeLock = await fs.stat(lockPath);
        expect(activeLock.isDirectory()).toBe(true);
        return 'created-after-stale-lock';
      });

      expect(result).toBe('created-after-stale-lock');
      await expect(fs.stat(lockPath)).rejects.toMatchObject({ code: 'ENOENT' });
      const remainingEntries = await fs.readdir(tempDir);
      expect(remainingEntries).toEqual([]);
    } finally {
      restoreDynamicOrganisationEnv(originalEnv);
      await fs.rm(tempDir, { recursive: true, force: true });
    }
  });

  test('resolver directory lock times out without removing a fresh active lock', async () => {
    const originalEnv = snapshotDynamicOrganisationEnv();
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'dynamic-org-lock-fresh-'));
    const lockPath = path.join(tempDir, 'EXUI-4767-run-1.json.lock');
    await fs.mkdir(lockPath);
    process.env.PW_DYNAMIC_ORGANISATION_LOCK_TIMEOUT_MS = '5';
    process.env.PW_DYNAMIC_ORGANISATION_LOCK_POLL_INTERVAL_MS = '1';
    process.env.PW_DYNAMIC_ORGANISATION_LOCK_STALE_MS = String(15 * 60_000);

    try {
      await expect(
        organisationResolverTest.withDirectoryLock(lockPath, async () => {
          throw new Error('fresh lock should not be acquired');
        })
      ).rejects.toThrow(/Existing lock was not stale; stale threshold is 900000ms/);

      const freshLock = await fs.stat(lockPath);
      expect(freshLock.isDirectory()).toBe(true);
    } finally {
      restoreDynamicOrganisationEnv(originalEnv);
      await fs.rm(tempDir, { recursive: true, force: true });
    }
  });

  test('resolver directory lock serialises contenders after stale lock retirement', async () => {
    const originalEnv = snapshotDynamicOrganisationEnv();
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'dynamic-org-lock-serial-'));
    const lockPath = path.join(tempDir, 'EXUI-4767-run-1.json.lock');
    await fs.mkdir(lockPath);
    const staleTime = new Date(Date.now() - 10_000);
    await fs.utimes(lockPath, staleTime, staleTime);
    process.env.PW_DYNAMIC_ORGANISATION_LOCK_TIMEOUT_MS = '1000';
    process.env.PW_DYNAMIC_ORGANISATION_LOCK_POLL_INTERVAL_MS = '1';
    process.env.PW_DYNAMIC_ORGANISATION_LOCK_STALE_MS = '1';

    let first: Promise<string> | undefined;
    let second: Promise<string> | undefined;
    let releaseFirst: () => void = () => undefined;

    try {
      const entered: string[] = [];
      const firstEntered = new Promise<void>((resolve) => {
        first = organisationResolverTest.withDirectoryLock(lockPath, async () => {
          entered.push('first');
          resolve();
          await new Promise<void>((release) => {
            releaseFirst = release;
          });
          return 'first-result';
        });
      });

      await firstEntered;

      second = organisationResolverTest.withDirectoryLock(lockPath, async () => {
        entered.push('second');
        return 'second-result';
      });

      await expect.poll(() => entered, { timeout: 100 }).toEqual(['first']);
      releaseFirst();

      await expect(Promise.all([first, second])).resolves.toEqual(['first-result', 'second-result']);
      expect(entered).toEqual(['first', 'second']);
    } finally {
      releaseFirst();
      await Promise.allSettled([first, second].filter((promise): promise is Promise<string> => Boolean(promise)));
      restoreDynamicOrganisationEnv(originalEnv);
      await fs.rm(tempDir, { recursive: true, force: true });
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

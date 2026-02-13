import type { TestInfo } from '@playwright/test';

import { config } from '../common/apiTestConfig';
import { EM_DOC_ID, ROLE_ACCESS_CASE_ID, resolveRoleAccessCaseId } from './data/testIds';
import { expect, test } from './fixtures';
import { withRetry, withXsrf } from './utils/apiTestUtils';
import { expectCaseShareShape } from './utils/assertions';
import { assertCaseShareEntries } from './utils/caseShareUtils';
import { assertBinaryResponse, resolveConfiguredDocId } from './utils/evidenceManagerUtils';
import {
  assertGlobalSearchResults,
  assertGlobalSearchServices,
  assertMyAccessCount,
  assertRoleAccessByCaseIdResponse,
  assertRoleAccessGetResponse,
  assertSupportedJurisdictions,
  assertValidRolesResponse,
} from './utils/searchRefDataUtils';
import type { TaskListResponse, UserDetailsResponse } from './utils/types';
import {
  assertCaseworkerListResponse,
  assertTaskSearchResponse,
  assertTypesOfWorkResponse,
  resolveUserId,
} from './utils/workAllocationUtils';
import {
  executeJourneyStep,
  resolveJourneyLatencyPolicy,
  summarizeJourney,
  toJourneyReportJson,
  toJourneyReportText,
  type JourneyStepResult,
} from './utils/journeyUtils';

const defaultCaseReference = '1234567890123456';
const serviceCodes = ['IA', 'CIVIL', 'PRIVATELAW'];
const defaultRoleAccessCaseId = resolveRoleAccessCaseId(ROLE_ACCESS_CASE_ID);
const hearingServiceId = process.env.API_JOURNEY_HEARING_SERVICE_ID ?? 'BBA3';
const hearingCategory = process.env.API_JOURNEY_HEARING_LOV_CATEGORY ?? 'HearingChannel';
const hearingChildRequired = process.env.API_JOURNEY_HEARING_IS_CHILD_REQUIRED ?? 'Y';
const readGuardedStatuses = [200, 400, 401, 403, 404, 502, 504];
const guardedExtendedStatuses = [200, 401, 403, 404, 502, 504];
const globalSearchStatuses = [200, 400, 401, 403, 502, 504];
const globalSearchPageSize = 25;
const defaultJourneyTestTimeoutMs = 120000;
const defaultGlobalSearchJurisdictions = resolveDefaultGlobalSearchJurisdictions();
const termsConfigEndpoint = 'api/configuration?configurationKey=termsAndConditionsEnabled';
const waSupportedJurisdictionsEndpoint = 'api/wa-supported-jurisdiction/get';

test.describe('@journeys API user journey monitor', () => {
  test.describe.configure({ timeout: resolveJourneyTestTimeoutMs() });

  test('runs solicitor search and work-allocation journey with API calls only', async ({ apiClient }, testInfo) => {
    const latencyPolicy = resolveJourneyLatencyPolicy();
    const journeySteps: JourneyStepResult[] = [];
    const caseReference = resolveJourneyCaseReference();

    const authStep = await executeJourneyStep(
      {
        name: 'Validate authenticated session',
        method: 'GET',
        endpoint: 'auth/isAuthenticated',
        execute: () => apiClient.get<boolean>('auth/isAuthenticated', { throwOnError: false }),
      },
      latencyPolicy.stepWarnMs
    );
    journeySteps.push(authStep);
    expect(authStep.response.data).toBe(true);

    const configStep = await executeJourneyStep(
      {
        name: 'Load terms-and-conditions feature flag',
        method: 'GET',
        endpoint: termsConfigEndpoint,
        allowedStatuses: [200, 401, 502, 504],
        execute: () =>
          apiClient.get<boolean | string>(termsConfigEndpoint, {
            throwOnError: false,
          }),
      },
      latencyPolicy.stepWarnMs
    );
    journeySteps.push(configStep);
    assertConfigurationFlagResponse(configStep.status, configStep.response.data);

    const userDetailsStep = await executeJourneyStep(
      {
        name: 'Fetch authenticated user details',
        method: 'GET',
        endpoint: 'api/user/details?refreshRoleAssignments=true',
        execute: () =>
          apiClient.get<UserDetailsResponse>('api/user/details?refreshRoleAssignments=true', { throwOnError: false }),
      },
      latencyPolicy.stepWarnMs
    );
    journeySteps.push(userDetailsStep);
    const resolvedUserId = resolveUserId(userDetailsStep.response.data);
    if (!resolvedUserId) {
      throw new Error('Unable to resolve user id from api/user/details response.');
    }
    const taskSearchBy = resolveJourneyTaskSearchBy(userDetailsStep.response.data);

    const monitoringStep = await executeJourneyStep(
      {
        name: 'Load monitoring-tools configuration',
        method: 'GET',
        endpoint: 'api/monitoring-tools',
        allowedStatuses: [200, 401, 502, 504],
        execute: () =>
          apiClient.get<Record<string, unknown>>('api/monitoring-tools', {
            throwOnError: false,
          }),
      },
      latencyPolicy.stepWarnMs
    );
    journeySteps.push(monitoringStep);
    assertMonitoringToolsResponse(monitoringStep.status, monitoringStep.response.data);

    const jurisdictionsStep = await executeJourneyStep(
      {
        name: 'Load user jurisdictions',
        method: 'GET',
        endpoint: `aggregated/caseworkers/${encodeURIComponent(resolvedUserId)}/jurisdictions?access=read`,
        allowedStatuses: guardedExtendedStatuses,
        execute: () =>
          apiClient.get<Array<{ id?: string; name?: string }>>(
            `aggregated/caseworkers/${encodeURIComponent(resolvedUserId)}/jurisdictions?access=read`,
            {
              throwOnError: false,
            }
          ),
      },
      latencyPolicy.stepWarnMs
    );
    journeySteps.push(jurisdictionsStep);
    assertUserJurisdictionsResponse(jurisdictionsStep.status, jurisdictionsStep.response.data);

    const globalSearchServicesStep = await executeJourneyStep(
      {
        name: 'Load global search services',
        method: 'GET',
        endpoint: 'api/globalSearch/services',
        execute: () =>
          apiClient.get<Array<{ serviceId: string; serviceName: string }>>('api/globalSearch/services', {
            throwOnError: false,
          }),
      },
      latencyPolicy.stepWarnMs
    );
    journeySteps.push(globalSearchServicesStep);
    assertGlobalSearchServices(globalSearchServicesStep.status, globalSearchServicesStep.response.data);
    const globalSearchJurisdictions = resolveGlobalSearchJurisdictions(globalSearchServicesStep.response.data);

    const globalSearchResultsStep = await executeJourneyStep(
      {
        name: 'Search for case reference',
        method: 'POST',
        endpoint: 'api/globalsearch/results',
        allowedStatuses: globalSearchStatuses,
        execute: () =>
          apiClient.post<{ results?: unknown[] }>('api/globalsearch/results', {
            data: buildGlobalSearchRequest(caseReference, globalSearchJurisdictions),
            throwOnError: false,
          }),
      },
      latencyPolicy.stepWarnMs
    );
    journeySteps.push(globalSearchResultsStep);
    assertGlobalSearchResults(globalSearchResultsStep.status, globalSearchResultsStep.response.data);

    const myAccessCountStep = await executeJourneyStep(
      {
        name: 'Load role-access notification count',
        method: 'GET',
        endpoint: 'api/role-access/roles/get-my-access-new-count',
        allowedStatuses: [200, 401, 403, 502, 504],
        execute: () =>
          apiClient.get<{ count?: number } | number>('api/role-access/roles/get-my-access-new-count', {
            throwOnError: false,
          }),
      },
      latencyPolicy.stepWarnMs
    );
    journeySteps.push(myAccessCountStep);
    assertMyAccessCount(myAccessCountStep.status, myAccessCountStep.response.data);

    const waSupportedJurisdictionsStep = await executeJourneyStep(
      {
        name: 'Load WA supported jurisdictions',
        method: 'GET',
        endpoint: waSupportedJurisdictionsEndpoint,
        allowedStatuses: [200, 401, 403, 502, 504],
        execute: () =>
          apiClient.get<string[]>(waSupportedJurisdictionsEndpoint, {
            throwOnError: false,
          }),
      },
      latencyPolicy.stepWarnMs
    );
    journeySteps.push(waSupportedJurisdictionsStep);
    assertSupportedJurisdictions(waSupportedJurisdictionsStep.status, waSupportedJurisdictionsStep.response.data);
    const journeyServiceIds = resolveJourneyServiceIds(
      waSupportedJurisdictionsStep.status,
      waSupportedJurisdictionsStep.response.data
    );

    const regionLocationStep = await executeJourneyStep(
      {
        name: 'Load region-to-location mapping',
        method: 'POST',
        endpoint: 'workallocation/region-location',
        allowedStatuses: [200, 400, 401, 403, 502, 504],
        execute: () =>
          apiClient.post<Array<{ regionId?: string; locations?: string[] }>>('workallocation/region-location', {
            data: { serviceIds: journeyServiceIds },
            throwOnError: false,
          }),
      },
      latencyPolicy.stepWarnMs
    );
    journeySteps.push(regionLocationStep);
    assertRegionLocationsResponse(regionLocationStep.status, regionLocationStep.response.data);

    const typesOfWorkStep = await executeJourneyStep(
      {
        name: 'Load types-of-work catalogue',
        method: 'GET',
        endpoint: 'workallocation/task/types-of-work',
        allowedStatuses: [200, 401, 403, 502, 504],
        execute: () =>
          apiClient.get<unknown>('workallocation/task/types-of-work', {
            throwOnError: false,
          }),
      },
      latencyPolicy.stepWarnMs
    );
    journeySteps.push(typesOfWorkStep);
    assertTypesOfWorkResponse(typesOfWorkStep.status, typesOfWorkStep.response.data);

    const caseworkersStep = await executeJourneyStep(
      {
        name: 'Load caseworkers for supported services',
        method: 'POST',
        endpoint: 'workallocation/caseworker/getUsersByServiceName',
        allowedStatuses: [200, 401, 403, 502, 504],
        execute: () =>
          apiClient.post<Array<{ idamId?: string; firstName?: string; lastName?: string }>>(
            'workallocation/caseworker/getUsersByServiceName',
            {
              data: { services: journeyServiceIds },
              throwOnError: false,
            }
          ),
      },
      Math.max(latencyPolicy.stepWarnMs, 7000)
    );
    journeySteps.push(caseworkersStep);
    assertCaseworkerListResponse(caseworkersStep.status, caseworkersStep.response.data);

    const taskSearchPayload = buildJourneyTaskSearchPayload(resolvedUserId, taskSearchBy);
    const taskSearchTimeoutMs = resolveJourneyTaskSearchTimeoutMs();
    const taskSearchRetries = resolveJourneyTaskSearchRetries();
    const myTasksStep = await executeJourneyStep(
      {
        name: 'Load my tasks list',
        method: 'POST',
        endpoint: 'workallocation/task',
        warnMs: Math.max(latencyPolicy.stepWarnMs, Math.min(taskSearchTimeoutMs - 1000, 15000)),
        execute: () =>
          withRetry(
            () =>
              apiClient.post<TaskListResponse>('workallocation/task', {
                data: taskSearchPayload,
                throwOnError: false,
                timeoutMs: taskSearchTimeoutMs,
              }),
            { retries: taskSearchRetries, retryStatuses: [502, 503, 504] }
          ),
      },
      latencyPolicy.stepWarnMs
    );
    journeySteps.push(myTasksStep);
    assertTaskSearchResponse(myTasksStep.status, myTasksStep.response.data);

    await finalizeJourney(testInfo, 'solicitor-search-and-tasks', journeySteps, latencyPolicy);
  });

  test('runs role access and case-share API journey', async ({ apiClient }, testInfo) => {
    const latencyPolicy = resolveJourneyLatencyPolicy();
    const journeySteps: JourneyStepResult[] = [];

    const authStep = await executeJourneyStep(
      {
        name: 'Validate authenticated session',
        method: 'GET',
        endpoint: 'auth/isAuthenticated',
        execute: () => apiClient.get<boolean>('auth/isAuthenticated', { throwOnError: false }),
      },
      latencyPolicy.stepWarnMs
    );
    journeySteps.push(authStep);
    expect(authStep.response.data).toBe(true);

    const userDetailsStep = await executeJourneyStep(
      {
        name: 'Fetch authenticated user details',
        method: 'GET',
        endpoint: 'api/user/details',
        execute: () => apiClient.get<UserDetailsResponse>('api/user/details', { throwOnError: false }),
      },
      latencyPolicy.stepWarnMs
    );
    journeySteps.push(userDetailsStep);

    const caseShareStep = await executeJourneyStep(
      {
        name: 'Load case-share cases',
        method: 'GET',
        endpoint: 'caseshare/cases',
        allowedStatuses: [200, 401, 403, 502, 504],
        execute: () =>
          withXsrf('solicitor', (headers) =>
            apiClient.get('caseshare/cases', {
              headers: { ...headers, experimental: 'true' },
              throwOnError: false,
            })
          ),
      },
      latencyPolicy.stepWarnMs
    );
    journeySteps.push(caseShareStep);
    assertCaseShareEntries(caseShareStep.response.data, 'cases', expectCaseShareShape);

    const myAccessCountStep = await executeJourneyStep(
      {
        name: 'Load role access notification count',
        method: 'GET',
        endpoint: 'api/role-access/roles/get-my-access-new-count',
        allowedStatuses: [200, 401, 403, 502, 504],
        execute: () =>
          apiClient.get<{ count?: number } | number>('api/role-access/roles/get-my-access-new-count', {
            throwOnError: false,
          }),
      },
      latencyPolicy.stepWarnMs
    );
    journeySteps.push(myAccessCountStep);
    assertMyAccessCount(myAccessCountStep.status, myAccessCountStep.response.data);

    const accessGetStep = await executeJourneyStep(
      {
        name: 'Load role assignments by caseIds',
        method: 'POST',
        endpoint: 'api/role-access/roles/access-get',
        allowedStatuses: readGuardedStatuses,
        execute: () =>
          apiClient.post('api/role-access/roles/access-get', {
            data: { caseIds: [defaultRoleAccessCaseId] },
            throwOnError: false,
          }),
      },
      latencyPolicy.stepWarnMs
    );
    journeySteps.push(accessGetStep);
    assertRoleAccessGetResponse(accessGetStep.status, accessGetStep.response.data);

    const validRolesStep = await executeJourneyStep(
      {
        name: 'Load valid allocate-role options',
        method: 'POST',
        endpoint: 'api/role-access/allocate-role/valid-roles',
        allowedStatuses: readGuardedStatuses,
        execute: () =>
          apiClient.post<Array<{ roleId: string; roleName: string }>>('api/role-access/allocate-role/valid-roles', {
            data: { requestedRoles: [], jurisdiction: 'IA' },
            throwOnError: false,
          }),
      },
      latencyPolicy.stepWarnMs
    );
    journeySteps.push(validRolesStep);
    assertValidRolesResponse(validRolesStep.status, validRolesStep.response.data);

    const accessByCaseIdStep = await executeJourneyStep(
      {
        name: 'Load role assignments by single caseId',
        method: 'POST',
        endpoint: 'api/role-access/roles/access-get-by-caseId',
        allowedStatuses: readGuardedStatuses,
        execute: () =>
          apiClient.post('api/role-access/roles/access-get-by-caseId', {
            data: { case_id: defaultRoleAccessCaseId },
            throwOnError: false,
          }),
      },
      latencyPolicy.stepWarnMs
    );
    journeySteps.push(accessByCaseIdStep);
    assertRoleAccessByCaseIdResponse(accessByCaseIdStep.status, accessByCaseIdStep.response.data);

    await finalizeJourney(testInfo, 'role-access-and-case-share', journeySteps, latencyPolicy);
  });

  test('runs hearings reference-data journey inspired by PRL flows', async ({ apiClient }, testInfo) => {
    const latencyPolicy = resolveJourneyLatencyPolicy();
    const journeySteps: JourneyStepResult[] = [];

    const authStep = await executeJourneyStep(
      {
        name: 'Validate authenticated session',
        method: 'GET',
        endpoint: 'auth/isAuthenticated',
        execute: () => apiClient.get<boolean>('auth/isAuthenticated', { throwOnError: false }),
      },
      latencyPolicy.stepWarnMs
    );
    journeySteps.push(authStep);
    expect(authStep.response.data).toBe(true);

    const userDetailsStep = await executeJourneyStep(
      {
        name: 'Fetch authenticated user details',
        method: 'GET',
        endpoint: 'api/user/details',
        execute: () => apiClient.get<UserDetailsResponse>('api/user/details', { throwOnError: false }),
      },
      latencyPolicy.stepWarnMs
    );
    journeySteps.push(userDetailsStep);

    const lovEndpoint = `api/prd/lov/getLovRefData?categoryId=${encodeURIComponent(hearingCategory)}&serviceId=${encodeURIComponent(hearingServiceId)}&isChildRequired=${encodeURIComponent(hearingChildRequired)}`;
    const lovStep = await executeJourneyStep(
      {
        name: 'Load hearing LOV reference data',
        method: 'GET',
        endpoint: lovEndpoint,
        allowedStatuses: readGuardedStatuses,
        execute: () =>
          apiClient.get(lovEndpoint, {
            throwOnError: false,
          }),
      },
      latencyPolicy.stepWarnMs
    );
    journeySteps.push(lovStep);
    if (lovStep.status === 200) {
      expect(lovStep.response.data).toEqual(expect.anything());
    }

    const hearingValuesStep = await executeJourneyStep(
      {
        name: 'Load hearing service values',
        method: 'GET',
        endpoint: `api/hearings/loadServiceHearingValues?serviceId=${encodeURIComponent(hearingServiceId)}`,
        allowedStatuses: readGuardedStatuses,
        execute: () =>
          apiClient.get(`api/hearings/loadServiceHearingValues?serviceId=${encodeURIComponent(hearingServiceId)}`, {
            throwOnError: false,
          }),
      },
      Math.max(latencyPolicy.stepWarnMs, 7000)
    );
    journeySteps.push(hearingValuesStep);
    if (hearingValuesStep.status === 200) {
      expect(hearingValuesStep.response.data).toEqual(expect.anything());
    }

    await finalizeJourney(testInfo, 'hearings-reference-data', journeySteps, latencyPolicy);
  });

  test('runs document-view API journey', async ({ apiClient }, testInfo) => {
    const latencyPolicy = resolveJourneyLatencyPolicy();
    const journeySteps: JourneyStepResult[] = [];

    const authStep = await executeJourneyStep(
      {
        name: 'Validate authenticated session',
        method: 'GET',
        endpoint: 'auth/isAuthenticated',
        execute: () => apiClient.get<boolean>('auth/isAuthenticated', { throwOnError: false }),
      },
      latencyPolicy.stepWarnMs
    );
    journeySteps.push(authStep);
    expect(authStep.response.data).toBe(true);

    const userDetailsStep = await executeJourneyStep(
      {
        name: 'Fetch authenticated user details',
        method: 'GET',
        endpoint: 'api/user/details',
        execute: () => apiClient.get<UserDetailsResponse>('api/user/details', { throwOnError: false }),
      },
      latencyPolicy.stepWarnMs
    );
    journeySteps.push(userDetailsStep);

    const configuredDocId = resolveConfiguredDocId(EM_DOC_ID, config.em[config.testEnv as keyof typeof config.em]?.docId);
    if (!configuredDocId) {
      testInfo.annotations.push({
        type: 'notice',
        description: 'No EM document id configured; document journey executed auth/user baseline only.',
      });
      await finalizeJourney(testInfo, 'document-view-baseline', journeySteps, latencyPolicy);
      return;
    }

    const xsrfHeaders = await withXsrf('solicitor', async (headers) => headers);
    const binaryStep = await executeJourneyStep(
      {
        name: 'Load document binary',
        method: 'GET',
        endpoint: `documents/${configuredDocId}/binary`,
        allowedStatuses: [200, 204, 401, 403, 404],
        execute: () =>
          apiClient.get<ArrayBuffer | string>(`documents/${configuredDocId}/binary`, {
            headers: { ...xsrfHeaders, experimental: 'true' },
            throwOnError: false,
          }),
      },
      Math.max(latencyPolicy.stepWarnMs, 7000)
    );
    journeySteps.push(binaryStep);
    assertBinaryResponse(binaryStep.status, binaryStep.response.data);

    const metadataStep = await executeJourneyStep(
      {
        name: 'Load document annotation metadata',
        method: 'GET',
        endpoint: `em-anno/metadata/${configuredDocId}`,
        allowedStatuses: [200, 204, 401, 403, 404],
        execute: () =>
          apiClient.get(`em-anno/metadata/${configuredDocId}`, {
            headers: { ...xsrfHeaders, experimental: 'true' },
            throwOnError: false,
          }),
      },
      latencyPolicy.stepWarnMs
    );
    journeySteps.push(metadataStep);

    const bookmarksStep = await executeJourneyStep(
      {
        name: 'Load document bookmarks',
        method: 'GET',
        endpoint: `em-anno/${configuredDocId}/bookmarks`,
        allowedStatuses: [200, 204, 401, 403, 404],
        execute: () =>
          apiClient.get(`em-anno/${configuredDocId}/bookmarks`, {
            headers: xsrfHeaders,
            throwOnError: false,
          }),
      },
      latencyPolicy.stepWarnMs
    );
    journeySteps.push(bookmarksStep);

    await finalizeJourney(testInfo, 'document-view', journeySteps, latencyPolicy);
  });
});

async function finalizeJourney(
  testInfo: TestInfo,
  journeyName: string,
  steps: JourneyStepResult[],
  latencyPolicy: ReturnType<typeof resolveJourneyLatencyPolicy>
): Promise<void> {
  const summary = summarizeJourney(steps, latencyPolicy);
  const reportText = toJourneyReportText(summary, latencyPolicy);
  const reportJson = toJourneyReportJson(summary, latencyPolicy);
  const reportSuffix = toReportSuffix(journeyName);

  await testInfo.attach(`${reportSuffix}-latency.txt`, {
    body: reportText,
    contentType: 'text/plain',
  });
  await testInfo.attach(`${reportSuffix}-latency.json`, {
    body: reportJson,
    contentType: 'application/json',
  });

  if (summary.slowSteps.length > 0) {
    const slowSummary = summary.slowSteps
      .slice(0, 3)
      .map((step) => `${step.name}: ${step.durationMs}ms`)
      .join(' | ');
    testInfo.annotations.push({
      type: 'performance-warning',
      description: `${journeyName} slow steps detected (${summary.slowSteps.length}): ${slowSummary}`.substring(0, 500),
    });
  }

  if (summary.overTotalWarnThreshold) {
    testInfo.annotations.push({
      type: 'performance-warning',
      description: `${journeyName} total latency ${summary.totalDurationMs}ms exceeded warning threshold ${latencyPolicy.totalWarnMs}ms`,
    });
  }

  if (latencyPolicy.stepFailMs !== undefined) {
    expect(
      summary.maxStepDurationMs,
      `${journeyName} slowest API step exceeded API_JOURNEY_STEP_FAIL_MS=${latencyPolicy.stepFailMs}ms`
    ).toBeLessThanOrEqual(latencyPolicy.stepFailMs);
  }

  if (latencyPolicy.totalFailMs !== undefined) {
    expect(
      summary.totalDurationMs,
      `${journeyName} total API time exceeded API_JOURNEY_TOTAL_FAIL_MS=${latencyPolicy.totalFailMs}ms`
    ).toBeLessThanOrEqual(latencyPolicy.totalFailMs);
  }
}

function resolveJourneyCaseReference(): string {
  const configuredCaseReference = process.env.API_JOURNEY_CASE_REFERENCE;
  return configuredCaseReference && /^\d{16}$/.test(configuredCaseReference)
    ? configuredCaseReference
    : defaultCaseReference;
}

function assertUserJurisdictionsResponse(status: number, data: unknown): void {
  if (status !== 200) {
    return;
  }
  expect(Array.isArray(data)).toBe(true);
  if (!Array.isArray(data) || data.length === 0) {
    return;
  }
  expect(data[0]).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      name: expect.any(String),
    })
  );
}

function buildGlobalSearchRequest(caseReference: string, jurisdictions: string[]): Record<string, unknown> {
  const sanitizedCaseReference = caseReference.replace(/[\s-]/g, '');
  return {
    searchCriteria: {
      CCDCaseTypeIds: null,
      CCDJurisdictionIds: jurisdictions,
      caseManagementBaseLocationIds: null,
      caseManagementRegionIds: null,
      caseReferences: [sanitizedCaseReference],
      otherReferences: null,
      parties: [],
      stateIds: null,
    },
    sortCriteria: null,
    maxReturnRecordCount: globalSearchPageSize,
    startRecordNumber: 1,
  };
}

function resolveGlobalSearchJurisdictions(payload: unknown): string[] {
  if (!Array.isArray(payload)) {
    return defaultGlobalSearchJurisdictions;
  }
  const values = payload
    .map((entry) => (typeof entry === 'object' && entry !== null ? (entry as { serviceId?: unknown }).serviceId : undefined))
    .filter((value): value is string => typeof value === 'string')
    .map((value) => value.trim())
    .filter((value) => value.length > 0);

  const uniqueValues = Array.from(new Set(values));
  return uniqueValues.length > 0 ? uniqueValues : defaultGlobalSearchJurisdictions;
}

function resolveDefaultGlobalSearchJurisdictions(): string[] {
  const configured = process.env.API_JOURNEY_GLOBAL_SEARCH_JURISDICTIONS;
  if (configured) {
    const values = configured
      .split(',')
      .map((value) => value.trim())
      .filter((value) => value.length > 0);
    if (values.length > 0) {
      return values;
    }
  }
  return ['PUBLICLAW'];
}

function assertConfigurationFlagResponse(status: number, data: unknown): void {
  if (status !== 200) {
    return;
  }
  expect(
    typeof data === 'boolean' || typeof data === 'string',
    'api/configuration should return a boolean-like value.'
  ).toBe(true);
}

function assertMonitoringToolsResponse(status: number, data: unknown): void {
  if (status !== 200) {
    return;
  }
  expect(typeof data).toBe('object');
}

function assertRegionLocationsResponse(status: number, data: unknown): void {
  if (status !== 200) {
    return;
  }
  expect(Array.isArray(data)).toBe(true);
  if (Array.isArray(data) && data.length > 0) {
    const first = data[0] as { regionId?: unknown; locations?: unknown };
    expect(typeof first.regionId).toBe('string');
    expect(Array.isArray(first.locations)).toBe(true);
  }
}

function resolveJourneyServiceIds(status: number, payload: unknown): string[] {
  if (status === 200 && Array.isArray(payload)) {
    const ids = payload
      .filter((value): value is string => typeof value === 'string')
      .map((value) => value.trim())
      .filter((value) => value.length > 0);
    const uniqueIds = Array.from(new Set(ids));
    if (uniqueIds.length > 0) {
      return uniqueIds;
    }
  }
  return serviceCodes;
}

function resolveJourneyTaskSearchBy(userDetails?: UserDetailsResponse): 'judge' | 'caseworker' {
  const configured = process.env.API_JOURNEY_TASK_SEARCH_BY?.trim().toLowerCase();
  if (configured === 'judge' || configured === 'caseworker') {
    return configured;
  }
  const roles = userDetails?.userInfo?.roles;
  if (Array.isArray(roles) && roles.some((role) => /judicial|judge/i.test(role))) {
    return 'judge';
  }
  return 'caseworker';
}

function resolveJourneyTaskTypeFilter(): string[] {
  return parseCsvList(process.env.API_JOURNEY_TASK_TYPES);
}

function buildJourneyTaskSearchPayload(userId: string, searchBy: 'judge' | 'caseworker'): Record<string, unknown> {
  const taskTypes = resolveJourneyTaskTypeFilter();
  const taskJurisdictions = resolveJourneyTaskJurisdictions();
  const searchParameters: Array<{ key: string; operator: 'IN'; values: string[] }> = [
    { key: 'user', operator: 'IN', values: [userId] },
    { key: 'state', operator: 'IN', values: ['assigned'] },
  ];

  if (taskJurisdictions.length > 0) {
    searchParameters.push({ key: 'jurisdiction', operator: 'IN', values: taskJurisdictions });
  }
  if (taskTypes.length > 0) {
    searchParameters.push({ key: 'taskType', operator: 'IN', values: taskTypes });
  }

  return {
    searchRequest: {
      search_by: searchBy,
      sorting_parameters: [],
      search_parameters: searchParameters,
    },
    view: 'MyTasks',
  };
}

function resolveJourneyTaskJurisdictions(): string[] {
  return parseCsvList(process.env.API_JOURNEY_TASK_JURISDICTIONS);
}

function resolveJourneyTaskSearchTimeoutMs(): number {
  const configured = parsePositiveInteger(process.env.API_JOURNEY_WA_TASK_TIMEOUT_MS);
  return configured ?? 45000;
}

function resolveJourneyTestTimeoutMs(): number {
  const configured = parsePositiveInteger(process.env.API_JOURNEY_TEST_TIMEOUT_MS);
  return configured ?? defaultJourneyTestTimeoutMs;
}

function resolveJourneyTaskSearchRetries(): number {
  const configured = parsePositiveInteger(process.env.API_JOURNEY_WA_TASK_RETRIES);
  if (configured === undefined) {
    return 1;
  }
  return Math.max(0, configured);
}

function parsePositiveInteger(value?: string): number | undefined {
  if (!value) {
    return undefined;
  }
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return undefined;
  }
  return parsed;
}

function parseCsvList(value?: string): string[] {
  if (!value) {
    return [];
  }
  return value
    .split(',')
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
}

function toReportSuffix(value: string): string {
  return `api-journey-${value}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

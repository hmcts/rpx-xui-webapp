import type { Page, Route } from '@playwright/test';
import {
  type HearingsCaseConfig,
  type HearingsCaseVariation,
  type HearingScenario,
  buildCaseFlagsMock,
  buildHearingsAppConfigMock,
  buildCourtLocationMock,
  buildHearingsCaseDetailsMock,
  buildHearingsEnvironmentConfigMock,
  buildHearingsListMock,
  buildHearingsUserDetailsMock,
  buildHearingRequestMock,
  buildHearingActualsMock,
  buildLinkedCasesWithHearingsMock,
  buildLinkedHearingGroupMock,
  buildLinkedHearingGroupResponseMock,
  buildLovRefDataMock,
  buildServiceLinkedCasesMock,
  buildServiceHearingValuesMock,
} from '../mocks/hearings.mock';

type HearingsEndpoint =
  | 'getHearings'
  | 'loadServiceHearingValues'
  | 'getHearing'
  | 'submitHearingRequest'
  | 'updateHearingRequest'
  | 'hearingActualsGet'
  | 'hearingActualsPut'
  | 'hearingActualsCompletion'
  | 'loadServiceLinkedCases'
  | 'loadLinkedCasesWithHearings'
  | 'getLinkedHearingGroup'
  | 'postLinkedHearingGroup'
  | 'putLinkedHearingGroup'
  | 'deleteLinkedHearingGroup';
type RouteAbortCode = Parameters<Route['abort']>[0];

interface HearingsApiOverride {
  status?: number;
  body?: unknown;
  contentType?: string;
  abortErrorCode?: RouteAbortCode;
  delayMs?: number;
}

export interface HearingsMockRoutesConfig {
  userRoles: string[];
  caseConfig?: HearingsCaseConfig;
  hearings?: HearingScenario[];
  summaryHearing?: HearingScenario;
  enabledCaseVariations?: HearingsCaseVariation[];
  amendmentCaseVariations?: HearingsCaseVariation[];
  hearingsApiOverrides?: Partial<Record<HearingsEndpoint, HearingsApiOverride>>;
}

function requestPath(route: Route): string {
  return new URL(route.request().url()).pathname;
}

function requestedHearingId(route: Route): string | undefined {
  const url = new URL(route.request().url());
  const hearingIdFromQuery = url.searchParams.get('hearingId');
  if (hearingIdFromQuery) {
    return hearingIdFromQuery;
  }

  const request = route.request();
  const body = request.postDataJSON?.() as { hearingID?: string; hearingId?: string } | null;
  return body?.hearingID ?? body?.hearingId;
}

function wait(delayMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

function resolveRouteBody(override: HearingsApiOverride | undefined, fallbackBody: unknown): string {
  if (!override || override.body === undefined) {
    return JSON.stringify(fallbackBody);
  }

  if (typeof override.body === 'string') {
    return override.body;
  }

  return JSON.stringify(override.body);
}

async function fulfillHearingsEndpoint(
  route: Route,
  override: HearingsApiOverride | undefined,
  fallbackBody: unknown
): Promise<void> {
  if (override?.delayMs && override.delayMs > 0) {
    await wait(override.delayMs);
  }

  if (override?.abortErrorCode) {
    await route.abort(override.abortErrorCode);
    return;
  }

  await route.fulfill({
    status: override?.status ?? 200,
    contentType: override?.contentType ?? 'application/json',
    body: resolveRouteBody(override, fallbackBody),
  });
}

export async function setupHearingsMockRoutes(page: Page, config: HearingsMockRoutesConfig): Promise<void> {
  const hearingScenarios = config.hearings ?? undefined;
  const summaryHearing = config.summaryHearing ?? hearingScenarios?.[0];
  const hearingById = new Map((hearingScenarios ?? []).map((hearing) => [hearing.hearingId, hearing]));
  const userDetails = buildHearingsUserDetailsMock(config.userRoles);
  const appConfig = buildHearingsAppConfigMock();
  const environmentConfig = buildHearingsEnvironmentConfigMock({
    enabledCaseVariations: config.enabledCaseVariations,
    amendmentCaseVariations: config.amendmentCaseVariations,
  });
  const caseDetails = buildHearingsCaseDetailsMock(config.caseConfig);
  const hearingsList = buildHearingsListMock(hearingScenarios, config.caseConfig);
  const hearingValues = buildServiceHearingValuesMock(config.caseConfig, summaryHearing);
  const hearingActuals = buildHearingActualsMock();
  const serviceLinkedCases = buildServiceLinkedCasesMock();
  const linkedCasesWithHearings = buildLinkedCasesWithHearingsMock();
  const linkedHearingGroup = buildLinkedHearingGroupMock();
  const linkedHearingGroupResponse = buildLinkedHearingGroupResponseMock();
  const caseFlags = buildCaseFlagsMock();
  const courtLocation = buildCourtLocationMock(config.caseConfig);
  const hearingTypes = Array.from(
    new Set(
      [...(hearingScenarios ?? []), ...(summaryHearing ? [summaryHearing] : [])].map(
        (hearing) => hearing.hearingType ?? 'ABA5-ABC'
      )
    )
  );
  const hearingsApiOverrides = config.hearingsApiOverrides ?? {};

  await page.addInitScript((seededUserInfo) => {
    window.sessionStorage.setItem('userDetails', JSON.stringify(seededUserInfo));
  }, userDetails.userInfo);

  await page.route('**/api/user/details*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(userDetails),
    });
  });

  await page.route('**/assets/config/config.json*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(appConfig),
    });
  });

  await page.route(/\/external\/config\/ui(?:\/|\?|$)/, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(environmentConfig),
    });
  });

  await page.route(`**/data/internal/cases/${caseDetails.case_id}*`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(caseDetails),
    });
  });

  await page.route('**/api/role-access/roles/manageLabellingRoleAssignment/**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({}),
    });
  });

  await page.route('**/api/role-access/roles/access-get-by-caseId*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await page.route('**/api/wa-supported-jurisdiction/get*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await page.route('**/workallocation/caseworker/getUsersByServiceName*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await page.route('**/workallocation/caseworker/getUsersByIdamIds*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await page.route('**/workallocation/caseworker/getUserByIdamId*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await page.route('**/api/prd/judicial/searchJudicialUserByIdamId*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await page.route('**/api/hearings/**', async (route) => {
    const path = requestPath(route);

    switch (path) {
      case '/api/hearings/getHearings':
        await fulfillHearingsEndpoint(route, hearingsApiOverrides.getHearings, hearingsList);
        return;
      case '/api/hearings/loadServiceHearingValues':
        await fulfillHearingsEndpoint(route, hearingsApiOverrides.loadServiceHearingValues, hearingValues);
        return;
      case '/api/hearings/getHearing':
        await fulfillHearingsEndpoint(
          route,
          hearingsApiOverrides.getHearing,
          buildHearingRequestMock(
            (requestedHearingId(route) ? hearingById.get(String(requestedHearingId(route))) : undefined) ?? summaryHearing,
            config.caseConfig
          )
        );
        return;
      case '/api/hearings/submitHearingRequest':
        await fulfillHearingsEndpoint(route, hearingsApiOverrides.submitHearingRequest, {});
        return;
      case '/api/hearings/updateHearingRequest':
        await fulfillHearingsEndpoint(route, hearingsApiOverrides.updateHearingRequest, {});
        return;
      case '/api/hearings/hearingActuals':
        await fulfillHearingsEndpoint(route, hearingsApiOverrides.hearingActualsPut, hearingActuals);
        return;
      case '/api/hearings/hearingActualsCompletion':
        await fulfillHearingsEndpoint(route, hearingsApiOverrides.hearingActualsCompletion, {});
        return;
      case '/api/hearings/loadServiceLinkedCases':
        await fulfillHearingsEndpoint(route, hearingsApiOverrides.loadServiceLinkedCases, serviceLinkedCases);
        return;
      case '/api/hearings/loadLinkedCasesWithHearings':
        await fulfillHearingsEndpoint(route, hearingsApiOverrides.loadLinkedCasesWithHearings, linkedCasesWithHearings);
        return;
      case '/api/hearings/getLinkedHearingGroup':
        await fulfillHearingsEndpoint(route, hearingsApiOverrides.getLinkedHearingGroup, linkedHearingGroup);
        return;
      case '/api/hearings/postLinkedHearingGroup':
        await fulfillHearingsEndpoint(route, hearingsApiOverrides.postLinkedHearingGroup, linkedHearingGroupResponse);
        return;
      case '/api/hearings/putLinkedHearingGroup':
        await fulfillHearingsEndpoint(route, hearingsApiOverrides.putLinkedHearingGroup, linkedHearingGroupResponse);
        return;
      case '/api/hearings/deleteLinkedHearingGroup':
        await fulfillHearingsEndpoint(route, hearingsApiOverrides.deleteLinkedHearingGroup, linkedHearingGroupResponse);
        return;
      default:
        if (path.startsWith('/api/hearings/hearingActuals/')) {
          await fulfillHearingsEndpoint(route, hearingsApiOverrides.hearingActualsGet, hearingActuals);
          return;
        }
        if (path.startsWith('/api/hearings/hearingActualsCompletion/')) {
          await fulfillHearingsEndpoint(route, hearingsApiOverrides.hearingActualsCompletion, {});
          return;
        }
        await route.fallback();
    }
  });

  await page.route('**/api/prd/lov/getLovRefData*', async (route) => {
    const requestUrl = new URL(route.request().url());
    const categoryKey = requestUrl.searchParams.get('categoryId') ?? requestUrl.searchParams.get('categoryKey') ?? undefined;

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(
        buildLovRefDataMock(categoryKey, {
          hearingTypes,
          caseTypeId: config.caseConfig?.caseTypeId,
        })
      ),
    });
  });

  await page.route('**/api/prd/caseFlag/getCaseFlagRefData*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(caseFlags),
    });
  });

  await page.route('**/api/prd/judicial/searchJudicialUserByPersonalCodes*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await page.route('**/api/prd/location/getLocationById*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(courtLocation),
    });
  });
}

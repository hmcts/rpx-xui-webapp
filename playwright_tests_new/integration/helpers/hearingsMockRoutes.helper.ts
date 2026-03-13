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
  buildLovRefDataMock,
  buildServiceHearingValuesMock,
} from '../mocks/hearings.mock';

export interface HearingsMockRoutesConfig {
  userRoles: string[];
  caseConfig?: HearingsCaseConfig;
  hearings?: HearingScenario[];
  summaryHearing?: HearingScenario;
  enabledCaseVariations?: HearingsCaseVariation[];
  amendmentCaseVariations?: HearingsCaseVariation[];
}

function requestPath(route: Route): string {
  return new URL(route.request().url()).pathname;
}

function requestedHearingId(route: Route): string | undefined {
  const request = route.request();
  const body = request.postDataJSON?.() as { hearingID?: string; hearingId?: string } | null;
  return body?.hearingID ?? body?.hearingId;
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
  const caseFlags = buildCaseFlagsMock();
  const courtLocation = buildCourtLocationMock(config.caseConfig);
  const hearingTypes = Array.from(
    new Set(
      [...(hearingScenarios ?? []), ...(summaryHearing ? [summaryHearing] : [])].map(
        (hearing) => hearing.hearingType ?? 'ABA5-ABC'
      )
    )
  );

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

  await page.route('**/external/config/ui*', async (route) => {
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

  await page.route('**/api/prd/judicial/searchJudicialUserByIdamId*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await page.route('**/api/hearings/*', async (route) => {
    switch (requestPath(route)) {
      case '/api/hearings/getHearings':
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(hearingsList),
        });
        return;
      case '/api/hearings/loadServiceHearingValues':
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(hearingValues),
        });
        return;
      case '/api/hearings/getHearing':
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(
            buildHearingRequestMock(
              (requestedHearingId(route) ? hearingById.get(String(requestedHearingId(route))) : undefined) ?? summaryHearing,
              config.caseConfig
            )
          ),
        });
        return;
      default:
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

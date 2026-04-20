import type { Page, Route } from '@playwright/test';
import {
  buildNgIntegrationToolkitCreateCaseEvent,
  buildNgIntegrationToolkitJurisdictionsMock,
  buildNgIntegrationToolkitSearchInputConfig,
  buildNgIntegrationToolkitSearchResults,
  buildNgIntegrationToolkitWorkbasketConfig,
  NG_INTEGRATION_CASE_TYPE,
  NG_INTEGRATION_EVENT_ID,
  type LegacyCaseEventConfig,
  type NgIntegrationToolkitSearchConfig,
} from '../mocks/ngIntegration.mock';
import { setupNgIntegrationBaseRoutes } from './ngIntegrationMockRoutes.helper';

export const NG_INTEGRATION_TOOLKIT_ROLES = ['caseworker-ia', 'caseworker-ia-caseofficer', 'caseworker-ia-admofficer'];

type SearchResultsSource = 'workbasket' | 'search';

type SearchResultsRouteOptions = {
  source: SearchResultsSource;
  total?: number;
  onRequest?: (route: Route) => void;
};

function resolveToolkitConfig(source: SearchResultsSource): NgIntegrationToolkitSearchConfig {
  return (
    source === 'search' ? buildNgIntegrationToolkitSearchInputConfig() : buildNgIntegrationToolkitWorkbasketConfig()
  ) as NgIntegrationToolkitSearchConfig;
}

function buildValidationResponse(route: Route): Record<string, unknown> {
  const payload = route.request().postDataJSON() as { data?: Record<string, unknown> } | null;
  const pageId = new URL(route.request().url()).searchParams.get('pageId') ?? '';

  return {
    data: payload?.data ?? {},
    errors: [],
    _links: {
      self: {
        href: `/data/case-types/${NG_INTEGRATION_CASE_TYPE}/validate?pageId=${pageId}`,
      },
    },
  };
}

function extractPageNumber(route: Route): number {
  const requestUrl = new URL(route.request().url());
  const directPage = requestUrl.searchParams.get('page');
  if (directPage) {
    return Number(directPage) || 1;
  }

  const pageNumber = requestUrl.searchParams.get('pageNumber');
  if (pageNumber) {
    return Number(pageNumber) || 1;
  }

  return 1;
}

export async function setupNgIntegrationToolkitRoutes(
  page: Page,
  options: {
    userId?: string;
    roles?: string[];
    source?: SearchResultsSource;
    total?: number;
    onSearchRequest?: (route: Route) => void;
  } = {}
): Promise<void> {
  await setupNgIntegrationBaseRoutes(page, {
    userDetails: {
      userId: options.userId ?? 'IAC_CaseOfficer_R2',
      roles: options.roles ?? NG_INTEGRATION_TOOLKIT_ROLES,
    },
  });

  const jurisdictions = buildNgIntegrationToolkitJurisdictionsMock();
  const source = options.source ?? 'workbasket';
  const config = resolveToolkitConfig(source);
  const workbasketInputs = config.workbasketInputs ?? [];
  const searchInputs = config.searchInputs ?? [];

  await page.route('**/caseworkers/**/jurisdictions*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(jurisdictions),
    });
  });

  await page.route('**/aggregated/caseworkers/**/jurisdictions*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(jurisdictions),
    });
  });

  await page.route('**/caseworkers/**/jurisdictions/**/case-types/**/work-basket-inputs*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ workbasketInputs }),
    });
  });

  await page.route('**/data/internal/case-types/**/work-basket-inputs*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ workbasketInputs }),
    });
  });

  await page.route('**/data/internal/case-types/**/search-inputs*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ searchInputs }),
    });
  });

  await routeNgIntegrationToolkitSearchResults(page, {
    source,
    total: options.total,
    onRequest: options.onSearchRequest,
  });
}

export async function routeNgIntegrationToolkitSearchResults(page: Page, options: SearchResultsRouteOptions): Promise<void> {
  await page.route('**/data/internal/searchCases*', async (route) => {
    options.onRequest?.(route);
    const pageNumber = extractPageNumber(route);
    const body = JSON.stringify(
      buildNgIntegrationToolkitSearchResults(options.source, {
        pageNumber,
        total: options.total,
      })
    );

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body,
    });
  });
}

export async function setupNgIntegrationToolkitCreateCaseRoutes(
  page: Page,
  eventConfig: LegacyCaseEventConfig = buildNgIntegrationToolkitCreateCaseEvent(),
  options: {
    userId?: string;
    roles?: string[];
    validateStatus?: number;
    validateBody?: unknown;
  } = {}
): Promise<void> {
  await setupNgIntegrationBaseRoutes(page, {
    userDetails: {
      userId: options.userId ?? 'IAC_CaseOfficer_R2',
      roles: options.roles ?? NG_INTEGRATION_TOOLKIT_ROLES,
    },
  });

  await page.route(
    `**/data/internal/case-types/${NG_INTEGRATION_CASE_TYPE}/event-triggers/${NG_INTEGRATION_EVENT_ID}*`,
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(eventConfig),
      });
    }
  );

  await page.route(`**/data/case-types/${NG_INTEGRATION_CASE_TYPE}/validate*`, async (route) => {
    await route.fulfill({
      status: options.validateStatus ?? 200,
      contentType: 'application/json',
      body: JSON.stringify(options.validateBody ?? buildValidationResponse(route)),
    });
  });
}

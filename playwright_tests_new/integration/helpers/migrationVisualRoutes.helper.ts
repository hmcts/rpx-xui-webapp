import type { Page, Route } from '@playwright/test';
import { MIGRATION_FEATURE_FLAGS } from '../mocks/govukMigration.mock';
import { setupVisualManageCasesRoutes } from './visualManageCasesRoutes.helper';
import { buildXuiAppShellEnvironmentConfigMock } from './xuiAppShellMockRoutes.helper';

export async function setupMigrationVisualRoutes(page: Page, roles: string[]): Promise<void> {
  await setupVisualManageCasesRoutes(page, roles);

  const headers = { date: new Date().toUTCString(), 'access-control-expose-headers': 'Date' };
  await page.route('**/*launchdarkly.com/**', (route) => route.fulfill({ status: 202, headers, body: '' }));
  await page.route('**/*launchdarkly.com/sdk/eval**', (route) => route.fulfill({ headers, json: MIGRATION_FEATURE_FLAGS }));
  await page.route('**/*launchdarkly.com/sdk/goals/**', (route) => route.fulfill({ headers, json: [] }));
  await page.route(/\/external\/config\/ui(?:\/|\?|$)/, (route) =>
    route.fulfill({
      json: {
        ...buildXuiAppShellEnvironmentConfigMock(),
        hearingJurisdictionConfig: { hearingJurisdictions: { '.+': [] }, hearingAmendment: { '.+': [] } },
      },
    })
  );
}

export function mockMigrationRequest(
  page: Page,
  origin: string,
  method: 'GET' | 'POST',
  pathname: string,
  handler: (route: Route) => Promise<void>
) {
  return page.route(
    (url) => url.origin === origin && url.pathname === pathname,
    (route) => (route.request().method() === method ? handler(route) : route.fallback())
  );
}

import type { Page } from '@playwright/test';
import { MIGRATION_FEATURE_FLAGS } from '../mocks/govukMigration.mock';
import { setupVisualManageCasesRoutes } from './visualManageCasesRoutes.helper';
import { buildXuiAppShellEnvironmentConfigMock } from './xuiAppShellMockRoutes.helper';

export async function setupMigrationVisualRoutes(page: Page, roles: string[]): Promise<void> {
  await page.route(
    (url) => !['localhost', '127.0.0.1'].includes(url.hostname),
    (route) => route.abort('blockedbyclient')
  );
  // Route handlers below fulfil the synthetic API calls. Block any unmatched service request.
  await page.route('**/*', (route) => {
    const request = route.request();
    const path = new URL(request.url()).pathname;
    const isServiceRequest = request.method() !== 'GET' || ['fetch', 'xhr'].includes(request.resourceType());
    return isServiceRequest && !path.startsWith('/assets/') ? route.abort('blockedbyclient') : route.fallback();
  });
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

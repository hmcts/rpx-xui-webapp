import type { Page } from '@playwright/test';
import { buildCaseListJurisdictionsMock, buildCaseListMock } from '../mocks/caseList.mock';
import { setupCaseListMocks } from './caseList.helper';
import { setupXuiAppShellBaseRoutes, type XuiAppShellUserDetailsOptions } from './xuiAppShellMockRoutes.helper';

export const PLATFORM_SERVICES_TAG = '@integration-platform-services';

export async function setupPlatformServicesCaseListRoutes(page: Page, userDetails: XuiAppShellUserDetailsOptions): Promise<void> {
  await setupXuiAppShellBaseRoutes(page, { userDetails });
  await page.route('**/auth/isAuthenticated*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(true),
    });
  });
  await page.route('**/api/organisation*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        name: 'Playwright Organisation',
        organisationIdentifier: 'PLAYWRIGHT_ORG',
        status: 'ACTIVE',
        contactInformation: [],
        paymentAccount: [],
      }),
    });
  });
  await setupCaseListMocks(page, {
    jurisdictions: buildCaseListJurisdictionsMock(),
    searchResponse: buildCaseListMock(2),
  });
}

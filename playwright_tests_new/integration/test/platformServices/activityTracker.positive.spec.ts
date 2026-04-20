import type { Page } from '@playwright/test';
import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { setupNgIntegrationBaseRoutes } from '../../helpers';
import { buildCaseListJurisdictionsMock, buildCaseListMock } from '../../mocks/caseList.mock';

const activityUsers = [
  {
    userIdentifier: 'IAC_CaseOfficer_R2',
    roles: ['caseworker-ia-caseofficer', 'caseworker-ia-admofficer'],
  },
  {
    userIdentifier: 'IAC_CaseOfficer_R1_withPagination',
    roles: ['caseworker-ia-caseofficer', 'caseworker-ia-admofficer'],
  },
] as const;

const authenticatedUserIdentifier = 'STAFF_ADMIN';

async function setupCasesPageRoutes(page: Page): Promise<void> {
  await page.route('**/caseworkers/**/jurisdictions*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(buildCaseListJurisdictionsMock()),
    });
  });

  await page.route('**/caseworkers/**/jurisdictions/**/case-types/**/work-basket-inputs*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ workbasketInputs: [] }),
    });
  });

  await page.route('**/data/internal/searchCases*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(buildCaseListMock(2)),
    });
  });
}

test.describe('ngIntegration activity tracking parity', { tag: ['@integration', '@integration-platform-services'] }, () => {
  for (const scenario of activityUsers) {
    test(`requests case activity when ${scenario.userIdentifier} opens the case list`, async ({ caseListPage, page }) => {
      await applySessionCookies(page, authenticatedUserIdentifier);
      await setupNgIntegrationBaseRoutes(page, {
        userDetails: {
          userId: scenario.userIdentifier,
          roles: [...scenario.roles],
        },
      });
      await setupCasesPageRoutes(page);

      await page.route('**/activity/**', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({}),
        });
      });

      const activityRequest = page.waitForRequest(
        (request) => request.url().includes('/activity/case') || /\/activity\/cases\/.+\/activity/.test(request.url())
      );

      await caseListPage.navigateTo();
      await expect(caseListPage.exuiHeader.header).toBeVisible();

      const request = await activityRequest;
      expect(request.url()).toMatch(/\/activity\/case|\/activity\/cases\/.+\/activity/);
    });
  }
});

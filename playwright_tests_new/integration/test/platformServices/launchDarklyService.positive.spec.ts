import type { Page, TestInfo } from '@playwright/test';
import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { setupNgIntegrationBaseRoutes } from '../../helpers';
import { buildCaseListJurisdictionsMock, buildCaseListMock } from '../../mocks/caseList.mock';

const legacyWorkAllocationRoles = ['caseworker-ia-caseofficer', 'caseworker-ia-admofficer', 'task-supervisor', 'case-allocator'];

const authenticatedUserIdentifier = 'STAFF_ADMIN';

const launchDarklyUsers = [
  'IAC_CaseOfficer_R1_withPagination',
  'IAC_CaseOfficer_R1_withoutPagination',
  'IAC_CaseOfficer_R2',
] as const;

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

test.describe('ngIntegration feature-flag parity', { tag: ['@integration', '@integration-platform-services'] }, () => {
  for (const userIdentifier of launchDarklyUsers) {
    test(`stores WorkAllocationRelease2 flag in clientContext for ${userIdentifier}`, async ({
      caseListPage,
      page,
    }, testInfo: TestInfo) => {
      testInfo.annotations.push({ type: 'legacy-user', description: userIdentifier });

      await applySessionCookies(page, authenticatedUserIdentifier);
      await setupNgIntegrationBaseRoutes(page, {
        userDetails: {
          userId: userIdentifier,
          roles: [...legacyWorkAllocationRoles],
        },
      });
      await setupCasesPageRoutes(page);

      await caseListPage.navigateTo();
      await expect(caseListPage.exuiHeader.header).toBeVisible();

      const workAllocationFlag = await page.evaluate(() => {
        const clientContext = JSON.parse(window.sessionStorage.getItem('clientContext') ?? '{}');
        return clientContext?.client_context?.feature_flags?.['mc-work-allocation-active-feature'];
      });

      expect(workAllocationFlag).toBe('WorkAllocationRelease2');
    });
  }
});

import type { Locator, Page } from '@playwright/test';
import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { setupNgIntegrationBaseRoutes } from '../../helpers';
import { buildCaseListJurisdictionsMock, buildCaseListMock } from '../../mocks/caseList.mock';

type HeaderScenario = {
  name: string;
  authenticatedUserIdentifier: string;
  userIdentifier: string;
  roles: string[];
  expectedLeft: string[];
  expectedAbsent: string[];
  expectedRight: string[];
  quickSearchVisible: boolean;
};

const headerScenarios: HeaderScenario[] = [
  {
    name: 'caseworker non-WA navigation',
    authenticatedUserIdentifier: 'STAFF_ADMIN',
    userIdentifier: 'PROD_LIKE',
    roles: ['caseworker-cmc'],
    expectedLeft: ['Case list', 'Create case', 'Find case'],
    expectedAbsent: ['My work', 'All work', 'Search', 'Refunds', 'Notice of change'],
    expectedRight: [],
    quickSearchVisible: true,
  },
  {
    name: 'caseworker work-allocation navigation',
    authenticatedUserIdentifier: 'STAFF_ADMIN',
    userIdentifier: 'IAC_CaseOfficer_R2',
    roles: ['caseworker-ia', 'caseworker-ia-caseofficer', 'caseworker-ia-admofficer', 'task-supervisor'],
    expectedLeft: ['My work', 'All work', 'Case list', 'Create case', 'Search'],
    expectedAbsent: ['Refunds', 'Notice of change'],
    expectedRight: [],
    quickSearchVisible: true,
  },
  {
    name: 'caseworker refunds navigation',
    authenticatedUserIdentifier: 'STAFF_ADMIN',
    userIdentifier: 'IAC_CaseOfficer_R2',
    roles: ['caseworker-cmc', 'payments-refund'],
    expectedLeft: ['Case list', 'Create case', 'Find case', 'Refunds'],
    expectedAbsent: ['My work', 'All work', 'Search', 'Notice of change'],
    expectedRight: [],
    quickSearchVisible: true,
  },
  {
    name: 'judicial work-allocation navigation',
    authenticatedUserIdentifier: 'STAFF_ADMIN',
    userIdentifier: 'IAC_Judge_WA_R2',
    roles: ['caseworker-ia-iacjudge', 'task-supervisor'],
    expectedLeft: ['My work', 'All work', 'Case list', 'Search'],
    expectedAbsent: ['Create case', 'Refunds', 'Notice of change'],
    expectedRight: [],
    quickSearchVisible: true,
  },
  {
    name: 'solicitor navigation without NOC',
    authenticatedUserIdentifier: 'SOLICITOR',
    userIdentifier: 'SOLICITOR',
    roles: ['pui-case-manager'],
    expectedLeft: ['Case list', 'Create case'],
    expectedAbsent: ['My work', 'All work', 'Search', 'Refunds', 'Notice of change'],
    expectedRight: ['Find case'],
    quickSearchVisible: false,
  },
  {
    name: 'solicitor navigation with NOC',
    authenticatedUserIdentifier: 'SOLICITOR',
    userIdentifier: 'SOLICITOR',
    roles: ['pui-case-manager', 'caseworker-divorce-solicitor'],
    expectedLeft: ['Case list', 'Create case', 'Notice of change'],
    expectedAbsent: ['My work', 'All work', 'Search', 'Refunds'],
    expectedRight: ['Find case'],
    quickSearchVisible: false,
  },
];

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

async function visibleTexts(locator: Locator): Promise<string[]> {
  return (await locator.allTextContents()).map((text) => text.trim()).filter(Boolean);
}

test.describe('ngIntegration header parity', { tag: ['@integration', '@integration-platform-services'] }, () => {
  for (const scenario of headerScenarios) {
    test(`renders ${scenario.name}`, async ({ caseListPage, page }) => {
      await applySessionCookies(page, scenario.authenticatedUserIdentifier);
      await setupNgIntegrationBaseRoutes(page, {
        userDetails: {
          userId: scenario.userIdentifier,
          roles: [...scenario.roles],
        },
      });
      await setupCasesPageRoutes(page);

      await caseListPage.navigateTo();
      await expect(caseListPage.exuiHeader.header).toBeVisible();

      const leftNavigationTexts = await visibleTexts(
        page.locator('.hmcts-primary-navigation__nav .hmcts-primary-navigation__link')
      );
      const rightNavigationTexts = await visibleTexts(
        page.locator('.hmcts-primary-navigation__search a.hmcts-primary-navigation__link')
      );

      expect(leftNavigationTexts).toEqual(expect.arrayContaining(scenario.expectedLeft));
      expect(rightNavigationTexts).toEqual(expect.arrayContaining(scenario.expectedRight));

      for (const unexpectedLabel of scenario.expectedAbsent) {
        expect(leftNavigationTexts).not.toContain(unexpectedLabel);
        expect(rightNavigationTexts).not.toContain(unexpectedLabel);
      }

      if (scenario.quickSearchVisible) {
        await expect(caseListPage.quickSearchCaseReferenceInput).toBeVisible();
      } else {
        await expect(caseListPage.quickSearchCaseReferenceInput).toBeHidden();
      }
    });
  }
});

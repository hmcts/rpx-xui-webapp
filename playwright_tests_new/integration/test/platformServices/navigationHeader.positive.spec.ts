import type { Locator } from '@playwright/test';
import { expect, test } from '../../../E2E/fixtures';
import { PLATFORM_SERVICES_TAG, setupPlatformServicesCaseListRoutes } from '../../helpers';

type HeaderScenario = {
  name: string;
  userIdentifier: string;
  roles: string[];
  expectedLeft: string[];
  expectedRight: string[];
  quickSearchVisible: boolean;
};

const headerScenarios: HeaderScenario[] = [
  {
    name: 'caseworker non-WA navigation',
    userIdentifier: 'PROD_LIKE',
    roles: ['caseworker-cmc'],
    expectedLeft: ['Case list', 'Create case', 'Find case'],
    expectedRight: [],
    quickSearchVisible: true,
  },
  {
    name: 'caseworker work-allocation navigation',
    userIdentifier: 'IAC_CaseOfficer_R2',
    roles: ['caseworker-ia', 'caseworker-ia-caseofficer', 'caseworker-ia-admofficer', 'task-supervisor'],
    expectedLeft: ['My work', 'All work', 'Case list', 'Create case', 'Search'],
    expectedRight: [],
    quickSearchVisible: true,
  },
  {
    name: 'caseworker refunds navigation',
    userIdentifier: 'IAC_CaseOfficer_R2',
    roles: ['caseworker-cmc', 'payments-refund'],
    expectedLeft: ['Case list', 'Create case', 'Find case', 'Refunds'],
    expectedRight: [],
    quickSearchVisible: true,
  },
  {
    name: 'judicial work-allocation navigation',
    userIdentifier: 'IAC_Judge_WA_R2',
    roles: ['caseworker-ia-iacjudge', 'task-supervisor'],
    expectedLeft: ['My work', 'All work', 'Case list', 'Search'],
    expectedRight: [],
    quickSearchVisible: true,
  },
  {
    name: 'solicitor navigation without NOC',
    userIdentifier: 'SOLICITOR',
    roles: ['pui-case-manager'],
    expectedLeft: ['Case list', 'Create case'],
    expectedRight: ['Find case'],
    quickSearchVisible: false,
  },
  {
    name: 'solicitor navigation with NOC',
    userIdentifier: 'SOLICITOR',
    roles: ['pui-case-manager', 'caseworker-divorce-solicitor'],
    expectedLeft: ['Case list', 'Create case', 'Notice of change'],
    expectedRight: ['Find case'],
    quickSearchVisible: false,
  },
];

async function visibleTexts(locator: Locator): Promise<string[]> {
  return (await locator.allTextContents()).map((text) => text.trim()).filter(Boolean);
}

test.describe('platform services header parity', { tag: ['@integration', PLATFORM_SERVICES_TAG] }, () => {
  for (const scenario of headerScenarios) {
    test(`renders ${scenario.name}`, async ({ caseListPage, page }) => {
      await setupPlatformServicesCaseListRoutes(page, {
        userId: scenario.userIdentifier,
        roles: [...scenario.roles],
      });

      await caseListPage.navigateTo();
      await expect(caseListPage.exuiHeader.header).toBeVisible();

      const leftNavigationTexts = await visibleTexts(
        page.locator('.hmcts-primary-navigation__nav .hmcts-primary-navigation__link')
      );
      const rightNavigationTexts = await visibleTexts(
        page.locator('.hmcts-primary-navigation__search a.hmcts-primary-navigation__link')
      );

      expect(leftNavigationTexts).toEqual(scenario.expectedLeft);
      expect(rightNavigationTexts).toEqual(scenario.expectedRight);

      if (scenario.quickSearchVisible) {
        await expect(caseListPage.quickSearchCaseReferenceInput).toBeVisible();
      } else {
        await expect(caseListPage.quickSearchCaseReferenceInput).toBeHidden();
      }
    });
  }
});

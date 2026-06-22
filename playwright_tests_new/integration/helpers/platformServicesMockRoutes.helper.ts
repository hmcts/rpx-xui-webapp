import type { Locator, Page } from '@playwright/test';
import { buildCaseListJurisdictionsMock, buildCaseListMock } from '../mocks/caseList.mock';
import {
  buildSupportedAMRoleAssignments,
  defaultStaffAMMenuRole,
  judicialAMMenuRole,
  resolveAMRoleCategory,
  type AMMenuRoleName,
} from './amRoleAssignmentMock.helper';
import { setupCaseListMocks } from './caseList.helper';
import { setupXuiAppShellBaseRoutes, type XuiAppShellUserDetailsOptions } from './xuiAppShellMockRoutes.helper';

type HeaderScenario = {
  name: string;
  userIdentifier: string;
  roles: string[];
  amMenuRole?: AMMenuRoleName;
  expectedLeft: string[];
  expectedRight: string[];
  quickSearchVisible: boolean;
};

export const platformServicesHeaderScenarios: HeaderScenario[] = [
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
    amMenuRole: defaultStaffAMMenuRole,
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
    amMenuRole: judicialAMMenuRole,
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

export async function visibleNavigationTexts(locator: Locator): Promise<string[]> {
  return (await locator.allTextContents()).map((text) => text.trim()).filter(Boolean);
}

function buildScenarioUserDetails(scenario: HeaderScenario): XuiAppShellUserDetailsOptions {
  const baseUserDetails = {
    userId: scenario.userIdentifier,
    roles: [...scenario.roles],
  };

  return scenario.amMenuRole
    ? {
        ...baseUserDetails,
        roleCategory: resolveAMRoleCategory(scenario.amMenuRole),
        roles: Array.from(new Set([...scenario.roles, scenario.amMenuRole])),
        roleAssignmentInfo: buildSupportedAMRoleAssignments([scenario.amMenuRole]),
      }
    : baseUserDetails;
}

export async function setupPlatformServicesCaseListRoutes(page: Page, scenario: HeaderScenario): Promise<void> {
  await setupXuiAppShellBaseRoutes(page, { userDetails: buildScenarioUserDetails(scenario) });
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

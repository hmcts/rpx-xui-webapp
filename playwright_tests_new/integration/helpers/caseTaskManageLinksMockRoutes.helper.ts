import type { Page } from '@playwright/test';
import type { CaseDetailsPage } from '../../E2E/page-objects/pages/exui/caseDetails.po';
import {
  buildHearingsAppConfigMock,
  buildHearingsEnvironmentConfigMock,
  buildHearingsUserDetailsMock,
} from '../mocks/hearings.mock';
import { buildAsylumCaseMock } from '../mocks/cases/asylumCase.mock';
import {
  buildCaseTaskManageLinksResponse,
  type CaseTaskManageLinksCaseworker,
  type CaseTaskManageLinksState,
} from '../mocks/caseTaskManageLinks.mock';

export type CaseTaskManageLinksRoutesConfig = {
  caseId: string;
  claimTaskId: string;
  managedTaskId: string;
  claimTaskTitle: string;
  managedTaskTitle: string;
  taskDueDate: string;
  state: CaseTaskManageLinksState;
  caseworkers: CaseTaskManageLinksCaseworker[];
};

export async function setupCaseTaskManageLinksRoutes(page: Page, config: CaseTaskManageLinksRoutesConfig): Promise<void> {
  const caseMockResponse = buildAsylumCaseMock({ caseId: config.caseId });
  const userDetails = buildHearingsUserDetailsMock(['caseworker-ia', 'caseworker-ia-caseofficer']);
  const appConfig = buildHearingsAppConfigMock();
  const environmentConfig = buildHearingsEnvironmentConfigMock();

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

  await page.route(/\/external\/config\/ui(?:\/|\?|$)/, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(environmentConfig),
    });
  });

  await page.route('**/auth/isAuthenticated*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: 'true',
    });
  });

  await page.route('**/api/configuration*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: 'false',
    });
  });

  await page.route('**/api/monitoring-tools*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        key: '',
        connectionString: '',
      }),
    });
  });

  await page.route('**/api/wa-supported-jurisdiction/get*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(['IA']),
    });
  });

  await page.route('**/api/wa-supported-jurisdiction/detail*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([{ serviceId: 'IA', serviceName: 'IA' }]),
    });
  });

  await page.route('**/api/role-access/roles/manageLabellingRoleAssignment/**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({}),
    });
  });

  await page.route('**/aggregated/caseworkers/**/jurisdictions*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          id: 'IA',
          name: 'Immigration and Asylum',
        },
      ]),
    });
  });

  await page.route(`**/data/internal/cases/${config.caseId}*`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(caseMockResponse),
    });
  });

  await page.route(`**/workallocation/case/task/${config.caseId}*`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(
        buildCaseTaskManageLinksResponse({
          caseId: config.caseId,
          claimTaskId: config.claimTaskId,
          managedTaskId: config.managedTaskId,
          claimTaskTitle: config.claimTaskTitle,
          managedTaskTitle: config.managedTaskTitle,
          taskDueDate: config.taskDueDate,
          state: config.state,
        })
      ),
    });
  });

  await page.route('**/workallocation/caseworker/getUsersByServiceName*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(config.caseworkers),
    });
  });

  await page.route('**/workallocation/findPerson*', async (route) => {
    const requestBody =
      (route.request().postDataJSON() as {
        searchOptions?: { searchTerm?: string };
      }) ?? {};
    const searchTerm = requestBody.searchOptions?.searchTerm?.toLowerCase() ?? '';
    const matchingPeople = config.caseworkers
      .filter(
        (caseworker) =>
          `${caseworker.firstName} ${caseworker.lastName}`.toLowerCase().includes(searchTerm) ||
          caseworker.email.toLowerCase().includes(searchTerm)
      )
      .map((caseworker) => ({
        id: caseworker.idamId,
        name: `${caseworker.firstName} ${caseworker.lastName}`,
        email: caseworker.email,
        domain: caseworker.roleCategory,
      }));

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(matchingPeople),
    });
  });

  await page.route('**/api/role-access/roles/getJudicialUsers*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });
}

export async function openCaseDetailsTasksTab(page: Page, caseDetailsPage: CaseDetailsPage, caseId: string): Promise<void> {
  await page.goto(`/cases/case-details/IA/Asylum/${caseId}`, { waitUntil: 'domcontentloaded' });
  await caseDetailsPage.selectCaseDetailsTab('Tasks');
  await caseDetailsPage.taskListContainer.waitFor({ state: 'visible' });
}

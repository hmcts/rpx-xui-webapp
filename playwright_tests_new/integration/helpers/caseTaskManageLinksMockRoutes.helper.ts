import type { Page } from '@playwright/test';
import type { CaseDetailsPage } from '../../E2E/page-objects/pages/exui/caseDetails.po';
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
}

export async function openCaseDetailsTasksTab(page: Page, caseDetailsPage: CaseDetailsPage, caseId: string): Promise<void> {
  await page.goto(`/cases/case-details/IA/Asylum/${caseId}`, { waitUntil: 'domcontentloaded' });
  await caseDetailsPage.selectCaseDetailsTab('Tasks');
  await caseDetailsPage.taskListContainer.waitFor({ state: 'visible' });
}

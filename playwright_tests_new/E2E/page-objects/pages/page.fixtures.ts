import { ApiClient, createLogger, ExuiMediaViewerPage, IdamPage, type ApiLogEntry } from '@hmcts/playwright-common';
import { CaseDetailsPage } from './exui/caseDetails.po';
import { CaseListPage } from './exui/caseList.po';
import { CreateCasePage } from './exui/createCase.po';
import { Page } from '@playwright/test';
import { TaskListPage } from './exui/taskList.po';
import { SearchCasePage } from './exui/searchCase.po.ts';
import { GlobalSearchPage } from './exui/globalSearch.po.ts';
import { FindCasePage } from './exui/findCase.po.ts';

export interface PageFixtures {
  determinePage: Page;
  caseDetailsPage: CaseDetailsPage;
  caseListPage: CaseListPage;
  taskListPage: TaskListPage;
  createCasePage: CreateCasePage;
  searchCasePage: SearchCasePage;
  globalSearchPage: GlobalSearchPage;
  findCasePage: FindCasePage;
  mediaViewerPage: ExuiMediaViewerPage;
  idamPage: IdamPage;
  apiClient: ApiClient;
  logger: ReturnType<typeof createLogger>;
  capturedCalls: ApiLogEntry[];
}

/* Instantiates pages and provides page to the test via use()
 * can also contain steps before or after providing the page.
 * This is the same behaviour as a beforeEach/afterEach hook
 */
export const pageFixtures = {
  // If a performance test is executed, use the lighthouse created page instead
  determinePage: async ({ page, lighthousePage }, use, testInfo) => {
    if (testInfo.tags.includes('@performance')) {
      await use(lighthousePage);
    } else {
      await use(page);
    }
  },
  caseDetailsPage: async ({ determinePage }, use) => {
    await use(new CaseDetailsPage(determinePage));
  },
  caseListPage: async ({ determinePage }, use) => {
    await use(new CaseListPage(determinePage));
  },
  taskListPage: async ({ determinePage }, use) => {
    await use(new TaskListPage(determinePage));
  },
  createCasePage: async ({ determinePage }, use) => {
    await use(new CreateCasePage(determinePage));
  },
  searchCasePage: async ({ determinePage }, use) => {
    await use(new SearchCasePage(determinePage));
  },
  globalSearchPage: async ({ determinePage }, use) => {
    await use(new GlobalSearchPage(determinePage));
  },
  findCasePage: async ({ determinePage }, use) => {
    await use(new FindCasePage(determinePage));
  },
  mediaViewerPage: async ({ determinePage }, use) => {
    await use(new ExuiMediaViewerPage(determinePage));
  },
  idamPage: async ({ determinePage }, use) => {
    await use(new IdamPage(determinePage));
  },
  logger: async ({}, use, workerInfo) => {
    const logger = createLogger({
      serviceName: 'case-service-ui',
      defaultMeta: { workerId: workerInfo.workerIndex },
    });
    await use(logger);
  },
  capturedCalls: async ({}, use) => {
    const calls: ApiLogEntry[] = [];
    await use(calls);
  },
  apiClient: async ({ logger, capturedCalls }, use, testInfo) => {
    const client = new ApiClient({
      baseUrl: process.env.BACKEND_BASE_URL,
      logger,
      onResponse: (entry) => capturedCalls.push(entry),
      captureRawBodies: process.env.PLAYWRIGHT_DEBUG_API === '1',
    });

    await use(client);
    await client.dispose();

    if (capturedCalls.length) {
      await testInfo.attach('api-calls.json', {
        body: JSON.stringify(capturedCalls, null, 2),
        contentType: 'application/json',
      });
    }
  },
};

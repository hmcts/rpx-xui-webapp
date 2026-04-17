import { ApiClient, createLogger, ExuiMediaViewerPage, IdamPage, type ApiLogEntry } from '@hmcts/playwright-common';
import { BookingPage } from './exui/booking.po';
import { CaseDetailsPage } from './exui/caseDetails.po';
import { CaseListPage } from './exui/caseList.po';
import { CreateCasePage } from './exui/createCase.po';
import { Page } from '@playwright/test';
import { TaskListPage } from './exui/taskList.po';
import { SearchCasePage } from './exui/searchCase.po';
import { GlobalSearchPage } from './exui/globalSearch.po';
import { FindCasePage } from './exui/findCase.po';
import { HearingsTabPage } from './exui/hearingsTab.po';
import { HearingViewEditSummaryPage } from './exui/hearingViewEditSummary.po';
import { HearingViewSummaryPage } from './exui/hearingViewSummary.po';
import { CaseFileViewPage } from './exui/caseFileView.po';
import { AccessRequestPage } from './exui/accessRequest.po';

export interface PageFixtures {
  bookingPage: BookingPage;
  determinePage: Page;
  caseDetailsPage: CaseDetailsPage;
  caseListPage: CaseListPage;
  taskListPage: TaskListPage;
  createCasePage: CreateCasePage;
  searchCasePage: SearchCasePage;
  globalSearchPage: GlobalSearchPage;
  findCasePage: FindCasePage;
  hearingsTabPage: HearingsTabPage;
  hearingViewEditSummaryPage: HearingViewEditSummaryPage;
  hearingViewSummaryPage: HearingViewSummaryPage;
  caseFileViewPage: CaseFileViewPage;
  accessRequestPage: AccessRequestPage;
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
  bookingPage: async ({ determinePage }, use) => {
    await use(new BookingPage(determinePage));
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
  hearingsTabPage: async ({ determinePage }, use) => {
    await use(new HearingsTabPage(determinePage));
  },
  hearingViewEditSummaryPage: async ({ determinePage }, use) => {
    await use(new HearingViewEditSummaryPage(determinePage));
  },
  hearingViewSummaryPage: async ({ determinePage }, use) => {
    await use(new HearingViewSummaryPage(determinePage));
  },
  caseFileViewPage: async ({ determinePage }, use) => {
    await use(new CaseFileViewPage(determinePage));
  },
  accessRequestPage: async ({ determinePage }, use) => {
    await use(new AccessRequestPage(determinePage));
  },
  mediaViewerPage: async ({ determinePage }, use) => {
    await use(new ExuiMediaViewerPage(determinePage));
  },
  idamPage: async ({ determinePage }, use) => {
    await use(new IdamPage(determinePage));
  },
  logger: async ({ page }, use, workerInfo) => {
    if (page) {
      // no-op: keep the destructured arg in use to satisfy lint rules
    }
    const logger = createLogger({
      serviceName: 'case-service-ui',
      defaultMeta: { workerId: workerInfo.workerIndex },
    });
    await use(logger);
  },
  capturedCalls: async ({ page }, use) => {
    if (page) {
      // no-op: keep the destructured arg in use to satisfy lint rules
    }
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

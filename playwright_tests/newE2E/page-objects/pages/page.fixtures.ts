import { ExuiMediaViewerPage, IdamPage } from "@hmcts/playwright-common";
import { Page } from "@playwright/test";
import { ExuiCaseDetailsPage } from "./exui/exui-case-details.po";
import { ExuiCaseListPage } from "./exui/exui-case-list.po";

export interface PageFixtures {
  determinePage: Page;
  exuiCaseDetailsPage: ExuiCaseDetailsPage;
  exuiCaseListPage: ExuiCaseListPage;
  exuiMediaViewerPage: ExuiMediaViewerPage;
  idamPage: IdamPage;
}

/* Instantiates pages and provides page to the test via use()
 * can also contain steps before or after providing the page
 * this is the same behaviour as a beforeEach/afterEach hook
 */
export const pageFixtures = {
  // If a performance test is executed, use the lighthouse created page instead
  determinePage: async ({ page, lighthousePage }, use, testInfo) => {
    if (testInfo.tags.includes("@performance")) {
      await use(lighthousePage);
    } else {
      await use(page);
    }
  },
  exuiCaseDetailsPage: async ({ determinePage }, use) => {
    await use(new ExuiCaseDetailsPage(determinePage));
  },
  exuiCaseListPage: async ({ determinePage }, use) => {
    const exuiCaseListPage = new ExuiCaseListPage(determinePage);
    await exuiCaseListPage.goto();
    await use(exuiCaseListPage);
  },
  exuiMediaViewerPage: async ({ determinePage }, use) => {
    await use(new ExuiMediaViewerPage(determinePage));
  },
  idamPage: async ({ determinePage }, use) => {
    await use(new IdamPage(determinePage));
  },
};

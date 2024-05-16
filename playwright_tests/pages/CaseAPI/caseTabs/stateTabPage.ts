import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import stateTabContent from "../../../fixtures/content/CaseAPI/caseTabs/stateTab_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";

type StateTabPage = {
  caseStateTab: string;
  checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
  ): Promise<void>;
  changeToStateTab(page: Page): Promise<void>;
  checkStateTab(page: Page, state: string): Promise<void>;
};

const stateTabPage: StateTabPage = {
  caseStateTab: ".mat-tab-label",

  async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
  ): Promise<void> {
    await commonHelpers.checkAllCaseTabs(page, caseNumber);
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async changeToStateTab(page: Page): Promise<void> {
    await page.locator(this.caseStateTab).nth(2).click();
  },

  async checkStateTab(page: Page, state: string): Promise<void> {
    if (state == stateTabContent.DSSSubmittedState) {
      await expect(page.locator("markdown[class='markdown'] h4")).toHaveText(
        stateTabContent.caseState + stateTabContent.DSSSubmittedState,
      );
    } else if (state == stateTabContent.submittedState) {
      await expect(page.locator("markdown[class='markdown'] h4")).toHaveText(
        stateTabContent.caseState + stateTabContent.submittedState,
      );
    } else if (state == stateTabContent.caseManagementState) {
      await expect(page.locator("markdown[class='markdown'] h4")).toHaveText(
        stateTabContent.caseState + stateTabContent.caseManagementState,
      );
    }
  },
};

export default stateTabPage;

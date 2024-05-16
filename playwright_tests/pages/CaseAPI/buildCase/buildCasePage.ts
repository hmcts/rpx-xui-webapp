import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import buildCase_content from "../../../fixtures/content/CaseAPI/buildCase/buildCase_content.ts";
import subjectDetailsContent from "../../../fixtures/content/DSSCreateCase/SubjectDetails_content.ts";

type BuildCasePage = {
  checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
  ): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const builtCasePage: BuildCasePage = {
  async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
  ): Promise<void> {
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toHaveText(
        buildCase_content.pageHint,
      ),
      expect(page.locator(".govuk-heading-l")).toHaveText(
        buildCase_content.pageTitle,
      ),
      expect(page.locator("markdown > h3")).toContainText(
        subjectDetailsContent.name,
      ),
      expect(page.locator("markdown > p")).toContainText(
        buildCase_content.caseReference + caseNumber,
      ),
    ]);

    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async continueOn(page: Page): Promise<void> {
    await page.getByRole("button", { name: "Submit" }).click();
  },
};

export default builtCasePage;

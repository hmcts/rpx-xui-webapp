import { expect, Page } from "@playwright/test";
import axeTest from "../../helpers/accessibilityTestHelper";
import CaseFinderDetails from "../../fixtures/content/DSSUpdateCase/CaseFinder_content.ts";
import CommonHelpers from "../../helpers/commonHelpers.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";

type CaseFinderPage = {
  caseReferenceNumber: string;
  continueButton: string;
  backButton: string;
  checkPageLoads(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillInFields(page: Page, caseNumber: string | void): Promise<void>;
  continueOn(page: Page): Promise<void>;
  triggerErrorMessages(page: Page, cy: boolean): Promise<void>;
};

const caseFinderPage: CaseFinderPage = {
  caseReferenceNumber: "#applicantCaseId",
  continueButton: "button[name='saveAndContinue']",
  backButton: ".govuk-back-link",

  async checkPageLoads(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    switch (cy) {
      case true:
        await page.locator(".govuk-link").nth(4).click();
        await CommonHelpers.checkAndAcceptCookies(page, cy, "UC");
        await Promise.all([
          commonHelpers.feedbackBanner(page, cy, false),
          expect(page.locator(".govuk-header__service-name")).toHaveText(
            CaseFinderDetails.headerCy,
          ),
          expect(page.locator(".govuk-heading-l")).toHaveText(
            CaseFinderDetails.pageTitleCy,
          ),
          expect(page.locator(".govuk-hint").nth(0)).toContainText(
            CaseFinderDetails.hintMessageCy,
          ),
          expect(page.locator(".govuk-label")).toHaveText(
            CaseFinderDetails.subTitleCy,
          ),
          expect(page.locator(".govuk-hint").nth(1)).toHaveText(
            CaseFinderDetails.textOnPageCy1,
          ),
          expect(page.locator(this.continueButton)).toHaveText("Parhau"),
        ]);
        break;
      default:
        await CommonHelpers.checkAndAcceptCookies(page, cy, "UC");
        await Promise.all([
          commonHelpers.feedbackBanner(page, cy, false),
          expect(page.locator(".govuk-header__service-name")).toHaveText(
            CaseFinderDetails.header,
          ),
          expect(page.locator(".govuk-heading-l")).toHaveText(
            CaseFinderDetails.pageTitle,
          ),
          expect(page.locator(".govuk-hint").nth(0)).toContainText(
            CaseFinderDetails.hintMessage,
          ),
          expect(page.locator(".govuk-label")).toHaveText(
            CaseFinderDetails.subTitle,
          ),
          expect(page.locator(".govuk-hint").nth(1)).toHaveText(
            CaseFinderDetails.textOnPage1,
          ),
          expect(page.locator(this.continueButton)).toHaveText("Continue"),
        ]);
        break;
    }

    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async triggerErrorMessages(page: Page, cy: boolean) {
    switch (cy) {
      case true:
        await page.click(this.continueButton);
        await Promise.all([
          expect(page.locator(".govuk-error-summary__title")).toHaveText(
            CaseFinderDetails.errorBannerCy,
          ),
          expect(page.locator("#applicantCaseId-error")).toContainText(
            CaseFinderDetails.referenceNumberErrorCy,
          ),
        ]);
        await page.fill(this.caseReferenceNumber, "111111111111111");
        await page.click(this.continueButton);
        await expect(page.locator("#applicantCaseId-error")).toContainText(
          CaseFinderDetails.validReferenceNumberErrorCy,
        );
        await page.fill(this.caseReferenceNumber, "asdfghjkl;'-");
        await page.click(this.continueButton);
        await expect(page.locator("#applicantCaseId-error")).toContainText(
          CaseFinderDetails.characterErrorCy,
        );
        break;
      default:
        await page.click(this.continueButton);
        await Promise.all([
          expect(page.locator(".govuk-error-summary__title")).toHaveText(
            CaseFinderDetails.errorBanner,
          ),
          expect(page.locator("#applicantCaseId-error")).toContainText(
            CaseFinderDetails.referenceNumberError,
          ),
        ]);
        await page.fill(this.caseReferenceNumber, "111111111111111");
        await page.click(this.continueButton);
        await expect(page.locator("#applicantCaseId-error")).toContainText(
          CaseFinderDetails.validReferenceNumberError,
        );
        await page.fill(this.caseReferenceNumber, "asdfghjkl;'-");
        await page.click(this.continueButton);
        await expect(page.locator("#applicantCaseId-error")).toContainText(
          CaseFinderDetails.characterError,
        );
        break;
    }
  },

  async fillInFields(page: Page, caseNumber: string) {
    try {
      await page.fill(this.caseReferenceNumber, caseNumber.replace(/\D/g, ""));
    } catch (error) {
      console.error(
        "Error occurred with inputting the case reference number as it is void.",
        error,
      );
      throw error;
    }
  },

  async continueOn(page: Page): Promise<void> {
    await page.click(this.continueButton);
  },
};

export default caseFinderPage;

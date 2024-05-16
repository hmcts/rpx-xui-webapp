import { expect, Page } from "@playwright/test";
import axeTest from "../../helpers/accessibilityTestHelper.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";
import confirm_content from "../../fixtures/content/DSSUpdateCase/confirm_content.ts";

type ConfirmPage = {
  closeAndReturn: string;
  checkPageLoads(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
  ): Promise<void>;
  returnCaseNumber(page: Page, caseNumber: string): Promise<string | void>;
  closeAndReturnToCase(page: Page): Promise<string>;
};

const createCaseConfirmPage: ConfirmPage = {
  closeAndReturn: "#main-form-submit",

  async checkPageLoads(
    page: Page,
    cy: boolean,
    accessibilityTest: Boolean,
  ): Promise<void> {
    switch (cy) {
      case true:
        await Promise.all([
          expect(page.locator("h1")).toHaveText(confirm_content.pageTitleCy),
          ...Array.from({ length: 3 }, (_, index) => {
            const textOnPage = (confirm_content as any)[
              `textOnPageCy${index + 1}`
            ];
            return expect(
              page.locator(".govuk-body").nth(index + 4),
            ).toHaveText(textOnPage);
          }),
          expect(page.locator(".govuk-notification-banner__title")).toHaveText(
            confirm_content.feedbackBannerTitleCy,
          ),
          expect(
            page.locator(".govuk-notification-banner__content"),
          ).toContainText(confirm_content.feedbackBannerMessageCy),
          expect(
            page.locator(".govuk-notification-banner__content"),
          ).toContainText(confirm_content.feedbackBannerTextCy),
          expect(page.locator(".govuk-link").nth(4)).toContainText(
            confirm_content.feedbackBannerLinkCy,
          ),
        ]);
        break;
      default:
        await Promise.all([
          expect(page.locator("h1")).toHaveText(confirm_content.pageTitle),
          ...Array.from({ length: 3 }, (_, index) => {
            const textOnPage = (confirm_content as any)[
              `textOnPage${index + 1}`
            ];
            return expect(
              page.locator(".govuk-body").nth(index + 4),
            ).toHaveText(textOnPage);
          }),
          expect(page.locator(".govuk-notification-banner__title")).toHaveText(
            confirm_content.feedbackBannerTitle,
          ),
          expect(
            page.locator(".govuk-notification-banner__content"),
          ).toContainText(confirm_content.feedbackBannerMessage),
          expect(
            page.locator(".govuk-notification-banner__content"),
          ).toContainText(confirm_content.feedbackBannerText),
          expect(page.locator(".govuk-link").nth(4)).toContainText(
            confirm_content.feedbackBannerLink,
          ),
        ]);
        break;
    }
    const caseElement = await page.$$(".govuk-panel__body");
    const caseElementLength16 = await Promise.all(
      caseElement.map(async (element) => {
        const text = await page.evaluate(
          (element) => element.textContent,
          element,
        );
        if (text && text.trim().length === 16) {
          // Check if text is not null
          return element;
        }
      }),
    );

    const filteredCaseElement = caseElementLength16.filter(
      (element) => element !== null,
    );

    if (!(filteredCaseElement.length > 0)) {
      console.log("Invalid case reference.");
      process.exit(1);
    }
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async returnCaseNumber(
    page: Page,
    caseNumber: string,
  ): Promise<string | void> {
    try {
      let cicCaseData: string =
        (await page.textContent(".govuk-panel__body")) ?? "Empty";
      cicCaseData = cicCaseData.replace(/\D/g, "");
      cicCaseData = cicCaseData.replace(/(\d{4})/g, "$1-");
      cicCaseData = cicCaseData.slice(0, -1);
      expect(cicCaseData).toEqual(caseNumber);
      return cicCaseData;
    } catch (error) {
      console.error(
        "Error occurred with capturing the case number reference.",
        error,
      );
      throw error;
    }
  },

  async closeAndReturnToCase(page: Page): Promise<string> {
    await page.locator(this.closeAndReturn).click();
    return await commonHelpers.getTimestamp();
  },
};

export default createCaseConfirmPage;

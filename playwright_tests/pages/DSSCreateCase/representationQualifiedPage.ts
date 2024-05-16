import { expect, Page } from "@playwright/test";
import axeTest from "../../helpers/accessibilityTestHelper";
import representationQualifiedContent from "../../fixtures/content/DSSCreateCase/RepresentationQualified_content.ts";

type RepresentationQualifiedPage = {
  qualifiedYes: string;
  qualifiedNo: string;
  continueButton: string;
  backButton: string;
  checkPageLoads(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillInFields(page: Page, representationQualified: boolean): Promise<void>;
  triggerErrorMessages(page: Page, cy: boolean): Promise<void>;
  pressBackButton(page: Page): Promise<void>;
};

const representationQualifiedPage: RepresentationQualifiedPage = {
  qualifiedYes: "#representationQualified",
  qualifiedNo: "#representationQualified-2",
  continueButton: "#main-form-submit",
  backButton: ".govuk-back-link",

  async checkPageLoads(page: Page, cy: boolean, accessibilityTest: boolean) {
    switch (cy) {
      case true:
        await Promise.all([
          expect(page.locator(".govuk-heading-l")).toHaveText(
            representationQualifiedContent.pageTitleCy,
          ),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (representationQualifiedContent as any)[
              `textOnPageCy${index + 1}`
            ];
            return expect(
              page.locator(".govuk-radios__label").nth(index),
            ).toHaveText(textOnPage);
          }),
          expect(page.locator(".govuk-hint")).toHaveText(
            representationQualifiedContent.hintMessageCy,
          ),
        ]);
        break;
      default:
        await Promise.all([
          expect(page.locator(".govuk-heading-l")).toHaveText(
            representationQualifiedContent.pageTitle,
          ),
          expect(page.locator(".govuk-hint")).toHaveText(
            representationQualifiedContent.hintMessage,
          ),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (representationQualifiedContent as any)[
              `textOnPage${index + 1}`
            ];
            return expect(
              page.locator(".govuk-radios__label").nth(index),
            ).toHaveText(textOnPage);
          }),
        ]);
        break;
    }
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillInFields(page: Page, representationQualified: boolean) {
    if (representationQualified) {
      await page.click(this.qualifiedYes);
    } else {
      await page.click(this.qualifiedNo);
    }
    await page.click(this.continueButton);
  },

  async triggerErrorMessages(page: Page, cy: boolean) {
    switch (cy) {
      case true:
        await page.click(this.continueButton);
        await Promise.all([
          expect(page.locator(".govuk-error-summary__title")).toHaveText(
            representationQualifiedContent.errorBannerCy,
          ),
          expect(page.locator("[href='#representationQualified']")).toHaveText(
            representationQualifiedContent.selectionErrorCy,
          ),
          expect(page.locator("#representationQualified-error")).toContainText(
            representationQualifiedContent.selectionErrorCy,
          ),
        ]);
        break;
      default:
        await Promise.all([
          page.click(this.continueButton),
          expect(page.locator(".govuk-error-summary__title")).toHaveText(
            representationQualifiedContent.errorBanner,
          ),
          expect(page.locator("[href='#representationQualified']")).toHaveText(
            representationQualifiedContent.selectionError,
          ),
          expect(page.locator("#representationQualified-error")).toContainText(
            representationQualifiedContent.selectionError,
          ),
        ]);
        break;
    }
  },

  async pressBackButton(page: Page) {
    await page.click(this.backButton);
  },
};

export default representationQualifiedPage;

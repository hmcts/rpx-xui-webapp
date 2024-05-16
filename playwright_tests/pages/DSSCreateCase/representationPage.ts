import { expect, Page } from "@playwright/test";
import axeTest from "../../helpers/accessibilityTestHelper";
import representationContent from "../../fixtures/content/DSSCreateCase/Representation_content.ts";

type RepresentationPage = {
  representationYes: string;
  representationNo: string;
  continueButton: string;
  backButton: string;
  checkPageLoads(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillInFields(page: Page, representationPresent: boolean): Promise<void>;
  triggerErrorMessages(page: Page, cy: boolean): Promise<void>;
  pressBackButton(page: Page): Promise<void>;
};

const representationPage: RepresentationPage = {
  representationYes: "#representation",
  representationNo: "#representation-2",
  continueButton: "#main-form-submit",
  backButton: ".govuk-back-link",

  async checkPageLoads(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    switch (cy) {
      case true:
        await Promise.all([
          expect(page.locator(".govuk-heading-l")).toHaveText(
            representationContent.pageTitleCy,
          ),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (representationContent as any)[
              `textOnPageCy${index + 1}`
            ];
            return expect(page.locator(".govuk-label").nth(index)).toHaveText(
              textOnPage,
            );
          }),
        ]);
        break;
      default:
        await Promise.all([
          expect(page.locator(".govuk-heading-l")).toHaveText(
            representationContent.pageTitle,
          ),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (representationContent as any)[
              `textOnPage${index + 1}`
            ];
            return expect(page.locator(".govuk-label").nth(index)).toHaveText(
              textOnPage,
            );
          }),
        ]);
        break;
    }
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillInFields(
    page: Page,
    representationPresent: boolean,
  ): Promise<void> {
    if (representationPresent) {
      await page.click(this.representationYes);
    } else {
      await page.click(this.representationNo);
    }
    await page.click(this.continueButton);
  },

  async triggerErrorMessages(page: Page, cy: boolean) {
    switch (cy) {
      case true:
        await page.click(this.continueButton);
        await Promise.all([
          expect(page.locator(".govuk-error-summary__title")).toHaveText(
            representationContent.errorBannerCy,
          ),
          expect(page.locator("[href='#representation']")).toHaveText(
            representationContent.selectionErrorCy,
          ),
          expect(page.locator("#representation-error")).toContainText(
            representationContent.selectionErrorCy,
          ),
        ]);
        break;
      default:
        await page.click(this.continueButton);
        await Promise.all([
          expect(page.locator(".govuk-error-summary__title")).toHaveText(
            representationContent.errorBanner,
          ),
          expect(page.locator("[href='#representation']")).toHaveText(
            representationContent.selectionError,
          ),
          expect(page.locator("#representation-error")).toContainText(
            representationContent.selectionError,
          ),
        ]);
        break;
    }
  },

  async pressBackButton(page: Page): Promise<void> {
    await page.click(this.backButton);
  },
};

export default representationPage;

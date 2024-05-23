import { expect, Page } from "@playwright/test";
import axeTest from "../../helpers/accessibilityTestHelper";
import SubjectDetailsContent from "../../fixtures/content/DSSUpdateCase/SubjectDetails_content.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";

type SubjectDetailsPage = {
  fields: {
    fullName: string;
    dayOfBirth: string;
    monthOfBirth: string;
    yearOfBirth: string;
  };
  continueButton: string;
  backButton: string;
  checkPageLoads(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
  ): Promise<void>;
  fillInFields(page: Page): Promise<void>;
  continueOn(page: Page): Promise<void>;
  triggerErrorMessages(page: Page, cy: boolean): Promise<void>;
  pressBackButton(page: Page): Promise<void>;
};

const subjectDetailsPage: SubjectDetailsPage = {
  fields: {
    fullName: "#subjectFullName",
    dayOfBirth: "#subjectDOB-day",
    monthOfBirth: "#subjectDOB-month",
    yearOfBirth: "#subjectDOB-year",
  },
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
          commonHelpers.feedbackBanner(page, cy, false),
          expect(page.locator(".govuk-header__service-name")).toHaveText(
            SubjectDetailsContent.headerCy,
          ),
          expect(page.locator(".govuk-heading-l")).toHaveText(
            SubjectDetailsContent.pageTitleCy,
          ),
          expect(page.locator(".govuk-label").nth(0)).toHaveText(
            SubjectDetailsContent.subHeadingCy1,
          ),
          expect(page.locator(".govuk-fieldset__legend")).toHaveText(
            SubjectDetailsContent.subHeadingCy2,
          ),
          expect(page.locator(".govuk-hint").nth(0)).toHaveText(
            SubjectDetailsContent.nameHintCy,
          ),
          expect(page.locator(".govuk-hint").nth(1)).toHaveText(
            SubjectDetailsContent.DOBHintCy,
          ),
          ...Array.from({ length: 3 }, (_, index) => {
            const textOnPage = (SubjectDetailsContent as any)[
              `textOnPageCy${index + 1}`
            ];
            return expect(
              page.locator(".govuk-label").nth(index + 1),
            ).toHaveText(textOnPage);
          }),
        ]);
        await expect(page.locator(this.continueButton)).toHaveText("Parhau");
        break;
      default:
        await Promise.all([
          commonHelpers.feedbackBanner(page, cy, false),
          expect(page.locator(".govuk-header__service-name")).toHaveText(
            SubjectDetailsContent.header,
          ),
          expect(page.locator(".govuk-heading-l")).toHaveText(
            SubjectDetailsContent.pageTitle,
          ),
          expect(page.locator(".govuk-label").nth(0)).toHaveText(
            SubjectDetailsContent.subHeading1,
          ),
          expect(page.locator(".govuk-fieldset__legend")).toHaveText(
            SubjectDetailsContent.subHeading2,
          ),
          expect(page.locator(".govuk-hint").nth(0)).toHaveText(
            SubjectDetailsContent.nameHint,
          ),
          expect(page.locator(".govuk-hint").nth(1)).toHaveText(
            SubjectDetailsContent.DOBHint,
          ),
          ...Array.from({ length: 3 }, (_, index) => {
            const textOnPage = (SubjectDetailsContent as any)[
              `textOnPage${index + 1}`
            ];
            return expect(
              page.locator(".govuk-label").nth(index + 1),
            ).toHaveText(textOnPage);
          }),
        ]);
        await expect(page.locator(this.continueButton)).toHaveText("Continue");
        break;
    }

    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillInFields(page: Page): Promise<void> {
    await page.fill(this.fields.fullName, SubjectDetailsContent.name);
    await page.fill(this.fields.dayOfBirth, SubjectDetailsContent.dayOfBirth);
    await page.fill(
      this.fields.monthOfBirth,
      SubjectDetailsContent.monthOfBirth,
    );
    await page.fill(this.fields.yearOfBirth, SubjectDetailsContent.yearOfBirth);
  },

  async triggerErrorMessages(page: Page, cy: boolean): Promise<void> {
    switch (cy) {
      case true:
        await page.click(this.continueButton);
        await Promise.all([
          expect(page.locator(".govuk-error-summary__title")).toHaveText(
            SubjectDetailsContent.errorBannerCy,
          ),
          expect(page.locator("#subjectFullName-error")).toContainText(
            SubjectDetailsContent.fullNameErrorCy,
          ),
          expect(page.locator("#subjectDOB-error")).toContainText(
            SubjectDetailsContent.dateOfBirthErrorCy,
          ),
        ]);
        await page.fill(this.fields.fullName, "!@£$%^&*()");
        await page.fill(this.fields.dayOfBirth, "90");
        await page.fill(this.fields.monthOfBirth, "90");
        await page.fill(this.fields.yearOfBirth, "2000");
        await page.click(this.continueButton);
        await Promise.all([
          expect(page.locator("#subjectFullName-error")).toContainText(
            SubjectDetailsContent.validFullNameErrorCy,
          ),
          expect(page.locator("#subjectDOB-error")).toContainText(
            SubjectDetailsContent.validDateOfBirthErrorCy,
          ),
        ]);
        break;
      default:
        await page.click(this.continueButton);
        await Promise.all([
          expect(page.locator(".govuk-error-summary__title")).toHaveText(
            SubjectDetailsContent.errorBanner,
          ),
          expect(page.locator("#subjectFullName-error")).toContainText(
            SubjectDetailsContent.fullNameError,
          ),
          expect(page.locator("#subjectDOB-error")).toContainText(
            SubjectDetailsContent.dateOfBirthError,
          ),
        ]);
        await page.fill(this.fields.fullName, "!@£$%^&*()");
        await page.fill(this.fields.dayOfBirth, "90");
        await page.fill(this.fields.monthOfBirth, "90");
        await page.fill(this.fields.yearOfBirth, "2000");
        await page.click(this.continueButton);
        await Promise.all([
          expect(page.locator("#subjectFullName-error")).toContainText(
            SubjectDetailsContent.validFullNameError,
          ),
          expect(page.locator("#subjectDOB-error")).toContainText(
            SubjectDetailsContent.validDateOfBirthError,
          ),
        ]);
        break;
    }
  },

  async continueOn(page: Page): Promise<void> {
    await page.click(this.continueButton);
  },

  async pressBackButton(page: Page): Promise<void> {
    await page.click(this.backButton);
  },
};

export default subjectDetailsPage;

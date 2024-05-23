import { expect, Page } from "@playwright/test";
import path from "path";
import config from "../../config.ts";
import axeTest from "../../helpers/accessibilityTestHelper";
import uploadSupportingDocumentsContent from "../../fixtures/content/DSSCreateCase/UploadSupportingDocuments_content.ts";

type UploadSupportingDocumentsPage = {
  fields: {
    dropDown: string;
    uploadFileButton: string;
    fileUploadedOption: string;
  };
  continueButton: string;
  backButton: string;

  checkPageLoads(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
  ): Promise<void>;
  uploadDocumentsSection(
    page: Page,
    cy: boolean,
    multipleDocuments: boolean,
  ): Promise<void>;
  triggerErrorMessages(page: Page, cy: boolean): Promise<void>;
  pressBackButton(page: Page): Promise<void>;
};

const uploadSupportingDocumentsPage: UploadSupportingDocumentsPage = {
  fields: {
    dropDown: ".govuk-details__summary-text",
    uploadFileButton: "#file-upload-1",
    fileUploadedOption: 'button[type="upload document"]',
  },

  continueButton: "#main-form-submit",
  backButton: ".govuk-back-link",

  async checkPageLoads(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.click(this.fields.dropDown);
    switch (cy) {
      case true:
        await Promise.all([
          expect(page.locator(".govuk-heading-l")).toHaveText(
            uploadSupportingDocumentsContent.pageTitleCy,
          ),
          expect(page.locator(".govuk-body").nth(4)).toHaveText(
            uploadSupportingDocumentsContent.textOnPageCy1,
          ),
          expect(page.locator(".govuk-details__summary-text")).toHaveText(
            uploadSupportingDocumentsContent.dropdownLinkCy,
          ),
          ...Array.from({ length: 3 }, (_, index) => {
            const textOnPage = (uploadSupportingDocumentsContent as any)[
              `textOnPageCy${index + 2}`
            ];
            return expect(
              page.locator(
                `details[class='govuk-details'] li:nth-child(${index + 1})`,
              ),
            ).toHaveText(textOnPage);
          }),
          expect(page.locator(".govuk-details__text")).toContainText(
            uploadSupportingDocumentsContent.textOnPageCy5,
          ),
          expect(page.locator(".govuk-label").nth(0)).toHaveText(
            uploadSupportingDocumentsContent.textOnPageCy6,
          ),
          expect(
            page.locator("form[class='formRow'] p[class='govuk-body']"),
          ).toHaveText(uploadSupportingDocumentsContent.textOnPageCy7),
        ]);
        break;
      default:
        await Promise.all([
          expect(page.locator(".govuk-heading-l")).toHaveText(
            uploadSupportingDocumentsContent.pageTitle,
          ),
          expect(page.locator(".govuk-body").nth(4)).toHaveText(
            uploadSupportingDocumentsContent.textOnPage1,
          ),
          expect(page.locator(".govuk-details__summary-text")).toHaveText(
            uploadSupportingDocumentsContent.dropdownLink,
          ),
          ...Array.from({ length: 3 }, (_, index) => {
            const textOnPage = (uploadSupportingDocumentsContent as any)[
              `textOnPage${index + 2}`
            ];
            return expect(
              page.locator(
                `details[class='govuk-details'] li:nth-child(${index + 1})`,
              ),
            ).toHaveText(textOnPage);
          }),
          expect(page.locator(".govuk-details__text")).toContainText(
            uploadSupportingDocumentsContent.textOnPage5,
          ),
          expect(page.locator(".govuk-label").nth(0)).toHaveText(
            uploadSupportingDocumentsContent.textOnPage6,
          ),
          expect(
            page.locator("form[class='formRow'] p[class='govuk-body']"),
          ).toHaveText(uploadSupportingDocumentsContent.textOnPage7),
        ]);
        break;
    }
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async uploadDocumentsSection(
    page: Page,
    cy: boolean,
    multipleDocuments: boolean,
  ): Promise<void> {
    await page
      .locator(this.fields.uploadFileButton)
      .setInputFiles(config.testFile);
    await page.click(this.fields.fileUploadedOption);
    await expect(page.locator(".uploadedFile").first()).toContainText(
      path.basename(config.testFile),
    );
    if (cy) {
      await expect(
        page.locator(
          "main[id='main-content'] li:nth-child(1).govuk-\\!-padding-top-2.govuk-\\!-padding-bottom-3.govuk-section-break.govuk-section-break--visible",
        ),
      ).toContainText(uploadSupportingDocumentsContent.deleteButtonCy);
    } else {
      await expect(
        page.locator(
          "main[id='main-content'] li:nth-child(1).govuk-\\!-padding-top-2.govuk-\\!-padding-bottom-3.govuk-section-break.govuk-section-break--visible",
        ),
      ).toContainText(uploadSupportingDocumentsContent.deleteButton);
    }
    switch (multipleDocuments) {
      case false:
        await page.click(this.continueButton);
        break;
      case true:
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testFile);
        await page.click(this.fields.fileUploadedOption);
        await Promise.all([
          expect(page.locator(".uploadedFile").nth(1)).toContainText(
            path.basename(config.testFile),
          ),
          expect(page.locator(".uploadedFile").nth(1)).toContainText(
            uploadSupportingDocumentsContent.deleteButton,
          ),
        ]);
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testFile);
        await page.click(this.fields.fileUploadedOption);
        await Promise.all([
          expect(page.locator(".uploadedFile").nth(2)).toContainText(
            path.basename(config.testFile),
          ),
          expect(page.locator(".uploadedFile").nth(2)).toContainText(
            uploadSupportingDocumentsContent.deleteButton,
          ),
        ]);
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testFile);
        await page.click(this.fields.fileUploadedOption);
        await Promise.all([
          expect(page.locator(".uploadedFile").nth(3)).toContainText(
            path.basename(config.testFile),
          ),
          expect(page.locator(".uploadedFile").nth(3)).toContainText(
            uploadSupportingDocumentsContent.deleteButton,
          ),
        ]);
        await page.click(this.continueButton);
        break;
    }
  },

  async triggerErrorMessages(page: Page, cy: boolean): Promise<void> {
    await page.click(this.continueButton);
    switch (cy) {
      case true:
        await Promise.all([
          expect(page.locator(".govuk-error-summary__title")).toHaveText(
            uploadSupportingDocumentsContent.errorBannerCy,
          ),
          expect(page.locator("[href='#file-upload-1']")).toHaveText(
            uploadSupportingDocumentsContent.noUploadErrorCy,
          ),
        ]);
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testOdtFile);
        await page.click(this.fields.fileUploadedOption);
        await Promise.all([
          expect(page.locator(".govuk-error-summary__title")).toHaveText(
            uploadSupportingDocumentsContent.errorBannerCy,
          ),
          expect(page.locator("[href='#file-upload-1']")).toHaveText(
            uploadSupportingDocumentsContent.fileTypeErrorCy,
          ),
        ]);
        break;
      default:
        await Promise.all([
          expect(page.locator(".govuk-error-summary__title")).toHaveText(
            uploadSupportingDocumentsContent.errorBanner,
          ),
          expect(page.locator("[href='#file-upload-1']")).toHaveText(
            uploadSupportingDocumentsContent.noUploadError,
          ),
        ]);
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testOdtFile);
        await page.click(this.fields.fileUploadedOption);
        await Promise.all([
          expect(page.locator(".govuk-error-summary__title")).toHaveText(
            uploadSupportingDocumentsContent.errorBanner,
          ),
          expect(page.locator("[href='#file-upload-1']")).toHaveText(
            uploadSupportingDocumentsContent.fileTypeError,
          ),
        ]);
        break;
    }
  },

  async pressBackButton(page: Page): Promise<void> {
    await page.click(this.backButton);
  },
};

export default uploadSupportingDocumentsPage;

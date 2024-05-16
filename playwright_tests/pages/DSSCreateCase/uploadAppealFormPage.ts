import { expect, Page } from "@playwright/test";
import path from "path";
import config from "../../config.ts";
import axeTest from "../../helpers/accessibilityTestHelper";
import uploadAppealFormContent from "../../fixtures/content/DSSCreateCase/UploadAppealForm_content.ts";

type UploadAppealFormPage = {
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

const uploadAppealFormPage: UploadAppealFormPage = {
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
            uploadAppealFormContent.pageTitleCy,
          ),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (uploadAppealFormContent as any)[
              `textOnPageCy${index + 1}`
            ];
            return expect(
              page.locator(".govuk-body").nth(index + 4),
            ).toHaveText(textOnPage);
          }),
          expect(page.locator(".govuk-details__summary-text")).toHaveText(
            uploadAppealFormContent.dropdownLinkCy,
          ),
          ...Array.from({ length: 3 }, (_, index) => {
            const textOnPage = (uploadAppealFormContent as any)[
              `textOnPageCy${index + 3}`
            ];
            return expect(
              page.locator(
                `details[class='govuk-details'] li:nth-child(${index + 1})`,
              ),
            ).toHaveText(textOnPage);
          }),
          expect(page.locator(".govuk-details__text")).toContainText(
            uploadAppealFormContent.textOnPageCy6,
          ),
          expect(page.locator(".govuk-label").nth(0)).toHaveText(
            uploadAppealFormContent.textOnPageCy7,
          ),
          expect(
            page.locator("form[class='formRow'] p[class='govuk-body']"),
          ).toHaveText(uploadAppealFormContent.textOnPageCy8),
        ]);
        break;
      default:
        await Promise.all([
          expect(page.locator(".govuk-heading-l")).toHaveText(
            uploadAppealFormContent.pageTitle,
          ),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (uploadAppealFormContent as any)[
              `textOnPage${index + 1}`
            ];
            return expect(
              page.locator(".govuk-body").nth(index + 4),
            ).toHaveText(textOnPage);
          }),
          expect(page.locator(".govuk-details__summary-text")).toHaveText(
            uploadAppealFormContent.dropdownLink,
          ),
          ...Array.from({ length: 3 }, (_, index) => {
            const textOnPage = (uploadAppealFormContent as any)[
              `textOnPage${index + 3}`
            ];
            return expect(
              page.locator(
                `details[class='govuk-details'] li:nth-child(${index + 1})`,
              ),
            ).toHaveText(textOnPage);
          }),
          expect(page.locator(".govuk-details__text")).toContainText(
            uploadAppealFormContent.textOnPage6,
          ),
          expect(page.locator(".govuk-label").nth(0)).toHaveText(
            uploadAppealFormContent.textOnPage7,
          ),
          expect(
            page.locator("form[class='formRow'] p[class='govuk-body']"),
          ).toHaveText(uploadAppealFormContent.textOnPage8),
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
      .setInputFiles(config.testPdfFile);
    await page.click(this.fields.fileUploadedOption);
    await expect(page.locator(".uploadedFile").first()).toContainText(
      path.basename(config.testPdfFile),
    );
    if (cy) {
      await expect(
        page.locator(
          "main[id='main-content'] li:nth-child(1).govuk-\\!-padding-top-2.govuk-\\!-padding-bottom-3.govuk-section-break.govuk-section-break--visible",
        ),
      ).toContainText(uploadAppealFormContent.deleteButtonCy);
    } else {
      await expect(
        page.locator(
          "main[id='main-content'] li:nth-child(1).govuk-\\!-padding-top-2.govuk-\\!-padding-bottom-3.govuk-section-break.govuk-section-break--visible",
        ),
      ).toContainText(uploadAppealFormContent.deleteButton);
    }
    switch (multipleDocuments) {
      case false:
        await page.click(this.continueButton);
        break;
      case true:
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testPdfFile);
        await page.click(this.fields.fileUploadedOption);
        await expect(page.locator(".uploadedFile").nth(1)).toContainText(
          path.basename(config.testPdfFile),
        );
        await expect(page.locator(".uploadedFile").nth(1)).toContainText(
          uploadAppealFormContent.deleteButton,
        );
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testPdfFile);
        await page.click(this.fields.fileUploadedOption);
        await expect(page.locator(".uploadedFile").nth(2)).toContainText(
          path.basename(config.testPdfFile),
        );
        await expect(page.locator(".uploadedFile").nth(2)).toContainText(
          uploadAppealFormContent.deleteButton,
        );
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testPdfFile);
        await page.click(this.fields.fileUploadedOption);
        await expect(page.locator(".uploadedFile").nth(3)).toContainText(
          path.basename(config.testPdfFile),
        );
        await expect(page.locator(".uploadedFile").nth(3)).toContainText(
          uploadAppealFormContent.deleteButton,
        );
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
            uploadAppealFormContent.errorBannerCy,
          ),
          expect(page.locator("[href='#file-upload-1']")).toHaveText(
            uploadAppealFormContent.noUploadErrorCy,
          ),
        ]);
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testOdtFile);
        await page.click(this.fields.fileUploadedOption);
        await Promise.all([
          expect(page.locator(".govuk-error-summary__title")).toHaveText(
            uploadAppealFormContent.errorBannerCy,
          ),
          expect(page.locator("[href='#file-upload-1']")).toHaveText(
            uploadAppealFormContent.fileTypeErrorCy,
          ),
        ]);
        break;
      default:
        await Promise.all([
          expect(page.locator(".govuk-error-summary__title")).toHaveText(
            uploadAppealFormContent.errorBanner,
          ),
          expect(page.locator("[href='#file-upload-1']")).toHaveText(
            uploadAppealFormContent.noUploadError,
          ),
        ]);
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testOdtFile);
        await page.click(this.fields.fileUploadedOption);
        await Promise.all([
          expect(page.locator(".govuk-error-summary__title")).toHaveText(
            uploadAppealFormContent.errorBanner,
          ),
          expect(page.locator("[href='#file-upload-1']")).toHaveText(
            uploadAppealFormContent.fileTypeError,
          ),
        ]);
        break;
    }
  },

  async pressBackButton(page: Page): Promise<void> {
    await page.click(this.backButton);
  },
};

export default uploadAppealFormPage;

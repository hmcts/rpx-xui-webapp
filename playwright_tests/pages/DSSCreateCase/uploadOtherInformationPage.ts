import { expect, Page } from "@playwright/test";
import path from "path";
import config from "../../config.ts";
import axeTest from "../../helpers/accessibilityTestHelper";
import uploadOtherInformationContent from "../../fixtures/content/DSSCreateCase/UploadOtherInformation_content.ts";

type UploadOtherInformationPage = {
  fields: {
    dropDown: string;
    uploadFileButton: string;
    fileUploadedOption: string;
    documentRelevance: string;
    additionalInfo: string;
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
    uploadInformation: boolean,
    multipleDocuments: boolean,
  ): Promise<void>;
  triggerErrorMessages(page: Page, cy: boolean): Promise<void>;
  pressBackButton(page: Page): Promise<void>;
};

const uploadOtherInformationPage: UploadOtherInformationPage = {
  fields: {
    dropDown: ".govuk-details__summary-text",
    uploadFileButton: "#file-upload-1",
    fileUploadedOption: 'button[type="upload document"]',
    documentRelevance: "#documentRelevance",
    additionalInfo: "#additionalInformation",
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
            uploadOtherInformationContent.pageTitleCy,
          ),
          expect(page.locator(".govuk-heading-m").nth(1)).toHaveText(
            uploadOtherInformationContent.subTitleCy1,
          ),
          ...Array.from({ length: 3 }, (_, index) => {
            const textOnPage = (uploadOtherInformationContent as any)[
              `textOnPageCy${index + 1}`
            ];
            return expect(
              page.locator(".govuk-body").nth(index + 4),
            ).toHaveText(textOnPage);
          }),
          ...Array.from({ length: 4 }, (_, index) => {
            const textOnPage = (uploadOtherInformationContent as any)[
              `textOnPageCy${index + 4}`
            ];
            return expect(
              page.locator(
                `div[class='govuk-body-m'] li:nth-child(${index + 1})`,
              ),
            ).toHaveText(textOnPage);
          }),
          expect(page.locator(".govuk-body").nth(7)).toHaveText(
            uploadOtherInformationContent.textOnPageCy8,
          ),
          expect(page.locator(".govuk-details__summary-text")).toHaveText(
            uploadOtherInformationContent.dropdownLinkCy,
          ),
          ...Array.from({ length: 4 }, (_, index) => {
            const textOnPage = (uploadOtherInformationContent as any)[
              `textOnPageCy${index + 9}`
            ];
            return expect(
              page.locator(
                `details[class='govuk-details'] li:nth-child(${index + 1})`,
              ),
            ).toHaveText(textOnPage);
          }),
          expect(page.locator(".govuk-details__text")).toContainText(
            uploadOtherInformationContent.textOnPageCy13,
          ),
          expect(page.locator(".govuk-label").nth(0)).toHaveText(
            uploadOtherInformationContent.textOnPageCy14,
          ),
          expect(
            page.locator("form[class='formRow'] p[class='govuk-body']"),
          ).toHaveText(uploadOtherInformationContent.textOnPageCy15),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (uploadOtherInformationContent as any)[
              `subTitleCy${index + 2}`
            ];
            return expect(
              page.locator(".govuk-label").nth(index + 1),
            ).toHaveText(textOnPage);
          }),
          expect(page.locator("#documentRelevance-hint")).toHaveText(
            uploadOtherInformationContent.textOnPageCy16,
          ),
          expect(page.locator("#additionalInformation-hint")).toHaveText(
            uploadOtherInformationContent.textOnPageCy17,
          ),
        ]);
        break;
      default:
        await Promise.all([
          expect(page.locator(".govuk-heading-l")).toHaveText(
            uploadOtherInformationContent.pageTitle,
          ),
          expect(page.locator(".govuk-heading-m").nth(1)).toHaveText(
            uploadOtherInformationContent.subTitle1,
          ),
          ...Array.from({ length: 3 }, (_, index) => {
            const textOnPage = (uploadOtherInformationContent as any)[
              `textOnPage${index + 1}`
            ];
            return expect(
              page.locator(".govuk-body").nth(index + 4),
            ).toHaveText(textOnPage);
          }),
          ...Array.from({ length: 4 }, (_, index) => {
            const textOnPage = (uploadOtherInformationContent as any)[
              `textOnPage${index + 4}`
            ];
            return expect(
              page.locator(
                `div[class='govuk-body-m'] li:nth-child(${index + 1})`,
              ),
            ).toHaveText(textOnPage);
          }),
          expect(page.locator(".govuk-body").nth(7)).toHaveText(
            uploadOtherInformationContent.textOnPage8,
          ),
          expect(page.locator(".govuk-details__summary-text")).toHaveText(
            uploadOtherInformationContent.dropdownLink,
          ),
          ...Array.from({ length: 4 }, (_, index) => {
            const textOnPage = (uploadOtherInformationContent as any)[
              `textOnPage${index + 9}`
            ];
            return expect(
              page.locator(
                `details[class='govuk-details'] li:nth-child(${index + 1})`,
              ),
            ).toHaveText(textOnPage);
          }),
          expect(page.locator(".govuk-details__text")).toContainText(
            uploadOtherInformationContent.textOnPage13,
          ),
          expect(page.locator(".govuk-label").nth(0)).toHaveText(
            uploadOtherInformationContent.textOnPage14,
          ),
          expect(
            page.locator("form[class='formRow'] p[class='govuk-body']"),
          ).toHaveText(uploadOtherInformationContent.textOnPage15),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (uploadOtherInformationContent as any)[
              `subTitle${index + 2}`
            ];
            return expect(
              page.locator(".govuk-label").nth(index + 1),
            ).toHaveText(textOnPage);
          }),
          expect(page.locator("#documentRelevance-hint")).toHaveText(
            uploadOtherInformationContent.textOnPage16,
          ),
          expect(page.locator("#additionalInformation-hint")).toHaveText(
            uploadOtherInformationContent.textOnPage17,
          ),
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
    uploadInformation: boolean,
    multipleDocuments: boolean,
  ): Promise<void> {
    if (uploadInformation) {
      await page
        .locator(this.fields.uploadFileButton)
        .setInputFiles(config.testWordFile);
      await page.click(this.fields.fileUploadedOption);
      await expect(page.locator(".uploadedFile").first()).toContainText(
        path.basename(config.testWordFile),
      );
      if (cy) {
        await expect(
          page.locator(
            "main[id='main-content'] li:nth-child(1).govuk-\\!-padding-top-2.govuk-\\!-padding-bottom-3.govuk-section-break.govuk-section-break--visible",
          ),
        ).toContainText(uploadOtherInformationContent.deleteButtonCy);
      } else {
        await expect(
          page.locator(
            "main[id='main-content'] li:nth-child(1).govuk-\\!-padding-top-2.govuk-\\!-padding-bottom-3.govuk-section-break.govuk-section-break--visible",
          ),
        ).toContainText(uploadOtherInformationContent.deleteButton);
      }
      if (multipleDocuments) {
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testWordFile);
        await page.click(this.fields.fileUploadedOption);
        await Promise.all([
          expect(page.locator(".uploadedFile").nth(1)).toContainText(
            path.basename(config.testWordFile),
          ),
          expect(page.locator(".uploadedFile").nth(1)).toContainText(
            uploadOtherInformationContent.deleteButton,
          ),
        ]);
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testWordFile);
        await page.click(this.fields.fileUploadedOption);
        await Promise.all([
          expect(page.locator(".uploadedFile").nth(2)).toContainText(
            path.basename(config.testWordFile),
          ),
          expect(page.locator(".uploadedFile").nth(2)).toContainText(
            uploadOtherInformationContent.deleteButton,
          ),
        ]);
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testWordFile);
        await page.click(this.fields.fileUploadedOption);
        await Promise.all([
          expect(page.locator(".uploadedFile").nth(3)).toContainText(
            path.basename(config.testWordFile),
          ),
          expect(page.locator(".uploadedFile").nth(3)).toContainText(
            uploadOtherInformationContent.deleteButton,
          ),
        ]);
      }
      await page.fill(
        this.fields.documentRelevance,
        uploadOtherInformationContent.documentRelevance,
      );
      await page.fill(
        this.fields.additionalInfo,
        uploadOtherInformationContent.additionalInfo,
      );
    }
    await page.click(this.continueButton);
  },

  async triggerErrorMessages(page: Page, cy: boolean): Promise<void> {
    switch (cy) {
      case true:
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testOdtFile);
        await page.click(this.fields.fileUploadedOption);
        await Promise.all([
          expect(page.locator(".govuk-error-summary__title")).toHaveText(
            uploadOtherInformationContent.errorBannerCy,
          ),
          expect(page.locator("[href='#file-upload-1']")).toHaveText(
            uploadOtherInformationContent.fileTypeErrorCy,
          ),
        ]);
        break;
      default:
        await page
          .locator(this.fields.uploadFileButton)
          .setInputFiles(config.testOdtFile);
        await page.click(this.fields.fileUploadedOption);
        await Promise.all([
          expect(page.locator(".govuk-error-summary__title")).toHaveText(
            uploadOtherInformationContent.errorBanner,
          ),
          expect(page.locator("[href='#file-upload-1']")).toHaveText(
            uploadOtherInformationContent.fileTypeError,
          ),
        ]);
        break;
    }
  },

  async pressBackButton(page: Page): Promise<void> {
    await page.click(this.backButton);
  },
};

export default uploadOtherInformationPage;

import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import caseDocumentsUploadObject_content from "../../../fixtures/content/CaseAPI/createCase/caseDocumentsUploadObject_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import config from "../../../config.ts";

type caseDocumentsUploadObjectPage = {
  continue: string;
  addNew: string;
  addNewBottom: string;
  remove: string;
  confirmRemove: string;
  cancelRemove: string;
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
  fillInFields(page: Page, multipleFiles: boolean): Promise<void>;
};

const caseDocumentsUploadObjectPage: caseDocumentsUploadObjectPage = {
  continue: '[type="submit"]',
  addNew: ".write-collection-add-item__top",
  addNewBottom: ".write-collection-add-item__bottom",
  remove: ".button-secondary",
  confirmRemove: ".action-button",
  cancelRemove: "button-secondary",

  async checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void> {
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toHaveText(
        caseDocumentsUploadObject_content.pageHint,
      ),
      expect(page.locator(".govuk-heading-l")).toHaveText(
        caseDocumentsUploadObject_content.pageTitle,
      ),
      expect(page.locator("[class='markdown'] p")).toHaveText(
        caseDocumentsUploadObject_content.textOnPage1,
      ),
      expect(
        page.locator("body exui-root exui-case-create-submit li:nth-child(1)"),
      ).toHaveText(caseDocumentsUploadObject_content.textOnPage2),
      expect(
        page.locator("body exui-root exui-case-create-submit li:nth-child(2)"),
      ).toHaveText(caseDocumentsUploadObject_content.textOnPage3),
      expect(
        page.locator("body exui-root exui-case-create-submit li:nth-child(3)"),
      ).toHaveText(caseDocumentsUploadObject_content.textOnPage4),
      expect(page.locator(".heading-h2").nth(0)).toHaveText(
        caseDocumentsUploadObject_content.subSubTitle1,
      ),
    ]);
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillInFields(page: Page, multipleFiles: boolean): Promise<void> {
    await page.click(this.addNew);
    await commonHelpers.uploadFileController(
      page,
      "cicCaseApplicantDocumentsUploaded",
      0,
      "A - Application Form",
      config.testPdfFile,
    );
    if (multipleFiles) {
      await page.click(this.addNewBottom);
      await commonHelpers.uploadFileController(
        page,
        "cicCaseApplicantDocumentsUploaded",
        1,
        "A - Application Form",
        config.testWordFile,
      );
      await page.click(this.addNewBottom);
      await commonHelpers.uploadFileController(
        page,
        "cicCaseApplicantDocumentsUploaded",
        2,
        "A - Application Form",
        config.testFile,
      );
    }
    await page.click(this.continue);
  },
};

export default caseDocumentsUploadObjectPage;

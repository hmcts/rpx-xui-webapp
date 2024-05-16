import { expect, Page } from "@playwright/test";
import axeTest from "../../helpers/accessibilityTestHelper";
import CheckYourAnswersContent from "../../fixtures/content/DSSUpdateCase/CheckYourAnswers_content.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";
import uploadDocuments_content from "../../fixtures/content/DSSUpdateCase/UploadDocuments_content.ts";
import path from "path";
import config from "../../config.ts";

type CheckYourAnswersPage = {
  continueButton: string;
  backButton: string;
  checkPageLoads(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
    multipleDocuments: boolean,
    uploadDocument: boolean,
  ): Promise<void>;
  checkValidInfoAllFields(
    page: Page,
    cy: boolean,
    multipleDocuments: boolean,
    uploadDocument: boolean,
    additionalInformation: boolean,
  ): Promise<void>;
  continueOn(page: Page): Promise<void>;
  pressBackButton(page: Page): Promise<void>;
};

const checkYourAnswersPage: CheckYourAnswersPage = {
  continueButton: "#main-form-submit",
  backButton: ".govuk-back-link",

  async checkPageLoads(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
    multipleDocuments: boolean,
    uploadDocument: boolean,
  ): Promise<void> {
    switch (cy) {
      case true:
        if (!multipleDocuments) {
          await Promise.all([
            commonHelpers.feedbackBanner(page, cy, false),
            expect(page.locator(".govuk-header__service-name")).toHaveText(
              CheckYourAnswersContent.headerCy,
            ),
            expect(page.locator(".govuk-heading-l").nth(0)).toHaveText(
              CheckYourAnswersContent.pageTitleCy,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPageCy1}")`,
              ),
              1,
            ),
          ]);
          if (uploadDocument) {
            await Promise.all([
              commonHelpers.checkVisibleAndPresent(
                page.locator(
                  `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPageCy2}")`,
                ),
                1,
              ),
              commonHelpers.checkVisibleAndPresent(
                page.locator(
                  `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPageCy3}")`,
                ),
                1,
              ),
              commonHelpers.checkVisibleAndPresent(
                page.locator(
                  `.govuk-heading-m:has-text("${CheckYourAnswersContent.subTitleCy}")`,
                ),
                1,
              ),
              expect(page.locator(".govuk-body-l")).toHaveText(
                CheckYourAnswersContent.textOnPageCy4,
              ),
            ]);
          }
        } else {
          await Promise.all([
            expect(page.locator(".govuk-header__service-name")).toHaveText(
              CheckYourAnswersContent.headerCy,
            ),
            expect(page.locator(".govuk-heading-l").nth(0)).toHaveText(
              CheckYourAnswersContent.pageTitleCy,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPageCy1}")`,
              ),
              1,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPageCy2}")`,
              ),
              10,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPageCy3}")`,
              ),
              10,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-heading-m:has-text("${CheckYourAnswersContent.subTitleCy}")`,
              ),
              1,
            ),
            expect(page.locator(".govuk-body-l")).toHaveText(
              CheckYourAnswersContent.textOnPageCy4,
            ),
          ]);
        }
        break;
      default:
        if (!multipleDocuments) {
          await Promise.all([
            commonHelpers.feedbackBanner(page, cy, false),
            expect(page.locator(".govuk-header__service-name")).toHaveText(
              CheckYourAnswersContent.header,
            ),
            expect(page.locator(".govuk-heading-l").nth(0)).toHaveText(
              CheckYourAnswersContent.pageTitle,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPage1}")`,
              ),
              1,
            ),
          ]);
          if (uploadDocument) {
            await Promise.all([
              commonHelpers.checkVisibleAndPresent(
                page.locator(
                  `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPage2}")`,
                ),
                1,
              ),
              commonHelpers.checkVisibleAndPresent(
                page.locator(
                  `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPage3}")`,
                ),
                1,
              ),
              commonHelpers.checkVisibleAndPresent(
                page.locator(
                  `.govuk-heading-m:has-text("${CheckYourAnswersContent.subTitle}")`,
                ),
                1,
              ),
              expect(page.locator(".govuk-body-l")).toHaveText(
                CheckYourAnswersContent.textOnPage4,
              ),
            ]);
          }
        } else {
          await Promise.all([
            expect(page.locator(".govuk-header__service-name")).toHaveText(
              CheckYourAnswersContent.header,
            ),
            expect(page.locator(".govuk-heading-l").nth(0)).toHaveText(
              CheckYourAnswersContent.pageTitle,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPage1}")`,
              ),
              1,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPage2}")`,
              ),
              10,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-summary-list__key:text-is("${CheckYourAnswersContent.textOnPage3}")`,
              ),
              10,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-heading-m:has-text("${CheckYourAnswersContent.subTitle}")`,
              ),
              1,
            ),
            expect(page.locator(".govuk-body-l")).toHaveText(
              CheckYourAnswersContent.textOnPage4,
            ),
          ]);
        }
        break;
    }
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async checkValidInfoAllFields(
    page: Page,
    cy: boolean,
    multipleDocuments: boolean,
    uploadDocument: boolean,
    additionalInformation: boolean,
  ): Promise<void> {
    switch (cy) {
      case true:
        if (additionalInformation) {
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-summary-list__value:text-is("${uploadDocuments_content.additionalInfo}")`,
            ),
            1,
          );
        }
        if (!multipleDocuments) {
          if (uploadDocument) {
            await Promise.all([
              commonHelpers.checkVisibleAndPresent(
                page.locator(
                  `.govuk-summary-list__value:text-is("${path.basename(config.testWordFile)}")`,
                ),
                1,
              ),
              commonHelpers.checkVisibleAndPresent(
                page.locator(
                  `.govuk-summary-list__value:text-is("${uploadDocuments_content.documentRelevance}")`,
                ),
                1,
              ),
              commonHelpers.checkVisibleAndPresent(
                page.locator(
                  `a.govuk-link[href="/upload-documents"]:text-is("newid")`,
                ),
                2,
              ),
            ]);
          } else {
            await commonHelpers.checkVisibleAndPresent(
              page.locator(
                `a.govuk-link[href="/upload-documents"]:text-is("newid"):nth-child(1)`,
              ),
              1,
            );
          }
        } else {
          await Promise.all([
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-summary-list__value:text-is("${path.basename(config.testWordFile)}")`,
              ),
              1,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-summary-list__value:text-is("${path.basename(config.testPdfFile)}")`,
              ),
              4,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-summary-list__value:text-is("${path.basename(config.testPdfFile)}")`,
              ),
              4,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-summary-list__value:text-is("${uploadDocuments_content.documentRelevance}")`,
              ),
              10,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `a.govuk-link[href="/upload-documents"]:text-is("newid")`,
              ),
              11,
            ),
          ]);
        }
        break;
      default:
        if (additionalInformation) {
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-summary-list__value:text-is("${uploadDocuments_content.additionalInfo}")`,
            ),
            1,
          );
        }
        if (!multipleDocuments) {
          if (uploadDocument) {
            await Promise.all([
              commonHelpers.checkVisibleAndPresent(
                page.locator(
                  `.govuk-summary-list__value:text-is("${path.basename(config.testWordFile)}")`,
                ),
                1,
              ),
              commonHelpers.checkVisibleAndPresent(
                page.locator(
                  `.govuk-summary-list__value:text-is("${uploadDocuments_content.documentRelevance}")`,
                ),
                1,
              ),
              commonHelpers.checkVisibleAndPresent(
                page.locator(
                  `a.govuk-link[href="/upload-documents"]:text-is("change")`,
                ),
                2,
              ),
            ]);
          } else {
            await commonHelpers.checkVisibleAndPresent(
              page.locator(
                `a.govuk-link[href="/upload-documents"]:text-is("change"):nth-child(1)`,
              ),
              1,
            );
          }
        } else {
          await Promise.all([
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-summary-list__value:text-is("${path.basename(config.testWordFile)}")`,
              ),
              1,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-summary-list__value:text-is("${path.basename(config.testPdfFile)}")`,
              ),
              4,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-summary-list__value:text-is("${path.basename(config.testPdfFile)}")`,
              ),
              4,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.govuk-summary-list__value:text-is("${uploadDocuments_content.documentRelevance}")`,
              ),
              10,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `a.govuk-link[href="/upload-documents"]:text-is("change")`,
              ),
              11,
            ),
          ]);
        }
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

export default checkYourAnswersPage;

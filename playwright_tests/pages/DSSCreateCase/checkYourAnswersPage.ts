import { expect, Page } from "@playwright/test";
import path from "path";
import config from "../../config.ts";
import axeTest from "../../helpers/accessibilityTestHelper";
import commonHelpers from "../../helpers/commonHelpers.ts";
import CheckYourAnswersContent from "../../fixtures/content/DSSCreateCase/CheckYourAnswers_content.ts";
import subjectDetailsContent from "../../fixtures/content/DSSCreateCase/SubjectDetails_content";
import subjectContactDetailsContent from "../../fixtures/content/DSSCreateCase/SubjectContactDetails_content";
import representativeDetailsContent from "../../fixtures/content/DSSCreateCase/RepresentativeDetails_content.ts";
import uploadOtherInformationContent from "../../fixtures/content/DSSCreateCase/UploadOtherInformation_content.ts";

type CheckYourAnswersPage = {
  continueButton: string;
  backButton: string;
  checkPageLoads(
    page: Page,
    cy: boolean,
    representationPresent: boolean,
    accessibilityTest: boolean,
  ): Promise<void>;
  checkValidInfoAllFields(
    page: Page,
    cy: boolean,
    representationPresent: boolean,
    representationQualified: boolean,
    uploadOtherInfo: boolean,
    multipleDocuments: boolean,
  ): Promise<void>;
  continueOn(page: Page): Promise<string>;
  pressBackButton(page: Page): Promise<void>;
};

const checkYourAnswersPage: CheckYourAnswersPage = {
  continueButton: "#main-form-submit",
  backButton: ".govuk-back-link",

  async checkPageLoads(
    page: Page,
    cy: boolean,
    representationPresent: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    switch (cy) {
      case true:
        await Promise.all([
          expect(page.locator(".govuk-heading-l").nth(0)).toHaveText(
            CheckYourAnswersContent.pageTitleCy,
          ),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (CheckYourAnswersContent as any)[
              `subTitleCy${index + 1}`
            ];
            return expect(
              page.locator(".govuk-heading-m").nth(index + 1),
            ).toHaveText(textOnPage);
          }),
          ...Array.from({ length: 5 }, (_, index) => {
            const textOnPage = (CheckYourAnswersContent as any)[
              `textOnPageCy${index + 1}`
            ];
            return expect(
              page.locator(".govuk-summary-list__key").nth(index),
            ).toHaveText(textOnPage);
          }),
        ]);
        if (representationPresent) {
          await Promise.all([
            ...Array.from({ length: 4 }, (_, index) => {
              const textOnPage = (CheckYourAnswersContent as any)[
                `subTitleCy${index + 3}`
              ];
              return expect(
                page.locator(".govuk-heading-m").nth(index + 3),
              ).toHaveText(textOnPage);
            }),
            ...Array.from({ length: 10 }, (_, index) => {
              const textOnPage = (CheckYourAnswersContent as any)[
                `textOnPageCy${index + 6}`
              ];
              return expect(
                page.locator(".govuk-summary-list__key").nth(index + 5),
              ).toHaveText(textOnPage);
            }),
          ]);
        } else {
          await Promise.all([
            ...Array.from({ length: 3 }, (_, index) => {
              const textOnPage = (CheckYourAnswersContent as any)[
                `subTitleCy${index + 4}`
              ];
              return expect(
                page.locator(".govuk-heading-m").nth(index + 3),
              ).toHaveText(textOnPage);
            }),
            ...Array.from({ length: 5 }, (_, index) => {
              const textOnPage = (CheckYourAnswersContent as any)[
                `textOnPageCy${index + 11}`
              ];
              return expect(
                page.locator(".govuk-summary-list__key").nth(index + 5),
              ).toHaveText(textOnPage);
            }),
          ]);
        }
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-heading-m:has-text("${CheckYourAnswersContent.subTitleCy7}")`,
            ),
            1,
          ),
          expect(page.locator(".govuk-body-l")).toHaveText(
            CheckYourAnswersContent.textOnPageCy16,
          ),
        ]);
        break;
      default:
        await Promise.all([
          expect(page.locator(".govuk-heading-l").nth(0)).toHaveText(
            CheckYourAnswersContent.pageTitle,
          ),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (CheckYourAnswersContent as any)[
              `subTitle${index + 1}`
            ];
            return expect(
              page.locator(".govuk-heading-m").nth(index + 1),
            ).toHaveText(textOnPage);
          }),
          ...Array.from({ length: 5 }, (_, index) => {
            const textOnPage = (CheckYourAnswersContent as any)[
              `textOnPage${index + 1}`
            ];
            return expect(
              page.locator(".govuk-summary-list__key").nth(index),
            ).toHaveText(textOnPage);
          }),
        ]);
        if (representationPresent) {
          await Promise.all([
            ...Array.from({ length: 4 }, (_, index) => {
              const textOnPage = (CheckYourAnswersContent as any)[
                `subTitle${index + 3}`
              ];
              return expect(
                page.locator(".govuk-heading-m").nth(index + 3),
              ).toHaveText(textOnPage);
            }),
            ...Array.from({ length: 10 }, (_, index) => {
              const textOnPage = (CheckYourAnswersContent as any)[
                `textOnPage${index + 6}`
              ];
              return expect(
                page.locator(".govuk-summary-list__key").nth(index + 5),
              ).toHaveText(textOnPage);
            }),
          ]);
        } else {
          await Promise.all([
            ...Array.from({ length: 3 }, (_, index) => {
              const textOnPage = (CheckYourAnswersContent as any)[
                `subTitle${index + 4}`
              ];
              return expect(
                page.locator(".govuk-heading-m").nth(index + 3),
              ).toHaveText(textOnPage);
            }),
            ...Array.from({ length: 5 }, (_, index) => {
              const textOnPage = (CheckYourAnswersContent as any)[
                `textOnPage${index + 11}`
              ];
              return expect(
                page.locator(".govuk-summary-list__key").nth(index + 5),
              ).toHaveText(textOnPage);
            }),
          ]);
        }
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.govuk-heading-m:has-text("${CheckYourAnswersContent.subTitle7}")`,
            ),
            1,
          ),
          expect(page.locator(".govuk-body-l")).toHaveText(
            CheckYourAnswersContent.textOnPage16,
          ),
        ]);
        break;
    }
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async checkValidInfoAllFields(
    page: Page,
    cy: boolean,
    representationPresent: boolean,
    representationQualified: boolean,
    uploadOtherInfo: boolean,
    multipleDocuments: boolean,
  ): Promise<void> {
    const yes = "Yes";
    const no = "No";
    const yesCy = "Ydy";
    const noCy = "Nac ydy";
    await Promise.all([
      expect(page.locator(".govuk-summary-list__value").nth(0)).toHaveText(
        subjectDetailsContent.name,
      ),
      expect(page.locator(".govuk-summary-list__value").nth(1)).toHaveText(
        await commonHelpers.convertDate(false),
      ),
      expect(page.locator(".govuk-summary-list__value").nth(2)).toHaveText(
        subjectContactDetailsContent.emailAddress,
      ),
      expect(page.locator(".govuk-summary-list__value").nth(3)).toHaveText(
        subjectContactDetailsContent.contactNumber,
      ),
    ]);
    if (representationPresent) {
      if (cy) {
        await expect(
          page.locator(".govuk-summary-list__value").nth(4),
        ).toHaveText(yesCy);
        if (representationQualified) {
          await expect(
            page.locator(".govuk-summary-list__value").nth(5),
          ).toHaveText(yesCy);
        } else if (!representationQualified) {
          await expect(
            page.locator(".govuk-summary-list__value").nth(5),
          ).toHaveText(noCy);
        }
      } else {
        await expect(
          page.locator(".govuk-summary-list__value").nth(4),
        ).toHaveText(yes);
        if (representationQualified) {
          await expect(
            page.locator(".govuk-summary-list__value").nth(5),
          ).toHaveText(yes);
        } else if (!representationQualified) {
          await expect(
            page.locator(".govuk-summary-list__value").nth(5),
          ).toHaveText(no);
        }
      }
      await Promise.all([
        expect(page.locator(".govuk-summary-list__value").nth(6)).toHaveText(
          representativeDetailsContent.fullName,
        ),
        expect(page.locator(".govuk-summary-list__value").nth(7)).toHaveText(
          representativeDetailsContent.Organisation,
        ),
        expect(page.locator(".govuk-summary-list__value").nth(8)).toHaveText(
          representativeDetailsContent.contactNumber,
        ),
        expect(page.locator(".govuk-summary-list__value").nth(9)).toHaveText(
          representativeDetailsContent.emailAddress,
        ),
      ]);
      if (multipleDocuments) {
        await Promise.all([
          expect(page.locator(".govuk-summary-list__value").nth(10)).toHaveText(
            `${path.basename(config.testPdfFile)} ${path.basename(config.testPdfFile)} ${path.basename(config.testPdfFile)} ${path.basename(config.testPdfFile)}`,
          ),
          expect(page.locator(".govuk-summary-list__value").nth(11)).toHaveText(
            `${path.basename(config.testFile)} ${path.basename(config.testFile)} ${path.basename(config.testFile)} ${path.basename(config.testFile)}`,
          ),
        ]);
      } else {
        await Promise.all([
          expect(page.locator(".govuk-summary-list__value").nth(10)).toHaveText(
            path.basename(config.testPdfFile),
          ),
          expect(page.locator(".govuk-summary-list__value").nth(11)).toHaveText(
            path.basename(config.testFile),
          ),
        ]);
      }
      if (uploadOtherInfo) {
        if (multipleDocuments) {
          await expect(
            page.locator(".govuk-summary-list__value").nth(12),
          ).toHaveText(
            `${path.basename(config.testWordFile)} ${path.basename(config.testWordFile)} ${path.basename(config.testWordFile)} ${path.basename(config.testWordFile)}`,
          );
        } else {
          await expect(
            page.locator(".govuk-summary-list__value").nth(12),
          ).toHaveText(path.basename(config.testWordFile));
        }
        await Promise.all([
          expect(page.locator(".govuk-summary-list__value").nth(13)).toHaveText(
            path.basename(uploadOtherInformationContent.documentRelevance),
          ),
          expect(page.locator(".govuk-summary-list__value").nth(14)).toHaveText(
            path.basename(uploadOtherInformationContent.additionalInfo),
          ),
        ]);
      }
    } else {
      if (cy) {
        await expect(
          page.locator(".govuk-summary-list__value").nth(4),
        ).toHaveText(noCy);
      } else {
        await expect(
          page.locator(".govuk-summary-list__value").nth(4),
        ).toHaveText(no);
      }
      if (multipleDocuments) {
        await Promise.all([
          expect(page.locator(".govuk-summary-list__value").nth(5)).toHaveText(
            `${path.basename(config.testPdfFile)} ${path.basename(config.testPdfFile)} ${path.basename(config.testPdfFile)} ${path.basename(config.testPdfFile)}`,
          ),
          expect(page.locator(".govuk-summary-list__value").nth(6)).toHaveText(
            `${path.basename(config.testFile)} ${path.basename(config.testFile)} ${path.basename(config.testFile)} ${path.basename(config.testFile)}`,
          ),
        ]);
      } else {
        await Promise.all([
          expect(page.locator(".govuk-summary-list__value").nth(5)).toHaveText(
            path.basename(config.testPdfFile),
          ),
          expect(page.locator(".govuk-summary-list__value").nth(6)).toHaveText(
            path.basename(config.testFile),
          ),
        ]);
      }
      if (uploadOtherInfo) {
        if (multipleDocuments) {
          await expect(
            page.locator(".govuk-summary-list__value").nth(7),
          ).toHaveText(
            `${path.basename(config.testWordFile)} ${path.basename(config.testWordFile)} ${path.basename(config.testWordFile)} ${path.basename(config.testWordFile)}`,
          );
        } else {
          await expect(
            page.locator(".govuk-summary-list__value").nth(7),
          ).toHaveText(path.basename(config.testWordFile));
        }
        await Promise.all([
          expect(page.locator(".govuk-summary-list__value").nth(8)).toHaveText(
            path.basename(uploadOtherInformationContent.documentRelevance),
          ),
          expect(page.locator(".govuk-summary-list__value").nth(9)).toHaveText(
            path.basename(uploadOtherInformationContent.additionalInfo),
          ),
        ]);
      }
    }
  },

  async continueOn(page: Page): Promise<string> {
    await page.click(this.continueButton);
    return await commonHelpers.getTimestamp();
  },

  async pressBackButton(page: Page): Promise<void> {
    await page.click(this.backButton);
  },
};

export default checkYourAnswersPage;

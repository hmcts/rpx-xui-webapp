import { expect, Page } from "@playwright/test";
import path from "path";
import config from "../../../config.ts";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import caseFileViewTabContent from "../../../fixtures/content/CaseAPI/caseTabs/caseFileViewTab_content.ts";
import uploadedDocumentsContent from "../../../fixtures/content/CaseAPI/caseTabs/uploadedDocuments_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";

type CaseFileViewTabPage = {
  caseFileViewTab: string;
  checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
  ): Promise<void>;
  changeToCaseFileViewTab(page: Page): Promise<void>;
  checkPageInfo(
    page: Page,
    uploadAdditionalInfo: boolean,
    multipleDocuments: boolean,
  ): Promise<void>;
};

const caseFileViewTabPage: CaseFileViewTabPage = {
  caseFileViewTab: ".mat-tab-label",

  async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
  ): Promise<void> {
    await Promise.all([
      commonHelpers.checkAllCaseTabs(page, caseNumber),
      expect(page.locator(".govuk-heading-l")).toHaveText(
        caseFileViewTabContent.pageTitle,
      ),
      ...Array.from({ length: 10 }, (_, index) => {
        const textOnPage = (caseFileViewTabContent as any)[
          `textOnPage${index + 1}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`.node__name--folder:text-is("${textOnPage}")`),
          1,
        );
      }),
    ]);
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async changeToCaseFileViewTab(page: Page): Promise<void> {
    await page.locator(this.caseFileViewTab).nth(10).click();
    await page.locator(this.caseFileViewTab).nth(10).click();
  },

  async checkPageInfo(
    page: Page,
    multipleDocuments: boolean,
    uploadAdditionalInfo: boolean,
  ): Promise<void> {
    if (multipleDocuments) {
      await Promise.all([
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.node__count:text-is("${uploadedDocumentsContent.multipleDocuments}")`,
          ),
          1,
        ),
        ...Array.from({ length: 4 }, (_, index) => {
          return expect(
            page.locator(".node-name-document").nth(index),
          ).toHaveText(path.basename(config.testWordFile));
        }),
        ...Array.from({ length: 4 }, (_, index) => {
          return expect(
            page.locator(".node-name-document").nth(index + 4),
          ).toHaveText(path.basename(config.testFile));
        }),
        ...Array.from({ length: 4 }, (_, index) => {
          return expect(
            page.locator(".node-name-document").nth(index + 8),
          ).toHaveText(path.basename(config.testPdfFile));
        }),
      ]);
    } else {
      if (!uploadAdditionalInfo) {
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.node__count:text-is("${uploadedDocumentsContent.totalDocuments}")`,
            ),
            1,
          ),
          expect(page.locator(".node-name-document").nth(0)).toHaveText(
            path.basename(config.testFile),
          ),
          expect(page.locator(".node-name-document").nth(1)).toHaveText(
            path.basename(config.testPdfFile),
          ),
        ]);
      } else {
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.node__count:text-is("${uploadedDocumentsContent.totalDocumentsAdditional}")`,
            ),
            1,
          ),
          expect(page.locator(".node-name-document").nth(0)).toHaveText(
            path.basename(config.testWordFile),
          ),
          expect(page.locator(".node-name-document").nth(1)).toHaveText(
            path.basename(config.testFile),
          ),
          expect(page.locator(".node-name-document").nth(2)).toHaveText(
            path.basename(config.testPdfFile),
          ),
        ]);
      }
    }
  },
};

export default caseFileViewTabPage;

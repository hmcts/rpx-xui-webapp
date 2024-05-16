import { expect, Page } from "@playwright/test";
import path from "path";
import config from "../../../config.ts";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import caseDocumentsTabContent from "../../../fixtures/content/CaseAPI/caseTabs/caseDocumentsTab_content.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";

type CaseDocumentsTabPage = {
  caseDocumentsTab: string;
  checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
    multipleDocuments: boolean,
    uploadOtherInfo: boolean,
  ): Promise<void>;
  changeToCaseDocumentsTab(page: Page): Promise<void>;
  checkPageInfo(
    page: Page,
    multipleDocuments: boolean,
    uploadOtherInfo: boolean,
  ): Promise<void>;
  handleMultipleDocumentsLoad(
    page: Page,
    uploadOtherInfo: boolean,
  ): Promise<void>;
  handleMultipleDocuments(page: Page, uploadOtherInfo: boolean): Promise<void>;
};

const caseDocumentsTabPage: CaseDocumentsTabPage = {
  caseDocumentsTab: ".mat-tab-label",

  async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
    multipleDocuments: boolean,
    uploadOtherInfo: boolean,
  ): Promise<void> {
    await Promise.all([
      commonHelpers.checkAllCaseTabs(page, caseNumber),
      expect(page.locator("markdown[class='markdown'] h4")).toHaveText(
        caseDocumentsTabContent.pageTitle,
      ),
      expect(page.locator(".text-16").nth(1)).toHaveText(
        caseDocumentsTabContent.subHeading1,
      ),
    ]);
    if (!uploadOtherInfo) {
      if (!multipleDocuments) {
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.text-16:text-is("${caseDocumentsTabContent.title1}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.text-16:text-is("${caseDocumentsTabContent.title2}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.text-16:text-is("${caseDocumentsTabContent.textOnPage1}")`,
            ),
            2,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.text-16:text-is("${caseDocumentsTabContent.textOnPage2}")`,
            ),
            2,
          ),
        ]);
      } else {
        await this.handleMultipleDocumentsLoad(page, uploadOtherInfo);
      }
    } else {
      if (!multipleDocuments) {
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.text-16:text-is("${caseDocumentsTabContent.title1}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.text-16:text-is("${caseDocumentsTabContent.title2}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.text-16:text-is("${caseDocumentsTabContent.title3}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.text-16:text-is("${caseDocumentsTabContent.textOnPage1}")`,
            ),
            3,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.text-16:text-is("${caseDocumentsTabContent.textOnPage2}")`,
            ),
            3,
          ),
        ]);
      } else {
        await this.handleMultipleDocumentsLoad(page, uploadOtherInfo);
      }
    }
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async changeToCaseDocumentsTab(page: Page): Promise<void> {
    await page.locator(this.caseDocumentsTab).nth(6).click();
  },

  async checkPageInfo(
    page: Page,
    multipleDocuments: boolean,
    uploadOtherInfo: boolean,
  ): Promise<void> {
    if (!uploadOtherInfo) {
      if (!multipleDocuments) {
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.text-16:text-is("${caseDocumentsTabContent.secondDocCategory}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(`a:text-is("${path.basename(config.testFile)}")`),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.text-16:text-is("${caseDocumentsTabContent.thirdDocCategory}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(`a:text-is("${path.basename(config.testPdfFile)}")`),
            1,
          ),
        ]);
      } else {
        await this.handleMultipleDocuments(page, uploadOtherInfo);
      }
    } else {
      if (!multipleDocuments) {
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.text-16:text-is("${caseDocumentsTabContent.firstDocCategory}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(`a:text-is("${path.basename(config.testWordFile)}")`),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.text-16:text-is("${caseDocumentsTabContent.secondDocCategory}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(`a:text-is("${path.basename(config.testFile)}")`),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.text-16:text-is("${caseDocumentsTabContent.thirdDocCategory}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(`a:text-is("${path.basename(config.testPdfFile)}")`),
            1,
          ),
        ]);
      } else {
        await this.handleMultipleDocuments(page, uploadOtherInfo);
      }
    }
  },

  async handleMultipleDocumentsLoad(
    page: Page,
    uploadOtherInfo: boolean,
  ): Promise<void> {
    if (!uploadOtherInfo) {
      let count = 8;
      await Promise.all([
        ...Array.from({ length: count }, (_, index) => {
          const textOnPage = (caseDocumentsTabContent as any)[
            `title${index + 1}`
          ];
          return commonHelpers.checkVisibleAndPresent(
            page.locator(`.text-16:text-is("${textOnPage}")`),
            1,
          );
        }),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.text-16:text-is("${caseDocumentsTabContent.textOnPage1}")`,
          ),
          count,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.text-16:text-is("${caseDocumentsTabContent.textOnPage2}")`,
          ),
          count,
        ),
      ]);
    } else {
      let count = 12;
      await Promise.all([
        ...Array.from({ length: count }, (_, index) => {
          const textOnPage = (caseDocumentsTabContent as any)[
            `title${index + 1}`
          ];
          return commonHelpers.checkVisibleAndPresent(
            page.locator(`.text-16:text-is("${textOnPage}")`),
            1,
          );
        }),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.text-16:text-is("${caseDocumentsTabContent.textOnPage1}")`,
          ),
          count,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.text-16:text-is("${caseDocumentsTabContent.textOnPage2}")`,
          ),
          count,
        ),
      ]);
    }
  },

  async handleMultipleDocuments(
    page: Page,
    uploadOtherInfo: boolean,
  ): Promise<void> {
    if (!uploadOtherInfo) {
      await Promise.all([
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.text-16:text-is("${caseDocumentsTabContent.secondDocCategory}")`,
          ),
          4,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(`a:text-is("${path.basename(config.testFile)}")`),
          4,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.text-16:text-is("${caseDocumentsTabContent.thirdDocCategory}")`,
          ),
          4,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(`a:text-is("${path.basename(config.testPdfFile)}")`),
          4,
        ),
      ]);
    } else {
      await Promise.all([
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.text-16:text-is("${caseDocumentsTabContent.firstDocCategory}")`,
          ),
          4,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(`a:text-is("${path.basename(config.testWordFile)}")`),
          4,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.text-16:text-is("${caseDocumentsTabContent.secondDocCategory}")`,
          ),
          4,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(`a:text-is("${path.basename(config.testFile)}")`),
          4,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.text-16:text-is("${caseDocumentsTabContent.thirdDocCategory}")`,
          ),
          4,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(`a:text-is("${path.basename(config.testPdfFile)}")`),
          4,
        ),
      ]);
    }
  },
};

export default caseDocumentsTabPage;

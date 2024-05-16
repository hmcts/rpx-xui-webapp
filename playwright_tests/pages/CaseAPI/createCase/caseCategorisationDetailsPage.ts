import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import caseCategorisationDetails_content from "../../../fixtures/content/CaseAPI/createCase/caseCategorisationDetails_content.ts";
import commonHelpers, {
  Category,
  SubCategory,
} from "../../../helpers/commonHelpers.ts";

type CaseCategorisationDetailsPage = {
  continue: string;
  category: string;
  subCategory: string;
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
  fillInFields(
    page: Page,
    category: Category,
    subCategory: SubCategory,
  ): Promise<void>;
};

const caseCategorisationDetailsPage: CaseCategorisationDetailsPage = {
  continue: '[type="submit"]',
  category: "#cicCaseCaseCategory",
  subCategory: "#cicCaseCaseSubcategory",

  async checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void> {
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toHaveText(
        caseCategorisationDetails_content.pageHint,
      ),
      expect(page.locator(".govuk-heading-l")).toHaveText(
        caseCategorisationDetails_content.pageTitle,
      ),
      ...Array.from({ length: 2 }, (_, index) => {
        const textOnPage = (caseCategorisationDetails_content as any)[
          `textOnPage${index + 1}`
        ];
        return commonHelpers.checkVisibleAndPresent(
          page.locator(`.form-label:text-is("${textOnPage}")`),
          1,
        );
      }),
    ]);
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillInFields(
    page: Page,
    category: string,
    subCategory: string,
  ): Promise<void> {
    await page.selectOption(this.category, category);
    await page.selectOption(this.subCategory, subCategory);
    await page.click(this.continue);
  },
};

export default caseCategorisationDetailsPage;

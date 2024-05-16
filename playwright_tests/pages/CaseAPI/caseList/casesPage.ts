import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import casesContent from "../../../fixtures/content/CaseAPI/caseList/cases_content.ts";

type CasesPage = {
  searchCaseNumber: string;
  caseType: string;
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
  changeCaseType(page: Page): Promise<void>;
  searchForCaseNumber(page: Page, caseNumber: string): Promise<void>;
  createCase(page: Page): Promise<void>;
};

const casesPage: CasesPage = {
  searchCaseNumber: "#\\[CASE_REFERENCE\\]",
  caseType: "#wb-case-type",

  async checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void> {
    await Promise.all([
      expect(page.locator(".govuk-heading-xl")).toHaveText(
        casesContent.pageTitle,
      ),
      expect(page.locator("h2[aria-label='Filters']")).toHaveText(
        casesContent.subTitle1,
      ),
      expect(page.locator("label[for='wb-jurisdiction']")).toHaveText(
        casesContent.textOnPage1,
      ),
      expect(page.locator("label[for='wb-case-type']")).toHaveText(
        casesContent.textOnPage2,
      ),
      expect(page.locator("label[for='wb-case-state']")).toHaveText(
        casesContent.textOnPage3,
      ),
      expect(page.locator("label[for='[CASE_REFERENCE]']")).toHaveText(
        casesContent.textOnPage4,
      ),
      expect(page.locator("label[for='hearingVenueName']")).toHaveText(
        casesContent.textOnPage5,
      ),
      expect(page.locator("label[for='cicCaseFullName']")).toHaveText(
        casesContent.textOnPage6,
      ),
      expect(page.locator("label[for='cicCaseAddress.PostCode']")).toHaveText(
        casesContent.textOnPage7,
      ),
      expect(page.locator("#cicCaseDateOfBirth")).toHaveText(
        casesContent.textOnPage8,
      ),
      expect(page.locator("label[for='cicCaseApplicantFullName']")).toHaveText(
        casesContent.textOnPage9,
      ),
      expect(
        page.locator("label[for='cicCaseRepresentativeReference']"),
      ).toHaveText(casesContent.textOnPage10),
    ]);

    if ((await page.locator(".govuk-link--no-visited-state").count()) >= 1) {
      let warnings = await page
        .locator(".govuk-link--no-visited-state")
        .count();
      for (let i = 0; i < warnings; i++) {
        await page.locator(".govuk-link--no-visited-state").nth(0).click();
      }
    }

    if (accessibilityTest) {
      // await axeTest(page); disabled due to EXUI accessibility issues DTSSTCI-733.
    }
  },

  async changeCaseType(page: Page): Promise<void> {
    await page.selectOption(this.caseType, "CIC");
    await page.locator("button[title='Apply filter']").click();
  },

  async searchForCaseNumber(page: Page, caseNumber: string): Promise<void> {
    await page.fill(this.searchCaseNumber, caseNumber);
    await page.locator("button[title='Apply filter']").click();
    await page.locator("ccd-read-text-field").nth(0).click();
  },

  async createCase(page: Page): Promise<void> {
    const buttonText = casesContent.createCaseButton;
    await page.click(
      `//a[contains(@class, 'hmcts-primary-navigation__link') and contains(text(), '${buttonText}')]`,
    );
  },
};

export default casesPage;

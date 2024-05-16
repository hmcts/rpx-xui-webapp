import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import commonHelpers, {
  ContactPreference,
} from "../../../helpers/commonHelpers.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";

type CaseSubjectDetailsObjectPage = {
  continue: string;
  findAddress: string;
  fullName: string;
  phoneNumber: string;
  day: string;
  month: string;
  year: string;
  emailAddress: string;
  selectEmail: string;
  selectPost: string;
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
  fillInFields(page: Page, contactPreference: ContactPreference): Promise<void>;
};

const caseSubjectDetailsObjectPage: CaseSubjectDetailsObjectPage = {
  continue: '[type="submit"]',
  findAddress: ".button-30",
  fullName: "#cicCaseFullName",
  phoneNumber: "#cicCasePhoneNumber",
  day: "#cicCaseDateOfBirth-day",
  month: "#cicCaseDateOfBirth-month",
  year: "#cicCaseDateOfBirth-year",
  emailAddress: "#cicCaseEmail",
  selectEmail: "#cicCaseContactPreferenceType-Email",
  selectPost: "#cicCaseContactPreferenceType-Post",

  async checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void> {
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toHaveText(
        caseSubjectDetailsObject_content.pageHint,
      ),
      expect(page.locator(".govuk-heading-l")).toHaveText(
        caseSubjectDetailsObject_content.pageTitle,
      ),
      ...Array.from({ length: 7 }, (_, index) => {
        const textOnPage = (caseSubjectDetailsObject_content as any)[
          `textOnPage${index + 1}`
        ];
        return expect(page.locator(".form-label").nth(index)).toHaveText(
          textOnPage,
        );
      }),
      expect(page.locator(".heading-h2")).toHaveText(
        caseSubjectDetailsObject_content.subTitle1,
      ),
      expect(page.locator(".manual-link")).toHaveText(
        caseSubjectDetailsObject_content.linkOnPage1,
      ),
      ...Array.from({ length: 4 }, (_, index) => {
        const textOnPage = (caseSubjectDetailsObject_content as any)[
          `textOnPage${index + 8}`
        ];
        return expect(page.locator(".form-label").nth(index + 14)).toHaveText(
          textOnPage,
        );
      }),
    ]);
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillInFields(
    page: Page,
    contactPreference: ContactPreference,
  ): Promise<void> {
    await page.fill(this.fullName, caseSubjectDetailsObject_content.name);
    await page.fill(
      this.phoneNumber,
      caseSubjectDetailsObject_content.contactNumber,
    );
    await page.fill(this.day, caseSubjectDetailsObject_content.dayOfBirth);
    await page.fill(this.month, caseSubjectDetailsObject_content.monthOfBirth);
    await page.fill(this.year, caseSubjectDetailsObject_content.yearOfBirth);
    await commonHelpers.postcodeHandler(page, "Subject");
    if (contactPreference === "Email") {
      await page.click(this.selectEmail);
      await page.fill(
        this.emailAddress,
        caseSubjectDetailsObject_content.emailAddress,
      );
    } else if (contactPreference === "Post") {
      await page.click(this.selectPost);
    }
    await page.click(this.continue);
  },
};

export default caseSubjectDetailsObjectPage;

import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import commonHelpers, {
  ContactPreference,
} from "../../../helpers/commonHelpers.ts";
import caseApplicantDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseApplicantDetailsObject_content.ts";

type CaseApplicantDetailsObjectPage = {
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

const caseApplicantDetailsObjectPage: CaseApplicantDetailsObjectPage = {
  continue: '[type="submit"]',
  findAddress: ".button-30",
  fullName: "#cicCaseApplicantFullName",
  phoneNumber: "#cicCaseApplicantPhoneNumber",
  day: "#cicCaseApplicantDateOfBirth-day",
  month: "#cicCaseApplicantDateOfBirth-month",
  year: "#cicCaseApplicantDateOfBirth-year",
  emailAddress: "#cicCaseApplicantEmailAddress",
  selectEmail: "#cicCaseApplicantContactDetailsPreference-Email",
  selectPost: "#cicCaseApplicantContactDetailsPreference-Post",

  async checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void> {
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toHaveText(
        caseApplicantDetailsObject_content.pageHint,
      ),
      expect(page.locator(".govuk-heading-l")).toHaveText(
        caseApplicantDetailsObject_content.pageTitle,
      ),
      ...Array.from({ length: 9 }, (_, index) => {
        const textOnPage = (caseApplicantDetailsObject_content as any)[
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
    contactPreference: ContactPreference,
  ): Promise<void> {
    await page.fill(this.fullName, caseApplicantDetailsObject_content.name);
    await page.fill(
      this.phoneNumber,
      caseApplicantDetailsObject_content.contactNumber,
    );
    await page.fill(this.day, caseApplicantDetailsObject_content.dayOfBirth);
    await page.fill(
      this.month,
      caseApplicantDetailsObject_content.monthOfBirth,
    );
    await page.fill(this.year, caseApplicantDetailsObject_content.yearOfBirth);
    if (contactPreference === "Email") {
      await page.click(this.selectEmail);
      await page.click(this.selectEmail); // needs to double-click due to EXUI
      await expect(page.locator(".form-label").nth(17)).toHaveText(
        caseApplicantDetailsObject_content.textOnPage10,
      );
      await page.fill(
        this.emailAddress,
        caseApplicantDetailsObject_content.emailAddress,
      );
    } else if (contactPreference === "Post") {
      await page.click(this.selectPost);
      await page.click(this.selectPost);
      await Promise.all([
        expect(page.locator(".heading-h2")).toHaveText(
          caseApplicantDetailsObject_content.subTitle1,
        ),
        expect(page.locator(".form-label").nth(9)).toHaveText(
          caseApplicantDetailsObject_content.textOnPage11,
        ),
        expect(page.locator(".manual-link")).toHaveText(
          caseApplicantDetailsObject_content.linkOnPage1,
        ),
      ]);
      await commonHelpers.postcodeHandler(page, "Applicant");
    }
    await page.click(this.continue);
  },
};

export default caseApplicantDetailsObjectPage;

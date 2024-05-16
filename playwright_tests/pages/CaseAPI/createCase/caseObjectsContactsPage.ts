import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import { SubCategory } from "../../../helpers/commonHelpers.ts";
import caseObjectsContacts_content from "../../../fixtures/content/CaseAPI/createCase/caseObjectsContacts_content.ts";

type CaseObjectsContactsPage = {
  continue: string;
  subjectSelectBox: string;
  representativeSelectBox: string;
  applicantSelectBox: string;
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
  fillInFields(
    page: Page,
    caseType: SubCategory,
    representative: boolean,
    applicant: boolean,
  ): Promise<void>;
};

const caseObjectsContactsPage: CaseObjectsContactsPage = {
  continue: '[type="submit"]',
  subjectSelectBox: "#cicCaseSubjectCIC-SubjectCIC",
  applicantSelectBox: "#cicCaseApplicantCIC-ApplicantCIC",
  representativeSelectBox: "#cicCaseRepresentativeCIC-RepresentativeCIC",

  async checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void> {
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toHaveText(
        caseObjectsContacts_content.pageHint,
      ),
      expect(page.locator(".govuk-heading-l")).toHaveText(
        caseObjectsContacts_content.pageTitle,
      ),
      ...Array.from({ length: 6 }, (_, index) => {
        const textOnPage = (caseObjectsContacts_content as any)[
          `textOnPage${index + 1}`
        ];
        return expect(page.locator(".form-label").nth(index)).toHaveText(
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
    subCategory: SubCategory,
    representative: boolean,
    applicant: boolean,
  ): Promise<void> {
    if (!(subCategory === "Fatal" || subCategory === "Minor")) {
      await page.click(this.subjectSelectBox);
    }
    if (representative) {
      await page.click(this.representativeSelectBox);
    }
    if (applicant) {
      await page.click(this.applicantSelectBox);
    }
    await page.click(this.continue);
  },
};

export default caseObjectsContactsPage;

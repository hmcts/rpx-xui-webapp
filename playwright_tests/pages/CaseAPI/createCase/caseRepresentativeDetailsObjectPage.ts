import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import commonHelpers, {
  ContactPreference,
} from "../../../helpers/commonHelpers.ts";
import caseRepresentativeDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseRepresentativeDetailsObject_content.ts";

type CaseRepresentativeDetailsObjectPage = {
  continue: string;
  findAddress: string;
  fullName: string;
  orgName: string;
  phoneNumber: string;
  reference: string;
  qualifiedYes: string;
  qualifiedNo: string;
  emailAddress: string;
  selectEmail: string;
  selectPost: string;
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
  fillInFields(
    page: Page,
    contactPreference: ContactPreference,
    representativeQualified: boolean,
  ): Promise<void>;
};

const caseRepresentativeDetailsObjectPage: CaseRepresentativeDetailsObjectPage =
  {
    continue: '[type="submit"]',
    findAddress: ".button-30",
    fullName: "#cicCaseRepresentativeFullName",
    orgName: "#cicCaseRepresentativeOrgName",
    phoneNumber: "#cicCaseRepresentativePhoneNumber",
    reference: "#cicCaseRepresentativeReference",
    qualifiedYes: "#cicCaseIsRepresentativeQualified_Yes",
    qualifiedNo: "#cicCaseIsRepresentativeQualified_No",
    emailAddress: "#cicCaseRepresentativeEmailAddress",
    selectEmail: "#cicCaseRepresentativeContactDetailsPreference-Email",
    selectPost: "#cicCaseRepresentativeContactDetailsPreference-Post",

    async checkPageLoads(
      page: Page,
      accessibilityTest: boolean,
    ): Promise<void> {
      await Promise.all([
        expect(page.locator(".govuk-caption-l")).toHaveText(
          caseRepresentativeDetailsObject_content.pageHint,
        ),
        expect(page.locator(".govuk-heading-l")).toHaveText(
          caseRepresentativeDetailsObject_content.pageTitle,
        ),
        ...Array.from({ length: 10 }, (_, index) => {
          const textOnPage = (caseRepresentativeDetailsObject_content as any)[
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
      contactPreference: ContactPreference,
      representativeQualified: boolean,
    ): Promise<void> {
      await page.fill(
        this.fullName,
        caseRepresentativeDetailsObject_content.name,
      );
      await page.fill(
        this.orgName,
        caseRepresentativeDetailsObject_content.organisation,
      );
      await page.fill(
        this.phoneNumber,
        caseRepresentativeDetailsObject_content.contactNumber,
      );
      if (representativeQualified) {
        await page.click(this.qualifiedYes);
      } else {
        await page.click(this.qualifiedNo);
      }
      if (contactPreference === "Email") {
        await page.click(this.selectEmail);
        await page.click(this.selectEmail); // needs to double-click due to EXUI
        await expect(page.locator(".form-label").nth(10)).toHaveText(
          caseRepresentativeDetailsObject_content.textOnPage11,
        );
        await page.fill(
          this.emailAddress,
          caseRepresentativeDetailsObject_content.emailAddress,
        );
      } else if (contactPreference === "Post") {
        await page.click(this.selectPost);
        await page.click(this.selectPost);
        await Promise.all([
          expect(page.locator(".heading-h2")).toHaveText(
            caseRepresentativeDetailsObject_content.subTitle1,
          ),
          expect(page.locator(".form-label").nth(10)).toHaveText(
            caseRepresentativeDetailsObject_content.textOnPage11,
          ),
          expect(page.locator(".manual-link")).toHaveText(
            caseRepresentativeDetailsObject_content.linkOnPage1,
          ),
        ]);
        await commonHelpers.postcodeHandler(page, "Representative");
      }
      await page.click(this.continue);
    },
  };

export default caseRepresentativeDetailsObjectPage;

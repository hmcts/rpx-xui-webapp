import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import { caseFurtherDetailsObject_content } from "../../../fixtures/content/CaseAPI/createCase/caseFurtherDetailsObject_content.ts";
import { caseRegion, Scheme } from "../../../helpers/commonHelpers.ts";

type CaseFurtherDetailsObjectPage = {
  continue: string;
  scheme: string;
  caseRegion: string;
  CICAReferenceNumber: string;
  claimLinkedYes: string;
  claimLinkedNo: string;
  compensationLinkedYes: string;
  compensationLinkedNo: string;
  tribunalFormInTimeYes: string;
  tribunalFormInTimeNo: string;
  explainedYes: string;
  explainedNo: string;
  checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void>;
  fillInFields(
    page: Page,
    schemeSelection: Scheme,
    caseRegionSelection: caseRegion,
    claimsLinked: boolean,
    compensationLinked: boolean,
    tribunalFormsInTime: boolean,
    applicantExplained: boolean,
  ): Promise<void>;
};

const caseFurtherDetailsObjectPage: CaseFurtherDetailsObjectPage = {
  continue: '[type="submit"]',
  scheme: "#cicCaseSchemeCic",
  caseRegion: "#cicCaseRegionCIC",
  CICAReferenceNumber: "#cicCaseCicaReferenceNumber",
  claimLinkedYes: "#cicCaseClaimLinkedToCic_Yes",
  claimLinkedNo: "#cicCaseClaimLinkedToCic_No",
  compensationLinkedYes: "#cicCaseCompensationClaimLinkCIC_Yes",
  compensationLinkedNo: "#cicCaseCompensationClaimLinkCIC_No",
  tribunalFormInTimeYes: "#cicCaseFormReceivedInTime_Yes",
  tribunalFormInTimeNo: "#cicCaseFormReceivedInTime_No",
  explainedYes: "#cicCaseMissedTheDeadLineCic_Yes",
  explainedNo: "#cicCaseMissedTheDeadLineCic_No",

  async checkPageLoads(page: Page, accessibilityTest: boolean): Promise<void> {
    await Promise.all([
      expect(page.locator(".govuk-caption-l")).toHaveText(
        caseFurtherDetailsObject_content.pageHint,
      ),
      expect(page.locator(".govuk-heading-l")).toHaveText(
        caseFurtherDetailsObject_content.pageTitle,
      ),
      expect(page.locator(".form-label").nth(0)).toHaveText(
        caseFurtherDetailsObject_content.textOnPage1,
      ),
      expect(page.locator(".form-label").nth(1)).toHaveText(
        caseFurtherDetailsObject_content.textOnPage2,
      ),
      expect(page.locator(".form-label").nth(2)).toHaveText(
        caseFurtherDetailsObject_content.textOnPage3,
      ),
      expect(page.locator(".form-label").nth(3)).toHaveText(
        caseFurtherDetailsObject_content.yes,
      ),
      expect(page.locator(".form-label").nth(4)).toHaveText(
        caseFurtherDetailsObject_content.no,
      ),
      expect(page.locator(".form-label").nth(6)).toHaveText(
        caseFurtherDetailsObject_content.textOnPage5,
      ),
      expect(page.locator(".form-label").nth(7)).toHaveText(
        caseFurtherDetailsObject_content.yes,
      ),
      expect(page.locator(".form-label").nth(8)).toHaveText(
        caseFurtherDetailsObject_content.no,
      ),
      expect(page.locator(".form-label").nth(9)).toHaveText(
        caseFurtherDetailsObject_content.textOnPage6,
      ),
      expect(page.locator(".form-label").nth(10)).toHaveText(
        caseFurtherDetailsObject_content.yes,
      ),
      expect(page.locator(".form-label").nth(11)).toHaveText(
        caseFurtherDetailsObject_content.no,
      ),
    ]);
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async fillInFields(
    page: Page,
    schemeSelection: Scheme,
    caseRegionSelection: caseRegion,
    claimsLinked: boolean,
    compensationLinked: boolean,
    tribunalFormsInTime: boolean,
    applicantExplained: boolean,
  ): Promise<void> {
    await page.selectOption(this.scheme, schemeSelection);
    await page.selectOption(this.caseRegion, caseRegionSelection);
    if (claimsLinked) {
      await page.click(this.claimLinkedYes);
      await expect(page.locator(".form-label").nth(5)).toHaveText(
        caseFurtherDetailsObject_content.textOnPage4,
      );
      await page.fill(this.CICAReferenceNumber, "1");
    } else {
      await page.click(this.claimLinkedNo);
    }
    if (compensationLinked) {
      await page.click(this.compensationLinkedYes);
    } else {
      await page.click(this.compensationLinkedNo);
    }
    if (tribunalFormsInTime) {
      await page.click(this.tribunalFormInTimeYes);
    } else {
      await page.click(this.tribunalFormInTimeNo);
      await Promise.all([
        expect(page.locator(".form-label").nth(12)).toHaveText(
          caseFurtherDetailsObject_content.textOnPage7,
        ),
        expect(page.locator(".form-label").nth(13)).toHaveText(
          caseFurtherDetailsObject_content.yes,
        ),
        expect(page.locator(".form-label").nth(14)).toHaveText(
          caseFurtherDetailsObject_content.no,
        ),
      ]);

      if (applicantExplained) {
        await page.click(this.explainedYes);
      } else {
        await page.click(this.explainedNo);
      }
    }
    await page.click(this.continue);
  },
};

export default caseFurtherDetailsObjectPage;

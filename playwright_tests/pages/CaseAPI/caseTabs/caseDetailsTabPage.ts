import { expect, Page } from "@playwright/test";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import caseDetailsTabContent from "../../../fixtures/content/CaseAPI/caseTabs/caseDetailsTab_content.ts";
import subjectDetailsContent from "../../../fixtures/content/DSSCreateCase/SubjectDetails_content.ts";
import subjectContactDetailsContent from "../../../fixtures/content/DSSCreateCase/SubjectContactDetails_content.ts";
import representativeDetailsContent from "../../../fixtures/content/DSSCreateCase/RepresentativeDetails_content.ts";

type CaseDetailsTabPage = {
  caseDetailsTab: string;
  checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    representationPresent: boolean,
    caseNumber: string,
  ): Promise<void>;
  changeToCaseDetailsTab(page: Page): Promise<void>;
  checkPageInfo(
    page: Page,
    representationPresent: boolean,
    representationQualified: boolean,
  ): Promise<void>;
};

const caseDetailsTabPage: CaseDetailsTabPage = {
  caseDetailsTab: ".mat-tab-label",

  async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    representationPresent: boolean,
    caseNumber: string,
  ): Promise<void> {
    await Promise.all([
      commonHelpers.checkAllCaseTabs(page, caseNumber),
      expect(page.locator("dl[id='case-details'] h3")).toHaveText(
        caseDetailsTabContent.pageTitle,
      ),
      expect(page.locator(".case-viewer-label").nth(0)).toHaveText(
        caseDetailsTabContent.textOnPage1,
      ),
      expect(page.locator("dl[id='objectSubjects'] h3")).toHaveText(
        caseDetailsTabContent.subHeading1,
      ),
      ...Array.from({ length: 5 }, (_, index) => {
        const textOnPage = (caseDetailsTabContent as any)[
          `textOnPage${index + 2}`
        ];
        return expect(
          page.locator(".case-viewer-label").nth(index + 1),
        ).toHaveText(textOnPage);
      }),
    ]);
    if (representationPresent) {
      await Promise.all([
        expect(page.locator("dl[id='applicantDetails'] h3")).toHaveText(
          caseDetailsTabContent.subHeading2,
        ),
        ...Array.from({ length: 7 }, (_, index) => {
          const textOnPage = (caseDetailsTabContent as any)[
            `textOnPage${index + 6}`
          ];
          return expect(
            page.locator(".case-viewer-label").nth(index + 6),
          ).toHaveText(textOnPage);
        }),
      ]);
    }
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async changeToCaseDetailsTab(page: Page): Promise<void> {
    await page.locator(this.caseDetailsTab).nth(3).click();
  },

  async checkPageInfo(
    page: Page,
    representationPresent: boolean,
    representationQualified: boolean,
  ): Promise<void> {
    await Promise.all([
      expect(
        page.locator("td[id='case-viewer-field-read--cicCaseFullName']"),
      ).toHaveText(subjectDetailsContent.name),
      expect(
        page.locator("td[id='case-viewer-field-read--cicCaseDateOfBirth']"),
      ).toHaveText(await commonHelpers.convertDate(true)),
      expect(
        page.locator("ccd-read-email-field[class='ng-star-inserted']").nth(0),
      ).toHaveText(subjectContactDetailsContent.emailAddress),
      expect(
        page.locator("td[id='case-viewer-field-read--cicCasePhoneNumber']"),
      ).toHaveText(subjectContactDetailsContent.contactNumber),
      expect(
        page
          .locator("ccd-read-multi-select-list-field[class='ng-star-inserted']")
          .nth(0),
      ).toHaveText("Subject"),
    ]);
    if (representationPresent) {
      await Promise.all([
        expect(
          page
            .locator(
              "ccd-read-multi-select-list-field[class='ng-star-inserted']",
            )
            .nth(1),
        ).toHaveText("Representative"),
        expect(
          page.locator(
            "td[id='case-viewer-field-read--cicCaseRepresentativeFullName']",
          ),
        ).toHaveText(representativeDetailsContent.fullName),
        expect(
          page.locator(
            "td[id='case-viewer-field-read--cicCaseRepresentativeOrgName']",
          ),
        ).toHaveText(representativeDetailsContent.Organisation),
        expect(
          page.locator(
            "td[id='case-viewer-field-read--cicCaseRepresentativePhoneNumber']",
          ),
        ).toHaveText(representativeDetailsContent.contactNumber),
        expect(
          page.locator("ccd-read-email-field[class='ng-star-inserted']").nth(1),
        ).toHaveText(representativeDetailsContent.emailAddress),
        expect(
          page.locator(
            "ccd-read-fixed-radio-list-field[class='ng-star-inserted']",
          ),
        ).toHaveText("Email"),
      ]);
      if (representationQualified) {
        await expect(page.locator("ccd-read-yes-no-field")).toHaveText("Yes");
      } else {
        await expect(page.locator("ccd-read-yes-no-field")).toHaveText("No");
      }
    }
  },
};

export default caseDetailsTabPage;

import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import commonHelpers from "../../../helpers/commonHelpers.ts";
import summaryTabContent from "../../../fixtures/content/CaseAPI/caseTabs/summaryTab_content.ts";
import subjectDetailsContent from "../../../fixtures/content/DSSCreateCase/SubjectDetails_content.ts";
import subjectContactDetailsContent from "../../../fixtures/content/DSSCreateCase/SubjectContactDetails_content.ts";
import representativeDetailsContent from "../../../fixtures/content/DSSCreateCase/RepresentativeDetails_content.ts";

type SummaryTabPage = {
  summaryTab: string;
  checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    representationPresent: boolean,
    caseNumber: string,
  ): Promise<void>;
  changeToSummaryTab(page: Page): Promise<void>;
  checkPageInfo(
    page: Page,
    caseNumber: string,
    representationPresent: boolean,
    representationQualified: boolean,
  ): Promise<void>;
};

const summaryTabPage: SummaryTabPage = {
  summaryTab: ".mat-tab-label",

  async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    representationPresent: boolean,
    caseNumber: string,
  ): Promise<void> {
    await Promise.all([
      commonHelpers.checkAllCaseTabs(page, caseNumber),
      expect(page.locator("markdown[class='markdown'] h4")).toHaveText(
        summaryTabContent.caseState,
      ),
      expect(page.locator("dl[id='case-details'] h3")).toHaveText(
        summaryTabContent.subHeading1,
      ),
      ...Array.from({ length: 4 }, (_, index) => {
        const textOnPage = (summaryTabContent as any)[`textOnPage${index + 1}`];
        return expect(page.locator(".case-viewer-label").nth(index)).toHaveText(
          textOnPage,
        );
      }),
    ]);
    if (representationPresent) {
      await commonHelpers.checkVisibleAndPresent(
        page.locator(`h3:text-is("${summaryTabContent.subHeading2}")`),
        1,
      );
      await Promise.all([
        ...Array.from({ length: 5 }, (_, index) => {
          const textOnPage = (summaryTabContent as any)[
            `textOnPage${index + 5}`
          ];
          return expect(
            page.locator(".case-viewer-label").nth(index + 4),
          ).toHaveText(textOnPage);
        }),
      ]);
    }

    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async changeToSummaryTab(page: Page): Promise<void> {
    await page.locator(this.summaryTab).nth(1).click();
  },

  async checkPageInfo(
    page: Page,
    caseNumber: string,
    representationPresent: boolean,
    representationQualified: boolean,
  ): Promise<void> {
    await Promise.all([
      expect(
        page.locator("td[id='case-viewer-field-read--cicCaseFullName']"),
      ).toHaveText(subjectDetailsContent.name),
      expect(
        page.locator("ccd-read-date-field[class='ng-star-inserted']"),
      ).toHaveText(await commonHelpers.convertDate(true)),
      expect(
        page.locator("ccd-read-email-field[class='ng-star-inserted']").nth(0),
      ).toHaveText(subjectContactDetailsContent.emailAddress),
      expect(
        page.locator("ccd-read-text-field[class='ng-star-inserted']").nth(1),
      ).toHaveText(caseNumber),
    ]);
    if (representationPresent) {
      await Promise.all([
        expect(
          page.locator("ccd-read-text-field[class='ng-star-inserted']").nth(2),
        ).toHaveText(representativeDetailsContent.Organisation),
        expect(
          page.locator("ccd-read-text-field[class='ng-star-inserted']").nth(3),
        ).toHaveText(representativeDetailsContent.fullName),
        expect(
          page.locator("ccd-read-text-field[class='ng-star-inserted']").nth(4),
        ).toHaveText(representativeDetailsContent.contactNumber),
        expect(
          page.locator("ccd-read-email-field[class='ng-star-inserted']").nth(1),
        ).toHaveText(representativeDetailsContent.emailAddress),
      ]);
      if (representationQualified) {
        await expect(page.locator("ccd-read-yes-no-field").nth(0)).toHaveText(
          "Yes",
        );
      } else {
        await expect(page.locator("ccd-read-yes-no-field").nth(0)).toHaveText(
          "No",
        );
      }
    }
  },
};

export default summaryTabPage;

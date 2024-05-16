import { expect, Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import commonHelpers, {
  caseRegion,
  Category,
  ContactPreference,
  Scheme,
  SubCategory,
} from "../../../helpers/commonHelpers.ts";
import submit_content from "../../../fixtures/content/CaseAPI/createCase/submit_content.ts";
import caseDateObjects_content from "../../../fixtures/content/CaseAPI/createCase/casedateObjects_content.ts";
import caseObjectsContacts_content from "../../../fixtures/content/CaseAPI/createCase/caseObjectsContacts_content.ts";
import caseSubjectDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseSubjectDetailsObject_content.ts";
import caseObjectContacts_content from "../../../fixtures/content/CaseAPI/createCase/caseObjectContacts_content.ts";
import caseApplicantDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseApplicantDetailsObject_content.ts";
import caseRepresentativeDetailsObject_content from "../../../fixtures/content/CaseAPI/createCase/caseRepresentativeDetailsObject_content.ts";
import path from "path";
import config from "../../../config.ts";

type SubmitPage = {
  saveAndContinue: string;
  checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    contactPreference: ContactPreference,
    applicant: boolean,
    representative: boolean,
    multipleFiles: boolean,
    tribunalFormsInTime: boolean,
  ): Promise<void>;
  handleStandardLabels(page: Page, tribunalFormsInTime: boolean): Promise<void>;
  handleContactLabels(
    page: Page,
    applicant: boolean,
    representative: boolean,
    contactPreference: ContactPreference,
  ): Promise<void>;
  handleApplicantLabels(page: Page): Promise<void>;
  handleRepresentativeLabels(page: Page): Promise<void>;
  handleDocumentLabels(page: Page, multipleFiles: boolean): Promise<void>;
  checkValidInfo(
    page: Page,
    contactPreference: ContactPreference,
    applicant: boolean,
    representative: boolean,
    multipleFiles: boolean,
    category: Category,
    subCategory: SubCategory,
    scheme: Scheme,
    caseRegion: caseRegion,
    representativeQualified: boolean,
    claimsLinked: boolean,
    compensationLinked: boolean,
    tribunalFormsInTime: boolean,
    applicantExplained: boolean,
  ): Promise<void>;
  handleStandardInfo(
    page: Page,
    category: Category,
    subCategory: SubCategory,
    scheme: Scheme,
    caseRegion: caseRegion,
    values: number[],
    claimsLinked: boolean,
    compensationLinked: boolean,
    tribunalFormsInTime: boolean,
    applicantExplained: boolean,
  ): Promise<void>;
  handleContactInfo(
    page: Page,
    applicant: boolean,
    representative: boolean,
    contactPreference: ContactPreference,
  ): Promise<void>;
  handleApplicantInfo(page: Page): Promise<void>;
  handleRepresentativeInfo(
    page: Page,
    representativeQualified: boolean,
  ): Promise<number[]>;
  handleDocumentInfo(page: Page, multipleFiles: boolean): Promise<void>;
};

const submitPage: SubmitPage = {
  saveAndContinue: '[type="submit"]',

  async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    contactPreference: ContactPreference,
    applicant: boolean,
    representative: boolean,
    multipleFiles: boolean,
    tribunalFormsInTime: boolean,
  ): Promise<void> {
    await this.handleStandardLabels(page, tribunalFormsInTime);
    await this.handleContactLabels(
      page,
      applicant,
      representative,
      contactPreference,
    );
    if (applicant) {
      await this.handleApplicantLabels(page);
    }
    if (representative) {
      await this.handleRepresentativeLabels(page);
    }
    await this.handleDocumentLabels(page, multipleFiles);
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async handleStandardLabels(
    page: Page,
    tribunalFormsInTime: boolean,
  ): Promise<void> {
    await Promise.all([
      expect(page.locator(".govuk-heading-l")).toHaveText(submit_content.title),
      expect(page.locator(".heading-h2")).toHaveText(submit_content.subTitle1),
      expect(page.locator(".text-16").nth(0)).toHaveText(
        submit_content.textOnPage1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage2}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage3}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage4}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage5}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage6}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage7}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage8}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage9}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage45}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage46}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage47}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage48}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage49}")`,
        ),
        1,
      ),
    ]);
    if (!tribunalFormsInTime) {
      await commonHelpers.checkVisibleAndPresent(
        page.locator(
          `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage50}")`,
        ),
        1,
      );
    }
  },

  async handleContactLabels(
    page: Page,
    applicant: boolean,
    representative: boolean,
    contactPreference: ContactPreference,
  ): Promise<void> {
    switch (contactPreference) {
      case "Post":
        let count = 1;
        if (applicant && representative) {
          count = 3;
          // === Checking for subject's address field ===
          await Promise.all([
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage9}")`,
              ),
              1,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.complex-panel-title > dt > span.text-16:text-is("${submit_content.textOnPage9}")`,
              ),
              1,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage21}")`,
              ),
              1,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.complex-panel-title > dt > span.text-16:text-is("${submit_content.textOnPage21}")`,
              ),
              1,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage32}")`,
              ),
              1,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.complex-panel-title > dt > span.text-16:text-is("${submit_content.textOnPage32}")`,
              ),
              1,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage10}")`,
              ),
              count,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage11}")`,
              ),
              count,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage12}")`,
              ),
              count,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage13}")`,
              ),
              count,
            ),
          ]);
        } else if (applicant && !representative) {
          count = 2;
          // === Checking for subject's address field ===
          await Promise.all([
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage9}")`,
              ),
              1,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.complex-panel-title > dt > span.text-16:text-is("${submit_content.textOnPage9}")`,
              ),
              1,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage21}")`,
              ),
              1,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.complex-panel-title > dt > span.text-16:text-is("${submit_content.textOnPage21}")`,
              ),
              1,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage10}")`,
              ),
              count,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage11}")`,
              ),
              count,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage12}")`,
              ),
              count,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage13}")`,
              ),
              count,
            ),
          ]);
        } else if (representative && !applicant) {
          count = 2;
          // === Checking for subject's address field ===
          await Promise.all([
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage9}")`,
              ),
              1,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.complex-panel-title > dt > span.text-16:text-is("${submit_content.textOnPage9}")`,
              ),
              1,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage32}")`,
              ),
              1,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.complex-panel-title > dt > span.text-16:text-is("${submit_content.textOnPage32}")`,
              ),
              1,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage10}")`,
              ),
              count,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage11}")`,
              ),
              count,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage12}")`,
              ),
              count,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage13}")`,
              ),
              count,
            ),
          ]);
        } else {
          // === Checking for subject's address field ===
          await Promise.all([
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage9}")`,
              ),
              count,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `.complex-panel-title > dt > span.text-16:text-is("${submit_content.textOnPage9}")`,
              ),
              count,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage10}")`,
              ),
              count,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage11}")`,
              ),
              count,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage12}")`,
              ),
              count,
            ),
            commonHelpers.checkVisibleAndPresent(
              page.locator(
                `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage13}")`,
              ),
              count,
            ),
          ]);
        }
        break;
      case "Email":
        await commonHelpers.checkVisibleAndPresent(
          page.locator(
            `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage15}")`,
          ),
          1,
        );
        if (applicant) {
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage20}")`,
            ),
            1,
          );
        }
        if (representative) {
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage31}")`,
            ),
            1,
          );
        }
        break;
      default:
        console.log("You have not selected a valid contact type.");
        process.exit(1);
    }
  },

  async handleApplicantLabels(page: Page): Promise<void> {
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage16}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage17}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage18}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage19}")`,
        ),
        1,
      ),
    ]);
  },

  async handleRepresentativeLabels(page: Page): Promise<void> {
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage26}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage27}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage28}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage29}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage30}")`,
        ),
        1,
      ),
    ]);
  },

  async handleDocumentLabels(
    page: Page,
    multipleFiles: boolean,
  ): Promise<void> {
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `th.case-field-label > span.text-16:text-is("${submit_content.textOnPage38}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `.complex-panel-title > dt > span.text-16:text-is("${submit_content.textOnPage39}")`,
        ),
        1,
      ),
    ]);
    switch (multipleFiles) {
      default:
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage40}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage41}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage42}")`,
            ),
            1,
          ),
        ]);
        break;
      case true: // uploaded 3 documents
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.complex-panel-title > dt > span.text-16:text-is("${submit_content.textOnPage43}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.complex-panel-title > dt > span.text-16:text-is("${submit_content.textOnPage44}")`,
            ),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage40}")`,
            ),
            3,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage41}")`,
            ),
            3,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `th#complex-panel-simple-field-label > span.text-16:text-is("${submit_content.textOnPage42}")`,
            ),
            3,
          ),
        ]);
        break;
    }
  },

  async checkValidInfo(
    page: Page,
    contactPreference: ContactPreference,
    applicant: boolean,
    representative: boolean,
    multipleFiles: boolean,
    category: Category,
    subCategory: SubCategory,
    scheme: Scheme,
    caseRegion: caseRegion,
    representativeQualified: boolean,
    claimsLinked: boolean,
    compensationLinked: boolean,
    tribunalFormsInTime: boolean,
    applicantExplained: boolean,
  ): Promise<void> {
    let values = [0, 0]; // Number of [Yes, No] values on a page
    if (representative) {
      // Must come first to add to the yes no counter before validation.
      values = await this.handleRepresentativeInfo(
        page,
        representativeQualified,
      );
    }
    await this.handleStandardInfo(
      page,
      category,
      subCategory,
      scheme,
      caseRegion,
      values,
      claimsLinked,
      compensationLinked,
      tribunalFormsInTime,
      applicantExplained,
    );
    await this.handleContactLabels(
      page,
      applicant,
      representative,
      contactPreference,
    );
    if (applicant) {
      await this.handleApplicantInfo(page);
    }
    await this.handleDocumentInfo(page, multipleFiles);
    await page.click(this.saveAndContinue);
  },

  async handleStandardInfo(
    page: Page,
    category: Category,
    subCategory: SubCategory,
    scheme: Scheme,
    caseRegion: caseRegion,
    values: number[],
    claimsLinked: boolean,
    compensationLinked: boolean,
    tribunalFormsInTime: boolean,
    applicantExplained: boolean,
  ): Promise<void> {
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `ccd-read-fixed-list-field > span.text-16:text-is("${category}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `ccd-read-fixed-list-field > span.text-16:text-is("${subCategory}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `ccd-read-date-field > span.text-16:text-is("${caseDateObjects_content.day} ${await commonHelpers.shortMonths(parseInt(caseDateObjects_content.month))} ${caseDateObjects_content.year}")`,
        ),
        1,
      ),
    ]);
    if (!(subCategory === "Fatal" || subCategory === "Minor")) {
      await commonHelpers.checkVisibleAndPresent(
        page.locator(
          `tbody > tr > td > span.text-16:text-is("${caseObjectsContacts_content.textOnPage2}")`,
        ),
        2,
      );
    } else {
      await commonHelpers.checkVisibleAndPresent(
        page.locator(
          `tbody > tr > td > span.text-16:text-is("${caseObjectsContacts_content.textOnPage2}")`,
        ),
        1,
      );
    }
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `ccd-field-read-label > div > ccd-read-text-field > span.text-16:text-is("${caseSubjectDetailsObject_content.name}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `ccd-field-read-label > div > ccd-read-text-field > span.text-16:text-is("${caseSubjectDetailsObject_content.contactNumber}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `ccd-read-date-field > span.text-16:text-is("${caseSubjectDetailsObject_content.dayOfBirth} ${await commonHelpers.shortMonths(parseInt(caseSubjectDetailsObject_content.monthOfBirth))} ${caseSubjectDetailsObject_content.yearOfBirth}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `ccd-field-read-label > div > ccd-read-fixed-list-field > span.text-16:text-is("${scheme}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `ccd-field-read-label > div > ccd-read-fixed-list-field > span.text-16:text-is("${caseRegion}")`,
        ),
        1,
      ),
    ]);

    if (claimsLinked) {
      values[0]++;
    } else {
      values[1]++;
    }
    if (compensationLinked) {
      values[0]++;
    } else {
      values[1]++;
    }
    if (tribunalFormsInTime) {
      values[0]++;
    } else {
      values[1]++;
      if (applicantExplained) {
        values[0]++;
      } else {
        values[1]++;
      }
    }
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `ccd-field-read-label > div > ccd-read-yes-no-field > span.text-16:text-is("Yes")`,
        ),
        values[0],
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `ccd-field-read-label > div > ccd-read-yes-no-field > span.text-16:text-is("No")`,
        ),
        values[1],
      ),
    ]);
  },
  async handleContactInfo(
    page: Page,
    applicant: boolean,
    representative: boolean,
    contactPreference: ContactPreference,
  ): Promise<void> {
    switch (contactPreference) {
      case "Post":
        let count = 1;
        if (applicant && representative) {
          count = 3;
        } else if (
          (applicant && !representative) ||
          (representative && !applicant)
        ) {
          count = 2;
        }
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `ccd-field-read-label > div > ccd-read-text-field > span.text-16:text-is("${caseObjectContacts_content.buildingAndStreet}")`,
            ),
            count,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `ccd-field-read-label > div > ccd-read-text-field > span.text-16:text-is("${caseObjectContacts_content.townOrCity}")`,
            ),
            count,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `ccd-field-read-label > div > ccd-read-text-field > span.text-16:text-is("${caseObjectContacts_content.country}")`,
            ),
            count,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `ccd-field-read-label > div > ccd-read-text-field > span.text-16:text-is("${caseObjectContacts_content.postCode}")`,
            ),
            count,
          ),
        ]);
        break;
      case "Email":
        let counter = 1;
        if (applicant) {
          counter++;
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `ccd-field-read-label > div > ccd-read-email-field > a:text-is("${caseApplicantDetailsObject_content.emailAddress}")`,
            ),
            1,
          );
        }
        if (representative) {
          counter++;
          await commonHelpers.checkVisibleAndPresent(
            page.locator(
              `ccd-field-read-label > div > ccd-read-email-field > a:text-is("${caseRepresentativeDetailsObject_content.emailAddress}")`,
            ),
            1,
          );
        }
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `ccd-field-read-label > div > ccd-read-fixed-radio-list-field > span.text-16:text-is("${caseSubjectDetailsObject_content.textOnPage9}")`,
            ),
            counter,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `ccd-field-read-label > div > ccd-read-email-field > a:text-is("${caseSubjectDetailsObject_content.emailAddress}")`,
            ),
            1,
          ),
        ]);
        break;
      default:
        console.log("You have not selected a valid contact type.");
        process.exit(1);
    }
  },

  async handleApplicantInfo(page: Page): Promise<void> {
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `tbody > tr > td > span.text-16:text-is("${caseObjectsContacts_content.textOnPage4}")`,
        ),
        2,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `ccd-field-read-label > div > ccd-read-text-field > span.text-16:text-is("${caseApplicantDetailsObject_content.name}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `ccd-field-read-label > div > ccd-read-text-field > span.text-16:text-is("${caseApplicantDetailsObject_content.contactNumber}")`,
        ),
        1,
      ),
    ]);
  },

  async handleRepresentativeInfo(
    page: Page,
    representativeQualified: boolean,
  ): Promise<number[]> {
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `tbody > tr > td > span.text-16:text-is("${caseObjectsContacts_content.textOnPage6}")`,
        ),
        2,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `ccd-field-read-label > div > ccd-read-text-field > span.text-16:text-is("${caseRepresentativeDetailsObject_content.name}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `ccd-field-read-label > div > ccd-read-text-field > span.text-16:text-is("${caseRepresentativeDetailsObject_content.organisation}")`,
        ),
        1,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `ccd-field-read-label > div > ccd-read-text-field > span.text-16:text-is("${caseRepresentativeDetailsObject_content.contactNumber}")`,
        ),
        1,
      ),
    ]);
    let yes = 0;
    let no = 0;
    if (representativeQualified) {
      yes++;
    } else {
      no++;
    }
    return [yes, no];
  },

  async handleDocumentInfo(page: Page, multipleFiles: boolean): Promise<void> {
    let count = 1;
    if (multipleFiles) {
      count = 3;
      await Promise.all([
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `ccd-field-read-label > div > ccd-read-document-field > a:text-is("${path.basename(config.testWordFile)}")`,
          ),
          1,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `ccd-field-read-label > div > ccd-read-document-field > a:text-is("${path.basename(config.testFile)}")`,
          ),
          1,
        ),
      ]);
    }
    await Promise.all([
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `ccd-field-read-label > div > ccd-read-fixed-list-field > span.text-16:text-is("A - Application Form")`,
        ),
        count,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `ccd-field-read-label > div > ccd-read-text-area-field > span:text-is("Lorem ipsum text A - Application Form")`,
        ),
        count,
      ),
      commonHelpers.checkVisibleAndPresent(
        page.locator(
          `ccd-field-read-label > div > ccd-read-document-field > a:text-is("${path.basename(config.testPdfFile)}")`,
        ),
        1,
      ),
    ]);
  },
};

export default submitPage;

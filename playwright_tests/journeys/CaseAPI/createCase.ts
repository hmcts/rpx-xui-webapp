import { Page } from "@playwright/test";
import { UserRole } from "../../config.ts";
import {
  allEvents,
  caseRegion,
  Category,
  ContactPreference,
  Scheme,
  SubCategory,
} from "../../helpers/commonHelpers.ts";
import caseAPILoginPage from "../../pages/CaseAPI/caseList/caseAPILoginPage.ts";
import casesPage from "../../pages/CaseAPI/caseList/casesPage.ts";
import caseFilterPage from "../../pages/CaseAPI/createCase/caseFilterPage.ts";
import caseCategorisationDetailsPage from "../../pages/CaseAPI/createCase/caseCategorisationDetailsPage.ts";
import caseDateObjectsPage from "../../pages/CaseAPI/createCase/caseDateObjectsPage.ts";
import caseObjectsSubjectsPage from "../../pages/CaseAPI/createCase/caseObjectsSubjectsPage.ts";
import caseSubjectDetailsObjectPage from "../../pages/CaseAPI/createCase/caseSubjectDetailsObjectPage.ts";
import caseApplicantDetailsObjectPage from "../../pages/CaseAPI/createCase/caseApplicantDetailsObjectPage.ts";
import caseRepresentativeDetailsObjectPage from "../../pages/CaseAPI/createCase/caseRepresentativeDetailsObjectPage.ts";
import caseObjectsContactsPage from "../../pages/CaseAPI/createCase/caseObjectsContactsPage.ts";
import caseDocumentsUploadObjectPage from "../../pages/CaseAPI/createCase/caseDocumentsUploadObjectPage.ts";
import caseFurtherDetailsObjectPage from "../../pages/CaseAPI/createCase/caseFurtherDetailsObjectPage.ts";
import submitPage from "../../pages/CaseAPI/createCase/submitPage.ts";
import createCaseConfirmPage from "../../pages/CaseAPI/createCase/confirmPage.ts";
import historyTabPage from "../../pages/CaseAPI/caseTabs/historyTabPage.ts";
import stateTab_content from "../../fixtures/content/CaseAPI/caseTabs/stateTab_content.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";

type CreateCase = {
  createCase(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    category: Category,
    subCategory: SubCategory,
    representative: boolean,
    applicant: boolean,
    contactPreference: ContactPreference,
    representativeQualified: boolean,
    multipleFiles: boolean,
    schemeSelection: Scheme,
    caseRegionSelection: caseRegion,
    claimsLinked: boolean,
    compensationLinked: boolean,
    tribunalFormsInTime: boolean,
    applicantExplained: boolean,
    needLogin: boolean,
  ): Promise<string>;
  verifyDetails(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    caseNumber: string,
    previousEvents: allEvents[],
    eventTimes: string[],
  ): Promise<void>;
};

const createCase: CreateCase = {
  async createCase(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    category: Category,
    subCategory: SubCategory,
    representative: boolean,
    applicant: boolean,
    contactPreference: ContactPreference,
    representativeQualified: boolean,
    multipleFiles: boolean,
    schemeSelection: Scheme,
    caseRegionSelection: caseRegion,
    claimsLinked: boolean,
    compensationLinked: boolean,
    tribunalFormsInTime: boolean,
    applicantExplained: boolean,
    needLogin: boolean,
  ): Promise<string> {
    if (needLogin) {
      await caseAPILoginPage.SignInUser(page, user);
      await casesPage.checkPageLoads(page, accessibilityTest);
    }
    await casesPage.createCase(page);
    await caseFilterPage.checkPageLoads(page, accessibilityTest);
    await caseFilterPage.fillInFields(page);
    await caseCategorisationDetailsPage.checkPageLoads(page, accessibilityTest);
    await caseCategorisationDetailsPage.fillInFields(
      page,
      category,
      subCategory,
    );
    await caseDateObjectsPage.checkPageLoads(page, accessibilityTest);
    await caseDateObjectsPage.fillInFields(page);
    await caseObjectsSubjectsPage.checkPageLoads(page, accessibilityTest);
    await caseObjectsSubjectsPage.fillInFields(
      page,
      representative,
      applicant,
      subCategory,
    );
    await caseSubjectDetailsObjectPage.checkPageLoads(page, accessibilityTest);
    await caseSubjectDetailsObjectPage.fillInFields(page, contactPreference);
    if (applicant) {
      await caseApplicantDetailsObjectPage.checkPageLoads(
        page,
        accessibilityTest,
      );
      await caseApplicantDetailsObjectPage.fillInFields(
        page,
        contactPreference,
      );
    }
    if (representative) {
      await caseRepresentativeDetailsObjectPage.checkPageLoads(
        page,
        accessibilityTest,
      );
      await caseRepresentativeDetailsObjectPage.fillInFields(
        page,
        contactPreference,
        representativeQualified,
      );
    }
    await caseObjectsContactsPage.checkPageLoads(page, accessibilityTest);
    await caseObjectsContactsPage.fillInFields(
      page,
      subCategory,
      representative,
      applicant,
    );
    await caseDocumentsUploadObjectPage.checkPageLoads(page, accessibilityTest);
    await caseDocumentsUploadObjectPage.fillInFields(page, multipleFiles);
    await caseFurtherDetailsObjectPage.checkPageLoads(page, accessibilityTest);
    await caseFurtherDetailsObjectPage.fillInFields(
      page,
      schemeSelection,
      caseRegionSelection,
      claimsLinked,
      compensationLinked,
      tribunalFormsInTime,
      applicantExplained,
    );
    await submitPage.checkPageLoads(
      page,
      accessibilityTest,
      contactPreference,
      applicant,
      representative,
      multipleFiles,
      tribunalFormsInTime,
    );
    await submitPage.checkValidInfo(
      page,
      contactPreference,
      applicant,
      representative,
      multipleFiles,
      category,
      subCategory,
      schemeSelection,
      caseRegionSelection,
      representativeQualified,
      claimsLinked,
      compensationLinked,
      tribunalFormsInTime,
      applicantExplained,
    );
    await createCaseConfirmPage.checkPageLoads(page, accessibilityTest);
    return await createCaseConfirmPage.returnCaseNumber(page);
  },

  async verifyDetails(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    caseNumber: string,
    previousEvents: allEvents[],
    eventTimes: string[],
  ): Promise<void> {
    previousEvents.push(events_content.createCase);
    eventTimes.push(await createCaseConfirmPage.closeAndReturnToCase(page));
    await historyTabPage.checkPageLoads(
      page,
      accessibilityTest,
      caseNumber,
      stateTab_content.submittedState,
    );
    await historyTabPage.checkPageInfo(
      page,
      previousEvents,
      eventTimes,
      user,
      stateTab_content.submittedState,
    );
  },
};

export default createCase;

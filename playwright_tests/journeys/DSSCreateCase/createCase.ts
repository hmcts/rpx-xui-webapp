import { Page } from "@playwright/test";
import caseAPILoginPage from "../../pages/CaseAPI/caseList/caseAPILoginPage.ts";
import casesPage from "../../pages/CaseAPI/caseList/casesPage.ts";
import verifyCaseDetails from "./DSSVerifyDetails.ts";
import landingPage from "../../pages/DSSCreateCase/landingPage.ts";
import loginPage from "../../pages/DSSCreateCase/loginPage.ts";
import subjectDetailsPage from "../../pages/DSSCreateCase/subjectDetailsPage.ts";
import subjectContactDetailsPage from "../../pages/DSSCreateCase/subjectContactDetailsPage.ts";
import representationPage from "../../pages/DSSCreateCase/representationPage.ts";
import representationQualifiedPage from "../../pages/DSSCreateCase/representationQualifiedPage.ts";
import representativeDetailsPage from "../../pages/DSSCreateCase/representativeDetailsPage.ts";
import uploadAppealFormPage from "../../pages/DSSCreateCase/uploadAppealFormPage.ts";
import uploadSupportingDocumentsPage from "../../pages/DSSCreateCase/uploadSupportingDocumentsPage.ts";
import uploadOtherInformationPage from "../../pages/DSSCreateCase/uploadOtherInformationPage.ts";
import checkYourAnswersPage from "../../pages/DSSCreateCase/checkYourAnswersPage.ts";
import applicationSubmittedPage from "../../pages/DSSCreateCase/applicationSubmittedPage.ts";
import stateTab_content from "../../fixtures/content/CaseAPI/caseTabs/stateTab_content.ts";

type CreateFeApplication = {
  createFEApplication(
    page: Page,
    cy: boolean,
    representationPresent: boolean,
    representationQualified: boolean,
    uploadOtherInfo: boolean,
    multipleDocuments: boolean,
    completeApplication: boolean,
    backButtonJourney: boolean,
    accessibilityTest: boolean,
    errorMessaging: boolean,
  ): Promise<string | void>;
  normalFEFlow(
    page: Page,
    cy: boolean,
    representationPresent: boolean,
    representationQualified: boolean,
    uploadOtherInfo: boolean,
    multipleDocuments: boolean,
    completeApplication: boolean,
    backButtonJourney: boolean,
    accessibilityTest: boolean,
  ): Promise<string | void>;
  handleRepresentationLogic(
    page: Page,
    cy: boolean,
    representationQualified: boolean,
    accessibilityTest: boolean,
  ): Promise<void>;
  handleCompleteApplication(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
    representationPresent: boolean,
    representationQualified: boolean,
    uploadOtherInfo: boolean,
    multipleDocuments: boolean,
  ): Promise<string>;
  handleBackButtonJourney(page: Page): Promise<void>;
};

const createFEApplication: CreateFeApplication = {
  async createFEApplication(
    page: Page,
    cy: boolean,
    representationPresent: boolean,
    representationQualified: boolean,
    uploadOtherInfo: boolean,
    multipleDocuments: boolean,
    completeApplication: boolean,
    backButtonJourney: boolean,
    accessibilityTest: boolean,
    errorMessaging: boolean,
  ): Promise<string | void> {
    switch (errorMessaging) {
      default:
        return await createFEApplication.normalFEFlow(
          page,
          cy,
          representationPresent,
          representationQualified,
          uploadOtherInfo,
          multipleDocuments,
          completeApplication,
          backButtonJourney,
          accessibilityTest,
        );
      case true:
        await landingPage.seeTheLandingPage(page, cy, accessibilityTest);
        await landingPage.continueOn(page);
        await loginPage.SignInUser(page);
        await subjectDetailsPage.checkPageLoads(page, cy, accessibilityTest);
        await subjectDetailsPage.triggerErrorMessages(page, cy);
        await subjectDetailsPage.fillInFields(page);
        await subjectContactDetailsPage.checkPageLoads(
          page,
          cy,
          accessibilityTest,
        );
        await subjectContactDetailsPage.triggerErrorMessages(page, cy);
        await subjectContactDetailsPage.fillInFields(page);
        await representationPage.checkPageLoads(page, cy, accessibilityTest);
        await representationPage.triggerErrorMessages(page, cy);
        await representationPage.fillInFields(page, representationPresent);
        if (representationPresent) {
          await representationQualifiedPage.checkPageLoads(
            page,
            cy,
            accessibilityTest,
          );
          await representationQualifiedPage.triggerErrorMessages(page, cy);
          await representationQualifiedPage.fillInFields(
            page,
            representationQualified,
          );
          await representativeDetailsPage.checkPageLoads(
            page,
            cy,
            accessibilityTest,
          );
          await representativeDetailsPage.triggerErrorMessages(page, cy);
          await representativeDetailsPage.fillInFields(page);
        }

        await uploadAppealFormPage.checkPageLoads(page, cy, accessibilityTest);
        await uploadAppealFormPage.triggerErrorMessages(page, cy);
        await uploadAppealFormPage.uploadDocumentsSection(
          page,
          cy,
          multipleDocuments,
        );
        await uploadSupportingDocumentsPage.checkPageLoads(
          page,
          cy,
          accessibilityTest,
        );
        await uploadSupportingDocumentsPage.triggerErrorMessages(page, cy);
        await uploadSupportingDocumentsPage.uploadDocumentsSection(
          page,
          cy,
          multipleDocuments,
        );
        await uploadOtherInformationPage.checkPageLoads(
          page,
          cy,
          accessibilityTest,
        );
        await uploadOtherInformationPage.triggerErrorMessages(page, cy);
        await uploadOtherInformationPage.uploadDocumentsSection(
          page,
          cy,
          uploadOtherInfo,
          multipleDocuments,
        );
        await page.click('button[name="opt-out-button"]');
    }
  },

  async normalFEFlow(
    page: Page,
    cy: boolean,
    representationPresent: boolean,
    representationQualified: boolean,
    uploadOtherInfo: boolean,
    multipleDocuments: boolean,
    completeApplication: boolean,
    backButtonJourney: boolean,
    accessibilityTest: boolean,
  ): Promise<string | void> {
    await landingPage.seeTheLandingPage(page, cy, accessibilityTest);
    await landingPage.continueOn(page);
    await loginPage.SignInUser(page);
    await subjectDetailsPage.checkPageLoads(page, cy, accessibilityTest);
    await subjectDetailsPage.fillInFields(page);
    await subjectContactDetailsPage.checkPageLoads(page, cy, accessibilityTest);
    await subjectContactDetailsPage.fillInFields(page);
    await representationPage.checkPageLoads(page, cy, accessibilityTest);
    await representationPage.fillInFields(page, representationPresent);
    if (representationPresent) {
      await createFEApplication.handleRepresentationLogic(
        page,
        cy,
        representationQualified,
        accessibilityTest,
      );
    }
    await uploadAppealFormPage.checkPageLoads(page, cy, accessibilityTest);
    await uploadAppealFormPage.uploadDocumentsSection(
      page,
      cy,
      multipleDocuments,
    );
    await uploadSupportingDocumentsPage.checkPageLoads(
      page,
      cy,
      accessibilityTest,
    );
    await uploadSupportingDocumentsPage.uploadDocumentsSection(
      page,
      cy,
      multipleDocuments,
    );
    await uploadOtherInformationPage.checkPageLoads(
      page,
      cy,
      accessibilityTest,
    );
    await uploadOtherInformationPage.uploadDocumentsSection(
      page,
      cy,
      uploadOtherInfo,
      multipleDocuments,
    );
    await page.click('button[name="opt-out-button"]');
    await checkYourAnswersPage.checkPageLoads(
      page,
      cy,
      representationPresent,
      accessibilityTest,
    );
    await checkYourAnswersPage.checkValidInfoAllFields(
      page,
      cy,
      representationPresent,
      representationQualified,
      uploadOtherInfo,
      multipleDocuments,
    );
    if (completeApplication) {
      return await createFEApplication.handleCompleteApplication(
        page,
        cy,
        accessibilityTest,
        representationPresent,
        representationQualified,
        uploadOtherInfo,
        multipleDocuments,
      );
    }
    if (backButtonJourney) {
      await createFEApplication.handleBackButtonJourney(page);
    }
  },

  async handleRepresentationLogic(
    page: Page,
    cy: boolean,
    representationQualified: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await representationQualifiedPage.checkPageLoads(
      page,
      cy,
      accessibilityTest,
    );
    await representationQualifiedPage.fillInFields(
      page,
      representationQualified,
    );
    await representativeDetailsPage.checkPageLoads(page, cy, accessibilityTest);
    await representativeDetailsPage.fillInFields(page);
  },

  async handleCompleteApplication(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
    representationPresent: boolean,
    representationQualified: boolean,
    uploadOtherInfo: boolean,
    multipleDocuments: boolean,
  ): Promise<string> {
    const time = await checkYourAnswersPage.continueOn(page);
    await applicationSubmittedPage.checkPageLoads(page, cy, accessibilityTest);
    await applicationSubmittedPage.checkCICCaseNumber(page);
    const caseNumber = await applicationSubmittedPage.returnCICCaseNumber(page);
    await caseAPILoginPage.SignInUser(page, "caseWorker");
    await casesPage.checkPageLoads(page, accessibilityTest);
    await casesPage.changeCaseType(page);
    await casesPage.searchForCaseNumber(page, caseNumber);
    await verifyCaseDetails.verifyCaseDetails(
      page,
      accessibilityTest,
      caseNumber,
      stateTab_content.DSSSubmittedState,
      representationPresent,
      representationQualified,
      time,
      uploadOtherInfo,
      multipleDocuments,
      "citizen",
    );
    return caseNumber;
  },

  async handleBackButtonJourney(page: Page): Promise<void> {
    await checkYourAnswersPage.pressBackButton(page);
    await uploadOtherInformationPage.pressBackButton(page);
    await uploadSupportingDocumentsPage.pressBackButton(page);
    await uploadAppealFormPage.pressBackButton(page);
    await representativeDetailsPage.pressBackButton(page);
    await representationQualifiedPage.pressBackButton(page);
    await representationPage.pressBackButton(page);
    await subjectContactDetailsPage.pressBackButton(page);
  },
};

export default createFEApplication;

import { Page } from "@playwright/test";
import landingPage from "../../pages/DSSUpdateCase/landingPage.ts";
import loginPage from "../../pages/DSSUpdateCase/loginPage.ts";
import caseFinderPage from "../../pages/DSSUpdateCase/caseFinderPage.ts";
import subjectDetailsPage from "../../pages/DSSUpdateCase/subjectDetailsPage.ts";
import uploadDocumentsPage from "../../pages/DSSUpdateCase/uploadDocumentsPage.ts";
import checkYourAnswersPage from "../../pages/DSSUpdateCase/checkYourAnswersPage.ts";
import confirmPage from "../../pages/DSSUpdateCase/confirmPage.ts";
import commonHelpers from "../../helpers/commonHelpers.ts";
import config from "../../config.ts";
import path from "path";

type UpdateCaseJourney = {
  updateCase(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
    caseNumber: string | void,
    additionalInformation: boolean,
    uploadDocument: boolean,
    multipleDocuments: boolean,
    backButtonJourney: boolean,
    errorMessaging: boolean,
  ): Promise<void>;
  handleBackButtonJourney(page: Page): Promise<void>;
  verifyDetails(
    page: Page,
    caseNumber: string,
    multipleDocuments: boolean,
    uploadDocument: boolean,
  ): Promise<void>;
};

const updateCaseJourney: UpdateCaseJourney = {
  async updateCase(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
    caseNumber: string,
    additionalInformation: boolean,
    uploadDocument: boolean,
    multipleDocuments: boolean,
    backButtonJourney: boolean,
    errorMessaging: boolean,
  ): Promise<void> {
    switch (errorMessaging) {
      default:
        await landingPage.seeTheLandingPage(page, cy, accessibilityTest);
        await landingPage.continueOn(page);
        await loginPage.SignInUser(page);
        await caseFinderPage.checkPageLoads(page, cy, accessibilityTest);
        await caseFinderPage.fillInFields(page, caseNumber);
        await caseFinderPage.continueOn(page);
        await subjectDetailsPage.checkPageLoads(page, cy, accessibilityTest);
        await subjectDetailsPage.fillInFields(page);
        await subjectDetailsPage.continueOn(page);
        await uploadDocumentsPage.checkPageLoads(page, cy, accessibilityTest);
        await uploadDocumentsPage.fillInFields(page, additionalInformation);
        await uploadDocumentsPage.uploadDocumentsSection(
          page,
          cy,
          uploadDocument,
          multipleDocuments,
        );
        await uploadDocumentsPage.continueOn(page);
        await checkYourAnswersPage.checkPageLoads(
          page,
          cy,
          accessibilityTest,
          multipleDocuments,
          uploadDocument,
        );
        await checkYourAnswersPage.checkValidInfoAllFields(
          page,
          cy,
          multipleDocuments,
          uploadDocument,
          additionalInformation,
        );
        if (backButtonJourney) {
          await this.handleBackButtonJourney(page);
          break;
        }
        await checkYourAnswersPage.continueOn(page);
        await confirmPage.checkPageLoads(page, cy, accessibilityTest);
        await confirmPage.returnCaseNumber(page, caseNumber);
        const caseNumberFinal = await confirmPage.returnCaseNumber(
          page,
          caseNumber,
        );
        if (typeof caseNumberFinal === "string") {
          await this.verifyDetails(
            page,
            caseNumberFinal,
            multipleDocuments,
            uploadDocument,
          );
        } else {
          console.error("caseNumber is void, unable to proceed.");
        }
        break;
      case true:
        await landingPage.seeTheLandingPage(page, cy, accessibilityTest);
        await landingPage.continueOn(page);
        await loginPage.SignInUser(page);
        await caseFinderPage.checkPageLoads(page, cy, accessibilityTest);
        await caseFinderPage.triggerErrorMessages(page, cy);
        await caseFinderPage.fillInFields(page, caseNumber);
        await caseFinderPage.continueOn(page);
        await subjectDetailsPage.checkPageLoads(page, cy, accessibilityTest);
        await subjectDetailsPage.triggerErrorMessages(page, cy);
        await subjectDetailsPage.fillInFields(page);
        await subjectDetailsPage.continueOn(page);
        await uploadDocumentsPage.triggerErrorMessages(page, cy);
        await uploadDocumentsPage.checkPageLoads(page, cy, accessibilityTest);
        await uploadDocumentsPage.fillInFields(page, additionalInformation);
        await uploadDocumentsPage.uploadDocumentsSection(
          page,
          cy,
          uploadDocument,
          multipleDocuments,
        );
        await uploadDocumentsPage.continueOn(page);
    }
  },

  async handleBackButtonJourney(page: Page): Promise<void> {
    await checkYourAnswersPage.pressBackButton(page);
    await uploadDocumentsPage.pressBackButton(page);
    await subjectDetailsPage.pressBackButton(page);
  },

  async verifyDetails(
    page: Page,
    caseNumber: string,
    multipleDocuments: boolean,
    uploadDocument: boolean,
  ): Promise<void> {
    const navigationPage = await commonHelpers.generateUrl(
      config.CaseAPIBaseURL,
      caseNumber,
    );
    await page.goto(navigationPage);
    await commonHelpers.checkVisibleAndPresent(
      page.locator(`.text-16:text-is("DSS Update Case Submission")`),
      2,
    );
    if (uploadDocument) {
      await page.locator(`.mat-tab-label:has-text("Case Documents")`).click();
      if (!multipleDocuments) {
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(`.text-16:text-is("DSS Other information documents")`),
            2,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(`span:text-is("Lorem ipsum relevance")`),
            1,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.ng-star-inserted:text-is("${path.basename(config.testWordFile)}")`,
            ),
            2,
          ),
        ]);
      } else {
        await Promise.all([
          commonHelpers.checkVisibleAndPresent(
            page.locator(`.text-16:text-is("DSS Other information documents")`),
            11,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(`span:text-is("Lorem ipsum relevance")`),
            10,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.ng-star-inserted:text-is("${path.basename(config.testWordFile)}")`,
            ),
            2,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.ng-star-inserted:text-is("${path.basename(config.testWordFile)}")`,
            ),
            2,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.ng-star-inserted:text-is("${path.basename(config.testPdfFile)}")`,
            ),
            5,
          ),
          commonHelpers.checkVisibleAndPresent(
            page.locator(
              `.ng-star-inserted:text-is("${path.basename(config.testFile)}")`,
            ),
            6,
          ),
        ]);
      }
    }
    await page.locator(`.mat-tab-label:has-text("Messages")`).click();
    if (uploadDocument) {
      await Promise.all([
        commonHelpers.checkVisibleAndPresent(
          page.locator(
            `.text-16:text-is("Lorem ipsum additional information")`,
          ),
          2,
        ),
        commonHelpers.checkVisibleAndPresent(
          page.locator(`.text-16:text-is("Lorem ipsum relevance")`),
          1,
        ),
      ]);
    } else {
      await commonHelpers.checkVisibleAndPresent(
        page.locator(`.text-16:text-is("Lorem ipsum relevance")`),
        1,
      );
    }
  },
};

export default updateCaseJourney;

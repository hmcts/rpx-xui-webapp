import { Page } from "@playwright/test";
import historyTabPage from "../../pages/CaseAPI/caseTabs/historyTabPage.ts";
import summaryTabPage from "../../pages/CaseAPI/caseTabs/summaryTabPage.ts";
import stateTabPage from "../../pages/CaseAPI/caseTabs/stateTabPage.ts";
import caseDetailsTabPage from "../../pages/CaseAPI/caseTabs/caseDetailsTabPage.ts";
import casePartiesTabPage from "../../pages/CaseAPI/caseTabs/casePartiesTabPage.ts";
import caseDocumentsTabPage from "../../pages/CaseAPI/caseTabs/caseDocumentsTabPage.ts";
import caseFileViewTabPage from "../../pages/CaseAPI/caseTabs/caseFileViewTabPage.ts";
import { UserRole } from "../../config.ts";

type DSSVerifyDetails = {
  verifyCaseDetails(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
    state: string,
    representationPresent: boolean,
    representationQualified: boolean,
    time: string,
    uploadOtherInfo: boolean,
    multipleDocuments: boolean,
    user: UserRole,
  ): Promise<void>;
};

const DSSVerifyCaseDetails: DSSVerifyDetails = {
  async verifyCaseDetails(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
    state: string,
    representationPresent: boolean,
    representationQualified: boolean,
    time: string,
    uploadOtherInfo: boolean,
    multipleDocuments: boolean,
    user: UserRole,
  ): Promise<void> {
    await historyTabPage.checkPageLoads(
      page,
      accessibilityTest,
      caseNumber,
      state,
    );
    await historyTabPage.checkPageInfo(
      page,
      ["Submit case (cic)"],
      [time],
      user,
      state,
    );
    await summaryTabPage.changeToSummaryTab(page);
    await summaryTabPage.checkPageLoads(
      page,
      accessibilityTest,
      representationPresent,
      caseNumber,
    );
    await summaryTabPage.checkPageInfo(
      page,
      caseNumber,
      representationPresent,
      representationQualified,
    );
    await stateTabPage.changeToStateTab(page);
    await stateTabPage.checkPageLoads(page, accessibilityTest, caseNumber);
    await stateTabPage.checkStateTab(page, state);
    await caseDetailsTabPage.changeToCaseDetailsTab(page);
    await caseDetailsTabPage.checkPageLoads(
      page,
      accessibilityTest,
      representationPresent,
      caseNumber,
    );
    await caseDetailsTabPage.checkPageInfo(
      page,
      representationPresent,
      representationQualified,
    );
    await casePartiesTabPage.changeToCasePartiesTab(page);
    await casePartiesTabPage.checkPageLoads(
      page,
      accessibilityTest,
      representationPresent,
      caseNumber,
    );
    await casePartiesTabPage.checkPageInfo(
      page,
      representationPresent,
      representationQualified,
    );
    await caseDocumentsTabPage.changeToCaseDocumentsTab(page);
    await caseDocumentsTabPage.checkPageLoads(
      page,
      accessibilityTest,
      caseNumber,
      multipleDocuments,
      uploadOtherInfo,
    );
    await caseDocumentsTabPage.checkPageInfo(
      page,
      multipleDocuments,
      uploadOtherInfo,
    );
    await caseFileViewTabPage.changeToCaseFileViewTab(page);
    await caseFileViewTabPage.checkPageLoads(
      page,
      accessibilityTest,
      caseNumber,
    );
    await caseFileViewTabPage.checkPageInfo(
      page,
      multipleDocuments,
      uploadOtherInfo,
    );
  },
};

export default DSSVerifyCaseDetails;

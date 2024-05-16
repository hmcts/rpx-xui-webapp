import { Page } from "@playwright/test";
import commonHelpers, { allEvents } from "../../helpers/commonHelpers.ts";
import events_content from "../../fixtures/content/CaseAPI/events_content.ts";
import builtCasePage from "../../pages/CaseAPI/buildCase/buildCasePage.ts";
import buildCaseConfirmPage from "../../pages/CaseAPI/buildCase/confirmPage.ts";
import historyTabPage from "../../pages/CaseAPI/caseTabs/historyTabPage.ts";
import stateTab_content from "../../fixtures/content/CaseAPI/caseTabs/stateTab_content.ts";
import { UserRole } from "../../config.ts";
import createCase from "./createCase.ts";

type BuildCase = {
  buildCase(
    page: Page,
    previousEvents: allEvents[],
    eventTimes: string[],
    accessibilityTest: boolean,
    user: UserRole,
  ): Promise<string>;
};

const buildCase: BuildCase = {
  async buildCase(
    page: Page,
    previousEvents: allEvents[],
    eventTimes: string[],
    accessibilityTest: boolean,
    user: UserRole,
  ): Promise<string> {
    const caseNumber: string = await createCase.createCase(
      page,
      user,
      true,
      "Assessment",
      "Other",
      true,
      true,
      "Email",
      true,
      false,
      "1996",
      "Scotland",
      true,
      true,
      true,
      true,
      true,
    );
    await createCase.verifyDetails(
      page,
      user,
      true,
      caseNumber,
      previousEvents,
      eventTimes,
    );
    await commonHelpers.chooseEventFromDropdown(page, events_content.buildCase);
    await builtCasePage.checkPageLoads(page, accessibilityTest, caseNumber);
    await builtCasePage.continueOn(page);
    await buildCaseConfirmPage.checkPageLoads(
      page,
      accessibilityTest,
      caseNumber,
    );
    const buildCaseTime = await buildCaseConfirmPage.continueOn(page);
    previousEvents.push(events_content.buildCase);
    eventTimes.push(buildCaseTime);
    await historyTabPage.checkPageLoads(
      page,
      true,
      caseNumber,
      stateTab_content.submittedState,
    );
    await historyTabPage.checkPageInfo(
      page,
      previousEvents,
      eventTimes,
      user,
      stateTab_content.caseManagementState,
    );
    return caseNumber;
  },
};

export default buildCase;

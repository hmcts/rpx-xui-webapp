import { Page } from "@playwright/test";
import axeTest from "../../../helpers/accessibilityTestHelper.ts";
import historyTabContent from "../../../fixtures/content/CaseAPI/caseTabs/historyTab_content.ts";
import stateTabContent from "../../../fixtures/content/CaseAPI/caseTabs/stateTab_content.ts";
import authorsContent from "../../../fixtures/content/authors_content.ts";
import commonHelpers, { allEvents } from "../../../helpers/commonHelpers.ts";
import { UserRole } from "../../../config.ts";
import allTabTitles_content from "../../../fixtures/content/CaseAPI/caseTabs/allTabTitles_content.ts";

type HistoryTabPage = {
  checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
    state: string,
  ): Promise<void>;
  checkPageInfo(
    page: Page,
    allEvents: allEvents[],
    eventTimes: string[],
    user: UserRole,
    state: string,
  ): Promise<void>;
};

const historyTabPage: HistoryTabPage = {
  async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    caseNumber: string,
    state: string,
  ): Promise<void> {
    await commonHelpers.checkAllCaseTabs(page, caseNumber);
    if (state == stateTabContent.DSSSubmittedState) {
      await Promise.all([
        ...Array.from({ length: 4 }, (_, index) => {
          const textOnPage = (allTabTitles_content as any)[`tab${index + 12}`];
          return commonHelpers.checkVisibleAndPresent(
            page.locator(`.mat-tab-label-content:text-is("${textOnPage}")`),
            1,
          );
        }),
      ]);
    } else {
      await Promise.all([
        ...Array.from({ length: 3 }, (_, index) => {
          const textOnPage = (allTabTitles_content as any)[`tab${index + 13}`];
          return commonHelpers.checkVisibleAndPresent(
            page.locator(`.mat-tab-label-content:text-is("${textOnPage}")`),
            1,
          );
        }),
        Array.from({ length: 2 }, (_, index) => {
          const textOnPage = (historyTabContent as any)[`heading${index + 1}`];
          return commonHelpers.checkVisibleAndPresent(
            page.locator(`.heading-h2:text-is("${textOnPage}")`),
            1,
          );
        }),
        Array.from({ length: 6 }, (_, index) => {
          const textOnPage = (historyTabContent as any)[
            `textOnPage${index + 1}`
          ];
          if (index !== 2 && index !== 4 && index !== 5) {
            return commonHelpers.checkVisibleAndPresent(
              page.locator(`span.text-16:text-is("${textOnPage}")`),
              2,
            );
          } else {
            return commonHelpers.checkVisibleAndPresent(
              page.locator(`span.text-16:text-is("${textOnPage}")`),
              1,
            );
          }
        }).filter(Boolean),
      ]);
    }
    if (accessibilityTest) await axeTest(page);
  },

  async checkPageInfo(
    page: Page,
    allEvents: allEvents[],
    eventTimes: string[],
    user: UserRole,
    state: string,
  ): Promise<void> {
    for (let i = 0; i < allEvents.length; i++) {
      if (allEvents.length > 1 && i == 0) {
        await commonHelpers.checkVisibleAndPresent(
          page.locator(`a.text-16:text-is("${allEvents[i]}")`),
          1,
        );
        if (eventTimes[i] === eventTimes[i + 1]) {
          await commonHelpers.checkVisibleAndPresent(
            page.locator(`div.tooltip.text-16:has-text("${eventTimes[i]}")`),
            3,
          );
        } else {
          await commonHelpers.checkVisibleAndPresent(
            page.locator(`div.tooltip.text-16:has-text("${eventTimes[i]}")`),
            1,
          );
        }
      } else {
        if (
          allEvents.length > 1 &&
          i > 0 &&
          eventTimes[i] === eventTimes[i - 1]
        ) {
          await commonHelpers.checkVisibleAndPresent(
            page.locator(`div.tooltip.text-16:has-text("${eventTimes[i]}")`),
            3,
          );
        } else {
          await commonHelpers.checkVisibleAndPresent(
            page.locator(`div.tooltip.text-16:has-text("${eventTimes[i]}")`),
            2,
          );
        }
        await commonHelpers.checkVisibleAndPresent(
          page.locator(`a.text-16:text-is("${allEvents[i]}")`),
          1,
        );
        await commonHelpers.checkVisibleAndPresent(
          page.locator(`span.text-16:text-is("${allEvents[i]}")`),
          1,
        );
      }
      if (user === "caseWorker") {
        await commonHelpers.checkVisibleAndPresent(
          page.locator(
            `span.text-16:text-is("${authorsContent.automatedCaseworker}")`,
          ),
          allEvents.length + 1,
        );
      } else if (user === "citizen") {
        await commonHelpers.checkVisibleAndPresent(
          page.locator(
            `span.text-16:text-is("${authorsContent.automatedCitizen}")`,
          ),
          allEvents.length + 1,
        );
      } else if (user === "seniorCaseworker") {
        await commonHelpers.checkVisibleAndPresent(
          page.locator(
            `span.text-16:text-is("${authorsContent.automatedSeniorCaseWorker}")`,
          ),
          allEvents.length + 1,
        );
      } else if (user === "hearingCentreAdmin") {
        await commonHelpers.checkVisibleAndPresent(
          page.locator(
            `span.text-16:text-is("${authorsContent.automatedHearingCentreAdmin}")`,
          ),
          allEvents.length + 1,
        );
      } else if (user === "hearingCentreTeamLead") {
        await commonHelpers.checkVisibleAndPresent(
          page.locator(
            `span.text-16:text-is("${authorsContent.automatedHearingCentreTeamLead}")`,
          ),
          allEvents.length + 1,
        );
      }
      await commonHelpers.checkVisibleAndPresent(
        page.locator(`span.text-16:text-is("${state}")`),
        1,
      );
    }
  },
};

export default historyTabPage;

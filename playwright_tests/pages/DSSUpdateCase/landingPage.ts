import config from "../../config";
import { expect, Page } from "@playwright/test";
import axeTest from "../../helpers/accessibilityTestHelper";
import LandingPageDetails from "../../fixtures/content/DSSUpdateCase/LandingPage_content";
import commonHelpers from "../../helpers/commonHelpers.ts";

type LandingPage = {
  startButton: string;
  seeTheLandingPage(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
  ): Promise<void>;
  continueOn(page: Page): Promise<void>;
};

const landingPage: LandingPage = {
  startButton: 'a[role="button"]',

  async seeTheLandingPage(
    page: Page,
    cy: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.goto(config.UpdateCaseBaseURL);
    switch (cy) {
      case true:
        await page.locator(".govuk-link").nth(1).click();
        await Promise.all([
          commonHelpers.feedbackBanner(page, true, true),
          expect(page.locator(".govuk-header__service-name")).toHaveText(
            LandingPageDetails.headerCy,
          ),
          expect(page.locator(".govuk-heading-l")).toHaveText(
            LandingPageDetails.pageTitleCy,
          ),
          expect(page.locator(".govuk-body-l").nth(0)).toContainText(
            LandingPageDetails.hintMessageCy,
          ),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (LandingPageDetails as any)[
              `textOnPageCy${index + 1}`
            ];
            return expect(
              page.locator(".govuk-body-l").nth(index + 1),
            ).toHaveText(textOnPage);
          }),
          expect(page.locator(landingPage.startButton)).toHaveText(
            "Dechrau nawr",
          ),
        ]);
        break;
      default:
        await Promise.all([
          commonHelpers.feedbackBanner(page, false, true),
          expect(page.locator(".govuk-header__service-name")).toHaveText(
            LandingPageDetails.header,
          ),
          expect(page.locator(".govuk-heading-l")).toHaveText(
            LandingPageDetails.pageTitle,
          ),
          expect(page.locator(".govuk-body-l").nth(0)).toContainText(
            LandingPageDetails.hintMessage,
          ),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (LandingPageDetails as any)[
              `textOnPage${index + 1}`
            ];
            return expect(
              page.locator(".govuk-body-l").nth(index + 1),
            ).toHaveText(textOnPage);
          }),
          expect(page.locator(landingPage.startButton)).toHaveText("Start now"),
        ]);
        break;
    }
    if (accessibilityTest) {
      await axeTest(page);
    }
  },

  async continueOn(page: Page): Promise<void> {
    await page.click(landingPage.startButton);
  },
};

export default landingPage;

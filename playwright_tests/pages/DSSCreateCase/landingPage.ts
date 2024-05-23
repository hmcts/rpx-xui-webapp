import config from "../../config";
import { expect, Page } from "@playwright/test";
import axeTest from "../../helpers/accessibilityTestHelper";
import LandingPageDetails from "../../fixtures/content/DSSCreateCase/LandingPage_content";

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
    switch (cy) {
      case true:
        await page.goto(config.FEBaseURL);
        await page.locator(".govuk-link").nth(1).click();
        await Promise.all([
          expect(page.locator(".govuk-link").nth(1)).toHaveText("English"),
          expect(page.locator(".govuk-heading-l")).toHaveText(
            LandingPageDetails.pageTitleCy,
          ),
          expect(page.locator(".govuk-body-l").nth(0)).toContainText(
            LandingPageDetails.hintMessageCy,
          ),
          expect(page.locator("h2 > span")).toContainText(
            LandingPageDetails.subHeadingCy,
          ),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (LandingPageDetails as any)[
              `textOnPageCy${index + 1}`
            ];
            return expect(page.locator(".govuk-body-l").nth(1)).toContainText(
              textOnPage,
            );
          }),
          expect(page.locator(landingPage.startButton)).toContainText(
            "Dechrau nawr",
          ),
        ]);
        break;
      default:
        await page.goto(config.FEBaseURL);
        await Promise.all([
          expect(page.locator(".govuk-heading-l")).toHaveText(
            LandingPageDetails.pageTitle,
          ),
          expect(page.locator(".govuk-body-l").nth(0)).toContainText(
            LandingPageDetails.hintMessage,
          ),
          expect(page.locator("h2 > span")).toContainText(
            LandingPageDetails.subHeading,
          ),
          ...Array.from({ length: 2 }, (_, index) => {
            const textOnPage = (LandingPageDetails as any)[
              `textOnPage${index + 1}`
            ];
            return expect(page.locator(".govuk-body-l").nth(1)).toContainText(
              textOnPage,
            );
          }),
          expect(page.locator(landingPage.startButton)).toHaveText("Start now"),
        ]);
        if (accessibilityTest) {
          await axeTest(page);
        }
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

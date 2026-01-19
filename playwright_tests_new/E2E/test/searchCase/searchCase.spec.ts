import { expect, test } from "../../fixtures";
import { loadSessionCookies } from '../../../common/sessionCapture.ts';

test.describe("IDAM login to trigger For 16 digit Case Search @KSM", () => {
  let sessionCookies: any[] = [];
  test.beforeEach(async ({ page, config }) => {
    await page.goto(config.urls.manageCaseBaseUrl);
    const { cookies } = loadSessionCookies('STAFF_ADMIN');
    sessionCookies = cookies;
    if (sessionCookies.length) {
      await page.context().addCookies(sessionCookies);
    }
    await page.goto('/');
  });


  test("Search by 16-digit case reference", async ({caseDetailsPage,searchCasePage }) => {
    let caseNumber="";

    await test.step("16 Digit Search ", async () => {
      // TODO case should be created from API script.
      caseNumber = "1767862749263830";
      await searchCasePage.searchWith16DigitCaseId(caseNumber)});
      const headingText = await searchCasePage.searchResultsPageHeading;
      expect(headingText).toContain('Current progress of the case');

     await test.step("Check case details messages are seen", async () => {
      expect.soft(await caseDetailsPage.caseNotificationBannerBody.innerText()).toContain('There are 11 active flags on this case.');
      expect.soft(await caseDetailsPage.caseNotificationBannerTitle.innerText()).toContain('Important');
      expect.soft(await searchCasePage.caseProgressMessage.innerText()).toContain('The case has been decided. Either party has the right to appeal this decision, they have 14 days from the date of decision to do this.');
      expect(caseDetailsPage.container).toBeTruthy();
    });
  });
});

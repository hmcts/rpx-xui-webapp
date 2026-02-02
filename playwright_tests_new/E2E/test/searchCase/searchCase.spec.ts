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


  test("Search by 16-digit case reference", async ({caseDetailsPage,searchCasePage}) => {

    await test.step("16 Digit Search ", async () => {

      // TODO case should be created from API script.
      const caseNumber = "1767862749263830";
      await searchCasePage.searchWith16DigitCaseId(caseNumber)});
      const headingText = await searchCasePage.searchResultsPageHeading;
      expect(headingText).toContain('Current progress of the case');

     await test.step("On successful search - Check case details messages are seen", async () => {
        expect(caseDetailsPage.exuiCaseDetailsComponent.caseHeader).toBeInViewport();
        // TODO check that the URL contains the caseId and the Jurisdiction
        expect.soft(await caseDetailsPage.caseNotificationBannerTitle.innerText()).toContain('Important');
        expect.soft(await caseDetailsPage.caseNotificationBannerBody.innerText()).toContain(' active flags on this case.');
        expect.soft(await caseDetailsPage.caseProgressMessage.innerText()).toContain('Current progress of the case');
        expect.soft(await caseDetailsPage.caseProgressMessage.innerText()).toContain('The case has been decided');
        expect.soft(await caseDetailsPage.caseProgressMessage.innerText()).toContain('Do this next');
     });

     // TODO
     // Test required for a caseId that does not exist in CCD
     // 'Check that SearchResults page not found'


  });
});

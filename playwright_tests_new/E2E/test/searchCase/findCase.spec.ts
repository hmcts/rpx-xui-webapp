import { test,expect } from "../../fixtures";
import { ValidatorUtils } from "../../../E2E/utils/validator.utils.ts"
import { loadSessionCookies } from '../../../common/sessionCapture.ts';


// TODO New Case should be created using a API script.
const caseNumber = "1763727112061356";
const validatorUtils = new ValidatorUtils();


test.describe("IDAM login for Find Search page @KSM", () => {
  let sessionCookies: any[] = [];
  test.beforeEach(async ({ page }) => {
    const { cookies } = loadSessionCookies('FPL_GLOBAL_SEARCH');
    sessionCookies = cookies;
    if (sessionCookies.length) {
      await page.context().addCookies(sessionCookies);
    }
    await page.goto('/');
  });

  test("Find Case using Probate / Grant of Representation caseType ", async ({ tableUtils, caseListPage, findCasePage,caseDetailsPage }) => {
    await test.step("Start Find Case journey", async () => {
      await findCasePage.startFindCaseJourney(caseNumber);
    });

    await test.step("Verify that case searched for appears under 'Your cases' ", async () => {
        //expect(findCasePage.yourCasesHeading.isVisible);
        // TODO above can be assereted with   id="search-result" mapXuiTable and then do some checks here.
        //TODO check with this method does verifyCaseNumber();
        //await findCasePage.verifyCaseNumber(caseNumber);

      // This could be replaced with all the checks in the await tableUtils.mapExuiTable()......

    });

    await test.step("Confirm that the  case is in the search results", async () => {

      const table = await tableUtils.mapExuiTable(
        caseListPage.exuiCaseListComponent.caseListTable
      );

      const formattedCaseRef = validatorUtils.formatCaseNumber(caseNumber)
      const caseReference = table[0]["Case reference"];
      expect(table).toBeTruthy();
      expect(caseReference).toBeTruthy();
      expect(caseReference).toBe(formattedCaseRef);
    });

    await test.step("Confirm case details seen when CaseReference link is clicked", async () => {
      findCasePage.displayCaseDetailsFor(caseNumber);
      expect(caseDetailsPage.container).toBeTruthy();
    });
  });
});

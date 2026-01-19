import { test,expect } from "../../fixtures";
import { ValidatorUtils } from "../../../E2E/utils/validator.utils.ts"
import { loadSessionCookies } from '../../../common/sessionCapture.ts';


// TODO New Case should be created using a API script.
const caseNumber = "1763727112061356";
const validatorUtils = new ValidatorUtils();


test.describe("IDAM login for Find Search page @KSM", () => {
  let sessionCookies: any[] = [];
  test.beforeEach(async ({ page }) => {
    const { cookies } = loadSessionCookies('PROBATE_CW');
    sessionCookies = cookies;
    if (sessionCookies.length) {
      await page.context().addCookies(sessionCookies);
    }
    await page.goto('/');
  });

  test("Find Case using Probate / Grant of Representation caseType @KSM", async ({ tableUtils, caseListPage, findCasePage,createCasePage,caseDetailsPage }) => {
    await test.step("Start Find Case journey", async () => {
      await findCasePage.startFindCaseJourney(caseNumber);
    });

    await test.step("Verify that case searched for appears under 'Your cases' ", async () => {
        expect(findCasePage.yourCasesHeading.isVisible);
        await findCasePage.verifyCaseNumber(caseNumber);
    });

    await test.step("Confirm that the  case is in the search results", async () => {
      const formattedCaseRef = validatorUtils.formatCaseNumber(caseNumber)

      const table = await tableUtils.mapExuiTable(
        caseListPage.exuiCaseListComponent.caseListTable
      );
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

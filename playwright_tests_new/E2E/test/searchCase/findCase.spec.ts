import { test,expect } from "../../fixtures";

// TODO New Case should be created using a API script.
const caseNumber = "1763727112061356";

test.describe("IDAM login for Find Search page", () => {
  test.beforeEach(async ({ idamPage, page, userUtils, config }) => {
    await page.goto(config.urls.manageCaseBaseUrl);
    const { email, password } = userUtils.getUserCredentials("probate_cw");
    await idamPage.login({
      username: email,
      password: password,
    });
  });

  test("Find Case using Probate / Grant of Representation caseType", async ({ tableUtils, caseListPage, findCasePage,createCasePage,caseDetailsPage }) => {

    await test.step("Start Find Case journey", async () => {
      await findCasePage.startFindCaseJourney(caseNumber);

    });

    await test.step("Verify that case searched for appears under 'Your cases' ", async () => {
        expect(findCasePage.yourCasesHeading.isVisible);
        await findCasePage.verifyCaseNumber(caseNumber);
    });

    await test.step("Confirm that the  case is in the search results", async () => {
      const formattedCaseRef = caseNumber.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$1-$2-$3-$4");
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

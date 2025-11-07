import { expect, test } from "../../fixtures.js";

test.describe("Verify filtering cases works as expected", () => {
  test.beforeEach(async ({idamPage, page, userUtils, config}) => {
    await page.goto(config.urls.manageCaseBaseUrl);
    const { email, password } = userUtils.getUserCredentials("SOLICITOR");
    await idamPage.login({
      username: email,
      password: password,
    });
  });

  test("Verify filtering by case status returns the only cases with status 'Decided'", async ({ caseListPage, tableUtils }) => {
    await caseListPage.exuiCaseListComponent.searchByCaseState("Decided");
    const table = await tableUtils.mapExuiTable(
      caseListPage.exuiCaseListComponent.caseListTable
    );
    table.forEach((row) => {
      expect(row["Status"]).toEqual("Decided");
    });
  });
});
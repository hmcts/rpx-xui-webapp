import { expect, test } from "../../fixtures.ts";

test.describe("Verify filtering cases works as expected", () => {
  test.beforeEach(async ({ idamPage, page, userUtils, config }) => {
    await page.goto(config.urls.manageCaseBaseUrl);
    const { email, password } = userUtils.getUserCredentials("SOLICITOR");
    await idamPage.login({
      username: email,
      password: password,
    });
  });

  test("Verify filtering by case status returns the only cases with status 'Open'", async ({ caseListPage, tableUtils }) => {
    await caseListPage.searchByJurisdiction("Public Law");
    await caseListPage.searchByCaseType("Public Law Applications");
    await caseListPage.exuiCaseListComponent.searchByCaseState("Open");
    const table = await tableUtils.mapExuiTable(
      caseListPage.exuiCaseListComponent.caseListTable
    );
    table.forEach((row) => {
      expect(row["State"]).toEqual("Open");
    });
  });
});
import { expect, test } from "../../fixtures.js";

test.describe("Verify creating cases works as expected", () => {
  test.beforeEach(async ({idamPage, page, userUtils, config}) => {
    await page.goto(config.urls.manageCaseBaseUrl);
    const { email, password } = userUtils.getUserCredentials("SOLICITOR");
    await idamPage.login({
      username: email,
      password: password,
    });
  });

  test("Verify creating a case works as expected", async ({ caseListPage, createCasePage, page }) => {
    await createCasePage.createCase("DIVORCE", "xuiTestJurisdiction");
    expect(createCasePage.exuiCaseDetailsComponent.caseHeader).toBeInViewport();
  });
});
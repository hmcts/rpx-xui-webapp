import { faker } from "@faker-js/faker";
import { expect, test } from "../../fixtures";

test.describe("Verify creating cases works as expected", () => {
    test.beforeEach(async ({ idamPage, page, userUtils, config }) => {
        await page.goto(config.urls.manageCaseBaseUrl);
        const { email, password } = userUtils.getUserCredentials("SOLICITOR");
        await idamPage.login({
            username: email,
            password: password,
        });
    });

    test("Verify creating a case works as expected", async ({ validatorUtils, createCasePage, caseListPage, caseDetailsPage, tableUtils }) => {
        let caseNumber: string;
        let textField0 = faker.lorem.word();

        await test.step("Create a case and validate the case number", async () => {
            await createCasePage.createDivorceCase("DIVORCE", "XUI Case PoC", textField0);
            expect.soft(createCasePage.exuiCaseDetailsComponent.caseHeader).toBeInViewport();
            caseNumber = await createCasePage.exuiCaseDetailsComponent.caseHeader.innerText();
            validatorUtils.validateDivorceCaseNumber(caseNumber);
        });

        await test.step("Find the created case in the case list", async () => {
            await caseListPage.goto();
            await caseListPage.searchByJurisdiction("Family Divorce");
            await caseListPage.searchByCaseType("XUI Case PoC");
            await caseListPage.searchByTextField0(textField0);
        });

        await test.step("Confirm the created case is in the search results", async () => {
            await caseListPage.exuiCaseListComponent.searchByCaseState("Case created");
            const table = await tableUtils.mapExuiTable(
                caseListPage.exuiCaseListComponent.caseListTable
            );
            expect(table[0]["Case reference"]).toBe(`${caseNumber.slice(1)}`);
        });
    });
});

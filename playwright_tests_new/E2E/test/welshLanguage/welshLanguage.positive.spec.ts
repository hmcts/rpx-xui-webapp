import { faker } from "@faker-js/faker";
import { expect, test } from "../../fixtures";

test.describe("Verify welsh language support", () => {
    test.beforeEach(async ({ idamPage, page, userUtils, config }) => {
        await page.goto(config.urls.manageCaseBaseUrl);
        const { email, password } = userUtils.getUserCredentials("SOLICITOR");
        await idamPage.login({
            username: email,
            password: password,
        });
    });

    test("Verify welsh language is shown for ", async ({ validatorUtils, createCasePage, caseListPage, tableUtils }) => {
        let caseNumber: string;
        let textField0 = faker.lorem.word();

        await test.step("Create a case and validate the case number", async () => {

        });

    });
});

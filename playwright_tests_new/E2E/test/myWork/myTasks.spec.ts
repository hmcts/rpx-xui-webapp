import { faker } from "@faker-js/faker";
import { expect, test } from "../../fixtures";
import { loadSessionCookies } from '../../../common/sessionCapture';
let sessionCookies: any[] = [];

test.describe("Verify my tasks works as expected", () => {
    test.beforeEach(async ({ page }) => {
        const { cookies } = loadSessionCookies('STAFF_ADMIN');
        sessionCookies = cookies;
        if (sessionCookies.length) {
            await page.context().addCookies(sessionCookies);
        }
        await page.goto('/');
    });


    test("Verify tasks", async ({ taskListPage }) => {
        let caseNumber: string;
        let textField0 = faker.lorem.word();

        await test.step("Create ", async () => {
            await taskListPage.goto();
            await expect(taskListPage.taskListTable).toBeVisible();
            await taskListPage.exuiSpinnerComponent.wait();
        });

    });
});
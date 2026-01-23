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

        await test.step("Navigate to the task list page", async () => {
            await taskListPage.goto();
            await expect(taskListPage.taskListTable).toBeVisible();
            await taskListPage.exuiSpinnerComponent.wait();
        });

        await test.step("Click on the first task in the task list", async () => {
            await taskListPage.selectWorkMenuItem('My tasks');
            await taskListPage.exuiSpinnerComponent.wait();

            await taskListPage.selectWorkMenuItem('Available tasks');
            await taskListPage.exuiSpinnerComponent.wait();

            await taskListPage.selectWorkMenuItem('My cases');
            await taskListPage.exuiSpinnerComponent.wait();

            await taskListPage.selectWorkMenuItem('My Access');
        });
    });
});
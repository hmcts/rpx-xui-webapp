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


    test("Verify tasks", async ({ taskListPage, tableUtils, page }) => {

        await test.step("Navigate to the task list page", async () => {

           // await taskListPage.applyAllFilterOptions();

            
            await expect(taskListPage.taskListTable).toBeVisible();
            await taskListPage.exuiSpinnerComponent.wait();
        });

        await test.step("Check my available tasks has data in the table", async () => {
            const table = await tableUtils.mapExuiTable( taskListPage.taskListTable);
            expect(table.length).toBeGreaterThan(0);            
        });

         await test.step("Verify task details view", async () => {
            await taskListPage.manageCaseButtons.nth(0).click();
            const table = await tableUtils.mapExuiTable( taskListPage.taskListTable);
            console.log(table);
            page.getByLabel('Go to task').click();
            await taskListPage.exuiSpinnerComponent.wait();
         });

    });
});
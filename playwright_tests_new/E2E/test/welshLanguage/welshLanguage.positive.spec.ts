import { expect, test } from "../../fixtures";
import { loadSessionCookies } from '../../../common/sessionCapture';
import { timeout } from "rxjs";
let sessionCookies: any[] = [];

test.describe("Verify users can switch the language", () => {
    test.beforeEach(async ({ page }) => {
        const { cookies } = loadSessionCookies('SOLICITOR');
        sessionCookies = cookies;
        if (sessionCookies.length) {
            await page.context().addCookies(sessionCookies);
        }
        await page.goto('/');
    });

    test.skip("Verify translations are shown when the user selects to view the site in Welsh", async ({ caseListPage, waitUtils }) => {
        await test.step("Change the language to Welsh", async () => {
            await caseListPage.exuiHeader.switchLanguage('Cymraeg');
            await caseListPage.page.waitForResponse(res =>
                res.url().includes('/api/translation/cy') && res.ok()
            );
            await caseListPage.exuiSpinnerComponent.wait();
        });

        await test.step("Check the translation for Manage Cases is shown and the language toggle switches to English", async () => {
            expect.soft(await caseListPage.exuiHeader.languageToggle.innerText()).toContain('English');
            await caseListPage.exuiHeader.selectedPageItem.waitFor({ state: "attached" });
            expect.soft(await caseListPage.exuiHeader.selectedPageItem.innerText()).toContain('Rheoli Achosion');
        });

        await test.step("Check the language can be switched back to English and the correct translations are shown", async () => {
            await caseListPage.exuiHeader.switchLanguage('English');
            await caseListPage.exuiSpinnerComponent.wait();
            await caseListPage.exuiHeader.checkIsVisible();
            expect.soft(await caseListPage.exuiHeader.selectedPageItem.innerText()).toContain('Manage Cases');
            expect.soft(await caseListPage.exuiHeader.languageToggle.innerText()).toContain('Cymraeg');
        });
    });
});

import { expect, test } from "../../fixtures";
import { loadSessionCookies } from '../../../common/sessionCapture';
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

    test("Verify translations are shown when the user selects to view the site in Welsh", async ({ caseListPage, waitUtils }) => {
        await test.step("Change the language to Welsh", async () => {
            await caseListPage.exuiHeader.switchLanguage('Cymraeg');
            const cyResponse = await caseListPage.page.waitForResponse(
                res => res.url().includes('/api/translation/cy') && res.ok(),
                { timeout: 15000 }
            ).catch(() => null);
            if (!cyResponse) {
                throw new Error('Welsh translation API did not respond (expected /api/translation/cy).');
            }
            await caseListPage.exuiSpinnerComponent.wait();            
        });

        await test.step("Check the translation for Manage Cases is shown and the language toggle switches to English", async () => {
            expect.soft(await caseListPage.exuiHeader.languageToggle.innerText()).toContain('English');
            await caseListPage.exuiHeader.selectedPageItem.waitFor({ state: "attached" });
            const selectedText = (await caseListPage.exuiHeader.selectedPageItem.innerText()).trim();
            expect.soft(selectedText).toMatch(/Rheoli Achosion|Manage Cases \[Translation in progress\]/);
        });

        await test.step("Check the language can be switched back to English and the correct translations are shown", async () => {
            await caseListPage.exuiHeader.switchLanguage('English');
            const enResponsePromise = caseListPage.page.waitForResponse(
                res => res.url().includes('/api/translation/en') && res.ok(),
                { timeout: 10000 }
            ).catch(() => null);
            const englishRenderedPromise = caseListPage.page.waitForFunction(() => {
                const header = document.querySelector('exui-header .hmcts-header a.hmcts-header__link');
                const toggle = document.querySelector('exui-header button.language');
                const headerText = header?.textContent?.trim() || '';
                const toggleText = toggle?.textContent?.trim() || '';
                return /Manage Cases( \[Translation in progress\])?/.test(headerText) && toggleText.includes('Cymraeg');
            }, { timeout: 10000 }).then(() => true).catch(() => false);

            const [enResponse, englishRendered] = await Promise.all([enResponsePromise, englishRenderedPromise]);
            if (!enResponse && !englishRendered) {
                throw new Error('English translation did not render and translation API did not respond (/api/translation/en).');
            }
            await caseListPage.exuiSpinnerComponent.wait();
            await caseListPage.exuiHeader.checkIsVisible();
            await expect
                .poll(async () => (await caseListPage.exuiHeader.selectedPageItem.innerText()).trim(), { timeout: 10000 })
                .toMatch(/Manage Cases( \[Translation in progress\])?/);
            await expect
                .poll(async () => (await caseListPage.exuiHeader.languageToggle.innerText()).trim(), { timeout: 10000 })
                .toContain('Cymraeg');
        });
    });
});

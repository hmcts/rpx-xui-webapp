import { expect, test } from '../../../E2E/fixtures';
import { loadSessionCookies } from '../../../common/sessionCapture';

const userIdentifier = 'SOLICITOR';
const jurisdiction = 'DIVORCE';
const caseType = 'xuiTestJurisdiction';
let sessionCookies: any[] = [];

test.beforeAll(() => {
    const { cookies } = loadSessionCookies(userIdentifier);
    sessionCookies = cookies;
});

test.beforeEach(async ({ page, config }) => {
    if (sessionCookies.length) {
        await page.context().addCookies(sessionCookies);
    }
});

// TODO : Enable and complete negative test case when functionality is available
test.describe.skip(`Case List as ${userIdentifier}`, () => {
    test(`User ${userIdentifier} should not be able to submit a case without filling in required fields`, async ({ createCasePage, page }) => {
        await test.step('Navigate to the submit case page without filling in case details', async () => {
            await page.goto(`/cases/case-create/${jurisdiction}/${caseType}/createCase/submit`);
        });

        await test.step('Check the submit case page is not displayed', async () => {
            await expect(createCasePage.exuiHeader.header).toBeVisible();
            await expect(createCasePage.testSubmitButton).not.toBeInViewport();
            await expect(createCasePage.refreshModalConfirmButton).toBeVisible()
            await expect(createCasePage.refreshModal).toBeVisible();            
            await createCasePage.refreshModalConfirmButton.click();
        });

        await test.step('Verify that the case is not created and the user is not taken to the case details page', async () => {
            await expect(createCasePage.exuiCaseDetailsComponent.caseHeader).not.toBeVisible();
            await expect(page).not.toHaveURL(`/cases/case-create/${jurisdiction}/${caseType}/createCase/submit`);
        });
    });
});

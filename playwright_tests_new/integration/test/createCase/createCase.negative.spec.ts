import { expect, test } from '../../../E2E/fixtures';
import { loadSessionCookies } from '../../utils/session.utils';

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

        await test.step('Attempt to submit the case without filling in required fields', async () => {
            await createCasePage.testSubmitButton.click(); 
            await createCasePage.exuiSpinnerComponent.wait();           
        });

        await test.step('Verify that the case is not created and the user is not taken to the case details page', async () => {
            expect(await createCasePage.exuiCaseDetailsComponent.caseHeader.isVisible()).toBeFalsy();           
        });
    });
});

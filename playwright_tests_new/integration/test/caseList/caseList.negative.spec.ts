import { expect, test } from '../../../E2E/fixtures';
import { loadSessionCookies } from '../../utils/session.utils';
import { buildCaseListMock } from '../../mocks/caseList.mock';

const userIdentifier = 'SOLICITOR';
let sessionCookies: any[] = [];
const caseListMockResponse = buildCaseListMock(124);

test.beforeAll(() => {
    const { cookies } = loadSessionCookies(userIdentifier);
    sessionCookies = cookies;
});

test.beforeEach(async ({ page, config }) => {
    if (sessionCookies.length) {
        await page.context().addCookies(sessionCookies);
    }
});

test.describe(`Case List as ${userIdentifier}`, () => {
    test(`User ${userIdentifier} can view cases on the case list page`, async ({ caseListPage, tableUtils, page }) => {

        await test.step('Intercept searchCases endpoint and fulfill with mock body', async () => {
            await page.route('**/data/internal/searchCases*', async route => {
                const body = JSON.stringify({});
                await route.fulfill({ status: 500, contentType: 'application/json', body });
            });
        });

        await test.step('Navigate to the search page', async () => {
            await caseListPage.goto();
        });

    });
});
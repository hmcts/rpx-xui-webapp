import { expect, test } from '../../../E2E/fixtures';
import { loadSessionCookies } from '../../utils/session.utils';
import { buildCaseListMock } from '../../mocks/caseList.mock';

const userIdentifier = 'SOLICITOR';
let sessionCookies: any[] = [];
const mockResponse = buildCaseListMock(124);

test.beforeAll(() => {
	const { cookies, storageFile } = loadSessionCookies(userIdentifier);
	sessionCookies = cookies;
	if (cookies.length === 0) {
		console.warn(`No cookies loaded for ${userIdentifier}; file checked: ${storageFile}`);
	}
});

test.beforeEach(async ({ page, config }) => {
	if (sessionCookies.length) {
		await page.context().addCookies(sessionCookies);
	}
	await page.goto(config.urls.manageCaseBaseUrl);
});

test.describe(`Case List as ${userIdentifier}`, () => {
	test(`User ${userIdentifier} can view cases on the case list page`, async ({ caseListPage, tableUtils, page }) => {

		await test.step('Intercept searchCases endpoint and fulfill with mock body', async () => {
			await page.route('**/data/internal/searchCases*', async route => {
				const body = JSON.stringify(mockResponse);
				await route.fulfill({ status: 200, contentType: 'application/json', body });
			});
		});

		await test.step('Navigate to the search page', async () => {
			await caseListPage.goto();
		});

		await test.step('Verify user can see a list shows the expected layout given the mock response', async () => {
			expect(await caseListPage.caseListResultsAmount.textContent()).toBe(`Showing 1 to ${Math.min(mockResponse.results.length, 25)} of ${mockResponse.total} results`);
			const table = await tableUtils.mapExuiTable(caseListPage.exuiCaseListComponent.caseListTable);
			expect(table.length).toBe(mockResponse.results.length);
			for (let i = 0; i < mockResponse.results.length; i++) {
				const expectedFields = mockResponse.results[i].case_fields;
				expect(table[i]['Case reference']).toBe(expectedFields['[CASE_REFERENCE]']);
				expect(table[i]['Text Field 0']).toBe(expectedFields['TextField0']);
				expect(table[i]['Text Field 1']).toBe(expectedFields['TextField1']);
				expect(table[i]['Text Field 2']).toBe(expectedFields['TextField2']);
			}
		});
	});
});

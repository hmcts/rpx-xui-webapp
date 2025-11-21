import { faker } from '@faker-js/faker';
import { expect, test } from '../../../E2E/fixtures';
import { loadSessionCookies } from '../../utils/session.utils';
// Load stub mapping JSON formerly used by WireMock.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const searchCasesStub = require('../../mocks');

const userIdentifier = 'SOLICITOR';
let sessionCookies: any[] = [];

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
	// Intercept searchCases endpoint and fulfill with stub body.
	await page.route('**/data/internal/searchCases', async route => {
		const body = JSON.stringify(searchCasesStub.response.jsonBody);
		await route.fulfill({ status: 200, contentType: 'application/json', body });
	});
  await page.goto(config.urls.manageCaseBaseUrl);
});

test.describe(`Case List as ${userIdentifier}`, () => {
	test(`User ${userIdentifier} can locate a case`, async ({ caseListPage, tableUtils, page }) => {
		const caseNumber: string = '#1763-5442-4345-7183';
		const textField0 = faker.lorem.word();

		// Using route interception with mapping JSON for /data/internal/searchCases.

		await test.step('Navigate & perform search', async () => {
			await caseListPage.goto();
			await caseListPage.searchByJurisdiction('Family Divorce');
			await caseListPage.searchByCaseType('XUI Case PoC');
			await caseListPage.searchByTextField0(textField0);
			await caseListPage.exuiCaseListComponent.searchByCaseState('Case created');
		});

		await test.step('Verify mocked list', async () => {
			const table = await tableUtils.mapExuiTable(caseListPage.exuiCaseListComponent.caseListTable);
			expect(table.length).toBe(2);
			expect(table[0]['Case reference']).toBe(caseNumber);
			// Additional field checks from stub mapping
			expect(table[0]['Text Field 0']).toBe('alpha');
			expect(table[0]['Text Field 1']).toBe('alpha');
			expect(table[0]['Text Field 2']).toBe('alpha');
			expect(table[1]['Case reference']).toBe('1747063493980829');
			expect(table[1]['Text Field 0']).toBe('Luna');
			expect(table[1]['Text Field 1']).toBe('Potatoes are yummy');
			expect(table[1]['Text Field 2']).toBe('Cute');
		});
	});
});


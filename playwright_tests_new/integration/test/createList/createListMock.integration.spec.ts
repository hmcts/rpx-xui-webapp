import { faker } from '@faker-js/faker';
import { expect, test } from '../../../E2E/fixtures';
import { loadSessionCookies } from '../../utils/session.utils';
import { buildCaseListMock } from '../../mocks/caseList.mock';

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
  await page.goto(config.urls.manageCaseBaseUrl);
});

test.describe(`Case List as ${userIdentifier}`, () => {
	test(`User ${userIdentifier} can locate a case`, async ({ caseListPage, tableUtils, page }) => {
		const caseNumber: string = '#1763-5442-4345-7183';
		const textField0 = faker.lorem.word();

		await test.step('Mock case list response', async () => {
			const mock = buildCaseListMock(caseNumber);
			await page.route('**/data/internal/searchCases?**', async (route) => {
				if (route.request().method() === 'POST') {
					await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(mock) });
				} else {
					await route.continue();
				}
			});
		});

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
		});
	});
});


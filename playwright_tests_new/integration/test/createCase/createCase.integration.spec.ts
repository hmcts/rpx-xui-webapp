import { faker } from '@faker-js/faker';
// Reuse extended fixtures & page objects from the new E2E framework
import { expect, test } from '../../../E2E/fixtures';
import { buildCaseListMock } from '../../mocks/caseList.mock';

// Integration-focused duplicate of createCase E2E test.
// Keeps same flow while allowing isolated execution via integration config.

test.describe('Case List', () => {
    // Auth provided by Playwright storageState (set in integration config); no manual cookie injection required.

    test('Solicitor can locate a case', async ({ caseListPage, tableUtils, page }) => {
        let caseNumber: string = '#1763-5442-4345-7183';
        const textField0 = faker.lorem.word();

        await test.step('Mock case list response BEFORE navigating to case list', async () => {
            const mock = buildCaseListMock(caseNumber);
            await page.route('**/data/internal/searchCases?**', async (route) => {
                if (route.request().method() === 'POST') {
                    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(mock) });
                }
            });
        });

        await test.step('Navigate & perform search to trigger mocked response', async () => {
            await caseListPage.goto();
            await caseListPage.searchByJurisdiction('Family Divorce');
            await caseListPage.searchByCaseType('XUI Case PoC');
            await caseListPage.searchByTextField0(textField0);
            await caseListPage.exuiCaseListComponent.searchByCaseState('Case created');
        });

        await test.step('Verify mocked case list data is rendered', async () => {
            const table = await tableUtils.mapExuiTable(caseListPage.exuiCaseListComponent.caseListTable);
            expect(table.length).toBe(2);
            expect(table[0]['Case reference']).toBe(caseNumber); // mock uses full case number
        });
    });

});

// Removed separate reuse block; primary tests now rely on global session file.

import { expect, test } from '../../../E2E/fixtures';
import { loadSessionCookies } from '../../utils/session.utils';
import { buildTaskListMock } from '../../mocks/taskList.mock';
import { extractUserIdFromCookies } from 'playwright_tests_new/integration/utils/extractUserIdFromCookies';

const userIdentifier = 'STAFF_ADMIN';
let sessionCookies: any[] = [];
let taskListMockResponse ;

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
        const userId = extractUserIdFromCookies(sessionCookies);
        taskListMockResponse = buildTaskListMock(124, userId);
    }
    await page.goto(config.urls.exuiDefaultUrl+'/work/my-work/list');
});

test.describe(`Case List as ${userIdentifier}`, () => {
    test(`User ${userIdentifier} can view assigned tasks on the task list page`, async ({ taskListPage, tableUtils, page, config }) => {

        await test.step('Intercept tasks endpoint and fulfill with mock body', async () => {
            await page.route('**/workallocation/task*', async route => {
                const body = JSON.stringify(taskListMockResponse);
                await route.fulfill({ status: 200, contentType: 'application/json', body });
            });
        });

        await test.step('Navigate to the search page', async () => {
           await page.goto(config.urls.exuiDefaultUrl+'/work/my-work/list');
        });

        await test.step('Verify user can see a list shows the expected layout given the mock response', async () => {
            //expect(await taskListPage.taskListResultsAmount.textContent()).toBe(`Showing 1 to ${Math.min(taskListMockResponse.tasks.length, 25)} of ${taskListMockResponse.total_records} results`);

            const table = await tableUtils.mapExuiTable(taskListPage.taskListTable);
            expect(table.length).toBe(taskListMockResponse.tasks.length);
            for (let i = 0; i < taskListMockResponse.tasks.length; i++) {
                const expectedFields = taskListMockResponse.tasks[i].case_fields;
                expect(table[i]['Case name']).toBe(expectedFields['Case name']);
            }
        });
    });
});

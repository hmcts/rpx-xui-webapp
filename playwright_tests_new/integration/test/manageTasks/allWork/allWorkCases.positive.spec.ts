import { expect, test } from '../../../../E2E/fixtures';
import {
  allWorkCasesRoutePattern,
  applySessionCookies,
  parseAllWorkCasesRequest,
  setupAllWorkCasesRoutes,
  waitForAllWorkCasesPageRequest,
  waitForFilteredAllWorkCasesRequest,
} from '../../../helpers';
import { buildMyCaseMock, type MyCaseMock } from '../../../mocks/myCases.mock';

const userIdentifier = 'STAFF_ADMIN';

const supportedJurisdictions = ['IA', 'SSCS'];
const supportedJurisdictionDetails = [
  { serviceId: 'IA', serviceName: 'Immigration and Asylum' },
  { serviceId: 'SSCS', serviceName: 'Social security and child support' },
];

const currentFilterPerson = {
  email: 'current.caseworker@example.com',
  firstName: 'Current',
  idamId: 'all-work-current-caseworker',
  lastName: 'Allocation',
  location: {
    id: 231596,
    locationName: 'Birmingham',
    services: ['IA', 'SSCS'],
  },
  roleCategory: 'LEGAL_OPERATIONS',
  service: 'IA',
};

const emptyFilterPerson = {
  email: 'empty.caseworker@example.com',
  firstName: 'Empty',
  idamId: 'all-work-empty-caseworker',
  lastName: 'Allocation',
  location: {
    id: 231596,
    locationName: 'Birmingham',
    services: ['IA', 'SSCS'],
  },
  roleCategory: 'LEGAL_OPERATIONS',
  service: 'IA',
};

const allFilterPeople = [currentFilterPerson, emptyFilterPerson];

const buildAllWorkCase = (index: number, overrides: Partial<MyCaseMock> = {}): MyCaseMock => {
  const caseNumber = index + 1;
  return buildMyCaseMock({
    id: `all-work-allocation-${caseNumber}`,
    case_id: `180000000000${String(caseNumber).padStart(4, '0')}`,
    case_name: `All work case ${caseNumber}`,
    case_category: caseNumber % 2 === 0 ? 'Protection' : 'Human rights',
    case_type: 'Asylum',
    jurisdiction: caseNumber % 2 === 0 ? 'SSCS' : 'IA',
    jurisdictionId: caseNumber % 2 === 0 ? 'SSCS' : 'IA',
    expectedServiceLabel: caseNumber % 2 === 0 ? 'Social security and child support' : 'Immigration and Asylum',
    case_role: 'case-manager',
    role: 'Case Manager',
    role_category: 'LEGAL_OPERATIONS',
    assignee: currentFilterPerson.idamId,
    actions: [],
    ...overrides,
  });
};

const pagedAllWorkCases = Array.from({ length: 140 }, (_, index) => buildAllWorkCase(index));

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);
});

test.describe(`All Work cases as ${userIdentifier}`, { tag: ['@integration', '@integration-manage-tasks'] }, () => {
  test('shows the pre-filter prompt and empty-state message when no cases match the selected person', async ({
    taskListPage,
    page,
  }) => {
    await test.step('Setup all-work cases routes with an empty result for the empty filter user', async () => {
      await setupAllWorkCasesRoutes(
        page,
        { cases: [], total_records: 0, unique_cases: 0 },
        {
          supportedJurisdictions,
          supportedJurisdictionDetails,
          routeHandler: async (route) => {
            const requestBody = parseAllWorkCasesRequest(route.request());
            const actorId = requestBody.searchRequest?.search_parameters?.find(
              (parameter) => parameter.key === 'actorId'
            )?.values;

            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify({
                cases: actorId === emptyFilterPerson.idamId ? [] : pagedAllWorkCases.slice(0, 25),
                total_records: actorId === emptyFilterPerson.idamId ? 0 : pagedAllWorkCases.length,
                unique_cases: actorId === emptyFilterPerson.idamId ? 0 : pagedAllWorkCases.length,
              }),
            });
          },
        }
      );

      await page.route('**/workallocation/caseworker/getUsersByServiceName*', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(allFilterPeople),
        });
      });
    });

    await test.step('Open All work cases and verify the prompt is shown before any filter is applied', async () => {
      await taskListPage.gotoAllWorkCases();
      await expect(taskListPage.allWorkCasesApplyPrompt).toBeVisible();
      await expect(taskListPage.taskRows).toHaveCount(0);
    });

    await test.step('Apply the empty-result person filter and verify the empty-state message', async () => {
      const allWorkCasesRequest = page.waitForRequest((request) => {
        if (!allWorkCasesRoutePattern.exec(request.url()) || request.method() !== 'POST') {
          return false;
        }

        const requestBody = parseAllWorkCasesRequest(request);
        return requestBody.searchRequest?.search_parameters?.some(
          (parameter) => parameter.key === 'actorId' && parameter.values === emptyFilterPerson.idamId
        );
      });

      await taskListPage.applyAllWorkCasesPersonFilter('Empty', 'Empty Allocation');
      await allWorkCasesRequest;

      await expect(taskListPage.allWorkCasesEmptyMessage).toBeVisible();
      await expect(taskListPage.paginationControls).toHaveCount(0);
      await expect(taskListPage.taskRows).toHaveCount(0);
    });
  });

  test('renders filtered all-work cases, captures the request payload, and paginates backend-backed results', async ({
    taskListPage,
    page,
  }) => {
    await test.step('Setup all-work cases routes with backend-style pagination and caseworker search', async () => {
      await setupAllWorkCasesRoutes(
        page,
        { cases: [], total_records: 0, unique_cases: 0 },
        {
          supportedJurisdictions,
          supportedJurisdictionDetails,
          routeHandler: async (route) => {
            const requestBody = parseAllWorkCasesRequest(route.request());
            const pageNumber = requestBody.searchRequest?.pagination_parameters?.page_number ?? 1;
            const pageSize = requestBody.searchRequest?.pagination_parameters?.page_size ?? 25;
            const actorId = requestBody.searchRequest?.search_parameters?.find(
              (parameter) => parameter.key === 'actorId'
            )?.values;
            const resultSet = actorId === currentFilterPerson.idamId ? pagedAllWorkCases : [];
            const startIndex = (pageNumber - 1) * pageSize;

            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify({
                cases: resultSet.slice(startIndex, startIndex + pageSize),
                total_records: resultSet.length,
                unique_cases: resultSet.length,
              }),
            });
          },
        }
      );

      await page.route('**/workallocation/caseworker/getUsersByServiceName*', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(allFilterPeople),
        });
      });
    });

    await test.step('Apply the current-caseworker filter and verify the initial search payload', async () => {
      await taskListPage.gotoAllWorkCases();
      await expect(taskListPage.allWorkCasesApplyPrompt).toBeVisible();

      const firstRequestPromise = waitForFilteredAllWorkCasesRequest(page, currentFilterPerson.idamId);

      await taskListPage.applyAllWorkCasesPersonFilter('Current', 'Current Allocation');
      const firstRequest = await firstRequestPromise;
      const requestBody = parseAllWorkCasesRequest(firstRequest);

      expect(requestBody.view).toBe('AllWorkCases');
      expect(requestBody.searchRequest?.pagination_parameters).toEqual({ page_number: 1, page_size: 25 });
      expect(requestBody.searchRequest?.search_parameters).toEqual(
        expect.arrayContaining([
          { key: 'jurisdiction', operator: 'EQUAL', values: 'IA' },
          { key: 'location_id', operator: 'EQUAL', values: '' },
          { key: 'actorId', operator: 'EQUAL', values: currentFilterPerson.idamId },
          { key: 'role', operator: 'EQUAL', values: 'Legal Ops' },
        ])
      );
    });

    await test.step('Verify the table data, case link, non-sortable headers, and page 1 summary', async () => {
      const firstCase = pagedAllWorkCases[0];

      await expect(taskListPage.taskListTable).toBeVisible();
      await expect(taskListPage.taskRows).toHaveCount(25);
      await expect(taskListPage.allWorkCasesApplyPrompt).toHaveCount(0);
      await expect(taskListPage.paginationControls).toBeVisible();
      await expect(taskListPage.paginationCurrentPage).toContainText('1');
      expect(await taskListPage.getPaginationSummaryText()).toBe('Showing 1 to 25 of 140 results');

      const firstCaseLink = taskListPage.taskListTable.getByRole('link', { name: firstCase.case_name }).first();
      await expect(firstCaseLink).toHaveAttribute(
        'href',
        `/cases/case-details/${firstCase.jurisdictionId}/${firstCase.case_type}/${firstCase.case_id}`
      );

      await expect(taskListPage.sortByCaseNameTableHeader).toHaveCount(0);
      await expect(taskListPage.sortByCaseCategoryTableHeader).toHaveCount(0);
    });

    await test.step('Move to page 3 and verify the backend pagination request and summary', async () => {
      const thirdPageRequestPromise = waitForAllWorkCasesPageRequest(page, 3);

      await taskListPage.openPaginationPage(3);
      const thirdPageRequest = await thirdPageRequestPromise;

      expect(parseAllWorkCasesRequest(thirdPageRequest).searchRequest?.pagination_parameters).toEqual({
        page_number: 3,
        page_size: 25,
      });
      await expect(taskListPage.paginationCurrentPage).toContainText('3');
      expect(await taskListPage.getPaginationSummaryText()).toBe('Showing 51 to 75 of 140 results');
    });
  });
});

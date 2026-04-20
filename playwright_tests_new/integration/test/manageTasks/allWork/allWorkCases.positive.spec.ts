import { expect, test } from '../../../../E2E/fixtures';
import { allWorkCasesRoutePattern, applySessionCookies, setupAllWorkCasesRoutes } from '../../../helpers';
import { buildMyCaseMock, myCasesAllocatorActions, type MyCaseMock } from '../../../mocks/myCases.mock';

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

const reallocationTargetPerson = {
  email: 'replacement.caseworker@example.com',
  firstName: 'Replacement',
  idamId: 'all-work-replacement-caseworker',
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

const allFilterPeople = [currentFilterPerson, reallocationTargetPerson, emptyFilterPerson];

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
    expectedServiceLabel: caseNumber % 2 === 0 ? 'Social security and child support' : 'Immigration & Asylum',
    case_role: 'case-manager',
    role: 'Case Manager',
    role_category: 'LEGAL_OPERATIONS',
    assignee: currentFilterPerson.idamId,
    actions: myCasesAllocatorActions,
    ...overrides,
  });
};

const pagedAllWorkCases = Array.from({ length: 140 }, (_, index) => buildAllWorkCase(index));

const managedAllWorkCases: MyCaseMock[] = [
  buildAllWorkCase(0, {
    id: 'all-work-managed-allocation-1',
    case_id: '1234567812345801',
    case_name: 'All work managed case 1',
  }),
  buildAllWorkCase(1, {
    id: 'all-work-managed-allocation-2',
    case_id: '1234567812345802',
    case_name: 'All work managed case 2',
  }),
];

const getSummaryText = async (summaryLocator: { textContent: () => Promise<string | null> }): Promise<string> => {
  return ((await summaryLocator.textContent()) ?? '').replace(/\s+/g, ' ').trim();
};

const buildRoleAssignmentResponse = (caseItem: MyCaseMock) => {
  return [
    {
      id: caseItem.id,
      actorId: caseItem.assignee,
      name: `Assigned ${caseItem.case_name}`,
      email: `${caseItem.id}@example.com`,
      roleCategory: caseItem.role_category,
      roleName: caseItem.role,
      location: 'Birmingham',
      start: caseItem.startDate,
      end: caseItem.endDate,
    },
  ];
};

const selectAllWorkPersonAndApply = async (
  taskListPage: {
    waitForAllWorkCasesFilterControlsReady: () => Promise<void>;
    allWorkPersonSearchInput: { fill: (value: string) => Promise<void> };
    selectFirstAutocompleteOption: () => Promise<void>;
    applyFilterButton: { click: () => Promise<void> };
  },
  personName: string
) => {
  await taskListPage.waitForAllWorkCasesFilterControlsReady();
  await taskListPage.allWorkPersonSearchInput.fill(personName);
  await taskListPage.selectFirstAutocompleteOption();
  await taskListPage.applyFilterButton.click();
};

const parseAllWorkCasesRequest = (request: { postDataJSON: () => unknown }) => {
  return request.postDataJSON() as {
    searchRequest?: {
      search_parameters?: Array<{ key?: string; values?: unknown }>;
      pagination_parameters?: { page_number?: number; page_size?: number };
    };
    view?: string;
  };
};

type AllWorkCasesRequest = {
  url: () => string;
  method: () => string;
  postDataJSON: () => unknown;
};

const waitForFilteredAllWorkCasesRequest = (
  page: {
    waitForRequest: (predicate: (request: AllWorkCasesRequest) => boolean) => Promise<AllWorkCasesRequest>;
  },
  actorId: string
) => {
  return page.waitForRequest((request) => {
    if (!allWorkCasesRoutePattern.exec(request.url()) || request.method() !== 'POST') {
      return false;
    }

    const requestBody = parseAllWorkCasesRequest(request);
    return requestBody.searchRequest?.search_parameters?.some(
      (parameter) => parameter.key === 'actorId' && parameter.values === actorId
    );
  });
};

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

      await selectAllWorkPersonAndApply(taskListPage, 'Empty');
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

      await selectAllWorkPersonAndApply(taskListPage, 'Current');
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
      expect(await getSummaryText(taskListPage.myCasesResultsAmount)).toBe('Showing 1 to 25 of 140 results');

      const firstCaseLink = taskListPage.taskListTable.getByRole('link', { name: firstCase.case_name }).first();
      await expect(firstCaseLink).toHaveAttribute(
        'href',
        `/cases/case-details/${firstCase.jurisdictionId}/${firstCase.case_type}/${firstCase.case_id}`
      );

      await expect(taskListPage.sortByCaseNameTableHeader).toHaveCount(0);
      await expect(taskListPage.sortByCaseCategoryTableHeader).toHaveCount(0);
    });

    await test.step('Move to page 3 and verify the backend pagination request and summary', async () => {
      const thirdPageRequestPromise = page.waitForRequest((request) => {
        if (!allWorkCasesRoutePattern.exec(request.url()) || request.method() !== 'POST') {
          return false;
        }

        const requestBody = parseAllWorkCasesRequest(request);
        return requestBody.searchRequest?.pagination_parameters?.page_number === 3;
      });

      await taskListPage.openPaginationPage(3);
      const thirdPageRequest = await thirdPageRequestPromise;

      expect(parseAllWorkCasesRequest(thirdPageRequest).searchRequest?.pagination_parameters).toEqual({
        page_number: 3,
        page_size: 25,
      });
      await expect(taskListPage.paginationCurrentPage).toContainText('3');
      expect(await getSummaryText(taskListPage.myCasesResultsAmount)).toBe('Showing 51 to 75 of 140 results');
    });
  });

  test('shows manage actions and completes reallocate and remove-allocation flows from the All work cases tab', async ({
    taskListPage,
    page,
  }) => {
    await test.step('Setup all-work cases routes, role-allocation routes, and caseworker search', async () => {
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
                cases: actorId === currentFilterPerson.idamId ? managedAllWorkCases : [],
                total_records: actorId === currentFilterPerson.idamId ? managedAllWorkCases.length : 0,
                unique_cases: actorId === currentFilterPerson.idamId ? managedAllWorkCases.length : 0,
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

      await page.route('**/api/role-access/roles/post', async (route) => {
        const requestBody = (route.request().postDataJSON() as { assignmentId?: string }) ?? {};
        const matchingCase =
          managedAllWorkCases.find((caseItem) => caseItem.id === requestBody.assignmentId) ?? managedAllWorkCases[0];

        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(buildRoleAssignmentResponse(matchingCase)),
        });
      });

      await page.route('**/api/role-access/allocate-role/reallocate', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({}),
        });
      });

      await page.route('**/api/role-access/allocate-role/delete', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({}),
        });
      });
    });

    await test.step('Filter the All work cases tab down to the current-caseworker allocations', async () => {
      await taskListPage.gotoAllWorkCases();

      const filteredRequest = waitForFilteredAllWorkCasesRequest(page, currentFilterPerson.idamId);

      await selectAllWorkPersonAndApply(taskListPage, 'Current');
      await filteredRequest;

      await expect(taskListPage.taskListTable).toBeVisible();
      await expect(taskListPage.taskRows).toHaveCount(managedAllWorkCases.length);
      expect(await getSummaryText(taskListPage.myCasesResultsAmount)).toBe('Showing 1 to 2 of 2 results');
    });

    await test.step('Verify both rows expose the Reallocate and Remove actions', async () => {
      for (let rowIndex = 0; rowIndex < managedAllWorkCases.length; rowIndex += 1) {
        await taskListPage.openManageActionsForRow(rowIndex, `all work cases manage menu row ${rowIndex + 1}`);
        await expect(taskListPage.getTaskActionForRow(rowIndex, 'reallocate')).toBeVisible();
        await expect(taskListPage.getTaskActionForRow(rowIndex, 'remove')).toBeVisible();
      }
    });

    await test.step('Reallocate the first filtered case and verify the submission payload', async () => {
      const caseItem = managedAllWorkCases[0];

      await taskListPage.openManageActionsForRow(0, 'all work cases reallocate action');
      await taskListPage.clickTaskActionForRow(0, 'reallocate', 'all work cases reallocate action');

      await expect(page).toHaveURL(
        new RegExp(`/role-access/allocate-role/reallocate\\?caseId=${caseItem.case_id}.*assignmentId=${caseItem.id}`)
      );

      await taskListPage.reassignUserSearchInput.fill('Replacement');
      await taskListPage.selectFirstReassignUserOption();
      await taskListPage.continueButton.click();

      await page.getByLabel('Indefinite').check({ force: true });
      await taskListPage.continueButton.click();
      await expect(page.locator('main')).toContainText('Check your changes');

      const reallocateRequest = await taskListPage.clickButtonAndWaitForRequest(
        page.getByRole('button', { name: 'Confirm allocation' }),
        (request) => request.method() === 'POST' && request.url().includes('/api/role-access/allocate-role/reallocate'),
        'confirming All work case reallocation'
      );

      expect(reallocateRequest.postDataJSON()).toEqual(
        expect.objectContaining({
          action: 'reallocate',
          caseId: caseItem.case_id,
          assignmentId: caseItem.id,
          jurisdiction: caseItem.jurisdictionId,
          durationOfRole: 'Indefinite',
          person: expect.objectContaining({
            id: reallocationTargetPerson.idamId,
          }),
        })
      );

      await expect(taskListPage.exuiBodyComponent.message).toContainText("You've reallocated a role");
      await expect(taskListPage.allWorkCasesApplyPrompt).toBeVisible();

      const refreshedCasesRequest = waitForFilteredAllWorkCasesRequest(page, currentFilterPerson.idamId);
      await taskListPage.applyFilterButton.click();
      await refreshedCasesRequest;

      await expect(taskListPage.taskListTable).toBeVisible();
      await expect(taskListPage.taskRows).toHaveCount(managedAllWorkCases.length);
      expect(await getSummaryText(taskListPage.myCasesResultsAmount)).toBe('Showing 1 to 2 of 2 results');
    });

    await test.step('Remove the second filtered case allocation and verify the submission payload', async () => {
      const caseItem = managedAllWorkCases[1];

      await taskListPage.openManageActionsForRow(1, 'all work cases remove allocation action');
      await taskListPage.clickTaskActionForRow(1, 'remove', 'all work cases remove allocation action');

      await expect(page).toHaveURL(
        new RegExp(`/role-access/allocate-role/remove\\?caseId=${caseItem.case_id}.*assignmentId=${caseItem.id}`)
      );

      const removeAllocationRequest = await taskListPage.clickButtonAndWaitForRequest(
        page.getByRole('button', { name: 'Remove allocation' }),
        (request) => request.method() === 'POST' && request.url().includes('/api/role-access/allocate-role/delete'),
        'confirming All work case removal'
      );

      expect(removeAllocationRequest.postDataJSON()).toEqual({ assigmentId: caseItem.id });

      await expect(taskListPage.exuiBodyComponent.message).toContainText(
        "You've removed a role allocation. You may need to unassign or reassign associated tasks too."
      );
      await expect(taskListPage.allWorkCasesApplyPrompt).toBeVisible();

      const refreshedCasesRequest = waitForFilteredAllWorkCasesRequest(page, currentFilterPerson.idamId);
      await taskListPage.applyFilterButton.click();
      await refreshedCasesRequest;

      await expect(taskListPage.taskListTable).toBeVisible();
      await expect(taskListPage.taskRows).toHaveCount(managedAllWorkCases.length);
      expect(await getSummaryText(taskListPage.myCasesResultsAmount)).toBe('Showing 1 to 2 of 2 results');
    });
  });
});

import { expect, test } from '../../../../E2E/fixtures';
import { applySessionCookies, setupMyCasesRoutes } from '../../../helpers';
import { singleUsersGetByRoleMockResponse } from '../../../helpers/taskActionApiMocks.helper';
import { buildMyCaseMock, myCasesAllocatorActions, type MyCaseMock } from '../../../mocks/myCases.mock';

const userIdentifier = 'STAFF_ADMIN';
const replacementUser = singleUsersGetByRoleMockResponse[0];

const managedCases: MyCaseMock[] = [
  buildMyCaseMock({
    id: 'managed-allocation-1',
    case_id: '1234567812345670',
    case_name: 'Managed allocation case 1',
    case_category: 'Protection',
    case_type: 'Asylum',
    jurisdiction: 'IA',
    jurisdictionId: 'IA',
    expectedServiceLabel: 'Immigration & Asylum',
    case_role: 'case-manager',
    role: 'Case Manager',
    role_category: 'LEGAL_OPERATIONS',
    assignee: 'caseworker-existing-1',
    actions: myCasesAllocatorActions,
  }),
  buildMyCaseMock({
    id: 'managed-allocation-2',
    case_id: '1234567812345671',
    case_name: 'Managed allocation case 2',
    case_category: 'Human rights',
    case_type: 'Asylum',
    jurisdiction: 'SSCS',
    jurisdictionId: 'SSCS',
    expectedServiceLabel: 'Social security and child support',
    case_role: 'case-manager',
    role: 'Case Manager',
    role_category: 'LEGAL_OPERATIONS',
    assignee: 'caseworker-existing-2',
    actions: myCasesAllocatorActions,
  }),
];

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

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);
});

test.describe(`My Cases manage links as ${userIdentifier}`, { tag: ['@integration', '@integration-manage-tasks'] }, () => {
  test('shows manage actions on each row and completes reallocate and remove-allocation flows', async ({
    taskListPage,
    page,
  }) => {
    await test.step('Setup My cases data and role-allocation routes', async () => {
      await setupMyCasesRoutes(
        page,
        {
          cases: managedCases,
          total_records: managedCases.length,
          unique_cases: managedCases.length,
        },
        {}
      );

      await page.route('**/workallocation/caseworker/getUsersByServiceName*', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(singleUsersGetByRoleMockResponse),
        });
      });

      await page.route('**/api/role-access/roles/post', async (route) => {
        const requestBody = (route.request().postDataJSON() as { assignmentId?: string }) ?? {};
        const matchingCase = managedCases.find((caseItem) => caseItem.id === requestBody.assignmentId) ?? managedCases[0];

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

    await test.step('Open My cases and verify manage actions are available for both rows', async () => {
      await taskListPage.gotoMyCases();
      await expect(taskListPage.taskListTable).toBeVisible();
      await taskListPage.exuiSpinnerComponent.wait();

      for (let rowIndex = 0; rowIndex < managedCases.length; rowIndex += 1) {
        await taskListPage.openManageActionsForRow(rowIndex, `my cases manage menu row ${rowIndex + 1}`);
        await expect(taskListPage.getTaskActionForRow(rowIndex, 'reallocate')).toBeVisible();
        await expect(taskListPage.getTaskActionForRow(rowIndex, 'remove')).toBeVisible();
      }
    });

    await test.step('Reallocate the first managed case and verify the submitted payload', async () => {
      const caseItem = managedCases[0];

      await taskListPage.openManageActionsForRow(0, 'my cases reallocate action');
      await taskListPage.clickTaskActionForRow(0, 'reallocate', 'my cases reallocate action');

      await expect(page).toHaveURL(
        new RegExp(`/role-access/allocate-role/reallocate\\?caseId=${caseItem.case_id}.*assignmentId=${caseItem.id}`)
      );
      await expect(page.locator('main')).toContainText('Find the person');

      await taskListPage.reassignUserSearchInput.fill('test');
      await taskListPage.selectFirstReassignUserOption();
      await taskListPage.continueButton.click();

      await expect(page.locator('main')).toContainText('Duration of role');
      await page.getByLabel('Indefinite').check({ force: true });
      await taskListPage.continueButton.click();

      await expect(page.locator('main')).toContainText('Check your changes');

      const reallocateRequest = await taskListPage.clickButtonAndWaitForRequest(
        page.getByRole('button', { name: 'Confirm allocation' }),
        (request) => request.method() === 'POST' && request.url().includes('/api/role-access/allocate-role/reallocate'),
        'confirming My cases role reallocation'
      );

      expect(reallocateRequest.postDataJSON()).toEqual(
        expect.objectContaining({
          action: 'reallocate',
          caseId: caseItem.case_id,
          assignmentId: caseItem.id,
          jurisdiction: caseItem.jurisdictionId,
          durationOfRole: 'Indefinite',
          person: expect.objectContaining({
            id: replacementUser.idamId,
          }),
        })
      );

      await expect(taskListPage.taskListTable).toBeVisible();
      await expect(taskListPage.exuiBodyComponent.message).toContainText("You've reallocated a role");
    });

    await test.step('Remove the second managed allocation and verify the submitted payload', async () => {
      const caseItem = managedCases[1];

      await taskListPage.openManageActionsForRow(1, 'my cases remove allocation action');
      await taskListPage.clickTaskActionForRow(1, 'remove', 'my cases remove allocation action');

      await expect(page).toHaveURL(
        new RegExp(`/role-access/allocate-role/remove\\?caseId=${caseItem.case_id}.*assignmentId=${caseItem.id}`)
      );
      await expect(page.locator('main')).toContainText('Remove allocation');
      await expect(page.locator('main')).toContainText(caseItem.role);

      const removeAllocationRequest = await taskListPage.clickButtonAndWaitForRequest(
        page.getByRole('button', { name: 'Remove allocation' }),
        (request) => request.method() === 'POST' && request.url().includes('/api/role-access/allocate-role/delete'),
        'confirming My cases remove allocation'
      );

      expect(removeAllocationRequest.postDataJSON()).toEqual({ assigmentId: caseItem.id });

      await expect(taskListPage.taskListTable).toBeVisible();
      await expect(taskListPage.exuiBodyComponent.message).toContainText(
        "You've removed a role allocation. You may need to unassign or reassign associated tasks too."
      );
    });
  });
});

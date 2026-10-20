import { expect, test } from '../../../E2E/fixtures';
import { setupManageTasksBaseRoutes } from '../../helpers';
import { setupTaskActionEndpointMocks } from '../../helpers/taskActionApiMocks.helper';
import { setupMultipleRoleCategoriesRoutes } from '../../helpers/multipleRoleCategoriesMockRoutes.helper';
import { buildTaskListMock, myActionsList } from '../../mocks/taskList.mock';

test.describe(
  'reassign confirmation header with route-mocked user categories',
  { tag: ['@integration', '@integration-platform-services'] },
  () => {
    for (const { judicialUser, expectedHeader, otherHeader } of [
      { judicialUser: true, expectedHeader: 'Task created', otherHeader: 'Due date' },
      { judicialUser: false, expectedHeader: 'Due date', otherHeader: 'Task created' },
    ]) {
      test(`Shows ${expectedHeader} for ${judicialUser ? 'dual-category' : 'single-category'} user on Judicial reassign confirmation`, async ({
        taskListPage,
        page,
      }) => {
        const taskList = buildTaskListMock(1, 'multi-role-user', myActionsList);
        const task = taskList.tasks[0];

        await setupManageTasksBaseRoutes(page, {
          taskListResponse: taskList,
          user: {
            userId: 'multi-role-user',
            roleCategories: judicialUser ? ['LEGAL_OPERATIONS', 'JUDICIAL'] : ['LEGAL_OPERATIONS'],
            roles: [
              'caseworker-ia',
              'caseworker-ia-caseofficer',
              'hmcts-legal-operations',
              ...(judicialUser ? ['caseworker-ia-iacjudge', 'hmcts-judiciary'] : []),
            ],
            replaceRoleAssignments: true,
            roleAssignments: [
              {
                jurisdiction: 'IA',
                roleCategory: 'LEGAL_OPERATIONS',
                roleName: 'task-supervisor',
                roleType: 'ORGANISATION',
                substantive: 'Y',
              },
              {
                jurisdiction: 'IA',
                roleCategory: 'LEGAL_OPERATIONS',
                roleName: 'hmcts-legal-operations',
                roleType: 'ORGANISATION',
                substantive: 'Y',
              },
              ...(judicialUser
                ? [
                    {
                      jurisdiction: 'IA',
                      roleCategory: 'JUDICIAL',
                      roleName: 'hmcts-judiciary',
                      roleType: 'ORGANISATION',
                      substantive: 'Y',
                    },
                  ]
                : []),
            ],
          },
        });
        await setupTaskActionEndpointMocks(page, 'reassign', {
          taskId: task.id,
          caseId: task.case_id,
          jurisdiction: task.jurisdiction,
          caseTypeId: task.case_type_id,
          assigneeId: task.assignee,
        });
        await setupMultipleRoleCategoriesRoutes(page, task.id);

        await taskListPage.goto();
        await taskListPage.openFirstManageActions('multiple role category reassign action');
        await taskListPage.clickTaskAction(taskListPage.taskActionReassign, 'multiple role category reassign action');

        await expect(page).toHaveURL(new RegExp(`/work/${task.id}/reassign`));
        await page.getByRole('radio', { name: 'Judicial' }).check();
        await taskListPage.continueButton.click();
        await expect(page).toHaveURL(/role=JUDICIAL/);
        const judicialSearch = page.waitForRequest((request) => request.url().endsWith('/workallocation/findPerson'));
        await taskListPage.reassignUserSearchInput.fill('Judicial');
        expect((await judicialSearch).postDataJSON()).toEqual(
          expect.objectContaining({
            searchOptions: expect.objectContaining({ userRole: 'Judicial', services: ['IA'] }),
          })
        );
        await taskListPage.selectFirstReassignUserOption();
        await taskListPage.continueButton.click();
        await expect(page.getByRole('columnheader', { name: expectedHeader })).toBeVisible();
        await expect(page.getByRole('columnheader', { name: otherHeader })).toHaveCount(0);
        const assignment = page.waitForRequest(
          (request) => request.method() === 'POST' && request.url().includes(`/workallocation/task/${task.id}/assign`)
        );
        await taskListPage.reassignButton.click();
        expect((await assignment).postDataJSON()).toEqual({ userId: 'judicial-colleague' });
        await expect(taskListPage.exuiBodyComponent.message).toContainText("You've reassigned a task to somebody else.");
      });
    }
  }
);

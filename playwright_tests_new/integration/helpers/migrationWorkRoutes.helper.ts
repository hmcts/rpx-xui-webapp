import type { Page } from '@playwright/test';
import { setupManageTasksBaseRoutes } from './manageTasksMockRoutes.helper';
import { setupMigrationVisualRoutes } from './migrationVisualRoutes.helper';
import { setupMultipleRoleCategoriesRoutes } from './multipleRoleCategoriesMockRoutes.helper';
import { taskListRoutePattern } from './taskListMockRoutes.helper';
import { setupTaskActionEndpointMocks } from './taskActionApiMocks.helper';
import {
  buildMigrationRoleUser,
  buildMigrationWorkTaskList,
  MIGRATION_WORK_ROLES,
  MIGRATION_WORK_USER,
} from '../mocks/migrationWork.mock';

export async function setupMigrationMyWork(page: Page, emptyAssigned = false) {
  await setupMigrationVisualRoutes(page, MIGRATION_WORK_ROLES);
  const assigned = buildMigrationWorkTaskList();
  const available = buildMigrationWorkTaskList(true);
  await setupManageTasksBaseRoutes(page, {
    user: { userId: MIGRATION_WORK_USER, roles: MIGRATION_WORK_ROLES },
    taskListHandler: async (route) => {
      const { view } = route.request().postDataJSON();
      await route.fulfill({
        json: view === 'AvailableTasks' ? available : emptyAssigned ? { tasks: [], total_records: 0 } : assigned,
      });
    },
  });
}

export async function setupMigrationRoleConfirmation(page: Page, dualCategory: boolean) {
  const user = buildMigrationRoleUser(dualCategory);
  await setupMigrationVisualRoutes(page, user.roles);
  const taskList = buildMigrationWorkTaskList();
  const task = taskList.tasks[0];
  await setupManageTasksBaseRoutes(page, { taskListResponse: taskList, user });
  await setupTaskActionEndpointMocks(page, 'reassign', {
    taskId: task.id,
    caseId: task.case_id,
    jurisdiction: task.jurisdiction,
    caseTypeId: task.case_type_id,
    assigneeId: task.assignee,
    task_name: task.task_title,
    due_date: task.due_date,
    dueDate: task.dueDate,
    minor_priority: task.minor_priority,
    major_priority: task.major_priority,
    priority_date: task.priority_date,
  });
  await setupMultipleRoleCategoriesRoutes(page, task.id);
  return task;
}

export async function setupMigrationTaskPages(page: Page) {
  await setupMigrationMyWork(page);
  const template = buildMigrationWorkTaskList().tasks[0];
  const tasks = Array.from({ length: 26 }, (_, index) => {
    const number = String(index + 1).padStart(2, '0');
    const caseName = `Migration case ${number}`;
    return {
      ...template,
      id: `migration-task-${number}`,
      case_id: `17000000000000${number}`,
      case_name: caseName,
      case_name_field: caseName,
    };
  });
  await page.route(taskListRoutePattern, async (route) => {
    const { searchRequest } = route.request().postDataJSON();
    const pageNumber = searchRequest.pagination_parameters?.page_number ?? 1;
    const offset = (pageNumber - 1) * 25;
    await route.fulfill({ json: { tasks: tasks.slice(offset, offset + 25), total_records: tasks.length } });
  });
}

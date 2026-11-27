import { availableActionsList, buildTaskListMock, myActionsList } from './taskList.mock';

export const MIGRATION_WORK_USER = 'migration-work-user';
export const MIGRATION_WORK_ROLES = ['caseworker-ia', 'caseworker-ia-caseofficer', 'hmcts-legal-operations'];

export function buildMigrationWorkTaskList(available = false) {
  const mock = buildTaskListMock(1, available ? '' : MIGRATION_WORK_USER, available ? availableActionsList : myActionsList);
  const task = mock.tasks[0];
  Object.assign(task, {
    id: '77777777-7777-4777-8777-777777777777',
    case_id: '1700000000000001',
    case_name: available ? 'Available migration case' : 'Assigned migration case',
    case_name_field: available ? 'Available migration case' : 'Assigned migration case',
    case_category: 'Protection',
    case_category_field: 'Protection',
    case_management_category: 'Protection',
    name: 'Review the appeal',
    task_title: 'Review the appeal',
    task_field: 'Review the appeal',
    type: 'reviewTheAppeal',
    task_state: available ? 'unassigned' : 'assigned',
    created_date: '2026-01-10T10:00:00.000Z',
    due_date: '2026-02-10T10:00:00.000Z',
    dueDate: '2026-02-10T10:00:00.000Z',
    due_date_field: '2026-02-10T10:00:00.000Z',
    priority_date: '2026-01-20T10:00:00.000Z',
    next_hearing_date: null,
    minor_priority: 500,
    major_priority: 1000,
    priority_field: 500,
    description: 'Synthetic migration work item',
  });
  return mock;
}

export function buildMigrationRoleUser(dualCategory: boolean) {
  return {
    userId: MIGRATION_WORK_USER,
    roleCategories: dualCategory ? ['LEGAL_OPERATIONS', 'JUDICIAL'] : ['LEGAL_OPERATIONS'],
    roles: [...MIGRATION_WORK_ROLES, 'caseworker-ia-iacjudge', 'hmcts-judiciary'],
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
      {
        jurisdiction: 'IA',
        roleCategory: 'JUDICIAL',
        roleName: 'hmcts-judiciary',
        roleType: 'ORGANISATION',
        substantive: 'Y',
      },
    ],
  };
}

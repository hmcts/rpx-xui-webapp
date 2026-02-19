import { faker } from '@faker-js/faker';

export type TaskActions = {
  id: string;
  title: string;
};

export const actionsList: TaskActions[] = [
  { id: 'cancel', title: 'Cancel task' },
  { id: 'complete', title: 'Mark as done' },
  { id: 'go', title: 'Go to task' },
  { id: 'reassign', title: 'Reassign task' },
  { id: 'unclaim', title: 'Unassign task' },
];

export const avilableActionsList: TaskActions[] = [
  { id: 'claim', title: 'Assign to me' },
  {
    id: 'claim-and-go',
    title: 'Assign to me and go to task',
  },
];

export const permissions = {
  values: ['read', 'own', 'manage', 'execute', 'cancel', 'complete', 'claim', 'assign', 'unassign'],
};

export const caseCategories = ['Protection', 'Human rights', 'EUSS'];
export const caseTypes = [
  'detainedListTheCase',
  'reviewTheAppeal',
  'reviewInterpreters',
  'reviewRespondentResponse',
  'detainedReviewInterpreters',
];

export const dateOptions = [
  { label: 'yesterday', value: faker.date.recent({ days: 2 }) },
  { label: 'today', value: new Date() },
  { label: 'tomorrow', value: faker.date.soon({ days: 1 }) },
  { label: 'next week', value: faker.date.soon({ days: 7 }) },
  { label: 'next month', value: faker.date.soon({ days: 30 }) },
  { label: 'future', value: faker.date.soon({ days: faker.number.int({ min: 14, max: 180 }) }) },
];

export function buildAvailableTasksListMock(rowCount: number = 3, actions: TaskActions[] = avilableActionsList) {
  return buildMyTaskListMock(rowCount, '', actions);
}

export function buildMyTaskListMock(rowCount: number = 3, assignee: string, actions: TaskActions[] = actionsList) {
  const maxResults = 25;
  const tasks = Array.from({ length: Math.min(rowCount, maxResults) }, (_, i) => {
    // Created date: always in the past (up to 90 days ago)
    const createdDate = faker.date.past({ years: 0.25 });
    // Due date: pick from options
    const dueOpt = faker.helpers.arrayElement(dateOptions);
    const dueDate = dueOpt.value;
    // Hearing date: random future date (or null)
    const hearingDate = faker.datatype.boolean() ? faker.date.soon({ days: faker.number.int({ min: 1, max: 90 }) }) : null;
    // Format as ISO8601 with timezone
    const formatDate = (d: Date | null) => (d ? d.toISOString().replace(/\.\d{3}Z$/, '+0000') : '');
    // Priority: random int 1-10
    const priority = faker.number.int({ min: 1, max: 10 });
    // Case name/category/location/task
    const caseName = faker.company.name();
    const caseType = faker.helpers.arrayElement(caseTypes);
    const caseCategory = faker.helpers.arrayElement(caseCategories);
    const locationName = 'Taylor House';
    const taskTitle = faker.word.words({ count: { min: 2, max: 5 } });
    return {
      id: faker.string.uuid(),
      name: taskTitle,
      ...(assignee ? { assignee } : {}),
      type: caseType,
      task_state: 'assigned',
      task_system: 'SELF',
      security_classification: 'PUBLIC',
      task_title: taskTitle,
      created_date: formatDate(createdDate),
      due_date: formatDate(dueDate),
      location_name: locationName,
      location: '765324',
      execution_type: 'Case Management Task',
      jurisdiction: 'IA',
      region: '1',
      case_type_id: 'Asylum',
      case_id: faker.number.int({ min: 1000000000000000, max: 9999999999999999 }).toString(),
      case_category: caseCategory,
      case_name: caseName,
      auto_assigned: false,
      warnings: false,
      warning_list: { values: [] },
      case_management_category: caseCategory,
      work_type_id: 'applications',
      work_type_label: 'Applications',
      permissions,
      description: `[Decide an application](/case/IA/Asylum/${faker.number.int({ min: 1000000000000000, max: 9999999999999999 })}/trigger/decideAnApplication)`,
      role_category: 'LEGAL_OPERATIONS',
      minor_priority: priority,
      major_priority: priority * 1000,
      priority_date: formatDate(dueDate),
      dueDate: formatDate(dueDate),
      actions,
      // Flattened case fields
      case_name_field: caseName,
      case_category_field: caseCategory,
      location_field: locationName,
      task_field: taskTitle,
      due_date_field: formatDate(dueDate),
      next_hearing_date: hearingDate ? formatDate(hearingDate) : null,
      priority_field: priority,
    };
  });

  return {
    tasks,
    total_records: rowCount,
  };
}

/**
 * Deterministic mock builder: always returns the same data except for due dates.
 * Due dates: one in the past, one today, one tomorrow, one next month.
 * Priority is the same for all.
 */
export function buildDeterministicMyTasksListMock(assignee: string) {
  const priority = 5;
  const highPriority = 10;
  const baseTasks = [
    {
      case_name: 'Smith & Co',
      case_category: 'Protection',
      location_name: 'Taylor House',
      task_title: 'Review documents',
      due_date: new Date(Date.now() - 86400000 * 7).toISOString(), // 7 days ago
      priority_field: 'urgent',
      minor_priority: 5,
      major_priority: 1000,
    },
    {
      case_name: 'Jones LLC',
      case_category: 'Human rights',
      location_name: 'Manchester',
      task_title: 'Prepare hearing',
      due_date: new Date().toISOString(), // today
      priority_field: 'high',
      minor_priority: 500,
      major_priority: 5000,
    },
    {
      case_name: 'Brown Group',
      case_category: 'EUSS',
      location_name: 'Liverpool',
      task_title: 'Send notification',
      due_date: new Date(Date.now() + 86400000).toISOString(), // tomorrow
      priority_field: 'medium',
      minor_priority: 500,
      major_priority: 5000,
    },
    {
      case_name: 'Taylor Inc',
      case_category: 'Protection',
      location_name: 'Birmingham',
      task_title: 'Update records',
      due_date: new Date(Date.now() + 86400000 * 25).toISOString(), // next month
      priority_field: 'low',
      minor_priority: 500,
      major_priority: 5000,
    },
  ];
  const staticWarningList = {
    values: [
      {
        warningCode: '123',
        warningText: 'This warning message is here to test the warning banner functionality.',
      },
    ],
  };

  const tasks = baseTasks.map((t, i) => {
    const itemPriority = t.minor_priority;
    const warnings = i === 0;
    const warning_list = i === 0 ? staticWarningList : { values: [] };
    const priority_field = t.priority_field;
    return {
      id: `static-id-${i}`,
      name: t.task_title,
      ...(assignee ? { assignee } : {}),
      type: 'processApplicationUpdateHearingRequirements',
      task_state: 'assigned',
      task_system: 'SELF',
      security_classification: 'PUBLIC',
      task_title: t.task_title,
      created_date: new Date().toISOString(),
      due_date: t.due_date,
      location_name: t.location_name,
      location: '765324',
      execution_type: 'Case Management Task',
      jurisdiction: 'IA',
      region: '1',
      case_type_id: 'Asylum',
      case_id: `static-case-id-${i}`,
      case_category: t.case_category,
      case_name: t.case_name,
      auto_assigned: false,
      warnings,
      warning_list,
      case_management_category: t.case_category,
      work_type_id: 'applications',
      work_type_label: 'Applications',
      permissions,
      description: `[Decide an application](/case/IA/Asylum/static-case-id-${i}/trigger/decideAnApplication)`,
      role_category: 'LEGAL_OPERATIONS',
      minor_priority: t.minor_priority,
      major_priority: t.major_priority,
      priority_date: t.due_date,
      dueDate: t.due_date,
      actions: actionsList,
      // Flattened case fields
      case_name_field: t.case_name,
      case_category_field: t.case_category,
      location_field: t.location_name,
      task_field: t.task_title,
      due_date_field: t.due_date,
      next_hearing_date: null,
      priority_field,
    };
  });
  return {
    tasks,
    total_records: tasks.length,
  };
}

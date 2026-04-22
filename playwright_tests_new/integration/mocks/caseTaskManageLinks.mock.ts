import { buildCaseDetailsTasksFromParams, type TaskDetailsParams } from './caseDetailsTasks.builder';

export type CaseTaskManageLinksCaseworker = {
  email: string;
  firstName: string;
  idamId: string;
  lastName: string;
  location: {
    id: number;
    locationName: string;
    services: string[];
  };
  roleCategory: 'LEGAL_OPERATIONS';
  service: 'IA';
};

export type CaseTaskManageLinksState = {
  claimTaskAssigneeId?: string;
  managedTaskAssigneeId?: string;
};

export const CASE_TASK_MANAGE_LINKS_BASE_LOCATION = {
  id: 231596,
  locationName: 'Taylor House',
  services: ['IA'],
};

export function buildCaseTaskManageLinksCaseworkers(currentUserId: string): {
  currentUser: CaseTaskManageLinksCaseworker;
  existingAssignee: CaseTaskManageLinksCaseworker;
  replacementAssignee: CaseTaskManageLinksCaseworker;
  all: CaseTaskManageLinksCaseworker[];
} {
  const currentUser: CaseTaskManageLinksCaseworker = {
    email: 'current.caseworker@example.com',
    firstName: 'Current',
    idamId: currentUserId,
    lastName: 'Caseworker',
    location: CASE_TASK_MANAGE_LINKS_BASE_LOCATION,
    roleCategory: 'LEGAL_OPERATIONS',
    service: 'IA',
  };

  const existingAssignee: CaseTaskManageLinksCaseworker = {
    email: 'existing.caseworker@example.com',
    firstName: 'Existing',
    idamId: 'existing-caseworker-1',
    lastName: 'Caseworker',
    location: CASE_TASK_MANAGE_LINKS_BASE_LOCATION,
    roleCategory: 'LEGAL_OPERATIONS',
    service: 'IA',
  };

  const replacementAssignee: CaseTaskManageLinksCaseworker = {
    email: 'replacement.caseworker@example.com',
    firstName: 'Replacement',
    idamId: 'replacement-caseworker-1',
    lastName: 'Caseworker',
    location: CASE_TASK_MANAGE_LINKS_BASE_LOCATION,
    roleCategory: 'LEGAL_OPERATIONS',
    service: 'IA',
  };

  return {
    currentUser,
    existingAssignee,
    replacementAssignee,
    all: [replacementAssignee, currentUser, existingAssignee],
  };
}

export function buildCaseTaskManageLinksRows(options: {
  caseId: string;
  claimTaskId: string;
  managedTaskId: string;
  claimTaskTitle: string;
  managedTaskTitle: string;
  taskDueDate: string;
  state: CaseTaskManageLinksState;
}): TaskDetailsParams[] {
  const claimTaskActions = options.state.claimTaskAssigneeId
    ? [{ id: 'unclaim', title: 'Unassign task' }]
    : [{ id: 'claim', title: 'Assign to me' }];
  const managedTaskActions = options.state.managedTaskAssigneeId
    ? [
        { id: 'reassign', title: 'Reassign task' },
        { id: 'unclaim', title: 'Unassign task' },
      ]
    : [{ id: 'claim', title: 'Assign to me' }];

  return [
    {
      id: options.claimTaskId,
      title: options.claimTaskTitle,
      state: options.state.claimTaskAssigneeId ? 'assigned' : 'unassigned',
      dueDate: options.taskDueDate,
      priorityDate: options.taskDueDate,
      locationName: 'Taylor House',
      location: '765324',
      jurisdiction: 'IA',
      caseTypeId: 'Asylum',
      caseId: options.caseId,
      caseCategory: 'Protection',
      caseName: 'Bob Smith',
      description: 'Claim this task to continue processing the case.',
      assignee: options.state.claimTaskAssigneeId ?? '',
      actions: claimTaskActions,
    },
    {
      id: options.managedTaskId,
      title: options.managedTaskTitle,
      state: options.state.managedTaskAssigneeId ? 'assigned' : 'unassigned',
      dueDate: options.taskDueDate,
      priorityDate: options.taskDueDate,
      locationName: 'Taylor House',
      location: '765324',
      jurisdiction: 'IA',
      caseTypeId: 'Asylum',
      caseId: options.caseId,
      caseCategory: 'Protection',
      caseName: 'Bob Smith',
      description: 'Manage this task from the case details Tasks tab.',
      assignee: options.state.managedTaskAssigneeId ?? '',
      actions: managedTaskActions,
    },
  ];
}

export function buildCaseTaskManageLinksResponse(options: {
  caseId: string;
  claimTaskId: string;
  managedTaskId: string;
  claimTaskTitle: string;
  managedTaskTitle: string;
  taskDueDate: string;
  state: CaseTaskManageLinksState;
}) {
  return buildCaseDetailsTasksFromParams({
    caseId: options.caseId,
    tasks: buildCaseTaskManageLinksRows(options),
  });
}

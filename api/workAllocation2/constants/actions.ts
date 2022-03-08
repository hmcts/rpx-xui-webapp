import { Action } from '../interfaces/common';

export const ASSIGN: Action = {
  id: 'assign',
  title: 'Assign task',
};
export const CANCEL: Action = {
  id: 'cancel',
  title: 'Cancel task',
};
export const CLAIM: Action = {
  id: 'claim',
  title: 'Assign to me',
};
export const COMPLETE: Action = {
  id: 'complete',
  title: 'Mark as done',
};
export const RELEASE: Action = {
  id: 'unclaim',
  title: 'Unassign task',
};
export const CLAIM_AND_GO: Action = {
  id: 'claim-and-go',
  title: 'Assign to me and go to case',
};
export const GO: Action = {
  id: 'go',
  title: 'Go to task',
};
export const REASSIGN: Action = {
  id: 'reassign',
  title: 'Reassign task',
};
export const RE_ALLOCATE: Action = {
  id: 'reallocate',
  title: 'Reallocate',
};
export const REMOVE_ALLOCATE: Action = {
  id: 'remove',
  title: 'Remove Allocation',
};

export const VIEW_PERMISSIONS_ACTIONS_MATRIX = {
  // This matrix is for configuring permissions and actions defined in the work allocation permission table
  // level 1 - select a view, like 'MyTasks'
  // level 2 - select a permission, like 'Manage'
  // level 3 - return the actions array, like [REASSIGN, RELEASE, GO]
  ActiveTasksAssignedCurrentUser: {
    Execute: [CLAIM, REASSIGN, RELEASE],
  },
  ActiveTasksAssignedOtherUser: {
    Execute: [CLAIM],
    Manage: [REASSIGN, RELEASE],
  },
  ActiveTasksUnassigned: {
    Execute: [CLAIM],
  },
  AllCases: {
    Manage: [RE_ALLOCATE, REMOVE_ALLOCATE],
  },
  AllWorkAssigned: {
    Cancel: [CANCEL],
    Execute: [COMPLETE],
    Manage: [REASSIGN, RELEASE, GO],
  },
  AllWorkUnassigned: {
    Cancel: [CANCEL],
    Execute: [COMPLETE],
    Manage: [ASSIGN, GO],
  },
  AvailableTasks: {
    Execute: [CLAIM, CLAIM_AND_GO],
  },
  MyCases: {
    Manage: [REASSIGN, RELEASE, GO],
  },
  MyTasks: {
    Manage: [REASSIGN, RELEASE, GO],
  },
};

export enum TaskPermission {
  READ = 'Read',
  REFER = 'Refer',
  MANAGE = 'Manage',
  OWN = 'Own',
  EXECUTE = 'Execute',
  CANCEL = 'Cancel',
}

export enum ViewType {
  ACTIVE_TASKS = 'ActiveTasks',
  ACTIVE_TASKS_ASSIGNED_CURRENT = 'ActiveTasksAssignedCurrentUser',
  ACTIVE_TASKS_ASSIGNED_OTHER = 'ActiveTasksAssignedOtherUser',
  ACTIVE_TASKS_UNASSIGNED = 'ActiveTasksUnassigned',
  ALL_WORK = 'AllWork',
  ALL_WORK_ASSIGNED = 'AllWorkAssigned',
  ALL_WORK_UNASSIGNED = 'AllWorkUnassigned',
  AVAILABLE_TASKS = 'AvailableTasks',
  MY_TASKS = 'MyTasks',
}

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
  title: 'Assign to me and go to task',
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
  // Note - For easeness of actions for active tasks Own presumes Manage is a permission as well
  // Execute presumes either Manage is not a permission
  ActiveTasksAssignedCurrentUser: {
    Cancel: [CANCEL],
    Own: [REASSIGN, RELEASE, COMPLETE],
  },
  ActiveTasksAssignedOtherUser: {
    Cancel: [CANCEL],
    Manage: [REASSIGN, RELEASE, COMPLETE],
    Own: [CLAIM],
  },
  ActiveTasksUnassigned: {
    Cancel: [CANCEL],
    Execute: [CLAIM],
    Manage: [ASSIGN],
    Own: [CLAIM, COMPLETE],
  },
  AllCases: {
    Manage: [RE_ALLOCATE, REMOVE_ALLOCATE],
  },
  AllWorkAssigned: {
    Cancel: [CANCEL],
    Manage: [REASSIGN, RELEASE, GO, COMPLETE],
  },
  AllWorkUnassigned: {
    Cancel: [CANCEL],
    Manage: [ASSIGN, GO, COMPLETE],
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

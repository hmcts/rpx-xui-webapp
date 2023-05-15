import { Action } from '../interfaces/common';

export const ASSIGN: Action = {
  id: 'assign',
  title: 'Assign task'
};
export const CANCEL: Action = {
  id: 'cancel',
  title: 'Cancel task'
};
export const CLAIM: Action = {
  id: 'claim',
  title: 'Assign to me'
};
export const COMPLETE: Action = {
  id: 'complete',
  title: 'Mark as done'
};
export const RELEASE: Action = {
  id: 'unclaim',
  title: 'Unassign task'
};
export const CLAIM_AND_GO: Action = {
  id: 'claim-and-go',
  title: 'Assign to me and go to task'
};
export const GO: Action = {
  id: 'go',
  title: 'Go to task'
};
export const REASSIGN: Action = {
  id: 'reassign',
  title: 'Reassign task'
};
export const RE_ALLOCATE: Action = {
  id: 'reallocate',
  title: 'Reallocate'
};
export const REMOVE_ALLOCATE: Action = {
  id: 'remove',
  title: 'Remove Allocation'
};

export const VIEW_PERMISSIONS_ACTIONS_MATRIX = {
  // This matrix is for configuring permissions and actions defined in the work allocation permission table
  // level 1 - select a view, like 'MyTasks'
  // level 2 - select a permission, like 'Manage'
  // level 3 - return the actions array, like [REASSIGN, RELEASE, GO]
  // Note - For easeness of actions for active tasks Own presumes Manage is a permission as well
  // Execute presumes either Manage is not a permission
  ActiveTasksAssignedCurrentUser: {
    cancel: [CANCEL],
    own: [REASSIGN, RELEASE, COMPLETE]
  },
  ActiveTasksAssignedOtherUser: {
    cancel: [CANCEL],
    manage: [REASSIGN, RELEASE, COMPLETE],
    own: [CLAIM]
  },
  ActiveTasksUnassigned: {
    cancel: [CANCEL],
    execute: [CLAIM],
    manage: [ASSIGN],
    own: [CLAIM, COMPLETE]
  },
  AllCases: {
    manage: [RE_ALLOCATE, REMOVE_ALLOCATE]
  },
  AllWorkAssigned: {
    cancel: [CANCEL],
    manage: [REASSIGN, RELEASE, GO, COMPLETE]
  },
  AllWorkUnassigned: {
    cancel: [CANCEL],
    manage: [ASSIGN, GO, COMPLETE]
  },
  AvailableTasks: {
    execute: [CLAIM, CLAIM_AND_GO]
  },
  MyCases: {
    manage: [REASSIGN, RELEASE, GO]
  },
  MyTasks: {
    manage: [REASSIGN, RELEASE, GO]
  }
};

export const VIEW_PERMISSIONS_ACTIONS_MATRIX_REFINED = {
  // This matrix is for configuring permissions and actions defined in the work allocation permission table
  // Similar to above, except for release 4 which required multiple changes
  ActiveTasksAssignedCurrentUser: {
    assign: [REASSIGN],
    cancel: [CANCEL],
    cancelown: [CANCEL],
    complete: [COMPLETE],
    completeown: [COMPLETE],
    unassign: [RELEASE],
    unclaimassign: [REASSIGN],
    unassignassign: [REASSIGN]
  },
  ActiveTasksAssignedOtherUser: {
    assign: [REASSIGN],
    cancel: [CANCEL],
    complete: [COMPLETE],
    claim: [CLAIM],
    unassign: [RELEASE],
    unassignassign: [REASSIGN]
  },
  ActiveTasksUnassigned: {
    assign: [ASSIGN],
    cancel: [CANCEL],
    claim: [CLAIM]
  },
  AllCases: {
    manage: [RE_ALLOCATE, REMOVE_ALLOCATE]
  },
  AllWorkAssignedCurrentUser: {
    assign: [REASSIGN],
    cancel: [CANCEL],
    cancelown: [CANCEL],
    complete: [COMPLETE],
    completeown: [COMPLETE],
    default: [GO],
    unassign: [RELEASE],
    unclaimassign: [REASSIGN],
    unassignassign: [REASSIGN]
  },
  AllWorkAssignedOtherUser: {
    assign: [REASSIGN],
    cancel: [CANCEL],
    complete: [COMPLETE],
    default: [GO],
    claim: [CLAIM],
    unassign: [RELEASE],
    unassignassign: [REASSIGN]
  },
  AllWorkUnassigned: {
    assign: [ASSIGN],
    cancel: [CANCEL],
    claim: [CLAIM],
    default: [GO] // Note: was not specified so assumed default
  },
  AvailableTasks: {
    execute: [CLAIM, CLAIM_AND_GO]
  },
  MyCases: {
    manage: [REASSIGN, RELEASE, GO]
  },
  MyTasks: {
    default: [GO], // not permission but go needed to be added
    assign: [REASSIGN],
    unassignassign: [REASSIGN],
    unclaimassign: [REASSIGN],
    unclaim: [RELEASE],
    unassign: [RELEASE],
    complete: [COMPLETE],
    completeown: [COMPLETE],
    cancel: [CANCEL],
    cancelown: [CANCEL]
  }
};

export enum TaskPermission {
  DEFAULT = 'default', // Added default in scenario where there are no permission restrictions for an action
  READ = 'read',
  REFER = 'refer',
  MANAGE = 'manage',
  OWN = 'own',
  EXECUTE = 'execute',
  CANCEL = 'cancel',
  UNCLAIM = 'unclaim',
  ASSIGN = 'assign',
  UNASSIGN = 'unassign',
  UNCLAIMASSIGN = 'unclaimassign',
  COMPLETE = 'complete',
  COMPLETEOWN = 'completeown',
  CANCELOWN = 'cancelown',
  CLAIM = 'claim',
  UNASSIGNASSIGN = 'unassignassign',
  UNASSIGNCLAIM = 'unassignclaim',
}

export enum ViewType {
  ACTIVE_TASKS = 'ActiveTasks',
  ACTIVE_TASKS_ASSIGNED_CURRENT = 'ActiveTasksAssignedCurrentUser',
  ACTIVE_TASKS_ASSIGNED_OTHER = 'ActiveTasksAssignedOtherUser',
  ACTIVE_TASKS_UNASSIGNED = 'ActiveTasksUnassigned',
  ALL_WORK = 'AllWork',
  ALL_WORK_ASSIGNED = 'AllWorkAssigned',
  ALL_WORK_ASSIGNED_CURRENT = 'AllWorkAssignedCurrentUser',
  ALL_WORK_ASSIGNED_OTHER = 'AllWorkAssignedOtherUser',
  ALL_WORK_UNASSIGNED = 'AllWorkUnassigned',
  AVAILABLE_TASKS = 'AvailableTasks',
  MY_TASKS = 'MyTasks',
}

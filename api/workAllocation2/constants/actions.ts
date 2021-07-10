import { Action } from '../interfaces/task';

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

export const VIEW_PERMISSIONS_ACTIONS_MATRIX = {
  // This matrix is for configuring permissions and actions defined in the work allocation permission table
  // level 1 - select a view, like 'MyTasks'
  // level 2 - select a permission, like 'Manage'
  // level 3 - return the actions array, like [REASSIGN, RELEASE, GO]
  ActiveTasks: {
    Manage: [REASSIGN, RELEASE, CLAIM],
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
    Manage: [CLAIM, CLAIM_AND_GO],
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

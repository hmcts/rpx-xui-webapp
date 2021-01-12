const ASSIGN = {
  id: 'assign',
  title: 'Assign task',
};
const CANCEL = {
id: 'cancel',
  title: 'Cancel task',
};
const CLAIM = {
  id: 'claim',
  title: 'Assign to me',
};
const COMPLETE = {
  id: 'complete',
  title: 'Mark as done',
};
const RELEASE = {
  id: 'unclaim',
  title: 'Unassign task',
};
const CLAIM_AND_GO = {
  id: 'claim-and-go',
  title: 'Assign to me and go to case',
};
const GO = {
  id: 'go',
  title: 'Go to case',
};
  
/**
 * This should become "assign" as there's no actual "reassign" API call.
 */
const REASSIGN = {
  id: 'reassign',
  title: 'Reassign task',
};
  
export const ACTIONS = {
  ASSIGN,
  CANCEL,
  CLAIM,
  COMPLETE,
  REASSIGN,
  RELEASE,
};
  
export const TASK_ACTIONS = {
  AVAILABLE: [ CLAIM, CLAIM_AND_GO, ],
  MANAGER: {
    ASSIGNED: [ REASSIGN, RELEASE, COMPLETE, CANCEL, ],
    UNASSIGNED: [ ASSIGN, COMPLETE, CANCEL, ],
  },
  MY: [ REASSIGN, RELEASE, GO, ],
};
  
export enum ActionViews {
  MY = 'MyTasks',
  AVAILABLE = 'AvailableTasks',
  MANAGER = 'TaskManager',
}

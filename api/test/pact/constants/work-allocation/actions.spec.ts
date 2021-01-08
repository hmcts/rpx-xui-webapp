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
  id: 'claimAndGo',
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
  RELEASE
};

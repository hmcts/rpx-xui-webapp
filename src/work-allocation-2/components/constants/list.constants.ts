const DEFAULT_EMPTY_MESSAGE = 'There are no tasks that match your selection.';

export const LIST_CONSTANTS = {
  EmptyMessage: {
    Default: DEFAULT_EMPTY_MESSAGE,
    AvailableTasks: DEFAULT_EMPTY_MESSAGE,
    MyCases: 'You have no assigned tasks.',
    MyAccess: 'Cases you have been granted access to are displayed here.',
    MyTasks: 'You have no assigned tasks.',
    TaskManager: DEFAULT_EMPTY_MESSAGE,
    AllWork: 'Change your selection to view tasks.',
    AllWorkCases: 'Change your selection to view cases.'
  },
  View: {
    AllWork: 'AllWork',
    AllWorkCases: 'AllWorkCases',
    AvailableTasks: 'AvailableTasks',
    MyCases: 'MyCases',
    MyAccess: 'MyAccess',
    MyTasks: 'MyTasks',
    TaskManager: 'TaskManager'
  },
  JUDGE_ROLES: ['caseworker-ia-iacjudge']
};

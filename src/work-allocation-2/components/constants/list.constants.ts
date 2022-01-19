const DEFAULT_EMPTY_MESSAGE = 'There are no tasks that match your selection.';
const DEFAULT_CASES_EMPTY_MESSAGE = 'There are no cases that match your selection.';

export const LIST_CONSTANTS = {
  EmptyMessage: {
    Default: DEFAULT_EMPTY_MESSAGE,
    DefaultCases: DEFAULT_CASES_EMPTY_MESSAGE,
    AvailableTasks: DEFAULT_EMPTY_MESSAGE,
    MyCases: 'You have no assigned cases.',
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
    MyTasks: 'MyTasks',
    TaskManager: 'TaskManager'
  },
  JUDGE_ROLES: ['caseworker-ia-iacjudge']
};

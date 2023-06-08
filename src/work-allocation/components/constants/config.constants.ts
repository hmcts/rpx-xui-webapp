import { FieldType, TaskView } from '../../enums';
import { FieldConfig } from '../../models/common';
import { DERIVED_ICON_CONSTANTS } from './derived-icon.constants';

/**
 * The individual fields.
 */
const ACCESS_VIEW_LINK: FieldConfig = {
  name: 'accessView',
  type: FieldType.ACCESS_VIEW,
  columnLabel: null,
  views: TaskView.ALL_VIEWS
};
const CASE_REFERENCE_AS_LINK: FieldConfig = {
  name: 'case_id',
  type: FieldType.CASE_REFERENCE,
  columnLabel: 'Case reference',
  sortName: 'caseId',
  views: TaskView.ALL_VIEWS
};
// const CASE_REFERENCE_AS_TEXT: FieldConfig = {
//   name: 'case_id',
//   type: FieldType.CASE_REFERENCE_STRING,
//   columnLabel: 'Case reference',
//   sortName: 'caseId',
//   views: TaskView.ALL_VIEWS
// };
const CASE_NAME_AS_LINK: FieldConfig = {
  name: 'case_name',
  type: FieldType.CASE_NAME,
  columnLabel: 'Case name',
  sortName: 'caseName',
  views: TaskView.ALL_VIEWS
};
const CASE_NAME_AS_LINK_DISABLE_SORT: FieldConfig = {
  ...CASE_NAME_AS_LINK,
  disableSort: true
};
const CASE_NAME_AS_TEXT: FieldConfig = {
  name: 'case_name',
  type: FieldType.STRING,
  columnLabel: 'Case name',
  sortName: 'caseName',
  views: TaskView.ALL_VIEWS
};
const CASE_ROLE: FieldConfig = {
  name: 'role',
  type: FieldType.STRING,
  columnLabel: 'Case role',
  sortName: 'caseRole',
  views: TaskView.ALL_VIEWS
};
const CASE_ROLE_DISABLE_SORT: FieldConfig = {
  ...CASE_ROLE,
  disableSort: true
};
const ROLE: FieldConfig = {
  name: 'role',
  type: FieldType.STRING,
  columnLabel: 'Role',
  sortName: 'role',
  views: TaskView.ALL_VIEWS
};
const ROLE_DISABLE_SORT: FieldConfig = {
  ...ROLE,
  disableSort: true
};
const CASE_CATEGORY: FieldConfig = {
  name: 'case_category',
  type: FieldType.STRING,
  columnLabel: 'Case category',
  sortName: 'caseCategory',
  views: TaskView.ALL_VIEWS
};
const CASE_CATEGORY_DISABLE_SORT: FieldConfig = {
  ...CASE_CATEGORY,
  disableSort: true
};

const NEXT_HEARING_DATE: FieldConfig = {
  name: 'next_hearing_date',
  type: FieldType.FORMATTED_DATE,
  columnLabel: 'Hearing date',
  sortName: 'next_hearing_date',
  views: TaskView.ALL_VIEWS
};

const NEXT_HEARING_DATE_DISABLE_SORT: FieldConfig = {
  ...NEXT_HEARING_DATE,
  disableSort: true
};

const JURISDICTION: FieldConfig = {
  name: 'jurisdiction',
  type: FieldType.STRING,
  columnLabel: 'Service',
  sortName: 'jurisdiction',
  views: TaskView.ALL_VIEWS
};
const JURISDICTION_DISABLE_SORT: FieldConfig = {
  ...JURISDICTION,
  disableSort: true
};
const ACCESS: FieldConfig = {
  name: 'access',
  type: FieldType.STRING,
  columnLabel: 'Access',
  sortName: 'access',
  views: TaskView.ALL_VIEWS
};
const ACCESS_DISABLE_SORT: FieldConfig = {
  ...ACCESS,
  disableSort: true
};
const LOCATION: FieldConfig = {
  name: 'location_name',
  type: FieldType.STRING,
  columnLabel: 'Location',
  sortName: 'locationName',
  views: TaskView.ALL_VIEWS
};
const LOCATION_DISABLE_SORT: FieldConfig = {
  ...LOCATION,
  disableSort: true
};
const DERIVED_ICON: FieldConfig = {
  name: 'derivedIcon',
  type: FieldType.DERIVED_ICON,
  columnLabel: null,
  views: TaskView.ALL_VIEWS,
  // sourceColumn and matchValue values currently defined in DI constants file
  sourceColumn: DERIVED_ICON_CONSTANTS.SOURCE_COLUMN,
  matchValue: DERIVED_ICON_CONSTANTS.MATCH_VALUE
};
const TASK_NAME_AS_LINK: FieldConfig = {
  name: 'task_title',
  type: FieldType.TASK_NAME,
  columnLabel: 'Task',
  sortName: 'taskTitle',
  views: TaskView.ALL_VIEWS
};
const TASK_NAME_AS_TEXT: FieldConfig = {
  name: 'task_title',
  type: FieldType.STRING,
  columnLabel: 'Task',
  sortName: 'taskTitle',
  views: TaskView.ALL_VIEWS
};
// const DUE_DATE: FieldConfig = {
//   name: 'dueDate',
//   type: FieldType.DATE_DUE,
//   columnLabel: 'Date',
//   sortName: 'dueDate',
//   views: TaskView.ALL_VIEWS
// };
const DUE_DATE_AS_TEXT: FieldConfig = {
  isDate: false,
  name: 'dueDate',
  type: FieldType.FORMATTED_DATE,
  columnLabel: 'Due date',
  sortName: 'dueDate',
  views: TaskView.ALL_VIEWS
};
const CREATED_DATE: FieldConfig = {
  isDate: true,
  name: 'created_date',
  type: FieldType.FORMATTED_DATE,
  columnLabel: 'Task created',
  sortName: 'created_date',
  views: TaskView.ALL_VIEWS
};
const PRIORITY: FieldConfig = {
  name: 'priority',
  type: FieldType.PRIORITY,
  columnLabel: 'Priority',
  sortName: 'priority',
  views: TaskView.ALL_VIEWS,
  disableSort: true
};
const START_DATE: FieldConfig = {
  name: 'startDate',
  type: FieldType.FORMATTED_DATE,
  columnLabel: 'Start',
  sortName: 'startDate',
  views: TaskView.ALL_VIEWS
};
const START_DATE_DISABLE_SORT: FieldConfig = {
  ...START_DATE,
  disableSort: true
};
const ACCESS_START_DATE_DISABLE_SORT: FieldConfig = {
  name: 'startDate',
  type: FieldType.STRING,
  columnLabel: 'Start',
  sortName: 'startDate',
  views: TaskView.ALL_VIEWS,
  disableSort: true
};
const ACCESS_END_DATE_DISABLE_SORT: FieldConfig = {
  name: 'endDate',
  type: FieldType.STRING,
  columnLabel: 'End',
  sortName: 'endDate',
  views: TaskView.ALL_VIEWS,
  disableSort: true
};
const END_DATE: FieldConfig = {
  name: 'endDate',
  type: FieldType.FORMATTED_DATE,
  columnLabel: 'End',
  sortName: 'endDate',
  views: TaskView.ALL_VIEWS
};
const END_DATE_DISABLE_SORT: FieldConfig = {
  ...END_DATE,
  disableSort: true
};
const DATE_SUBMITTED: FieldConfig = {
  name: 'dateSubmitted',
  type: FieldType.FORMATTED_DATE,
  columnLabel: 'Date submitted',
  sortName: 'dateSubmitted',
  views: TaskView.ALL_VIEWS
};
const DATE_SUBMITTED_DISABLE_SORT: FieldConfig = {
  ...DATE_SUBMITTED,
  disableSort: true
};
const ASSIGNEE: FieldConfig = {
  name: 'assigneeName',
  type: FieldType.STRING,
  columnLabel: 'Person',
  sortName: 'assignee',
  disableSort: true,
  views: TaskView.ALL_VIEWS
};

// can be used concatenated to differentiate between views
const JUDICIAL_DATES: FieldConfig[] = [
  CREATED_DATE
];
const STAFF_DATES: FieldConfig[] = [
  DUE_DATE_AS_TEXT, PRIORITY
];
const PERSON: FieldConfig = {
  name: 'actorName',
  type: FieldType.STRING,
  columnLabel: 'Person',
  disableSort: true,
  sortName: 'actorName',
  views: TaskView.ALL_VIEWS
};

/**
 * The views.
 */
const AVAILABLE_TASKS_FOR_JUDICIAL: FieldConfig[] = [
  CASE_NAME_AS_TEXT, CASE_CATEGORY, LOCATION, DERIVED_ICON, TASK_NAME_AS_TEXT, ...JUDICIAL_DATES, NEXT_HEARING_DATE, PRIORITY
];
const AVAILABLE_TASKS_FOR_LEGAL_OPS: FieldConfig[] = [
  CASE_NAME_AS_TEXT, CASE_CATEGORY, LOCATION, DERIVED_ICON, TASK_NAME_AS_TEXT, DUE_DATE_AS_TEXT, NEXT_HEARING_DATE, PRIORITY
];
const MY_CASES: FieldConfig[] = [
  CASE_NAME_AS_LINK_DISABLE_SORT, JURISDICTION_DISABLE_SORT, CASE_CATEGORY_DISABLE_SORT, CASE_ROLE_DISABLE_SORT, NEXT_HEARING_DATE, START_DATE_DISABLE_SORT, END_DATE_DISABLE_SORT
];
const MY_ACCESS: FieldConfig[] = [
  CASE_NAME_AS_LINK_DISABLE_SORT, JURISDICTION_DISABLE_SORT, CASE_CATEGORY_DISABLE_SORT, DATE_SUBMITTED_DISABLE_SORT, ACCESS_DISABLE_SORT, ACCESS_START_DATE_DISABLE_SORT, ACCESS_END_DATE_DISABLE_SORT, ACCESS_VIEW_LINK
];
const MY_TASKS: FieldConfig[] = [
  CASE_REFERENCE_AS_LINK, CASE_NAME_AS_TEXT, CASE_CATEGORY, LOCATION, DERIVED_ICON, TASK_NAME_AS_TEXT, DUE_DATE_AS_TEXT, NEXT_HEARING_DATE, PRIORITY
];
const MY_WORK_TASKS_FOR_JUDICIAL: FieldConfig[] = [
  CASE_NAME_AS_LINK, CASE_CATEGORY, LOCATION, DERIVED_ICON, TASK_NAME_AS_LINK, ...JUDICIAL_DATES, NEXT_HEARING_DATE, PRIORITY
];
const MY_WORK_TASKS_FOR_LEGAL_OPS: FieldConfig[] = [
  CASE_NAME_AS_LINK, CASE_CATEGORY, LOCATION, DERIVED_ICON, TASK_NAME_AS_LINK, DUE_DATE_AS_TEXT, NEXT_HEARING_DATE, PRIORITY
];
const TASK_MANAGER: FieldConfig[] = [
  CASE_NAME_AS_TEXT, CASE_CATEGORY, LOCATION, TASK_NAME_AS_TEXT, ...STAFF_DATES, ASSIGNEE
];
const TASK_ACTIONS: FieldConfig[] = [
  ...MY_TASKS
];
const TASK_ACTIONS_WITH_ASSIGNEE_FOR_LEGAL_OPS: FieldConfig[] = [
  CASE_NAME_AS_TEXT, CASE_CATEGORY, LOCATION, TASK_NAME_AS_TEXT, ...STAFF_DATES, ASSIGNEE
];
const TASK_ACTIONS_WITH_ASSIGNEE_FOR_JUDICIAL: FieldConfig[] = [
  CASE_NAME_AS_TEXT, CASE_CATEGORY, LOCATION, TASK_NAME_AS_TEXT, ...JUDICIAL_DATES, ASSIGNEE
];
const ALL_WORK_TASKS_FOR_LEGAL_OPS: FieldConfig[] = [
  CASE_NAME_AS_LINK, CASE_CATEGORY, LOCATION, DERIVED_ICON, TASK_NAME_AS_LINK, DUE_DATE_AS_TEXT, NEXT_HEARING_DATE, PRIORITY, ASSIGNEE
];
const ALL_WORK_TASKS_FOR_JUDICIAL: FieldConfig[] = [
  CASE_NAME_AS_LINK, CASE_CATEGORY, LOCATION, DERIVED_ICON, TASK_NAME_AS_LINK, ...JUDICIAL_DATES, NEXT_HEARING_DATE, ASSIGNEE, PRIORITY
];
const ALL_WORK_CASES: FieldConfig[] = [
  CASE_NAME_AS_LINK_DISABLE_SORT, CASE_CATEGORY_DISABLE_SORT, LOCATION_DISABLE_SORT, ROLE_DISABLE_SORT, NEXT_HEARING_DATE_DISABLE_SORT, PERSON
];

export const CONFIG_CONSTANTS = {
  AvailableTasksForJudicial: AVAILABLE_TASKS_FOR_JUDICIAL,
  AvailableTasksForLegalOps: AVAILABLE_TASKS_FOR_LEGAL_OPS,
  MyCases: MY_CASES,
  MyAccess: MY_ACCESS,
  MyTasks: MY_TASKS,
  MyWorkTasksForJudicial: MY_WORK_TASKS_FOR_JUDICIAL,
  MyWorkTasksForLegalOps: MY_WORK_TASKS_FOR_LEGAL_OPS,
  TaskActions: TASK_ACTIONS,
  TaskActionsWithAssigneeForJudicial: TASK_ACTIONS_WITH_ASSIGNEE_FOR_JUDICIAL,
  TaskActionsWithAssigneeForLegalOps: TASK_ACTIONS_WITH_ASSIGNEE_FOR_LEGAL_OPS,
  TaskManager: TASK_MANAGER,
  AllWorkTasksForJudicial: ALL_WORK_TASKS_FOR_JUDICIAL,
  AllWorkTasksForLegalOps: ALL_WORK_TASKS_FOR_LEGAL_OPS,
  AllWorkCases: ALL_WORK_CASES
};

// Hearing date will not be shown except release 4
export const CONFIG_CONSTANTS_NOT_RELEASE4 = {
  AvailableTasksForJudicial: AVAILABLE_TASKS_FOR_JUDICIAL.filter((task) => task.name !== 'next_hearing_date' && task.name !== 'priority'),
  AvailableTasksForLegalOps: AVAILABLE_TASKS_FOR_LEGAL_OPS.filter((task) => task.name !== 'next_hearing_date'),
  MyCases: MY_CASES.filter((task) => task.name !== 'next_hearing_date'),
  MyTasks: MY_TASKS.filter((task) => task.name !== 'next_hearing_date'),
  MyWorkTasksForJudicial: MY_WORK_TASKS_FOR_JUDICIAL.filter((task) => task.name !== 'next_hearing_date' && task.name !== 'priority'),
  MyWorkTasksForLegalOps: MY_WORK_TASKS_FOR_LEGAL_OPS.filter((task) => task.name !== 'next_hearing_date'),
  AllWorkTasksForJudicial: ALL_WORK_TASKS_FOR_JUDICIAL.filter((task) => task.name !== 'next_hearing_date' && task.name !== 'priority'),
  AllWorkTasksForLegalOps: ALL_WORK_TASKS_FOR_LEGAL_OPS.filter((task) => task.name !== 'next_hearing_date'),
  AllWorkCases: ALL_WORK_CASES.filter((task) => task.name !== 'next_hearing_date')
};

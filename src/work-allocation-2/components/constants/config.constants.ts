import { FieldType, TaskView } from '../../enums';
import { FieldConfig } from '../../models/common';
import { DERIVED_ICON_CONSTANTS } from './derived-icon.constants';

/**
 * The individual fields.
 */
const CASE_REFERENCE_AS_LINK: FieldConfig = {
  name: 'case_id',
  type: FieldType.CASE_REFERENCE,
  columnLabel: 'Case reference',
  sortName: 'caseId',
  views: TaskView.ALL_VIEWS
};
const CASE_REFERENCE_AS_TEXT: FieldConfig = {
  name: 'case_id',
  type: FieldType.CASE_REFERENCE_STRING,
  columnLabel: 'Case reference',
  sortName: 'caseId',
  views: TaskView.ALL_VIEWS
};
const CASE_NAME_AS_LINK: FieldConfig = {
  name: 'case_name',
  type: FieldType.CASE_NAME,
  columnLabel: 'Case name',
  sortName: 'caseName',
  views: TaskView.ALL_VIEWS
};
const CASE_NAME_AS_TEXT: FieldConfig = {
  name: 'case_name',
  type: FieldType.STRING,
  columnLabel: 'Case name',
  sortName: 'caseName',
  views: TaskView.ALL_VIEWS
};
const CASE_ROLE: FieldConfig = {
  name: 'case_role',
  type: FieldType.STRING,
  columnLabel: 'Case role',
  sortName: 'caseRole',
  views: TaskView.ALL_VIEWS
};
const CASE_CATEGORY: FieldConfig = {
  name: 'case_category',
  type: FieldType.STRING,
  columnLabel: 'Case category',
  sortName: 'caseCategory',
  views: TaskView.ALL_VIEWS
};
const JURISDICTION: FieldConfig = {
  name: 'jurisdiction',
  type: FieldType.STRING,
  columnLabel: 'Jurisdiction',
  sortName: 'jurisdiction',
  views: TaskView.ALL_VIEWS
};
const LOCATION: FieldConfig = {
  name: 'location_name',
  type: FieldType.STRING,
  columnLabel: 'Location',
  sortName: 'locationName',
  views: TaskView.ALL_VIEWS
};
const DERIVED_ICON: FieldConfig = {
  name: 'derivedIcon',
  type: FieldType.DERIVED_ICON,
  columnLabel: null,
  views: TaskView.ALL_VIEWS,
  // sourcColumn and matchValue values currently defined in DI constants file
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
const DUE_DATE: FieldConfig = {
  name: 'dueDate',
  type: FieldType.DATE_DUE,
  columnLabel: 'Date',
  sortName: 'dueDate',
  views: TaskView.ALL_VIEWS
};
const START_DATE: FieldConfig = {
  name: 'startDate',
  type: FieldType.DATE,
  columnLabel: 'Start',
  sortName: 'startDate',
  views: TaskView.ALL_VIEWS
};
const END_DATE: FieldConfig = {
  name: 'endDate',
  type: FieldType.DATE,
  columnLabel: 'End',
  sortName: 'endDate',
  views: TaskView.ALL_VIEWS
};
const ASSIGNEE: FieldConfig = {
  disableSort: true,
  name: 'assigneeName',
  type: FieldType.STRING,
  columnLabel: 'Person',
  sortName: 'assignee',
  views: TaskView.ALL_VIEWS
};


/**
 * The views.
 */
const AVAILABLE_TASKS: FieldConfig[] = [
  CASE_NAME_AS_TEXT, CASE_CATEGORY, LOCATION, DERIVED_ICON, TASK_NAME_AS_TEXT, DUE_DATE
];
const MY_CASES: FieldConfig[] = [
  CASE_NAME_AS_LINK, JURISDICTION, CASE_CATEGORY, CASE_ROLE, START_DATE, END_DATE
];
const MY_TASKS: FieldConfig[] = [
  CASE_REFERENCE_AS_LINK, CASE_NAME_AS_TEXT, CASE_CATEGORY, LOCATION, DERIVED_ICON, TASK_NAME_AS_TEXT, DUE_DATE
];
const MY_WORK_TASKS: FieldConfig[] = [
  CASE_NAME_AS_LINK, CASE_CATEGORY, LOCATION, DERIVED_ICON, TASK_NAME_AS_LINK, DUE_DATE
];
const TASK_MANAGER: FieldConfig[] = [
  CASE_NAME_AS_TEXT, CASE_CATEGORY, LOCATION, TASK_NAME_AS_TEXT, DUE_DATE, ASSIGNEE
];
const TASK_ACTIONS: FieldConfig[] = [
  ...MY_TASKS
];
const TASK_ACTIONS_WITH_ASSIGNEE: FieldConfig[] = [
  ...TASK_MANAGER
];

const ALL_WORK_TASKS: FieldConfig[] = [
  CASE_NAME_AS_TEXT, CASE_CATEGORY, LOCATION, DERIVED_ICON, TASK_NAME_AS_TEXT, DUE_DATE, ASSIGNEE
];

export const CONFIG_CONSTANTS = {
  AvailableTasks: AVAILABLE_TASKS,
  MyCases: MY_CASES,
  MyTasks: MY_TASKS,
  MyWorkTasks: MY_WORK_TASKS,
  TaskActions: TASK_ACTIONS,
  TaskActionsWithAssignee: TASK_ACTIONS_WITH_ASSIGNEE,
  TaskManager: TASK_MANAGER,
  AllWorkTasks: ALL_WORK_TASKS
};

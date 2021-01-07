import { TaskFieldType, TaskView } from '../../enums';
import { TaskFieldConfig } from '../../models/tasks';
import { DERIVED_ICON_CONSTANTS} from './derived-icon.constants';

/**
 * The individual fields.
 */
const CASE_REFERENCE_AS_LINK: TaskFieldConfig = {
  name: 'caseReference',
  type: TaskFieldType.CASE_REFERENCE,
  columnLabel: 'Case reference',
  views: TaskView.ALL_VIEWS
};
const CASE_REFERENCE_AS_TEXT: TaskFieldConfig = {
  name: 'caseReference',
  type: TaskFieldType.STRING,
  columnLabel: 'Case reference',
  views: TaskView.ALL_VIEWS
};
const CASE_NAME: TaskFieldConfig = {
  name: 'caseName',
  type: TaskFieldType.STRING,
  columnLabel: 'Case name',
  views: TaskView.ALL_VIEWS
};
const CASE_CATEGORY: TaskFieldConfig = {
  name: 'caseCategory',
  type: TaskFieldType.STRING,
  columnLabel: 'Case category',
  views: TaskView.ALL_VIEWS
};
const LOCATION: TaskFieldConfig = {
  name: 'location',
  type: TaskFieldType.STRING,
  columnLabel: 'Location',
  views: TaskView.ALL_VIEWS
};
const DERIVED_ICON: TaskFieldConfig = {
  name: 'derivedIcon',
  type: TaskFieldType.DERIVED_ICON,
  columnLabel: null,
  views: TaskView.ALL_VIEWS,
  // sourcColumn and matchValue values currently defined in DIC file
  sourceColumn: DERIVED_ICON_CONSTANTS.SOURCE_COLUMN,
  matchValue: DERIVED_ICON_CONSTANTS.MATCH_VALUE
};
const TASK_NAME: TaskFieldConfig = {
  name: 'taskName',
  type: TaskFieldType.STRING,
  columnLabel: 'Task',
  views: TaskView.ALL_VIEWS
};
const DUE_DATE: TaskFieldConfig = {
  name: 'dueDate',
  type: TaskFieldType.DATE_DUE,
  columnLabel: 'Date',
  views: TaskView.ALL_VIEWS
};
const ASSIGNEE: TaskFieldConfig = {
  name: 'assignee',
  type: TaskFieldType.STRING,
  columnLabel: 'Assignee',
  views: TaskView.ALL_VIEWS
};


/**
 * The views.
 */
const AVAILABLE_TASKS: TaskFieldConfig[] = [
  CASE_REFERENCE_AS_TEXT, CASE_NAME, CASE_CATEGORY, LOCATION, DERIVED_ICON, TASK_NAME, DUE_DATE
];
const MY_TASKS: TaskFieldConfig[] = [
  CASE_REFERENCE_AS_LINK, CASE_NAME, CASE_CATEGORY, LOCATION, DERIVED_ICON, TASK_NAME, DUE_DATE
];
const TASK_MANAGER: TaskFieldConfig[] = [
  CASE_REFERENCE_AS_LINK, CASE_NAME, CASE_CATEGORY, LOCATION, TASK_NAME, DUE_DATE, ASSIGNEE
];

export const CONFIG_CONSTANTS = {
  AvailableTasks: AVAILABLE_TASKS,
  MyTasks: MY_TASKS,
  TaskManager: TASK_MANAGER
};

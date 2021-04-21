import { TaskFieldType, TaskView } from '../../enums';
import { TaskFieldConfig } from '../../models/tasks';
import { DERIVED_ICON_CONSTANTS} from '../../components/constants/derived-icon.constants';

/**
 * The individual fields.
 */
const CASE_NAME_AS_TEXT: TaskFieldConfig = {
  name: 'case_name',
  type: TaskFieldType.STRING,
  columnLabel: 'Case name',
  sortName: 'caseName',
  views: TaskView.ALL_VIEWS
};
const CASE_CATEGORY: TaskFieldConfig = {
  name: 'case_category',
  type: TaskFieldType.STRING,
  columnLabel: 'Case category',
  sortName: 'caseCategory',
  views: TaskView.ALL_VIEWS
};
const LOCATION: TaskFieldConfig = {
  name: 'location_name',
  type: TaskFieldType.STRING,
  columnLabel: 'Location',
  sortName: 'locationName',
  views: TaskView.ALL_VIEWS
};
const DERIVED_ICON: TaskFieldConfig = {
  name: 'derivedIcon',
  type: TaskFieldType.DERIVED_ICON,
  columnLabel: null,
  views: TaskView.ALL_VIEWS,
  // sourcColumn and matchValue values currently defined in DI constants file
  sourceColumn: DERIVED_ICON_CONSTANTS.SOURCE_COLUMN,
  matchValue: DERIVED_ICON_CONSTANTS.MATCH_VALUE
};
const TASK_NAME_AS_TEXT: TaskFieldConfig = {
  name: 'task_title',
  type: TaskFieldType.STRING,
  columnLabel: 'Task',
  sortName: 'taskTitle',
  views: TaskView.ALL_VIEWS
};
const DUE_DATE: TaskFieldConfig = {
  name: 'dueDate',
  type: TaskFieldType.DATE_DUE,
  columnLabel: 'Date',
  sortName: 'dueDate',
  views: TaskView.ALL_VIEWS
};

/**
 * The views.
 */
const AVAILABLE_TASKS: TaskFieldConfig[] = [
  CASE_NAME_AS_TEXT, CASE_CATEGORY, LOCATION, DERIVED_ICON, TASK_NAME_AS_TEXT, DUE_DATE
];

export const CONFIG_CONSTANTS = {
  AvailableTasks: AVAILABLE_TASKS,
};

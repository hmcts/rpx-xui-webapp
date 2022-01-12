import { Task } from '../../../work-allocation-2/models/tasks';
import { appendTaskIdAsQueryStringToTaskDescription } from './case-task.util';

const task: Task = {
  assignee: null,
  auto_assigned: false,
  case_category: 'asylum',
  case_id: '1620409659381330',
  case_management_category: null,
  case_name: 'Alan Jonson',
  case_type_id: null,
  created_date: '2021-04-19T14:00:00.000+0000',
  due_date: '2021-05-20T16:00:00.000+0000',
  execution_type: null,
  id: '0d22d838-b25a-11eb-a18c-f2d58a9b7bc6',
  jurisdiction: 'Immigration and Asylum',
  location: null,
  location_name: null,
  name: 'Task name',
  permissions: null,
  region: null,
  security_classification: null,
  task_state: null,
  task_system: null,
  task_title: 'Some lovely task name',
  type: null,
  warning_list: null,
  warnings: true,
  work_type_id: null,
  assigneeName: null,
  caseName: 'The case name',
  caseCategory: 'The case category',
  description: 'Click link to proceed to next step [test link next step](/cases/case-details/1547652071308205/trigger/editAppealAfterSubmit)',
  taskName: 'The task name',
  dueDate: undefined,
  actions: []
};

describe('CaseTaskUtil', () => {
  it('should return task id appended to url as querystring with no prior querystring exists in the url', () => {
    const appendedTaskDescription = appendTaskIdAsQueryStringToTaskDescription(task);
    expect(appendedTaskDescription).toEqual('Click link to proceed to next step [test link next step](/cases/case-details/1547652071308205/trigger/editAppealAfterSubmit?tid=0d22d838-b25a-11eb-a18c-f2d58a9b7bc6)');
  });

  it('should return task id appended to url as querystring with already existing querystrings in the url', () => {
    const taskToCheck = task;
    taskToCheck.description = 'Click link to proceed to next step [test link next step](/cases/case-details/1547652071308205/trigger/editAppealAfterSubmit?abc=123)';
    const appendedTaskDescription = appendTaskIdAsQueryStringToTaskDescription(taskToCheck);
    expect(appendedTaskDescription).toEqual('Click link to proceed to next step [test link next step](/cases/case-details/1547652071308205/trigger/editAppealAfterSubmit?abc=123&tid=0d22d838-b25a-11eb-a18c-f2d58a9b7bc6)');
  });

  it('should return empty string if there is no task description', () => {
    const taskToCheck = task;
    taskToCheck.description = null;
    const appendedTaskDescription = appendTaskIdAsQueryStringToTaskDescription(taskToCheck);
    expect(appendedTaskDescription).toEqual('');
  });
});

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task, TaskFieldConfig} from './../../models/tasks';
import {TaskFieldType, TaskView} from './../../enums';
import InvokedTaskAction from '../../models/tasks/invoked-task-action.model';

@Component({
  selector: 'exui-task-home',
  templateUrl: 'task-home.component.html',
  styleUrls: ['task-home.component.scss']
})
export class TaskHomeComponent implements OnInit, OnDestroy {

  /**
   * Temp Task List
   */
  public tasks: Task[] = [
    {
      id: '1549476532065586',
      caseReference: '1549 4765 3206 5586',
      caseName: 'Kili Muso',
      caseCategory: 'Protection',
      location: 'Taylor House',
      taskName: 'Review respondent evidence',
      dueDate: new Date(1604938789000),
      actions: [
        {
          id: 'actionId',
          title: 'Reassign task',
        },
        {
          id: 'actionId',
          title: 'Release this task',
        }
      ]
    },
    {
      id: '1549476532065586',
      caseReference: '1549 4765 3206 5586',
      caseName: 'Mankai Lit',
      caseCategory: 'Revocation',
      location: 'Taylor House',
      taskName: 'Review appellant case',
      dueDate: new Date(1604506789000),
      actions: [
        {
          id: 'actionId',
          title: 'Release this task',
        }
      ]
    },
  ];

  /**
   * Mock TaskFieldConfig[]
   *
   * Fields is the property of the TaskFieldConfig[], containing the configuration
   * for the fields as returned by the API.
   *
   * The sorting will handled by this component, via the
   * WP api as this component.
   */
  public fields: TaskFieldConfig[] = [
    {
      name: 'caseReference',
      type: TaskFieldType.STRING,
      columnLabel: 'Case reference',
      views: TaskView.TASK_LIST,
    },
    {
      name: 'caseName',
      type: TaskFieldType.STRING,
      columnLabel: 'Case name',
      views: TaskView.TASK_LIST,
    },
    {
      name: 'caseCategory',
      type: TaskFieldType.STRING,
      columnLabel: 'Case category',
      views: TaskView.TASK_LIST,
    },
    {
      name: 'location',
      type: TaskFieldType.STRING,
      columnLabel: 'Location',
      views: TaskView.TASK_LIST,
    },
    {
      name: 'taskName',
      type: TaskFieldType.STRING,
      columnLabel: 'Task',
      views: TaskView.TASK_LIST,
    },
    {
      name: 'dueDate',
      type: TaskFieldType.DATE_DUE,
      columnLabel: 'Due Dated',
      views: TaskView.TASK_LIST,
    },
  ];

  constructor() {
  }


  public ngOnInit(): void {

    console.log('onInitTaskHome');
  }

  /**
   * We need to sort the Task List based on the fieldName.
   *
   * Following on from this function we will need to retrieve the sorted tasks from
   * the WA Api, once we have these then we need to set the tasks and fields, and pass
   * these into the TaskListComponent.
   *
   * @param fieldName - ie. 'caseName'
   */
  public onSortHandler(fieldName: string): void {

    // Remove after integration
    console.log('Task Home received Sort on:');
    console.log(fieldName);
  }

  /**
   * InvokedTaskAction from the Task List Component, so that we can handle the User's
   * action.
   */
  public onActionHandler(taskAction: InvokedTaskAction): void {

    // Remove after integration
    console.log('Task Home received InvokedTaskAction:');
    console.log(taskAction);
  }

  public ngOnDestroy(): void {
  }
}

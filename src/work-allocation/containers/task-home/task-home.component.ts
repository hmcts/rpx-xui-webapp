import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TaskService, TaskSort } from '../../enums';
import InvokedTaskAction from '../../models/tasks/invoked-task-action.model';
import TaskServiceConfig from '../../models/tasks/task-service-config.model';
import { TaskFieldType, TaskView } from './../../enums';
import { Task, TaskFieldConfig, TaskSortField } from './../../models/tasks';

@Component({
  selector: 'exui-task-home',
  templateUrl: 'task-home.component.html',
  styleUrls: ['task-home.component.scss']
})
export class TaskHomeComponent implements OnInit {

  constructor(private readonly router: Router) {}

  /**
   * Temp Task List
   */
  public tasks: Task[] = [
    {
      id: '12345678901123456',
      caseReference: '1234 5678 9012 3456',
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
      id: '2345678901234567',
      caseReference: '2345 6789 0123 4567',
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
    {
      id: '3456789012345678',
      caseReference: '3456 7890 1234 5678',
      caseName: 'Bob Cratchit',
      caseCategory: 'Protection',
      location: 'Taylor Swift',
      taskName: 'Review respondent evidence',
      dueDate: new Date(),
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
      id: '4567890123456789',
      caseReference: '4567 8901 2345 6789',
      caseName: 'Ebenezer Scrooge',
      caseCategory: 'Revocation',
      location: 'Bleak House',
      taskName: 'Review appellant case',
      dueDate: new Date(),
      actions: [
        {
          id: 'actionId',
          title: 'Release this task',
        }
      ]
    },
    {
      id: '5678901234567890',
      caseReference: '5678 9012 3456 7890',
      caseName: 'Oliver Twist',
      caseCategory: 'Protection',
      location: 'Orphanage',
      taskName: 'Give more gruel',
      dueDate: new Date(new Date().getTime() + (86400 * 5000)),
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
      id: '6789012345678901',
      caseReference: '6789 0123 4567 8901',
      caseName: 'David Copperfield',
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
      type: TaskFieldType.CASE_REFERENCE,
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
      columnLabel: 'Date',
      views: TaskView.TASK_LIST,
    },
  ];

  /**
   * Mock TaskServiceConfig.
   */
  public taskServiceConfig: TaskServiceConfig = {
    service: TaskService.IAC,
    defaultSortDirection: TaskSort.ASC,
    defaultSortFieldName: 'dueDate',
    fields: this.fields,
  };

  public sortedBy: TaskSortField;

  public ngOnInit(): void {
    // Set up the default sorting.
    this.sortedBy = {
      fieldName: this.taskServiceConfig.defaultSortFieldName,
      order: this.taskServiceConfig.defaultSortDirection
    };

    // Remove after integration.
    this.sortTasks();
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

    // TODO: Remove everything below after integration.
    // This is all to prove the mechanism works.
    console.log('Task Home received Sort on:');
    console.log(fieldName);
    console.log('Faking the sort now');
    let order: TaskSort = TaskSort.ASC;
    if (this.sortedBy.fieldName === fieldName && this.sortedBy.order === TaskSort.ASC) {
      order = TaskSort.DSC;
    }
    this.sortedBy = { fieldName, order };

    // Now sort the tasks.
    this.sortTasks();
  }

  /**
   * InvokedTaskAction from the Task List Component, so that we can handle the User's
   * action.
   */
  public onActionHandler(taskAction: InvokedTaskAction): void {

    // Remove after integration
    console.log('Task Home received InvokedTaskAction:');
    console.log(taskAction.task.id);
    this.router.navigate([`/tasks/task-list/reassign/123456`]);
  }

  // Remove after integration.
  private sortTasks(): void {
    this.tasks = this.tasks.sort((a: Task, b: Task) => {
      const aVal = a[this.sortedBy.fieldName];
      const bVal = b[this.sortedBy.fieldName];
      let sortVal = 0;
      if (typeof aVal === 'string') {
        sortVal = aVal.localeCompare(bVal);
      } else if (aVal instanceof Date) {
        sortVal = aVal.getTime() - new Date(bVal).getTime();
      }
      return this.sortedBy.order === TaskSort.ASC ? sortVal : -sortVal;
    });
  }
}

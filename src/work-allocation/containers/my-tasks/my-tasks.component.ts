import { Component } from '@angular/core';

import { TaskFieldType, TaskView } from '../../enums';
import { Task, TaskFieldConfig } from '../../models/tasks';
import { TaskListWrapperComponent } from './../task-list-wrapper/task-list-wrapper.component';

@Component({
  selector: 'exui-my-tasks',
  templateUrl: '../task-list-wrapper/task-list-wrapper.component.html'
})
export class MyTasksComponent extends TaskListWrapperComponent {

  /**
   * Temp Task List
   */
  private pTasks: Task[] = [
    {
      id: '1604075580956811',
      caseReference: '1604 0755 8095 6811',
      caseName: 'Kili Muso',
      caseCategory: 'Grant of representation',
      location: 'Taylor House',
      taskName: 'Apply for probate',
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

  private readonly CASE_REFERENCE_FIELD: TaskFieldConfig = {
    name: 'caseReference',
    type: TaskFieldType.CASE_REFERENCE,
    columnLabel: 'Case reference',
    views: TaskView.TASK_LIST,
  };

  /**
   * Mock TaskFieldConfig[]
   *
   * Fields is the property of the TaskFieldConfig[], containing the configuration
   * for the fields as returned by the API.
   *
   * The sorting will handled by this component, via the
   * WP api as this component.
   */
  private readonly pFields: TaskFieldConfig[] = [
    this.CASE_REFERENCE_FIELD,
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

  public get fields(): TaskFieldConfig[] {
    return this.pFields;
  }

  public get tasks(): Task[] {
    return this.pTasks;
  }
  public set tasks(value: Task[]) {
    this.pTasks = value;
  }
}

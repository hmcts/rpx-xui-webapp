import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task, TaskFieldConfig} from './../../models/tasks';
import {TaskFieldType, TaskView} from './../../enums';

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
      dueDate: new Date(628021800000),
      actions: [
        {
          id: 'actionId',
          title: 'actionTitle',
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
      dueDate: new Date(628021800000),
      actions: [
        {
          id: 'actionId',
          title: 'actionTitle',
        }
      ]
    }
  ];

  /**
   * Mock TaskFieldConfig[]
   *
   * Fields is the property of the TaskFieldConfig[], containing the configuration
   * for the fields as returned by the API.
   *
   * The sorting will handled by this component, via the
   * WP api as this component.
   *
   * TODO: Having a strange issue here where the compiler can't resolve,
   * TaskView.TASK_LIST
   */
  public fields: TaskFieldConfig[] = [
    // TODO: Does id need to be in the TaskFieldConfig? probably yeah,
    // and then is it remove using bitmasking?
    {
      name: 'id',
      type: TaskFieldType.STRING,
      columnLabel: 'Id',
      views: TaskView.TASK_LIST,
    },
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
      type: TaskFieldType.STRING,
      columnLabel: 'Due Dated',
      views: TaskView.TASK_LIST,
    },
    // TODO: Does Manage need to be in the TaskFieldConfig?
    // Probably yeah, and it's removed or enabled via Bitmasking?

    // {
    //   name: 'actions',
    //   type: 'actions' as TaskFieldType,
    //   columnLabel: 'Actions',
    //   views: 0x01,
    // },
    // {
    //   name: 'manage',
    //   type: 'manage' as TaskFieldType,
    //   columnLabel: 'Manage',
    //   views: 0x01,
    // }
  ]

  constructor() {
  }

  // TODO: Use bitmasking? Yep so use bitmasking to get rid of the id field, I guess.
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
   * @param fieldname - ie. 'caseName'
   */
  public onSortHandler(fieldName: string): void {
    console.log(fieldName);
  }

  public ngOnDestroy(): void {
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task, TaskFieldConfig} from '../../models/tasks';
import {TaskFieldType} from '../../enums';

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
    {
      name: 'id',
      type: 'id' as TaskFieldType,
      columnLabel: 'Id',
      views: 0x01,
    },
    {
      name: 'caseReference',
      type: 'caseReference' as TaskFieldType,
      columnLabel: 'Case reference',
      views: 0x01,
    },
    {
      name: 'caseName',
      type: 'caseName' as TaskFieldType,
      columnLabel: 'Case name',
      views: 0x01,
    },
    {
      name: 'caseCategory',
      type: 'caseCategory' as TaskFieldType,
      columnLabel: 'Case category',
      views: 0x01,
    },
    {
      name: 'location',
      type: 'location' as TaskFieldType,
      columnLabel: 'Location',
      views: 0x01,
    },
    {
      name: 'taskName',
      type: 'taskName' as TaskFieldType,
      columnLabel: 'Task',
      views: 0x01,
    },
    {
      name: 'dueDate',
      type: 'dueDate' as TaskFieldType,
      columnLabel: 'Due Dated',
      views: 0x01,
    },
    {
      name: 'actions',
      type: 'actions' as TaskFieldType,
      columnLabel: 'Actions',
      views: 0x01,
    }
  ]

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
   * @param fieldname - ie. 'caseName'
   */
  public onSortHandler(fieldName: string): void {
    console.log(fieldName);
  }

  public ngOnDestroy(): void {
  }
}

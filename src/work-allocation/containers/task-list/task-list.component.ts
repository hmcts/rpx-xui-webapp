import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {TaskFieldType, TaskView} from '../../enums';
import {Task, TaskFieldConfig} from '../../models/tasks';

/**
 * Fields is the property of the TaskFieldConfig[], containing the configuration
 * for the fields as returned by the API.
 *
 * TODO: Fields should be an Input into this component.
 * TODO: I believe that the parent component will take in TaskServiceConfig,
 * and this component will receive TaskFieldConfig[], to set the fields.
 *
 * I believe that sorting will handled by the parent component, via the
 * WP api as this component should only be responsible for the displaying
 * of the task list.
 *
 * TODO: Having a strange issue here where the compiler can't resolve,
 * TaskView.TASK_LIST
 */
const fields: TaskFieldConfig[] = [
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

/**
 * TODO: Should take in tasks from outside datasource.
 * TODO: Should be passed into this Task List Component
 *
 * Not part of EUI-2844
 */
const tasks: Task[] = [
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

@Component({
  selector: 'exui-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  @Output() public sortColumn = new EventEmitter<string>();
  // You can use this as a single source of truth that gets mapped to other obserables.
  // Use a single data source using BehavoirSubject
  private tasks$ = new BehaviorSubject(tasks);

  // TODO: SHould we use a BehaviorSubject for fields?

  /**
   * The datasource is an Observable of data to be displayed, as per LLD.
   */
  public dataSource$: Observable<Task[]>;

  // array of column names
  public displayedColumns;

  public fields = fields;

  constructor() {
  }

  // TODO: What happens if the config changes on the fly?
  // TODO: Consider renaming dataSource$
  public ngOnInit() {

    this.dataSource$ = this.tasks$;

    this.displayedColumns = this.getDisplayedColumn(fields);
  }

  /**
   * Returns the columns to be displayed by the Angular Component Dev Kit table.
   *
   * TODO: DisplayedCoulmn is an array of strings specifying the fieldnames to be displayed, in order,
   * this will have to include the 'manage' column as the last one.
   *
   * TODO: Unit test
   */
  public getDisplayedColumn(taskFieldConfig: TaskFieldConfig[]) {

    return taskFieldConfig.map(field => field.name);
  }

  /**
   * Takes in the fieldname, so it can be output to trigger a new Request to the API
   * to get a sorted result set.
   *
   * TODO: Unit test
   *
   * @param fieldName - ie. 'caseName'
   */
  public sort(fieldName: string) {

    this.sortColumn.emit(fieldName);
  }
}

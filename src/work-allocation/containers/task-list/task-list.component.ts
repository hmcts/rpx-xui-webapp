import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Task, TaskFieldConfig} from '../../models/tasks';
import InvokedTaskAction from '../../models/tasks/invoked-task-action.model';
import TaskAction from '../../models/tasks/task-action.model';
import TaskServiceConfig from '../../models/tasks/task-service-config.model';

@Component({
  selector: 'exui-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['task-list.component.scss']
})

export class TaskListComponent implements OnInit {

  /**
   * These are the tasks & fields as returned from the WA Api.
   */
  @Input() public tasks: Task[];
  @Input() public taskServiceConfig: TaskServiceConfig;

  // TODO: Need to re-read the LLD, but I believe it says pass in the taskServiceConfig into this TaskListComponent.
  // Therefore we will not need this.
  @Input() public fields: TaskFieldConfig[];

  @Output() public sortEvent = new EventEmitter<string>();
  @Output() public actionEvent = new EventEmitter<InvokedTaskAction>();

  /**
   * The datasource is an Observable of data to be displayed, as per LLD.
   */
  public dataSource$: Observable<Task[]>;

  public displayedColumns;

  private selectedRow;

  constructor() {
  }

  public ngOnInit() {

    const tasks$ = new BehaviorSubject(this.tasks);
    this.dataSource$ = tasks$;

    this.displayedColumns = this.getDisplayedColumn(this.fields);
  }

  /**
   * Returns the columns to be displayed by the Angular Component Dev Kit table.
   *
   * TODO: Unit test
   */
  public getDisplayedColumn(taskFieldConfig: TaskFieldConfig[]) {

    const fields = taskFieldConfig.map(field => field.name);
    return this.addManageColumn(fields);
  }

  /**
   * Note that the fields we get from the WA Api will not contain a 'manage' field.
   *
   * Therefore we need to add the 'manage' column field within this component, as discussed in the LLD.
   */
  public addManageColumn(fields: string[]) {

    return [...fields, 'manage'];
  }

  /**
   * Takes in the fieldname, so it can be output to trigger a new Request to the API
   * to get a sorted result set.
   *
   * TODO: Unit test
   *
   * @param fieldName - ie. 'caseName'
   */
  public onSortHandler(fieldName: string) {

    this.sortEvent.emit(fieldName);
  }

  /**
   * Trigger an event to the parent when the User clicks on a Manage action.
   */
  public onActionHandler(task: Task, action: TaskAction) {

    const invokedTaskAction: InvokedTaskAction = {
      task,
      action
    };

    this.actionEvent.emit(invokedTaskAction);
  }

  /**
   * Set Selected Row
   *
   * Open and close the selected row.
   */
  public setSelectedRow(row) {

    if (row === this.getSelectedRow()) {
      this.selectedRow = null;
    } else {
      this.selectedRow = row;
    }
  }

  public getSelectedRow() {

    return this.selectedRow;
  }

  public isRowSelected(row) {

    return row === this.getSelectedRow();
  }

  /**
   * Sorting happens outside of this component.
   *
   * TaskServiceConfig is passed into this component, and from this we're able to see how the table
   * has been sorted by the Work Allocation Api.
   *
   * We then set the sort table header to reflect this.
   *
   * TODO: Think about moving 'none' to task sort model.
   *
   * @param fieldName - 'caseReference'
   * @return 'none' / 'ascending' / 'descending'
   */
  public isColumnSorted(fieldName) {

    const { defaultSortFieldName, defaultSortDirection } = this.taskServiceConfig;

    if (fieldName === defaultSortFieldName) {
      return defaultSortDirection;
    }

    return 'none';
  }
}

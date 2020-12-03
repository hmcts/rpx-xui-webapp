import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Task, TaskFieldConfig, TaskSortField } from '../../models/tasks';
import InvokedTaskAction from '../../models/tasks/invoked-task-action.model';
import TaskAction from '../../models/tasks/task-action.model';
import TaskServiceConfig from '../../models/tasks/task-service-config.model';
import { TaskSort } from './../../enums/task-sort';

@Component({
  selector: 'exui-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['task-list.component.scss']
})

export class TaskListComponent implements OnChanges, OnInit {

  /**
   * These are the tasks & fields as returned from the WA Api.
   */
  @Input() public tasks: Task[];
  @Input() public taskServiceConfig: TaskServiceConfig;
  @Input() public sortedBy: TaskSortField;
  @Input() public showManage: boolean = true;

  // TODO: Need to re-read the LLD, but I believe it says pass in the taskServiceConfig into this TaskListComponent.
  // Therefore we will not need this.
  @Input() public fields: TaskFieldConfig[];

  @Output() public sortEvent = new EventEmitter<string>();
  @Output() public actionEvent = new EventEmitter<InvokedTaskAction>();

  /**
   * The datasource is an Observable of data to be displayed, as per LLD.
   */
  public dataSource$: Observable<Task[]>;

  public displayedColumns: string[];

  private selectedRow: Task;

  constructor(private readonly location: Location) {
  }

  public ngOnInit(): void {
    const taskFromUrl = this.selectTaskFromUrlHash(this.location, this.tasks);
    if (taskFromUrl) {
      this.setSelectedRow(taskFromUrl);
    }
  }

  public selectTaskFromUrlHash(location: Location, tasks: Task[]): Task | null {
    const url = location.path(true);
    const hashValue = url.substring(url.indexOf('#') + 1);
    if (hashValue && hashValue.indexOf('manage_') === 0) {
      const selectedTaskId = hashValue.replace('manage_', '');
      const selectedTask = tasks.find(task => task.id === selectedTaskId);
      return selectedTask;
    }
    return null;
  }

  public ngOnChanges() {
    if (this.tasks) {
      this.dataSource$ = new BehaviorSubject(this.tasks);
    }
    if (this.fields) {
      this.displayedColumns = this.getDisplayedColumn(this.fields);
    }
  }

  /**
   * Returns the columns to be displayed by the Angular Component Dev Kit table.
   *
   */
  public getDisplayedColumn(taskFieldConfig: TaskFieldConfig[]): string[] {

    const fields = taskFieldConfig.map(field => field.name);
    return this.showManage ? this.addManageColumn(fields) : fields;
  }

  /**
   * Note that the fields we get from the WA Api will not contain a 'manage' field.
   *
   * Therefore we need to add the 'manage' column field within this component, as discussed in the LLD.
   */
  public addManageColumn(fields: string[]): string[] {

    return [...fields, 'manage'];
  }

  /**
   * Takes in the fieldname, so it can be output to trigger a new Request to the API
   * to get a sorted result set.
   *
   *
   * @param fieldName - ie. 'caseName'
   */
  public onSortHandler(fieldName: string): void {
    // emit the task sort field to get relevant information
    this.sortEvent.emit(fieldName);
  }

  /**
   * Trigger an event to the parent when the User clicks on a Manage action.
   */
  public onActionHandler(task: Task, action: TaskAction): void {

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
  public setSelectedRow(row: Task): void {
    if (row === this.getSelectedRow()) {
      this.selectedRow = null;
    } else {
      this.selectedRow = row;
    }
  }

  public getSelectedRow(): Task {

    return this.selectedRow;
  }

  public isRowSelected(row: Task): boolean {

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
  public isColumnSorted(fieldName: string): TaskSort {
    // If we don't have an actual sortedBy value, default it now.
    if (!this.sortedBy) {
      const { defaultSortFieldName, defaultSortDirection } = this.taskServiceConfig;
      this.sortedBy = { fieldName: defaultSortFieldName, order: defaultSortDirection };
    }


    // If this is the field we're sorted by, return the appropriate order.
    if (this.sortedBy.fieldName === fieldName) {
      return this.sortedBy.order;
    }

    // This field is not sorted, return NONE.
    return TaskSort.NONE;
  }

}

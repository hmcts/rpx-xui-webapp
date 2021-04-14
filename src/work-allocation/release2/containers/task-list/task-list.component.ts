import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { ListConstants } from '../../../../work-allocation/components/constants';
import { TaskSort } from '../../../../work-allocation/enums';
import { InvokedTaskAction, Task, TaskAction, TaskFieldConfig, TaskServiceConfig, TaskSortField } from '../../../../work-allocation/models/tasks';

@Component({
  selector: 'exui-task-list-r2',
  templateUrl: './task-list.component.html',
  styleUrls: ['task-list.component.scss']
})
export class TaskListRelease2Component implements OnChanges {

  /**
   * These are the tasks & fields as returned from the WA Api.
   */
  @Input() public tasks: Task[];
  @Input() public taskServiceConfig: TaskServiceConfig;
  @Input() public sortedBy: TaskSortField;
  @Input() public showManage: boolean = true;

  /**
   * The message to display when there are no tasks to display in the list.
   */
  @Input() public emptyMessage: string = ListConstants.EmptyMessage.Default;

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

  private selectedTask: Task;

  constructor(private readonly router: Router) {}

  public selectTaskFromUrlHash(url: string): Task | null {
    if (url) {
      const hashValue = url.substring(url.indexOf('#') + 1);
      if (hashValue && hashValue.indexOf('manage_') === 0) {
        const selectedTaskId = hashValue.replace('manage_', '');
        return this.tasks.find(task => task.id === selectedTaskId) || null;
      }
    }
    return null;
  }

  public ngOnChanges() {
    if (this.tasks) {
      this.dataSource$ = new BehaviorSubject(this.tasks);
      this.setSelectedTask(this.selectTaskFromUrlHash(this.router.url));
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
  public setSelectedTask(row: Task): void {
    if (row === this.selectedTask) {
      this.selectedTask = null;
    } else {
      this.selectedTask = row;
    }

    // Now change the URL to update the hash.
    this.setupHash();
  }

  public getSelectedTask(): Task {
    return this.selectedTask;
  }

  public isTaskSelected(task: Task): boolean {
    return task === this.selectedTask;
  }

  /**
   * Sorting happens outside of this component.
   *
   * TaskServiceConfig is passed into this component, and from this we're able to see how the table
   * has been sorted by the Work Allocation Api.
   *
   * We then set the sort table header to reflect this.
   *
   * 'ascending'/'descending' needed to set sorting instead of 'asc'/'desc' which does not sort correctly
   *
   * TODO: Think about moving 'none' to task sort model.
   *
   * @param fieldName - 'caseName'
   * @return 'none' / 'asc' / 'desc'
   */
  public getColumnSortedSetting(fieldName: string): string {
    // If we don't have an actual sortedBy value, default it now.
    if (!this.sortedBy) {
      const { defaultSortFieldName, defaultSortDirection } = this.taskServiceConfig;
      this.sortedBy = { fieldName: defaultSortFieldName, order: defaultSortDirection };
    }

    // If this is the field we're sorted by, return the appropriate order.
    if (this.sortedBy.fieldName === fieldName) {
      return this.sortedBy.order === TaskSort.ASC ? 'ascending' : 'descending'
    }

    // This field is not sorted, return NONE.
    return TaskSort.NONE;
  }

  private setupHash(): void {
    if (this.showManage) {
      const currentPath = this.router.url || '';
      const basePath = currentPath.split('#')[0];
      if (this.selectedTask) {
        this.router.navigate([ basePath ], { fragment: `manage_${this.selectedTask.id}` });
      } else {
        this.router.navigate([ basePath ]);
      }
    }
  }

}

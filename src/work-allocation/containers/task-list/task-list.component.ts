import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Task, TaskFieldConfig} from '../../models/tasks';

@Component({
  selector: 'exui-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  /**
   * These are the tasks as returned from the WA Api.
   */
  @Input() public tasks: Task[];

  /**
   * These are the fields as returned from the WA Api.
   */
  @Input() public fields: TaskFieldConfig[];

  @Output() public sortByFieldName = new EventEmitter<string>();

  private tasks$;

  /**
   * The datasource is an Observable of data to be displayed, as per LLD.
   */
  public dataSource$: Observable<Task[]>;

  public displayedColumns;

  private _selectedRow;

  constructor() {
  }

  // TODO: What happens if the config changes on the fly?
  // TODO: Consider renaming dataSource$
  public ngOnInit() {

    this.tasks$ = new BehaviorSubject(this.tasks);
    this.dataSource$ = this.tasks$;

    this.displayedColumns = this.getDisplayedColumn(this.fields);
  }

  /**
   * Returns the columns to be displayed by the Angular Component Dev Kit table.
   *
   * TODO: Unit test
   */
  public getDisplayedColumn(taskFieldConfig: TaskFieldConfig[]) {

    const fields = taskFieldConfig.map(field => field.name);
    const fieldsWithManageColumn = this.addManageColumn(fields);

    return fieldsWithManageColumn;
  }

  /**
   * Note that the fields we get from the Work Allocation Api will not contain a 'manage' field.
   *
   * Therefore we need to add the 'manage' columnd field within this component.
   */
  public addManageColumn(fields: string[]) {

    return [...fields, 'manage'];
  }

  // We need to make sure that 'manage' is added here,
  // we don't need to add 'manage' to the column names
  // We probably don't need to cut off id as well.
  // the taskFieldConfig comes from the Api.
  /**
   * Takes in the fieldname, so it can be output to trigger a new Request to the API
   * to get a sorted result set.
   *
   * TODO: Unit test
   *
   * @param fieldName - ie. 'caseName'
   */
  public sort(fieldName: string) {

    this.sortByFieldName.emit(fieldName);
  }

  /**
   * Set Selected Row
   *
   * Open and close the selected row.
   */
  public setSelectedRow(row) {

    if (row === this.getSelectedRow()) {
      this._selectedRow = null;
    } else {
      this._selectedRow = row;
    }
  }

  public getSelectedRow() {

    return this._selectedRow;
  }

  public isRowSelected(row) {

    return row === this.getSelectedRow();
  }
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Task, TaskFieldConfig} from '../../models/tasks';

@Component({
  selector: 'exui-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  @Input() public tasks: Task[];
  @Input() public fields: TaskFieldConfig[];
  @Output() public sortByFieldName = new EventEmitter<string>();

  private tasks$;

  /**
   * The datasource is an Observable of data to be displayed, as per LLD.
   */
  public dataSource$: Observable<Task[]>;

  public displayedColumns;

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

    this.sortByFieldName.emit(fieldName);
  }
}

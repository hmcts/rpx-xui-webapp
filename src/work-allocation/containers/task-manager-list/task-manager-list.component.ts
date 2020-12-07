import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  ALL_CASEWORKERS,
  ALL_LOCATIONS,
  NO_CASEWORKER_ASSIGNED,
} from '../../components/task-manager-filter/task-manager-filter.component';
import { TaskFieldType, TaskView } from '../../enums';
import { Caseworker, Location, SearchTaskRequest } from '../../models/dtos';
import { TaskFieldConfig } from '../../models/tasks';
import { CaseworkerDataService, LocationDataService, WorkAllocationTaskService } from '../../services';
import { TaskListWrapperComponent } from '../task-list-wrapper/task-list-wrapper.component';
import { CaseworkerDisplayName } from './../../pipes/caseworker-display-name.pipe';


export const TASK_MANAGER_CONFIG: TaskFieldConfig[] = [
  {
    name: 'caseReference',
    type: TaskFieldType.CASE_REFERENCE,
    columnLabel: 'Case reference',
    views: TaskView.TASK_MANAGER
  },
  {
    name: 'caseName',
    type: TaskFieldType.STRING,
    columnLabel: 'Case name',
    views: TaskView.TASK_MANAGER
  },
  {
    name: 'caseCategory',
    type: TaskFieldType.STRING,
    columnLabel: 'Case category',
    views: TaskView.TASK_MANAGER
  },
  {
    name: 'location',
    type: TaskFieldType.STRING,
    columnLabel: 'Location',
    views: TaskView.TASK_MANAGER
  },
  {
    name: 'taskName',
    type: TaskFieldType.STRING,
    columnLabel: 'Task',
    views: TaskView.TASK_MANAGER
  },
  {
    name: 'dueDate',
    type: TaskFieldType.DATE_DUE,
    columnLabel: 'Date',
    views: TaskView.TASK_MANAGER
  },
  {
    name: 'assignee',
    type: TaskFieldType.STRING,
    columnLabel: 'Assignee',
    views: TaskView.TASK_MANAGER
  }
];

@Component({
  selector: 'exui-task-manager-list',
  templateUrl: 'task-manager-list.component.html'
})
export class TaskManagerListComponent extends TaskListWrapperComponent implements OnInit {
  public caseworkers: Caseworker[];
  public locations: Location[];
  private selectedCaseworker: Caseworker;
  private selectedLocation: Location;
  private readonly caseworkerDisplayName: CaseworkerDisplayName = new CaseworkerDisplayName();

  /**
   * Take in the Router so we can navigate when actions are clicked.
   */
  constructor(
    protected taskService: WorkAllocationTaskService,
    protected router: Router,
    private readonly caseworkerService: CaseworkerDataService,
    private readonly locationService: LocationDataService
  ) {
    super(taskService, router);
  }

  public get fields(): TaskFieldConfig[] {
    return TASK_MANAGER_CONFIG;
  }

  public get taskCount(): number {
    return this.tasks ? this.tasks.length : 0;
  }

  public get tasksLabel(): string {
    return this.taskCount === 1 ? 'task' : 'tasks';
  }

  public ngOnInit(): void {
    super.ngOnInit();
    // Get the caseworkers and locations for this component.
    this.caseworkerService.getAll().subscribe(caseworkers => {
      this.caseworkers = [ ...caseworkers ];
      this.loadTasks();
    });
    this.locationService.getLocations().subscribe(locations => {
      this.locations = [ ...locations ];
      this.loadTasks();
    });
  }

  public onLocationChanged(location: Location): void {
    console.log('Location changed', location);
    this.selectedLocation = location;
    this.loadTasks();
  }

  public onCaseworkerChanged(caseworker: Caseworker): void {
    console.log('Caseworker changed', caseworker);
    this.selectedCaseworker = caseworker;
    this.loadTasks();
  }

  public loadTasks(): void {
    if (this.locations && this.caseworkers) {
      super.loadTasks();
    }
  }

  /**
   * Override the default.
   */
  public getSearchTaskRequest(): SearchTaskRequest {
    return {
      search_parameters: [
        {
          key: this.sortedBy.fieldName,
          operator: 'manager',
          values: [ this.sortedBy.order ]
        },
        this.getLocationParameter(),
        this.getCaseworkerParameter()
      ]
    };
  }

  private getLocationParameter() {
    let values: string[];
    if (this.selectedLocation && this.selectedLocation !== ALL_LOCATIONS) {
      values = [ this.selectedLocation.locationName ];
    } else {
      values = this.locations.map(loc => loc.locationName);
    }
    return { key: 'location', operator: 'IN', values };
  }

  private getCaseworkerParameter() {
    let values: string[];
    if (this.selectedCaseworker && this.selectedCaseworker !== ALL_CASEWORKERS) {
      if (this.selectedCaseworker === NO_CASEWORKER_ASSIGNED) {
        values = [];
      } else {
        values = [ this.caseworkerDisplayName.transform(this.selectedCaseworker) ];
      }
    } else {
      values = this.caseworkers.map(cw => this.caseworkerDisplayName.transform(cw));
    }
    return { key: 'assignee', operator: 'IN', values };
  }
}

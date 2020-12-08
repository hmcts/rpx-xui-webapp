import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CheckboxListComponent } from '@hmcts/rpx-xui-common-lib';
import { WorkAllocationTaskService } from 'src/work-allocation/services/work-allocation-task.service';

import { TaskFieldType, TaskView } from '../../enums';
import { Location, SearchTaskRequest } from '../../models/dtos';
import { TaskFieldConfig } from '../../models/tasks';
import { LocationDataService } from './../../services/location-data.service';
import { TaskListWrapperComponent } from './../task-list-wrapper/task-list-wrapper.component';

export const AVAILABLE_TASKS_CONFIG: TaskFieldConfig[] = [
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
    type: TaskFieldType.DATE_DUE,
    columnLabel: 'Date',
    views: TaskView.TASK_LIST,
  }
];

@Component({
  selector: 'exui-available-tasks',
  templateUrl: 'available-tasks.component.html',
  styleUrls: ['available-tasks.component.scss']
})
export class AvailableTasksComponent extends TaskListWrapperComponent implements OnInit {
  @ViewChild(CheckboxListComponent)
  private readonly locationFilter: CheckboxListComponent<Location>;

  private detailsElement: HTMLDetailsElement;

  private readonly DEFAULT_LOCATION = {
    id: 'a', locationName: 'Taylor House', services: [ 'a' ]
  };

  public locations: Location[];
  private selectedLocations: Location[] = [ this.DEFAULT_LOCATION ];
  public readonly preselection: Location[] = [ this.DEFAULT_LOCATION ];

  /**
   * Take in the Router so we can navigate when actions are clicked.
   */
  constructor(
    protected taskService: WorkAllocationTaskService,
    protected router: Router,
    private readonly locationService: LocationDataService
  ) {
    super(taskService, router);
  }

  public get fields(): TaskFieldConfig[] {
    return AVAILABLE_TASKS_CONFIG;
  }

  public ngOnInit(): void {
    super.ngOnInit();
    // Get the locations for the checkbox filter component.
    this.locationService.getLocations().subscribe(locations => {
      this.locations = [ ...locations ];
      this.loadTasks();
    });
  }

  public loadTasks(): void {
    if (this.locations) {
      // Should this clear out the existing set first?
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
          operator: 'sort',
          values: [ this.sortedBy.order ]
        },
        this.getLocationParameter(),
        { key: 'assignee', operator: 'IN', values: [] } // Unassigned.
      ]
    };
  }

  private getLocationParameter() {
    let values: string[];
    if (this.selectedLocations) {
      values = this.selectedLocations.map(loc => loc.locationName);
    } else {
      values = this.locations.map(loc => loc.locationName);
    }
    values = values.sort();
    return { key: 'location', operator: 'IN', values };
  }

  /**
   * Returns a label to represent a location.
   * @param location The Location to render a label for.
   */
  public locationLabelFunction(location: Location): string {
    return location ? location.locationName : '';
  }

  /**
   * Apply the filter and load the new set of tasks.
   */
  public applyFilter(): void {
    this.selectedLocations = [ ...this.locationFilter.selection ];
    this.loadTasks();
  }

  /**
   * Reset the filter to its last applied state and collapse the
   * <details></details> panel.
   */
  public cancelFilter(): void {
    this.locationFilter.selection = this.selectedLocations;
    if (this.detailsElement) {
      this.detailsElement.open = false;
    }
  }

  /**
   * Listen for the <details></details> element being toggled so that
   * we can get a reference to it and then collapse it again if the
   * user cancels the filtering activity.
   */
  public onDetailsToggle(event: { target: HTMLDetailsElement }): void {
    if (!this.detailsElement) {
      this.detailsElement = event.target;
    }
  }
}

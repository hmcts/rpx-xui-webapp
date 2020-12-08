import { Component } from '@angular/core';

import { TaskFieldType, TaskView } from '../../enums';
import { Location, SearchTaskRequest } from '../../models/dtos';
import { TaskFieldConfig } from '../../models/tasks';
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

export const AVAILABLE_TASKS_FILTER_ID = 'AVAILABLE_TASKS_FILTER';
@Component({
  selector: 'exui-available-tasks',
  templateUrl: 'available-tasks.component.html'
})
export class AvailableTasksComponent extends TaskListWrapperComponent {
  private selectedLocations: Location[] = [];

  public get fields(): TaskFieldConfig[] {
    return AVAILABLE_TASKS_CONFIG;
  }

  /**
   * Override the default.
   */
  public getSearchTaskRequest(): SearchTaskRequest {
    return {
      search_parameters: [
        this.getSortParameter(),
        this.getLocationParameter(),
        { key: 'assignee', operator: 'IN', values: [] } // Unassigned.
      ]
    };
  }

  /**
   * When the filter changes, we need to reload the list of tasks.
   * @param locations The currently selected locations.
   */
  public onLocationsChanged(locations: Location[]): void {
    this.selectedLocations = [ ...locations ];
    this.loadTasks();
  }

  private getLocationParameter() {
    return {
      key: 'location',
      operator: 'IN',
      values: this.selectedLocations.map(loc => loc.locationName).sort()
    };
  }
}

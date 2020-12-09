import { Component } from '@angular/core';

import { InfoMessage, InfoMessageType, TaskActionIds, TaskFieldType, TaskView } from '../../enums';
import { InformationMessage } from '../../models/comms';
import { Location, SearchTaskRequest } from '../../models/dtos';
import { InvokedTaskAction, TaskFieldConfig } from '../../models/tasks';
import { TaskListWrapperComponent } from '../task-list-wrapper/task-list-wrapper.component';

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

  /**
   * A User 'Claims' themselves a task aka. 'Assign to me'.
   *
   * TODO: Unit test
   */
  public claimTask(taskId): void {

    this.taskService.claimTask(taskId).subscribe(() => {

      const message: InformationMessage = {
        type: InfoMessageType.SUCCESS,
        message: InfoMessage.ASSIGNED_TASK_AVAILABLE_IN_MY_TASKS,
      };

      this.messageService.emitInfoMessageChange(message);
    }, error => {

      this.claimTaskErrors(error.status);
    });
  }

  /**
   * Navigate the User to the correct error page, or throw an on page warning
   * that the Task is no longer available.
   *
   * TODO: Unit test
   */
  public claimTaskErrors(status): void {

    const message: InformationMessage = {
      type: InfoMessageType.WARNING,
      message: InfoMessage.TASK_NO_LONGER_AVAILABLE,
    };

    switch (status) {
      case 401:
      case 403:
        this.route.navigate(['/not-authorised']);
        break;
      case 500:
        this.route.navigate(['/service-down']);
        break;
      default:
        this.messageService.emitInfoMessageChange(message);
    }
  }

  /**
   * Handle a User Claiming a Task
   *
   * TODO: Unit test
   * TODO: This function will need to handle 'Assign to me and go to case' - EUI-2963.
   */
  public onActionHandler(taskAction: InvokedTaskAction): void {

    switch (taskAction.action.id) {
      case TaskActionIds.CLAIM:
        this.claimTask(taskAction.task.id);
        break;
      case TaskActionIds.CLAIM_AND_NAVIGATE:
        // EUI-2963
        break;
      default:
    }
  }
}

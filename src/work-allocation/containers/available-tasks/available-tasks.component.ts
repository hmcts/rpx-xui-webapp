import { Component } from '@angular/core';

import { ConfigConstants, ListConstants, SortConstants } from '../../components/constants';
import { InfoMessage, InfoMessageType, TaskActionIds } from '../../enums';
import { Location, SearchTaskRequest } from '../../models/dtos';
import { InvokedTaskAction, Task, TaskFieldConfig } from '../../models/tasks';
import { handleFatalErrors, REDIRECTS } from '../../utils';
import { TaskListWrapperComponent } from '../task-list-wrapper/task-list-wrapper.component';

@Component({
  selector: 'exui-available-tasks',
  templateUrl: 'available-tasks.component.html'
})
export class AvailableTasksComponent extends TaskListWrapperComponent {
  private selectedLocations: Location[];

  public get fields(): TaskFieldConfig[] {
    return ConfigConstants.AvailableTasks;
  }

  public get sortSessionKey(): string {
    return SortConstants.Session.AvailableTasks;
  }

  public get view(): string {
    return ListConstants.View.AvailableTasks;
  }

  /**
   * Override the default.
   */
  public getSearchTaskRequest(): SearchTaskRequest {
    return {
      search_parameters: [
        this.getLocationParameter(),
        { key: 'state', operator: 'IN', values: ['unassigned'] }
      ],
      sorting_parameters: [this.getSortParameter()]
    };
  }

  /**
   * When the filter changes, we need to reload the list of tasks.
   * @param locations The currently selected locations.
   */
  public onLocationsChanged(locations: Location[]): void {
    this.infoMessageCommService.removeAllMessages();
    this.selectedLocations = [ ...locations ];
    this.loadTasks();
  }

  public loadTasks(): void {
    // TODO: Need to check whether this functionality is needed
    // if (this.selectedLocations) {
    super.loadTasks();
    // }
  }

  private getLocationParameter() {
    let values = [];
    if (this.selectedLocations) {
      values = this.selectedLocations.map(loc => loc.id).sort();
    }
    return { key: 'location', operator: 'IN', values };
  }

  /**
   * A User 'Claims' themselves a task aka. 'Assign to me'.
   */
  public claimTask(taskId: string): void {

    this.taskService.claimTask(taskId).subscribe(() => {
      this.infoMessageCommService.nextMessage({
        type: InfoMessageType.SUCCESS,
        message: InfoMessage.ASSIGNED_TASK_AVAILABLE_IN_MY_TASKS,
      });
      this.refreshTasks();
    }, error => {

      this.claimTaskErrors(error.status);
    });
  }

  /**
   * A User 'Claims' themselves a task and goes to the case details page for that case aka. 'Assign to me'.
   */
  public claimTaskAndGo(task: Task): void {
    this.taskService.claimTask(task.id).subscribe(() => {
      const caseUrl = `/cases/case-details/${task.case_id}`
      // navigates to case details page for specific case id
      this.router.navigate([caseUrl], {
        state: {
          showMessage: true,
          messageText: InfoMessage.ASSIGNED_TASK_AVAILABLE_IN_MY_TASKS}
        });
    }, error => {

      this.claimTaskErrors(error.status);
    });
  }

  /**
   * Navigate the User to the correct error page, or throw an on page warning
   * that the Task is no longer available.
   */
  public claimTaskErrors(status: number): void {

    const REDIRECT_404 = [{ status: 404, redirectTo: REDIRECTS.ServiceDown }];
    const handledStatus = handleFatalErrors(status, this.router, REDIRECT_404);
    if (handledStatus > 0) {
      this.infoMessageCommService.nextMessage({
        type: InfoMessageType.WARNING,
        message: InfoMessage.TASK_NO_LONGER_AVAILABLE,
      });
      if (handledStatus === 400) {
        this.refreshTasks();
      }
    }
  }

  /**
   * Handle a User Claiming a Task
   */
  public onActionHandler(taskAction: InvokedTaskAction): void {
    switch (taskAction.action.id) {
      case TaskActionIds.CLAIM:
        return this.claimTask(taskAction.task.id);
      case TaskActionIds.CLAIM_AND_GO:
        return this.claimTaskAndGo(taskAction.task);
      default:
        return super.onActionHandler(taskAction);
    }
  }
}

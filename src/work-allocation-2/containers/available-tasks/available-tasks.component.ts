import { Component } from '@angular/core';
import { InvokedTaskAction, Task } from '../../..//work-allocation-2/models/tasks';
import { InfoMessage, InfoMessageType, TaskActionIds } from '../../../work-allocation-2/enums';
import { SearchTaskRequest } from '../../../work-allocation-2/models/dtos';
import { TaskFieldConfig } from '../../../work-allocation-2/models/tasks';
import { handleFatalErrors, REDIRECTS } from '../../../work-allocation-2/utils';

import { UserInfo } from '../../../app/models/user-details.model';
import { ConfigConstants, ListConstants, SortConstants } from '../../components/constants';
import { TaskListWrapperComponent } from '../task-list-wrapper/task-list-wrapper.component';

@Component({
  selector: 'exui-available-tasks',
  templateUrl: 'available-tasks.component.html'
})
export class AvailableTasksComponent extends TaskListWrapperComponent {

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
   * TODO: When implementing filtering this may need to be changed to get location(s) from filter
   * Override the default.
   */
  public getSearchTaskRequestPagination(): SearchTaskRequest {
    const userInfoStr = this.sessionStorageService.getItem('userDetails');
    if (userInfoStr) {
      const userInfo: UserInfo = JSON.parse(userInfoStr);
      const id = userInfo.id ? userInfo.id : userInfo.uid;
      const isJudge = userInfo.roles.some(role => ListConstants.JUDGE_ROLES.includes(role));
      return {
        search_parameters: [
          {key: 'location', operator: 'IN', values: []},
          {key: 'state', operator: 'IN', values: ['unassigned']}
        ],
        sorting_parameters: [this.getSortParameter()],
        search_by: isJudge ? 'judge' : 'caseworker',
        pagination_parameters: this.getPaginationParameter()
      };
    }
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
      const goToCaseUrl = `/cases/case-details/${task.case_id}`;
      // navigates to case details page for specific case id
      this.router.navigate([goToCaseUrl], {
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

  /**
   * Handle the paging event
   */
  public onPaginationEvent(pageNumber: number): void {
    this.onPaginationHandler(pageNumber);
  }
}

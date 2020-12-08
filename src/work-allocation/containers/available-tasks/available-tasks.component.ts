import {Component} from '@angular/core';

import {InfoMessage, InfoMessageType, TaskActionIds, TaskFieldType, TaskView} from '../../enums';
import {SearchTaskRequest} from '../../models/dtos/search-task-request';
import {Task, TaskFieldConfig} from '../../models/tasks';
import {TaskListWrapperComponent} from './../task-list-wrapper/task-list-wrapper.component';
import InvokedTaskAction from '../../models/tasks/invoked-task-action.model';

@Component({
  selector: 'exui-available-tasks',
  templateUrl: 'available-tasks.component.html'
})
export class AvailableTasksComponent extends TaskListWrapperComponent {

  // List of tasks
  private pTasks: Task[];

  public get tasks(): Task[] {
    return this.pTasks;
  }

  public set tasks(value: Task[]) {
    this.pTasks = value;
  }

  private readonly CASE_REFERENCE_FIELD: TaskFieldConfig = {
    name: 'caseReference',
    type: TaskFieldType.STRING,
    columnLabel: 'Case reference',
    views: TaskView.TASK_LIST,
  };

  /**
   * Mock TaskFieldConfig[]
   *
   * Fields is the property of the TaskFieldConfig[], containing the configuration
   * for the fields as returned by the API.
   *
   * The sorting will handled by this component, via the
   * WP api as this component.
   */
  private readonly pFields: TaskFieldConfig[] = [
    this.CASE_REFERENCE_FIELD,
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
    },
  ];

  public get fields(): TaskFieldConfig[] {
    return this.pFields;
  }

  public getSearchTaskRequest(): SearchTaskRequest {
    return {
      search_parameters: [
        {
          key: this.sortedBy.fieldName,
          operator: 'available',
          values: [this.sortedBy.order]
        }
      ]
    };
  }

  /**
   * A User 'Claims' themselves a task aka. 'Assign to me'.
   */
  public claimTask(taskId): void {

    this.taskService.claimTask(taskId).subscribe(() => {

        this.messageService.emitInfoMessageChange(
          InfoMessageType.SUCCESS,
          InfoMessage.ASSIGNED_TASK_AVAILABLE_IN_MY_TASKS
        );
      }, error => {

        this.claimTaskErrors(error.status);
      });
  }

  /**
   * Navigate the User to the correct error page, or throw an on page warning
   * that the Task is no longer available.
   */
  public claimTaskErrors(status): void {

    switch (status) {
      case 401:
      case 403:
        this.route.navigate([`/not-authorised`]);
        break;
      case 500:
        this.route.navigate([`/service-down`]);
        break;
      default:
        this.messageService.emitInfoMessageChange(
          InfoMessageType.WARNING,
          InfoMessage.TASK_NO_LONGER_AVAILABLE,
        );
    }
  }

  /**
   * Handle a User Claiming a Task
   *
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

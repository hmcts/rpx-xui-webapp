import { Component } from '@angular/core';

import { InfoMessage, InfoMessageType, TaskActionIds, TaskFieldType, TaskView } from '../../enums';
import { SearchTaskRequest } from '../../models/dtos/search-task-request';
import { Task, TaskFieldConfig } from '../../models/tasks';
import { TaskListWrapperComponent } from './../task-list-wrapper/task-list-wrapper.component';
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
   * User claims a task.
   *
   * Does this link into assign tasks?
   */
  public claimTask(taskId): void {

    console.log('claimTask');
    console.log(taskId);

    // this.messageService.emitInfoMessageChange(
    //   InfoMessageType.WARNING,
    //   InfoMessage.TASK_NO_LONGER_AVAILABLE
    // );

    // Emit change
    this.messageService.emitInfoMessageChange(
      InfoMessageType.SUCCESS,
      InfoMessage.ASSIGNED_TASK_AVAILABLE_IN_MY_TASKS
    );

    this.taskService.claimTask(taskId).subscribe(claimTask => {
      console.log('claimTask Response');
      console.log(claimTask);
    });
  }

  // TODO: Remove switch
  public onActionHandler(taskAction: InvokedTaskAction): void {
    // Remove after integration
    console.log('Available Task component received InvokedTaskAction:');
    console.log(taskAction);
    switch (taskAction.action.id) {
      case TaskActionIds.CLAIM:
        console.log('claim task');
        this.claimTask(taskAction.task.id);
        break;
      default:
    }
  }
}

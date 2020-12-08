import { Component } from '@angular/core';

import { TaskFieldType, TaskView } from '../../enums';
import { SearchTaskParameter, SearchTaskRequest } from '../../models/dtos';
import { TaskFieldConfig } from '../../models/tasks';
import { TaskListWrapperComponent } from './../task-list-wrapper/task-list-wrapper.component';

export const MY_TASKS_CONFIG: TaskFieldConfig[] = [
  {
    name: 'caseReference',
    type: TaskFieldType.CASE_REFERENCE,
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
  selector: 'exui-my-tasks',
  templateUrl: '../task-list-wrapper/task-list-wrapper.component.html'
})
export class MyTasksComponent extends TaskListWrapperComponent {

  public get emptyMessage(): string {
    return 'You have no assigned tasks.';
  }

  /**
   * Mock TaskFieldConfig[]
   *
   * Fields is the property of the TaskFieldConfig[], containing the configuration
   * for the fields as returned by the API.
   *
   * The sorting will handled by this component, via the
   * WP api as this component.
   */
  public get fields(): TaskFieldConfig[] {
    return MY_TASKS_CONFIG;
  }

  public getSearchTaskRequest(): SearchTaskRequest {
    return {
      search_parameters: [
        {
          key: this.sortedBy.fieldName,
          operator: 'sort',
          values: [ this.sortedBy.order ]
        },
        this.getCaseworkerParameter()
      ]
    };
  }

  private getCaseworkerParameter(): SearchTaskParameter {
    // Always pretend to be John Smith for "My" tasks.
    return { key: 'assignee', operator: 'IN', values: [ 'John Smith' ] };
  }
}

import { Component } from '@angular/core';
import { CONFIG_CONSTANTS } from 'src/work-allocation-2/components/constants/config.constants';
import { TaskService, TaskSort } from 'src/work-allocation-2/enums';
import { PaginationParameter } from 'src/work-allocation-2/models/dtos';
import { InvokedTaskAction, Task, TaskFieldConfig, TaskServiceConfig, TaskSortField } from '../../models/tasks';

@Component({
    selector: 'exui-all-work-tasks',
    templateUrl: 'all-work-task.component.html',
    styleUrls: ['all-work-task.component.scss']
})
export class AllWorkTaskComponent {

  private pagination: PaginationParameter = {
    page_number: 1,
    page_size: 25
  };

  private readonly defaultTaskServiceConfig: TaskServiceConfig = {
    service: TaskService.IAC,
    defaultSortDirection: TaskSort.NONE,
    defaultSortFieldName: 'dueDate',
    fields: this.fields,
  };
  private tasks: Task[];

  public get fields(): TaskFieldConfig[] {
    return CONFIG_CONSTANTS.AllWorkTasks;
  }

  public get taskServiceConfig(): TaskServiceConfig {
    return this.defaultTaskServiceConfig;
  }

}

import {AppUtils} from './../../../app/app-utils';
import {Router, ActivatedRoute} from '@angular/router';
import {WorkAllocationTaskService} from 'src/work-allocation/services/work-allocation-task.service';
import { Component } from '@angular/core';

import { TaskFieldType, TaskView } from '../../enums';
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


@Component({
  selector: 'exui-available-tasks',
  templateUrl: 'available-tasks.component.html'
})
export class AvailableTasksComponent extends TaskListWrapperComponent {
  public get fields(): TaskFieldConfig[] {
    return AVAILABLE_TASKS_CONFIG;
  }
}

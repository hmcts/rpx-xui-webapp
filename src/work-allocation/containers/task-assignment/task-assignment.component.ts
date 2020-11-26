import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService, TaskSort } from '../../enums';
import TaskServiceConfig from '../../models/tasks/task-service-config.model';
import { TaskFieldType, TaskView } from './../../enums';
import { TaskFieldConfig } from './../../models/tasks';

@Component({
    selector: 'exui-task-assignment',
    templateUrl: 'task-assignment.component.html',
    styleUrls: ['task-home.component.scss']
  })

export class TaskAssignmentComponent implements OnInit {
   private tasks: any [];
    constructor(private route: ActivatedRoute) {}
    /**
     * Mock TaskFieldConfig[]
     *
     * Fields is the property of the TaskFieldConfig[], containing the configuration
     * for the fields as returned by the API.
     *
     * The sorting will handled by this component, via the
     * WP api as this component.
     */
    public fields: TaskFieldConfig[] = [
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
        },
    ];

    public taskServiceConfig: TaskServiceConfig = {
        service: TaskService.IAC,
        defaultSortDirection: TaskSort.ASC,
        defaultSortFieldName: 'dueDate',
        fields: this.fields,
      };
    public ngOnInit(): void {
      this.tasks = [
        {
          id: '12345678901123456',
          caseReference: '1234 5678 9012 3456',
          caseName: 'Kili Muso',
          caseCategory: 'Protection',
          location: 'Taylor House',
          taskName: 'Review respondent evidence',
          dueDate: new Date(1604938789000),
          actions: [
            {
              id: 'actionId',
              title: 'Reassign task',
            },
            {
              id: 'actionId',
              title: 'Release this task',
            }
          ]
        }];
    }
}

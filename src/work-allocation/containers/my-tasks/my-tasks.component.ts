import { Component } from '@angular/core';

import { ConfigConstants, FilterConstants, ListConstants, SortConstants } from '../../components/constants';
import { SearchTaskParameter, SearchTaskRequest } from '../../models/dtos';
import { TaskFieldConfig } from '../../models/tasks';
import { TaskListWrapperComponent } from '../task-list-wrapper/task-list-wrapper.component';

@Component({
  selector: 'exui-my-tasks',
  templateUrl: '../task-list-wrapper/task-list-wrapper.component.html'
})
export class MyTasksComponent extends TaskListWrapperComponent {

  public get emptyMessage(): string {
    return ListConstants.EmptyMessage.MyTasks;
  }

  public get sortSessionKey(): string {
    return SortConstants.Session.MyTasks;
  }

  public get view(): string {
    return ListConstants.View.MyTasks;
  }

  public get fields(): TaskFieldConfig[] {
    return ConfigConstants.MyTasks;
  }

  public getSearchTaskRequest(): SearchTaskRequest {
    return {
      search_parameters: [
        this.getSortParameter(),
        this.getCaseworkerParameter()
      ]
    };
  }

  private getCaseworkerParameter(): SearchTaskParameter {
    // TODO: Replace this defaulting after integrating with the API.
    const cw = FilterConstants.Defaults.CASEWORKER;
    const name = `${cw.firstName} ${cw.lastName}`;
    return { key: 'assignee', operator: 'IN', values: [ name ] };
  }
}

import { Component } from '@angular/core';

import { ConfigConstants, ListConstants, SortConstants } from '../../components/constants';
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

  public loadTasks(): void {
    super.loadTasks();
  }

  private getCaseworkerParameter(): SearchTaskParameter {
    // Always pretend to be John Smith for "My" tasks.
    return { key: 'assignee', operator: 'IN', values: [ 'John Smith' ] };
  }
}

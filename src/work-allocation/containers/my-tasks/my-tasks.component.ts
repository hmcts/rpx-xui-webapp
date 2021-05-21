import { Component } from '@angular/core';
import { UserInfo } from 'src/app/models/user-details.model';

import { ConfigConstants, ListConstants, SortConstants } from '../../components/constants';
import { SearchTaskRequest } from '../../models/dtos';
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
    const userInfoStr = this.sessionStorageService.getItem('userDetails');
    if (userInfoStr) {
      const userInfo: UserInfo = JSON.parse(userInfoStr);
      const id = userInfo.id ? userInfo.id : userInfo.uid;
      return {
        search_parameters: [
          {key: 'user', operator: 'IN', values: [id]},
        ],
        sorting_parameters: [this.getSortParameter()],
        // TODO - hard coded now, need to pass the actual page number and size here
        pagination_parameters: {page_number: 1, page_size: 10}
      };
    }
  }
}

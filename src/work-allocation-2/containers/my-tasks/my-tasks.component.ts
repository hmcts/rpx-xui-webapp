import { Component, OnInit } from '@angular/core';

import { AppUtils } from '../../../app/app-utils';
import { UserInfo, UserRole } from '../../../app/models';
import { ConfigConstants, ListConstants, PageConstants, SortConstants } from '../../components/constants';
import { FieldConfig } from '../../models/common';
import { SearchTaskParameter, SearchTaskRequest } from '../../models/dtos';
import { TaskListWrapperComponent } from '../task-list-wrapper/task-list-wrapper.component';

@Component({
  selector: 'exui-my-tasks',
  templateUrl: 'my-tasks.component.html'
})
export class MyTasksComponent extends TaskListWrapperComponent implements OnInit {
  public get emptyMessage(): string {
    return ListConstants.EmptyMessage.MyTasks;
  }

  public get sortSessionKey(): string {
    return SortConstants.Session.MyTasks;
  }

  public get pageSessionKey(): string {
    return PageConstants.Session.MyTasks;
  }

  public get view(): string {
    return ListConstants.View.MyTasks;
  }

  public get fields(): FieldConfig[] {
    return this.isCurrentUserJudicial() ? ConfigConstants.MyWorkTasksForJudicial : ConfigConstants.MyWorkTasksForLegalOps;
  }

  public filteredLocations: string[] = [];

  public getSearchTaskRequestPagination(): SearchTaskRequest {
    const userInfoStr = this.sessionStorageService.getItem(this.userDetailsKey);
    if (userInfoStr) {
      const userInfo: UserInfo = JSON.parse(userInfoStr);
      const id = userInfo.id ? userInfo.id : userInfo.uid;
      const userRole: UserRole = AppUtils.isLegalOpsOrJudicial(userInfo.roles);
      return {
        search_parameters: [
          { key: 'user', operator: 'IN', values: [ id ] },
          this.getLocationParameter()
        ],
        sorting_parameters: [this.getSortParameter()],
        search_by: userRole === UserRole.Judicial ? 'judge' : 'caseworker',
        pagination_parameters: this.getPaginationParameter()
      };
    }
  }

  private getLocationParameter(): SearchTaskParameter {
    return { key: 'location', operator: 'IN', values: this.selectedLocations };
  }

  /**
   * Handle the paging event
   */
   public onPaginationEvent(pageNumber: number): void {
    this.onPaginationHandler(pageNumber);
  }
}

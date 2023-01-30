import { Component, OnInit } from '@angular/core';
import { AppUtils } from '../../../app/app-utils';
import { UserInfo, UserRole } from '../../../app/models';
import { ConfigConstants, ListConstants, PageConstants, SortConstants } from '../../components/constants';
import { CONFIG_CONSTANTS_NOT_RELEASE4 } from '../../components/constants/config.constants';
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
    let fields = ConfigConstants.MyWorkTasksForLegalOps;
    this.checkReleaseVersionService.isRelease4().subscribe(isRelease4 => {
      fields = this.isCurrentUserJudicial() ?
      (isRelease4 ? ConfigConstants.MyWorkTasksForJudicial : CONFIG_CONSTANTS_NOT_RELEASE4.MyWorkTasksForJudicial) :
      (isRelease4 ? ConfigConstants.MyWorkTasksForLegalOps : CONFIG_CONSTANTS_NOT_RELEASE4.MyWorkTasksForLegalOps)
    });
    return fields;
    // return this.isCurrentUserJudicial() ? ConfigConstants.MyWorkTasksForJudicial : ConfigConstants.MyWorkTasksForLegalOps;
  }

  public getSearchTaskRequestPagination(): SearchTaskRequest {
    const userInfoStr = this.sessionStorageService.getItem(this.userDetailsKey);
    if (userInfoStr) {
      const userInfo: UserInfo = JSON.parse(userInfoStr);
      const id = userInfo.id ? userInfo.id : userInfo.uid;
      const userRole: UserRole = AppUtils.getUserRole(userInfo.roles);
      const searchParameters: SearchTaskParameter [] = [
        { key: 'user', operator: 'IN', values: [id] },
        { key: 'state', operator: 'IN', values: ['assigned'] },
        { key: 'jurisdiction', operator: 'IN', values: this.selectedServices }
      ];
      const locationParameter = this.getLocationParameter();
      const typesOfWorkParameter = this.getTypesOfWorkParameter();
      if (locationParameter) {
        searchParameters.push(locationParameter);
      }
      if (typesOfWorkParameter) {
        searchParameters.push(typesOfWorkParameter);
      }
      const searchTaskParameter: SearchTaskRequest = {
        search_parameters: searchParameters,
        sorting_parameters: [...this.getSortParameter()],
        search_by: userRole === UserRole.Judicial ? 'judge' : 'caseworker',
        pagination_parameters: this.getPaginationParameter()
      };
      return searchTaskParameter;
    }
  }

  /**
   * Handle the paging event
   */
  public onPaginationEvent(pageNumber: number): void {
    this.onPaginationHandler(pageNumber);
  }

  private getLocationParameter(): SearchTaskParameter {
    if (this.selectedLocations && this.selectedLocations.length > 0) {
      return { key: 'location', operator: 'IN', values: this.selectedLocations };
    } else {
      return null;
    }
  }

  private getTypesOfWorkParameter(): SearchTaskParameter {
    const typeOfWorkInfo = this.sessionStorageService.getItem('typesOfWork_cache');
    const totalWorkTypes = typeOfWorkInfo ? JSON.parse(typeOfWorkInfo) : undefined;
    if (this.selectedWorkTypes && this.selectedWorkTypes.length > 0 && (!totalWorkTypes || this.selectedWorkTypes.length < totalWorkTypes.length)) {
      return { key: 'work_type', operator: 'IN', values: this.selectedWorkTypes };
    } else {
      return null;
    }
  }
}

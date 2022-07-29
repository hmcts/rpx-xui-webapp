import { AppUtils } from '../../../app/app-utils';
import { Component } from '@angular/core';
import { UserInfo, UserRole } from '../../../app/models/user-details.model';
import { ConfigConstants, ListConstants, SortConstants } from '../../components/constants';
import { FieldConfig } from '../../models/common';
import { SearchCaseRequest } from '../../models/dtos';
import { WorkCaseListWrapperComponent } from '../work-case-list-wrapper/work-case-list-wrapper.component';

@Component({
  selector: 'exui-my-access',
  templateUrl: 'my-access.component.html'
})
export class MyAccessComponent extends WorkCaseListWrapperComponent {

  public get emptyMessage(): string {
    return ListConstants.EmptyMessage.MyAccess;
  }

  public get sortSessionKey(): string {
    return SortConstants.Session.MyAccess;
  }

  public get view(): string {
    return ListConstants.View.MyAccess;
  }

  public get fields(): FieldConfig[] {
    return ConfigConstants.MyAccess;
  }

  public backUrl: string = 'work/my-work/my-access';

  public getSearchCaseRequestPagination(): SearchCaseRequest {
    const userInfoStr = this.sessionStorageService.getItem('userDetails');
    if (userInfoStr) {
      const userInfo: UserInfo = JSON.parse(userInfoStr);
      const id = userInfo.id ? userInfo.id : userInfo.uid;
      const userRole: UserRole = AppUtils.isLegalOpsOrJudicial(userInfo.roles);
      return {
        search_parameters: [
          { key: 'user', operator: 'IN', values: [id] },
        ],
        sorting_parameters: [this.getSortParameter()],
        search_by: userRole
      };
    }
  }
}

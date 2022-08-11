import { Component } from '@angular/core';
import { UserInfo, UserRole } from '../../../app/models/user-details.model';
import { ConfigConstants, ListConstants, SortConstants } from '../../components/constants';
import { FieldConfig } from '../../models/common';
import { SearchCaseRequest } from '../../models/dtos';
import { WorkCaseListWrapperComponent } from '../work-case-list-wrapper/work-case-list-wrapper.component';
import { AppUtils } from '../../../app/app-utils';

@Component({
  selector: 'exui-my-cases',
  templateUrl: 'my-cases.component.html'
})
export class MyCasesComponent extends WorkCaseListWrapperComponent {

  public get emptyMessage(): string {
    return ListConstants.EmptyMessage.MyCases;
  }

  public get sortSessionKey(): string {
    return SortConstants.Session.MyCases;
  }

  public get view(): string {
    return ListConstants.View.MyCases;
  }

  public get fields(): FieldConfig[] {
    return ConfigConstants.MyCases;
  }

  public backUrl: string = 'work/my-work/my-cases';

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

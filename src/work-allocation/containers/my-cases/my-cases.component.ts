import { Component } from '@angular/core';
import { AppUtils } from '../../../app/app-utils';
import { UserInfo, UserRole } from '../../../app/models/user-details.model';
import { safeJsonParse } from '@hmcts/ccd-case-ui-toolkit';
import { ConfigConstants, ListConstants, SortConstants } from '../../components/constants';
import { FieldConfig } from '../../models/common';
import { SearchCaseRequest } from '../../models/dtos';
import { WorkCaseListWrapperComponent } from '../work-case-list-wrapper/work-case-list-wrapper.component';

@Component({
  standalone: false,
  selector: 'exui-my-cases',
  templateUrl: 'my-cases.component.html',
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
      const userInfo = safeJsonParse<UserInfo>(userInfoStr, null);
      if (!userInfo) {
        return;
      }
      const id = userInfo.id ? userInfo.id : userInfo.uid;
      const userRole: UserRole = AppUtils.getUserRole(userInfo.roles);

      // get 'locations' key from local storage
      const locationsFromLS = safeJsonParse<any>(localStorage.getItem('locations'), null);

      // set service and location filters using data from local storage
      let serviceFilters = [];
      let locationFilters = [];
      /* istanbul ignore else */
      if (locationsFromLS && locationsFromLS.fields) {
        const services = locationsFromLS.fields.find((field) => field.name === 'services');
        const locations = locationsFromLS.fields.find((field) => field.name === 'locations');
        if (services && services.hasOwnProperty('value')) {
          serviceFilters = services.value;
        }
        if (locations && locations.hasOwnProperty('value')) {
          locationFilters = locations.value.map((l) => l.epimms_id);
        }
      }

      return {
        search_parameters: [
          { key: 'user', operator: 'IN', values: [id] },
          { key: 'services', operator: 'IN', values: serviceFilters },
          { key: 'locations', operator: 'IN', values: locationFilters },
        ],
        sorting_parameters: [this.getSortParameter()],
        search_by: userRole,
      };
    }
  }
}

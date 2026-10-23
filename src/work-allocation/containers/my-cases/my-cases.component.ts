import { Component, OnDestroy, OnInit } from '@angular/core';
import { safeJsonParse } from '@hmcts/ccd-case-ui-toolkit';
import { RoleCategory } from '@hmcts/rpx-xui-common-lib';
import { select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { AppUtils } from '../../../app/app-utils';
import { UserInfo, UserRole } from '../../../app/models/user-details.model';
import * as fromActions from '../../../app/store';
import { MyWorkFilterComponent } from '../../components';
import { ConfigConstants, ListConstants, SortConstants } from '../../components/constants';
import { FieldConfig } from '../../models/common';
import { SearchCaseRequest } from '../../models/dtos';
import { getCurrentUserRoleCategories } from '../../utils/work-allocation-utils';
import { WorkCaseListWrapperComponent } from '../work-case-list-wrapper/work-case-list-wrapper.component';

@Component({
  standalone: false,
  selector: 'exui-my-cases',
  templateUrl: 'my-cases.component.html',
})
export class MyCasesComponent extends WorkCaseListWrapperComponent implements OnInit, OnDestroy {
  private allowedServices: string[];
  private roleAssignmentSubscription: Subscription;

  public ngOnInit(): void {
    this.roleAssignmentSubscription = this.store
      .pipe(
        select(fromActions.getUserDetails),
        filter((userDetails) => Array.isArray(userDetails?.roleAssignmentInfo)),
        take(1)
      )
      .subscribe((userDetails) => {
        const roleAssignmentInfo = userDetails.roleAssignmentInfo;
        const judicialCaseRole = roleAssignmentInfo.find(
          (role) => role.roleCategory === RoleCategory.JUDICIAL && role.roleType === 'CASE'
        );
        this.allowedServices = [
          ...AppUtils.getOrganisationJurisdictions(roleAssignmentInfo),
          ...(getCurrentUserRoleCategories(this.sessionStorageService).includes(RoleCategory.JUDICIAL) && judicialCaseRole
            ? AppUtils.getDistinctJurisdictionsForRoleAssignment(roleAssignmentInfo, judicialCaseRole)
            : []),
        ];
        super.ngOnInit();
      });
  }

  public ngOnDestroy(): void {
    this.roleAssignmentSubscription?.unsubscribe();
    super.ngOnDestroy();
  }

  protected doLoad(): void {
    const services = this.getSearchCaseRequestPagination()?.search_parameters.find(
      (parameter) => parameter.key === 'services'
    )?.values;
    if (!Array.isArray(services) || !services.length) {
      return;
    }
    super.doLoad();
  }

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
    if (this.allowedServices === undefined) {
      return;
    }

    const userInfoStr = this.sessionStorageService.getItem('userDetails');
    if (userInfoStr) {
      const userInfo = safeJsonParse<UserInfo>(userInfoStr, null);
      if (!userInfo) {
        return;
      }
      const id = userInfo.id ? userInfo.id : userInfo.uid;
      const userRoleNames: UserRole[] = AppUtils.getUserRoleNames(userInfo.roles);
      const userRole: UserRole = userRoleNames[0] || undefined;

      // get 'locations' key from the current browser session
      const locationsFromSessionStorage = safeJsonParse<any>(
        this.sessionStorageService.getItem(MyWorkFilterComponent.FILTER_NAME),
        null
      );

      // set service and location filters using data from session storage
      let serviceFilters = [];
      let locationFilters = [];
      /* istanbul ignore else */
      if (locationsFromSessionStorage?.fields) {
        const services = locationsFromSessionStorage.fields.find((field) => field.name === 'services');
        const locations = locationsFromSessionStorage.fields.find((field) => field.name === 'locations');
        if (Array.isArray(services?.value)) {
          serviceFilters = services.value.filter(
            (service) => service !== 'services_all' && this.allowedServices.includes(service)
          );
        }
        if (locations?.hasOwnProperty('value')) {
          locationFilters = locations.value.map((l) => l.epimms_id);
        }
      }

      if (!serviceFilters.length) {
        return;
      }

      return {
        search_parameters: [
          { key: 'user', operator: 'IN', values: [id] },
          { key: 'services', operator: 'IN', values: serviceFilters },
          { key: 'locations', operator: 'IN', values: locationFilters },
        ],
        sorting_parameters: [this.getSortParameter()],
        // Note: Is search_by being used? Looks like we could remove this
        search_by: userRole,
      };
    }
  }
}

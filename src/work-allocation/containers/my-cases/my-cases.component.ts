import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, Jurisdiction, LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { AppUtils } from '../../../app/app-utils';
import { UserInfo, UserRole } from '../../../app/models/user-details.model';
import { SessionStorageService } from '../../../app/services';
import { InfoMessageCommService } from '../../../app/shared/services/info-message-comms.service';
import { AllocateRoleService } from '../../../role-access/services';
import { ConfigConstants, ListConstants, SortConstants } from '../../components/constants';
import { FieldConfig } from '../../models/common';
import { SearchCaseRequest } from '../../models/dtos';
import {
  CaseworkerDataService,
  LocationDataService,
  WASupportedJurisdictionsService,
  WorkAllocationCaseService
} from '../../services';
import { JurisdictionsService } from '../../services/juridictions.service';
import { WorkCaseListWrapperComponent } from '../work-case-list-wrapper/work-case-list-wrapper.component';
@Component({
  selector: 'exui-my-cases',
  templateUrl: 'my-cases.component.html'
})
export class MyCasesComponent  extends WorkCaseListWrapperComponent implements OnInit {

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

  constructor(
    protected readonly ref: ChangeDetectorRef,
    protected readonly caseService: WorkAllocationCaseService,
    protected readonly router: Router,
    protected readonly infoMessageCommService: InfoMessageCommService,
    protected readonly sessionStorageService: SessionStorageService,
    protected readonly alertService: AlertService,
    protected readonly caseworkerService: CaseworkerDataService,
    protected readonly loadingService: LoadingService,
    protected readonly locationService: LocationDataService,
    protected readonly featureToggleService: FeatureToggleService,
    protected readonly waSupportedJurisdictionsService: WASupportedJurisdictionsService,
    protected readonly jurisdictionsService: JurisdictionsService,
    protected readonly rolesService: AllocateRoleService
  ) {
    super(ref, caseService, router, infoMessageCommService, sessionStorageService,
      alertService, caseworkerService, loadingService, locationService, featureToggleService, waSupportedJurisdictionsService,
      jurisdictionsService, rolesService);
  }

  public getSearchCaseRequestPagination(): SearchCaseRequest {
    const userInfoStr = this.sessionStorageService.getItem('userDetails');
    if (userInfoStr) {
      const userInfo: UserInfo = JSON.parse(userInfoStr);
      const id = userInfo.id ? userInfo.id : userInfo.uid;
      const userRole: UserRole = AppUtils.isLegalOpsOrJudicial(userInfo.roles);

      // get 'locations' key from local storage
      const locationsFromLS = JSON.parse(localStorage.getItem('locations'));

      // set service and location filters using data from local storage
      let serviceFilters = [];
      let locationFilters = [];
      if (locationsFromLS && locationsFromLS['fields']) {
        const services = locationsFromLS.fields.find(field => field.name === 'services');
        const locations = locationsFromLS.fields.find(field => field.name === 'locations');
        if (services && services.hasOwnProperty('value')) {
          serviceFilters = services.value;
        }
        if (locations && locations.hasOwnProperty('value')) {
          locationFilters = locations.value.map(l => l.epimms_id);
        }
      }

      return {
        search_parameters: [
          { key: 'user', operator: 'IN', values: [id] },
          { key: 'services', operator: 'IN', values: serviceFilters },
          { key: 'locations', operator: 'IN', values: locationFilters }
        ],
        sorting_parameters: [this.getSortParameter()],
        search_by: userRole
      };
    }
  }
}

import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { of } from 'rxjs';
import { JurisdictionsService } from 'src/work-allocation-2/services/juridictions.service';
import { SessionStorageService } from '../../../app/services';
import { InfoMessageCommService } from '../../../app/shared/services/info-message-comms.service';
import { AllocateRoleService } from '../../../role-access/services';
import {
  CaseworkerDataService,
  LocationDataService,
  WASupportedJurisdictionsService,
  WorkAllocationCaseService,
} from '../../services';
import { AllWorkCaseComponent } from './all-work-case.component';

import { UserRole } from 'src/app/models';
import { AppUtils } from '../../../app/app-utils';
import { ConfigConstants, ListConstants, PageConstants, SortConstants } from '../../components/constants';

describe('AllWorkCaseComponent', () => {
  let component: AllWorkCaseComponent;

  const mockLocationService = jasmine.createSpyObj('LocationDataService', ['getLocations']);
  const mockWASupportedJurisdictionService = jasmine.createSpyObj('WASupportedJurisdictionsService', ['getWASupportedJurisdictions']);
  const mockSessionStorageService = jasmine.createSpyObj('SessionStorageService', ['getItem', 'setItem']);
  const mockLoadingService = jasmine.createSpyObj('LoadingService', ['register', 'unregister']);
  const mockCaseService = jasmine.createSpyObj('CaseworkerDataService', ['searchCase', 'getCases']);
  const mockChangeDetectorRef = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);

  it('should create', () => {
    component = new AllWorkCaseComponent({} as ChangeDetectorRef,
      {} as WorkAllocationCaseService,
      {} as Router,
      {} as InfoMessageCommService,
      {} as SessionStorageService,
      {} as AlertService,
      {} as CaseworkerDataService,
      {} as LoadingService,
      {} as LocationDataService,
      {} as FeatureToggleService,
      {} as WASupportedJurisdictionsService,
      {} as JurisdictionsService,
      {} as AllocateRoleService);

    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it(`should call 'setupCaseWorkers' and update 'locations' and 'waSupportedJurisdictions'`, () => {
      component = new AllWorkCaseComponent({} as ChangeDetectorRef,
        {} as WorkAllocationCaseService,
        {} as Router,
        {} as InfoMessageCommService,
        {} as SessionStorageService,
        {} as AlertService,
        {} as CaseworkerDataService,
        {} as LoadingService,
        mockLocationService as LocationDataService,
        {} as FeatureToggleService,
        mockWASupportedJurisdictionService as WASupportedJurisdictionsService,
        {} as JurisdictionsService,
        {} as AllocateRoleService);

      spyOn(component, 'setupCaseWorkers');

      component.ngOnInit();

      expect(component.setupCaseWorkers).toHaveBeenCalled();
      expect(mockLocationService.getLocations).toHaveBeenCalled();
      expect(mockWASupportedJurisdictionService.getWASupportedJurisdictions).toHaveBeenCalled();
    });
  });

  describe('getSearchCaseRequestPagination', () => {
    it(`should return a SearchCaseRequest`, async () => {
      component = new AllWorkCaseComponent({} as ChangeDetectorRef,
        {} as WorkAllocationCaseService,
        {} as Router,
        {} as InfoMessageCommService,
        mockSessionStorageService as SessionStorageService,
        {} as AlertService,
        {} as CaseworkerDataService,
        {} as LoadingService,
        {} as LocationDataService,
        {} as FeatureToggleService,
        {} as WASupportedJurisdictionsService,
        {} as JurisdictionsService,
        {} as AllocateRoleService);

      const userInfo = { roles: [ UserRole.Admin] };
      mockSessionStorageService.getItem.and.returnValue(JSON.stringify(userInfo));
      spyOn(AppUtils, 'isLegalOpsOrJudicial').and.returnValue(UserRole.Admin);

      const actual = component.getSearchCaseRequestPagination();

      expect(actual).toEqual(jasmine.objectContaining({
        search_parameters: [
          { key: 'jurisdiction', operator: 'EQUAL', values: component.selectedServices[0] },
          { key: 'location_id', operator: 'EQUAL', values: '231596' },
          { key: 'actorId', operator: 'EQUAL', values: '' },
          { key: 'role', operator: 'EQUAL', values: 'All' },
        ],
        sorting_parameters: [{
          sort_by: component.sortedBy.fieldName,
          sort_order: component.sortedBy.order
        }],
        search_by: UserRole.Admin,
        pagination_parameters: { ...component.pagination }
      }));

    });

    it(`should NOT return a SearchCaseRequest`, () => {
      component = new AllWorkCaseComponent({} as ChangeDetectorRef,
        {} as WorkAllocationCaseService,
        {} as Router,
        {} as InfoMessageCommService,
        mockSessionStorageService as SessionStorageService,
        {} as AlertService,
        {} as CaseworkerDataService,
        {} as LoadingService,
        {} as LocationDataService,
        {} as FeatureToggleService,
        {} as WASupportedJurisdictionsService,
        {} as JurisdictionsService,
        {} as AllocateRoleService);

      mockSessionStorageService.getItem.and.returnValue(undefined);

      const actual = component.getSearchCaseRequestPagination();

      expect(actual).toEqual(undefined);

    });
  });

  describe('onSelectionChanged', () => {
    it(`should update 'pagination' and 'selectedServices' when parameter's location is null and actorId is 'All'`, () => {
      component = new AllWorkCaseComponent(mockChangeDetectorRef as ChangeDetectorRef,
        {} as WorkAllocationCaseService,
        {} as Router,
        {} as InfoMessageCommService,
        mockSessionStorageService as SessionStorageService,
        {} as AlertService,
        mockCaseService as CaseworkerDataService,
        mockLoadingService as LoadingService,
        {} as LocationDataService,
        {} as FeatureToggleService,
        {} as WASupportedJurisdictionsService,
        {} as JurisdictionsService,
        {} as AllocateRoleService);

      spyOn(component, 'performSearchPagination').and.returnValue(of({ cases: [ { role_category: '' } ] }));

      component.onSelectionChanged({ location: null, jurisdiction: 'jurisdiction', actorId: 'All', role: 'role', person: { id: 'personId'} });

      expect(component.selectedServices).toEqual(['jurisdiction']);
      expect(component.pagination.page_number).toEqual(1);
      expect(component.performSearchPagination).toHaveBeenCalledTimes(1);
    });

    // Test added to satisfy onSelectionChanged's ternary operators
    it(`should update 'pagination' and 'selectedServices' when parameter's location is NOT null and actorId is NOT 'All'`, () => {
      component = new AllWorkCaseComponent(mockChangeDetectorRef as ChangeDetectorRef,
        {} as WorkAllocationCaseService,
        {} as Router,
        {} as InfoMessageCommService,
        mockSessionStorageService as SessionStorageService,
        {} as AlertService,
        mockCaseService as CaseworkerDataService,
        mockLoadingService as LoadingService,
        {} as LocationDataService,
        {} as FeatureToggleService,
        {} as WASupportedJurisdictionsService,
        {} as JurisdictionsService,
        {} as AllocateRoleService);

      spyOn(component, 'performSearchPagination').and.returnValue(of({ cases: [ { role_category: '' } ] }));

      component.onSelectionChanged({ location: 'location', jurisdiction: 'jurisdiction', actorId: 'Item', role: 'role', person: { id: 'personId'} });

      expect(component.selectedServices).toEqual(['jurisdiction']);
      expect(component.pagination.page_number).toEqual(1);
      expect(component.performSearchPagination).toHaveBeenCalledTimes(1);
    });
  });

  describe('onPaginationEvent', () => {
    it(`should call 'onPaginationHandler'`, () => {
      component = new AllWorkCaseComponent({} as ChangeDetectorRef,
        {} as WorkAllocationCaseService,
        {} as Router,
        {} as InfoMessageCommService,
        {} as SessionStorageService,
        {} as AlertService,
        {} as CaseworkerDataService,
        {} as LoadingService,
        {} as LocationDataService,
        {} as FeatureToggleService,
        {} as WASupportedJurisdictionsService,
        {} as JurisdictionsService,
        {} as AllocateRoleService);

      spyOn(component, 'onPaginationHandler');

      component.onPaginationEvent(2);

      expect(component.onPaginationHandler).toHaveBeenCalledWith(2);
    });
  });

  describe('getters', () => {
    const getters = [
      {
        method: 'emptyMessage',
        result: ListConstants.EmptyMessage.AllWorkCases
      },
      {
        method: 'sortSessionKey',
        result: SortConstants.Session.AllWorkCases
      },
      {
        method: 'pageSessionKey',
        result: PageConstants.Session.AllWorkCases
      },
      {
        method: 'view',
        result: ListConstants.View.AllWorkCases
      },
      {
        method: 'fields',
        result: ConfigConstants.AllWorkCases
      },
    ];
    getters.forEach(({ method, result }) => {
      it(`should return '${result}'`, () => {
        component = new AllWorkCaseComponent({} as ChangeDetectorRef,
          {} as WorkAllocationCaseService,
          {} as Router,
          {} as InfoMessageCommService,
          {} as SessionStorageService,
          {} as AlertService,
          {} as CaseworkerDataService,
          {} as LoadingService,
          {} as LocationDataService,
          {} as FeatureToggleService,
          {} as WASupportedJurisdictionsService,
          {} as JurisdictionsService,
          {} as AllocateRoleService);

        expect(component[method]).toEqual(result);
      });
    });

  });

});

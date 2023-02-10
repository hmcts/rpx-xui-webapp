import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService, FilterService } from '@hmcts/rpx-xui-common-lib';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { JurisdictionsService } from 'src/work-allocation/services/juridictions.service';
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

import * as fromActions from '../../../app/store';

describe('AllWorkCaseComponent', () => {
  let component: AllWorkCaseComponent;

  const mockLocationService = jasmine.createSpyObj('LocationDataService', ['getLocations']);
  const mockWASupportedJurisdictionService = jasmine.createSpyObj('WASupportedJurisdictionsService', ['getWASupportedJurisdictions']);
  const mockSessionStorageService = jasmine.createSpyObj('SessionStorageService', ['getItem', 'setItem']);
  const mockLoadingService = jasmine.createSpyObj('LoadingService', ['register', 'unregister']);
  const mockCaseService = jasmine.createSpyObj('CaseworkerDataService', ['searchCase', 'getCases']);
  const mockChangeDetectorRef = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);
  const mockJurisdictionsService = jasmine.createSpyObj('JurisdictionsService', ['getJurisdictions']);
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

  const initializeComponent = ({
    changeDetectorRef = {},
    workAllocationTaskService = {},
    router = {},
    infoMessageCommService = {},
    sessionStorageService = {},
    alertService = {},
    caseworkerDataService = {},
    loadingService = {},
    featureToggleService = {},
    locationDataService = {},
    waSupportedJurisdictionsService = {},
    filterService = {},
    jurisdictionsService = {},
    allocateRoleService = {},
    httpClient = {},
    store = {}
  }) => new AllWorkCaseComponent(
    changeDetectorRef as ChangeDetectorRef,
    workAllocationTaskService as WorkAllocationCaseService,
    filterService as FilterService,
    router as Router,
    infoMessageCommService as InfoMessageCommService,
    sessionStorageService as SessionStorageService,
    alertService as AlertService,
    caseworkerDataService as CaseworkerDataService,
    loadingService as LoadingService,
    locationDataService as LocationDataService,
    featureToggleService as FeatureToggleService,
    waSupportedJurisdictionsService as WASupportedJurisdictionsService,
    jurisdictionsService as JurisdictionsService,
    allocateRoleService as AllocateRoleService,
    httpClient as HttpClient,
    store as Store<fromActions.State>
  );
  it('should create', () => {
    component = initializeComponent({});

    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it(`should call 'setupCaseWorkers' and update 'locations' and 'waSupportedJurisdictions'`, () => {
      component = initializeComponent({ locationDataService: mockLocationService, waSupportedJurisdictionsService: mockWASupportedJurisdictionService});

      spyOn(component, 'setupCaseWorkers');
      spyOn(component, 'loadSupportedJurisdictions');

      component.ngOnInit();

      expect(component.setupCaseWorkers).toHaveBeenCalled();
      expect(component.loadSupportedJurisdictions).toHaveBeenCalled();
      expect(mockLocationService.getLocations).toHaveBeenCalled();
    });
  });

  describe('getSearchCaseRequestPagination', () => {
    it(`should return a SearchCaseRequest`, async () => {
      component = initializeComponent({ sessionStorageService: mockSessionStorageService });

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
      component = initializeComponent({ sessionStorageService: mockSessionStorageService });

      mockSessionStorageService.getItem.and.returnValue(undefined);

      const actual = component.getSearchCaseRequestPagination();

      expect(actual).toEqual(undefined);

    });
  });

  describe('onSelectionChanged', () => {
    it(`should update 'pagination' and 'selectedServices' when parameter's location is null and actorId is 'All'`, () => {
      component = initializeComponent({ changeDetectorRef: mockChangeDetectorRef, caseworkerDataService: mockCaseService, loadingService: mockLoadingService, sessionStorageService: mockSessionStorageService, jurisdictionsService: mockJurisdictionsService, router: mockRouter });


      spyOn(component, 'performSearchPagination').and.returnValue(of({ cases: [ { role_category: '' } ] }));

      component.onSelectionChanged({ location: null, jurisdiction: 'jurisdiction', actorId: 'All', role: 'role', person: { id: 'personId'} });

      expect(component.selectedServices).toEqual(['jurisdiction']);
      expect(component.pagination.page_number).toEqual(1);
      expect(component.performSearchPagination).toHaveBeenCalledTimes(1);
    });

    // Test added to satisfy onSelectionChanged's ternary operators
    it(`should update 'pagination' and 'selectedServices' when parameter's location is NOT null and actorId is NOT 'All'`, () => {
      component = initializeComponent({ changeDetectorRef: mockChangeDetectorRef, caseworkerDataService: mockCaseService, loadingService: mockLoadingService, sessionStorageService: mockSessionStorageService, jurisdictionsService: mockJurisdictionsService, router: mockRouter });

      spyOn(component, 'performSearchPagination').and.returnValue(of({ cases: [ { role_category: '' } ] }));

      component.onSelectionChanged({ location: 'location', jurisdiction: 'jurisdiction', actorId: 'Item', role: 'role', person: { id: 'personId'} });

      expect(component.selectedServices).toEqual(['jurisdiction']);
      expect(component.pagination.page_number).toEqual(1);
      expect(component.performSearchPagination).toHaveBeenCalledTimes(1);
    });
  });

  describe('onPaginationEvent', () => {
    it(`should call 'onPaginationHandler'`, () => {
      component = initializeComponent({});

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
        component = initializeComponent({});

        expect(component[method]).toEqual(result);
      });
    });

  });

});

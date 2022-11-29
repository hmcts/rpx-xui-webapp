import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService, FilterService } from '@hmcts/rpx-xui-common-lib';
import { of } from 'rxjs';
import { AllocateRoleService } from 'src/role-access/services';
import { AppUtils } from '../../../app/app-utils';

import { SessionStorageService } from '../../../app/services';
import {
  CaseworkerDataService,
  LocationDataService,
  WASupportedJurisdictionsService,
  WorkAllocationTaskService
} from '../../services';
import { AllWorkTaskComponent } from './all-work-task.component';
import { InfoMessageCommService } from '../../../app/shared/services/info-message-comms.service';
import {
  ConfigConstants,
  FilterConstants,
  ListConstants,
  PageConstants,
  SortConstants
} from '../../components/constants';
import { Person } from '@hmcts/rpx-xui-common-lib';
import { UserRole } from 'src/app/models';
import { Location } from '../../interfaces/common';

describe('AllWorkTaskComponent', () => {
  let component: AllWorkTaskComponent;

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
    allocateRoleService = {}
  }) => new AllWorkTaskComponent(
    changeDetectorRef as ChangeDetectorRef,
    workAllocationTaskService as WorkAllocationTaskService,
    router as Router,
    infoMessageCommService as InfoMessageCommService,
    sessionStorageService as SessionStorageService,
    alertService as AlertService,
    caseworkerDataService as CaseworkerDataService,
    loadingService as LoadingService,
    featureToggleService as FeatureToggleService,
    locationDataService as LocationDataService,
    waSupportedJurisdictionsService as WASupportedJurisdictionsService,
    filterService as FilterService,
    allocateRoleService as AllocateRoleService);

  const mockSessionStorageService = jasmine.createSpyObj('SessionStorageService', ['getItem', 'setItem']);
  const mockWASupportedJurisdictionsService = jasmine.createSpyObj('WASupportedJurisdictionsService', ['getWASupportedJurisdictions']);
  const mockChangeDetectorRef = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);
  const mockLoadingService = jasmine.createSpyObj('LoadingService', ['register', 'unregister']);
  const mockCaseService = jasmine.createSpyObj('CaseworkerDataService', ['searchCase', 'getCases']);

  it('should create', () => {
    component = initializeComponent({})

    expect(component).toBeTruthy();
  });

  describe('getters', () => {
    const getters = [
      {
        method: 'emptyMessage',
        result: ListConstants.EmptyMessage.AllWork
      },
      {
        method: 'sortSessionKey',
        result: SortConstants.Session.AllWork
      },
      {
        method: 'pageSessionKey',
        result: PageConstants.Session.AllWork
      },
      {
        method: 'view',
        result: ListConstants.View.AllWork
      },
    ]
    getters.forEach(({ method, result }) => {
      it(`should return '${result}'`, () => {
        component = initializeComponent({})

        expect(component[method]).toEqual(result);
      });
    });
  });

  describe('fields', () => {
    it(`should equal ${ConfigConstants.AllWorkTasksForJudicial}`, () => {
      component = initializeComponent({});
      spyOn(component, 'isCurrentUserJudicial').and.returnValue(true);
      const actual = component.fields

      expect(actual).toEqual(ConfigConstants.AllWorkTasksForJudicial);
    });

    it(`should equal ${ConfigConstants.AllWorkTasksForLegalOps}`, () => {
      component = initializeComponent({});
      spyOn(component, 'isCurrentUserJudicial').and.returnValue(false);
      const actual = component.fields

      expect(actual).toEqual(ConfigConstants.AllWorkTasksForLegalOps);
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

  describe('loadCaseWorkersAndLocations', () => {
    it(`should update 'waSupportedJurisdictions$'`, (done) => {
      component = initializeComponent({ waSupportedJurisdictionsService: mockWASupportedJurisdictionsService });
      const result = ['string'];
      mockWASupportedJurisdictionsService.getWASupportedJurisdictions.and.returnValue(of(result));

      component.loadCaseWorkersAndLocations();

      expect(component.waSupportedJurisdictions$).toBeDefined();
      component.waSupportedJurisdictions$.subscribe((actual) => {
        expect(actual).toEqual(result);

        done();
      })
    });
  });

  describe('onSelectionChanged', () => {
    it(`should update 'pagination' and 'selectedServices' when parameter's person is declared`, () => {
      component = initializeComponent({ changeDetectorRef: mockChangeDetectorRef, caseworkerDataService: mockCaseService, loadingService: mockLoadingService });

      spyOn(component, 'onPaginationHandler');

      component.onSelectionChanged({
        location: null,
        service: 'service',
        selectPerson: 'selectPerson',
        person: { id: 'personId' } as unknown as Person,
        taskType: 'taskType'
      });

      expect(component.selectedServices).toEqual(['service']);
      expect(component.onPaginationHandler).toHaveBeenCalledWith(1);
    });

    // Test added to satisfy onSelectionChanged's ternary operators
    it(`should update 'pagination' and 'selectedServices' when parameter's person is NOT declared`, () => {
      component = initializeComponent({ changeDetectorRef: mockChangeDetectorRef, caseworkerDataService: mockCaseService, loadingService: mockLoadingService });

      spyOn(component, 'onPaginationHandler');

      component.onSelectionChanged({
        location: null,
        service: 'service',
        selectPerson: 'selectPerson',
        person: undefined,
        taskType: 'taskType'
      });

      expect(component.selectedServices).toEqual(['service']);
      expect(component.onPaginationHandler).toHaveBeenCalledWith(1);
    });
  });

  describe('getSearchTaskRequestPagination', () => {
    it(`should return a SearchTaskRequest with 'search_by' equal to 'caseworker'`, () => {
      component = initializeComponent({ sessionStorageService: mockSessionStorageService });

      const userInfo = { roles: [UserRole.Admin] };
      mockSessionStorageService.getItem.and.returnValue(JSON.stringify(userInfo));
      spyOn(AppUtils, 'isLegalOpsOrJudicial').and.returnValue(UserRole.Admin);

      const actual = component.getSearchTaskRequestPagination();

      expect(actual).toEqual(jasmine.objectContaining({
        search_parameters: [
          { key: 'jurisdiction', operator: 'IN', values: [] },
          { key: 'state', operator: 'IN', values: ['assigned', 'unassigned'] },
          { key: 'location', operator: 'IN', values: ['**ALL LOCATIONS**'] },
        ],
        sorting_parameters: [{
          sort_by: component.sortedBy.fieldName,
          sort_order: component.sortedBy.order
        }],
        search_by: 'caseworker',
        pagination_parameters: { ...component.pagination }
      }));
    });

    it(`should return a SearchTaskRequest with 'search_by' equal to 'judge'`, () => {
      component = initializeComponent({ sessionStorageService: mockSessionStorageService });

      const userInfo = { roles: [UserRole.Judicial] };
      mockSessionStorageService.getItem.and.returnValue(JSON.stringify(userInfo));
      spyOn(AppUtils, 'isLegalOpsOrJudicial').and.returnValue(UserRole.Judicial);

      const actual = component.getSearchTaskRequestPagination();

      expect(actual.search_by).toEqual('judge');
    });

    it(`
        should return a 'SearchTaskRequest' with an added personParameter, taskTypeParameter
        and search_parameters with a location object
      `, () => {
      component = initializeComponent({
        sessionStorageService: mockSessionStorageService,
        changeDetectorRef: mockChangeDetectorRef,
        caseworkerDataService: mockCaseService,
        loadingService: mockLoadingService
      });

      const userInfo = { roles: [UserRole.Admin] };

      mockSessionStorageService.getItem.and.returnValue(JSON.stringify(userInfo));
      spyOn(AppUtils, 'isLegalOpsOrJudicial').and.returnValue(UserRole.Admin);
      spyOn(component, 'onPaginationHandler');


      // updated locations to add values to getLocationParameter
      component.locations = [{ id: 'id1' }, { id: 'id2' }] as unknown as Location[]

      // method allows us to update selectedPerson
      component.onSelectionChanged({
        location: FilterConstants.Options.Locations.ALL.id,
        service: 'service',
        selectPerson: 'selectPerson',
        person: { id: 'personId' } as unknown as Person,
        taskType: 'taskType'
      });

      const actual = component.getSearchTaskRequestPagination();

      expect(actual).toEqual(jasmine.objectContaining({
        search_parameters: [
          { key: 'jurisdiction', operator: 'IN', values: ['service'] },
          { key: 'state', operator: 'IN', values: ['assigned'] },
          { key: 'user', operator: 'IN', values: ['personId'] },
          { key: 'location', operator: 'IN', values: ['id1', 'id2'] },
          { key: 'role_category', operator: 'IN', values: ['taskType'] },
        ],
        sorting_parameters: [{
          sort_by: component.sortedBy.fieldName,
          sort_order: component.sortedBy.order
        }],
        search_by: 'caseworker',
        pagination_parameters: { ...component.pagination }
      }));
    });

    it(`should return a 'SearchTaskRequest' with search_parameters' state equalling unassigned`, () => {
      component = initializeComponent({
        sessionStorageService: mockSessionStorageService,
        changeDetectorRef: mockChangeDetectorRef,
        caseworkerDataService: mockCaseService,
        loadingService: mockLoadingService
      });

      const userInfo = { roles: [UserRole.Admin] };

      mockSessionStorageService.getItem.and.returnValue(JSON.stringify(userInfo));
      spyOn(AppUtils, 'isLegalOpsOrJudicial').and.returnValue(UserRole.Admin);
      spyOn(component, 'onPaginationHandler');

      // method allows us to update selectedTaskCategory to 'None / Available tasks'
      component.onSelectionChanged({
        location: null,
        service: 'service',
        selectPerson: 'None / Available tasks',
        person: { id: 'personId' } as unknown as Person,
        taskType: 'taskType'
      });

      const actual = component.getSearchTaskRequestPagination();

      expect(actual).toEqual(jasmine.objectContaining({
        search_parameters: [
          { key: 'jurisdiction', operator: 'IN', values: ['service'] },
          { key: 'state', operator: 'IN', values: ['unassigned'] },
          { key: 'user', operator: 'IN', values: ['personId'] },
          { key: 'role_category', operator: 'IN', values: ['taskType'] },
        ],
        sorting_parameters: [{
          sort_by: component.sortedBy.fieldName,
          sort_order: component.sortedBy.order
        }],
        search_by: 'caseworker',
        pagination_parameters: { ...component.pagination }
      }));
    });

    it(`should NOT return a SearchTaskRequest`, () => {
      component = initializeComponent({ sessionStorageService: mockSessionStorageService });

      mockSessionStorageService.getItem.and.returnValue(undefined);

      const actual = component.getSearchTaskRequestPagination();

      expect(actual).toEqual(undefined)

    });
  });

});

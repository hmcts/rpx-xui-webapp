import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AlertService, LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService, FilterService } from '@hmcts/rpx-xui-common-lib';
import { Store } from '@ngrx/store';
import { BehaviorSubject, of, Subject, throwError } from 'rxjs';
import { AppUtils } from '../../../app/app-utils';
import { UserRole } from '../../../app/models';
import { SessionStorageService } from '../../../app/services';
import { InfoMessageCommService } from '../../../app/shared/services/info-message-comms.service';
import * as fromActions from '../../../app/store';
import { AllocateRoleService } from '../../../role-access/services';
import { ConfigConstants, ListConstants, SortConstants } from '../../../work-allocation/components/constants';
import { SortOrder } from '../../../work-allocation/enums';
import { LocationDataService, WASupportedJurisdictionsService, WorkAllocationCaseService } from '../../services';
import { JurisdictionsService } from '../../services/juridictions.service';
import { MyCasesComponent } from './my-cases.component';

describe('MyCasesComponent', () => {
  let component: MyCasesComponent;

  beforeEach(() => {
    fromActions.getUserDetails.release();
    fromActions.getUserDetails.clearResult();
  });

  const mockSessionStorageService = jasmine.createSpyObj('SessionStorageService', ['getItem', 'setItem']);
  const mockCheckReleaseVersionService = {
    isRelease4: () => {
      return {
        subscribe: () => true,
      };
    },
  };

  const initializeComponent = ({
    changeDetectorRef = {},
    workAllocationTaskService = {},
    router = {},
    infoMessageCommService = {},
    sessionStorageService = {},
    alertService = {},
    loadingService = {},
    featureToggleService = {},
    locationDataService = {},
    waSupportedJurisdictionsService = {},
    filterService = {},
    jurisdictionsService = {},
    allocateRoleService = {},
    httpClient = {},
    store = {},
    location = {},

    checkReleaseVersionService = {},
  }) =>
    new MyCasesComponent(
      changeDetectorRef as ChangeDetectorRef,
      workAllocationTaskService as WorkAllocationCaseService,
      filterService as FilterService,
      router as Router,
      infoMessageCommService as InfoMessageCommService,
      sessionStorageService as SessionStorageService,
      alertService as AlertService,
      loadingService as LoadingService,
      locationDataService as LocationDataService,
      featureToggleService as FeatureToggleService,
      waSupportedJurisdictionsService as WASupportedJurisdictionsService,
      jurisdictionsService as JurisdictionsService,
      allocateRoleService as AllocateRoleService,
      httpClient as HttpClient,
      store as Store<fromActions.State>,
      location as Location
    );

  it('should create', () => {
    component = initializeComponent({ checkReleaseVersionService: mockCheckReleaseVersionService });

    expect(component).toBeTruthy();
  });

  describe('getSearchCaseRequestPagination', () => {
    it('should return a SearchCaseRequest', () => {
      component = initializeComponent({
        sessionStorageService: mockSessionStorageService,
        checkReleaseVersionService: mockCheckReleaseVersionService,
      });
      component.sortedBy = {
        fieldName: 'fieldName',
        order: SortOrder.ASC,
      };
      component['allowedServices'] = ['serviceValue'];

      const userInfo = { roles: [UserRole.Admin], id: 'One' };
      const locations = { fields: [{ name: 'services', value: ['serviceValue'] }] };

      mockSessionStorageService.getItem.withArgs('userDetails').and.returnValue(JSON.stringify(userInfo));
      mockSessionStorageService.getItem.withArgs('my-work-filter').and.returnValue(JSON.stringify(locations));
      spyOn(AppUtils, 'getUserRoleNames').and.returnValue([UserRole.Admin]);

      const actual = component.getSearchCaseRequestPagination();

      expect(actual).toEqual(
        jasmine.objectContaining({
          search_parameters: [
            { key: 'user', operator: 'IN', values: [`${userInfo.id}`] },
            { key: 'services', operator: 'IN', values: ['serviceValue'] },
            { key: 'locations', operator: 'IN', values: [] },
          ],
          sorting_parameters: [
            {
              sort_by: component.sortedBy.fieldName,
              sort_order: component.sortedBy.order,
            },
          ],
          search_by: UserRole.Admin,
        })
      );

      mockSessionStorageService.getItem.calls.reset();
    });

    it("should return a SearchCaseRequest with user 'uid'", () => {
      component = initializeComponent({
        sessionStorageService: mockSessionStorageService,
        checkReleaseVersionService: mockCheckReleaseVersionService,
      });

      component.sortedBy = {
        fieldName: 'fieldName',
        order: SortOrder.ASC,
      };
      component['allowedServices'] = ['IA'];

      const userInfo = { roles: [UserRole.Admin], uid: 'UID' };
      const locations = {
        fields: [
          { name: 'services', value: ['IA'] },
          { name: 'locations', value: [{ epimms_id: 'locationID' }] },
        ],
      };
      mockSessionStorageService.getItem.withArgs('userDetails').and.returnValue(JSON.stringify(userInfo));
      mockSessionStorageService.getItem.withArgs('my-work-filter').and.returnValue(JSON.stringify(locations));
      spyOn(AppUtils, 'getUserRoleNames').and.returnValue([UserRole.Admin]);

      const actual = component.getSearchCaseRequestPagination();

      expect(actual).toEqual(
        jasmine.objectContaining({
          search_parameters: [
            { key: 'user', operator: 'IN', values: [`${userInfo.uid}`] },
            { key: 'services', operator: 'IN', values: ['IA'] },
            { key: 'locations', operator: 'IN', values: ['locationID'] },
          ],
          sorting_parameters: [
            {
              sort_by: component.sortedBy.fieldName,
              sort_order: component.sortedBy.order,
            },
          ],
          search_by: UserRole.Admin,
        })
      );
    });

    it('should NOT return a SearchCaseRequest', () => {
      component = initializeComponent({
        sessionStorageService: mockSessionStorageService,
        checkReleaseVersionService: mockCheckReleaseVersionService,
      });

      mockSessionStorageService.getItem.withArgs('userDetails').and.returnValue(undefined);

      const actual = component.getSearchCaseRequestPagination();

      expect(actual).toEqual(undefined);
    });
  });

  it('waits for role scope and excludes stale services when the jurisdiction lookup fails', fakeAsync(() => {
    const roleAssignments = new BehaviorSubject<any>({
      routerReducer: undefined,
      appConfig: { userDetails: { roleAssignmentInfo: undefined } },
    });
    const filterChanges = new Subject<any>();
    const caseService = jasmine.createSpyObj('WorkAllocationCaseService', ['getMyCases']);
    caseService.getMyCases.and.returnValue(of({ cases: [], total_records: 0, unique_cases: 0 }));
    const filterService = jasmine.createSpyObj('FilterService', ['get', 'getStream']);
    filterService.get.and.returnValue({
      fields: [
        { name: 'services', value: ['IA', 'CIVIL'] },
        { name: 'locations', value: [] },
      ],
    });
    filterService.getStream.and.returnValue(filterChanges);
    const store = jasmine.createSpyObj('Store', ['pipe']);
    store.pipe.and.callFake((...operators: any[]) => (roleAssignments.asObservable() as any).pipe(...operators));
    const waJurisdictionsService = jasmine.createSpyObj('WASupportedJurisdictionsService', [
      'getWASupportedJurisdictions',
      'getDetailedWASupportedJurisdictions',
    ]);
    waJurisdictionsService.getWASupportedJurisdictions.and.returnValue(
      throwError(() => new Error('jurisdiction service unavailable'))
    );
    waJurisdictionsService.getDetailedWASupportedJurisdictions.and.returnValue(of([]));
    const rolesService = jasmine.createSpyObj('AllocateRoleService', ['getValidRoles']);
    rolesService.getValidRoles.and.returnValue(of([]));
    const jurisdictionsService = jasmine.createSpyObj('JurisdictionsService', ['getJurisdictions']);
    jurisdictionsService.getJurisdictions.and.returnValue(of([]));
    const loadingService = jasmine.createSpyObj('LoadingService', ['register', 'unregister']);
    loadingService.register.and.returnValue('loading-token');
    const sessionStorageService = jasmine.createSpyObj('SessionStorageService', ['getItem']);
    sessionStorageService.getItem.withArgs('userDetails').and.returnValue(JSON.stringify({ id: 'user-1', roles: [] }));
    sessionStorageService.getItem.withArgs('my-work-filter').and.returnValue(
      JSON.stringify({
        fields: [
          { name: 'services', value: ['IA', 'CIVIL'] },
          { name: 'locations', value: [] },
        ],
      })
    );
    sessionStorageService.getItem.and.returnValue(undefined);
    const infoMessageCommService = jasmine.createSpyObj('InfoMessageCommService', ['addMessageOnce']);
    const ref = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);

    component = initializeComponent({
      changeDetectorRef: ref,
      workAllocationTaskService: caseService,
      infoMessageCommService,
      sessionStorageService,
      loadingService,
      waSupportedJurisdictionsService: waJurisdictionsService,
      filterService,
      jurisdictionsService,
      allocateRoleService: rolesService,
      store,
      location: { getState: () => null },
    });

    component.ngOnInit();
    expect(caseService.getMyCases).not.toHaveBeenCalled();

    roleAssignments.next({
      routerReducer: undefined,
      appConfig: { userDetails: { roleAssignmentInfo: [{ roleType: 'ORGANISATION', jurisdiction: 'IA' }] } },
    });
    tick();

    expect(caseService.getMyCases).toHaveBeenCalledTimes(1);
    const searchParameters = caseService.getMyCases.calls.mostRecent().args[0].searchRequest.search_parameters;
    expect(searchParameters.filter((parameter) => parameter.key === 'services')).toEqual([
      { key: 'services', operator: 'IN', values: ['IA'] },
    ]);
    expect(infoMessageCommService.addMessageOnce).toHaveBeenCalled();
    component.ngOnDestroy();
  }));

  it('loads My Cases for a judicial-only user within their assigned service', fakeAsync(() => {
    const caseService = jasmine.createSpyObj('WorkAllocationCaseService', ['getMyCases']);
    caseService.getMyCases.and.returnValue(of({ cases: [], total_records: 0, unique_cases: 0 }));
    const filterService = jasmine.createSpyObj('FilterService', ['get', 'getStream']);
    filterService.get.and.returnValue({
      fields: [
        { name: 'services', value: ['IA'] },
        { name: 'locations', value: [] },
      ],
    });
    filterService.getStream.and.returnValue(new Subject());
    const store = jasmine.createSpyObj('Store', ['pipe']);
    const appState = of({
      appConfig: {
        userDetails: {
          roleAssignmentInfo: [{ roleCategory: 'JUDICIAL', roleType: 'CASE', jurisdiction: 'IA' }],
        },
      },
    });
    store.pipe.and.callFake((...operators: any[]) => (appState as any).pipe(...operators));
    const waJurisdictionsService = jasmine.createSpyObj('WASupportedJurisdictionsService', [
      'getWASupportedJurisdictions',
      'getDetailedWASupportedJurisdictions',
    ]);
    waJurisdictionsService.getWASupportedJurisdictions.and.returnValue(of(['IA']));
    waJurisdictionsService.getDetailedWASupportedJurisdictions.and.returnValue(of([]));
    const rolesService = jasmine.createSpyObj('AllocateRoleService', ['getValidRoles']);
    rolesService.getValidRoles.and.returnValue(of([]));
    const jurisdictionsService = jasmine.createSpyObj('JurisdictionsService', ['getJurisdictions']);
    jurisdictionsService.getJurisdictions.and.returnValue(of([]));
    const loadingService = jasmine.createSpyObj('LoadingService', ['register', 'unregister']);
    loadingService.register.and.returnValue('loading-token');
    const sessionStorageService = jasmine.createSpyObj('SessionStorageService', ['getItem']);
    sessionStorageService.getItem
      .withArgs('userDetails')
      .and.returnValue(JSON.stringify({ id: 'judicial-user', roles: ['caseworker-ia-iacjudge'], roleCategories: ['JUDICIAL'] }));
    sessionStorageService.getItem.withArgs('my-work-filter').and.returnValue(
      JSON.stringify({
        fields: [
          { name: 'services', value: ['IA'] },
          { name: 'locations', value: [] },
        ],
      })
    );
    sessionStorageService.getItem.and.returnValue(undefined);
    const ref = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);

    component = initializeComponent({
      changeDetectorRef: ref,
      workAllocationTaskService: caseService,
      sessionStorageService,
      loadingService,
      waSupportedJurisdictionsService: waJurisdictionsService,
      filterService,
      jurisdictionsService,
      allocateRoleService: rolesService,
      store,
      location: { getState: () => null },
    });

    component.ngOnInit();
    tick();

    expect(caseService.getMyCases).toHaveBeenCalledTimes(1);
    const searchParameters = caseService.getMyCases.calls.mostRecent().args[0].searchRequest.search_parameters;
    expect(searchParameters.find((parameter) => parameter.key === 'services')).toEqual({
      key: 'services',
      operator: 'IN',
      values: ['IA'],
    });
    component.ngOnDestroy();
  }));

  it('does not query cases when the loaded role scope is empty', () => {
    const caseService = jasmine.createSpyObj('WorkAllocationCaseService', ['getMyCases']);
    const filterService = jasmine.createSpyObj('FilterService', ['get', 'getStream']);
    filterService.get.and.returnValue({
      fields: [
        { name: 'services', value: ['IA', 'CIVIL'] },
        { name: 'locations', value: [] },
      ],
    });
    filterService.getStream.and.returnValue(new Subject());
    const store = jasmine.createSpyObj('Store', ['pipe']);
    const appState = of({ appConfig: { userDetails: { roleAssignmentInfo: [] } } });
    store.pipe.and.callFake((...operators: any[]) => (appState as any).pipe(...operators));
    const waJurisdictionsService = jasmine.createSpyObj('WASupportedJurisdictionsService', [
      'getWASupportedJurisdictions',
      'getDetailedWASupportedJurisdictions',
    ]);
    waJurisdictionsService.getWASupportedJurisdictions.and.returnValue(of([]));
    waJurisdictionsService.getDetailedWASupportedJurisdictions.and.returnValue(of([]));
    const rolesService = jasmine.createSpyObj('AllocateRoleService', ['getValidRoles']);
    rolesService.getValidRoles.and.returnValue(of([]));
    const sessionStorageService = jasmine.createSpyObj('SessionStorageService', ['getItem']);
    sessionStorageService.getItem.withArgs('userDetails').and.returnValue(JSON.stringify({ id: 'user-1', roles: [] }));
    sessionStorageService.getItem.withArgs('my-work-filter').and.returnValue(
      JSON.stringify({
        fields: [
          { name: 'services', value: ['IA', 'CIVIL'] },
          { name: 'locations', value: [] },
        ],
      })
    );
    sessionStorageService.getItem.and.returnValue(undefined);

    component = initializeComponent({
      workAllocationTaskService: caseService,
      sessionStorageService,
      waSupportedJurisdictionsService: waJurisdictionsService,
      filterService,
      allocateRoleService: rolesService,
      store,
      location: { getState: () => null },
    });

    component.ngOnInit();

    expect(waJurisdictionsService.getWASupportedJurisdictions).toHaveBeenCalledTimes(1);
    expect(component.getSearchCaseRequestPagination()).toBeUndefined();
    expect(caseService.getMyCases).not.toHaveBeenCalled();
    component.ngOnDestroy();
  });

  describe('getters', () => {
    const getters = [
      {
        method: 'emptyMessage',
        result: ListConstants.EmptyMessage.MyCases,
      },
      {
        method: 'sortSessionKey',
        result: SortConstants.Session.MyCases,
      },
      {
        method: 'view',
        result: ListConstants.View.MyCases,
      },
      {
        method: 'fields',
        result: ConfigConstants.MyCases,
      },
    ];
    getters.forEach(({ method, result }) => {
      it(`should return '${result}'`, () => {
        component = initializeComponent({ checkReleaseVersionService: mockCheckReleaseVersionService });

        expect(component[method]).toEqual(result);
      });
    });
  });
});

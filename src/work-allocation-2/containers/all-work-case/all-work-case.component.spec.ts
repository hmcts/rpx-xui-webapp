import { CdkTableModule } from '@angular/cdk/table';
import { Component, Input, NO_ERRORS_SCHEMA} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PaginationModule } from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { SessionStorageService } from '../../../app/services';
import { reducers } from '../../../app/store';
//import { CaseRoleDetails } from '../../../role-access/models/case-role-details.interface';
import { AllocateRoleService } from '../../../role-access/services';
//import { ALL_LOCATIONS } from '../../components/constants/locations';
import { WorkAllocationComponentsModule } from '../../components/work-allocation.components.module';
import { AllWorkCaseComponent } from './all-work-case.component';
import { WorkCaseListWrapperComponent } from '../work-case-list-wrapper/work-case-list-wrapper.component';
import { LocationDataService } from '../../../work-allocation/services/location-data.service';
import {WASupportedJurisdictionsService} from '../../services';


@Component({
  selector: 'exui-work-case-list',
  template: '<div></div>'
})
class FakeXuiWorkCaseListComponent {
  @Input() caseServiceConfig: any;
  @Input() cases: any;
  @Input() fields: any;
  @Input() locations: any;
  @Input() casesTotal: any;
  @Input() uniqueCases: any;
  @Input() pagination: any;
  @Input() sortedBy: any;
  @Input() emptyMessage: any;
}

@Component({
  selector: 'exui-case-manager-filter',
  template: '<div></div>'
})
class FakeExuiCaseManagerFilterComponent {
  @Input() jurisdictions: any;
}

fdescribe('AllWorkCaseComponent', () => {

  let component: AllWorkCaseComponent;
  let fixture: ComponentFixture<AllWorkCaseComponent>;
  const mockHttpService = jasmine.createSpyObj('mockHttpService', ['put', 'get', 'post']);
  const location = {
    id: '231596',
    locationName: 'Birmingham',
    services: []
  };

  // const routerMock = new MockRouter();
  // const mockCaseService = jasmine.createSpyObj('mockCaseService', ['searchCase', 'getCases']);
  // const mockAlertService = jasmine.createSpyObj('mockAlertService', ['destroy']);
  const mockSessionStorageService = jasmine.createSpyObj('mockSessionStorageService', ['getItem', 'setItem']);
  const mockCaseworkerService = jasmine.createSpyObj('mockCaseworkerService', ['getAll']);
  const mockLocationService = jasmine.createSpyObj('LocationDataService', ['getLocations']);
  // const mockFeatureService = jasmine.createSpyObj('mockFeatureService', ['getActiveWAFeature']);
  // const mockLoadingService = jasmine.createSpyObj('mockLoadingService', ['register', 'unregister']);
  // const mockFeatureToggleService = jasmine.createSpyObj('mockLoadingService', ['isEnabled']);
  const mockWASupportedJurisdictionService = jasmine.createSpyObj('mockWASupportedJurisdictionService', ['getWASupportedJurisdictions']);
  const mockAllocateRoleService = jasmine.createSpyObj('mockAllocateRoleService', ['getCaseRolesUserDetails', 'getValidRoles']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CdkTableModule,
        ExuiCommonLibModule,
        RouterTestingModule,
        StoreModule.forRoot({...reducers}),
        WorkAllocationComponentsModule,
        PaginationModule
      ],
      declarations: [
        AllWorkCaseComponent,
        FakeExuiCaseManagerFilterComponent,
        FakeXuiWorkCaseListComponent,
        WorkCaseListWrapperComponent,
      ],
      providers: [
        // {provide: Router, useValue: routerMock},
        // {provide: WorkAllocationCaseService, useValue: mockCaseService},
        // {provide: AlertService, useValue: mockAlertService},
        {provide: SessionStorageService, useValue: mockSessionStorageService},
       // {provide: CaseworkerDataService, useValue: mockCaseworkerService},
        {provide: LocationDataService, useValue: mockLocationService},
        // {provide: WorkAllocationFeatureService, useValue: mockFeatureService},
        // {provide: LoadingService, useValue: mockLoadingService},
        // {provide: FeatureToggleService, useValue: mockFeatureToggleService},
        { provide: WASupportedJurisdictionsService, useValue: mockWASupportedJurisdictionService },
        { provide: AllocateRoleService, useValue: mockAllocateRoleService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllWorkCaseComponent);
    component = fixture.componentInstance;
    // const cases: Case[] = getMockCases();
    // const caseRoles: CaseRoleDetails[] = getMockCaseRoles();
    // mockCaseService.getCases.and.returnValue(of({cases}));
    // mockCaseworkerService.getAll.and.returnValue(of([]));
    // mockFeatureService.getActiveWAFeature.and.returnValue(of('WorkAllocationRelease2'));
    // mockFeatureToggleService.isEnabled.and.returnValue(of(false));
    mockLocationService.getLocations.and.returnValue(of(location));
    mockWASupportedJurisdictionService.getWASupportedJurisdictions.and.returnValue(of(['IA']));
    // mockAllocateRoleService.getCaseRolesUserDetails.and.returnValue(of( caseRoles ));
    // mockAllocateRoleService.getValidRoles.and.returnValue(of([]));
    // mockSessionStorageService.getItem.and.returnValue(undefined);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get emptyMessage', () => {
    expect(component.emptyMessage).toBeTruthy();
  });

  it('should get sortSessionKey', () => {
    expect(component.sortSessionKey).toBeTruthy();
  });

  it('should get pageSessionKey', () => {
    expect(component.pageSessionKey).toBeTruthy();
  });

  it('should get view', () => {
    expect(component.view).toBeTruthy();
  });

  it('should get fields', () => {
    expect(component.fields).toBeTruthy();
  });

  it('should get onPaginationEvent', () => {
    expect(component.onPaginationEvent).toBeTruthy();
  });

  it('should get getSearchCaseRequestPagination', () => {
    expect(component.getSearchCaseRequestPagination).toBeTruthy();
  });

  it('should get ngOnInit', () => {
    //mockLocationService.getLocations.and.returnValues(of(location));
    //fixture.detectChanges();
    spyOn(component, 'setupCaseWorkers');
    component.ngOnInit();
    expect(component.setupCaseWorkers).toHaveBeenCalled();
    expect(mockWASupportedJurisdictionService.getWASupportedJurisdictions).toHaveBeenCalled();
    //expect(mockLocationService.getLocations).toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });
});

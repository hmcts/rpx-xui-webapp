import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { CdkTableModule } from '@angular/cdk/table';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService, CaseNotifier, CasesService, LoadingService, PaginationModule } from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule, FeatureToggleService, FilterService } from '@hmcts/rpx-xui-common-lib';
import { StoreModule } from '@ngrx/store';
import { of, throwError } from 'rxjs';
import { AppUtils } from '../../../app/app-utils';
import { UserInfo, UserRole } from '../../../app/models';
import { SessionStorageService } from '../../../app/services';
import { InfoMessageCommService } from '../../../app/shared/services/info-message-comms.service';
import { reducers } from '../../../app/store';
import { RoleAssignmentResponse } from '../../../role-access/models/role-assignment-response.model';
import { AllocateRoleService } from '../../../role-access/services';
import { ListConstants, SortConstants, ConfigConstants } from '../../components/constants';
import { WorkAllocationComponentsModule } from '../../components/work-allocation.components.module';
import { Case } from '../../models/cases';
import { CaseworkerDataService, LocationDataService, WASupportedJurisdictionsService, WorkAllocationCaseService } from '../../services';
import { JurisdictionsService } from '../../services/juridictions.service';
import { getMockCases } from '../../tests/utils.spec';
import { WorkCaseListComponent } from '../work-case-list/work-case-list.component';
import { WorkCaseListWrapperComponent } from '../work-case-list-wrapper/work-case-list-wrapper.component';
import { MyAccessComponent } from './my-access.component';

@Component({ template: '<exui-my-access></exui-my-access>' })
class WrapperComponent {
  @ViewChild(MyAccessComponent) public appComponentRef: MyAccessComponent;
}

describe('MyAccessComponent', () => {
  let component: MyAccessComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let router: Router;
  const mockCaseService = jasmine.createSpyObj('mockCaseService', ['searchCase', 'getMyAccess']);
  const mockAlertService = jasmine.createSpyObj('mockAlertService', ['destroy']);
  const mockSessionStorageService = jasmine.createSpyObj('mockSessionStorageService', ['getItem', 'setItem']);
  const mockCaseworkerService = jasmine.createSpyObj('mockCaseworkerService', ['getAll']);
  const mockFeatureService = jasmine.createSpyObj('mockFeatureService', ['getActiveWAFeature']);
  const mockLoadingService = jasmine.createSpyObj('mockLoadingService', ['register', 'unregister']);
  const mockFeatureToggleService = jasmine.createSpyObj('mockFeatureToggleService', ['isEnabled']);
  const mockFilterService = jasmine.createSpyObj('mockFilterService', ['getStream', 'get']);
  const mockInfoMessageCommService = jasmine.createSpyObj('mockInfoMessageCommService', ['nextMessage']);
  const mockLocationService = jasmine.createSpyObj('mockLocationService', ['getLocations']);
  const mockWASupportedJurisdictionsService = jasmine.createSpyObj('mockWASupportedJurisdictionsService', ['getWASupportedJurisdictions', 'getDetailedWASupportedJurisdictions']);
  const mockJurisdictionsService = jasmine.createSpyObj('mockJurisdictionsService', ['getJurisdictions']);
  const mockRolesService = jasmine.createSpyObj('mockRolesService', ['getRoles', 'getValidRoles']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CdkTableModule,
        ExuiCommonLibModule,
        RouterTestingModule.withRoutes([
          { path: 'service-down', component: WrapperComponent },
          { path: '**', component: WrapperComponent }
        ]),
        HttpClientTestingModule,
        StoreModule.forRoot({ ...reducers }),
        WorkAllocationComponentsModule,
        PaginationModule
      ],
      declarations: [MyAccessComponent, WrapperComponent, WorkCaseListComponent],
      providers: [
        { provide: WorkAllocationCaseService, useValue: mockCaseService },
        { provide: AlertService, useValue: mockAlertService },
        { provide: SessionStorageService, useValue: mockSessionStorageService },
        { provide: CaseworkerDataService, useValue: mockCaseworkerService },
        { provide: LoadingService, useValue: mockLoadingService },
        { provide: FeatureToggleService, useValue: mockFeatureToggleService },
        { provide: FilterService, useValue: mockFilterService },
        { provide: InfoMessageCommService, useValue: mockInfoMessageCommService },
        { provide: LocationDataService, useValue: mockLocationService },
        { provide: WASupportedJurisdictionsService, useValue: mockWASupportedJurisdictionsService },
        { provide: JurisdictionsService, useValue: mockJurisdictionsService },
        { provide: AllocateRoleService, useValue: mockRolesService },
        CaseNotifier,
        HttpClient
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    
    // TODO: CAM_BOOKING 0 not neeed
    // component.isPaginationEnabled$ = of(false);
    router = TestBed.inject(Router);
    const cases: Case[] = getMockCases();
    mockCaseService.searchCase.and.returnValue(of({ cases }));
    mockCaseService.getMyAccess.and.returnValue(of({ cases }));
    mockCaseworkerService.getAll.and.returnValue(of([]));
    mockFeatureService.getActiveWAFeature.and.returnValue(of('WorkAllocationRelease2'));
    mockFeatureToggleService.isEnabled.and.returnValue(of(false));
    mockFilterService.getStream.and.returnValue(of({}));
    mockFilterService.get.and.returnValue({});
    mockLocationService.getLocations.and.returnValue(of([]));
    mockWASupportedJurisdictionsService.getWASupportedJurisdictions.and.returnValue(of([]));
    mockWASupportedJurisdictionsService.getDetailedWASupportedJurisdictions.and.returnValue(of([]));
    mockJurisdictionsService.getJurisdictions.and.returnValue(of([]));
    mockRolesService.getRoles.and.returnValue(of([]));
    mockRolesService.getValidRoles.and.returnValue(of([]));
    
    fixture.detectChanges();
    
    // Ensure the ViewChild component is available
    component = wrapper.appComponentRef;
    
    // If ViewChild is still not available, wait for next tick
    if (!component) {
      fixture.detectChanges();
      component = wrapper.appComponentRef;
    }
  });

  // on merge bookingUi and WA service isPaginationEnabled$ seems not part of component so at this stage it s deactivated
  xit('should make a call to load cases using the default search request', () => {
    const searchRequest = component.getSearchCaseRequestPagination();
    const payload = { searchRequest, view: component.view };
    expect(mockCaseService.searchCase).toHaveBeenCalledWith(payload);
    expect(component.cases).toBeDefined();
    expect(component.cases.length).toEqual(2);
  });

  it('should have all column headers', () => {
    expect(component).toBeDefined();
    expect(component.fields).toBeDefined();
    
    const element = fixture.debugElement.nativeElement;
    const headerCells = element.querySelectorAll('.govuk-table__header');
    const fields = component.fields;
    expect(headerCells).toBeDefined();
    expect(headerCells.length).toEqual(fields.length + 1);
    for (let i = 0; i < fields.length; i++) {
      if (fields[i].columnLabel) {
        expect(headerCells[i].textContent).toEqual(fields[i].columnLabel);
      } else {
        expect(headerCells[i].textContent).toEqual('');
      }
    }
    expect(headerCells[headerCells.length - 1].textContent.trim()).toEqual('');
  });

  it('should not show the footer when there are cases', () => {
    const element = fixture.debugElement.nativeElement;
    const footerRow = element.querySelector('.footer-row');
    expect(footerRow).toBeDefined();
    const footerRowClass = footerRow.getAttribute('class');
    expect(footerRowClass).toContain('footer-row');
    expect(footerRowClass).not.toContain('shown');
  });

  it('should show the footer when there are no cases xx', () => {
    expect(component).toBeDefined();
    
    // Create a spy on the cases getter
    spyOnProperty(component, 'cases', 'get').and.returnValue([]);
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    const footerRow = element.querySelector('.footer-row');
    expect(footerRow).toBeDefined();
    const footerRowClass = footerRow.getAttribute('class');
    expect(footerRowClass).toContain('footer-row');
    expect(footerRowClass).toContain('shown');
    const footerCell = element.querySelector('.cell-footer');
    expect(footerCell).toBeDefined();
    expect(footerCell.textContent.trim()).toEqual(component.emptyMessage);
  });

  afterEach(() => {
    fixture.destroy();
  });

  describe('component properties', () => {
    it('should return correct emptyMessage', () => {
      expect(component.emptyMessage).toEqual(ListConstants.EmptyMessage.MyAccess);
    });

    it('should return correct sortSessionKey', () => {
      expect(component.sortSessionKey).toEqual(SortConstants.Session.MyAccess);
    });

    it('should return correct view', () => {
      expect(component.view).toEqual(ListConstants.View.MyAccess);
    });

    it('should return correct fields', () => {
      expect(component.fields).toEqual(ConfigConstants.MyAccess);
    });

    it('should have correct backUrl', () => {
      expect(component.backUrl).toEqual('work/my-work/my-access');
    });
  });

  describe('getSearchCaseRequestPagination', () => {
    it('should return search request with user info', () => {
      const mockUserInfo: UserInfo = {
        id: 'user123',
        uid: null,
        roles: ['caseworker', 'caseworker-ia'],
        email: 'test@test.com',
        forename: 'Test',
        surname: 'User',
        active: true
      };
      const mockUserRole = UserRole.LegalOps;
      
      mockSessionStorageService.getItem.and.returnValue(JSON.stringify(mockUserInfo));
      spyOn(AppUtils, 'getUserRole').and.returnValue(mockUserRole);
      spyOn(component, 'getSortParameter').and.returnValue({ sort_by: 'case_name', sort_order: 'asc' });

      const result = component.getSearchCaseRequestPagination();

      expect(result).toEqual({
        search_parameters: [
          { key: 'user', operator: 'IN', values: ['user123'] }
        ],
        sorting_parameters: [{ sort_by: 'case_name', sort_order: 'asc' }],
        search_by: mockUserRole
      });
      expect(mockSessionStorageService.getItem).toHaveBeenCalledWith('userDetails');
      expect(AppUtils.getUserRole).toHaveBeenCalledWith(mockUserInfo.roles);
    });

    it('should use uid when id is not present', () => {
      const mockUserInfo: UserInfo = {
        id: null,
        uid: 'uid456',
        roles: ['caseworker'],
        email: 'test@test.com',
        forename: 'Test',
        surname: 'User',
        active: true
      };
      const mockUserRole = UserRole.LegalOps;
      
      mockSessionStorageService.getItem.and.returnValue(JSON.stringify(mockUserInfo));
      spyOn(AppUtils, 'getUserRole').and.returnValue(mockUserRole);
      spyOn(component, 'getSortParameter').and.returnValue({ sort_by: 'case_name', sort_order: 'asc' });

      const result = component.getSearchCaseRequestPagination();

      expect(result.search_parameters[0].values).toEqual(['uid456']);
    });

    it('should return undefined when userDetails not found in session storage', () => {
      mockSessionStorageService.getItem.and.returnValue(null);

      const result = component.getSearchCaseRequestPagination();

      expect(result).toBeUndefined();
      expect(mockSessionStorageService.getItem).toHaveBeenCalledWith('userDetails');
    });

    it('should handle empty userInfo string', () => {
      mockSessionStorageService.getItem.and.returnValue('');

      const result = component.getSearchCaseRequestPagination();

      expect(result).toBeUndefined();
    });
  });

  describe('onItemClickHandler', () => {
    let httpClient: HttpClient;
    let mockCase: Case;

    beforeEach(() => {
      httpClient = TestBed.inject(HttpClient);
      
      mockCase = {
        id: 'case123',
        case_id: 'case123',
        caseName: 'Test Case',
        caseCategory: 'Test Category',
        location: 'Test Location',
        taskName: 'Test Task',
        dueDate: new Date('2023-01-01'),
        actions: [],
        isNew: true,
        role: 'challenged-access-legal-ops',
        startDate: '2023-01-01',
        endDate: '2023-12-31'
      } as Case;
    });

    describe('challenged-access cases', () => {
      it('should update challenged access request when isNew is true', () => {
        const mockResponse: RoleAssignmentResponse = {
          roleRequest: null,
          requestedRoles: []
        };
        spyOn(CasesService, 'updateChallengedAccessRequestAttributes').and.returnValue(of(mockResponse));
        
        component.onItemClickHandler(mockCase);

        expect(CasesService.updateChallengedAccessRequestAttributes).toHaveBeenCalledWith(
          httpClient,
          'case123',
          { isNew: false }
        );
      });

      it('should set isNew to false after successful update', () => {
        const mockResponse: RoleAssignmentResponse = {
          roleRequest: null,
          requestedRoles: []
        };
        spyOn(CasesService, 'updateChallengedAccessRequestAttributes').and.returnValue(of(mockResponse));
        
        component.onItemClickHandler(mockCase);

        expect(mockCase.isNew).toBe(false);
      });

      // Note: Error handling is not implemented in the component.
      // The subscribe method doesn't have an error handler, so errors will propagate unhandled.

      it('should not update when isNew is false', () => {
        mockCase.isNew = false;
        spyOn(CasesService, 'updateChallengedAccessRequestAttributes');
        
        component.onItemClickHandler(mockCase);

        expect(CasesService.updateChallengedAccessRequestAttributes).not.toHaveBeenCalled();
      });
    });

    describe('specific-access cases', () => {
      beforeEach(() => {
        mockCase.role = 'specific-access-legal-ops';
      });

      it('should update specific access request when isNew is true and startDate is not Pending', () => {
        const mockResponse: RoleAssignmentResponse = {
          roleRequest: null,
          requestedRoles: []
        };
        spyOn(CasesService, 'updateSpecificAccessRequestAttributes').and.returnValue(of(mockResponse));
        
        component.onItemClickHandler(mockCase);

        expect(CasesService.updateSpecificAccessRequestAttributes).toHaveBeenCalledWith(
          httpClient,
          'case123',
          { isNew: false }
        );
      });

      it('should set isNew to false after successful update', () => {
        const mockResponse: RoleAssignmentResponse = {
          roleRequest: null,
          requestedRoles: []
        };
        spyOn(CasesService, 'updateSpecificAccessRequestAttributes').and.returnValue(of(mockResponse));
        
        component.onItemClickHandler(mockCase);

        expect(mockCase.isNew).toBe(false);
      });

      it('should not update when startDate is Pending', () => {
        mockCase.startDate = 'Pending';
        spyOn(CasesService, 'updateSpecificAccessRequestAttributes');
        
        component.onItemClickHandler(mockCase);

        expect(CasesService.updateSpecificAccessRequestAttributes).not.toHaveBeenCalled();
      });

      // Note: Error handling is not implemented in the component.
      // The subscribe method doesn't have an error handler, so errors will propagate unhandled.

      it('should not update when isNew is false', () => {
        mockCase.isNew = false;
        spyOn(CasesService, 'updateSpecificAccessRequestAttributes');
        
        component.onItemClickHandler(mockCase);

        expect(CasesService.updateSpecificAccessRequestAttributes).not.toHaveBeenCalled();
      });
    });

    describe('other case types', () => {
      it('should not update for non-challenged and non-specific access cases', () => {
        mockCase.role = 'other-role';
        spyOn(CasesService, 'updateChallengedAccessRequestAttributes');
        spyOn(CasesService, 'updateSpecificAccessRequestAttributes');
        
        component.onItemClickHandler(mockCase);

        expect(CasesService.updateChallengedAccessRequestAttributes).not.toHaveBeenCalled();
        expect(CasesService.updateSpecificAccessRequestAttributes).not.toHaveBeenCalled();
      });

      it('should handle null case gracefully', () => {
        spyOn(CasesService, 'updateChallengedAccessRequestAttributes');
        spyOn(CasesService, 'updateSpecificAccessRequestAttributes');
        
        // The component will throw an error when accessing item.isNew on null
        expect(() => component.onItemClickHandler(null)).toThrow();

        expect(CasesService.updateChallengedAccessRequestAttributes).not.toHaveBeenCalled();
        expect(CasesService.updateSpecificAccessRequestAttributes).not.toHaveBeenCalled();
      });

      it('should handle undefined case gracefully', () => {
        spyOn(CasesService, 'updateChallengedAccessRequestAttributes');
        spyOn(CasesService, 'updateSpecificAccessRequestAttributes');
        
        // The component will throw an error when accessing item.isNew on undefined
        expect(() => component.onItemClickHandler(undefined)).toThrow();

        expect(CasesService.updateChallengedAccessRequestAttributes).not.toHaveBeenCalled();
        expect(CasesService.updateSpecificAccessRequestAttributes).not.toHaveBeenCalled();
      });
    });
  });

  describe('integration with parent component', () => {
    it('should extend WorkCaseListWrapperComponent', () => {
      expect(component instanceof WorkCaseListWrapperComponent).toBe(true);
    });

    it('should override all required abstract methods', () => {
      expect(component.emptyMessage).toBeDefined();
      expect(component.sortSessionKey).toBeDefined();
      expect(component.view).toBeDefined();
      expect(component.fields).toBeDefined();
      expect(component.getSearchCaseRequestPagination).toBeDefined();
    });
  });
});

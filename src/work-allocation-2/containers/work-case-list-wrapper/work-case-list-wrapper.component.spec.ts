import { CdkTableModule } from '@angular/cdk/table';
import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService, LoadingService, PaginationModule } from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule, FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { of } from 'rxjs';

import { SessionStorageService } from '../../../app/services';
import { InfoMessageCommService } from '../../../app/shared/services/info-message-comms.service';
import { CaseRoleDetails } from '../../../role-access/models/case-role-details.interface';
import { AllocateRoleService } from '../../../role-access/services';
import { WorkAllocationComponentsModule } from '../../components/work-allocation.components.module';
import { Case } from '../../models/cases';
import { CaseworkerDataService, WorkAllocationCaseService, WorkAllocationFeatureService } from '../../services';
import { getMockCaseRoles, getMockCases } from '../../tests/utils.spec';
import { MyCasesComponent } from '../my-cases/my-cases.component';
import { WorkCaseListComponent } from '../work-case-list/work-case-list.component';
import { WorkCaseListWrapperComponent } from './work-case-list-wrapper.component';

describe('WorkCaseListWrapperComponent', () => {
  let component: WorkCaseListWrapperComponent;
  let fixture: ComponentFixture<WorkCaseListWrapperComponent>;
  const mockRef = jasmine.createSpyObj('mockRef', ['']);
  const mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);
  const mockWorkAllocationService = jasmine.createSpyObj('mockWorkAllocationService', ['searchCase', 'getCase', 'getMyCases']);
  const mockInfoMessageCommService = jasmine.createSpyObj('mockInfoMessageCommService', ['']);
  const mockSessionStorageService = jasmine.createSpyObj('mockSessionStorageService', ['getItem']);
  const mockAlertService = jasmine.createSpyObj('mockAlertService', ['']);
  const mockFeatureService = jasmine.createSpyObj('mockFeatureService', ['getActiveWAFeature']);
  const mockLoadingService = jasmine.createSpyObj('mockLoadingService', ['register', 'unregister']);
  const mockFeatureToggleService = jasmine.createSpyObj('mockLoadingService', ['isEnabled']);
  const mockCaseworkerDataService = jasmine.createSpyObj('mockCaseworkerDataService', ['getAll']);
  const mockAllocateRoleService = jasmine.createSpyObj('mockAllocateRoleService', ['getCaseRolesUserDetails', 'getValidRoles']);
  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        WorkAllocationComponentsModule,
        ExuiCommonLibModule,
        RouterTestingModule,
        CdkTableModule,
        PaginationModule
      ],
      declarations: [MyCasesComponent, WorkCaseListWrapperComponent, WorkCaseListComponent],
      providers: [
        { provide: ChangeDetectorRef, useValue: mockRef },
        { provide: WorkAllocationCaseService, useValue: mockWorkAllocationService },
        { provide: Router, useValue: mockRouter },
        { provide: InfoMessageCommService, useValue: mockInfoMessageCommService },
        { provide: SessionStorageService, useValue: mockSessionStorageService },
        { provide: AlertService, useValue: mockAlertService },
        { provide: WorkAllocationFeatureService, useValue: mockFeatureService },
        { provide: LoadingService, useValue: mockLoadingService },
        { provide: FeatureToggleService, useValue: mockFeatureToggleService },
        { provide: CaseworkerDataService, useValue: mockCaseworkerDataService },
        { provide: AllocateRoleService, useValue: mockAllocateRoleService }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(WorkCaseListWrapperComponent);
    component = fixture.componentInstance;
    const cases: Case[] = getMockCases();
    const caseRoles: CaseRoleDetails[] = getMockCaseRoles();
    mockWorkAllocationService.searchCase.and.returnValue(of({ cases }));
    mockWorkAllocationService.getMyCases.and.returnValue(of({ cases }));
    mockFeatureService.getActiveWAFeature.and.returnValue(of('WorkAllocationRelease2'));
    mockFeatureToggleService.isEnabled.and.returnValue(of(false));
    mockCaseworkerDataService.getAll.and.returnValue(of([]));
    mockAllocateRoleService.getCaseRolesUserDetails.and.returnValue(of( caseRoles ))
    mockAllocateRoleService.getValidRoles.and.returnValue(of([]));
    mockSessionStorageService.getItem.and.returnValue(undefined);
    fixture.detectChanges();
  }));

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  describe('onActionHandler()', () => {
    const exampleCase = getMockCases()[0];
    const firstAction = exampleCase.actions[0];
    const secondAction = exampleCase.actions[1];
    const firstCaseAction = { invokedCase: exampleCase, action: firstAction };
    const secondCaseAction = { invokedCase: exampleCase, action: secondAction };
    it('should handle a reallocate action', () => {

      // need to check that navigate has been called
      component.onActionHandler(firstCaseAction);
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith(jasmine.stringMatching('reallocate'), { state: { backUrl: null } });
    });

    it('should handle a remove action', () => {
      // need to spy on the router and set up the task action
      component.onActionHandler(secondCaseAction);
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith(jasmine.stringMatching('remove'), { state: { backUrl: null } });
    });
  });
});

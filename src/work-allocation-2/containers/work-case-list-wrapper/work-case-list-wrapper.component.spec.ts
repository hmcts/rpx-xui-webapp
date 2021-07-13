import { CdkTableModule } from '@angular/cdk/table';
import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService, LoadingService, PaginationModule } from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule, FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { of } from 'rxjs';
import { SessionStorageService } from '../../../app/services';
import { WorkAllocationComponentsModule } from '../../components/work-allocation.components.module';
import { Case } from '../../models/cases';
import { InfoMessageCommService, WorkAllocationCaseService, WorkAllocationFeatureService } from '../../services';
import { getMockCases, MockRouter } from '../../tests/utils.spec';
import { MyCasesComponent } from '../my-cases/my-cases.component';
import { WorkCaseListComponent } from '../work-case-list/work-case-list.component';
import { WorkCaseListWrapperComponent } from './work-case-list-wrapper.component';

describe('WorkCaseListWrapperComponent', () => {
  let component: WorkCaseListWrapperComponent;
  let fixture: ComponentFixture<WorkCaseListWrapperComponent>;
  const mockRef = jasmine.createSpyObj('mockRef', ['']);
  const mockRouter: MockRouter = new MockRouter();
  const mockWorkAllocationService = jasmine.createSpyObj('mockWorkAllocationService', ['searchCase', 'getCase']);
  const mockInfoMessageCommService = jasmine.createSpyObj('mockInfoMessageCommService', ['']);
  const mockSessionStorageService = jasmine.createSpyObj('mockSessionStorageService', ['getItem']);
  const mockAlertService = jasmine.createSpyObj('mockAlertService', ['']);
  const mockFeatureService = jasmine.createSpyObj('mockFeatureService', ['getActiveWAFeature']);
  const mockLoadingService = jasmine.createSpyObj('mockLoadingService', ['register', 'unregister']);
  const mockFeatureToggleService = jasmine.createSpyObj('mockLoadingService', ['isEnabled']);
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
        { provide: FeatureToggleService, useValue: mockFeatureToggleService }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(WorkCaseListWrapperComponent);
    component = fixture.componentInstance;
    component.isPaginationEnabled$ = of(false);
    const cases: Case[] = getMockCases();
    mockWorkAllocationService.searchCase.and.returnValue(of({ cases }));
    mockFeatureService.getActiveWAFeature.and.returnValue(of('WorkAllocationRelease2'));
    mockFeatureToggleService.isEnabled.and.returnValue(of(false));
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeDefined();
  });

  describe('onActionHandler()', () => {
    const exampleCase = getMockCases()[0];
    const firstAction = exampleCase.actions[0];
    const secondAction = exampleCase.actions[1];
    const firstCaseAction = { invokedCase: exampleCase, action: firstAction };
    const secondCaseAction = { invokedCase: exampleCase, action: secondAction };
    xit('should handle an action', () => {
      // need to spy on the router and set up the case action
      spyOnProperty(mockRouter, 'url', 'get').and.returnValue(`/mywork/list`);
      const navigateCallsBefore = mockRouter.navigateCalls.length;

      // need to check that navigate has been called
      component.onActionHandler(firstCaseAction);
      expect(mockRouter.navigateCalls.length).toBeGreaterThan(navigateCallsBefore);

      // need to verify correct properties were called
      const lastNavigateCall = mockRouter.navigateCalls.pop();
      expect(lastNavigateCall.commands).toEqual([`/work/${exampleCase.id}/${firstAction.id}/`]);
      const exampleNavigateCall = { state: { returnUrl: '/mywork/list', showAssigneeColumn: true } };
      expect(lastNavigateCall.extras).toEqual(exampleNavigateCall);
    });

    xit('should handle an action returned via the task manager page', () => {
      // need to spy on the router and set up the task action
      spyOnProperty(mockRouter, 'url', 'get').and.returnValue(`/mywork/manager`);
      const navigateCallsBefore = mockRouter.navigateCalls.length;

      // need to check that navigate has been called
      component.onActionHandler(secondCaseAction);
      expect(mockRouter.navigateCalls.length).toBeGreaterThan(navigateCallsBefore);

      // need to verify correct properties were called
      const lastNavigateCall = mockRouter.navigateCalls.pop();
      expect(lastNavigateCall.commands).toEqual([`/work/${exampleCase.id}/${secondAction.id}/`]);
      const exampleNavigateCall = { state: { returnUrl: '/mywork/manager', showAssigneeColumn: true } };
      expect(lastNavigateCall.extras).toEqual(exampleNavigateCall);
    });
  });
});

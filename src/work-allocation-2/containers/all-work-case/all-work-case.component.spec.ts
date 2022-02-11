import { CdkTableModule } from '@angular/cdk/table';
import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService, LoadingService, PaginationModule } from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule, FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';

import { SessionStorageService } from '../../../app/services';
import { reducers } from '../../../app/store';
import { CaseRoleDetails } from '../../../role-access/models/case-role-details.interface';
import { AllocateRoleService } from '../../../role-access/services';
import { ALL_LOCATIONS } from '../../components/constants/locations';
import { WorkAllocationComponentsModule } from '../../components/work-allocation.components.module';
import { Case } from '../../models/cases';
import { Location } from '../../models/dtos';
import {
  CaseworkerDataService,
  LocationDataService,
  WASupportedJurisdictionsService,
  WorkAllocationCaseService,
  WorkAllocationFeatureService
} from '../../services';
import { getMockCaseRoles, getMockCases } from '../../tests/utils.spec';
import { WorkCaseListComponent } from '../work-case-list/work-case-list.component';
import { AllWorkCaseComponent } from './all-work-case.component';

@Component({
  template: `
    <exui-all-work-cases></exui-all-work-cases>`
})

class WrapperComponent {
  @ViewChild(AllWorkCaseComponent) public appComponentRef: AllWorkCaseComponent;
}

describe('AllWorkCaseComponent', () => {
  let component: AllWorkCaseComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  const routerMock = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);
  const mockCaseService = jasmine.createSpyObj('mockCaseService', ['searchCase', 'getCases']);
  const mockAlertService = jasmine.createSpyObj('mockAlertService', ['destroy']);
  const mockSessionStorageService = jasmine.createSpyObj('mockSessionStorageService', ['getItem', 'setItem']);
  const mockCaseworkerService = jasmine.createSpyObj('mockCaseworkerService', ['getAll']);
  const mockLocationService = jasmine.createSpyObj('mockLocationService', ['getLocations']);
  const mockFeatureService = jasmine.createSpyObj('mockFeatureService', ['getActiveWAFeature']);
  const mockLoadingService = jasmine.createSpyObj('mockLoadingService', ['register', 'unregister']);
  const mockFeatureToggleService = jasmine.createSpyObj('mockLoadingService', ['isEnabled']);
  const mockWASupportedJurisdictionService = jasmine.createSpyObj('mockWASupportedJurisdictionService', ['getWASupportedJurisdictions']);
  const mockAllocateRoleService = jasmine.createSpyObj('mockAllocateRoleService', ['getCaseRolesUserDetails', 'getValidRoles']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CdkTableModule,
        ExuiCommonLibModule,
        RouterTestingModule,
        StoreModule.forRoot({...reducers}),
        WorkAllocationComponentsModule,
        PaginationModule
      ],
      declarations: [AllWorkCaseComponent, WrapperComponent, WorkCaseListComponent],
      providers: [
        {provide: Router, useValue: routerMock},
        {provide: WorkAllocationCaseService, useValue: mockCaseService},
        {provide: AlertService, useValue: mockAlertService},
        {provide: SessionStorageService, useValue: mockSessionStorageService},
        {provide: CaseworkerDataService, useValue: mockCaseworkerService},
        {provide: LocationDataService, useValue: mockLocationService},
        {provide: WorkAllocationFeatureService, useValue: mockFeatureService},
        {provide: LoadingService, useValue: mockLoadingService},
        {provide: FeatureToggleService, useValue: mockFeatureToggleService},
        {provide: WASupportedJurisdictionsService, useValue: mockWASupportedJurisdictionService},
        { provide: AllocateRoleService, useValue: mockAllocateRoleService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    const cases: Case[] = getMockCases();
    const caseRoles: CaseRoleDetails[] = getMockCaseRoles();
    mockCaseService.getCases.and.returnValue(of({cases}));
    mockCaseworkerService.getAll.and.returnValue(of([]));
    mockFeatureService.getActiveWAFeature.and.returnValue(of('WorkAllocationRelease2'));
    mockFeatureToggleService.isEnabled.and.returnValue(of(false));
    mockLocationService.getLocations.and.returnValue(of(ALL_LOCATIONS as unknown as Location[]));
    mockWASupportedJurisdictionService.getWASupportedJurisdictions.and.returnValue(of(['IA']));
    mockAllocateRoleService.getCaseRolesUserDetails.and.returnValue(of( caseRoles ));
    mockAllocateRoleService.getValidRoles.and.returnValue(of([]));
    mockSessionStorageService.getItem.and.returnValue(undefined);
    fixture.detectChanges();
  });

  it('should have all column headers, including "Manage +"', () => {
    const element = fixture.debugElement.nativeElement;
    const headerCells = element.querySelectorAll('.govuk-table__header');
    const fields = component.fields;
    expect(headerCells).toBeDefined();
    expect(headerCells.length).toEqual(fields.length + 1); // Extra one for Manage +;
    for (let i = 0; i < fields.length; i++) {
      // ensure derivedIcon has no header and every other field does
      if (fields[i].columnLabel) {
        expect(headerCells[i].textContent).toEqual(fields[i].columnLabel);
      } else {
        expect(headerCells[i].textContent).toEqual('');
      }
    }
    // Make sure Manage + heading is blank.
    expect(headerCells[headerCells.length - 1].textContent.trim()).toEqual('');
  });

  it('should show judicial names when available', () => {
    const firstMockCase = component.cases[0];
    const secondMockCase = component.cases[1];

    expect(firstMockCase.assignee).not.toBe(undefined);
    expect(firstMockCase.actorName).toBe('Test');

    expect(secondMockCase.assignee).toBe(undefined);
    expect(secondMockCase.actorName).toBe(null);
  });

  it('should not show the footer when there are cases', () => {
    const element = fixture.debugElement.nativeElement;
    const footerRow = element.querySelector('.footer-row');
    expect(footerRow).toBeDefined();
    const footerRowClass = footerRow.getAttribute('class');
    expect(footerRowClass).toContain('footer-row');
    expect(footerRowClass).not.toContain('shown');
  });

  it('should show the footer when there are no cases', () => {
    spyOnProperty(component, 'cases').and.returnValue([]);
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

  it('should appropriately handle clicking on a row action', () => {
    const element = fixture.debugElement.nativeElement;
    // Use the first case.
    const caseItem = component.cases[0];
    // Click on the Manage + button.
    const manageButton = element.querySelector(`#manage_${caseItem.id}`);
    manageButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    // Use the first action from that case.
    const actionId = caseItem.actions[0].id;
    const actionLink = element.querySelector(`#action_${actionId}`);
    // Click on the action link.
    actionLink.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    // Ensure the correct attempt has been made to navigate.
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith(jasmine.stringMatching('reallocate'), {state: {backUrl: 'work/all-work/cases'}});
  });

  afterEach(() => {
    fixture.destroy();
  });
});

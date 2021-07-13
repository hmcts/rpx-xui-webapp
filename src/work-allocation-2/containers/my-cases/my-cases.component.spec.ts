import { CdkTableModule } from '@angular/cdk/table';
import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService, LoadingService, PaginationModule } from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule, FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { of } from 'rxjs';
import { SessionStorageService } from '../../../app/services';
import { WorkAllocationComponentsModule } from '../../components/work-allocation.components.module';
import { Case } from '../../models/cases';
import { CaseworkerDataService, WorkAllocationCaseService, WorkAllocationFeatureService } from '../../services';
import { getMockCases } from '../../tests/utils.spec';
import { WorkCaseListComponent } from '../work-case-list/work-case-list.component';
import { MyCasesComponent } from './my-cases.component';

@Component({ template: `<exui-my-cases></exui-my-cases>` })

class WrapperComponent {
  @ViewChild(MyCasesComponent) public appComponentRef: MyCasesComponent;
}

describe('MyCasesComponent', () => {
  let component: MyCasesComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  let router: Router;
  const mockCaseService = jasmine.createSpyObj('mockCaseService', ['searchCase']);
  const mockAlertService = jasmine.createSpyObj('mockAlertService', ['destroy']);
  const mockSessionStorageService = jasmine.createSpyObj('mockSessionStorageService', ['getItem', 'setItem']);
  const mockCaseworkerService = jasmine.createSpyObj('mockCaseworkerService', ['getAll']);
  const mockFeatureService = jasmine.createSpyObj('mockFeatureService', ['getActiveWAFeature']);
  const mockLoadingService = jasmine.createSpyObj('mockLoadingService', ['register', 'unregister']);
  const mockFeatureToggleService = jasmine.createSpyObj('mockLoadingService', ['isEnabled']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CdkTableModule,
        ExuiCommonLibModule,
        RouterTestingModule,
        WorkAllocationComponentsModule,
        PaginationModule
      ],
      declarations: [MyCasesComponent, WrapperComponent, WorkCaseListComponent],
      providers: [
        { provide: WorkAllocationCaseService, useValue: mockCaseService },
        { provide: AlertService, useValue: mockAlertService },
        { provide: SessionStorageService, useValue: mockSessionStorageService },
        { provide: CaseworkerDataService, useValue: mockCaseworkerService },
        { provide: WorkAllocationFeatureService, useValue: mockFeatureService },
        { provide: LoadingService, useValue: mockLoadingService },
        { provide: FeatureToggleService, useValue: mockFeatureToggleService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    component.isPaginationEnabled$ = of(false);
    router = TestBed.get(Router);
    const cases: Case[] = getMockCases();
    mockCaseService.searchCase.and.returnValue(of({ cases }));
    mockCaseworkerService.getAll.and.returnValue(of([]));
    mockFeatureService.getActiveWAFeature.and.returnValue(of('WorkAllocationRelease2'));
    mockFeatureToggleService.isEnabled.and.returnValue(of(false));
    fixture.detectChanges();
  });


  it('should make a call to load cases using the default search request', () => {
    const searchRequest = component.getSearchCaseRequestPagination();
    const payload = { searchRequest, view: component.view };
    expect(mockCaseService.searchCase).toHaveBeenCalledWith(payload);
    expect(component.cases).toBeDefined();
    expect(component.cases.length).toEqual(2);
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

  xit('should appropriately handle clicking on a row action', () => {
    const navigateSpy = spyOn(router, 'navigate');
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
    expect(navigateSpy).toHaveBeenCalledWith([`/work/${caseItem.id}/${actionId}/`], jasmine.any(Object));
  });
});

import { CdkTableModule } from '@angular/cdk/table';
import { Component, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { RouterTestingModule } from '@angular/router/testing';
import { PaginatePipe } from 'ngx-pagination';
import { RpxTranslationService } from 'rpx-xui-translation';
import { ConfigConstants } from '../../components/constants';
import { WorkAllocationComponentsModule } from '../../components/work-allocation.components.module';
import { CaseService, SortOrder } from '../../enums';
import { Case, CaseAction, CaseServiceConfig } from '../../models/cases';
import { FieldConfig, SortField } from '../../models/common';
import { PaginationParameter } from '../../models/dtos';
import { getMockCases } from '../../tests/utils.spec';
import { WorkCaseListComponent } from './work-case-list.component';

@Component({
  template: `
    <exui-work-case-list
      [fields]='fields'
      [cases]='cases'
      [casesTotal]="casesTotal"
      [caseServiceConfig]="caseServiceConfig"
      [sortedBy]="CaseSortField"
      [pagination]="pagination"></exui-work-case-list>`
})
class WrapperComponent {
  @ViewChild(WorkCaseListComponent, { static: true }) public appComponentRef: WorkCaseListComponent;
  @Input() public fields: FieldConfig[];
  @Input() public cases: Case[];
  @Input() public casesTotal: number;
  @Input() public caseServiceConfig: CaseServiceConfig;
  @Input() public pagination: PaginationParameter;
  @Input() public sortedBy: SortField;
}

/**
 * Mock cases
 */
function getCases(): Case[] {
  return getMockCases();
}

/**
 * Mock fields
 */
function getFields(): FieldConfig[] {
  return ConfigConstants.MyCases;
}

/**
 * Mock CaseServiceConfig.
 */
function getCaseService(): CaseServiceConfig {
  return {
    service: CaseService.IAC,
    defaultSortDirection: SortOrder.ASC,
    defaultSortFieldName: 'dueDate',
    fields: getFields()
  };
}

describe('CaseListComponent', () => {
  let component: WorkCaseListComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let routerSpy: jasmine.SpyObj<any>;
  const mockWorkAllocationService = jasmine.createSpyObj('mockWorkAllocationService', ['getCase']);
  const mockFeatureToggleService = jasmine.createSpyObj('featureToggleService', ['isEnabled', 'getValue']);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const rpxTranslationServiceStub = () => ({ language: 'en', translate: () => { }, getTranslation: (phrase: string) => phrase });

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [WorkCaseListComponent, WrapperComponent, PaginatePipe],
      imports: [
        WorkAllocationComponentsModule,
        CdkTableModule,
        RouterTestingModule
      ],
      providers: [
        { provide: RpxTranslationService, useFactory: rpxTranslationServiceStub }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;

    wrapper.cases = getCases();
    wrapper.fields = getFields();
    wrapper.caseServiceConfig = getCaseService();
    wrapper.casesTotal = 2;
    wrapper.pagination = {
      page_number: 1,
      page_size: 10
    };
    mockWorkAllocationService.getCase.and.returnValue(of({}));
    mockFeatureToggleService.isEnabled.and.returnValue(of(true));
    fixture.detectChanges();
  });

  // it(`should return the fields as an array with a 'manage' entry, so that we can` +
  //   'display the manage column in the table.', async () => {
  //
  //   const fields = ['caseReference', 'caseName', 'caseCategory', 'location', 'case', 'dueDate'];
  //   const fieldsWithManage = [...fields, 'manage'];
  //
  //   expect(component.addManageColumn(fields)).toEqual(fieldsWithManage);
  // });

  it('should return the columns to be displayed by the Angular Component Dev Kit table.', async () => {
    // create mock getDisplayedColumn variables
    const caseFieldConfig = getFields();
    const fields = caseFieldConfig.map((field) => field.name);
    const displayedColumns = component.addManageColumn(fields);
    // test actual function against mock variables
    expect(component.getDisplayedColumn(caseFieldConfig)).toEqual(displayedColumns);
  });

  // required no sorting on EUI-4476 so exclude the test
  xit('should take in the field name and trigger a new Request to the API to get a sorted result set.', async () => {
    // mock the emitter and dispatch the connected event
    spyOn(component.sortEvent, 'emit');
    const element = fixture.debugElement.nativeElement;
    const button = element.querySelector('#sort_by_caseName');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // check the emitter had been called and that it gets called with the first field which is caseName
    expect(component.sortEvent.emit).toHaveBeenCalled();
    expect(component.sortEvent.emit).toHaveBeenCalledWith('caseName');
  });

  it('reset sort button is hidden by default', async () => {
    expect(component.showResetSortButton).toBeFalsy();
  });

  // required no sorting on EUI-4476 so exclude the test
  xit('show reset sort button after clicking column header', async () => {
    /// mock the emitter and dispatch the connected event
    spyOn(component.sortEvent, 'emit');
    const element = fixture.debugElement.nativeElement;
    const button = element.querySelector('#sort_by_caseName');
    button.dispatchEvent(new Event('click'));
    component.sortedBy = { fieldName: 'caseName', order: SortOrder.DESC };
    fixture.detectChanges();

    expect(component.showResetSortButton).toBeTruthy();
  });

  // required no sorting on EUI-4476 so exclude the test
  xit('should allow sorting for different columns.', async () => {
    // mock the emitter and dispatch the connected event
    spyOn(component.sortEvent, 'emit');
    let element = fixture.debugElement.nativeElement;
    let button = element.querySelector('#sort_by_caseName');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // check the emitter had been called and that it gets called with the field defined which is caseName
    expect(component.sortEvent.emit).toHaveBeenCalled();
    expect(component.sortEvent.emit).toHaveBeenCalledWith('caseName');

    // mock the emitter and dispatch the connected event to a column to the right
    element = fixture.debugElement.nativeElement;
    button = element.querySelector('#sort_by_jurisdiction');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // check the emitter had been called and that it gets called with the new field defined which is caseName
    expect(component.sortEvent.emit).toHaveBeenCalled();
    expect(component.sortEvent.emit).toHaveBeenCalledWith('jurisdiction');

    // mock the emitter and dispatch the connected event to a column to the left
    element = fixture.debugElement.nativeElement;
    button = element.querySelector('#sort_by_caseCategory');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // check the emitter had been called and that it gets called with the new field defined which is caseCategory
    expect(component.sortEvent.emit).toHaveBeenCalled();
    expect(component.sortEvent.emit).toHaveBeenCalledWith('caseCategory');
  });

  it('should open and close the selected row.', async () => {
    const firstCaseId: string = getCases()[0].id;
    const secondCaseId: string = getCases()[1].id;

    // get the 'manage' button and click it
    let element = fixture.debugElement.nativeElement;
    let button = element.querySelector(`#manage_${firstCaseId}`);
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // get the selected row and confirm it is not null
    const firstRow = component.getSelectedCase();
    expect(component.getSelectedCase()).not.toBe(null);

    // click the 'manage' button again and confirm that it is null
    element = fixture.debugElement.nativeElement;
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.getSelectedCase()).toBe(null);

    // click the button one last time and confirm selected and equal to earlier given row
    element = fixture.debugElement.nativeElement;
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.getSelectedCase()).not.toBe(null);
    expect(component.getSelectedCase()).toEqual(firstRow);
    expect(firstRow.id).toEqual(firstCaseId);

    // click the button for the second case
    element = fixture.debugElement.nativeElement;
    button = element.querySelector(`#manage_${secondCaseId}`);
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // get the selected row and confirm it is not null and is the secondCaseId
    const secondRow = component.getSelectedCase();
    expect(component.getSelectedCase()).not.toBe(null);
    expect(secondRow.id).toEqual(secondCaseId);
  });

  it('should allow setting the selected row.', async () => {
    const firstCaseId: string = getCases()[0].id;
    const secondCaseId: string = getCases()[1].id;

    // get the 'manage' button and click it
    let element = fixture.debugElement.nativeElement;
    const firstButton = element.querySelector(`#manage_${firstCaseId}`);
    const secondButton = element.querySelector(`#manage_${secondCaseId}`);
    firstButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // get the selected row and confirm it is not null
    const firstRow = component.getSelectedCase();
    expect(component.getSelectedCase()).not.toBe(null);

    // click the 'manage' button again and confirm that it is null
    element = fixture.debugElement.nativeElement;
    firstButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.getSelectedCase()).toBe(null);

    // set the selected row as the earlier defined row
    component.setSelectedCase(firstRow);
    fixture.detectChanges();
    expect(component.getSelectedCase()).not.toBe(null);
    expect(component.getSelectedCase()).toEqual(firstRow);
    expect(firstRow.id).toEqual(firstCaseId);

    // click the 'manage' button again and confirm that it is selected
    element = fixture.debugElement.nativeElement;
    secondButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const secondRow = component.getSelectedCase();
    expect(component.getSelectedCase()).not.toBe(null);

    // set the selected row as the earlier defined row
    component.setSelectedCase(firstRow);
    fixture.detectChanges();
    expect(component.getSelectedCase()).not.toBe(null);
    expect(component.getSelectedCase()).toEqual(firstRow);
    expect(firstRow.id).toEqual(firstCaseId);

    // set the selected row as the later defined row
    component.setSelectedCase(secondRow);
    fixture.detectChanges();
    expect(component.getSelectedCase()).not.toBe(null);
    expect(component.getSelectedCase()).toEqual(secondRow);
    expect(secondRow.id).toEqual(secondCaseId);

    // click selected row again and confirm null
    component.setSelectedCase(secondRow);
    fixture.detectChanges();
    expect(component.getSelectedCase()).toBe(null);
  });

  it('should allow checking the selected row.', async () => {
    const firstCaseId: string = getCases()[0].id;
    const secondCaseId: string = getCases()[1].id;

    // get the 'manage' button and click it
    let element = fixture.debugElement.nativeElement;
    const firstButton = element.querySelector(`#manage_${firstCaseId}`);
    const secondButton = element.querySelector(`#manage_${secondCaseId}`);
    firstButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // get the selected row and confirm it is not null
    const firstRow = component.getSelectedCase();
    expect(component.getSelectedCase()).not.toBe(null);

    // expect the row to be selected
    expect(component.isCaseSelected(firstRow)).toBeTruthy();

    // click the 'manage' button for the second row and confirm that initial row is not selected
    element = fixture.debugElement.nativeElement;
    secondButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const secondRow = component.getSelectedCase();
    expect(component.isCaseSelected(firstRow)).toBeFalsy();
    expect(component.isCaseSelected(secondRow)).toBeTruthy();

    // click the 'manage' button for the initial row and confirm that second row is not selected
    element = fixture.debugElement.nativeElement;
    firstButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.isCaseSelected(firstRow)).toBeTruthy();
    expect(component.isCaseSelected(secondRow)).toBeFalsy();

    // click the 'manage' button for the initial row and confirm that neither are selected
    element = fixture.debugElement.nativeElement;
    firstButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.isCaseSelected(firstRow)).toBeFalsy();
    expect(component.isCaseSelected(secondRow)).toBeFalsy();
  });

  it('should trigger an event to the parent when the User clicks on an action.', async () => {
    // set relevant variables
    const firstCase: Case = getCases()[0];
    const secondCase: Case = getCases()[1];
    const firstCaseId: string = firstCase.id;
    const secondCaseId: string = secondCase.id;
    const firstAction: CaseAction = getCases()[0].actions[0];
    const secondAction: CaseAction = getCases()[0].actions[1];
    const firstActionId: string = firstAction.id;
    const secondActionId: string = secondAction.id;

    // mock the emitter and click the first manage button
    spyOn(component.actionEvent, 'emit');
    const element = fixture.debugElement.nativeElement;
    const firstButton = element.querySelector(`#manage_${firstCaseId}`);
    const secondButton = element.querySelector(`#manage_${secondCaseId}`);
    firstButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // check the emitter had been called and that it gets called with the first invoked case action
    const firstAnchor = element.querySelector(`#action_${firstActionId}`);
    firstAnchor.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.actionEvent.emit).toHaveBeenCalled();
    let action = firstAction;
    expect(component.actionEvent.emit).toHaveBeenCalledWith({ invokedCase: firstCase, action });

    // check the emitter had been called and that it gets called with the second invoked case action
    const secondAnchor = element.querySelector(`#action_${secondActionId}`);
    secondAnchor.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.actionEvent.emit).toHaveBeenCalled();
    action = secondAction;
    expect(component.actionEvent.emit).toHaveBeenCalledWith({ invokedCase: firstCase, action });

    // click the second button in order to show the last action anchor
    secondButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // check the emitter had been called and that it gets called with the third invoked case action
    const thirdAnchor = element.querySelector(`#action_${secondActionId}`);
    thirdAnchor.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.actionEvent.emit).toHaveBeenCalled();
    action = secondAction;
    expect(component.actionEvent.emit).toHaveBeenCalledWith({ invokedCase: secondCase, action });
  });

  // required no sorting on EUI-4476 so exclude the test
  xit('should allow a check to verify whether column sorted.', async () => {
    // mock the emitter and dispatch the connected event (with example case field buttons selected)
    spyOn(component.sortEvent, 'emit');
    const element = fixture.debugElement.nativeElement;
    const caseName = element.querySelector('#sort_by_caseName');
    const categoryButton = element.querySelector('#sort_by_caseCategory');
    const startDateButton = element.querySelector('#sort_by_startDate');
    caseName.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // check the case name is being sorted via ascending
    expect(component.sortEvent.emit).toHaveBeenCalled();
    expect(component.sortEvent.emit).toHaveBeenCalledWith('caseName');

    // check that the case name is being sorted via descending
    caseName.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.sortEvent.emit).toHaveBeenCalled();
    expect(component.sortEvent.emit).toHaveBeenCalledWith('caseName');

    // click the second example button and verify that sorting is for case category
    categoryButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.sortEvent.emit).toHaveBeenCalled();
    expect(component.sortEvent.emit).toHaveBeenCalledWith('caseCategory');

    // click the first example button and verify that sorting is again for case reference
    startDateButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.sortEvent.emit).toHaveBeenCalled();
    expect(component.sortEvent.emit).toHaveBeenCalledWith('startDate');
  });

  describe('act upon deep linking', () => {
    const id = '12345678';

    it('should select appropriate case from location hash', () => {
      const caseItem = { id } as Case;
      wrapper.cases = [caseItem];
      fixture.detectChanges();
      component.setSelectedCase(caseItem);
      expect(component.getSelectedCase()).toEqual(caseItem);
      expect(component.newUrl).toContain(`/#manage_${id}`);
    });

    it('should handle a location hash for a case that does not exist', () => {
      const caseItem = { id: '99999999' } as Case;
      wrapper.cases = [caseItem];
      fixture.detectChanges();
      component.setSelectedCase(caseItem);
      expect(component.getSelectedCase()).toEqual(caseItem);
      expect(component.newUrl).toEqual(`/#manage_${caseItem.id}`);
    });
  });

  describe('generate pagination summary', () => {
    let paginationSummary: HTMLElement;

    beforeEach(() => {
      paginationSummary = fixture.debugElement.nativeElement.querySelector('#search-result-summary__text');
    });

    it('should correctly set the summary text', () => {
      expect(paginationSummary.textContent).toContain('Showing 1 to 2 of 2 results');
    });
  });
});

import { CdkTableModule } from '@angular/cdk/table';
import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { of } from 'rxjs';
import { SessionStorageService } from 'src/app/services';


import { Task } from '../../models/tasks';
import { CaseworkerDataService, WorkAllocationFeatureService, WorkAllocationTaskService } from '../../services';
import { getMockTasks } from '../../tests/utils.spec';
import { TaskListComponent } from '../task-list/task-list.component';
import { MyTasksComponent } from './my-tasks.component';
import { TaskFieldType } from '../../../work-allocation/enums';
import { TaskListRelease2Component } from '../../../work-allocation-2/release2/containers';
import { WorkAllocationModule2 } from 'src/work-allocation-2/work-allocation2.module';

@Component({
  template: `
    <exui-my-tasks></exui-my-tasks>`
})
class WrapperComponent {
  @ViewChild(MyTasksComponent) public appComponentRef: MyTasksComponent;
}

describe('MyTasksComponent', () => {
  let component: MyTasksComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  let router: Router;
  const mockTaskService = jasmine.createSpyObj('mockTaskService', ['searchTask']);
  const mockAlertService = jasmine.createSpyObj('mockAlertService', ['destroy']);
  const mockSessionStorageService = jasmine.createSpyObj('mockSessionStorageService', ['getItem', 'setItem']);
  const mockCaseworkerService = jasmine.createSpyObj('mockCaseworkerService', ['getAll']);
  const mockFeatureService = jasmine.createSpyObj('mockFeatureService', ['getActiveWAFeature']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CdkTableModule,
        ExuiCommonLibModule,
        RouterTestingModule,
        WorkAllocationModule2
      ],
      providers: [
        {provide: WorkAllocationTaskService, useValue: mockTaskService},
        {provide: AlertService, useValue: mockAlertService},
        {provide: SessionStorageService, useValue: mockSessionStorageService},
        {provide: CaseworkerDataService, useValue: mockCaseworkerService},
        {provide: WorkAllocationFeatureService, useValue: mockFeatureService}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    router = TestBed.get(Router);
    const tasks: Task[] = getMockTasks();
    mockTaskService.searchTask.and.returnValue(of({tasks}));
    mockCaseworkerService.getAll.and.returnValue(of([]));
    mockFeatureService.getActiveWAFeature.and.returnValue(of('WorkAllocationRelease1'));
    fixture.detectChanges();
  });


  it('should make a call to load tasks using the default search request', () => {
    const searchRequest = component.getSearchTaskRequest();
    const payload = {searchRequest, view: component.view};
    expect(mockTaskService.searchTask).toHaveBeenCalledWith(payload);
    expect(component.tasks).toBeDefined();
    expect(component.tasks.length).toEqual(2);
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

  it('should handle a click to sort on the caseReference heading', async () => {

    // spyOn(mockSessionStorageService, 'getItem').and.returnValue(JSON.stringify({id: '1'}));
    mockSessionStorageService.getItem.and.returnValue(JSON.stringify({id: '1'}));

    const element = fixture.debugElement.nativeElement;
    const button = element.querySelector('#sort_by_caseId');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const searchRequest = component.getSearchTaskRequest();
    // Make sure the search request looks right.
    expect(searchRequest.search_parameters.length).toEqual(1);
    expect(searchRequest.search_parameters[0].key).toEqual('user');
    expect(searchRequest.search_parameters[0].values).toContain('1');

    expect(searchRequest.sorting_parameters[0].sort_order).toBe('asc');
    expect(searchRequest.sorting_parameters[0].sort_by).toBe('caseId');

    // Let's also make sure that the tasks were re-requested with the new sorting.
    const payload = {searchRequest, view: component.view};
    expect(mockTaskService.searchTask).toHaveBeenCalledWith(payload);

    // Do it all over again to make sure it reverses the order.
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const newSearchRequest = component.getSearchTaskRequest();
    // Make sure the search request looks right.
    expect(newSearchRequest.search_parameters.length).toEqual(1);
    expect(newSearchRequest.search_parameters[0].key).toEqual('user');
    expect(newSearchRequest.search_parameters[0].values).toContain('1'); // Important!

    /*TODO: should be descending*/
    expect(searchRequest.sorting_parameters[0].sort_order).toBe('asc');
    expect(searchRequest.sorting_parameters[0].sort_by).toBe('caseId');

    // Let's also make sure that the tasks were re-requested with the new sorting.
    const newPayload = {searchRequest: newSearchRequest, view: component.view};
    expect(mockTaskService.searchTask).toHaveBeenCalledWith(newPayload);
  });

  it('should not show the footer when there are tasks', () => {
    const element = fixture.debugElement.nativeElement;
    const footerRow = element.querySelector('.footer-row');
    expect(footerRow).toBeDefined();
    const footerRowClass = footerRow.getAttribute('class');
    expect(footerRowClass).toContain('footer-row');
    expect(footerRowClass).not.toContain('shown');
  });

  it('should show the footer when there no tasks', () => {
    spyOnProperty(component, 'tasks').and.returnValue([]);
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
    const navigateSpy = spyOn(router, 'navigate');
    const element = fixture.debugElement.nativeElement;
    // Use the first task.
    const task = component.tasks[0];
    // Click on the Manage + button.
    const manageButton = element.querySelector(`#manage_${task.id}`);
    manageButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    // Use the first action from that task.
    const actionId = task.actions[0].id;
    const actionLink = element.querySelector(`#action_${actionId}`);
    // Click on the action link.
    actionLink.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    // Ensure the correct attempt has been made to navigate.
    expect(navigateSpy).toHaveBeenCalledWith([`/tasks/${task.id}/${actionId}/`], jasmine.any(Object));
  });

  it('should allow setting the release 2 details', () => {
    // verifying fields best way to check as the elements (apart from column names) on page will not change
    mockFeatureService.getActiveWAFeature.and.returnValue(of('WorkAllocationRelease2'));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.fields[0].name).toBe('case_name');
    expect(component.fields[0].type).toBe(TaskFieldType.CASE_NAME);
    expect(component.fields[4].name).toBe('task_title');
    expect(component.fields[4].type).toBe(TaskFieldType.TASK_NAME);
  });
});

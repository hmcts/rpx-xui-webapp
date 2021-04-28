import { CdkTableModule } from '@angular/cdk/table';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { of } from 'rxjs';

import { SessionStorageService } from '../../../app/services';
import { FilterConstants } from '../../components/constants';
import { WorkAllocationComponentsModule } from '../../components/work-allocation.components.module';
import * as dtos from '../../models/dtos';
import { Task } from '../../models/tasks';
import { CaseworkerDisplayName } from '../../pipes';
import { CaseworkerDataService, LocationDataService, WorkAllocationTaskService } from '../../services';
import { getMockCaseworkers, getMockLocations, getMockTasks } from '../../tests/utils.spec';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskManagerListComponent } from './task-manager-list.component';

@Component({
  template: `<exui-task-manager-list></exui-task-manager-list>`
})
class WrapperComponent {
  @ViewChild(TaskManagerListComponent) public appComponentRef: TaskManagerListComponent;
}

describe('TaskManagerListComponent', () => {
  let component: TaskManagerListComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  const mockTaskService = jasmine.createSpyObj('mockTaskService', ['searchTask']);
  const mockCaseworkerService = jasmine.createSpyObj('mockCaseworkerService', ['getAll']);
  const mockLocationService = jasmine.createSpyObj('mockLocationService', ['getLocations']);
  const mockAlertService = jasmine.createSpyObj('mockAlertService', ['destroy']);
  const mockSessionStorageService = jasmine.createSpyObj('mockSessionStorageService', ['getItem', 'setItem']);
  const mockLocations: dtos.Location[] = getMockLocations();
  const mockCaseworkers: dtos.Caseworker[] = getMockCaseworkers();
  const caseworkerDiplayName: CaseworkerDisplayName = new CaseworkerDisplayName();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CdkTableModule,
        ExuiCommonLibModule,
        RouterTestingModule,
        WorkAllocationComponentsModule
      ],
      declarations: [ TaskManagerListComponent, WrapperComponent, TaskListComponent ],
      providers: [
        { provide: WorkAllocationTaskService, useValue: mockTaskService },
        { provide: SessionStorageService, useValue: mockSessionStorageService },
        { provide: CaseworkerDataService, useValue: mockCaseworkerService },
        { provide: LocationDataService, useValue: mockLocationService },
        { provide: AlertService, useValue: mockAlertService }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    const tasks: Task[] = getMockTasks();
    mockTaskService.searchTask.and.returnValue(of({ tasks }));
    mockLocationService.getLocations.and.returnValue(of(mockLocations));
    mockCaseworkerService.getAll.and.returnValue(of(mockCaseworkers));
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    sessionStorage.removeItem(FilterConstants.Session.TaskManager);
  });

  it('should make a call to load tasks using the default search request', () => {
    const searchRequest = component.getSearchTaskRequest();
    const payload = { searchRequest, view: component.view };
    expect(mockTaskService.searchTask).toHaveBeenCalledWith(payload);
    expect(component.tasks).toBeDefined();
    expect(component.tasks.length).toEqual(2);
  });

  it('should have all columns, including "Manage +"', () => {
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
    const element = fixture.debugElement.nativeElement;
    const button = element.querySelector('#sort_by_caseId');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const searchRequest = component.getSearchTaskRequest();
    // Make sure the search request looks right.
    expect(searchRequest.search_parameters.length).toEqual(mockLocations.length);
    expect(searchRequest.search_parameters[0].key).toEqual('location');
    expect(searchRequest.search_parameters[0].values).toContain('a');
    expect(searchRequest.search_parameters[1].key).toEqual('user');
    expect(searchRequest.search_parameters[1].values.length).toEqual(0);

    // Let's also make sure that the tasks were re-requested with the new sorting.
    const payload = { searchRequest, view: component.view };
    expect(mockTaskService.searchTask).toHaveBeenCalledWith(payload);

    // Do it all over again to make sure it reverses the order.
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const newSearchRequest = component.getSearchTaskRequest();
    // Make sure the search request looks right.
    expect(newSearchRequest.search_parameters.length).toEqual(2);
    expect(newSearchRequest.search_parameters[1].key).toEqual('user');
    expect(newSearchRequest.search_parameters[1].values.length).toEqual(0);

    expect(newSearchRequest.sorting_parameters[0].sort_by).toBe('caseId');
    expect(newSearchRequest.sorting_parameters[0].sort_order).toBe('desc'); // Important!

    // Let's also make sure that the tasks were re-requested with the new sorting.
    const newPayload = { searchRequest: newSearchRequest, view: component.view };
    expect(mockTaskService.searchTask).toHaveBeenCalledWith(newPayload);
  });

  it('should handle selecting a location on the filter', async () => {
    const element = fixture.debugElement.nativeElement;
    const select = element.querySelector('#task_assignment_location');
    // First location, rather than 'All locations';
    select.value = select.options[1].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    const searchRequest = component.getSearchTaskRequest();
    // Make sure the search request looks right.
    expect(searchRequest.search_parameters.length).toEqual(2);
    expect(searchRequest.search_parameters[0].key).toEqual('location');
    expect(searchRequest.search_parameters[0].values.length).toEqual(1);
    expect(searchRequest.search_parameters[1].key).toEqual('user');
    expect(searchRequest.search_parameters[1].values.length).toEqual(0);

    // Let's also make sure that the tasks were re-requested with the new sorting.
    const payload = { searchRequest, view: component.view };
    expect(mockTaskService.searchTask).toHaveBeenCalledWith(payload);
  });

  it('should handle selecting a caseworker on the filter', async () => {
    const element = fixture.debugElement.nativeElement;
    const select = element.querySelector('#task_assignment_caseworker');
    // First caseworker, rather than 'All caseworkers' or 'Unassigned'.
    select.value = select.options[2].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    const searchRequest = component.getSearchTaskRequest();
    // Make sure the search request looks right.
    expect(searchRequest.search_parameters.length).toEqual(2);
    expect(searchRequest.search_parameters[1].key).toEqual('user');
    expect(searchRequest.search_parameters[1].values.length).toEqual(1);
    const caseworkerName = caseworkerDiplayName.transform(mockCaseworkers[0], false);
    expect(searchRequest.search_parameters[1].values).toContain('1');

    // Let's also make sure that the tasks were re-requested with the new sorting.
    const payload = { searchRequest, view: component.view };
    expect(mockTaskService.searchTask).toHaveBeenCalledWith(payload);
  });

  it('should handle selecting unassigned on the caseworkers filter', async () => {
    const element = fixture.debugElement.nativeElement;
    const select = element.querySelector('#task_assignment_caseworker');
    // Second entry in the list is "Unassigned".
    select.value = select.options[1].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    const searchRequest = component.getSearchTaskRequest();
    // Make sure the search request looks right.
    expect(searchRequest.search_parameters.length).toEqual(2);
    expect(searchRequest.search_parameters[0].key).toEqual('location');
    expect(searchRequest.search_parameters[0].values.length).toEqual(mockLocations.length);
    expect(searchRequest.search_parameters[1].key).toEqual('user');
    expect(searchRequest.search_parameters[1].values.length).toEqual(0);

    // Let's also make sure that the tasks were re-requested with the new sorting.
    const payload = { searchRequest, view: component.view };
    expect(mockTaskService.searchTask).toHaveBeenCalledWith(payload);
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
});

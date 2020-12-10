import { CdkTableModule } from '@angular/cdk/table';
import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { of } from 'rxjs';

import { WorkAllocationComponentsModule } from '../../components/work-allocation.components.module';
import * as dtos from '../../models/dtos';
import { Task } from '../../models/tasks';
import { getMockCaseworkers, getMockLocations, getMockTasks } from '../../tests/utils.spec';
import { TaskListComponent } from '../task-list/task-list.component';
import { CaseworkerDisplayName } from './../../pipes/caseworker-display-name.pipe';
import { CaseworkerDataService, LocationDataService, WorkAllocationTaskService } from './../../services';
import { TaskManagerListComponent } from './task-manager-list.component';

@Component({
  template: `<exui-task-manager-list></exui-task-manager-list>`
})
class WrapperComponent {
  @ViewChild(TaskManagerListComponent) public appComponentRef: TaskManagerListComponent;
  // TODO: Add inputs for the filtering.
}

describe('AvailableTasksComponent', () => {
  let component: TaskManagerListComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  let location: jasmine.SpyObj<Location>;
  const mockTaskService = jasmine.createSpyObj('mockTaskService', ['searchTask']);
  const mockCaseworkerService = jasmine.createSpyObj('mockCaseworkerService', ['getAll']);
  const mockLocationService = jasmine.createSpyObj('mockLocationService', ['getLocations']);
  const mockLocations: dtos.Location[] = getMockLocations();
  const mockCaseworkers: dtos.Caseworker[] = getMockCaseworkers();
  const caseworkerDiplayName: CaseworkerDisplayName = new CaseworkerDisplayName();

  beforeEach(() => {
    location = jasmine.createSpyObj('Location', ['path']);
    location.path.and.returnValue('');
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
        { provide: Location, useValue: location },
        { provide: CaseworkerDataService, useValue: mockCaseworkerService },
        { provide: LocationDataService, useValue: mockLocationService }
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
  });

  it('should make a call to load tasks using the default search request', () => {
    const defaultSearchRequest = component.getSearchTaskRequest();
    expect(mockTaskService.searchTask).toHaveBeenCalledWith(defaultSearchRequest);
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
      expect(headerCells[i].textContent).toEqual(fields[i].columnLabel);
    }
    // Make sure Manage + heading is blank.
    expect(headerCells[headerCells.length - 1].textContent.trim()).toEqual('');
  });

  it('should handle a click to sort on the caseReference heading', async () => {
    const element = fixture.debugElement.nativeElement;
    const button = element.querySelector('#sort_by_caseReference');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const searchRequest = component.getSearchTaskRequest();
    // Make sure the search request looks right.
    expect(searchRequest.search_parameters.length).toEqual(3);
    expect(searchRequest.search_parameters[0].key).toEqual('caseReference');
    expect(searchRequest.search_parameters[0].values).toContain('ascending');
    expect(searchRequest.search_parameters[1].key).toEqual('location');
    expect(searchRequest.search_parameters[1].values.length).toEqual(mockLocations.length);
    expect(searchRequest.search_parameters[2].key).toEqual('assignee');
    expect(searchRequest.search_parameters[2].values.length).toEqual(mockCaseworkers.length);

    // Let's also make sure that the tasks were re-requested with the new sorting.
    expect(mockTaskService.searchTask).toHaveBeenCalledWith(searchRequest);

    // Do it all over again to make sure it reverses the order.
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const newSearchRequest = component.getSearchTaskRequest();
    // Make sure the search request looks right.
    expect(newSearchRequest.search_parameters.length).toEqual(3);
    expect(newSearchRequest.search_parameters[0].key).toEqual('caseReference');
    expect(newSearchRequest.search_parameters[0].values).toContain('descending'); // Important!
    expect(newSearchRequest.search_parameters[1].key).toEqual('location');
    expect(newSearchRequest.search_parameters[1].values.length).toEqual(mockLocations.length);
    expect(newSearchRequest.search_parameters[2].key).toEqual('assignee');
    expect(newSearchRequest.search_parameters[2].values.length).toEqual(mockCaseworkers.length);

    // Let's also make sure that the tasks were re-requested with the new sorting.
    expect(mockTaskService.searchTask).toHaveBeenCalledWith(newSearchRequest);
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
    expect(searchRequest.search_parameters.length).toEqual(3);
    expect(searchRequest.search_parameters[1].key).toEqual('location');
    expect(searchRequest.search_parameters[1].values.length).toEqual(1);
    expect(searchRequest.search_parameters[1].values).toContain(mockLocations[0].locationName);
    expect(searchRequest.search_parameters[2].key).toEqual('assignee');
    expect(searchRequest.search_parameters[2].values.length).toEqual(mockCaseworkers.length);

    // Let's also make sure that the tasks were re-requested with the new sorting.
    expect(mockTaskService.searchTask).toHaveBeenCalledWith(searchRequest);
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
    expect(searchRequest.search_parameters.length).toEqual(3);
    expect(searchRequest.search_parameters[1].key).toEqual('location');
    expect(searchRequest.search_parameters[1].values.length).toEqual(mockLocations.length);
    expect(searchRequest.search_parameters[2].key).toEqual('assignee');
    expect(searchRequest.search_parameters[2].values.length).toEqual(1);
    const caseworkerName = caseworkerDiplayName.transform(mockCaseworkers[0]);
    expect(searchRequest.search_parameters[2].values).toContain(caseworkerName);

    // Let's also make sure that the tasks were re-requested with the new sorting.
    expect(mockTaskService.searchTask).toHaveBeenCalledWith(searchRequest);
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
    expect(searchRequest.search_parameters.length).toEqual(3);
    expect(searchRequest.search_parameters[1].key).toEqual('location');
    expect(searchRequest.search_parameters[1].values.length).toEqual(mockLocations.length);
    expect(searchRequest.search_parameters[2].key).toEqual('assignee');
    expect(searchRequest.search_parameters[2].values.length).toEqual(0);

    // Let's also make sure that the tasks were re-requested with the new sorting.
    expect(mockTaskService.searchTask).toHaveBeenCalledWith(searchRequest);
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

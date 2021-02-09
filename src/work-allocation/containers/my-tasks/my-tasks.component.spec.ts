import { CdkTableModule } from '@angular/cdk/table';
import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { of } from 'rxjs';
import { SessionStorageService } from 'src/app/services';

import { WorkAllocationComponentsModule } from '../../components/work-allocation.components.module';
import { Task } from '../../models/tasks';
import { WorkAllocationTaskService } from '../../services';
import { getMockCaseworkers, getMockTasks } from '../../tests/utils.spec';
import { TaskListComponent } from '../task-list/task-list.component';
import { MyTasksComponent } from './my-tasks.component';

@Component({
  template: `<exui-my-tasks></exui-my-tasks>`
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CdkTableModule,
        ExuiCommonLibModule,
        RouterTestingModule,
        WorkAllocationComponentsModule
      ],
      declarations: [ MyTasksComponent, WrapperComponent, TaskListComponent ],
      providers: [
        { provide: WorkAllocationTaskService, useValue: mockTaskService },
        { provide: AlertService, useValue: mockAlertService },
        { provide: SessionStorageService, useValue: mockSessionStorageService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    router = TestBed.get(Router);
    const tasks: Task[] = getMockTasks();
    mockTaskService.searchTask.and.returnValue(of({ tasks }));
    fixture.detectChanges();
  });

  // TODO: Need to ensure testing of all sorting/searching parameters implemented correctly

  it('should make a call to load tasks using the default search request', () => {
    const searchRequest = component.getSearchTaskRequest();
    const payload = { searchRequest, view: component.view };
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

  // TODO: Re-implement test and pass

  /* it('should handle a click to sort on the caseReference heading', async () => {

    spyOn(mockSessionStorageService, 'getItem').and.returnValue(JSON.stringify({id: '1'}));

    const element = fixture.debugElement.nativeElement;
    const button = element.querySelector('#sort_by_caseReference');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const searchRequest = component.getSearchTaskRequest();
    // Make sure the search request looks right.
    expect(searchRequest.search_parameters.length).toEqual(2);
    expect(searchRequest.search_parameters[0].key).toEqual('caseReference');
    expect(searchRequest.search_parameters[0].values).toContain('ascending');
    expect(searchRequest.search_parameters[1].key).toEqual('assignee');
    expect(searchRequest.search_parameters[1].values).toContain('John Smith');

    // Let's also make sure that the tasks were re-requested with the new sorting.
    const payload = { searchRequest, view: component.view };
    expect(mockTaskService.searchTask).toHaveBeenCalledWith(payload);

    // Do it all over again to make sure it reverses the order.
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const newSearchRequest = component.getSearchTaskRequest();
    // Make sure the search request looks right.
    expect(newSearchRequest.search_parameters.length).toEqual(2);
    expect(newSearchRequest.search_parameters[0].key).toEqual('caseReference');
    expect(newSearchRequest.search_parameters[0].values).toContain('descending'); // Important!
    expect(newSearchRequest.search_parameters[1].key).toEqual('assignee');
    expect(newSearchRequest.search_parameters[1].values).toContain('John Smith');

    // Let's also make sure that the tasks were re-requested with the new sorting.
    const newPayload = { searchRequest: newSearchRequest, view: component.view };
    expect(mockTaskService.searchTask).toHaveBeenCalledWith(newPayload);
  }); */

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
});

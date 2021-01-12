import { CdkTableModule } from '@angular/cdk/table';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { of, throwError } from 'rxjs';

import { WorkAllocationComponentsModule } from '../../components/work-allocation.components.module';
import { InfoMessage, InfoMessageType, TaskActionIds } from '../../enums';
import { InformationMessage } from '../../models/comms';
import * as dtos from '../../models/dtos';
import { InvokedTaskAction, Task } from '../../models/tasks';
import { InfoMessageCommService, LocationDataService, WorkAllocationTaskService } from '../../services';
import { getMockLocations, getMockTasks } from '../../tests/utils.spec';
import { TaskListComponent } from '../task-list/task-list.component';
import { AvailableTasksComponent } from './available-tasks.component';

@Component({
  template: `<exui-available-tasks></exui-available-tasks>`
})
class WrapperComponent {
  @ViewChild(AvailableTasksComponent) public appComponentRef: AvailableTasksComponent;
}

describe('AvailableTasksComponent', () => {
  let component: AvailableTasksComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  const mockLocationService = jasmine.createSpyObj('mockLocationService', ['getLocations']);
  const mockLocations: dtos.Location[] = getMockLocations();
  const mockTaskService = jasmine.createSpyObj('mockTaskService', ['searchTask', 'claimTask']);
  const MESSAGE_SERVICE_METHODS = ['addMessage', 'emitMessages', 'getMessages', 'nextMessage', 'removeAllMessages'];
  const mockInfoMessageCommService = jasmine.createSpyObj('mockInfoMessageCommService', MESSAGE_SERVICE_METHODS);
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  const mockAlertService = jasmine.createSpyObj('mockAlertService', ['destroy']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CdkTableModule,
        ExuiCommonLibModule,
        RouterTestingModule,
        WorkAllocationComponentsModule
      ],
      declarations: [ AvailableTasksComponent, WrapperComponent, TaskListComponent ],
      providers: [
        { provide: WorkAllocationTaskService, useValue: mockTaskService },
        { provide: LocationDataService, useValue: mockLocationService },
        { provide: Router, useValue: mockRouter },
        { provide: InfoMessageCommService, useValue: mockInfoMessageCommService },
        { provide: AlertService, useValue: mockAlertService }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    mockLocationService.getLocations.and.returnValue(of(mockLocations));
    const tasks: Task[] = getMockTasks();
    mockTaskService.searchTask.and.returnValue(of({ tasks }));
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
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
    expect(searchRequest.search_parameters[2].key).toEqual('assignee');

    // Let's also make sure that the tasks were re-requested with the new sorting.
    const payload = { searchRequest, view: component.view };
    expect(mockTaskService.searchTask).toHaveBeenCalledWith(payload);

    // Do it all over again to make sure it reverses the order.
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const newSearchRequest = component.getSearchTaskRequest();
    // Make sure the search request looks right.
    expect(newSearchRequest.search_parameters.length).toEqual(3);
    expect(newSearchRequest.search_parameters[0].key).toEqual('caseReference');
    expect(newSearchRequest.search_parameters[0].values).toContain('descending'); // Important!
    expect(newSearchRequest.search_parameters[1].key).toEqual('location');
    expect(newSearchRequest.search_parameters[2].key).toEqual('assignee');

    // Let's also make sure that the tasks were re-requested with the new sorting.
    const newPayload = { searchRequest: newSearchRequest, view: component.view };
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

  it('should show the footer when there are no tasks', () => {
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

  it('should load tasks when the a new location selection is applied', () => {
    const element = fixture.debugElement.nativeElement;

    // Click on the summary.
    const summary = element.querySelector('#toggleFilter');
    summary.dispatchEvent(new Event('click'));

    // Now click on the "Select all" option.
    const selectAll = element.querySelector('#select_all');
    selectAll.dispatchEvent(new Event('change'));

    // And NOW click on "Apply".
    const apply = element.querySelector('#applyFilter');
    apply.dispatchEvent(new Event('click'));

    const searchRequest = component.getSearchTaskRequest();
    // Make sure the search request looks right.
    expect(searchRequest.search_parameters.length).toEqual(3);
    expect(searchRequest.search_parameters[0].operator).toEqual('sort');
    expect(searchRequest.search_parameters[1].key).toEqual('location');
    for (const loc of mockLocations) {
      expect(searchRequest.search_parameters[1].values).toContain(loc.locationName);
    }
    expect(searchRequest.search_parameters[2].key).toEqual('assignee');

    // Let's also make sure that the tasks were re-requested with the new sorting.
    const payload = { searchRequest, view: component.view };
    expect(mockTaskService.searchTask).toHaveBeenCalledWith(payload);
  });

  describe('claimTask()', () => {

    it('should call claimTask on the taskService with the taskId, so that the User can claim the task.', () => {

      mockTaskService.claimTask.and.returnValue(of({}));

      const taskId = '123456';
      component.claimTask(taskId);

      expect(mockTaskService.claimTask).toHaveBeenCalledWith(taskId);
    });

    it('should emit a Success information message, so that the User can see that they have claimed a task successfully.', () => {

      mockTaskService.claimTask.and.returnValue(of({}));

      const message: InformationMessage = {
        type: InfoMessageType.SUCCESS,
        message: InfoMessage.ASSIGNED_TASK_AVAILABLE_IN_MY_TASKS,
      };

      const taskId = '123456';
      component.claimTask(taskId);

      expect(mockInfoMessageCommService.nextMessage).toHaveBeenCalledWith(message);
    });

    it('should call claimTaskErrors() with the error\'s status code, so that the User can see that the claim of ' +
      'a task has been unsuccessful.', () => {

      const errorStatusCode = 400;

      const claimTaskErrorsSpy = spyOn(component, 'claimTaskErrors');

      mockTaskService.claimTask.and.returnValue(throwError({status: errorStatusCode}));

      const taskId = '123456';
      component.claimTask(taskId);

      expect(claimTaskErrorsSpy).toHaveBeenCalledWith(errorStatusCode);
    });
  });

  describe('claimTaskAndGo()', () => {

    it('should call claimTask on the taskService with the taskId, so that the User can claim the task.', () => {

      mockTaskService.claimTask.and.returnValue(of({}));

      const firstTask = getMockTasks()[1];
      component.claimTaskAndGo(firstTask);

      expect(mockTaskService.claimTask).toHaveBeenCalledWith(firstTask.id);
    });

    it('should call claimTask on the taskService with the taskId, so that the User can claim the task.', () => {
      const firstTask = getMockTasks()[1];
      component.claimTaskAndGo(firstTask);
      expect(mockRouter.navigate).toHaveBeenCalledWith([`/cases/case-details/${firstTask.id}`], {
        state: {
          showMessage: true,
          messageText: InfoMessage.ASSIGNED_TASK_AVAILABLE_IN_MY_TASKS}
    });
  });

    it('should call claimTaskErrors() with the error\'s status code, so that the User can see that the claim of ' +
      'a task has been unsuccessful.', () => {

      const errorStatusCode = 400;

      const claimTaskErrorsSpy = spyOn(component, 'claimTaskErrors');

      mockTaskService.claimTask.and.returnValue(throwError({status: errorStatusCode}));

      const firstTask = getMockTasks()[1];
      component.claimTaskAndGo(firstTask);

      expect(claimTaskErrorsSpy).toHaveBeenCalledWith(errorStatusCode);
    });
  });

  describe('claimTaskErrors()', () => {

    it('should make a call to navigate the user to the /service-down page, if the error status code is 500.', () => {

      component.claimTaskErrors(500);

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/service-down']);
    });

    it('should make a call to navigate the user to the /not-authorised page, if the error status code is 401.', () => {

      component.claimTaskErrors(401);

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/not-authorised']);
    });

    it('should make a call to navigate the user to the /not-authorised page, if the error status code is 403.', () => {

      component.claimTaskErrors(403);

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/not-authorised']);
    });

    it('should refresh the tasks if the error status code is 400.', () => {
      const refreshTasksSpy = spyOn(component, 'refreshTasks');
      component.claimTaskErrors(400);
      expect(refreshTasksSpy).toHaveBeenCalled();
    });

    // TODO: Parking for now, for some reason the fixture.destory is not cleaning up
    // calls to functions from other tests.
    // it('should emit the Warning information message, if the error status code is 400.', () => {
    //
    //   const message: InformationMessage = {
    //     type: InfoMessageType.WARNING,
    //     message: InfoMessage.ASSIGNED_TASK_AVAILABLE_IN_MY_TASKS,
    //   };
    //
    //   component.claimTaskErrors(400);
    //
    //   expect(mockInfoMessageCommService.emitInfoMessageChange).toHaveBeenCalledWith(message);
    // });
  });

  describe('onActionHandler()', () => {

    it('should call claimTask with the task id, so that the task can be \'claimed\' by the User.', () => {

      const claimTaskSpy = spyOn(component, 'claimTask');

      const TASK_ID = '2345678901234567';
      const taskAction: InvokedTaskAction = {
        action: {
          id: TaskActionIds.CLAIM,
          title: 'Assign to me',
        },
        task: {
          id: TASK_ID,
          caseReference: '2345 6789 0123 4567',
          caseName: 'Mankai Lit',
          caseCategory: 'Revocation',
          location: 'Taylor House',
          taskName: 'Review appellant case',
          dueDate: new Date(1604506789000),
          actions: [ {
            id: TaskActionIds.CLAIM,
            title: 'Assign to me',
          } ]
        }
      };

      component.onActionHandler(taskAction);

      expect(claimTaskSpy).toHaveBeenCalledWith(TASK_ID);
    });
  });
});

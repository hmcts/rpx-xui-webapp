import { CdkTableModule } from '@angular/cdk/table';
import { Component, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoadingService, PaginationModule } from '@hmcts/ccd-case-ui-toolkit';
import { of } from 'rxjs';
import { PaginationParameter } from 'src/work-allocation/models/dtos';

import { ConfigConstants } from '../../components/constants';
import { WorkAllocationComponentsModule } from '../../components/work-allocation.components.module';
import { TaskService, TaskSort } from '../../enums';
import { Task, TaskAction, TaskFieldConfig, TaskServiceConfig, TaskSortField } from '../../models/tasks';
import { WorkAllocationTaskService } from '../../services';
import { getMockTasks, MockRouter } from '../../tests/utils.spec';
import { TaskListComponent } from './task-list.component';

@Component({
  template: `
    <exui-task-list
      [fields]='fields'
      [tasks]='tasks'
      [tasksTotal]="tasksTotal"
      [taskServiceConfig]="taskServiceConfig"
      [sortedBy]="TaskSortField"
      [pagination]="pagination"></exui-task-list>`
})
class WrapperComponent {
  @ViewChild(TaskListComponent) public appComponentRef: TaskListComponent;
  @Input() public fields: TaskFieldConfig[];
  @Input() public tasks: Task[];
  @Input() public tasksTotal: number;
  @Input() public taskServiceConfig: TaskServiceConfig;
  @Input() public pagination: PaginationParameter;
  @Input() public sortedBy: TaskSortField;
}

/**
 * Mock tasks
 */
function getTasks(): Task[] {
  return getMockTasks();
}

/**
 * Mock fields
 */
function getFields(): TaskFieldConfig[] {
  return ConfigConstants.AvailableTasks;
}

/**
 * Mock TaskServiceConfig.
 */
function getTaskService(): TaskServiceConfig {
  return {
    service: TaskService.IAC,
    defaultSortDirection: TaskSort.ASC,
    defaultSortFieldName: 'dueDate',
    fields: getFields(),
  };
}

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;
  let routerSpy: jasmine.SpyObj<any>;
  const mockRouter: MockRouter = new MockRouter();
  const mockWorkAllocationService = jasmine.createSpyObj('mockWorkAllocationService', ['getTask']);
  const mockLoadingService = jasmine.createSpyObj('mockLoadingService', ['register', 'unregister']);
  beforeEach((() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      imports: [
        WorkAllocationComponentsModule,
        CdkTableModule,
        PaginationModule
      ],
      declarations: [TaskListComponent, WrapperComponent],
      providers: [
        { provide: WorkAllocationTaskService, useValue: mockWorkAllocationService },
        { provide: Router, useValue: mockRouter },
        { provide: LoadingService, useValue: mockLoadingService }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;

    wrapper.tasks = getTasks();
    wrapper.fields = getFields();
    wrapper.taskServiceConfig = getTaskService();
    wrapper.tasksTotal = 2;
    wrapper.pagination = {
      page_number: 1,
      page_size: 10
    };

    mockWorkAllocationService.getTask.and.returnValue(of({}));
    mockLoadingService.isLoading = of(false);
    fixture.detectChanges();
  }));

  it('should return the fields as an array with a \'manage\' entry, so that we can' +
    'display the manage column in the table.', async () => {

    const fields = ['caseReference', 'caseName', 'caseCategory', 'location', 'task', 'dueDate'];
    const fieldsWithManage = [...fields, 'manage'];

    expect(component.addManageColumn(fields)).toEqual(fieldsWithManage);
  });

  it('should return the columns to be displayed by the Angular Component Dev Kit table.', async () => {

    // create mock getDisplayedColumn variables
    const taskFieldConfig = getFields();
    const fields = taskFieldConfig.map(field => field.name);
    const displayedColumns = component.addManageColumn(fields);

    // test actual function against mock variables
    expect(component.getDisplayedColumn(taskFieldConfig)).toEqual(displayedColumns);

  });

  it('should take in the field name and trigger a new Request to the API to get a sorted result set.', async () => {

    // mock the emitter and dispatch the connected event
    spyOn(component.sortEvent, 'emit');
    const element = fixture.debugElement.nativeElement;
    const button = element.querySelector('#sort_by_caseId');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // check the emitter had been called and that it gets called with the first field which is caseReference (caseId)
    expect(component.sortEvent.emit).toHaveBeenCalled();
    expect(component.sortEvent.emit).toHaveBeenCalledWith('caseId');
  });

  it('should allow sorting for different columns.', async () => {

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
    button = element.querySelector('#sort_by_taskTitle');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // check the emitter had been called and that it gets called with the new field defined which is taskName
    expect(component.sortEvent.emit).toHaveBeenCalled();
    expect(component.sortEvent.emit).toHaveBeenCalledWith('taskTitle');

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
    const firstTaskId: string = getTasks()[0].id;
    const secondTaskId: string = getTasks()[1].id;

    // get the 'manage' button and click it
    let element = fixture.debugElement.nativeElement;
    let button = element.querySelector(`#manage_${firstTaskId}`);
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // get the selected row and confirm it is not null
    const firstRow = component.getSelectedTask();
    expect(component.getSelectedTask()).not.toBe(null);

    // click the 'manage' button again and confirm that it is null
    element = fixture.debugElement.nativeElement;
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.getSelectedTask()).toBe(null);

    // click the button one last time and confirm selected and equal to earlier given row
    element = fixture.debugElement.nativeElement;
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.getSelectedTask()).not.toBe(null);
    expect(component.getSelectedTask()).toEqual(firstRow);
    expect(firstRow.id).toEqual(firstTaskId);

    // click the button for the second task
    element = fixture.debugElement.nativeElement;
    button = element.querySelector(`#manage_${secondTaskId}`);
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // get the selected row and confirm it is not null and is the secondTaskId
    const secondRow = component.getSelectedTask();
    expect(component.getSelectedTask()).not.toBe(null);
    expect(secondRow.id).toEqual(secondTaskId);
  });

  it('should allow setting the selected row.', async () => {
    const firstTaskId: string = getTasks()[0].id;
    const secondTaskId: string = getTasks()[1].id;

    // get the 'manage' button and click it
    let element = fixture.debugElement.nativeElement;
    const firstButton = element.querySelector(`#manage_${firstTaskId}`);
    const secondButton = element.querySelector(`#manage_${secondTaskId}`);
    firstButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // get the selected row and confirm it is not null
    const firstRow = component.getSelectedTask();
    expect(component.getSelectedTask()).not.toBe(null);

    // click the 'manage' button again and confirm that it is null
    element = fixture.debugElement.nativeElement;
    firstButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.getSelectedTask()).toBe(null);

    // set the selected row as the earlier defined row
    component.setSelectedTask(firstRow);
    fixture.detectChanges();
    expect(component.getSelectedTask()).not.toBe(null);
    expect(component.getSelectedTask()).toEqual(firstRow);
    expect(firstRow.id).toEqual(firstTaskId);

    // click the 'manage' button again and confirm that it is selected
    element = fixture.debugElement.nativeElement;
    secondButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const secondRow = component.getSelectedTask();
    expect(component.getSelectedTask()).not.toBe(null);

    // set the selected row as the earlier defined row
    component.setSelectedTask(firstRow);
    fixture.detectChanges();
    expect(component.getSelectedTask()).not.toBe(null);
    expect(component.getSelectedTask()).toEqual(firstRow);
    expect(firstRow.id).toEqual(firstTaskId);

    // set the selected row as the later defined row
    component.setSelectedTask(secondRow);
    fixture.detectChanges();
    expect(component.getSelectedTask()).not.toBe(null);
    expect(component.getSelectedTask()).toEqual(secondRow);
    expect(secondRow.id).toEqual(secondTaskId);

    // click selected row again and confirm null
    component.setSelectedTask(secondRow);
    fixture.detectChanges();
    expect(component.getSelectedTask()).toBe(null);
  });

  it('should allow checking the selected row.', async () => {
    const firstTaskId: string = getTasks()[0].id;
    const secondTaskId: string = getTasks()[1].id;

    // get the 'manage' button and click it
    let element = fixture.debugElement.nativeElement;
    const firstButton = element.querySelector(`#manage_${firstTaskId}`);
    const secondButton = element.querySelector(`#manage_${secondTaskId}`);
    firstButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // get the selected row and confirm it is not null
    const firstRow = component.getSelectedTask();
    expect(component.getSelectedTask()).not.toBe(null);

    // expect the row to be selected
    expect(component.isTaskSelected(firstRow)).toBeTruthy();

    // click the 'manage' button for the second row and confirm that initial row is not selected
    element = fixture.debugElement.nativeElement;
    secondButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const secondRow = component.getSelectedTask();
    expect(component.isTaskSelected(firstRow)).toBeFalsy();
    expect(component.isTaskSelected(secondRow)).toBeTruthy();

    // click the 'manage' button for the initial row and confirm that second row is not selected
    element = fixture.debugElement.nativeElement;
    firstButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.isTaskSelected(firstRow)).toBeTruthy();
    expect(component.isTaskSelected(secondRow)).toBeFalsy();

    // click the 'manage' button for the initial row and confirm that neither are selected
    element = fixture.debugElement.nativeElement;
    firstButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.isTaskSelected(firstRow)).toBeFalsy();
    expect(component.isTaskSelected(secondRow)).toBeFalsy();
  });

  it('should trigger an event to the parent when the User clicks on an action.', async () => {
    // set relevant variables
    const firstTask: Task = getTasks()[0];
    const secondTask: Task = getTasks()[1];
    const firstTaskId: string = firstTask.id;
    const secondTaskId: string = secondTask.id;
    const firstAction: TaskAction = getTasks()[0].actions[0];
    const secondAction: TaskAction = getTasks()[0].actions[1];
    const firstActionId: string = firstAction.id;
    const secondActionId: string = secondAction.id;


    // mock the emitter and click the first manage button
    spyOn(component.actionEvent, 'emit');
    const element = fixture.debugElement.nativeElement;
    const firstButton = element.querySelector(`#manage_${firstTaskId}`);
    const secondButton = element.querySelector(`#manage_${secondTaskId}`);
    firstButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // check the emitter had been called and that it gets called with the first invoked task action
    const firstAnchor = element.querySelector(`#action_${firstActionId}`);
    firstAnchor.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.actionEvent.emit).toHaveBeenCalled();
    let task = firstTask;
    let action = firstAction;
    expect(component.actionEvent.emit).toHaveBeenCalledWith({task, action});

    // check the emitter had been called and that it gets called with the second invoked task action
    const secondAnchor = element.querySelector(`#action_${secondActionId}`);
    secondAnchor.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.actionEvent.emit).toHaveBeenCalled();
    task = firstTask;
    action = secondAction;
    expect(component.actionEvent.emit).toHaveBeenCalledWith({task, action});

    // click the second button in order to show the last action anchor
    secondButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // check the emitter had been called and that it gets called with the third invoked task action
    const thirdAnchor = element.querySelector(`#action_${secondActionId}`);
    thirdAnchor.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.actionEvent.emit).toHaveBeenCalled();
    task = secondTask;
    action = secondAction;
    expect(component.actionEvent.emit).toHaveBeenCalledWith({task, action});
  });

  it('should allow a check to verify whether column sorted.', async () => {
    // mock the emitter and dispatch the connected event (with example case field buttons selected)
    spyOn(component.sortEvent, 'emit');
    const element = fixture.debugElement.nativeElement;
    const referenceButton = element.querySelector('#sort_by_caseId');
    const categoryButton = element.querySelector('#sort_by_caseCategory');
    const dueDateButton = element.querySelector('#sort_by_dueDate');
    referenceButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // check the case reference is being sorted via ascending
    expect(component.sortEvent.emit).toHaveBeenCalled();
    expect(component.sortEvent.emit).toHaveBeenCalledWith('caseId');

    // check that the case reference is being sorted via descending
    referenceButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.sortEvent.emit).toHaveBeenCalled();
    expect(component.sortEvent.emit).toHaveBeenCalledWith('caseId');

    // click the second example button and verify that sorting is for case category
    categoryButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.sortEvent.emit).toHaveBeenCalled();
    expect(component.sortEvent.emit).toHaveBeenCalledWith('caseCategory');

    // click the first example button and verify that sorting is again for case reference
    dueDateButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.sortEvent.emit).toHaveBeenCalled();
    expect(component.sortEvent.emit).toHaveBeenCalledWith('dueDate');
  });

  describe('act upon deep linking', () => {
    const id = '12345678';

    it('should select appropriate task from location hash', () => {
      spyOnProperty(mockRouter, 'url', 'get').and.returnValue(`taskList#manage_${id}`);
      const navigateCallsBefore = mockRouter.navigateCalls.length;
      const task = { id } as Task;
      wrapper.tasks = [ task ];
      fixture.detectChanges();
      expect(component.getSelectedTask()).toEqual(task);
      expect(mockRouter.navigateCalls.length).toBeGreaterThan(navigateCallsBefore);
      const lastNavigateCall = mockRouter.navigateCalls.pop();
      expect(lastNavigateCall).toBeDefined();
      expect(lastNavigateCall.commands).toEqual([ 'taskList' ]);
      expect(lastNavigateCall.extras).toEqual({ fragment: `manage_${id}` });
    });

    it('should handle a location hash for a task that does not exist', () => {
      spyOnProperty(mockRouter, 'url', 'get').and.returnValue(`taskList#manage_${id}`);
      const navigateCallsBefore = mockRouter.navigateCalls.length;
      const task = { id: '99999999' } as Task;
      wrapper.tasks = [ task ];
      fixture.detectChanges();
      expect(component.getSelectedTask()).toBeNull();
      expect(mockRouter.navigateCalls.length).toBeGreaterThan(navigateCallsBefore);
      const lastNavigateCall = mockRouter.navigateCalls.pop();
      expect(lastNavigateCall).toBeDefined();
      expect(lastNavigateCall.commands).toEqual([ 'taskList' ]);
      expect(lastNavigateCall.extras).toBeUndefined();
    });
  });

  describe('generate pagination summary', () => {
    let paginationSummary: HTMLElement;

    beforeEach(() => {
      paginationSummary = fixture.debugElement.nativeElement.querySelector('#search-result-summary__text');
    });

    it('should correctly set the summary text', () => {
      expect(paginationSummary.textContent).toContain('Displaying 1 - 2 out of 2 tasks');
    });
  });
});

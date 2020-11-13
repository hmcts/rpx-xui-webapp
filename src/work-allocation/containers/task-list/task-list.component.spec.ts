import {Component, Input, Output, ViewChild} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {Task, TaskFieldConfig} from './../../models/tasks';
import {WorkAllocationComponentsModule} from 'src/work-allocation/components/work-allocation.components.module';
import {TaskListComponent} from './task-list.component';
import {TaskFieldType, TaskView} from '../../enums';
import {CdkTableModule} from '@angular/cdk/table';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <exui-task-list [fields]='fields' [tasks]='tasks'></exui-task-list>`
})
class WrapperComponent {
  @ViewChild(TaskListComponent) public appComponentRef: TaskListComponent;
  @Input() public fields: TaskFieldConfig[];
  @Input() public tasks: Task[];
}

/**
 * Mock tasks
 */
function getTasks(): Task[] {

  return [
    {
      id: '1549476532065586',
      caseReference: '1549 4765 3206 5586',
      caseName: 'Kili Muso',
      caseCategory: 'Protection',
      location: 'Taylor House',
      taskName: 'Review respondent evidence',
      dueDate: new Date(628021800000),
      actions: [
        {
          id: 'actionId',
          title: 'Reassign task',
        },
        {
          id: 'actionId',
          title: 'Release this task',
        }
      ]
    },
    {
      id: '1549476532065586',
      caseReference: '1549 4765 3206 5586',
      caseName: 'Mankai Lit',
      caseCategory: 'Revocation',
      location: 'Taylor House',
      taskName: 'Review appellant case',
      dueDate: new Date(628021800000),
      actions: [
        {
          id: 'actionId',
          title: 'Release this task',
        }
      ]
    },
  ];
}

/**
 * Mock fields
 */
function getFields(): TaskFieldConfig[] {

  return [
    {
      name: 'caseReference',
      type: TaskFieldType.STRING,
      columnLabel: 'Case reference',
      views: TaskView.TASK_LIST,
    },
    {
      name: 'caseName',
      type: TaskFieldType.STRING,
      columnLabel: 'Case name',
      views: TaskView.TASK_LIST,
    },
    {
      name: 'caseCategory',
      type: TaskFieldType.STRING,
      columnLabel: 'Case category',
      views: TaskView.TASK_LIST,
    },
    {
      name: 'location',
      type: TaskFieldType.STRING,
      columnLabel: 'Location',
      views: TaskView.TASK_LIST,
    },
    {
      name: 'taskName',
      type: TaskFieldType.STRING,
      columnLabel: 'Task',
      views: TaskView.TASK_LIST,
    },
    {
      name: 'dueDate',
      type: TaskFieldType.STRING,
      columnLabel: 'Due Dated',
      views: TaskView.TASK_LIST,
    },
  ];
}

fdescribe('TaskListComponent', () => {
  let component: TaskListComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        WorkAllocationComponentsModule,
        CdkTableModule
      ],
      declarations: [TaskListComponent, WrapperComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;

    wrapper.tasks = getTasks();
    wrapper.fields = getFields();

    fixture.detectChanges();
  });

  // Unit test works fine to test a pure function
  it('should be able to hit shouldReturnTrue function', async () => {

    expect(component.shouldReturnTrue()).toBeTruthy();
  });

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
    const button = element.querySelector('button');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // check the emitter had been called and that it gets called with the first field which is caseReference
    expect(component.sortEvent.emit).toHaveBeenCalled();
    expect(component.sortEvent.emit).toHaveBeenCalledWith('caseReference');
  });

  it('should open and close the selected row.', async () => {

    // get the 'manage' button and click it
    let element = fixture.debugElement.nativeElement;
    const button = element.querySelector('#manage');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // get the selected row and confirm it is not null
    const row = component.getSelectedRow();
    expect(component.getSelectedRow()).not.toBe(null);

    // click the 'manage' button again and confirm that it is null
    element = fixture.debugElement.nativeElement;
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.getSelectedRow()).toBe(null);

    // click the button one last time and confirm selected and equal to earlier given row
    element = fixture.debugElement.nativeElement;
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.getSelectedRow()).not.toBe(null);
    expect(component.getSelectedRow()).toEqual(row);
  });

  it('should allow setting the selected row.', async () => {

    // get the 'manage' button and click it
    let element = fixture.debugElement.nativeElement;
    const button = element.querySelector('#manage');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // get the selected row and confirm it is not null
    const row = component.getSelectedRow();
    expect(component.getSelectedRow()).not.toBe(null);

    // click the 'manage' button again and confirm that it is null
    element = fixture.debugElement.nativeElement;
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.getSelectedRow()).toBe(null);

    // set the selected row as the earlier defined row
    component.setSelectedRow(row);
    fixture.detectChanges();
    expect(component.getSelectedRow()).not.toBe(null);
    expect(component.getSelectedRow()).toEqual(row);
  });

  it('should allow checking the selected row.', async () => {

    // get the 'manage' button and click it
    let element = fixture.debugElement.nativeElement;
    const button = element.querySelector('#manage');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // get the selected row and confirm it is not null
    const row = component.getSelectedRow();
    expect(component.getSelectedRow()).not.toBe(null);

    // expect the row to be selected
    expect(component.isRowSelected(row)).toBeTruthy();

    // click the 'manage' button again and confirm that row is not selected
    element = fixture.debugElement.nativeElement;
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.isRowSelected(row)).toBeFalsy();
  });

  /*it('should trigger an event to the parent when the User clicks on a Manage action.', async () => {

    // mock the emitter and dispatch the connected event
    spyOn(component.actionEvent, 'emit');
    const element = fixture.debugElement.nativeElement;
    const button = element.querySelector('button');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // check the emitter had been called and that it gets called with the first field which is caseReference
    expect(component.actionEvent.emit).toHaveBeenCalled();
  });*/
})

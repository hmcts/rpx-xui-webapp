import {Component, Input, Output, ViewChild} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {Task, TaskFieldConfig} from './../../models/tasks';
import {WorkAllocationComponentsModule} from 'src/work-allocation/components/work-allocation.components.module';
import {TaskListComponent} from './task-list.component';
import {TaskFieldType, TaskView} from '../../enums';
import {CdkTableModule} from '@angular/cdk/table';

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

describe('TaskListComponent', () => {
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
})

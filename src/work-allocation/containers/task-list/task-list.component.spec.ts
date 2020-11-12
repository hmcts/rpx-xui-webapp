import { Component, Input, Output, ViewChild } from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {StoreModule} from '@ngrx/store';
import { BehaviorSubject, of, } from 'rxjs';
import {reducers} from 'src/app/store';

import { CdkTableModule } from '@angular/cdk/table';
import { WorkAllocationComponentsModule } from 'src/work-allocation/components/work-allocation.components.module';
import { TaskFieldType, TaskView } from 'src/work-allocation/enums';
import {TaskListComponent} from '..';
import { Task, TaskFieldConfig } from './../../models/tasks';

@Component({
  template: `<exui-task-list [fields]='fields' [tasks]='tasks'></exui-task-list>`
})
class WrapperComponent {
  @ViewChild(TaskListComponent) public appComponentRef: TaskListComponent;
  @Input() public fields: TaskFieldConfig[];
  @Input() public tasks: Task[];
}

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  function getConfig(name: string, type: TaskFieldType): TaskFieldConfig {
    return {
      name,
      type,
      columnLabel: name,
      views: TaskView.ALL_VIEWS
    };
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({...reducers}),
        WorkAllocationComponentsModule,
        CdkTableModule
      ],
      declarations: [TaskListComponent, WrapperComponent],
      providers: []
    })
      .compileComponents();


  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    fixture.whenStable().then(() => {
      fixture.detectChanges();
    })
  });

  it('should initialise', async () => {

    // set the input values
    const field1: TaskFieldConfig = getConfig('caseName', TaskFieldType.STRING);
    const field2: TaskFieldConfig = getConfig('dueDate', TaskFieldType.DATE_DUE);
    const fields: TaskFieldConfig[] = [field1, field2];
    const task1: Task = {
      id: 'The task ID',
      caseReference: 'The case reference',
      caseName: 'The case name',
      caseCategory: 'The case category',
      location: 'The location',
      taskName: 'The task name',
      dueDate: new Date(),
      actions: []
    };
    const task2: Task = {
      id: 'The task ID',
      caseReference: 'The case reference',
      caseName: 'The case name',
      caseCategory: 'The case category',
      location: 'The location',
      taskName: 'The task name',
      dueDate: new Date(),
      actions: []
    };
    const tasks = [task1, task2];
    const tasks$ = new BehaviorSubject(tasks);

    component.fields = fields;
    component.tasks = tasks;
    component.dataSource$ = tasks$;
    component.displayedColumns = fields.map(field => field.name);

    //fixture.whenStable().then(() => {
    //  fixture.detectChanges();
    //})

    //component.ngOnInit();

    //await fixture.whenStable();
    //expect(component.dataSource$).not.toBe(null);
    //expect(component.displayedColumns).not.toBe(null);
  })

})

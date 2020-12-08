import { Component, Input, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { CdkTableModule } from '@angular/cdk/table';
import { WorkAllocationComponentsModule } from 'src/work-allocation/components/work-allocation.components.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule, Data, Router } from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {reducers} from 'src/app/store';

import { Caseworker, Location } from './../../models/dtos/task';
import { CaseworkerDataService } from './../../services/case-worker-data.service';
import { LocationDataService } from './../../services/location-data.service';
import { WorkAllocationTaskService } from 'src/work-allocation/services/work-allocation-task.service';
import { TaskAssignmentContainerComponent, TaskListComponent, TaskListWrapperComponent} from '..';
import { TaskAssignmentComponent } from './../../components';
import { ErrorMessageComponent } from './../../../app/components';
import { TaskServiceConfig, Task } from './../../models/tasks';
import { RouterTestingModule } from '@angular/router/testing';
import { TASKS } from 'api/test/pact/constants/work-allocation/tasks.spec';


// Locations.
const LOCATION_A: Location = { id: 'a', locationName: 'Location A', services: ['a'] };
const LOCATION_B: Location = { id: 'b', locationName: 'Location B', services: ['a', 'b'] };

// Caseworkers.
const JS = { firstName: 'John',   lastName: 'Smith',  idamId: '1', location: LOCATION_A };
const JD = { firstName: 'Jane',   lastName: 'Doe',    idamId: '2', location: LOCATION_A };
const JB = { firstName: 'Joseph', lastName: 'Bloggs', idamId: '3', location: LOCATION_B };
const NB = { firstName: 'Noah',   lastName: 'Body',   idamId: '4', location: LOCATION_B };

@Component({
    template: `
      <exui-task-container-assignment></exui-task-container-assignment>`
  })
  class WrapperComponent {
    @ViewChild(TaskAssignmentContainerComponent) public appComponentRef: TaskAssignmentContainerComponent;
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
          id: 'actionId1',
          title: 'Reassign task',
        },
        {
          id: 'actionId2',
          title: 'Release this task',
        }
      ]
    },
  ];
}

@Component({
  selector: 'exui-task-list',
  template: `<div></div>`
})
class MockTaskListComponent {}

describe('TaskAssignmentContainerComponent', () => {
  let component: TaskAssignmentContainerComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;
  const mockWorkAllocationService = jasmine.createSpyObj('mockWorkAllocationService', ['getTask']);

  let location: Location;
  let router: Router;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          TaskAssignmentContainerComponent, WrapperComponent, ErrorMessageComponent, TaskListComponent
        ],
      imports: [WorkAllocationComponentsModule, CdkTableModule, FormsModule, HttpClientModule, StoreModule.forRoot({...reducers}), RouterTestingModule],
      providers: [{ provide: WorkAllocationTaskService, useValue: mockWorkAllocationService },
      {provide: ActivatedRoute, useValue: {
        data: {
          subscribe: (fn: (value: Data) => void) => fn({
            taskid: TASKS
          }),
        },
        params: Observable.of(getTasks[0])}}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;

    wrapper.tasks = null;
    fixture.detectChanges();
  });

  it('should allow changing the caseworker', async () => {


    expect(component.caseworker).toBe(undefined);
    
    component.onCaseworkerChanged(JS);
    fixture.detectChanges();
    expect(component.caseworker).toBe(JS);

    component.onCaseworkerChanged(JD);
    fixture.detectChanges();
    expect(component.caseworker).toBe(JD);

    component.onCaseworkerChanged(null);
    fixture.detectChanges();
    expect(component.caseworker).toBe(null);
  });

  it('should send an error message when a caseworker is not selected and there is an attempt to assign', async () => {

    component.caseworker = null;
    fixture.detectChanges();
    expect(component.caseworker).toBe(null);
    expect(component.showProblem).toBeFalsy();
    expect(component.errorTitle).toBe(null);
    expect(component.errorDesc).toBe(null);

    component.reAssign();
    fixture.detectChanges();
    expect(component.showProblem).toBeTruthy();
    expect(component.errorTitle).toBe("There is a problem");
    expect(component.errorDesc).toBe("You must select a name");

  });

  it('should assign succesfully', async () => {

    component.caseworker = JD;
    fixture.detectChanges();
    expect(component.caseworker).toBe(JD);

    component.reAssign();
    fixture.detectChanges();
    // TODO: Need to test actually navigates

  });
  // TODO: Need to write tests regarding template
});
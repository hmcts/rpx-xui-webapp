import { CdkTableModule } from '@angular/cdk/table';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { Observable } from 'rxjs';
import { WorkAllocationComponentsModule } from 'src/work-allocation-2/components/work-allocation.components.module';
import { WorkAllocationTaskService } from 'src/work-allocation-2/services';
import { TaskActionType } from 'src/work-allocation/enums';
import { PersonRole } from '../../../../api/workAllocation2/interfaces/person';
import { TaskActionConstants } from '../../components/constants';
import { getMockTasks } from '../../tests/utils.spec';
import { TaskAssignmentConfirmComponent } from './task-assignment-confirm.component';

@Component({
  template: `<exui-task-assignment-confirm></exui-task-assignment-confirm>`
})
class WrapperComponent {
  @ViewChild(TaskAssignmentConfirmComponent) public appComponentRef: TaskAssignmentConfirmComponent;
}

describe('TaskAssignmentConfirmComponent', () => {
  let component: TaskAssignmentConfirmComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;
  let router: Router;
  const SELECTED_PERSON = {
    id: 'id123',
    name: 'John Smith',
    email: 'john.smith@email.com',
    domain: PersonRole.CASEWORKER
  };
  const mockTasks = getMockTasks();
  const mockTaskService = jasmine.createSpyObj('mockTaskService', ['searchTask']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CdkTableModule,
        ExuiCommonLibModule,
        RouterTestingModule,
        WorkAllocationComponentsModule,
        ExuiCommonLibModule
      ],
      declarations: [TaskAssignmentConfirmComponent, WrapperComponent],
      providers: [
        { provide: WorkAllocationTaskService, useValue: mockTaskService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                taskAndCaseworkers: { data: mockTasks[0], caseworkers: [] },
                ...TaskActionConstants.Reassign
              },
              params: {
                taskId: 'task1111111'
              }
            },
            params: Observable.of({ task: mockTasks[0] }),
            paramMap: Observable.of({ selectedPerson: SELECTED_PERSON})
          }
        },
        { provide: Router, useValue: { url: 'localhost/test'} }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    component.verb = TaskActionType.Reassign;
    router = TestBed.get(Router);
    window.history.pushState({ selectedPerson: SELECTED_PERSON}, '', '');
    fixture.detectChanges();
  });

  it('should create', () => {
    component.selectedPerson = {
      id: 'id123',
      name: 'John Smith',
      email: 'john.smith@email.com',
      domain: '2'
    };
    expect(component).toBeDefined();
  });

  it('should display the correct verb', () => {
    component.verb = TaskActionType.Reassign;
    component.selectedPerson = {
      id: 'id123',
      name: 'John Smith',
      email: 'john.smith@email.com',
      domain: '2'
    };
    fixture.detectChanges();

    const titleElement = document.querySelector('.govuk-caption-l');
    expect(titleElement.textContent).toContain(TaskActionType.Reassign);
  });
});

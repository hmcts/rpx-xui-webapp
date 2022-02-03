import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PaginationModule } from '@hmcts/ccd-case-ui-toolkit';
import { SessionStorageService } from '@hmcts/ccd-case-ui-toolkit/dist/shared/services';
import { Observable, throwError } from 'rxjs';
import { TaskListComponent } from '..';
import { ErrorMessageComponent } from '../../../app/components';
import { InfoMessageCommService } from '../../../app/shared/services/info-message-comms.service';
import { TaskActionConstants } from '../../components/constants';
import { WorkAllocationComponentsModule } from '../../components/work-allocation.components.module';
import { InfoMessage, InfoMessageType } from '../../enums';
import { InformationMessage } from '../../models/comms';
import { Task } from '../../models/tasks';
import { WorkAllocationTaskService } from '../../services';
import { ACTION } from '../../services/work-allocation-task.service';
import { getMockTasks } from '../../tests/utils.spec';
import { TaskActionContainerComponent } from './task-action-container.component';

@Component({
  template: `
    <exui-task-action-container></exui-task-action-container>`
})
class WrapperComponent {
  @ViewChild(TaskActionContainerComponent) public appComponentRef: TaskActionContainerComponent;
  @Input() public tasks: Task[];
}

@Component({
  template: `
    <div>Nothing</div>`
})
class NothingComponent {
}

describe('WorkAllocation', () => {

  describe('TaskActionContainerComponent', () => {
    let component: TaskActionContainerComponent;
    let wrapper: WrapperComponent;
    let fixture: ComponentFixture<WrapperComponent>;
    let router: Router;

    const mockTasks = getMockTasks();

    const mockWorkAllocationService = {
      performActionOnTask: jasmine.createSpy('performActionOnTask').and.returnValue(Observable.of({}))
    };
    const MESSAGE_SERVICE_METHODS = ['addMessage', 'emitMessages', 'getMessages', 'nextMessage', 'removeAllMessages'];
    const mockInfoMessageCommService = jasmine.createSpyObj('mockInfoMessageCommService', MESSAGE_SERVICE_METHODS);
    const mockSessionStorageService = jasmine.createSpyObj('mockSessionStorageService', ['getItem', 'setItem']);

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          TaskActionContainerComponent, WrapperComponent, TaskListComponent,
          ErrorMessageComponent, NothingComponent
        ],
        imports: [
          WorkAllocationComponentsModule, CdkTableModule, FormsModule, HttpClientTestingModule, PaginationModule,
          RouterTestingModule.withRoutes(
            [
              {path: 'mywork/list', component: NothingComponent}
            ]
          )
        ],
        providers: [
          {provide: WorkAllocationTaskService, useValue: mockWorkAllocationService},
          {provide: SessionStorageService, useValue: mockSessionStorageService},
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                data: {
                  taskAndCaseworkers: {
                    task: {task: mockTasks[0]}, caseworkers: []
                  },
                  ...TaskActionConstants.Unassign
                }
              },
              params: Observable.of({task: mockTasks[0]})
            }
          },
          {provide: InfoMessageCommService, useValue: mockInfoMessageCommService}
        ]
      }).compileComponents();
      fixture = TestBed.createComponent(WrapperComponent);
      wrapper = fixture.componentInstance;
      component = wrapper.appComponentRef;
      router = TestBed.get(Router);

      wrapper.tasks = null;
      window.history.pushState({returnUrl: 'mywork/list'}, '', 'mywork/list');
      fixture.detectChanges();
    });

    afterEach(() => {
      fixture.destroy();
    });

    it('should create', () => {
      expect(component).toBeDefined();
    });

    it('should perform the action successfully', () => {
      const submit: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#submit-button');
      submit.click();
      expect(mockWorkAllocationService.performActionOnTask).toHaveBeenCalledWith(mockTasks[0].id, ACTION.UNCLAIM, false);
    });

    it('should cancel the action successfully', () => {
      spyOn(component, 'returnWithMessage');

      const cancel: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#cancel-link');
      cancel.click();
      expect(component.returnWithMessage).toHaveBeenCalledWith(null, {});
    });

    it('should return the correct message/state', () => {
      window.history.pushState({returnUrl: 'case/case-details', keepUrl: true}, '', 'case/case-details');
      const message = {
        type: InfoMessageType.SUCCESS,
        message: InfoMessage.ASSIGNED_TASK
      } as InformationMessage;
      const navigateSpy = spyOn(router, 'navigateByUrl');
      component.returnWithMessage(message, null);
      expect(mockInfoMessageCommService.nextMessage).not.toHaveBeenCalledWith(message);
      expect(navigateSpy).toHaveBeenCalledWith('case/case-details', {
      state: {
        showMessage: true,
        messageText: InfoMessage.ASSIGNED_TASK,
        retainMessages: true
      }
      });
    });


    it('should have appropriate title', () => {
      const title: HTMLElement = fixture.debugElement.nativeElement.querySelector('#action-title');
      expect(title.textContent).toEqual(`${TaskActionConstants.Unassign.verb} task`); // Derived in ngOnInit.
    });

    it('should have appropriate description', () => {
      const description: HTMLElement = fixture.debugElement.nativeElement.querySelector('#action-description');
      expect(description.textContent).toEqual(TaskActionConstants.Unassign.description);
    });

    it('should have appropriate submit button', () => {
      const submit: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#submit-button');
      expect(submit.textContent).toEqual(TaskActionConstants.Unassign.verb);
    });

    it('should have appropriate cancel button', () => {
      const cancel: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#cancel-link');
      expect(cancel.textContent).toEqual('Cancel');
    });

    it('configured fields for judicial', () => {
      component.isJudicial = true;
      const fieldConfigs = component.fields;
      const fieldLabels = fieldConfigs.map(fieldConfig => fieldConfig.columnLabel);
      expect(fieldLabels).toContain('Task created');
      expect(fieldLabels).not.toContain('Due date');
      expect(fieldLabels).not.toContain('Priority');
    });

    it('configured fields for Legal ops', () => {
      component.isJudicial = false;

      const fieldConfigs = component.fields;
      const fieldLabels = fieldConfigs.map(fieldConfig => fieldConfig.columnLabel);
      expect(fieldLabels).not.toContain('Task created');
      expect(fieldLabels).toContain('Due date');
      expect(fieldLabels).toContain('Priority');

    });

  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });
});

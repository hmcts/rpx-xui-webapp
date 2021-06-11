import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PaginationModule } from '@hmcts/ccd-case-ui-toolkit';
import { Observable } from 'rxjs';
import { TaskListComponent } from '..';
import { ErrorMessageComponent } from '../../../app/components';
import { TaskActionConstants } from '../../components/constants';
import { WorkAllocationComponentsModule } from '../../components/work-allocation.components.module';
import { Task } from '../../models/tasks';
import { InfoMessageCommService, WorkAllocationTaskService } from '../../services';
import { ACTION } from '../../services/work-allocation-task.service';
import { getMockTasks } from '../../tests/utils.spec';
import { TaskActionContainerComponent } from './task-action-container.component';

@Component({
  template: `<exui-task-action-container></exui-task-action-container>`
})
class WrapperComponent {
  @ViewChild(TaskActionContainerComponent) public appComponentRef: TaskActionContainerComponent;
  @Input() public tasks: Task[];
}

@Component({
  template: `<div>Nothing</div>`
})
class NothingComponent {}

describe('WorkAllocation', () => {

  describe('TaskActionContainerComponent', () => {
    let component: TaskActionContainerComponent;
    let wrapper: WrapperComponent;
    let fixture: ComponentFixture<WrapperComponent>;

    const mockTasks = getMockTasks();
    const mockWorkAllocationService = {
      performActionOnTask: jasmine.createSpy('performActionOnTask').and.returnValue(Observable.of({}))
    };
    const MESSAGE_SERVICE_METHODS = ['addMessage', 'emitMessages', 'getMessages', 'nextMessage', 'removeAllMessages'];
    const mockInfoMessageCommService = jasmine.createSpyObj('mockInfoMessageCommService', MESSAGE_SERVICE_METHODS);

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          TaskActionContainerComponent, WrapperComponent, TaskListComponent,
          ErrorMessageComponent, NothingComponent
        ],
        imports: [
          WorkAllocationComponentsModule, CdkTableModule, FormsModule, HttpClientModule, PaginationModule,
          RouterTestingModule.withRoutes(
            [
              { path: 'mywork/list', component: NothingComponent }
            ]
          )
        ],
        providers: [
          { provide: WorkAllocationTaskService, useValue: mockWorkAllocationService },
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                data: {
                  taskAndCaseworkers: { data: mockTasks[0] },
                  ...TaskActionConstants.Unassign
                }
              },
              params: Observable.of({ task: mockTasks[0] })
            }
          },
          { provide: InfoMessageCommService, useValue: mockInfoMessageCommService }
        ]
      }).compileComponents();
      fixture = TestBed.createComponent(WrapperComponent);
      wrapper = fixture.componentInstance;
      component = wrapper.appComponentRef;

      wrapper.tasks = null;
      window.history.pushState({ returnUrl: 'mywork/list' }, '', 'mywork/list');
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
      expect(mockWorkAllocationService.performActionOnTask).toHaveBeenCalledWith(mockTasks[0].id, ACTION.UNCLAIM);
    });


    it('should cancel the action successfully', () => {
      spyOn(component, 'returnWithMessage');

      const cancel: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#cancel-link');
      cancel.click();
      expect(component.returnWithMessage).toHaveBeenCalledWith(null, {});
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
  });

});

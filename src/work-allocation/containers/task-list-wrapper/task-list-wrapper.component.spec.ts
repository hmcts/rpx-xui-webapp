import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {StoreModule} from '@ngrx/store';
import {reducers} from 'src/app/store';
import { CdkTableModule } from '@angular/cdk/table';

import {TaskListWrapperComponent, TaskListComponent} from '..';
import { WorkAllocationComponentsModule } from '../../components/work-allocation.components.module';
import { InfoMessageComponent } from '../../components';
import { InfoMessage, InfoMessageType } from '../../enums';

describe('TaskListWrapperComponent', () => {
  let component: TaskListWrapperComponent;
  let fixture: ComponentFixture<TaskListWrapperComponent>;

  component.messages = [{infoMessage: InfoMessage.TASK_NO_LONGER_AVAILABLE, infoMessageType: InfoMessageType.WARNING},
    {infoMessage: InfoMessage.LIST_OF_AVAILABLE_TASKS_REFRESHED, infoMessageType: InfoMessageType.INFO}];
    fixture.detectChanges();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        WorkAllocationComponentsModule,
        CdkTableModule,
        RouterTestingModule,
        StoreModule.forRoot({...reducers}),
      ],
      declarations: [TaskListWrapperComponent, TaskListComponent],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
    it('should initialise', async () => {
      component.messages = [{infoMessage: InfoMessage.TASK_NO_LONGER_AVAILABLE, infoMessageType: InfoMessageType.WARNING},
        {infoMessage: InfoMessage.LIST_OF_AVAILABLE_TASKS_REFRESHED, infoMessageType: InfoMessageType.INFO}];
        fixture.detectChanges();
      expect(component.tasks).not.toBe(null);
    });
});
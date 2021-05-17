import { CdkTableModule } from '@angular/cdk/table';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { WorkAllocationComponentsModule } from 'src/work-allocation-2/components/work-allocation.components.module';
import { WorkAllocationTaskService } from 'src/work-allocation-2/services';
import { TaskAssignmentConfirmComponent } from './task-assignment-confirm.component';

@Component({
  template: `<exui-task-assignment-confirm></exui-task-assignment-confirm>`
})
class WrapperComponent {
  @ViewChild(TaskAssignmentConfirmComponent) public appComponentRef: TaskAssignmentConfirmComponent;
}

fdescribe('TaskAssignmentConfirmComponent', () => {
  let component: TaskAssignmentConfirmComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;
  let router: Router;
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
        { provide: WorkAllocationTaskService, useValue: mockTaskService }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});

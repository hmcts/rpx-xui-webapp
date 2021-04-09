import { CdkTableModule } from '@angular/cdk/table';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { of } from 'rxjs';

import { WorkAllocationComponentsModule } from '../../components/work-allocation.components.module';
import { InfoMessageContainerComponent } from '../../containers/info-message-container/info-message-container.component';
import { WorkAllocationFeatureService, WorkAllocationTaskService } from '../../services';
import { TaskHomeComponent } from './task-home.component';

@Component({
  template: `<exui-task-home></exui-task-home>`
})
class WrapperComponent {
  @ViewChild(TaskHomeComponent) public appComponentRef: TaskHomeComponent;
}

describe('TaskHomeComponent', () => {
  let component: TaskHomeComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;
  let router: Router;
  const mockTaskService = jasmine.createSpyObj('mockTaskService', ['searchTask']);
  let mockFeatureService = jasmine.createSpyObj('mockTaskService', ['getActiveWAFeature']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CdkTableModule,
        ExuiCommonLibModule,
        RouterTestingModule,
        WorkAllocationComponentsModule
      ],
      declarations: [TaskHomeComponent, WrapperComponent, InfoMessageContainerComponent],
      providers: [
        { provide: WorkAllocationTaskService, useValue: mockTaskService },
        { provide: WorkAllocationFeatureService, useValue: mockFeatureService }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    router = TestBed.get(Router);
    mockFeatureService.getActiveWAFeature.and.returnValue(of('WorkAllocationRelease1'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});

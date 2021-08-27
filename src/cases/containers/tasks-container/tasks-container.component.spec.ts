import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertService } from '@hmcts/ccd-case-ui-toolkit';

import { TasksContainerComponent } from './tasks-container.component';

describe('TasksContainerComponent', () => {
  const mockAlertService = jasmine.createSpyObj('alertService', ['success', 'setPreserveAlerts', 'error']);

  let component: TasksContainerComponent;
  let fixture: ComponentFixture<TasksContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TasksContainerComponent],
      providers: [
        {provide: AlertService, useValue: mockAlertService}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

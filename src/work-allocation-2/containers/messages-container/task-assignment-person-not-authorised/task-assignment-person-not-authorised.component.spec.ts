import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskAssignmentPersonNotAuthorisedComponent } from './task-assignment-person-not-authorised.component';

describe('TaskAssignmentPersonNotAuthorised', () => {
  let component: TaskAssignmentPersonNotAuthorisedComponent;
  let fixture: ComponentFixture<TaskAssignmentPersonNotAuthorisedComponent>;
  let mockRouter: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskAssignmentPersonNotAuthorisedComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mockRouter = TestBed.inject(Router);
    spyOn(mockRouter, 'getCurrentNavigation').and.returnValue({extras: {state: {returnUrl: '/work'}}});
    fixture = TestBed.createComponent(TaskAssignmentPersonNotAuthorisedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set the return url from navigation extras', () => {
    expect(component).toBeTruthy();
    expect(mockRouter.getCurrentNavigation).toHaveBeenCalled();
    expect(component.returnUrl).toEqual('/work');
  });
});

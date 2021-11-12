import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAssignmentChooseRoleComponent } from './task-assignment-choose-role.component';

describe('TaskAssignmentChooseRoleComponent', () => {
  let component: TaskAssignmentChooseRoleComponent;
  let fixture: ComponentFixture<TaskAssignmentChooseRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskAssignmentChooseRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAssignmentChooseRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

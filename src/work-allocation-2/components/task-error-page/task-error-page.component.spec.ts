import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskErrorPageComponent } from './task-error-page.component';

describe('TaskErrorPageComponent', () => {
  let component: TaskErrorPageComponent;
  let fixture: ComponentFixture<TaskErrorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskErrorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

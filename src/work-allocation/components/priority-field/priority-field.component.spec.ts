import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TaskPriority } from '../../enums';
import { PriorityFieldComponent } from './priority-field.component';


describe('PriorityFieldComponent', () => {
  let component: PriorityFieldComponent;
  let fixture: ComponentFixture<PriorityFieldComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PriorityFieldComponent ]
    })
    .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should only show if there is a dueDate set', () => {
    expect(component.priority).toBe(TaskPriority.HIGH);
    component.date = new Date();
    fixture.detectChanges();
    expect(component.priority).toBeDefined();
  });

  it('should correctly set the priority', () => {
    expect(component.priority).toBe(TaskPriority.HIGH);
  });
});

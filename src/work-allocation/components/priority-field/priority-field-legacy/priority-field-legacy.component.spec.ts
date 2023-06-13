import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TaskPriority } from '../../../enums';
import { PriorityFieldLegacyComponent } from './priority-field-legacy.component';

describe('PriorityFieldLegacyComponent', () => {
  let component: PriorityFieldLegacyComponent;
  let fixture: ComponentFixture<PriorityFieldLegacyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PriorityFieldLegacyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityFieldLegacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should only show if there is a dueDate set', () => {
    expect(component.priority).toBeUndefined();
    component.dueDate = new Date();
    fixture.detectChanges();
    expect(component.priority).toBeDefined();
  });

  it('should correctly set the priority', () => {
    expect(component.priority).toBeUndefined();
    component.dueDate = new Date('2020/01/01');
    fixture.detectChanges();
    expect(component.priority).toBe(TaskPriority.HIGH);
    component.dueDate = new Date();
    fixture.detectChanges();
    expect(component.priority).toBe(TaskPriority.MEDIUM);
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    component.dueDate = tomorrowDate;
    fixture.detectChanges();
    expect(component.priority).toBe(TaskPriority.LOW);
  });
});

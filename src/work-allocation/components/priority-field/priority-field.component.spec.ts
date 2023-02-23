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
    expect(component.priority).toBe(TaskPriority.LOW);
    component.date = new Date();
    fixture.detectChanges();
    expect(component.priority).toBeDefined();
  });

  it('should correctly set the priority', () => {
    expect(component.priority).toBe(TaskPriority.LOW);
    component.date = new Date('2020/01/01');
    fixture.detectChanges();
    expect(component.priority).toBe(TaskPriority.LOW);
    component.date = new Date();
    fixture.detectChanges();
    expect(component.priority).toBe(TaskPriority.LOW);
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    component.date = tomorrowDate;
    fixture.detectChanges();
    expect(component.priority).toBe(TaskPriority.LOW);

    component.majorPriority = 2000;
    fixture.detectChanges();
    expect(component.priority).toBe(TaskPriority.URGENT);

    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    component.date = yesterdayDate;
    component.majorPriority = 2001;
    fixture.detectChanges();
    expect(component.priority).toBe(TaskPriority.HIGH);

    component.majorPriority = 4999;
    fixture.detectChanges();
    expect(component.priority).toBe(TaskPriority.HIGH);

    component.majorPriority = 5000;
    component.date = yesterdayDate;
    fixture.detectChanges();
    expect(component.priority).toBe(TaskPriority.HIGH);

    component.majorPriority = 5000;
    component.date = new Date();
    fixture.detectChanges();
    expect(component.priority).toBe(TaskPriority.MEDIUM);
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePriorityHearingComponent } from './date-priority-hearing.component';

describe('DatePriorityHearingComponent', () => {
  let component: DatePriorityHearingComponent;
  let fixture: ComponentFixture<DatePriorityHearingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatePriorityHearingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePriorityHearingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

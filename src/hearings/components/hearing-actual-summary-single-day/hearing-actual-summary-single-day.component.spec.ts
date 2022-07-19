import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HearingActualSummarySingleDayComponent } from './hearing-actual-summary-single-day.component';

describe('HearingActualSummarySingleDayComponent', () => {
  let component: HearingActualSummarySingleDayComponent;
  let fixture: ComponentFixture<HearingActualSummarySingleDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HearingActualSummarySingleDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingActualSummarySingleDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

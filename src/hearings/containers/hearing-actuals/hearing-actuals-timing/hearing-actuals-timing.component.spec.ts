import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HearingActualsTimingComponent } from './hearing-actuals-timing.component';

describe('HearingTimingComponent', () => {
  let component: HearingActualsTimingComponent;
  let fixture: ComponentFixture<HearingActualsTimingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HearingActualsTimingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingActualsTimingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

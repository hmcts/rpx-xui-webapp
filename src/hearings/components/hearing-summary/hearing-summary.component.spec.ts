import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HearingSummaryComponent } from './hearing-summary.component';

describe('HearingSummaryComponent', () => {
  let component: HearingSummaryComponent;
  let fixture: ComponentFixture<HearingSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HearingSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

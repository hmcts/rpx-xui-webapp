import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HearingRequestFailedSummaryComponent } from './hearing-request-failed-summary.component';

describe('HearingRequestFailedSummaryComponent', () => {
  let component: HearingRequestFailedSummaryComponent;
  let fixture: ComponentFixture<HearingRequestFailedSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HearingRequestFailedSummaryComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HearingRequestFailedSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.destroy();
  });
});

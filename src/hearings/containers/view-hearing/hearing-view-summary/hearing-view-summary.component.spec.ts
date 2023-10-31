import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HearingViewSummaryComponent } from './hearing-view-summary.component';

describe('HearingViewSummaryComponent', () => {
  let component: HearingViewSummaryComponent;
  let fixture: ComponentFixture<HearingViewSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HearingViewSummaryComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HearingViewSummaryComponent);
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

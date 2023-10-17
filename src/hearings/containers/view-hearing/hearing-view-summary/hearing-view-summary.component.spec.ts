import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockRpxTranslatePipe } from '../../../../app/shared/test/mock-rpx-translate.pipe';
import { HearingViewSummaryComponent } from './hearing-view-summary.component';

describe('HearingViewSummaryComponent', () => {
  let component: HearingViewSummaryComponent;
  let fixture: ComponentFixture<HearingViewSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HearingViewSummaryComponent, MockRpxTranslatePipe],
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

import { CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HearingSummaryEnum } from '../../../models/hearings.enum';
import { HearingRequestFailedSummaryComponent } from './hearing-request-failed-summary.component';

@Pipe({ name: 'rpxTranslate' })
class RpxTranslateMockPipe implements PipeTransform {
  public transform(value: string): string {
    return value;
  }
}

describe('HearingRequestFailedSummaryComponent', () => {
  let component: HearingRequestFailedSummaryComponent;
  let fixture: ComponentFixture<HearingRequestFailedSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HearingRequestFailedSummaryComponent, RpxTranslateMockPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HearingRequestFailedSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check error section defined', (): void => {
    const errors = [{ id: 'request-failed', message: HearingSummaryEnum.RequestFailedError }];
    component.requestErrors = errors;
    const errorSummaryEle = fixture.debugElement.query(By.css('.govuk-error-summary__title'));
    expect(errorSummaryEle).toBeDefined();
  });

  afterEach(() => {
    fixture.destroy();
  });
});

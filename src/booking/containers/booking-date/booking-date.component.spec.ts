import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  GovUkErrorMessageComponent,
  GovUkFieldsetComponent,
  GovUkLabelComponent
} from '@hmcts/rpx-xui-common-lib';
import { RpxTranslationService } from 'rpx-xui-translation';
import { BookingDateFormErrorMessage, BookingDateOption, BookingDatePageText, BookingProcess, DateFormControl } from '../../models';
import { BookingDateComponent } from './booking-date.component';

describe('BookingDateComponent', () => {
  let component: BookingDateComponent;
  let fixture: ComponentFixture<BookingDateComponent>;
  window.onbeforeunload = jasmine.createSpy();
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const rpxTranslationServiceStub = () => ({ language: 'en', translate: () => {} });

  const dateInterval = [
    { date: BookingDateOption.TODAY, checked: false },
    { date: BookingDateOption.WEEK, checked: false },
    { date: BookingDateOption.DATERANGE, checked: false }
  ];
  const configStart = {
    id: 'startDate',
    name: 'startDate',
    hint: 'For example, 19 11 2021',
    label: 'Booking Starts',
    isPageHeading: false
  };
  const configEnd = {
    id: 'endDate',
    name: 'endDate',
    hint: 'For example, 19 12 2021',
    label: 'Booking Ends',
    isPageHeading: false
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [
        BookingDateComponent,
        GovUkFieldsetComponent,
        GovUkErrorMessageComponent,
        GovUkLabelComponent
      ],
      providers: [
        FormBuilder,
        {
          provide: RpxTranslationService,
          useFactory: rpxTranslationServiceStub
        }
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(BookingDateComponent);
    component = fixture.componentInstance;
    component.bookingProcess = { selectedDateOption: 0 } as BookingProcess;
    component.dateInterval = dateInterval;
    component.configStart = configStart;
    component.configEnd = configEnd;
    component.formGroup = new FormBuilder().group({
      startDate_day: '',
      startDate_month: '',
      startDate_year: '',
      endDate_year: '',
      endDate_month: '',
      endDate_day: '',
      dateOption: ''
    });
    component.setValidators();
    fixture.detectChanges();
  }));

  it('should create component and show the "booking date" info message banner', () => {
    expect(component).toBeDefined();
    const infoBannerElement = fixture.debugElement.nativeElement.querySelector('.govuk-caption-l');
    expect(infoBannerElement.textContent).toContain(BookingDatePageText.CAPTION);
    const headingElement = fixture.debugElement.nativeElement.querySelector('.govuk-fieldset__heading');
    expect(headingElement.textContent).toContain(BookingDatePageText.TITLE);
  });

  it('should show a validation error if form submitted with no option selected', () => {
    component.formGroup.get(DateFormControl.BOOKING_DATE_TYPE).patchValue(null);
    fixture.detectChanges();
    const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    submitButton.click();
    fixture.detectChanges();
    expect(component.formGroup.invalid).toBe(true);
    expect(component.formGroup.get(DateFormControl.BOOKING_DATE_TYPE).invalid).toBe(true);
    const errorBannerElement = fixture.debugElement.nativeElement.querySelector('.govuk-error-summary a');
    expect(errorBannerElement.textContent).toContain(BookingDateFormErrorMessage.NO_SELECTION);
    const errorMessageElement = fixture.debugElement.nativeElement.querySelector('.govuk-error-summary__title');
    expect(errorMessageElement.textContent).toContain('There is a problem');
  });

  it('should not show a validation error if form submitted with "Today only (ends at midnight)" selected', () => {
    const radioButton = fixture.debugElement.nativeElement.querySelector('#date-0');
    radioButton.click();
    const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    submitButton.click();
    fixture.detectChanges();
    expect(component.formGroup.invalid).toBe(false);
    expect(component.formGroup.get(DateFormControl.BOOKING_DATE_TYPE).valid).toBe(true);
    const errorMessageElement = fixture.debugElement.nativeElement.querySelector('.govuk-error-summary__title');
    expect(errorMessageElement).toBe(null);
  });

  it('should not show a validation error if form submitted with "This week (end on Sunday at midnight )" selected', () => {
    const radioButton = fixture.debugElement.nativeElement.querySelector('#date-1');
    radioButton.click();
    const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    submitButton.click();
    fixture.detectChanges();
    expect(component.formGroup.invalid).toBe(false);
    expect(component.formGroup.get(DateFormControl.BOOKING_DATE_TYPE).valid).toBe(true);
    const errorMessageElement = fixture.debugElement.nativeElement.querySelector('.govuk-error-summary__title');
    expect(errorMessageElement).toBe(null);
  });

  it('should show a validation error if form submitted with "Select a date range" selected without date values', () => {
    const radioButton = fixture.debugElement.nativeElement.querySelector('#date-2');
    radioButton.click();
    fixture.detectChanges();
    const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    submitButton.click();
    fixture.detectChanges();
    expect(component.formGroup.invalid).toBe(true);
    const errorBannerElement = fixture.debugElement.nativeElement.querySelector('.govuk-error-summary a');
    expect(errorBannerElement.textContent).toContain(BookingDateFormErrorMessage.BOOKING_START_DATE_EMPTY_CHECK_FAILED);
    const errorMessageElement = fixture.debugElement.nativeElement.querySelector('.govuk-error-summary__title');
    expect(errorMessageElement.textContent).toContain('There is a problem');
  });

  it('should not show a validation error if form submitted with "Select a date range" selected with date values', () => {
    const radioButton = fixture.debugElement.nativeElement.querySelector('#date-2');
    radioButton.click();
    component.formGroup.get('startDate_day').patchValue('11');
    component.formGroup.get('startDate_month').patchValue('11');
    component.formGroup.get('startDate_year').patchValue('2032');
    component.formGroup.get('endDate_day').patchValue('12');
    component.formGroup.get('endDate_month').patchValue('11');
    component.formGroup.get('endDate_year').patchValue('2032');
    fixture.detectChanges();
    const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    submitButton.click();
    fixture.detectChanges();
    expect(component.formGroup.invalid).toBe(false);
    expect(component.formGroup.get(DateFormControl.BOOKING_DATE_TYPE).valid).toBe(true);
    const errorMessageElement = fixture.debugElement.nativeElement.querySelector('.govuk-error-summary__title');
    expect(errorMessageElement).toBe(null);
  });
});

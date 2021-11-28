import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookingDateValidationError, BookingNavigationEvent, NewBooking } from '../../models';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  TimeOption,
  BookingTimePageText,
  DateFormControl,
  BookingDateFormErrorMessage,
} from '../../models/booking-date.enum';
import { ErrorMessage } from '../../../app/models';
import { ErrorMessagesModel, GovUiConfigModel } from '@hmcts/rpx-xui-common-lib/lib/gov-ui/models';
import { DateValidators } from '../utils';

@Component({
  selector: 'exui-booking-date',
  templateUrl: './booking-date.component.html'
})
export class BookingDateComponent implements OnInit {

  @Input() public newBooking: NewBooking;
  @Output() public newBookingChange = new EventEmitter<NewBooking>();
  @Output() public eventTrigger = new EventEmitter();
  public title: string;
  public caption: string;
  public readonly dateInterval: DisplayedDateInterval[];
  public formGroup: FormGroup;
  public submitted = false;
  public errorMessage: ErrorMessage;
  public configStart: GovUiConfigModel;
  public configEnd: GovUiConfigModel;
  public dateValidationErrors: BookingDateValidationError[];
  public startDateErrorMessage: ErrorMessagesModel;
  public endDateErrorMessage: ErrorMessagesModel;

  constructor(
    private readonly fb: FormBuilder
  ) {
    this.dateInterval = [
      { date: TimeOption.TODAY, checked: false },
      { date: TimeOption.WEEK, checked: false },
      { date: TimeOption.DATERANGE, checked: false },
    ];
    this.configStart = {
      id: 'startDate',
      name: 'startDate',
      hint: 'For example, 19 11 2021',
      label: 'Booking Starts',
      isPageHeading: false
    };
    this.configEnd = {
      id: 'endDate',
      name: 'endDate',
      hint: 'For example, 19 11 2021',
      label: 'Booking Ends',
      isPageHeading: false
    };
  }

  public ngOnInit(): void {
    this.title = BookingTimePageText.TITLE;
    this.caption = BookingTimePageText.CAPTION;
    this.formGroup = this.fb.group({
      bookingDateType: new FormControl(null, Validators.required),
      startDate_day: null,
      startDate_month: null,
      startDate_year: null,
      endDate_year: null,
      endDate_month: null,
      endDate_day: null
    });
    this.setValidators();
  }

  private setValidators(): void {
    const dayValidator = DateValidators.dayValidator();
    const monthValidator = DateValidators.monthValidator();
    const yearValidator = DateValidators.yearValidator();
    const bookingDateValidator = DateValidators.bookingDateValidator();
    const bookingEmptyValidator = DateValidators.bookingEmptyValidator();
    this.formGroup.get(DateFormControl.BOOKING_START_DAY).setValidators(dayValidator);
    this.formGroup.get(DateFormControl.BOOKING_START_MONTH).setValidators(monthValidator);
    this.formGroup.get(DateFormControl.BOOKING_START_YEAR).setValidators(yearValidator);
    this.formGroup.get(DateFormControl.BOOKING_END_DAY).setValidators(dayValidator);
    this.formGroup.get(DateFormControl.BOOKING_END_MONTH).setValidators(monthValidator);
    this.formGroup.get(DateFormControl.BOOKING_END_YEAR).setValidators(yearValidator);
    this.formGroup.setValidators([bookingDateValidator, bookingEmptyValidator]);
    this.formGroup.updateValueAndValidity();
    this.formGroup.get(DateFormControl.BOOKING_START_DAY).updateValueAndValidity();
    this.formGroup.get(DateFormControl.BOOKING_END_DAY).updateValueAndValidity();
  }

  private validateForm(): boolean {
    // Reset validation error messages
    this.resetValidationErrorMessages();
    this.formGroup.updateValueAndValidity();
    this.formGroup.get(DateFormControl.BOOKING_START_DAY).updateValueAndValidity();
    this.formGroup.get(DateFormControl.BOOKING_END_DAY).updateValueAndValidity();

    if (!this.formGroup.valid) {
      if (! this.formGroup.get(DateFormControl.BOOKING_START_DAY).valid ||
          !this.formGroup.get(DateFormControl.BOOKING_START_MONTH).valid ||
          !this.formGroup.get(DateFormControl.BOOKING_START_YEAR).valid) {
        this.dateValidationErrors.push({ controlId: DateFormControl.BOOKING_START_DAY, documentHRef: this.configStart.id, errorMessage: BookingDateFormErrorMessage.BOOKING_START_DATE_FAILED });
        this.startDateErrorMessage = { isInvalid: true, messages: [BookingDateFormErrorMessage.BOOKING_START_DATE_FAILED] };
      }
      if (!this.formGroup.get(DateFormControl.BOOKING_END_DAY).valid ||
          !this.formGroup.get(DateFormControl.BOOKING_END_MONTH).valid ||
          !this.formGroup.get(DateFormControl.BOOKING_END_YEAR).valid) {
        this.dateValidationErrors.push({ controlId: DateFormControl.BOOKING_END_DAY, documentHRef: this.configEnd.id, errorMessage: BookingDateFormErrorMessage.BOOKING_END_DATE_FAILED });
        this.endDateErrorMessage = { isInvalid: true, messages: [BookingDateFormErrorMessage.BOOKING_END_DATE_FAILED] };
      }
      if (!this.formGroup.get(DateFormControl.BOOKING_DATE_TYPE).valid) {
        this.dateValidationErrors.push({ controlId: DateFormControl.BOOKING_START_DAY, documentHRef: this.configStart.id, errorMessage: BookingDateFormErrorMessage.NO_SELECTION });
      }
      if (this.formGroup.errors) {
        switch (this.formGroup.errors.errorType) {
          case BookingDateFormErrorMessage.BOOKING_BOTH_DATE_EMPTY_CHECK:
            this.dateValidationErrors.push({ controlId: DateFormControl.BOOKING_START_DAY, documentHRef: this.configStart.id, errorMessage: BookingDateFormErrorMessage.BOOKING_START_DATE_EMPTY_CHECK_FAILED });
            this.dateValidationErrors.push({ controlId: DateFormControl.BOOKING_END_DAY, documentHRef: this.configEnd.id, errorMessage: BookingDateFormErrorMessage.BOOKING_END_DATE_EMPTY_CHECK_FAILED });
            this.startDateErrorMessage = { isInvalid: true, messages: [BookingDateFormErrorMessage.BOOKING_START_DATE_EMPTY_CHECK_FAILED] };
            this.endDateErrorMessage = { isInvalid: true, messages: [BookingDateFormErrorMessage.BOOKING_END_DATE_EMPTY_CHECK_FAILED] };
            break;
          case BookingDateFormErrorMessage.BOOKING_START_DATE_EMPTY_CHECK:
            this.dateValidationErrors.push({ controlId: DateFormControl.BOOKING_START_DAY, documentHRef: this.configStart.id, errorMessage: BookingDateFormErrorMessage.BOOKING_START_DATE_EMPTY_CHECK_FAILED });
            this.startDateErrorMessage = { isInvalid: true, messages: [BookingDateFormErrorMessage.BOOKING_START_DATE_EMPTY_CHECK_FAILED] };
            break;
          case BookingDateFormErrorMessage.BOOKING_END_DATE_EMPTY_CHECK:
            this.dateValidationErrors.push({ controlId: DateFormControl.BOOKING_END_DAY, documentHRef: this.configEnd.id, errorMessage: BookingDateFormErrorMessage.BOOKING_END_DATE_EMPTY_CHECK_FAILED });
            this.endDateErrorMessage = { isInvalid: true, messages: [BookingDateFormErrorMessage.BOOKING_END_DATE_EMPTY_CHECK_FAILED] };
            break;
          case BookingDateFormErrorMessage.PAST_DATE_CHECK:
            this.dateValidationErrors.push({ controlId: DateFormControl.BOOKING_START_DAY, documentHRef: this.configStart.id, errorMessage: BookingDateFormErrorMessage.PAST_DATE_CHECK_FAILED });
            break;
          case BookingDateFormErrorMessage.DATE_COMPARISON:
            this.dateValidationErrors.push({ controlId: DateFormControl.BOOKING_START_DAY, documentHRef: this.configStart.id, errorMessage: BookingDateFormErrorMessage.BOOKING_DATE_COMPARISON_FAILED });
            break;
          default:
            break;
        }
      }
    }
    if (this.isAnyError()) {
      return false;
    } else {
      return true;
    }
  }

  public resetValidationErrorMessages(): void {
    this.dateValidationErrors = [];
    this.startDateErrorMessage =
    this.endDateErrorMessage = null;
  }

  public isAnyError(): boolean {
    return Array.isArray(this.dateValidationErrors) && this.dateValidationErrors.length > 0;
  }

  public onSelectOption(selectedOption): void {
    if (selectedOption !== TimeOption.DATERANGE ) {
      this.resetValidationErrorMessages();
      this.formGroup.setErrors(null);
   }
  }
  public onSubmit(): void {
    if (!this.validateForm()) {
      // Scroll to error summary
      window.scrollTo({ top: 0, left: 0 });
    } else {
      this.eventTrigger.emit(BookingNavigationEvent.CONFIRMBOOKINGDATESUBMIT);
    }
  }
}

export interface DisplayedDateInterval {
  date: TimeOption;
  checked: boolean;
}


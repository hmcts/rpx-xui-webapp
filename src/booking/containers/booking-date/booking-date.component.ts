import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {  BookingNavigationEvent, BookingProcess} from '../../models';
import { BookingDateValidationError, BookingNavigationEvent } from '../../models';
import { BookingDateValidationError, BookingNavigationEvent, NewBooking } from '../../models';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  BookingDateOption,
  BookingDatePageText,
  TimeOption,
  BookingTimePageText,
  DateFormControl,
  BookingDateFormErrorMessage,
} from '../../models/booking-date.enum';
import { ErrorMessage } from '../../../app/models';
import { ErrorMessagesModel, GovUiConfigModel } from '@hmcts/rpx-xui-common-lib/lib/gov-ui/models';
import { DateValidators } from '../utils';

export const ERROR_TEMPLATE: ErrorMessage = {
  title: 'There is a problem',
  description: '',
  fieldId: ''
};

@Component({
  selector: 'exui-booking-date',
  templateUrl: './booking-date.component.html'
})
export class BookingDateComponent implements OnInit {

  @Input() public bookingProcess: BookingProcess;
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
      { date: BookingDateOption.TODAY, checked: false },
      { date: BookingDateOption.WEEK, checked: false },
      { date: BookingDateOption.DATERANGE, checked: false },
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
      hint: 'For example, 19 12 2021',
      label: 'Booking Ends',
      isPageHeading: false
    };
  }

  public ngOnInit(): void {
    this.title = BookingDatePageText.TITLE;
    this.caption = BookingDatePageText.CAPTION;
    this.formGroup = this.fb.group({
      dateOption: new FormControl(null, Validators.required),
      startDate_year: new FormControl(null, null),
      startDate_month: new FormControl(null, null),
      startDate_day: new FormControl(null, null),
      endDate_year: new FormControl(null, null),
      endDate_month: new FormControl(null, null),
      endDate_day: new FormControl(null, null),
      bookingDateType: new FormControl(null, Validators.required),
    });

    this.formGroup.get('dateOption').patchValue(this.bookingProcess.selectedDateOption);
    if (typeof this.bookingProcess.selectedDateOption === 'number') {
      this.dateInterval[this.bookingProcess.selectedDateOption].checked = true;
    }
    this.errorMessage = ERROR_TEMPLATE;
    this.setValidators();
  }

  public onEventTrigger() {
    const {startDate, endDate} = this.getStartEndDate(this.formGroup.get('dateOption').value);

    if (startDate && endDate) {
      this.bookingProcess.startDate = startDate;
      this.bookingProcess.endDate = endDate;
      this.eventTrigger.emit(BookingNavigationEvent.CONFIRMBOOKINGDATESUBMIT);
    } else {
      this.errorMessage.description = 'Select an option to book your time at the location';
      this.errorMessage.fieldId = 'dateOption';
      this.submitted = true;
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

  public dateOptionOnChange(optionIndex: number): void {
    this.bookingProcess.selectedDateOption = optionIndex;
  }

  public getStartEndDate(bookingDateOption: number): {startDate: Date, endDate: Date} {
    let startDate;
    let endDate;
    switch (bookingDateOption) {
      case 0:
        startDate = new Date();
        const now = new Date();
        endDate = new Date(now.setUTCHours(23, 59, 59, 999));
        break;

      case 1:
          startDate = new Date();
          const sunday = new Date();
          const sundayUTC = sunday.setTime(sunday.getTime() - ((sunday.getDay() ? sunday.getDay() : 7) - 7) * 24 * 60 * 60 * 1000);
          const sundayMignightUTC = new Date(sundayUTC).setUTCHours(23, 59, 59, 999);
          endDate = new Date(sundayMignightUTC);
          break;

      case 2:
          startDate = new Date(
                        this.formGroup.get('startDate_year').value,
                        this.formGroup.get('startDate_month').value - 1,
                        this.formGroup.get('startDate_day').value
                      );
          const endDateMidnight = new Date(
                                    this.formGroup.get('endDate_year').value,
                                    this.formGroup.get('endDate_month').value - 1,
                                    this.formGroup.get('endDate_day').value
                                  ).setUTCHours(23, 59, 59, 999);
          endDate = new Date(endDateMidnight);
          break;
      default:
        break;
    }

    return {
      startDate,
      endDate
    };
  }
}


export interface DisplayedDateInterval {
  date: BookingDateOption;
  checked: boolean;
}


import { Component, OnInit } from '@angular/core';
import { ErrorMessagesModel, GovUiConfigModel } from '@hmcts/rpx-xui-common-lib/lib/gov-ui/models';
import { DateValidators } from '../../../utils';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  SpecificAccessDurationOption,
  SpecificAccessDurationPageText,
  SpecificAccessDurationFormControl as DateControl,
  SpecificAccessDurationFormErrorMessage as FormErrorMsg,
} from '../../../models';

@Component({
  selector: 'exui-specific-access-duration',
  templateUrl: './specific-access-duration.component.html'
})
export class SpecificAccessDurationComponent implements OnInit {
  // TODO: SAD - use these in the template e.g. radio button hints
  public static sevenDaysDesc = 'Starts from today and ends at midnight 7 days from now.';
  public static indefiniteDesc = 'Access starts from today and lasts while the case is open.';
  public static anotherPeriodDesc = 'You’ll need to provide both a start and end date for access to the case.';

  // properties
  public caption: string;
  public configStart: GovUiConfigModel;
  public configEnd: GovUiConfigModel;
  public dateInterval: DisplayedDateInterval[];
  public dateValidationErrors: any[]; // BookingDateValidationError[];    // TODO: SAD - need new interface?
  public endDateErrorMessage: ErrorMessagesModel;
  public startDateErrorMessage: ErrorMessagesModel;
  public title: string;

  // form group and form controls
  public formGroup: FormGroup;

  constructor(
    private readonly fb: FormBuilder
  ) {
    this.dateInterval = [
      { date: SpecificAccessDurationOption.SEVEN_DAYS, checked: false },
      { date: SpecificAccessDurationOption.INDEFINITE, checked: false },
      { date: SpecificAccessDurationOption.DATE_RANGE, checked: false }
    ];
    this.configStart = {
      id: 'startDate',
      name: 'startDate',
      hint: 'For example, 01 03 2022',
      label: 'Access starts',
      isPageHeading: false
    };
    this.configEnd = {
      id: 'endDate',
      name: 'endDate',
      hint: 'For example, 01 03 2022',
      label: 'Access ends',
      isPageHeading: false
    };
  }

  public ngOnInit(): void {
    this.title = SpecificAccessDurationPageText.TITLE;
    this.caption = SpecificAccessDurationPageText.CAPTION;

    this.formGroup = this.fb.group({
        dateOption: new FormControl(null, Validators.required),
        startDate_year: new FormControl(null, null),
        startDate_month: new FormControl(null, null),
        startDate_day: new FormControl(null, null),
        endDate_year: new FormControl(null, null),
        endDate_month: new FormControl(null, null),
        endDate_day: new FormControl(null, null)
      });
      this.setValidators();
  }

  public isAnyError(): boolean {
    return Array.isArray(this.dateValidationErrors) && this.dateValidationErrors.length > 0;
  }

  public onSelectOption(selectedOption): void {
    if (selectedOption !== SpecificAccessDurationOption.DATE_RANGE) {
      this.resetValidationErrorMessages();
      this.formGroup.setErrors(null);
    }
  }

  public resetValidationErrorMessages(): void {
    this.dateValidationErrors = [];
    this.startDateErrorMessage = null;
    this.endDateErrorMessage = null;
  }

  public setValidators(): void {
    const dateValidator = DateValidators.specificAccessDateValidator();
    const emptyValidator = DateValidators.specificAccessEmptyValidator();
    this.formGroup.setValidators([dateValidator, emptyValidator]);
    this.formGroup.updateValueAndValidity();
    this.formGroup.get(DateControl.START_DAY).updateValueAndValidity();
    this.formGroup.get(DateControl.END_DAY).updateValueAndValidity();
  }

  private validateForm(): boolean {
    // Reset validation error messages
    this.resetValidationErrorMessages();
    this.formGroup.updateValueAndValidity();
    this.formGroup.get(DateControl.START_DAY).updateValueAndValidity();
    this.formGroup.get(DateControl.END_DAY).updateValueAndValidity();

    if (!this.formGroup.valid) {
      if (this.formGroup.errors && this.formGroup.errors.errorType === FormErrorMsg.BOTH_DATE_EMPTY_CHECK) {
        this.dateValidationErrors.push({ controlId: DateControl.START_DAY, documentHRef: this.configStart.id, errorMessage: FormErrorMsg.START_DATE_EMPTY_CHECK_FAILED });
        this.dateValidationErrors.push({ controlId: DateControl.END_DAY, documentHRef: this.configEnd.id, errorMessage: FormErrorMsg.END_DATE_EMPTY_CHECK_FAILED });
        this.startDateErrorMessage = { isInvalid: true, messages: [FormErrorMsg.START_DATE_EMPTY_CHECK_FAILED] };
        this.endDateErrorMessage = { isInvalid: true, messages: [FormErrorMsg.END_DATE_EMPTY_CHECK_FAILED] };
        return false;
      }
      if (this.formGroup.errors && this.formGroup.errors.errorType === FormErrorMsg.START_DATE_EMPTY_CHECK) {
        this.dateValidationErrors.push({ controlId: DateControl.START_DAY, documentHRef: this.configStart.id, errorMessage: FormErrorMsg.START_DATE_EMPTY_CHECK_FAILED });
        this.startDateErrorMessage = { isInvalid: true, messages: [FormErrorMsg.START_DATE_EMPTY_CHECK_FAILED] };
        return false;
      }
      if (this.formGroup.errors && this.formGroup.errors.errorType === FormErrorMsg.END_DATE_EMPTY_CHECK) {
        this.dateValidationErrors.push({ controlId: DateControl.END_DAY, documentHRef: this.configEnd.id, errorMessage: FormErrorMsg.END_DATE_EMPTY_CHECK_FAILED });
        this.endDateErrorMessage = { isInvalid: true, messages: [FormErrorMsg.END_DATE_EMPTY_CHECK_FAILED] };
        return false;
      }
      if (! this.formGroup.get(DateControl.START_DAY).valid) {
        this.dateValidationErrors.push({ controlId: DateControl.START_DAY, documentHRef: this.configStart.id, errorMessage: FormErrorMsg.START_DATE_FAILED });
        this.startDateErrorMessage = { isInvalid: true, messages: [FormErrorMsg.START_DATE_FAILED] };
      }
      if (!this.formGroup.get(DateControl.END_DAY).valid) {
        this.dateValidationErrors.push({ controlId: DateControl.END_DAY, documentHRef: this.configEnd.id, errorMessage: FormErrorMsg.END_DATE_FAILED });
        this.endDateErrorMessage = { isInvalid: true, messages: [FormErrorMsg.END_DATE_FAILED] };
      }
      if (!this.formGroup.get(DateControl.DATE_TYPE).valid) {
        this.dateValidationErrors.push({ controlId: DateControl.START_DAY, documentHRef: this.configStart.id, errorMessage: FormErrorMsg.NO_SELECTION });
      }
      switch (this.formGroup.errors && this.formGroup.errors.errorType) {
        case FormErrorMsg.PAST_DATE_CHECK:
          this.dateValidationErrors.push({ controlId: DateControl.START_DAY, documentHRef: this.configStart.id, errorMessage: FormErrorMsg.PAST_DATE_CHECK_FAILED });
          break;
        case FormErrorMsg.DATE_COMPARISON:
          this.dateValidationErrors.push({ controlId: DateControl.START_DAY, documentHRef: this.configStart.id, errorMessage: FormErrorMsg.DATE_COMPARISON_FAILED });
          break;
        default:
          break;
      }
    }

    if (this.isAnyError()) {
      return false;
    } else {
      return true;
    }
  }

  public onSubmit(): void {
    if (!this.validateForm()) {
      // Scroll to error summary
      window.scrollTo({ top: 0, left: 0 });
    } else {
      // TODO: SAD - handle submit
      // this.onEventTrigger();
    }
  }

  public onEventTrigger() {
    // TODO: SAD - update functionality as needed ( below taken from booking-date component )
    // const {startDate, endDate} = this.getStartEndDate(this.formGroup.get('dateOption').value);
    // if (startDate && endDate) {
    //   this.bookingProcess.startDate = startDate;
    //   this.bookingProcess.endDate = endDate;
    //   this.eventTrigger.emit(BookingNavigationEvent.CONFIRMBOOKINGDATESUBMIT);
    // } else {
    //   this.submitted = true;
    // }
  }






  // TODO: SAD - remove this, only for reference
  // @Input() public bookingProcess: BookingProcess;
  // @Output() public eventTrigger = new EventEmitter();
  // public title: string;
  // public caption: string;
  // public dateInterval: DisplayedDateInterval[];
  // public formGroup: FormGroup;
  // public submitted = false;
  // public configStart: GovUiConfigModel;
  // public configEnd: GovUiConfigModel;
  // public dateValidationErrors: BookingDateValidationError[];
  // public startDateErrorMessage: ErrorMessagesModel;
  // public endDateErrorMessage: ErrorMessagesModel;
  // public formStatus: string;

  // constructor(
  //   private readonly fb: FormBuilder
  // ) {
  //   this.dateInterval = [
  //     { date: BookingDateOption.TODAY, checked: false },
  //     { date: BookingDateOption.WEEK, checked: false },
  //     { date: BookingDateOption.DATERANGE, checked: false },
  //   ];
  //   this.configStart = {
  //     id: 'startDate',
  //     name: 'startDate',
  //     hint: 'For example, 19 11 2021',
  //     label: 'Booking Starts',
  //     isPageHeading: false
  //   };
  //   this.configEnd = {
  //     id: 'endDate',
  //     name: 'endDate',
  //     hint: 'For example, 19 12 2021',
  //     label: 'Booking Ends',
  //     isPageHeading: false
  //   };
  // }

  // public ngOnInit(): void {
  //   this.title = BookingDatePageText.TITLE;
  //   this.caption = BookingDatePageText.CAPTION;
  //   this.formGroup = this.fb.group({
  //     dateOption: new FormControl(null, Validators.required),
  //     startDate_year: new FormControl(null, null),
  //     startDate_month: new FormControl(null, null),
  //     startDate_day: new FormControl(null, null),
  //     endDate_year: new FormControl(null, null),
  //     endDate_month: new FormControl(null, null),
  //     endDate_day: new FormControl(null, null)
  //   });
  //   this.formGroup.get('dateOption').patchValue(this.bookingProcess.selectedDateOption);
  //   if (typeof this.bookingProcess.selectedDateOption === 'number') {
  //     this.dateInterval[this.bookingProcess.selectedDateOption].checked = true;
  //     // convert the numeric index into the enumerated value
  //     this.formGroup.get(DateFormControl.BOOKING_DATE_TYPE).setValue(Object.values(BookingDateOption)[this.bookingProcess.selectedDateOption]);
  //     if (this.formGroup.get(DateFormControl.BOOKING_DATE_TYPE).value === BookingDateOption.DATERANGE && this.bookingProcess.startDate) {
  //       this.displayBookingDates();
  //     }
  //   }
  //   this.setValidators();
  // }

  // private displayBookingDates(): void {
  //   this.formGroup.get(DateFormControl.BOOKING_START_DAY).setValue(this.bookingProcess.startDate.getDate().toString().padStart(2, '0'));
  //   this.formGroup.get(DateFormControl.BOOKING_START_MONTH).setValue((this.bookingProcess.startDate.getMonth() + 1).toString().padStart(2, '0'));
  //   this.formGroup.get(DateFormControl.BOOKING_START_YEAR).setValue(this.bookingProcess.startDate.getFullYear());
  //   this.formGroup.get(DateFormControl.BOOKING_END_DAY).setValue(this.bookingProcess.endDate.getDate().toString().padStart(2, '0'));
  //   this.formGroup.get(DateFormControl.BOOKING_END_MONTH).setValue((this.bookingProcess.endDate.getMonth() + 1).toString().padStart(2, '0'));
  //   this.formGroup.get(DateFormControl.BOOKING_END_YEAR).setValue(this.bookingProcess.endDate.getFullYear());
  // }

  // public setValidators(): void {
  //   const bookingDateValidator = DateValidators.bookingDateValidator();
  //   const bookingEmptyValidator = DateValidators.bookingEmptyValidator();
  //   this.formGroup.setValidators([bookingDateValidator, bookingEmptyValidator]);
  //   this.formGroup.updateValueAndValidity();
  //   this.formGroup.get(DateFormControl.BOOKING_START_DAY).updateValueAndValidity();
  //   this.formGroup.get(DateFormControl.BOOKING_END_DAY).updateValueAndValidity();
  // }

  // private validateForm(): boolean {
  //   // Reset validation error messages
  //   this.resetValidationErrorMessages();
  //   this.formGroup.updateValueAndValidity();
  //   this.formGroup.get(DateFormControl.BOOKING_START_DAY).updateValueAndValidity();
  //   this.formGroup.get(DateFormControl.BOOKING_END_DAY).updateValueAndValidity();

  //   if (!this.formGroup.valid) {
  //     if (this.formGroup.errors && this.formGroup.errors.errorType === BookingDateFormErrorMessage.BOOKING_BOTH_DATE_EMPTY_CHECK) {
  //       this.dateValidationErrors.push({ controlId: DateFormControl.BOOKING_START_DAY, documentHRef: this.configStart.id, errorMessage: BookingDateFormErrorMessage.BOOKING_START_DATE_EMPTY_CHECK_FAILED });
  //       this.dateValidationErrors.push({ controlId: DateFormControl.BOOKING_END_DAY, documentHRef: this.configEnd.id, errorMessage: BookingDateFormErrorMessage.BOOKING_END_DATE_EMPTY_CHECK_FAILED });
  //       this.startDateErrorMessage = { isInvalid: true, messages: [BookingDateFormErrorMessage.BOOKING_START_DATE_EMPTY_CHECK_FAILED] };
  //       this.endDateErrorMessage = { isInvalid: true, messages: [BookingDateFormErrorMessage.BOOKING_END_DATE_EMPTY_CHECK_FAILED] };
  //       return false;
  //     }
  //     if (this.formGroup.errors && this.formGroup.errors.errorType === BookingDateFormErrorMessage.BOOKING_START_DATE_EMPTY_CHECK) {
  //       this.dateValidationErrors.push({ controlId: DateFormControl.BOOKING_START_DAY, documentHRef: this.configStart.id, errorMessage: BookingDateFormErrorMessage.BOOKING_START_DATE_EMPTY_CHECK_FAILED });
  //       this.startDateErrorMessage = { isInvalid: true, messages: [BookingDateFormErrorMessage.BOOKING_START_DATE_EMPTY_CHECK_FAILED] };
  //       return false;
  //     }
  //     if (this.formGroup.errors && this.formGroup.errors.errorType === BookingDateFormErrorMessage.BOOKING_END_DATE_EMPTY_CHECK) {
  //       this.dateValidationErrors.push({ controlId: DateFormControl.BOOKING_END_DAY, documentHRef: this.configEnd.id, errorMessage: BookingDateFormErrorMessage.BOOKING_END_DATE_EMPTY_CHECK_FAILED });
  //       this.endDateErrorMessage = { isInvalid: true, messages: [BookingDateFormErrorMessage.BOOKING_END_DATE_EMPTY_CHECK_FAILED] };
  //       return false;
  //     }
  //     if (! this.formGroup.get(DateFormControl.BOOKING_START_DAY).valid) {
  //       this.dateValidationErrors.push({ controlId: DateFormControl.BOOKING_START_DAY, documentHRef: this.configStart.id, errorMessage: BookingDateFormErrorMessage.BOOKING_START_DATE_FAILED });
  //       this.startDateErrorMessage = { isInvalid: true, messages: [BookingDateFormErrorMessage.BOOKING_START_DATE_FAILED] };
  //     }
  //     if (!this.formGroup.get(DateFormControl.BOOKING_END_DAY).valid) {
  //       this.dateValidationErrors.push({ controlId: DateFormControl.BOOKING_END_DAY, documentHRef: this.configEnd.id, errorMessage: BookingDateFormErrorMessage.BOOKING_END_DATE_FAILED });
  //       this.endDateErrorMessage = { isInvalid: true, messages: [BookingDateFormErrorMessage.BOOKING_END_DATE_FAILED] };
  //     }
  //     if (!this.formGroup.get(DateFormControl.BOOKING_DATE_TYPE).valid) {
  //       this.dateValidationErrors.push({ controlId: DateFormControl.BOOKING_START_DAY, documentHRef: this.configStart.id, errorMessage: BookingDateFormErrorMessage.NO_SELECTION });
  //     }
  //     switch (this.formGroup.errors && this.formGroup.errors.errorType) {
  //       case BookingDateFormErrorMessage.PAST_DATE_CHECK:
  //         this.dateValidationErrors.push({ controlId: DateFormControl.BOOKING_START_DAY, documentHRef: this.configStart.id, errorMessage: BookingDateFormErrorMessage.PAST_DATE_CHECK_FAILED });
  //         break;
  //       case BookingDateFormErrorMessage.DATE_COMPARISON:
  //         this.dateValidationErrors.push({ controlId: DateFormControl.BOOKING_START_DAY, documentHRef: this.configStart.id, errorMessage: BookingDateFormErrorMessage.BOOKING_DATE_COMPARISON_FAILED });
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  //   if (this.isAnyError()) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  // public resetValidationErrorMessages(): void {
  //   this.dateValidationErrors = [];
  //   this.startDateErrorMessage =
  //   this.endDateErrorMessage = null;
  // }

  // public isAnyError(): boolean {
  //   return Array.isArray(this.dateValidationErrors) && this.dateValidationErrors.length > 0;
  // }

  // public onSelectOption(selectedOption): void {
  //   if (selectedOption !== BookingDateOption.DATERANGE) {
  //     this.resetValidationErrorMessages();
  //     this.formGroup.setErrors(null);
  //   }
  //   this.bookingProcess.selectedDateOption = selectedOption;
  // }

  // public getStartEndDate(bookingDateOption: BookingDateOption): {startDate: Date, endDate: Date} {
  //   let startDate: Date;
  //   let endDate: Date;
  //   switch (bookingDateOption) {
  //     case BookingDateOption.TODAY:
  //       startDate = new Date();
  //       const now = new Date();
  //       endDate = new Date(now.setUTCHours(23, 59, 59, 999));
  //       break;
  //     case BookingDateOption.WEEK:
  //       startDate = new Date();
  //       const sunday = new Date();
  //       const sundayUTC = sunday.setTime(sunday.getTime() - ((sunday.getDay() ? sunday.getDay() : 7) - 7) * 24 * 60 * 60 * 1000);
  //       const sundayMidnightUTC = new Date(sundayUTC).setUTCHours(23, 59, 59, 999);
  //       endDate = new Date(sundayMidnightUTC);
  //       break;
  //     case BookingDateOption.DATERANGE:
  //       startDate = new Date(
  //                     this.formGroup.get(DateFormControl.BOOKING_START_YEAR).value,
  //                     this.formGroup.get(DateFormControl.BOOKING_START_MONTH).value - 1,
  //                     this.formGroup.get(DateFormControl.BOOKING_START_DAY).value
  //                   );
  //       const endDateMidnight = new Date(
  //                                 this.formGroup.get(DateFormControl.BOOKING_END_YEAR).value,
  //                                 this.formGroup.get(DateFormControl.BOOKING_END_MONTH).value - 1,
  //                                 this.formGroup.get(DateFormControl.BOOKING_END_DAY).value
  //                               ).setUTCHours(23, 59, 59, 999);
  //       endDate = new Date(endDateMidnight);
  //       break;
  //     default:
  //       break;
  //   }

  //   return {
  //     startDate,
  //     endDate
  //   };
  // }

  // public onSubmit(): void {
  //   if (!this.validateForm()) {
  //     // Scroll to error summary
  //     window.scrollTo({ top: 0, left: 0 });
  //   } else {
  //     this.onEventTrigger();
  //   }
  // }

  // public onEventTrigger() {
  //   const {startDate, endDate} = this.getStartEndDate(this.formGroup.get('dateOption').value);
  //   if (startDate && endDate) {
  //     this.bookingProcess.startDate = startDate;
  //     this.bookingProcess.endDate = endDate;
  //     this.eventTrigger.emit(BookingNavigationEvent.CONFIRMBOOKINGDATESUBMIT);
  //   } else {
  //     this.submitted = true;
  //   }
  // }
}

export interface DisplayedDateInterval {
  date: SpecificAccessDurationOption;
  checked: boolean;
}

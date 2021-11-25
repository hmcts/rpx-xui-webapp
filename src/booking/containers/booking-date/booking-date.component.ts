import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {  BookingNavigationEvent, BookingProcess} from '../../models';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  BookingDateOption,
  BookingDatePageText,
} from '../../models/booking-date.enum';
import { ErrorMessage } from '../../../app/models';
import { GovUiConfigModel } from '@hmcts/rpx-xui-common-lib/lib/gov-ui/models';

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
      hint: 'For example, 19 11 2021',
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
    });

    this.formGroup.get('dateOption').patchValue(this.bookingProcess.selectedDateOption);
    if (typeof this.bookingProcess.selectedDateOption === 'number') {
      this.dateInterval[this.bookingProcess.selectedDateOption].checked = true;
    }
    this.errorMessage = ERROR_TEMPLATE;
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

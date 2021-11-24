import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {  BookingNavigationEvent, NewBooking} from '../../models';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  TimeOption,
  BookingTimePageText,
} from '../../models/booking-date.enum';
import { ErrorMessage } from '../../../app/models';
import { GovUiConfigModel } from '@hmcts/rpx-xui-common-lib/lib/gov-ui/models';

@Component({
  selector: 'exui-booking-date',
  templateUrl: './booking-date.component.html',
  styleUrls: ['./booking-date.component.scss']
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
      isPageHeading: true,
      classes: 'date-head'
    };
    this.configEnd = {
      id: 'endDate',
      name: 'endDate',
      hint: 'For example, 19 11 2021',
      label: 'Booking Ends',
      isPageHeading: true,
      classes: 'date-head'
    };
  }

  public ngOnInit(): void {
    this.title = BookingTimePageText.TITLE;
    this.caption = BookingTimePageText.CAPTION;
    this.formGroup = this.fb.group({
      radioSelected: new FormControl(null, Validators.required),
      startDate_year: new FormControl(null, null),
      startDate_month: new FormControl(null, null),
      startDate_day: new FormControl(null, null),
      endDate_year: new FormControl(null, null),
      endDate_month: new FormControl(null, null),
      endDate_day: new FormControl(null, null),
    });
  }

  public onEventTrigger() {
    let startDate;
    let endDate;
    const now = new Date();
    switch (this.formGroup.get('radioSelected').value) {
      case TimeOption.TODAY:
        startDate = now;
        endDate = new Date(now.setUTCHours(23, 59, 59, 999));
        break;

      case TimeOption.WEEK:
          startDate = now;
          const sundayUTC = now.setTime(now.getTime() - (now.getDay() ? now.getDay() : 7) * 24 * 60 * 60 * 1000);
          const sundayMignightUTC = new Date(sundayUTC).setUTCHours(23, 59, 59, 999);
          endDate = new Date(sundayMignightUTC);
          break;

      case TimeOption.DATERANGE:
          startDate = new Date();
          endDate = new Date();
          break;
      default:
        break;
    }

    console.log(startDate, endDate);
    // this.eventTrigger.emit(BookingNavigationEvent.CONFIRMBOOKINGDATESUBMIT);
  }
}

export interface DisplayedDateInterval {
  date: TimeOption;
  checked: boolean;
}

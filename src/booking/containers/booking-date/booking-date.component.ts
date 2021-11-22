import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { BookingNavigation } from '../../models';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { TimeOption, BookingTimePageText } from '../../models/booking-date.enum';
import { ErrorMessage } from '../../../app/models';
import { GovUiConfigModel } from '@hmcts/rpx-xui-common-lib/lib/gov-ui/models';

@Component({
  selector: 'exui-booking-date',
  templateUrl: './booking-date.component.html',
  styleUrls: ['./booking-date.component.scss']
})
export class BookingDateComponent implements OnInit {

  @Input() public navEvent: BookingNavigation;

  public title: string;
  public caption: string;
  public caseRefLabel: string;
  public readonly dateInterval: DisplayedDateInterval[];
  public formGroup: FormGroup;
  public submitted = false;
  public errorMessage: ErrorMessage;
  private readonly genericError = 'There is a problem';
  private readonly radioSelectedControlName = 'radioSelected';
  private readonly caseReferenceControlName = 'caseReference';
  private readonly otherReasonControlName = 'otherReason';
  public $roleAssignmentResponseSubscription: Subscription;
  public duedate = '2021-06-30T16:53:10+0100';
  public configStart: GovUiConfigModel;
  public configEnd: GovUiConfigModel;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    //private readonly casesService: CasesService,
    private readonly route: ActivatedRoute
  ) {
      this.dateInterval = [
        {date: TimeOption.TODAY, checked: false},
        {date: TimeOption.WEEK, checked: false},
        {date: TimeOption.DATERANGE, checked: false},
      ];

    this.configStart =

  {
    id: 'startDate',
    name: 'startDate',
    hint: 'For example, 19 11 2021',
    //classes: 'govuk-input--width-10',
    label: 'Booking Starts',
   // type: 'text',
    isPageHeading: true,
    legend: 'test',

  };
  this.configEnd =

  {
    id: 'startDate',
    name: 'startDate',
    hint: 'For example, 19 11 2021',
    //classes: 'govuk-input--width-10',
    label: 'Booking Ends',
    isPageHeading: true,
    legend: 'test',

  };
    }

   

    public ngOnInit(): void {
      
      this.title = BookingTimePageText.TITLE;
      this.caption = BookingTimePageText.CAPTION;
      this.caseRefLabel = BookingTimePageText.TITLE;
      this.formGroup = this.fb.group({
        radioSelected: new FormControl(null, Validators.required),
        caseRef_day: new FormControl(null, null),
        caseRef: new FormControl(null, null),
        startDate_year: new FormControl(null, null),
        startDate_month: new FormControl(null, null),
        startDate_day:new FormControl(null, null),

      });
    }
    public toDate(value: string | number | Date): Date {
      if (value) {
        const d = new Date(value);
        return isNaN(d.getTime()) ? null : d;
      }
      return null;
    }
    private inputEmpty(input: AbstractControl): boolean {
      return input.value == null || input.value.trim().length === 0;
    }
  
    public onChange(): void {

    }
    public onSubmit(): void {
      
    }
  
    public onCancel(): void {
      
      window.history.go(-2);
    }
  
    public ngOnDestroy(): void {
      // if (this.$roleAssignmentResponseSubscription) {
      //   this.$roleAssignmentResponseSubscription.unsubscribe();
      // }
    }  

}

export interface DisplayedDateInterval {
  date: TimeOption,
  checked: boolean
}


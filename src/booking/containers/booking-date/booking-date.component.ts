import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { BookingNavigation } from '../../models';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TimeOption, ChallengedAccessRequestErrors, BookingTimePageText } from '../../models/booking-date.enum';
import { ErrorMessage } from '../../../app/models';

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
    }

    public ngOnInit(): void {
      this.title = BookingTimePageText.TITLE;
      this.caption = BookingTimePageText.CAPTION;
      this.caseRefLabel = BookingTimePageText.TITLE;
      this.formGroup = this.fb.group({
        radioSelected: new FormControl(null, Validators.required)
      });
      this.formGroup.addControl(this.caseReferenceControlName,
        new FormControl('', {
          validators: [(control: AbstractControl): {[key: string]: boolean} | null => {
            if (this.formGroup.get(this.radioSelectedControlName).value === TimeOption.DATERANGE && this.inputEmpty(control)) {
              return {'invalid': true};
            }
            return null;
          }],
          updateOn: 'submit'
        })
      );
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


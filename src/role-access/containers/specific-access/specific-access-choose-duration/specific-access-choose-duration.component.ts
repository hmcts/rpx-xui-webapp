import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DurationOfRole } from '../../../models';

@Component({
  selector: 'exui-specific-access-choose-duration',
  templateUrl: './specific-access-choose-duration.component.html',
  styleUrls: ['./specific-access-choose-duration.component.scss']
})

export class SpecificAccessChooseDurationComponent implements OnInit {
  public static sevenDaysDesc = 'Starts from today and ends at midnight 7 days from now.';
  public static indefiniteDesc = 'Access starts from today and lasts while the case is open.';
  public static anotherPeriodDesc = 'You’ll need to provide both a start and end date for access to the case.';

  public readonly allDurations: DurationDescription[];
  public anotherPeriod: boolean;
  public selectedDuration: DurationOfRole;

  // form group and controls
  public formGroup: FormGroup;
  public dayStartDate: FormControl;
  public monthStartDate: FormControl;
  public yearStartDate: FormControl;
  public dayEndDate: FormControl;
  public monthEndDate: FormControl;
  public yearEndDate: FormControl;
  public radioSelected: FormControl;

  constructor(
    private readonly builder: FormBuilder
  ) {
    this.allDurations = [
    { id: '1', duration: DurationOfRole.SEVEN_DAYS, description: SpecificAccessChooseDurationComponent.sevenDaysDesc, checked: false },
    { id: '2', duration: DurationOfRole.INDEFINITE, description:  SpecificAccessChooseDurationComponent.indefiniteDesc, checked: false },
    { id: '3', duration: DurationOfRole.ANOTHER_PERIOD, description: SpecificAccessChooseDurationComponent.anotherPeriodDesc, checked: false }
    ];
    this.dayStartDate = new FormControl('', [Validators.required, Validators.min(1), Validators.max(31)]);
    this.monthStartDate = new FormControl('', [Validators.required, Validators.min(1), Validators.max(12)]);
    this.yearStartDate = new FormControl('', Validators.required);
    this.dayEndDate = new FormControl(['', Validators.required, Validators.min(1), Validators.max(31)]);
    this.monthEndDate = new FormControl('', [Validators.required, Validators.min(1), Validators.max(12)]);
    this.yearEndDate = new FormControl('', Validators.required);
    this.radioSelected = new FormControl('', Validators.required);
  }

  public ngOnInit(): void {
    this.formGroup = this.builder.group({
      dayStartDate: this.dayStartDate,
      monthStartDate: this.monthStartDate,
      yearStartDate: this.yearStartDate,
      dayEndDate: this.dayEndDate,
      monthEndDate: this.monthEndDate,
      yearEndDate: this.yearEndDate,
      radioSelected: this.radioSelected
    });
  }

  public onItemChange(item: DurationOfRole): void {
    this.anotherPeriod = item === DurationOfRole.ANOTHER_PERIOD;
    this.selectedDuration = item;
  }

}

// TODO: SACD - move interface to models
export interface DurationDescription {
  id: string;
  duration: DurationOfRole;
  description: string;
  checked: boolean;
}

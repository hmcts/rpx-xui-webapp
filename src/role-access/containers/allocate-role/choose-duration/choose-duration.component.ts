import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AllocateRoleNavigation, AllocateRoleNavigationEvent, AllocateRoleState, DurationOfRole, Period } from '../../../models';
import * as fromFeature from '../../../store';

@Component({
  selector: 'exui-choose-duration',
  templateUrl: './choose-duration.component.html',
})

export class ChooseDurationComponent implements OnInit {

  public static sevenDaysDesc = 'Starts from today and ends at midnight 7 days from now.';
  public static indefiniteDesc = 'Starts from today and lasts while the case is open.';
  public static anotherPeriodDesc = 'You’ll need to provide both a start and end date for the role.';

  @Input() public navEvent: AllocateRoleNavigation;
  public radioSelected: FormControl;
  public condition: boolean;
  public title: string;
  public readonly allDurations: DurationDescription [];
  public selectedDuration: DurationOfRole;
  public dayStartDate: FormControl;
  public monthStartDate: FormControl;
  public yearStartDate: FormControl;
  public dayEndDate: FormControl;
  public monthEndDate: FormControl;
  public yearEndDate: FormControl;
  public formGroup: FormGroup;

  constructor(private readonly store: Store<fromFeature.State>,
              private readonly builder: FormBuilder) {
    this.allDurations = [
      { duration: DurationOfRole.SEVEN_DAYS, description: ChooseDurationComponent.sevenDaysDesc, checked: false },
      { duration: DurationOfRole.INDEFINITE, description:  ChooseDurationComponent.indefiniteDesc, checked: true },
      { duration: DurationOfRole.ANOTHER_PERIOD, description: ChooseDurationComponent.anotherPeriodDesc, checked: false }
    ];
    this.dayStartDate = new FormControl([Validators.required, Validators.min(1), Validators.max(31)]);
    this.monthStartDate = new FormControl([Validators.required, Validators.min(1), Validators.max(12)]);
    this.yearStartDate = new FormControl(Validators.required);
    this.dayEndDate = new FormControl([Validators.required, Validators.min(1), Validators.max(31)]);
    this.monthEndDate = new FormControl([Validators.required, Validators.min(1), Validators.max(12)]);
    this.yearEndDate = new FormControl(Validators.required);
    this.radioSelected = new FormControl(Validators.required);
   }

  public ngOnInit(): void {
    this.title = 'Allocate a hearing judge';
    this.formGroup = this.builder.group({
      dayStartDate: this.dayStartDate,
      monthStartDate: this.monthStartDate,
      yearStartDate: this.yearStartDate,
      dayEndDate: this.dayEndDate,
      monthEndDate: this.monthEndDate,
      yearEndDate: this.yearEndDate,
      radioSelected: this.radioSelected
    });
    this.selectedDuration = DurationOfRole.INDEFINITE;
  }

  public navigationHandler(navEvent: AllocateRoleNavigationEvent): void {
    const period = this.getPeriod(this.selectedDuration);
    if (period) {
      period.startDate.setHours(0, 0, 0, 0);
      if (period.endDate) {
        period.endDate.setHours(0, 0, 0, 0);
      }
      switch (navEvent) {
        case AllocateRoleNavigationEvent.CONTINUE:
          this.store.dispatch(new fromFeature.ChooseDurationAndGo({
              durationOfRole: this.selectedDuration,
              period,
              allocateRoleState: AllocateRoleState.CHECK_ANSWERS}
            ));
          break;
        default:
          throw new Error('Invalid option');
      }
    }
  }

  public getPeriod(duration: DurationOfRole): Period {
    switch (duration) {
      case DurationOfRole.SEVEN_DAYS: {
        const nextDate = new Date().setDate(new Date().getDate() + 7);
        return {
          startDate: new Date(),
          endDate: new Date(nextDate)
        }
      }
      case DurationOfRole.INDEFINITE: {
        return {
          startDate: new Date(),
          endDate: null
        }
      }
      case DurationOfRole.ANOTHER_PERIOD: {
        if (this.formGroup.valid && this.datesValid()) {
          return {
            startDate: new Date(this.yearStartDate.value, this.monthStartDate.value - 1, this.dayStartDate.value),
            endDate: new Date(this.yearEndDate.value, this.monthEndDate.value - 1, this.dayEndDate.value),
          }
        }
      }
    }
  }

  public datesValid(): boolean {
    const startDate = new Date(this.yearStartDate.value, this.monthStartDate.value - 1, this.dayStartDate.value);
    const endDate = new Date(this.yearEndDate.value, this.monthEndDate.value - 1, this.dayEndDate.value);
    return startDate && endDate && startDate < endDate;
  }

  public onItemChange(item: DurationOfRole) {
    this.condition = item === DurationOfRole.ANOTHER_PERIOD;
    this.selectedDuration = item;
  }
}

export interface DurationDescription {
  duration: DurationOfRole;
  description: string;
  checked: boolean
}

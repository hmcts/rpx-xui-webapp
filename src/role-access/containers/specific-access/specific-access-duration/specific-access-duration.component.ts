import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import {
  DurationTypeDescription,
  Period,
  SpecificAccessStateData,
  SpecificAccessNavigation,
  SpecificAccessNavigationEvent
} from '../../../models';
import { DurationType } from '../../../models/enums';
import { DurationHelperService } from '../../../services/duration-helper.service';
import * as fromFeature from '../../../store';

@Component({
  selector: 'exui-specific-access-duration',
  templateUrl: './specific-access-duration.component.html',
  styleUrls: ['./specific-access-duration.component.scss']
})

export class SpecificAccessDurationComponent implements OnInit {
  public static sevenDaysDesc = 'Starts from today and ends at midnight 7 days from now.';
  public static indefiniteDesc = 'Starts from today and lasts while the case is open.';
  public static anotherPeriodDesc = 'You’ll need to provide both a start and end date for the role.';

  @Input() public navEvent: SpecificAccessNavigation;
  public radioSelected: FormControl;
  public anotherPeriod: boolean;
  public caption = 'Approve specific access request';
  public title = 'How long do you want to give access to this case for?';
  public readonly durations: DurationTypeDescription[];
  public selectedDuration: DurationType;
  public dayStartDate: FormControl;
  public monthStartDate: FormControl;
  public yearStartDate: FormControl;
  public dayEndDate: FormControl;
  public monthEndDate: FormControl;
  public yearEndDate: FormControl;
  public formGroup: FormGroup;
  public isEndDateError: boolean;
  public isStartDateError: boolean;
  public startDateErrorMessage: string;
  public endDateErrorMessage: string;

  constructor(
    private durationHelperService: DurationHelperService,
    private readonly store: Store<fromFeature.State>,
    private readonly builder: FormBuilder
  ) {
    this.durations = [
      { id: '1', duration: DurationType.SEVEN_DAYS, description: SpecificAccessDurationComponent.sevenDaysDesc, checked: false },
      { id: '2', duration: DurationType.INDEFINITE, description:  SpecificAccessDurationComponent.indefiniteDesc, checked: false },
      { id: '3', duration: DurationType.ANOTHER_PERIOD, description: SpecificAccessDurationComponent.anotherPeriodDesc, checked: false }
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

    this.store.pipe(select(fromFeature.getSpecificAccessState)).subscribe((specificAccessState) => {
      this.selectSpecificAccessDuration(specificAccessState);
    });
  }

  public selectSpecificAccessDuration(specificAccessState: SpecificAccessStateData) {
    // TODO: SARD - this will be wired up correctly in another ticket. Hint: see role-access/allocate-role/choose-duration
    console.log(specificAccessState);
    this.selectedDuration = DurationType.SEVEN_DAYS;
    this.durations.find(duration => duration.duration === this.selectedDuration).checked = true;
  }

  public navigationHandler(navEvent: SpecificAccessNavigationEvent): void {
    this.resetPreviousErrors();
    const period = this.getPeriod(this.selectedDuration);
    if (period) {
      switch (navEvent) {
        case SpecificAccessNavigationEvent.CONTINUE:
          // TODO: SARD - this will be handled in another ticket.
          // this.store.dispatch(new fromFeature.ChooseDurationAndGo({
          //     durationOfRole: this.selectedDuration,
          //     period,
          //     allocateRoleState: SpecificAccessState.CHECK_ANSWERS}
          //   ));
          break;
        default:
          throw new Error('Invalid option');
      }
    }
  }
  public resetPreviousErrors(): void {
    this.isStartDateError = false;
    this.isEndDateError = false;
    this.startDateErrorMessage = '';
    this.endDateErrorMessage = '';
  }

  public getPeriod(duration: DurationType): Period {
    switch (duration) {
      case DurationType.SEVEN_DAYS: {
        return {
          startDate: this.durationHelperService.getTodaysDate(),
          endDate: this.durationHelperService.getDateInFuture(7)
        };
      }
      case DurationType.INDEFINITE: {
        return {
          startDate: this.durationHelperService.getTodaysDate(),
          endDate: null
        };
      }
      case DurationType.ANOTHER_PERIOD: {
        if (this.isDateValid() && this.formGroup.valid && this.startDateNotInPast() && this.startDateLessThanEndDate()) {
          return {
            startDate: this.getStartDate(),
            endDate: this.getEndDate(),
          };
        }
      }
    }
  }

  /**
   * Check if the end date is after the start date
   * @returns boolean for whether the end date is after the start date
   */
  public startDateLessThanEndDate(): boolean {
    if (this.getStartDate() > this.getEndDate()) {
      this.isEndDateError = true;
      this.endDateErrorMessage = 'The access end date must be after the access start date';
      return false;
    }
    return true;
  }

  /**
   * Check if start date is in the past
   * @returns boolean for whether the date is in the past or not
   */
  public startDateNotInPast(): boolean {
    if (this.getStartDate() < this.getTodayDate()) {
      this.isStartDateError = true;
      this.startDateErrorMessage = 'The access start date must not be in the past';
      return false;
    }
    return true;
  }

  /**
   * Checks validity of start and end dates
   */
  public isDateValid(): boolean {
    const startDate = this.durationHelperService.convertDateControlsToString(this.dayStartDate, this.monthStartDate, this.yearStartDate);
    const endDate = this.durationHelperService.convertDateControlsToString(this.dayEndDate, this.monthEndDate, this.yearEndDate);
    const dateCheck = this.durationHelperService.checkDates(startDate, endDate);
    if (!dateCheck.isStartDateValid) {
      this.startDateErrorMessage = 'Invalid Start date';
      this.isStartDateError = true;
    }
    if (!dateCheck.isEndDateValid) {
      this.endDateErrorMessage = 'Invalid End date';
      this.isEndDateError = true;
    }
    return dateCheck.isStartDateValid && dateCheck.isEndDateValid;
  }

  /**
   * Returns a date object representing todays date
   */
  public getTodayDate(): Date {
    return this.durationHelperService.getTodaysDate();
  }

  /**
   * Returns a date object for the provided start date controls
   */
  public getStartDate(): Date {
    return this.durationHelperService.getDateFromControls(
      this.dayStartDate,
      this.monthStartDate,
      this.yearStartDate
    );
  }

  /**
   * Returns a date object for the provided end date controls
   */
  public getEndDate(): Date {
    return this.durationHelperService.getDateFromControls(
      this.dayEndDate,
      this.monthEndDate,
      this.yearEndDate
    );
  }

  /**
   * Handler for when the duration is changed
   * @param item the DurationType the user selected
   */
  public onDurationChange(item: DurationType): void {
    this.anotherPeriod = item === DurationType.ANOTHER_PERIOD;
    this.selectedDuration = item;
  }

  /**
   * Returns class string for date input fields
   */
  public getInputClass(isError: boolean, isYear = false): string {
    return this.durationHelperService.getInputClass(isError, isYear);
  }

}

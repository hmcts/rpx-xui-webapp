import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { $enum as EnumUtil } from 'ts-enum-util';
import {
  Actions,
  AllocateRoleStateData,
  Period,
  SpecificAccessState,
  SpecificAccessNavigation,
  SpecificAccessNavigationEvent
} from '../../../models';
import { DurationType } from '../../../models/enums';
import { DurationHelperService } from '../../../services/duration-helper.service';
import * as fromFeature from '../../../store';
import { getTitleText } from '../../../utils';

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
  public readonly durations: DurationDescription [];
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
  public dateFormat = 'YYYY-MM-DD';

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
    // TODO: SARD - refactor or remove
    // this.store.pipe(select(fromFeature.getAllocateRoleState)).subscribe(roleAllocate => {
    //   this.selectDurationRole(roleAllocate);
    // });
  }

  // TODO: SARD - refactor or remove
  // public selectDurationRole(roleAllocate: AllocateRoleStateData) {
  //   const action = EnumUtil(Actions).getKeyOrDefault(roleAllocate.action);
  //   const typeOfRole = roleAllocate.typeOfRole;
  //   this.title = getTitleText(typeOfRole, action, roleAllocate.roleCategory);
  //   this.selectedDuration = roleAllocate.durationOfRole;
  //   this.durations.find(duration => duration.duration === this.selectedDuration).checked = true;
  //   this.anotherPeriod = this.selectedDuration === DurationType.ANOTHER_PERIOD;
  //   if (this.anotherPeriod && roleAllocate.period) {
  //     this.radioSelected.setValue(this.selectedDuration);
  //     if (roleAllocate.period.startDate) {
  //       this.dayStartDate.setValue(roleAllocate.period.startDate.getDate());
  //       this.monthStartDate.setValue(roleAllocate.period.startDate.getMonth() + 1);
  //       this.yearStartDate.setValue(roleAllocate.period.startDate.getFullYear());
  //     }
  //     if (roleAllocate.period.endDate) {
  //       this.dayEndDate.setValue(roleAllocate.period.endDate.getDate());
  //       this.monthEndDate.setValue(roleAllocate.period.endDate.getMonth() + 1);
  //       this.yearEndDate.setValue(roleAllocate.period.endDate.getFullYear());
  //     }
  //   }
  // }

  public navigationHandler(navEvent: SpecificAccessNavigationEvent): void {
    this.resetPreviousErrors();
    const period = this.getPeriod(this.selectedDuration);
    if (period) {
      switch (navEvent) {
        case SpecificAccessNavigationEvent.CONTINUE:
          // TODO: SARD - handle store dispatch
          console.log('dispatch event');
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
        const nextDate = this.getTodayDate().setDate(new Date().getDate() + 7);
        return {
          startDate: this.getTodayDate(),
          endDate: new Date(nextDate)
        };
      }
      case DurationType.INDEFINITE: {
        return {
          startDate: this.getTodayDate(),
          endDate: null
        };
      }
      case DurationType.ANOTHER_PERIOD: {
        if (this.isDateValid() && this.datesMissing() && this.formGroup.valid && this.startDateNotInPast() && this.startDateLessThanEndDate()) {
          return {
            startDate: this.getStartDate(),
            endDate: this.getEndDate(),
          };
        }
      }
    }
  }

  // TODO: SARD - move to base class
  public startDateLessThanEndDate(): boolean {
    const startDate = this.getStartDate();
    const endDate = this.getEndDate();
    if (startDate > endDate) {
      this.isEndDateError = true;
      this.endDateErrorMessage = 'The role end date must be after the role start date';
      return false;
    }
    return true;
  }

  // TODO: SARD - move to base class
  public startDateNotInPast(): boolean {
    const startDate = this.getStartDate();
    const currentDate = this.getTodayDate();
    if (startDate < currentDate) {
      this.isStartDateError = true;
      this.startDateErrorMessage = 'The role start date must not be in the past';
      return false;
    }
    return true;
  }

  // TODO: SARD - move to base class
  public datesMissing(): boolean {
    let dateMissing = true;
    if (!parseInt(this.dayStartDate.value, 10) || !parseInt(this.monthStartDate.value, 10) || !parseInt(this.yearStartDate.value, 10)) {
      this.startDateErrorMessage = 'Please enter some value';
      this.isStartDateError = true;
      dateMissing = false;
    }

    if (!parseInt(this.dayEndDate.value, 10) || !parseInt(this.monthEndDate.value, 10) || !parseInt(this.yearEndDate.value, 10)) {
      this.endDateErrorMessage = 'Please enter some value';
      this.isEndDateError = true;
      dateMissing = false;
    }
    return dateMissing;
  }

  public isDateValid(): boolean {
    const startDate = this.durationHelperService.convertDateControlsToString([this.dayStartDate, this.monthStartDate, this.yearStartDate]);
    const endDate = this.durationHelperService.convertDateControlsToString([this.dayEndDate, this.monthEndDate, this.yearEndDate]);
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

  public getTodayDate(): Date {
    return this.durationHelperService.getTodaysDate();
  }

  public getStartDate(): Date {
    return this.durationHelperService.getDateFromControls(
      this.dayStartDate,
      this.monthStartDate,
      this.yearStartDate
    );
  }

  public getEndDate(): Date {
    return this.durationHelperService.getDateFromControls(
      this.dayEndDate,
      this.monthEndDate,
      this.yearEndDate
    );
  }

  public onDurationChange(item: DurationType): void {
    this.anotherPeriod = item === DurationType.ANOTHER_PERIOD;
    this.selectedDuration = item;
  }

  /**
   * Returns a string used for the class on date input fields
   * @param isError whether there is an input error
   * @param isYear whether the input is a year field
   * @return the class string for the input field
   */
  public getInputClass(isError: boolean, isYear = false): string {
    const inputClass = `govuk-input govuk-date-input__input govuk-input--width-${isYear ? '4' : '2'}`;
    return isError ? `${inputClass} date-error` : inputClass;
  }

}

export interface DurationDescription {
  id: string;
  duration: DurationType;
  description: string;
  checked: boolean;
}

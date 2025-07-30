import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import moment from 'moment';
import { $enum as EnumUtil } from 'ts-enum-util';
import {
  Actions,
  AllocateRoleNavigation,
  AllocateRoleNavigationEvent,
  AllocateRoleState,
  AllocateRoleStateData,
  DurationOfRole,
  Period
} from '../../../models';
import * as fromFeature from '../../../store';
import { getTitleText } from '../../../utils';

@Component({
    selector: 'exui-choose-duration',
    templateUrl: './choose-duration.component.html',
    styleUrls: ['./choose-duration.component.scss'],
    standalone: false
})

export class ChooseDurationComponent implements OnInit {
  public static sevenDaysDesc = 'Starts from today and ends at midnight 7 days from now.';
  public static indefiniteDesc = 'Starts from today and lasts while the case is open.';
  public static anotherPeriodDesc = 'You’ll need to provide both a start and end date for the role.';

  @Input() public navEvent: AllocateRoleNavigation;
  public radioSelected: FormControl;
  public anotherPeriod: boolean;
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
  public isEndDateError: boolean;
  public isStartDateError: boolean;
  public startDateErrorMessage: string;
  public endDateErrorMessage: string;
  public dateFormat = 'YYYY-MM-DD';

  constructor(private readonly store: Store<fromFeature.State>,
              private readonly builder: FormBuilder) {
    this.allDurations = [
      { id: '1', duration: DurationOfRole.SEVEN_DAYS, description: ChooseDurationComponent.sevenDaysDesc, checked: false },
      { id: '2', duration: DurationOfRole.INDEFINITE, description: ChooseDurationComponent.indefiniteDesc, checked: false },
      { id: '3', duration: DurationOfRole.ANOTHER_PERIOD, description: ChooseDurationComponent.anotherPeriodDesc, checked: false }
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
    this.store.pipe(select(fromFeature.getAllocateRoleState)).subscribe((roleAllocate) => {
      this.selectDurationRole(roleAllocate);
    });
  }

  public selectDurationRole(roleAllocate: AllocateRoleStateData) {
    const action = EnumUtil(Actions).getKeyOrDefault(roleAllocate.action);
    const typeOfRole = roleAllocate.typeOfRole;
    this.title = getTitleText(typeOfRole, action, roleAllocate.roleCategory);
    this.selectedDuration = roleAllocate.durationOfRole;
    this.allDurations.find((duration) => duration.duration === this.selectedDuration).checked = true;
    this.anotherPeriod = this.selectedDuration === DurationOfRole.ANOTHER_PERIOD;
    if (this.anotherPeriod && roleAllocate.period) {
      this.radioSelected.setValue(this.selectedDuration);
      if (roleAllocate.period.startDate) {
        this.dayStartDate.setValue(roleAllocate.period.startDate.getDate());
        this.monthStartDate.setValue(roleAllocate.period.startDate.getMonth() + 1);
        this.yearStartDate.setValue(roleAllocate.period.startDate.getFullYear());
      }
      if (roleAllocate.period.endDate) {
        this.dayEndDate.setValue(roleAllocate.period.endDate.getDate());
        this.monthEndDate.setValue(roleAllocate.period.endDate.getMonth() + 1);
        this.yearEndDate.setValue(roleAllocate.period.endDate.getFullYear());
      }
    }
  }

  public navigationHandler(navEvent: AllocateRoleNavigationEvent): void {
    this.resetPreviousErrors();
    const period = this.getPeriod(this.selectedDuration);
    if (period) {
      switch (navEvent) {
        case AllocateRoleNavigationEvent.CONTINUE:
          this.store.dispatch(new fromFeature.ChooseDurationAndGo({
            durationOfRole: this.selectedDuration,
            period,
            allocateRoleState: AllocateRoleState.CHECK_ANSWERS }
          ));
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

  public getPeriod(duration: DurationOfRole): Period {
    switch (duration) {
      case DurationOfRole.SEVEN_DAYS: {
        const nextDate = this.getTodayDate().setDate(new Date().getDate() + 7);
        return {
          startDate: this.getTodayDate(),
          endDate: new Date(nextDate)
        };
      }
      case DurationOfRole.INDEFINITE: {
        return {
          startDate: this.getTodayDate(),
          endDate: null
        };
      }
      case DurationOfRole.ANOTHER_PERIOD: {
        if (this.isDateValid() && this.datesMissing() && this.formGroup.valid && this.startDateNotInPast() && this.startDateLessThanEndDate()) {
          return {
            startDate: this.getStartDate(),
            endDate: this.getEndDate()
          };
        }

        break;
      }
      default:
        break;
    }
  }

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

  public isDateValid() {
    const startDate = `${this.yearStartDate.value}-${this.formatString(this.monthStartDate.value)}-${this.formatString(this.dayStartDate.value)}`;
    const isStartDateValid = moment(startDate, this.dateFormat, true).isValid();
    if (!isStartDateValid) {
      this.startDateErrorMessage = 'Invalid Start date';
      this.isStartDateError = true;
    }

    const endDate = `${this.yearEndDate.value}-${this.formatString(this.monthEndDate.value)}-${this.formatString(this.dayEndDate.value)}`;
    const isEndDateValid = moment(endDate, this.dateFormat, true).isValid();
    if (!isEndDateValid) {
      this.endDateErrorMessage = 'Invalid End date';
      this.isEndDateError = true;
    }
    return isStartDateValid && isEndDateValid;
  }

  private formatString(month: number) {
    return month >= 10 ? month.toString() : `0${month}`;
  }

  public getTodayDate(): Date {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return currentDate;
  }

  public getStartDate(): Date {
    return new Date(this.yearStartDate.value, this.monthStartDate.value - 1, this.dayStartDate.value);
  }

  public getEndDate(): Date {
    return new Date(this.yearEndDate.value, this.monthEndDate.value - 1, this.dayEndDate.value);
  }

  public onItemChange(item: DurationOfRole): void {
    this.anotherPeriod = item === DurationOfRole.ANOTHER_PERIOD;
    this.selectedDuration = item;
  }
}

export interface DurationDescription {
  id: string;
  duration: DurationOfRole;
  description: string;
  checked: boolean;
}

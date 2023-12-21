import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorMessagesModel, GovUiConfigModel } from '@hmcts/rpx-xui-common-lib/lib/gov-ui/models';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import {
  DurationTypeDescription,
  Period, SpecificAccessNavigation,
  SpecificAccessNavigationEvent, SpecificAccessStateData
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
  // static properties
  public static anotherPeriodDesc = 'Access will start today, you’ll need to provide an end date.';
  public static indefiniteDesc = 'Access starts from today and lasts while the case is open.';
  public static sevenDaysDesc = 'Starts from today and ends at midnight 7 days from now.';

  // input bindings
  @Input() public navEvent: SpecificAccessNavigation;

  // properties
  public specificAccessStateData: SpecificAccessStateData;
  public anotherPeriod: boolean;
  public caption = 'Approve specific access request';
  public configStart: GovUiConfigModel;
  public configEnd: GovUiConfigModel;
  public today = new Date();
  public durations: DurationTypeDescription[];
  public endDateErrorMessage: ErrorMessagesModel;
  public selectedDuration: DurationType;
  public startDateErrorMessage: ErrorMessagesModel;
  public title = 'How long do you want to give access to this case for?';
  public approvalRole = { id: 'specific-access-granted', name: 'specific-access-granted' };

  // form group and controls
  public formGroup: FormGroup;
  public endDateDayCtrl: FormControl;
  public endDateMonthCtrl: FormControl;
  public endDateYearCtrl: FormControl;

  public readonly = true;

  constructor(
    private readonly durationHelper: DurationHelperService,
    private readonly fb: FormBuilder,
    private readonly store: Store<fromFeature.State>
  ) {
    this.durations = [
      { id: '1', duration: DurationType.SEVEN_DAYS, description: SpecificAccessDurationComponent.sevenDaysDesc, checked: false },
      { id: '2', duration: DurationType.INDEFINITE, description: SpecificAccessDurationComponent.indefiniteDesc, checked: false },
      { id: '3', duration: DurationType.ANOTHER_PERIOD, description: SpecificAccessDurationComponent.anotherPeriodDesc, checked: false }
    ];
    this.configEnd = {
      id: 'endDate',
      name: 'endDate',
      hint: 'For example, 01 05 2022',
      label: 'Access Ends'
    };
  }

  public ngOnInit(): void {
    this.formGroup = this.fb.group({
      dateOption: new FormControl(null, Validators.required),
      endDate_day: new FormControl(null, null),
      endDate_month: new FormControl(null, null),
      endDate_year: new FormControl(null, null)
    });
    this.setFormControlRefs();
    this.store.pipe(select(fromFeature.getSpecificAccessState)).pipe(take(1)).subscribe((specificAccessState) => {
      this.specificAccessStateData = specificAccessState;
      this.selectSpecificAccessDuration(specificAccessState);
    });
  }

  public setFormControlRefs(): void {
    this.endDateDayCtrl = this.formGroup.get('endDate_day') as FormControl;
    this.endDateMonthCtrl = this.formGroup.get('endDate_month') as FormControl;
    this.endDateYearCtrl = this.formGroup.get('endDate_year') as FormControl;
  }

  public selectSpecificAccessDuration(specificAccessState: SpecificAccessStateData): void {
    // TODO: SARD - this will be wired up correctly in another ticket ( 5505? ). Hint: see role-access/allocate-role/choose-duration
    this.selectedDuration = DurationType.SEVEN_DAYS;

    if (specificAccessState.specificAccessFormData && specificAccessState.specificAccessFormData.specificAccessDurationForm.selectedOption) {
      this.selectedDuration = specificAccessState.specificAccessFormData.specificAccessDurationForm.selectedOption;
      if (this.selectedDuration === DurationType.ANOTHER_PERIOD) {
        this.anotherPeriod = true;
        this.endDateDayCtrl.setValue(specificAccessState.specificAccessFormData.specificAccessDurationForm.selectedDuration.endDate.day);
        this.endDateMonthCtrl.setValue(specificAccessState.specificAccessFormData.specificAccessDurationForm.selectedDuration.endDate.month);
        this.endDateYearCtrl.setValue(specificAccessState.specificAccessFormData.specificAccessDurationForm.selectedDuration.endDate.year);
      }
    }

    this.durations.find((duration) => duration.duration === this.selectedDuration).checked = true;
  }

  public navigationHandler(navEvent: SpecificAccessNavigationEvent): void {
    this.resetPreviousErrors();
    const period = this.getPeriod(this.selectedDuration);
    if (period) {
      switch (navEvent) {
        case SpecificAccessNavigationEvent.CONTINUE:
          this.store.dispatch(new fromFeature.ApproveSpecificAccessRequest({ specificAccessStateData: this.specificAccessStateData, period }));
          break;
        default:
          throw new Error('Invalid option');
      }
    } else {
      throw new Error('Invalid period');
    }
  }

  public resetPreviousErrors(): void {
    this.startDateErrorMessage = { isInvalid: false, messages: [] };
    this.endDateErrorMessage = { isInvalid: false, messages: [] };
  }

  public getRawData(): any {
    const endDate = this.durationHelper.getRawFromControlsValues(this.endDateDayCtrl, this.endDateMonthCtrl, this.endDateYearCtrl);
    return { endDate };
  }

  public getPeriod(duration: DurationType): Period {
    switch (duration) {
      case DurationType.SEVEN_DAYS: {
        return {
          startDate: this.durationHelper.getTodaysDate(),
          endDate: this.durationHelper.getDateInFuture(7)
        };
      }
      case DurationType.INDEFINITE: {
        return {
          startDate: this.durationHelper.getTodaysDate(),
          endDate: null
        };
      }
      case DurationType.ANOTHER_PERIOD: {
        // get start and end dates
        let startDate = this.durationHelper.getTodaysDate();
        let endDate = this.durationHelper.getDateFromControls(this.endDateDayCtrl, this.endDateMonthCtrl, this.endDateYearCtrl);

        startDate = this.durationHelper.setStartTimeOfDay(startDate);
        endDate = this.durationHelper.setEndTimeOfDay(endDate);

        // check that both the start and end dates are valid looking dates
        const dateCheck = this.durationHelper.checkDates(
          this.durationHelper.convertDateControlsToString(this.endDateDayCtrl, this.endDateMonthCtrl, this.endDateYearCtrl)
        );
        const datesValid = dateCheck.isEndDateValid;

        // check end date is after today
        const startDateBeforeEndDate = this.durationHelper.startDateBeforeEndDate(startDate, endDate);

        // if all checks pass return object with startDate and endDate
        if (datesValid && startDateBeforeEndDate) {
          return {
            startDate,
            endDate
          };
        }

        // display the errors in the UI
        if (!datesValid) {
          if (!dateCheck.isEndDateValid) {
            this.endDateErrorMessage = { isInvalid: true, messages: ['Invalid End date'] };
          }
        } else {
          if (!startDateBeforeEndDate) {
            this.endDateErrorMessage = { isInvalid: true, messages: ['The access end date must be after the access start date'] };
          }
        }
      }
    }
  }

  /**
   * Handler for when the duration is changed
   * @param item the DurationType the user selected
   */
  public onDurationChange(item: DurationType): void {
    this.anotherPeriod = item === DurationType.ANOTHER_PERIOD;
    this.selectedDuration = item;
  }
}

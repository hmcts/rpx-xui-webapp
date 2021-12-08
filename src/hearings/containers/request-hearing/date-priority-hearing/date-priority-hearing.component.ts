import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ErrorMessagesModel, GovUiConfigModel } from '@hmcts/rpx-xui-common-lib/lib/gov-ui/models';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { HearingDateEnum, HearingDatePriorityConstEnum, HearingDatePriorityEnum } from '../../../../hearings/models/hearings.enum';
import { PartyUnavailabilityRange } from '../../../../hearings/models/partyUnavilabilityRange.model';
import { RefDataModel } from '../../../../hearings/models/refData.model';
import { HearingsService } from '../../../../hearings/services/hearings.service';
import { ValidatorsService } from '../../../../hearings/services/validators.service';
import * as fromHearingStore from '../../../../hearings/store';

@Component({
  selector: 'exui-date-priority-hearing',
  templateUrl: './date-priority-hearing.component.html',
  styleUrls: ['./date-priority-hearing.component.scss']
})
export class DatePriorityHearingComponent implements OnInit {
  public priorityForm: FormGroup;
  public priorities: RefDataModel[];
  public checkedHearingAvailability: string;
  public partiesNotAvailableDates: string[] = [];
  public firstHearingDate: GovUiConfigModel;
  public earliestHearingDate: GovUiConfigModel;
  public latestHearingDate: GovUiConfigModel;
  public validationErrors: { id: string, message: string }[] = [];
  public hearingLengthErrorValue: string;
  public hearingPriorityError: string;
  public hearingPriorityDateError: string;
  public firstDateOfHearingError: ErrorMessagesModel;
  public earliestDateOfHearingError: ErrorMessagesModel;
  public latestDateOfHearingError: ErrorMessagesModel;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly route: ActivatedRoute,
              private readonly validatorsService: ValidatorsService,
              private readonly hearingStore: Store<fromHearingStore.State>,
              private readonly hearingsService: HearingsService) { }

  public get firstHearingFormGroup(): FormGroup {
    return this.priorityForm.controls.firstHearing as FormGroup;
  }

  private get dateRangeHearingFormGroup(): FormGroup {
    return this.priorityForm.controls.dateRangeHearing as FormGroup;
  }

  public get earliestHearingFormGroup(): FormGroup {
    return this.dateRangeHearingFormGroup.controls.earliestHearing as FormGroup;
  }

  public get latestHearingFormGroup(): FormGroup {
    return this.dateRangeHearingFormGroup.controls.latestHearing as FormGroup;
  }

  public ngOnInit(): void {
    this.priorities = this.route.snapshot.data.hearingPriorities.sort((currentPriority, nextPriority) => (currentPriority.order < nextPriority.order ? -1 : 1));
    this.initDateConfig();
    this.initForm();
    this.hearingStore.pipe(select(fromHearingStore.getHearingValuesModel),
      map((hearingValues): PartyUnavailabilityRange[] => hearingValues && hearingValues.parties && hearingValues.parties.map(dates => dates.unavailability).flat()))
      .subscribe((unavailabilityDateList: PartyUnavailabilityRange[]) => {
        if (unavailabilityDateList) {
          this.checkUnavailableDatesList(unavailabilityDateList);
        }
      });
    this.hearingsService.requestHearingForm$.subscribe((routeName: string) => {
      this.onSubmit();
    });
  }

  public initDateConfig(): void {
    this.firstHearingDate = {
      id: 'firstHearingDate',
      name: 'firstHearingDate',
      hint: '',
      classes: 'govuk-fieldset__legend govuk-fieldset__legend--s',
      label: 'The first date of the hearing must be'
    };

    this.earliestHearingDate = {
      id: 'earliestHearingDate',
      name: 'earliestHearingDate',
      hint: '',
      classes: 'govuk-fieldset__legend govuk-fieldset__legend--s',
      label: 'Earliest hearing date'
    };
    this.latestHearingDate = {
      id: 'latestHearingDate',
      name: 'latestHearingDate',
      hint: '',
      classes: 'govuk-fieldset__legend govuk-fieldset__legend--s',
      label: 'Latest hearing date'
    };
  }

  public initForm(): void {
    this.priorityForm = this.formBuilder.group({
      durationLength: this.formBuilder.group({
        hours: ['', [this.validatorsService.numberMinMaxValidator(HearingDatePriorityConstEnum.MinHours, HearingDatePriorityConstEnum.MaxHours)]],
        minutes: ['', [this.validatorsService.numberMultipleValidator(HearingDatePriorityConstEnum.MinutesMuliplier)]]
      }, { validator: this.validatorsService.minutesValidator(HearingDatePriorityConstEnum.TotalMinMinutes, HearingDatePriorityConstEnum.TotalMaxMinutes) }),
      specificDate: ['', Validators.required],
      firstHearing: this.formBuilder.group({
        firstHearingDate_day: [],
        firstHearingDate_month: [],
        firstHearingDate_year: [],
      }),
      dateRangeHearing: this.formBuilder.group({
        earliestHearing: this.formBuilder.group({
          earliestHearingDate_day: [],
          earliestHearingDate_month: [],
          earliestHearingDate_year: [],
        }),
        latestHearing: this.formBuilder.group({
          latestHearingDate_day: [],
          latestHearingDate_month: [],
          latestHearingDate_year: [],
        }),
      }),
      priority: ['', Validators.required]
    });
  }

  public showDateAvailability(): void {
    this.checkedHearingAvailability = this.priorityForm.controls.specificDate.value;
    this.firstHearingFormGroup.clearValidators();
    this.dateRangeHearingFormGroup.clearValidators();
    if (this.checkedHearingAvailability === 'Yes') {
      this.firstHearingFormGroup.setValidators([this.validatorsService.hearingDateValidator()]);
    } else if (this.checkedHearingAvailability === 'Choose') {
      this.dateRangeHearingFormGroup.setValidators([this.validatorsService.hearingDateRangeValidator()]);
    }
    this.firstHearingFormGroup.updateValueAndValidity();
    this.dateRangeHearingFormGroup.updateValueAndValidity();
  }

  public checkUnavailableDatesList(dateList: PartyUnavailabilityRange[]): void {
    dateList.forEach(dateRange => {
      this.setUnavailableDates(dateRange);
    });
    this.partiesNotAvailableDates.sort((currentDate, previousDate) => new Date(currentDate).getTime() - new Date(previousDate).getTime());
  }

  public setUnavailableDates(dateRange): void {
    const startDate = moment(dateRange.start);
    const endDate = moment(dateRange.end);

    while (startDate <= endDate) {
      const currentDate = startDate.format(HearingDateEnum.DisplayMonth);
      if (this.isWeekDay(startDate) && !this.partiesNotAvailableDates.includes(currentDate)) {
        this.partiesNotAvailableDates.push(currentDate);
      }
      startDate.add(1, 'd');
    }
  }

  public isWeekDay(givenDate: moment.Moment): boolean {
    return (givenDate.weekday() !== 6) && (givenDate.weekday() !== 0);
  }

  public checkFormData(): void {
    this.validationErrors = [];
    this.hearingLengthErrorValue = null;
    this.latestDateOfHearingError = null;
    this.earliestDateOfHearingError = null;
    this.firstDateOfHearingError = null;
    this.hearingPriorityError = null;
    this.hearingPriorityDateError = null;
    if (!this.priorityForm.valid) {
      // Hearing Length check
      const durationLengthFormGroup = this.priorityForm.controls.durationLength;
      if (durationLengthFormGroup.pristine || !durationLengthFormGroup.get('hours').valid) {
        this.hearingLengthErrorValue = HearingDatePriorityEnum.LengthError;
        this.validationErrors.push({ id: 'durationhours', message: HearingDatePriorityEnum.LengthError });
      } else if (!durationLengthFormGroup.get('minutes').valid) {
        this.hearingLengthErrorValue = HearingDatePriorityEnum.LengthMinutesError;
        this.validationErrors.push({ id: 'durationmins', message: HearingDatePriorityEnum.LengthMinutesError });
      } else if (!durationLengthFormGroup.valid) {
        this.hearingLengthErrorValue = HearingDatePriorityEnum.TotalLengthError;
        this.validationErrors.push({ id: 'durationhours', message: HearingDatePriorityEnum.TotalLengthError });
      }
      // Hearing Date check
      if (!this.priorityForm.controls.specificDate.valid) {
        this.hearingPriorityDateError = HearingDatePriorityEnum.PriorityDateError;
        this.validationErrors.push({ id: 'noSpecificDate', message: HearingDatePriorityEnum.PriorityDateError });
      } else if (this.priorityForm.controls.specificDate.value === 'Yes') {
        const isInValidDate = this.getDateFormatted(this.firstHearingFormGroup, this.firstHearingDate.id).includes(null);
        const choosenDate = moment(this.getDateFormatted(this.firstHearingFormGroup, this.firstHearingDate.id), HearingDateEnum.DefaultFormat);
        const isPastDate = choosenDate.isBefore() || choosenDate.isSame(new Date(), 'd');
        const isFirstHearingDateValid = moment(choosenDate, HearingDateEnum.DefaultFormat, true).isValid();
        const isWeekday = this.isWeekDay(choosenDate);
        if (isInValidDate) {
          this.validationErrors.push({ id: this.firstHearingDate.id, message: HearingDatePriorityEnum.InValidHearingDateError });
          this.firstDateOfHearingError = { isInvalid: true, messages: [HearingDatePriorityEnum.InValidHearingDateError] };
        } else if (!isFirstHearingDateValid) {
          this.validationErrors.push({ id: this.firstHearingDate.id, message: HearingDatePriorityEnum.DateRangeError });
          this.firstDateOfHearingError = { isInvalid: true, messages: [HearingDatePriorityEnum.DateRangeError] };
        } else if (!isWeekday) {
          this.validationErrors.push({ id: this.firstHearingDate.id, message: HearingDatePriorityEnum.WeekendError });
          this.firstDateOfHearingError = { isInvalid: true, messages: [HearingDatePriorityEnum.WeekendError] };
        } else if (isPastDate) {
          this.validationErrors.push({ id: this.firstHearingDate.id, message: HearingDatePriorityEnum.DatePastError });
          this.firstDateOfHearingError = { isInvalid: true, messages: [HearingDatePriorityEnum.DatePastError] };
        }
      } else if (this.priorityForm.controls.specificDate.value === 'Choose') {
        const isInValidEarliestDate = this.getDateFormatted(this.earliestHearingFormGroup, this.earliestHearingDate.id).includes(null);
        const isInValidLatestDate = this.getDateFormatted(this.latestHearingFormGroup, this.latestHearingDate.id).includes(null);
        const choosenEarliestDate = moment(this.getDateFormatted(this.earliestHearingFormGroup, this.earliestHearingDate.id), HearingDateEnum.DefaultFormat);
        const choosenLatestDate = moment(this.getDateFormatted(this.latestHearingFormGroup, this.latestHearingDate.id), HearingDateEnum.DefaultFormat);
        const isPastEarliestDate = choosenEarliestDate.isBefore() || choosenEarliestDate.isSame(new Date(), 'd');
        const isPastLatestDate = choosenLatestDate.isBefore() || choosenLatestDate.isSame(new Date(), 'd');
        const isLatestBeforeEarliest = choosenEarliestDate > choosenLatestDate;
        const isEarliestDateValid = choosenEarliestDate.isValid();
        const isLatestHearingDate = choosenLatestDate.isValid();
        if (!isInValidEarliestDate && isPastEarliestDate) {
          this.validationErrors.push({ id: this.earliestHearingDate.id, message: HearingDatePriorityEnum.DatePastError });
          this.earliestDateOfHearingError = { isInvalid: true, messages: [HearingDatePriorityEnum.DatePastError] };
        } else if (!isInValidLatestDate && isPastLatestDate) {
          this.validationErrors.push({ id: this.latestHearingDate.id, message: HearingDatePriorityEnum.DatePastError });
          this.latestDateOfHearingError = { isInvalid: true, messages: [HearingDatePriorityEnum.DatePastError] };
        } else if (isInValidEarliestDate || isInValidLatestDate || !isEarliestDateValid || !isLatestHearingDate) {
          if ((this.earliestHearingFormGroup.dirty || (this.earliestHearingFormGroup.pristine && this.latestHearingFormGroup.pristine)) && (isInValidEarliestDate || !isEarliestDateValid)) {
            this.validationErrors.push({ id: this.earliestHearingDate.id, message: HearingDatePriorityEnum.DateRangeError });
            this.earliestDateOfHearingError = { isInvalid: true, messages: [HearingDatePriorityEnum.DateRangeError] };
          }
          if ((this.latestHearingFormGroup.dirty || (this.earliestHearingFormGroup.pristine && this.latestHearingFormGroup.pristine)) && (isInValidLatestDate || !isLatestHearingDate)) {
            this.validationErrors.push({ id: this.latestHearingDate.id, message: HearingDatePriorityEnum.DateRangeError });
            this.latestDateOfHearingError = { isInvalid: true, messages: [HearingDatePriorityEnum.DateRangeError] };
          }
        } else if (isEarliestDateValid && isLatestHearingDate && isLatestBeforeEarliest) {
          this.validationErrors.push({ id: this.earliestHearingDate.id, message: HearingDatePriorityEnum.EarliestHearingDateError });
          this.earliestDateOfHearingError = { isInvalid: true, messages: [HearingDatePriorityEnum.EarliestHearingDateError] };
        }
      }
      // Hearing Priority check
      if (!this.priorityForm.controls.priority.valid) {
        this.hearingPriorityError = HearingDatePriorityEnum.PriorityError;
        this.validationErrors.push({ id: this.priorities[0].key, message: HearingDatePriorityEnum.PriorityError });
      }
    }
  }

  private getDateFormatted(formGroup: FormGroup, fieldName: string): string {
    const day = formGroup.get(`${fieldName}_day`).value;
    const month = formGroup.get(`${fieldName}_month`).value;
    const year = formGroup.get(`${fieldName}_year`).value;
    if (day === '' || month === '' || year === '') {
      return null;
    }
    return `${day}-${month}-${year}`;
  }

  public onSubmit(): void {
    this.checkFormData();
  }
}

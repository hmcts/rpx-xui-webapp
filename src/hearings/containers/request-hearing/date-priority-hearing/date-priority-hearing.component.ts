import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GovUiConfigModel } from '@hmcts/rpx-xui-common-lib/lib/gov-ui/models';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { HearingsService } from 'src/hearings/services/hearings.service';
import { ValidatorsService } from 'src/hearings/services/validators.service';
import { PartyUnavailabilityRange } from '../../../../hearings/models/partyUnavilabilityRange.model';
import { RefDataModel } from '../../../../hearings/models/refData.model';
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
  public isHearingLengthNotValid: boolean;
  public hearingLengthErrorValue: string;
  public hearingLengthError: string = 'Enter a valid hearing length';
  public hearingTotalLengthError = 'Enter a valid length of hearing, it must be between 5 minutes and 6 hours';
  public isHearingPriorityNotValid: boolean;
  public hearingPriorityError: string = 'Select the priority level of the hearing';

  constructor(private readonly formBuilder: FormBuilder,
              private readonly route: ActivatedRoute,
              private readonly validatorsService: ValidatorsService,
              private readonly hearingStore: Store<fromHearingStore.State>,
              private readonly hearingsService: HearingsService) { }

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
        hours: ['', [Validators.required, this.validatorsService.numberMinMaxValidator(0, 6)]],
        minutes: ['', [Validators.required, this.validatorsService.numberMinMaxValidator(0, 59)]]
      }, { validator: this.validatorsService.minutesValidator(5, 360) }),
      firstHearingDate_day: [],
      firstHearingDate_month: [],
      firstHearingDate_year: [],
      earliestHearingDate_day: [],
      earliestHearingDate_month: [],
      earliestHearingDate_year: [],
      latestHearingDate_day: [],
      latestHearingDate_month: [],
      latestHearingDate_year: [],
      hearingAvailability: [],
      priority: ['', Validators.required]
    });
  }

  public showDateAvailability(): void {
    this.checkedHearingAvailability = this.priorityForm.get('hearingAvailability').value;
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
      const currentDate = startDate.format('DD MMMM YYYY');
      const isWeekDay: boolean = (startDate.weekday() !== 6) && (startDate.weekday() !== 0);
      if (isWeekDay && !this.partiesNotAvailableDates.includes(currentDate)) {
        this.partiesNotAvailableDates.push(currentDate);
      }
      startDate.add(1, 'd');
    }
  }

  public checkFormData(): void {
    this.validationErrors = [];
    this.hearingLengthErrorValue = this.hearingLengthError;
    this.isHearingLengthNotValid = false;
    this.isHearingPriorityNotValid = false;
    if (!this.priorityForm.valid) {
      if (!this.priorityForm.controls.durationLength.get('hours').valid) {
        this.isHearingLengthNotValid = true;
        this.validationErrors.push({ id: 'durationhours', message: this.hearingLengthError });
      } else if (!this.priorityForm.controls.durationLength.get('minutes').valid) {
        this.isHearingLengthNotValid = true;
        this.validationErrors.push({ id: 'durationmins', message: this.hearingLengthError });
      } else if (!this.priorityForm.controls.durationLength.valid) {
        this.isHearingLengthNotValid = true;
        this.hearingLengthErrorValue = this.hearingTotalLengthError;
        this.validationErrors.push({ id: 'durationhours', message: this.hearingTotalLengthError });
      }
      if (!this.priorityForm.controls.priority.valid) {
        this.isHearingPriorityNotValid = true;
        this.validationErrors.push({ id: this.priorities[0].key, message: this.hearingPriorityError });
      }
    }
  }

  public onSubmit(): void {
    this.checkFormData();
  }
}

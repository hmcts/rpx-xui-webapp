import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { combineLatest, Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { ActualHearingsUtils } from '../../../../hearings/utils/actual-hearings.utils';
import { ActualHearingDayModel, HearingActualsMainModel, PlannedHearingDayModel } from '../../../models/hearingActualsMainModel';
import { HearingActualsStateData } from '../../../models/hearingActualsStateData.model';
import { HearingActualsTimingErrorMessages } from '../../../models/hearings.enum';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import { ValidatorsUtils } from '../../../utils/validators.utils';

@Component({
  selector: 'exui-hearing-actuals-timing',
  templateUrl: './hearing-actuals-timing.component.html'
})
export class HearingActualsTimingComponent implements OnInit, OnDestroy {

  public formGroup: FormGroup;
  public caseTitle: string;
  public submitted: boolean = false;
  public errors: any[] = [];
  private hearingActualsMainModel: HearingActualsMainModel;
  private sub: Subscription;
  private id: string;
  private hearingDate: string;
  private existingActualDay: ActualHearingDayModel;
  private existingPlannedDay: PlannedHearingDayModel;


  public constructor(private readonly fb: FormBuilder,
                     private readonly hearingStore: Store<fromHearingStore.State>,
                     private readonly router: Router,
                     private readonly route: ActivatedRoute,
                     private readonly hearingsService: HearingsService,
                     private readonly validatorsUtils: ValidatorsUtils,
  ) {
  }

  private getStartTime(hearingActuals: HearingActualsMainModel): string {
    const plannedTime = this.existingPlannedDay && this.existingPlannedDay.plannedStartTime;
    const actualTime = this.existingActualDay && this.existingActualDay.hearingStartTime;
    return actualTime ? this.getTime(actualTime) : this.getTime(plannedTime);
  }

  private getPauseStartTime(hearingActuals: HearingActualsMainModel): string {
    const actualTime = this.existingActualDay && this.existingActualDay.pauseDateTimes && this.existingActualDay.pauseDateTimes.length && this.existingActualDay.pauseDateTimes[0];
    return actualTime && actualTime.pauseStartTime ? this.getTime(actualTime.pauseStartTime) : null;
  }

  private getPauseEndTime(hearingActuals: HearingActualsMainModel): string {
    const actualTime = this.existingActualDay && this.existingActualDay.pauseDateTimes && this.existingActualDay.pauseDateTimes.length && this.existingActualDay.pauseDateTimes[0];
    return actualTime && actualTime.pauseEndTime ? this.getTime(actualTime.pauseEndTime) : null;
  }

  private getEndTime(hearingActuals: HearingActualsMainModel): string {
    const actualTime = this.existingActualDay && this.existingActualDay.hearingEndTime;
    const plannedTime = this.existingPlannedDay && this.existingPlannedDay.plannedEndTime;
    return actualTime ? this.getTime(actualTime) : this.getTime(plannedTime);
  }

  private replaceTime(dateTime: string, time: moment.Moment): string {
    return moment(dateTime, 'YYYY-MM-DDTHH:mm:ssZ').set({
      hour: time.get('hour'),
      minute: time.get('minute'),
    }).format('YYYY-MM-DDTHH:mm:ss');
  }

  private getTime(time: string): string {
    return time ? moment(time).format('HH:mm') : null;
  }

  private getDate(dateTime: string): string {
    return dateTime ? moment(dateTime).format('YYYY-MM-DD') : null;
  }

  public ngOnInit() {
    this.sub = combineLatest([this.hearingStore.select(fromHearingStore.getHearingActuals), this.route.paramMap])
      .pipe(
        filter(([state]: [HearingActualsStateData, ParamMap]) => !!state.hearingActualsMainModel),
      )
      .subscribe(([state, params]: [HearingActualsStateData, ParamMap]) => {
        this.id = params.get('id');
        this.hearingDate = params.get('d');
        this.hearingActualsMainModel = state.hearingActualsMainModel;
        this.existingActualDay = this.hearingActualsMainModel.hearingActuals.actualHearingDays.find(d => d.hearingDate === this.hearingDate);
        this.existingPlannedDay = this.hearingActualsMainModel.hearingPlanned.plannedHearingDays.find(p => moment(p.plannedStartTime).format('YYYY-MM-DD') === this.hearingDate);
        this.caseTitle = this.hearingActualsMainModel.caseDetails.hmctsInternalCaseName;
        this.formGroup = this.createFormGroup(this.hearingActualsMainModel);
        this.subscribeToFormChanges(this.formGroup);
        this.subscribeToRecordPauseControl(this.formGroup.get('recordTimes') as FormControl);
      });
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public onSubmit(value: any, valid: boolean): void {
    this.submitted = true;
    this.errors = [];
    if (!valid) {
      this.setErrors(this.formGroup.errors);
      return;
    }
    this.submitted = false;

    const hearingStartTime = (this.existingActualDay && this.existingActualDay.hearingStartTime)
      || (this.existingPlannedDay && this.existingPlannedDay.plannedStartTime);

    const hearingEndTime = (this.existingActualDay && this.existingActualDay.hearingEndTime)
      || (this.existingPlannedDay && this.existingPlannedDay.plannedEndTime);

    const pauseStartTime = this.existingActualDay && this.existingActualDay.pauseDateTimes && this.existingActualDay.pauseDateTimes.length > 0
      && this.existingActualDay.pauseDateTimes[0] && this.existingActualDay.pauseDateTimes[0].pauseStartTime;

    const pauseEndTime = this.existingActualDay && this.existingActualDay.pauseDateTimes && this.existingActualDay.pauseDateTimes.length > 0
      && this.existingActualDay.pauseDateTimes[0] && this.existingActualDay.pauseDateTimes[0].pauseEndTime;

    const hearingDate = this.getDate(hearingStartTime);
    const isPauseStartTimeValid = moment(pauseStartTime, 'YYYY-MM-DDTHH:mm:ssZ', true).isValid();
    let changedPauseStartTime;
    let changedPauseEndTime;
    const moPauseStartTime = moment(value.pauseStartTime, 'HH:mm');
    const moPauseEndTime = moment(value.pauseEndTime, 'HH:mm');
    if (isPauseStartTimeValid) {
      changedPauseStartTime = this.replaceTime(pauseStartTime, moPauseStartTime);
    } else {
      changedPauseStartTime = this.replaceTime(hearingDate, moPauseStartTime);
    }
    const isPauseEndTimeValid = moment(pauseEndTime, 'YYYY-MM-DDTHH:mm:ssZ', true).isValid();
    if (isPauseEndTimeValid) {
      changedPauseEndTime = this.replaceTime(pauseEndTime, moPauseEndTime);
    } else {
      changedPauseEndTime = this.replaceTime(hearingDate, moPauseEndTime);
    }
    let pauseDateTimes = null;

    if (value.pauseStartTime && value.pauseEndTime) {
      pauseDateTimes = [
        {
          pauseStartTime: changedPauseStartTime,
          pauseEndTime: changedPauseEndTime
        }
      ];
    }

    let hearingActuals;

    if (this.existingActualDay) {
      hearingActuals = {
        ...this.hearingActualsMainModel.hearingActuals,
        actualHearingDays: [
          {
            ...this.existingActualDay,
            hearingDate: this.hearingDate,
            hearingStartTime: this.replaceTime(hearingStartTime, moment(value.hearingStartTime, 'HH:mm')),
            hearingEndTime: this.replaceTime(hearingEndTime, moment(value.hearingEndTime, 'HH:mm')),
            pauseDateTimes
          }
        ]
      };
    } else {
      const actualDay = {
        hearingDate: moment(this.existingPlannedDay.plannedStartTime).format('YYYY-MM-DD'),
        hearingStartTime: this.existingPlannedDay.plannedStartTime,
        hearingEndTime: this.existingPlannedDay.plannedEndTime,
        notRequired: false,
        pauseDateTimes,
        actualDayParties: []
      } as ActualHearingDayModel;
      this.hearingActualsMainModel.hearingActuals.actualHearingDays.push(actualDay);
      hearingActuals = {
        ...this.hearingActualsMainModel.hearingActuals,
        actualHearingDays: [
          ...actualDay,
          hearingDate,
          hearingStartTime,
          hearingEndTime,
          pauseDateTimes,
        ]
      };
    }



    ActualHearingsUtils.isHearingDaysUpdated = true;
    this.hearingStore.dispatch(new fromHearingStore.UpdateHearingActuals({
      hearingId: this.id,
      hearingActuals
    }));
    this.router.navigate([`/hearings/actuals/${this.id}/hearing-actual-add-edit-summary`]);
  }

  public updateControl(event: any, control: AbstractControl): void {
    control.setValue(event.target.value);
    control.updateValueAndValidity();
  }

  private createFormGroup(hearingActuals: HearingActualsMainModel): FormGroup {
    return this.fb.group({
      hearingStartTime: [this.getStartTime(hearingActuals), [
        Validators.required,
        this.validatorsUtils.mandatory('Enter hearing start time'),
        this.validatorsUtils.validTime(HearingActualsTimingErrorMessages.VALID_TIME)
      ]
      ],
      hearingEndTime: [this.getEndTime(hearingActuals), [
        this.validatorsUtils.mandatory('Enter hearing finish time'),
        this.validatorsUtils.validTime(HearingActualsTimingErrorMessages.VALID_TIME)
      ]
      ],
      recordTimes: [
        !this.getPauseStartTime(hearingActuals) && !this.getPauseEndTime(hearingActuals)
          ? null : 'yes',
        [this.validatorsUtils.mandatory('Select if you need to record times the hearing was paused')]
      ],
      pauseStartTime: [this.getPauseStartTime(hearingActuals), [
        this.validatorsUtils.validTime(HearingActualsTimingErrorMessages.VALID_TIME)]],
      pauseEndTime: [this.getPauseEndTime(hearingActuals), [
        this.validatorsUtils.validTime(HearingActualsTimingErrorMessages.VALID_TIME)]],
    }, {
      updateOn: 'blur',
      validators: [
        this.validatorsUtils.validateTimeRange(
          'hearingStartTime',
          'hearingEndTime',
          HearingActualsTimingErrorMessages.START_TIME_BEFORE_FINISH_TIME),
        this.validatorsUtils.validateTimeRange(
          'pauseStartTime',
          'pauseEndTime',
          HearingActualsTimingErrorMessages.PAUSE_TIME_BEFORE_RESUME_TIME),
        this.validatorsUtils.validatePauseTimeRange(
          'pauseStartTime',
          { startTime: 'hearingStartTime', endTime: 'hearingEndTime' },
          HearingActualsTimingErrorMessages.PAUSE_TIME_BETWEEN_START_TIME_AND_FINISH_TIMES,
          'invalidPauseStartTimeRange'),
        this.validatorsUtils.validatePauseTimeRange(
          'pauseEndTime',
          { startTime: 'hearingStartTime', endTime: 'hearingEndTime' },
          HearingActualsTimingErrorMessages.RESUME_TIME_BETWEEN_START_TIME_AND_FINISH_TIMES,
          'invalidPauseEndTimeRange'
        )
      ],
    });
  }

  private subscribeToFormChanges(formGroup: FormGroup): void {
    formGroup.valueChanges.subscribe(() => {
      this.submitted = false;
    });
  }

  private subscribeToRecordPauseControl(control: FormControl): void {
    control.valueChanges.subscribe((value: string) => {
      if (value === 'yes') {
        this.formGroup.get('pauseStartTime').setValidators([
          this.validatorsUtils.mandatory('Enter pause time'),
          this.validatorsUtils.validTime(HearingActualsTimingErrorMessages.VALID_TIME)
        ]);
        this.formGroup.get('pauseEndTime').setValidators([
          this.validatorsUtils.mandatory('Enter resume time'),
          this.validatorsUtils.validTime(HearingActualsTimingErrorMessages.VALID_TIME)]
        );
        this.formGroup.updateValueAndValidity();
      } else {
        this.formGroup.get('pauseStartTime').setValue(null);
        this.formGroup.get('pauseEndTime').setValue(null);
        this.formGroup.get('pauseStartTime').clearValidators();
        this.formGroup.get('pauseEndTime').clearValidators();
        this.formGroup.get('pauseStartTime').updateValueAndValidity();
        this.formGroup.get('pauseEndTime').updateValueAndValidity();
      }
    });
  }

  private setErrors(errors: { [key: string]: string }): void {
    this.errors = this.getAllErrorsMessagesFromControls(this.formGroup);
    if (!errors) {
      return;
    }
    Object.keys(errors).forEach((key: string) => {
      const error = errors[key];
      if (error) {
        this.errors = [...this.errors, ...this.getErrorMessages(error, key)];
      }
    });
  }

  private getErrorMessages(error: any, control: string): any[] {
    return Object.keys(error).map((key) => ({ id: control, message: error[key].message }));
  }

  private getAllErrorsMessagesFromControls(formGroup: FormGroup): any[] {
    const errors = [];
    Object.keys(formGroup.controls).forEach((key: string) => {
      const control = formGroup.get(key);
      if (control.errors) {
        errors.push(...this.getErrorMessages(control.errors, key));
      }
    });
    return errors;
  }
}

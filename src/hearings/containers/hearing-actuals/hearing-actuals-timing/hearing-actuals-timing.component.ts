import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { combineLatest, Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { ActualHearingDayModel, HearingActualsMainModel } from '../../../models/hearingActualsMainModel';
import { HearingActualsStateData } from '../../../models/hearingActualsStateData.model';
import { HearingActualsTimingErrorMessages } from '../../../models/hearings.enum';
import * as fromHearingStore from '../../../store';
import { ActualHearingsUtils } from '../../../utils/actual-hearings.utils';
import { ValidatorsUtils } from '../../../utils/validators.utils';

@Component({
  selector: 'exui-hearing-actuals-timing',
  templateUrl: './hearing-actuals-timing.component.html'
})
export class HearingActualsTimingComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;
  public caseTitle: string;
  public submitted = false;
  public errors: any[] = [];
  private hearingActuals: HearingActualsMainModel;
  private sub: Subscription;
  private id: string;
  private hearingDate: string;

  public constructor(private readonly fb: FormBuilder,
                     private readonly hearingStore: Store<fromHearingStore.State>,
                     private readonly router: Router,
                     private readonly route: ActivatedRoute,
                     private readonly ngZone: NgZone,
                     private readonly validatorsUtils: ValidatorsUtils,
  ) {
  }

  private static getStartTime(hearingActuals: HearingActualsMainModel, plannedIndex: number, actualIndex: number | undefined): string {
    const plannedTime = hearingActuals.hearingPlanned.plannedHearingDays[plannedIndex].plannedStartTime;
    let actualStartTime: string;
    if (actualIndex >= 0) {
      actualStartTime = hearingActuals.hearingActuals.actualHearingDays[actualIndex].hearingStartTime;
    }

    return actualStartTime ? HearingActualsTimingComponent.getTime(actualStartTime) : HearingActualsTimingComponent.getTime(plannedTime);
  }

  private static getEndTime(hearingActuals: HearingActualsMainModel, plannedIndex: number, actualIndex: number | undefined): string {
    const plannedTime = hearingActuals.hearingPlanned.plannedHearingDays[plannedIndex].plannedEndTime;
    let actualEndTime: string;
    if (actualIndex >= 0) {
      actualEndTime = hearingActuals.hearingActuals.actualHearingDays[actualIndex].hearingEndTime;
    }

    return actualEndTime ? HearingActualsTimingComponent.getTime(actualEndTime) : HearingActualsTimingComponent.getTime(plannedTime);
  }

  private static getPauseStartTime(hearingActuals: HearingActualsMainModel, actualIndex: number | undefined): string | null {
    let actualPauseStartTime: string;
    if (actualIndex >= 0) {
      actualPauseStartTime = (hearingActuals.hearingActuals && hearingActuals.hearingActuals.actualHearingDays
        && hearingActuals.hearingActuals.actualHearingDays[actualIndex].pauseDateTimes
        && hearingActuals.hearingActuals.actualHearingDays[actualIndex].pauseDateTimes.length
        && hearingActuals.hearingActuals.actualHearingDays[actualIndex].pauseDateTimes[0])
        && hearingActuals.hearingActuals.actualHearingDays[actualIndex].pauseDateTimes[0].pauseStartTime;
    }

    return actualPauseStartTime ? HearingActualsTimingComponent.getTime(actualPauseStartTime) : null;
  }

  private static getPauseEndTime(hearingActuals: HearingActualsMainModel, actualIndex: number | undefined): string | null {
    let actualPauseEndTime: string;

    if (actualIndex >= 0) {
      actualPauseEndTime = (hearingActuals.hearingActuals && hearingActuals.hearingActuals.actualHearingDays
        && hearingActuals.hearingActuals.actualHearingDays[actualIndex].pauseDateTimes
        && hearingActuals.hearingActuals.actualHearingDays[actualIndex].pauseDateTimes.length
        && hearingActuals.hearingActuals.actualHearingDays[actualIndex].pauseDateTimes[0])
        && hearingActuals.hearingActuals.actualHearingDays[actualIndex].pauseDateTimes[0].pauseEndTime;
    }

    return actualPauseEndTime ? HearingActualsTimingComponent.getTime(actualPauseEndTime) : null;
  }

  private static replaceTime(dateTime: string, time: moment.Moment): string {
    return moment(dateTime, 'YYYY-MM-DDTHH:mm:ssZ').set({
      hour: time.get('hour'),
      minute: time.get('minute'),
    }).format('YYYY-MM-DDTHH:mm:ss');
  }

  private static getTime(time: string): string {
    return time ? moment(time).format('HH:mm') : null;
  }

  public ngOnInit() {
    this.sub = combineLatest([this.hearingStore.select(fromHearingStore.getHearingActuals), this.route.paramMap])
      .pipe(
        filter(([state]: [HearingActualsStateData, ParamMap]) => !!state.hearingActualsMainModel),
        first()
      )
      .subscribe(([state, params]: [HearingActualsStateData, ParamMap]) => {
        this.id = params.get('id');
        this.hearingDate = params.get('hearingDate');
        this.hearingActuals = state.hearingActualsMainModel;
        this.caseTitle = this.hearingActuals.caseDetails.hmctsInternalCaseName;
        this.formGroup = this.createFormGroup(this.hearingActuals);
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
    const plannedIndex = ActualHearingsUtils.getPlannedDayIndexFromHearingDate(this.hearingActuals, this.hearingDate);
    const actualIndex = ActualHearingsUtils.getActualDayIndexFromHearingDate(this.hearingActuals, this.hearingDate);
    const hearingStartTime = (actualIndex >= 0 && this.hearingActuals.hearingActuals.actualHearingDays[actualIndex].hearingStartTime)
      || (plannedIndex && this.hearingActuals.hearingPlanned.plannedHearingDays[plannedIndex].plannedStartTime);
    const hearingEndTime = (actualIndex >= 0 && this.hearingActuals.hearingActuals.actualHearingDays[actualIndex].hearingEndTime)
      || (plannedIndex && this.hearingActuals.hearingPlanned.plannedHearingDays[plannedIndex].plannedEndTime);
    const pauseStartTime = actualIndex >= 0 && this.hearingActuals.hearingActuals.actualHearingDays[actualIndex].pauseDateTimes && this.hearingActuals.hearingActuals.actualHearingDays[actualIndex].pauseDateTimes.length
      && this.hearingActuals.hearingActuals.actualHearingDays[actualIndex].pauseDateTimes[0] && this.hearingActuals.hearingActuals.actualHearingDays[actualIndex].pauseDateTimes[0].pauseStartTime;
    const pauseEndTime =  actualIndex >= 0 && this.hearingActuals.hearingActuals.actualHearingDays[actualIndex].pauseDateTimes && this.hearingActuals.hearingActuals.actualHearingDays[actualIndex].pauseDateTimes.length
      && this.hearingActuals.hearingActuals.actualHearingDays[actualIndex].pauseDateTimes[0] && this.hearingActuals.hearingActuals.actualHearingDays[actualIndex].pauseDateTimes[0].pauseEndTime;

    const isPauseStartTimeValid = moment(pauseStartTime, 'YYYY-MM-DDTHH:mm:ssZ', true).isValid();
    let changedPauseStartTime;
    let changedPauseEndTime;
    const moPauseStartTime = moment(value.pauseStartTime, 'HH:mm');
    const moPauseEndTime = moment(value.pauseEndTime, 'HH:mm');
    if (isPauseStartTimeValid) {
      changedPauseStartTime = HearingActualsTimingComponent.replaceTime(pauseStartTime, moPauseStartTime);
    } else {
      changedPauseStartTime = HearingActualsTimingComponent.replaceTime(this.hearingDate, moPauseStartTime);
    }
    const isPauseEndTimeValid = moment(pauseEndTime, 'YYYY-MM-DDTHH:mm:ssZ', true).isValid();
    if (isPauseEndTimeValid) {
      changedPauseEndTime = HearingActualsTimingComponent.replaceTime(pauseEndTime, moPauseEndTime);
    } else {
      changedPauseEndTime = HearingActualsTimingComponent.replaceTime(this.hearingDate, moPauseEndTime);
    }

    let pauseDateTimes = [];
    if (value.pauseStartTime && value.pauseEndTime) {
      pauseDateTimes = [
        {
          pauseStartTime: changedPauseStartTime,
          pauseEndTime: changedPauseEndTime
        }
      ];
    }

    const updatedTimings = {
      hearingStartTime: HearingActualsTimingComponent.replaceTime(hearingStartTime, moment(value.hearingStartTime, 'HH:mm')),
      hearingEndTime: HearingActualsTimingComponent.replaceTime(hearingEndTime, moment(value.hearingEndTime, 'HH:mm')),
      pauseDateTimes
    };
    const patchedHearingActuals = ActualHearingsUtils.mergeSingleHearingPartActuals
    (this.hearingActuals, this.hearingDate, {...updatedTimings} as ActualHearingDayModel);

    this.hearingStore.dispatch(new fromHearingStore.UpdateHearingActuals({
      hearingId: this.id,
      hearingActuals: patchedHearingActuals,
    }));

    if (this.id) {
      this.ngZone.run(() => {
        this.router.navigate([`/hearings/actuals/${this.id}/hearing-actual-add-edit-summary`]);
      });
    }
  }

  public updateControl(event: any, control: AbstractControl): void {
    control.setValue(event.target.value);
    control.updateValueAndValidity();
  }

  private createFormGroup(hearingActuals: HearingActualsMainModel): FormGroup {
    const plannedIndex = ActualHearingsUtils.getPlannedDayIndexFromHearingDate(hearingActuals, this.hearingDate);
    const actualIndex = ActualHearingsUtils.getActualDayIndexFromHearingDate(hearingActuals, this.hearingDate);

    return this.fb.group({
      hearingStartTime: [HearingActualsTimingComponent.getStartTime(hearingActuals, plannedIndex, actualIndex), [
        Validators.required,
        this.validatorsUtils.mandatory('Enter hearing start time'),
        this.validatorsUtils.validTime(HearingActualsTimingErrorMessages.VALID_TIME)
      ]
      ],
      hearingEndTime: [HearingActualsTimingComponent.getEndTime(hearingActuals, plannedIndex, actualIndex), [
        this.validatorsUtils.mandatory('Enter hearing finish time'),
        this.validatorsUtils.validTime(HearingActualsTimingErrorMessages.VALID_TIME)
      ]
      ],
      recordTimes: [
        !HearingActualsTimingComponent.getPauseStartTime(hearingActuals, actualIndex)
        && !HearingActualsTimingComponent.getPauseEndTime(hearingActuals, actualIndex)
          ? null : 'yes',
        [this.validatorsUtils.mandatory('Select if you need to record times the hearing was paused')]
      ],
      pauseStartTime: [HearingActualsTimingComponent.getPauseStartTime(hearingActuals, actualIndex), [
        this.validatorsUtils.validTime(HearingActualsTimingErrorMessages.VALID_TIME)]],
      pauseEndTime: [HearingActualsTimingComponent.getPauseEndTime(hearingActuals, actualIndex), [
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

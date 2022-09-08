import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { combineLatest, Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { HearingActualsMainModel } from '../../../models/hearingActualsMainModel';
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

  public static TIME_MATCHER = /\d{2}:\d{2}/;
  public form: FormGroup;
  public caseTitle: string;
  public submitted: boolean = false;
  public errors: any[] = [];
  private hearingActuals: HearingActualsMainModel;
  private sub: Subscription;
  private id: string;

  public constructor(private readonly fb: FormBuilder,
                     private readonly hearingStore: Store<fromHearingStore.State>,
                     private readonly router: Router,
                     private readonly route: ActivatedRoute,
                     private readonly hearingsService: HearingsService,
                     private readonly validatorsUtils: ValidatorsUtils,
  ) {
  }

  private static getStartTime(hearingActuals: HearingActualsMainModel): string {
    const plannedTime = hearingActuals.hearingPlanned.plannedHearingDays[0].plannedStartTime;
    const actualTime = hearingActuals.hearingActuals.actualHearingDays[0].hearingStartTime;
    return actualTime ? HearingActualsTimingComponent.getTime(actualTime) : HearingActualsTimingComponent.getTime(plannedTime);
  }

  private static getPauseStartTime(hearingActuals: HearingActualsMainModel): string {
    const actualTime = hearingActuals.hearingActuals.actualHearingDays[0].pauseDateTimes[0];
    return actualTime && actualTime.pauseStartTime ? HearingActualsTimingComponent.getTime(actualTime.pauseStartTime) : null;
  }

  private static getPauseEndTime(hearingActuals: HearingActualsMainModel): string {
    const actualTime = hearingActuals.hearingActuals.actualHearingDays[0].pauseDateTimes[0];
    return actualTime && actualTime.pauseEndTime ? HearingActualsTimingComponent.getTime(actualTime.pauseEndTime) : null;
  }

  private static getEndTime(hearingActuals: HearingActualsMainModel): string {
    const plannedTime = hearingActuals.hearingPlanned.plannedHearingDays[0].plannedStartTime;
    const actualTime = hearingActuals.hearingActuals.actualHearingDays[0].hearingEndTime;
    return actualTime ? HearingActualsTimingComponent.getTime(actualTime) : HearingActualsTimingComponent.getTime(plannedTime);
  }

  private static replaceTime(time: string, value: string): string {
    if (!time || !value) {
      return null;
    }
    return time.replace(this.TIME_MATCHER, value);
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
        this.hearingActuals = state.hearingActualsMainModel;
        this.caseTitle = this.hearingActuals.caseDetails.hmctsInternalCaseName;
        this.form = this.createForm(this.hearingActuals);
        this.subscribeToFormChanges(this.form);
        this.subscribeToRecordPauseControl(this.form.get('recordTimes') as FormControl);
      });
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public submit(value: any, valid: boolean): void {
    this.submitted = true;
    this.errors = [];
    if (!valid) {
      this.setErrors(this.form.errors);
      return;
    }
    this.submitted = false;
    const hearingActuals = {
      ...this.hearingActuals.hearingActuals,
      actualHearingDays: [
        {
          ...this.hearingActuals.hearingActuals.actualHearingDays[0],
          hearingStartTime: HearingActualsTimingComponent.replaceTime(this.hearingActuals.hearingActuals.actualHearingDays[0].hearingStartTime, value.hearingStartTime),
          hearingEndTime: HearingActualsTimingComponent.replaceTime(this.hearingActuals.hearingActuals.actualHearingDays[0].hearingEndTime, value.hearingEndTime),
          pauseDateTimes: [
            {
              pauseStartTime: HearingActualsTimingComponent.replaceTime(this.hearingActuals.hearingActuals.actualHearingDays[0].hearingStartTime, value.pauseStartTime),
              pauseEndTime: HearingActualsTimingComponent.replaceTime(this.hearingActuals.hearingActuals.actualHearingDays[0].hearingStartTime, value.pauseEndTime)
            }
          ]
        }
      ]
    };
    this.hearingStore.dispatch(new fromHearingStore.UpdateHearingActuals({
      hearingId: this.id,
      hearingActuals
    }));
  }

  public updateControl(event: any, control: AbstractControl): void {
    control.setValue(event.target.value);
    control.updateValueAndValidity();
  }

  private createForm(hearingActuals: HearingActualsMainModel): FormGroup {
    return this.fb.group({
      hearingStartTime: [HearingActualsTimingComponent.getStartTime(hearingActuals), [
        Validators.required,
        this.validatorsUtils.mandatory('Enter hearing start time'),
        this.validatorsUtils.validTime(HearingActualsTimingErrorMessages.VALID_TIME)
      ]
      ],
      hearingEndTime: [HearingActualsTimingComponent.getEndTime(hearingActuals), [
        this.validatorsUtils.mandatory('Enter hearing finish time'),
        this.validatorsUtils.validTime(HearingActualsTimingErrorMessages.VALID_TIME)
      ]
      ],
      recordTimes: [
        !HearingActualsTimingComponent.getPauseStartTime(hearingActuals) && !HearingActualsTimingComponent.getPauseEndTime(hearingActuals)
          ? null : 'yes',
        [this.validatorsUtils.mandatory('Select if you need to record times the hearing was paused')]
      ],
      pauseStartTime: [HearingActualsTimingComponent.getPauseStartTime(hearingActuals), [
        this.validatorsUtils.validTime(HearingActualsTimingErrorMessages.VALID_TIME)]],
      pauseEndTime: [HearingActualsTimingComponent.getPauseEndTime(hearingActuals), [
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

  private subscribeToFormChanges(form: FormGroup): void {
    form.valueChanges.subscribe(() => {
      this.submitted = false;
    });
  }

  private subscribeToRecordPauseControl(control: FormControl): void {
    control.valueChanges.subscribe((value: string) => {
      if (value === 'yes') {
        this.form.get('pauseStartTime').setValidators([
          this.validatorsUtils.mandatory('Enter pause time'),
          this.validatorsUtils.validTime(HearingActualsTimingErrorMessages.VALID_TIME)
        ]);
        this.form.get('pauseEndTime').setValidators([
          this.validatorsUtils.mandatory('Enter resume time'),
          this.validatorsUtils.validTime(HearingActualsTimingErrorMessages.VALID_TIME)]
        );
        this.form.updateValueAndValidity();
      } else {
        this.form.get('pauseStartTime').setValue(null);
        this.form.get('pauseEndTime').setValue(null);
        this.form.get('pauseStartTime').clearValidators();
        this.form.get('pauseEndTime').clearValidators();
        this.form.get('pauseStartTime').updateValueAndValidity();
        this.form.get('pauseEndTime').updateValueAndValidity();
      }
    });
  }

  private setErrors(errors: { [key: string]: string }): void {
    this.errors = this.getAllErrorsMessagesFromControls(this.form);
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

  private getAllErrorsMessagesFromControls(form: FormGroup): any[] {
    const errors = [];
    Object.keys(form.controls).forEach((key: string) => {
      const control = form.get(key);
      if (control.errors) {
        errors.push(...this.getErrorMessages(control.errors, key));
      }
    });
    return errors;
  }
}

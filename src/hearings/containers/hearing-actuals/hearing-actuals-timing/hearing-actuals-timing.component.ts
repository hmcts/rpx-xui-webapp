import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HearingActualsMainModel } from '../../../models/hearingActualsMainModel';
import { HearingActualsStateData } from '../../../models/hearingActualsStateData.model';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import { ValidatorsUtils } from '../../../utils/validators.utils';

@Component({
  selector: 'exui-hearing-actuals-timing',
  templateUrl: './hearing-actuals-timing.component.html',
  styleUrls: ['./hearing-actuals-timing.component.scss']
})
export class HearingActualsTimingComponent implements OnInit, OnDestroy {

  public static timeMatcher = /\d{2}:\d{2}/;
  public form: FormGroup;
  private hearingActuals: HearingActualsMainModel;
  private sub: Subscription;

  public constructor(private readonly fb: FormBuilder,
                     private readonly hearingStore: Store<fromHearingStore.State>,
                     private readonly router: Router,
                     private readonly hearingsService: HearingsService,
                     private readonly validatorsUtils: ValidatorsUtils,
  ) {
  }

  private static getStartTime(hearingActuals: HearingActualsMainModel): string {
    const plannedTime = hearingActuals.hearingPlanned.plannedHearingDays[0].plannedStartTime;
    const actualTime = hearingActuals.hearingActuals.actualHearingDays[0].hearingStartTime;
    return actualTime ? actualTime.match(/\d{2}:\d{2}/)[0] : plannedTime.match(/\d{2}:\d{2}/)[0];
  }

  private static getPauseStartTime(hearingActuals: HearingActualsMainModel): string {
    const actualTime = hearingActuals.hearingActuals.actualHearingDays[0].pauseDateTimes[0];
    return actualTime && actualTime.pauseStartTime ? actualTime.pauseStartTime.match(this.timeMatcher)[0] : null;
  }

  private static getPauseEndTime(hearingActuals: HearingActualsMainModel): string {
    const actualTime = hearingActuals.hearingActuals.actualHearingDays[0].pauseDateTimes[0];
    return actualTime && actualTime.pauseEndTime ? actualTime.pauseEndTime(this.timeMatcher)[0] : null;
  }

  private static getEndTime(hearingActuals: HearingActualsMainModel): string {
    const plannedTime = hearingActuals.hearingPlanned.plannedHearingDays[0].plannedStartTime;
    const actualTime = hearingActuals.hearingActuals.actualHearingDays[0].hearingEndTime;
    return actualTime ? actualTime.match(this.timeMatcher)[0] : plannedTime.match(this.timeMatcher)[0];
  }

  private static replaceTime(time: string, value: string) {
    if (!time) {
      return time;
    }
    return time.replace(this.timeMatcher, value);
  }

  public ngOnInit() {
    this.sub = this.hearingStore.select(fromHearingStore.getHearingActuals)
      .pipe(
        filter((state: HearingActualsStateData) => !!state.hearingActualsMainModel)
      )
      .subscribe((state: HearingActualsStateData) => {
        this.hearingActuals = state.hearingActualsMainModel;
        this.form = this.createForm(this.hearingActuals);
      });
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public submit(value: any, valid: boolean) {
    if (valid) {
      const actuals = {
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
      this.hearingsService.updateHearingActuals('1', actuals).subscribe(() => {
        this.router.navigate(['/hearings/actuals/hearing-actual-add-edit-summary']);
      });
    }
  }

  private createForm(hearingActuals: HearingActualsMainModel): FormGroup {
    return this.fb.group({
      hearingStartTime: [HearingActualsTimingComponent.getStartTime(hearingActuals), [Validators.required, this.validatorsUtils.validTime()]],
      hearingEndTime: [HearingActualsTimingComponent.getEndTime(hearingActuals), [Validators.required, this.validatorsUtils.validTime()]],
      recordTimes: [
        !HearingActualsTimingComponent.getPauseStartTime(hearingActuals) && !HearingActualsTimingComponent.getPauseEndTime(hearingActuals)
          ? null : 'yes',
        [Validators.required]
      ],
      pauseStartTime: [HearingActualsTimingComponent.getPauseStartTime(hearingActuals), [this.validatorsUtils.validTime()]],
      pauseEndTime: [HearingActualsTimingComponent.getPauseEndTime(hearingActuals), [this.validatorsUtils.validTime()]],
    }, {
      validators: [
        this.validatorsUtils.validateTimeRange('hearingStartTime', 'hearingEndTime'),
        this.validatorsUtils.validateTimeRange('pauseStartTime', 'pauseEndTime')
      ]
    });
  }
}

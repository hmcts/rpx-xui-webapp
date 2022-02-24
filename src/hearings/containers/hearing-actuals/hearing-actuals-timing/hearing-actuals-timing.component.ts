import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  public form: FormGroup;

  private hearingActuals: HearingActualsMainModel;

  private sub: Subscription;

  public constructor(private readonly fb: FormBuilder,
                     private readonly hearingStore: Store<fromHearingStore.State>,
                     private readonly hearingsService: HearingsService,
                     private readonly validatorsUtils: ValidatorsUtils,
  ) {
  }

  private static getTime(hearingActuals: HearingActualsMainModel, time: string): string {
    const plannedTime = hearingActuals.hearingPlanned.plannedHearingDays[0]['planned' + time];
    const actualTime = hearingActuals.hearingActuals.actualHearingDays[0]['hearing' + time];
    return actualTime ? actualTime.match(/\d{2}:\d{2}/)[0] : plannedTime.match(/\d{2}:\d{2}/)[0];
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
      // this.hearingActuals.hearingActuals.actualHearingDays[0].hearingStartTime = value.startTime;
      // this.hearingActuals.hearingActuals.actualHearingDays[0].hearingEndTime = value.finishTime;
      this.hearingsService.updateHearingActuals('1', this.hearingActuals.hearingActuals);
    }
  }

  private createForm(hearingActuals: HearingActualsMainModel): FormGroup {
    return this.fb.group({
      startTime: [HearingActualsTimingComponent.getTime(hearingActuals, 'StartTime'), [Validators.required, this.validatorsUtils.validTime()]],
      finishTime: [HearingActualsTimingComponent.getTime(hearingActuals, 'EndTime'), [Validators.required, this.validatorsUtils.validTime()]],
      recordTimes: [null, [Validators.required]],
      pauseTime: [null, [this.validatorsUtils.validTime()]],
      resumeTime: [null, [this.validatorsUtils.validTime()]],
    }, {
      validator: this.validatorsUtils.validateTimeRange('startTime', 'finishTime')
    });
  }
}

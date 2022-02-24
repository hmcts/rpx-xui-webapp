import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { HearingActualsMainModel } from '../../../models/hearingActualsMainModel';
import { HearingActualsStateData } from '../../../models/hearingActualsStateData.model';
import * as fromHearingStore from '../../../store';
import { ValidatorsUtils } from '../../../utils/validators.utils';

@Component({
  selector: 'exui-hearing-actuals-timing',
  templateUrl: './hearing-actuals-timing.component.html',
  styleUrls: ['./hearing-actuals-timing.component.scss']
})
export class HearingActualsTimingComponent implements OnInit {

  public form: FormGroup;

  private hearingActuals: HearingActualsMainModel;

  public constructor(private readonly fb: FormBuilder,
                     private readonly hearingStore: Store<fromHearingStore.State>,
                     private readonly validatorsUtils: ValidatorsUtils,
                     ) {
  }

  public ngOnInit() {
    this.hearingStore.select(fromHearingStore.getHearingActuals)
      .pipe(
        filter((state: HearingActualsStateData) => !!state.hearingActualsMainModel)
      )
      .subscribe((state: HearingActualsStateData) => {
      this.hearingActuals = state.hearingActualsMainModel ;
      this.form = this.createForm(this.hearingActuals);
    });
  }

  public submit(value: any, valid: boolean) {
    console.log(value, ' submit ', valid);
    if (valid) {
      console.log('valid');
    }
  }

  private createForm(hearingActuals: HearingActualsMainModel): FormGroup {
    return this.fb.group({
      startTime: ['13:00', [Validators.required, this.validatorsUtils.validTime()]],
      finishTime: ['14:00', [Validators.required, this.validatorsUtils.validTime()]],
      recordTimes: [null, [Validators.required]],
      pauseTime: [null, [this.validatorsUtils.validTime()]],
      resumeTime: [null, [this.validatorsUtils.validTime()]],
    }, {
      validator: this.validatorsUtils.validateTimeRange('startTime', 'finishTime')
    });
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HearingActualsMainModel } from '../../../models/hearingActualsMainModel';
import { HearingActualsStateData } from '../../../models/hearingActualsStateData.model';
import { HearingResult } from '../../../models/hearings.enum';
import { LovRefDataModel } from '../../../models/lovRefData.model';
import * as fromHearingStore from '../../../store';

@Component({
  selector: 'exui-hearing-stage-result',
  templateUrl: './hearing-stage-result.component.html',
  styleUrls: ['./hearing-stage-result.component.scss']
})
export class HearingStageResultComponent implements OnInit, OnDestroy {
  public hearingStageResultForm: FormGroup;
  public validationErrors: { id: string, message: string }[] = [];
  public hearingResultType: string;
  public caseTitle: string;
  public hearingTypes: LovRefDataModel[];
  public adjournHearingActualReasons: LovRefDataModel[];
  public cancelHearingActualReasons: LovRefDataModel[];
  public hearingActualsMainModel: HearingActualsMainModel;
  public sub: Subscription;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>,
              private readonly formBuilder: FormBuilder,
              private readonly route: ActivatedRoute) {
    this.hearingTypes = this.route.snapshot.data.hearingTypes;
    this.adjournHearingActualReasons = this.route.snapshot.data.adjournHearingActualReasons;
    this.cancelHearingActualReasons = this.route.snapshot.data.cancelHearingActualReasons;
  }

  public get hearingResultEnum() {
    return HearingResult;
  }

  public ngOnInit(): void {
    this.hearingStageResultForm = this.formBuilder.group({
      hearingStage: [''],
      hearingResult: ['', Validators.required],
      adjournedReason: [''],
      cancelledReason: ['']
    });
    this.sub = this.hearingStore.select(fromHearingStore.getHearingActuals)
      .pipe(
        filter((state: HearingActualsStateData) => !!state.hearingActualsMainModel)
      )
      .subscribe((state: HearingActualsStateData) => {
        this.hearingActualsMainModel = state.hearingActualsMainModel;
        this.hearingStageResultForm.get('hearingStage').setValue(this.hearingActualsMainModel.hearingPlanned.plannedHearingType);
      });

    // TODO: Get the case title from hearing actuals API
    // Title is not returned by the API and need to liaise with the backend team
    this.caseTitle = 'Jane Smith vs DWP';
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  public onSubmit(): void {
    this.hearingActualsMainModel = {
      ...this.hearingActualsMainModel,
      hearingActuals: {
        ...this.hearingActualsMainModel.hearingActuals,
        hearingOutcome: {
          ...this.hearingActualsMainModel.hearingActuals.hearingOutcome,
          hearingResultReasonType: this.getHearingResultReasonType(),
          hearingResult: this.hearingResultType as HearingResult, 
          hearingType: this.hearingStageResultForm.get('hearingStage').value
        }
      }
    };
    this.hearingStore.dispatch(new fromHearingStore.UpdateHearingActuals('1', this.hearingActualsMainModel));
  }

  private getHearingResultReasonType(): string {
    if (this.hearingResultType === this.hearingResultEnum.ADJOURNED) {
      return this.hearingStageResultForm.get('adjournedReason').value;
    }
    if (this.hearingResultType === this.hearingResultEnum.CANCELLED) {
      return this.hearingStageResultForm.get('cancelledReason').value;
    }
    return '';
  }

  public onHearingResult(hearingResultType: string): void {
    this.hearingResultType = hearingResultType;
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import {
  HearingActualsMainModel,
  HearingActualsModel,
  PlannedHearingDayModel
} from '../../../models/hearingActualsMainModel';
import { HearingActualsStateData } from '../../../models/hearingActualsStateData.model';
import { HearingResult, HearingStageResultEnum } from '../../../models/hearings.enum';
import { LovRefDataModel } from '../../../models/lovRefData.model';
import * as fromHearingStore from '../../../store';

@Component({
  standalone: false,

  selector: 'exui-hearing-stage-result',
  templateUrl: './hearing-stage-result.component.html',
  styleUrls: ['./hearing-stage-result.component.scss']

})
export class HearingStageResultComponent implements OnInit, OnDestroy {
  public hearingStageResultForm: FormGroup;
  public validationErrors: { id: string, message: string }[] = [];
  public hearingResult: HearingResult;
  public caseTitle: string;
  public hearingTypes: LovRefDataModel[];
  public actualPartHeardReasonCodes: LovRefDataModel[];
  public actualCancellationReasonCodes: LovRefDataModel[];
  public hearingActualsMainModel: HearingActualsMainModel;
  public sub: Subscription;
  public submitted = false;
  public adjournHearingErrorMessage = '';
  public cancelHearingErrorMessage = '';
  private id: string;
  public hearingDate: string;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>,
              private readonly formBuilder: FormBuilder,
              private readonly route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.id = params.id;
    });

    this.hearingTypes = this.route.snapshot.data.hearingTypes;
    this.actualPartHeardReasonCodes = this.route.snapshot.data.actualPartHeardReasonCodes;
    this.actualCancellationReasonCodes = this.route.snapshot.data.actualCancellationReasonCodes;
  }

  public get hearingResultEnum() {
    return HearingResult;
  }

  public get hearingStageResultEnum() {
    return HearingStageResultEnum;
  }

  public get formControls() {
    return this.hearingStageResultForm.controls;
  }

  public ngOnInit(): void {
    this.hearingStageResultForm = this.formBuilder.group({
      hearingStage: [''],
      hearingResult: ['', Validators.required],
      adjournedReason: [''],
      cancelledReason: ['']
    });
    this.sub = this.hearingStore.select(fromHearingStore.getHearingActuals).pipe(
      filter((state: HearingActualsStateData) => !!state.hearingActualsMainModel),
      first()
    ).subscribe((state: HearingActualsStateData) => {
      this.hearingActualsMainModel = state.hearingActualsMainModel;
      this.caseTitle = this.hearingActualsMainModel.caseDetails.hmctsInternalCaseName;
      this.hearingResult = this.hearingActualsMainModel && this.hearingActualsMainModel.hearingActuals
          && this.hearingActualsMainModel.hearingActuals.hearingOutcome
          && this.hearingActualsMainModel.hearingActuals.hearingOutcome.hearingResult;
      const hearingResultReasonType = this.hearingActualsMainModel && this.hearingActualsMainModel.hearingActuals
          && this.hearingActualsMainModel.hearingActuals.hearingOutcome
          && this.hearingActualsMainModel.hearingActuals.hearingOutcome.hearingResultReasonType;
      const hearingType = (this.hearingActualsMainModel && this.hearingActualsMainModel.hearingActuals
          && this.hearingActualsMainModel.hearingActuals.hearingOutcome
          && this.hearingActualsMainModel.hearingActuals.hearingOutcome.hearingType)
          || (this.hearingActualsMainModel.hearingPlanned.plannedHearingType);
      this.hearingStageResultForm.controls.hearingStage.setValue(hearingType);
      this.hearingStageResultForm.controls.hearingResult.setValue(this.hearingResult);
      if (this.hearingResult === HearingResult.ADJOURNED) {
        this.hearingStageResultForm.controls.adjournedReason.setValue(hearingResultReasonType);
      }
      if (this.hearingResult === HearingResult.CANCELLED) {
        this.hearingStageResultForm.controls.cancelledReason.setValue(hearingResultReasonType);
      }
      this.hearingDate = this.calculateEarliestHearingDate(this.hearingActualsMainModel.hearingPlanned.plannedHearingDays);
    });
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.hearingResult) {
      this.hearingStageResultForm.get('hearingResult').setValue(this.hearingResult);
    }
    if (this.isFormValid()) {
      const hearingOutcome = this.hearingActualsMainModel && this.hearingActualsMainModel.hearingActuals
        && this.hearingActualsMainModel.hearingActuals.hearingOutcome;
      const hearingActuals: HearingActualsModel = {
        ...this.hearingActualsMainModel.hearingActuals,
        hearingOutcome: {
          ...hearingOutcome,
          hearingFinalFlag: false,
          hearingResult: this.hearingResult as HearingResult,
          hearingResultDate: this.hearingDate,
          hearingResultReasonType: this.getHearingResultReasonType(),
          hearingType: this.hearingStageResultForm.get('hearingStage').value
        }
      };
      this.hearingStore.dispatch(new fromHearingStore.UpdateHearingActualsStage({
        hearingId: this.id,
        hearingActuals
      }));
    }
  }

  private isFormValid(): boolean {
    this.validationErrors = [];
    this.adjournHearingErrorMessage = '';
    this.cancelHearingErrorMessage = '';
    if (!this.validateHearingResult()) {
      return false;
    }
    if (!this.validateHearingResultReason(this.hearingResult)) {
      return false;
    }
    return true;
  }

  private validateHearingResult(): boolean {
    if (!this.formControls.hearingResult.valid) {
      this.validationErrors.push({
        id: 'completed',
        message: HearingStageResultEnum.HearingResultError
      });
      return false;
    }
    return true;
  }

  private validateHearingResultReason(hearingResult: string): boolean {
    const hearingResultReasonType = this.getHearingResultReasonType();
    if (hearingResultReasonType === '') {
      if (hearingResult === this.hearingResultEnum.COMPLETED) {
        return true;
      }
      if (hearingResult === this.hearingResultEnum.ADJOURNED) {
        this.adjournHearingErrorMessage = this.hearingStageResultEnum.HearingResultReasonError;
      }
      if (this.hearingResult === this.hearingResultEnum.CANCELLED) {
        this.cancelHearingErrorMessage = this.hearingStageResultEnum.HearingResultReasonError;
      }
      this.validationErrors.push({
        id: this.hearingResult === this.hearingResultEnum.ADJOURNED ? 'adjourned-reason' : 'cancelled-reason',
        message: this.hearingStageResultEnum.HearingResultReasonError
      });
      return false;
    }
    return true;
  }

  public onHearingResult(hearingResult: HearingResult): void {
    this.hearingResult = hearingResult;
  }

  private getHearingResultReasonType(): string {
    if (this.hearingResult === this.hearingResultEnum.ADJOURNED) {
      return this.hearingStageResultForm.get('adjournedReason').value;
    }
    if (this.hearingResult === this.hearingResultEnum.CANCELLED) {
      return this.hearingStageResultForm.get('cancelledReason').value;
    }
    return '';
  }

  public calculateEarliestHearingDate(hearingDays: PlannedHearingDayModel[]): string {
    const moments: moment.Moment[] = hearingDays.map((d) => moment(d.plannedStartTime));
    return moment.min(moments).toISOString();
  }
}

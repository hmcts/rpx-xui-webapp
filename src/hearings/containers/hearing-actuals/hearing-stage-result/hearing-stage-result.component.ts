import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { HearingActualsMainModel } from '../../../models/hearingActualsMainModel';
import { HearingActualsStateData } from '../../../models/hearingActualsStateData.model';
import { HearingResult, HearingStageResultEnum } from '../../../models/hearings.enum';
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
  public submitted = false;
  public adjournHearingErrorMessage = '';
  public cancelHearingErrorMessage = '';
  private id: string;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>,
              private readonly formBuilder: FormBuilder,
              private readonly route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = params.id;
    });

    this.hearingTypes = this.route.snapshot.data.hearingTypes;
    this.adjournHearingActualReasons = this.route.snapshot.data.adjournHearingActualReasons;
    this.cancelHearingActualReasons = this.route.snapshot.data.cancelHearingActualReasons;
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
        this.hearingStageResultForm.get('hearingStage').setValue(this.hearingActualsMainModel.hearingPlanned.plannedHearingType);
      });
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.hearingResultType) {
      this.hearingStageResultForm.get('hearingResult').setValue(this.hearingResultType);
    }
    if (this.isFormValid()) {
      const hearingActuals = {
        ...this.hearingActualsMainModel.hearingActuals,
        hearingOutcome: {
          ...this.hearingActualsMainModel.hearingActuals.hearingOutcome,
          hearingResultReasonType: this.getHearingResultReasonType(),
          hearingResult: this.hearingResultType as HearingResult,
          hearingType: this.hearingStageResultForm.get('hearingStage').value
        }
      };
      this.hearingStore.dispatch(new fromHearingStore.UpdateHearingActuals({
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
    if (!this.validateHearingResultReason(this.hearingResultType)) {
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
      if (this.hearingResultType === this.hearingResultEnum.CANCELLED) {
        this.cancelHearingErrorMessage = this.hearingStageResultEnum.HearingResultReasonError;
      }
      this.validationErrors.push({
        id: this.hearingResultType === this.hearingResultEnum.ADJOURNED ? 'adjourned-reason' : 'cancelled-reason',
        message: this.hearingStageResultEnum.HearingResultReasonError
      });
      return false;
    }
    return true;
  }

  public onHearingResult(hearingResultType: string): void {
    this.hearingResultType = hearingResultType;
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
}

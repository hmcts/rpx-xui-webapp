import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HearingActualsStateData } from 'src/hearings/models/hearingActualsStateData.model';
import { HearingActualsMainModel } from '../../../models/hearingActualsMainModel';
import { HearingResult } from '../../../models/hearings.enum';
import { LovRefDataModel } from '../../../models/lovRefData.model';
import { LovRefDataService } from '../../../services/lov-ref-data.service';
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
  public hearingTypes$: Observable<LovRefDataModel[]>;
  public completeHearingActualReasons$: Observable<LovRefDataModel[]>;
  public adjournHearingActualReasons$: Observable<LovRefDataModel[]>;
  public cancelHearingActualReasons$: Observable<LovRefDataModel[]>;
  public hearingActuals: HearingActualsMainModel;
  public sub: Subscription;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>,
              private readonly lovRefDataService: LovRefDataService,
              private readonly formBuilder: FormBuilder) {
  }

  public get hearingResultEnum() {
    return HearingResult;
  }

  public ngOnInit(): void {
    this.hearingStageResultForm = this.formBuilder.group({
      hearingStage: [''],
      hearingResult: ['', Validators.required],
      completedReason: [''],
      adjournedReason: [''],
      cancelledReason: ['']
    });
    this.hearingTypes$ = this.lovRefDataService.getListOfValues('HearingType', 'SSCS');
    this.completeHearingActualReasons$ = this.lovRefDataService.getListOfValues('CompleteHearingActualReason', 'SSCS');
    this.adjournHearingActualReasons$ = this.lovRefDataService.getListOfValues('AdjournHearingActualReason', 'SSCS');
    this.cancelHearingActualReasons$ = this.lovRefDataService.getListOfValues('CancelHearingActualReason', 'SSCS');

    this.sub = this.hearingStore.select(fromHearingStore.getHearingActuals)
      .pipe(
        filter((state: HearingActualsStateData) => !!state.hearingActualsMainModel)
      )
      .subscribe((state: HearingActualsStateData) => {
        this.hearingActuals = state.hearingActualsMainModel;
        this.hearingStageResultForm.get('hearingStage').setValue(this.hearingActuals.hearingPlanned.plannedHearingType);
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

  public onHearingResult(hearingResultType: string): void {
    this.hearingResultType = hearingResultType;
  }
}

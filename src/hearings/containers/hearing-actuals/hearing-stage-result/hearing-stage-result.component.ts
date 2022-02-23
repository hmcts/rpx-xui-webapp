import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LovRefDataModel } from '../../../models/lovRefData.model';
import { ServiceHearingValuesModel } from '../../../models/serviceHearingValues.model';
import { HearingsService } from '../../../services/hearings.service';
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
  public serviceValueSub: Subscription;
  public hearingTypes$: Observable<LovRefDataModel[]>;
  private hearingState$: Observable<fromHearingStore.State>;
  
  constructor(private readonly hearingStore: Store<fromHearingStore.State>,
    private readonly hearingsService: HearingsService,
    private readonly lovRefDataService: LovRefDataService,
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute) {
    this.hearingState$ = this.hearingStore.pipe(select(fromHearingStore.getHearingsFeatureState));
    this.hearingStageResultForm = this.formBuilder.group({});
  }
  
  public ngOnInit(): void {
    this.hearingTypes$ = this.lovRefDataService.getListOfValues('HearingType', 'SSCS');
    this.serviceValueSub = this.hearingStore.pipe(select(fromHearingStore.getHearingValuesModel)).subscribe((hearingValueModel: ServiceHearingValuesModel) =>
      this.caseTitle = hearingValueModel ? hearingValueModel.caseName : ''
    );
    this.hearingState$.subscribe(x => {
      console.log('HEARING STATE', x);
    });
  }

  public ngOnDestroy(): void {
    if (this.serviceValueSub) {
      this.serviceValueSub.unsubscribe();
    }
  }

  public onHearingResult(hearingResultType: string): void {
    this.hearingResultType = hearingResultType;
  }
}

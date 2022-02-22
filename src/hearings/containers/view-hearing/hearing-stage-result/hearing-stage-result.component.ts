import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { ServiceHearingValuesModel } from '../../../models/serviceHearingValues.model';
import { Subscription } from 'rxjs';
import { ControlTypeEnum } from '../../../models/hearings.enum';
import { LovRefDataModel } from '../../../models/lovRefData.model';
import * as fromHearingStore from '../../../store';

@Component({
  selector: 'exui-hearing-stage-result',
  templateUrl: './hearing-stage-result.component.html'
})
export class HearingStageResultComponent implements OnInit {
  public hearingStageResultForm: FormGroup;
  public validationErrors: { id: string, message: string }[] = [];
  public hearingResultSelectedOption: string;
  public multiLevelSelections: LovRefDataModel[] = [];
  public hasValidationRequested: boolean = false;
  public configLevels: { level: number, controlType: ControlTypeEnum }[];
  public hearingResultType: string;
  public caseTitle: string;
  public serviceValueSub: Subscription;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>,
              private readonly formBuilder: FormBuilder) {
    this.hearingStageResultForm = this.formBuilder.group({});
  }
  
  public ngOnInit(): void {
    this.serviceValueSub = this.hearingStore.pipe(select(fromHearingStore.getHearingValuesModel)).subscribe((hearingValueModel: ServiceHearingValuesModel) =>
      this.caseTitle = hearingValueModel ? hearingValueModel.caseName : ''
    );
  }

  public onHearingResult(hearingResultType: string): void {
    this.hearingResultType = hearingResultType;
  }
}

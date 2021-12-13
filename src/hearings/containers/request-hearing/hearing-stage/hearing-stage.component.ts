import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { RefDataModel } from '../../../../../api/hearings/models/refData.model';
import * as fromHearingStore from '../../../../hearings/store';
@Component({
  selector: 'exui-hearing-stage',
  templateUrl: './hearing-stage.component.html',
  styleUrls: ['./hearing-stage.component.scss']
})
export class HearingStageComponent implements OnInit, OnDestroy, AfterViewInit {
  public hearingStageOptions: RefDataModel[];
  public hearingStoreSub: Subscription;
  public stageForm: FormGroup;
  public hearingType: string;
  @ViewChildren('radioButton') public radios: QueryList<any>;
  public hearing$: Observable<string>;

  constructor(private readonly route: ActivatedRoute,
              private readonly hearingStore: Store<fromHearingStore.State>,
              fb: FormBuilder) {
    this.hearingStageOptions = this.route.snapshot.data.hearingStages;
    this.stageForm = fb.group({
      'stage-option': [null],
    });
  }

  public ngOnInit() {
    this.hearingStoreSub = this.hearingStore.pipe(select(fromHearingStore.getHearingValuesModel)).subscribe(
      hearingValueModel => {
        this.hearingType = hearingValueModel && hearingValueModel.hearingType ? hearingValueModel.hearingType :  this.hearingType;
      }
    );
  }

  public ngAfterViewInit(): void {
    this.stageForm.controls['stage-option'].setValue(this.hearingType);
  }

  public ngOnDestroy(): void {
    if (this.hearingStoreSub) {
      this.hearingStoreSub.unsubscribe();
    }
  }
}

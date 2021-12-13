import {AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import * as fromHearingStore from '../../../../hearings/store';
import {ACTION} from '../../../models/hearings.enum';
import {RefDataModel} from '../../../models/refData.model';
import {HearingsService} from '../../../services/hearings.service';
import {RequestHearingPageFlow} from '../request-hearing.page.flow';

@Component({
  selector: 'exui-hearing-stage',
  templateUrl: './hearing-stage.component.html',
})
export class HearingStageComponent extends RequestHearingPageFlow implements OnInit, OnDestroy, AfterViewInit {
  public hearingStageOptions: RefDataModel[];
  public hearingStoreSub: Subscription;
  public stageForm: FormGroup;
  public hearingType: string;
  @ViewChildren('radioButton') public radios: QueryList<any>;

  constructor(private readonly route: ActivatedRoute,
              protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly hearingsService: HearingsService,
              fb: FormBuilder) {
    super(hearingStore, hearingsService);
    this.hearingStageOptions = this.route.snapshot.data.hearingStages;
    this.stageForm = fb.group({
      'stage-option': [null],
    });
  }

  public ngOnInit() {
    this.hearingStoreSub = this.hearingStore.pipe(select(fromHearingStore.getHearingValuesModel)).subscribe(
      hearingValueModel => {
        this.hearingType = hearingValueModel && hearingValueModel.hearingType ? hearingValueModel.hearingType : this.hearingType;
      }
    );
  }

  public executeAction(action: ACTION): void {
    if (this.isFormValid()) {
      super.navigateAction(action);
    }
  }

  public isFormValid(): boolean {
    // TODO verify if form group is valid
    return true;
  }

  public ngAfterViewInit(): void {
    this.stageForm.controls['stage-option'].setValue(this.hearingType);
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
    if (this.hearingStoreSub) {
      this.hearingStoreSub.unsubscribe();
    }
  }
}

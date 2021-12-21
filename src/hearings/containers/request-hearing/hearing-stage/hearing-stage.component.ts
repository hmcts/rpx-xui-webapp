import { AfterContentInit, Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromHearingStore from '../../../../hearings/store';
import { ACTION, HearingStageEnum } from '../../../models/hearings.enum';
import { RefDataModel } from '../../../models/refData.model';
import { HearingsService } from '../../../services/hearings.service';
import { RequestHearingPageFlow } from '../request-hearing.page.flow';

@Component({
  selector: 'exui-hearing-stage',
  templateUrl: './hearing-stage.component.html',
})
export class HearingStageComponent extends RequestHearingPageFlow implements OnInit, OnDestroy, AfterContentInit {
  public hearingStageOptions: RefDataModel[];
  public hearingStoreSub: Subscription;
  public stageForm: FormGroup;
  public hearingType: string;
  public hearingStageSelectionError: string;
  public validationErrors: { id: string, message: string }[] = [];
  @ViewChildren('radioButton') public radios: QueryList<any>;

  constructor(private readonly route: ActivatedRoute,
              protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly hearingsService: HearingsService,
              fb: FormBuilder) {
    super(hearingStore, hearingsService);
    this.hearingStageOptions = this.route.snapshot.data.hearingStages;
    this.stageForm = fb.group({
      'stage-option': ['', Validators.required],
    });
  }

  public ngOnInit() {
    this.hearingStoreSub = this.hearingStore.pipe(select(fromHearingStore.getHearingRequest)).subscribe(
      hearingValueModel => {
        this.hearingType = hearingValueModel && hearingValueModel.hearingRequestMainModel && hearingValueModel.hearingRequestMainModel.hearingDetails ? hearingValueModel.hearingRequestMainModel.hearingDetails.hearingType : this.hearingType;
      }
    );
  }

  public executeAction(action: ACTION): void {
    if (action === ACTION.CONTINUE) {
      this.checkFormData();
      if (this.isFormValid()) {
        this.prepareHearingRequestData();
        super.navigateAction(action);
      }
    } else if (action === ACTION.BACK) {
      super.navigateAction(action);
    }
  }

  public prepareHearingRequestData(): void {
    this.hearingRequestMainModel = {
      ...this.hearingRequestMainModel,
      hearingDetails: {
        ...this.hearingRequestMainModel.hearingDetails,
        hearingType: this.stageForm.value['stage-option']
      }
    };
  }

  public isFormValid(): boolean {
    return this.stageForm.valid;
  }

  public checkFormData(): void {
    this.hearingStageSelectionError = null;
    this.validationErrors = [];
    if (!this.stageForm.valid) {
      this.hearingStageSelectionError = HearingStageEnum.SelectHearingStageError;
      this.validationErrors.push({ id: this.hearingStageOptions[0].key, message: HearingStageEnum.SelectHearingStageError });
    }
  }

  public ngAfterContentInit(): void {
    this.stageForm.controls['stage-option'].setValue(this.hearingType);
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
    if (this.hearingStoreSub) {
      this.hearingStoreSub.unsubscribe();
    }
  }
}

import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import {
  ACTION
} from '../../../models/hearings.enum';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import { RequestHearingPageFlow } from '../request-hearing.page.flow';

@Component({
  selector: 'exui-hearing-panel-required',
  templateUrl: './hearing-panel-required.component.html'
})
export class HearingPanelRequiredComponent extends RequestHearingPageFlow implements OnInit, AfterViewInit, OnDestroy {
  public hearingPanelRequiredForm: FormGroup;
  public hearingPanelRequired: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    protected readonly hearingStore: Store<fromHearingStore.State>,
    protected readonly hearingsService: HearingsService,
    protected readonly featureToggleService: FeatureToggleService,
    protected readonly route: ActivatedRoute) {
    super(hearingStore, hearingsService, featureToggleService, route);
  }

  public ngOnInit(): void {
    this.hearingPanelRequired = this.hearingRequestMainModel.hearingDetails ?
      this.hearingRequestMainModel.hearingDetails.isAPanelFlag : false;
    this.initForm();
  }

  public ngAfterViewInit(): void {
    this.hearingPanelRequiredForm.controls.hearingPanelRequired.setValue(this.hearingPanelRequired);
  }

  public initForm(): void {
    this.hearingPanelRequiredForm = this.formBuilder.group({
      hearingPanelRequired: [false, Validators.required]
    });
  }

  public executeAction(action: ACTION): void {
    if (action === ACTION.CONTINUE) {
      this.prepareHearingRequestData();
      this.updateHearingConditions();
    }
    super.navigateAction(action);
  }

  public prepareHearingRequestData(): void {
    this.hearingRequestMainModel = {
      ...this.hearingRequestMainModel,
      hearingDetails: {
        ...this.hearingRequestMainModel.hearingDetails,
        isAPanelFlag: this.hearingPanelRequiredForm.value.hearingPanelRequired
      }
    };
  }

  public updateHearingConditions(): void {
    this.hearingStore.dispatch(new fromHearingStore.SaveHearingConditions({ isAPanelFlag: this.hearingPanelRequiredForm.value.hearingPanelRequired }));
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
  }
}

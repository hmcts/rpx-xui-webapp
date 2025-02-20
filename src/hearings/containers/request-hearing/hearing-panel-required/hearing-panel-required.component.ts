import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Store } from '@ngrx/store';
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
  public validationErrors: { id: string, message: string }[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    protected readonly hearingStore: Store<fromHearingStore.State>,
    protected readonly hearingsService: HearingsService,
    protected readonly featureToggleService: FeatureToggleService,
    protected readonly route: ActivatedRoute,
    protected readonly router: Router) {
    super(hearingStore, hearingsService, featureToggleService, route);
  }

  public ngOnInit(): void {
    this.hearingPanelRequired =
      this.hearingRequestMainModel?.hearingDetails?.isAPanelFlag
      ?? this.serviceHearingValuesModel?.panelRequiredDefault
      ?? false;
    this.initForm();
  }

  private initForm(): void {
    this.hearingPanelRequiredForm = this.formBuilder.group({
      hearingPanelRequired: [this.hearingPanelRequired, Validators.required]
    });
  }

  private clearSpecificJudgeInformation(): void {
    // clear judge information functionality goes here
  }

  private clearPanelMembersInformation(): void {
    this.hearingRequestMainModel.hearingDetails.panelRequirements = null;
  }

  public changeSelection(action: ACTION): void {
    if (action === ACTION.CONTINUE) {
      const panelRequired = this.hearingPanelRequiredForm.value.hearingPanelRequired;
      if (panelRequired !== this.hearingPanelRequired) {
        this.updateHearingConditions();
        this.prepareHearingRequestData();
        if (panelRequired) {
          this.clearSpecificJudgeInformation();
        } else {
          this.clearPanelMembersInformation();
        }
        this.navigateBasedOnPanelRequirement(panelRequired);
      } else {
        super.navigateAction(action);
      }
    } else {
      super.navigateAction(action);
    }
  }

  private navigateBasedOnPanelRequirement(panelRequired: boolean): void {
    if (panelRequired) {
      this.router.navigate(['../panel-members'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../specific-judge'], { relativeTo: this.route });
    }
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

  public onChangePanelRequirement(): void {
    const panelRequired = this.hearingRequestMainModel.hearingDetails.isAPanelFlag;
    if (panelRequired) {
      this.router.navigate(['../panel-requirement'], { relativeTo: this.route }).then(() => {
        this.router.navigate(['../panel-members'], { relativeTo: this.route }).then(() => {
          this.router.navigate(['../cya'], { relativeTo: this.route });
        });
      });
    } else {
      this.router.navigate(['../panel-requirement'], { relativeTo: this.route }).then(() => {
        this.router.navigate(['../specific-judge'], { relativeTo: this.route }).then(() => {
          this.router.navigate(['../cya'], { relativeTo: this.route });
        });
      });
    }
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
  }
}

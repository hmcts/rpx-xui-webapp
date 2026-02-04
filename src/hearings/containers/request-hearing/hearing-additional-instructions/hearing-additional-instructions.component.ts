import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Store } from '@ngrx/store';
import { ACTION, HearingInstructionsEnum, Mode } from '../../../models/hearings.enum';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import { RequestHearingPageFlow } from '../request-hearing.page.flow';

@Component({
  standalone: false,
  selector: 'exui-hearing-additional-instructions',
  templateUrl: './hearing-additional-instructions.component.html',
  styleUrls: ['./hearing-additional-instructions.component.scss'],
})
export class HearingAdditionalInstructionsComponent extends RequestHearingPageFlow implements OnInit, AfterViewInit, OnDestroy {
  public instructionsForm: FormGroup;
  public instructionsFormViewOnly: FormGroup;
  public instructionLength: number = HearingInstructionsEnum.InstructionLength;
  public showReviewBox: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    protected readonly hearingStore: Store<fromHearingStore.State>,
    protected readonly hearingsService: HearingsService,
    protected readonly featureToggleService: FeatureToggleService,
    protected readonly route: ActivatedRoute
  ) {
    super(hearingStore, hearingsService, featureToggleService, route);
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    if (
      this.hearingCondition.mode === Mode.VIEW_EDIT &&
      this.hearingsService.propertiesUpdatedOnPageVisit?.afterPageVisit?.additionalInstructionsChangesRequired
    ) {
      this.showReviewBox = true;
      this.instructionsForm = this.formBuilder.group({
        instructions: [this.serviceHearingValuesModel?.listingComments],
      });
      this.instructionsFormViewOnly = this.formBuilder.group({
        instructionsViewOnly: [this.hearingRequestMainModel.hearingDetails.listingComments],
      });
    } else {
      this.instructionsForm = this.formBuilder.group({
        instructions: [this.hearingRequestMainModel.hearingDetails.listingComments],
      });
    }
  }

  public executeAction(action: ACTION): void {
    if (action === ACTION.CONTINUE) {
      if (this.isFormValid()) {
        this.prepareHearingRequestData();
        super.navigateAction(action);
      }
    } else if (action === ACTION.BACK) {
      super.navigateAction(action);
    }
  }

  public prepareHearingRequestData(): void {
    const listingComments = this.instructionsForm.value.instructions
      ? this.santiseHTML(this.instructionsForm.value.instructions)
      : undefined;
    this.hearingRequestMainModel = {
      ...this.hearingRequestMainModel,
      hearingDetails: {
        ...this.hearingRequestMainModel.hearingDetails,
        listingComments: listingComments,
        autolistFlag: this.getAutoListFlag(),
        listingAutoChangeReasonCode: this.getListingAutoChangeReasonCode(),
      },
    };
    if (this.hearingCondition.mode === Mode.VIEW_EDIT) {
      if (this.hearingsService.propertiesUpdatedOnPageVisit?.afterPageVisit?.additionalInstructionsChangesRequired) {
        this.hearingsService.propertiesUpdatedOnPageVisit.afterPageVisit.additionalInstructionsChangesConfirmed = true;
      }
    }
  }

  public santiseHTML(string: string) {
    const tempDivElement = document.createElement('div');
    tempDivElement.innerHTML = string;
    return tempDivElement.textContent || tempDivElement.innerText || '';
  }

  public getAutoListFlag(): boolean {
    return this.instructionsForm.value.instructions ? false : this.serviceHearingValuesModel.autoListFlag;
  }

  public getListingAutoChangeReasonCode(): string {
    return this.instructionsForm.value.instructions ? 'user-added-comments' : null;
  }

  public isFormValid(): boolean {
    return this.instructionsForm.valid;
  }

  public ngAfterViewInit(): void {
    this.fragmentFocus();
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
  }
}

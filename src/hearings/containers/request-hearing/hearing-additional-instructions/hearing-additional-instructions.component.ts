import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {ACTION, HearingInstructionsEnum} from '../../../models/hearings.enum';
import {HearingsService} from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import {RequestHearingPageFlow} from '../request-hearing.page.flow';

@Component({
  selector: 'exui-hearing-additional-instructions',
  templateUrl: './hearing-additional-instructions.component.html',
})
export class HearingAdditionalInstructionsComponent extends RequestHearingPageFlow implements OnInit, OnDestroy {

  public instructionsForm: FormGroup;
  public instructionLength: number = HearingInstructionsEnum.InstructionLength;

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly hearingsService: HearingsService,
              private readonly formBuilder: FormBuilder,
              protected readonly route: ActivatedRoute) {
    super(hearingStore, hearingsService, route);
  }

  public ngOnInit(): void {
    this.initForm();
    this.fragmentFocus();
  }

  public initForm(): void {
    this.instructionsForm = this.formBuilder.group({
      instructions: [this.hearingRequestMainModel.hearingDetails.listingComments]
    });
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
    this.hearingRequestMainModel = {
      ...this.hearingRequestMainModel,
      hearingDetails: {
        ...this.hearingRequestMainModel.hearingDetails,
        listingComments: this.instructionsForm.value
      }
    };
  }

  public isFormValid(): boolean {
    return this.instructionsForm.valid;
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
  }
}

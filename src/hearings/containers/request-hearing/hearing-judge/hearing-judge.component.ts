import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PersonRole } from '@hmcts/rpx-xui-common-lib/lib/models';
import { Store } from '@ngrx/store';
import { RefDataModel } from '../../../../hearings/models/refData.model';
import { ACTION, RadioOptions } from '../../../models/hearings.enum';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import { RequestHearingPageFlow } from '../request-hearing.page.flow';

@Component({
  selector: 'exui-hearing-judge',
  templateUrl: './hearing-judge.component.html',
})
export class HearingJudgeComponent extends RequestHearingPageFlow implements OnInit, OnDestroy {
  public hearingJudgeForm: FormGroup;
  public specificJudgeSelection: string;
  public hearingJudgeTypes: RefDataModel[];
  public validationErrors: { id: string, message: string }[] = [];
  public personRole: PersonRole;

  constructor(private readonly route: ActivatedRoute,
              private readonly formBuilder: FormBuilder,
              protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly hearingsService: HearingsService) {
    super(hearingStore, hearingsService);
    this.hearingJudgeTypes = this.route.snapshot.data.hearingStages;
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.hearingJudgeForm = this.formBuilder.group({
      specificJudge: ['', Validators.required],
      findPersonControl: this.formBuilder.group({
        domain: '',
        email: [''],
        id: '',
        knownAs: '',
        name: '',
      }),
      judgeType: [''],
      excludedJudge: [''],
    });
  }

  public showSpecificJudge(judgeSelection: string) {
    this.specificJudgeSelection = judgeSelection;
    this.hearingJudgeForm.controls.specificJudge.setValue(this.specificJudgeSelection);
    this.hearingJudgeForm.controls.findPersonControl.get('email').clearValidators();
    this.hearingJudgeForm.controls.judgeType.clearValidators();
    if (this.specificJudgeSelection === RadioOptions.YES) {
      this.hearingJudgeForm.controls.findPersonControl.get('email').setValidators([Validators.required]);
    } else {
      this.hearingJudgeForm.controls.judgeType.setValidators([Validators.required]);
    }
    this.hearingJudgeForm.controls.findPersonControl.get('email').updateValueAndValidity();
    this.hearingJudgeForm.controls.judgeType.updateValueAndValidity();
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

  public ngOnDestroy(): void {
    super.unsubscribe();
  }
}

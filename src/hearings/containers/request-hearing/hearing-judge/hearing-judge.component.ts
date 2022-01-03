import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PersonRole } from '@hmcts/rpx-xui-common-lib/lib/models';
import { Store } from '@ngrx/store';
import { HearingJudgeNamesListComponent } from '../../../../hearings/components';
import { Person } from '../../../../hearings/models/person.model';
import { RefDataModel } from '../../../../hearings/models/refData.model';
import { ValidatorsUtils } from '../../../../hearings/utils/validators.utils';
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
  public judgeList: Person[] = [];
  public hearingJudgeTypes: RefDataModel[];
  public validationErrors: { id: string, message: string }[] = [];
  public personRole: PersonRole;
  @ViewChild('excludedJudge') public excludedJudge: HearingJudgeNamesListComponent;

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
    if (action === ACTION.CONTINUE) {
      this.checkFormData();
      if (this.isFormValid()) {
        super.navigateAction(action);
      }
    } else if (action === ACTION.BACK) {
      super.navigateAction(action);
    }
  }

  public checkFormData() {
    this.validationErrors = [];
    if (!this.excludedJudge.isExcludeJudgeInputValid()) {
      this.validationErrors.push(this.excludedJudge.validationError);
    }
  }

  public isFormValid(): boolean {
    // TODO verify if form group is valid
    return this.excludedJudge.isExcludeJudgeInputValid();
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
  }
}

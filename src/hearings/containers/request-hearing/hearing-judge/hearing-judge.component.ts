import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PersonRole } from '@hmcts/rpx-xui-common-lib/lib/models';
import { Store } from '@ngrx/store';
import { HearingJudgeNameComponent, HearingJudgeNamesListComponent } from '../../../../hearings/components';
import { Person } from '../../../../hearings/models/person.model';
import { RefDataModel } from '../../../../hearings/models/refData.model';
import { ValidatorsUtils } from '../../../../hearings/utils/validators.utils';
import { ACTION, HearingJudgeSelectionEnum, RadioOptions } from '../../../models/hearings.enum';
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
  public specificJudgeSelectionError: string;
  public selectJudgeTypesError: string;
  @ViewChild('hearingJudgeInfo') public hearingJudgeInfo: HearingJudgeNameComponent;
  @ViewChild('excludedJudge') public excludedJudge: HearingJudgeNamesListComponent;

  constructor(private readonly route: ActivatedRoute,
              private readonly formBuilder: FormBuilder,
              protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly hearingsService: HearingsService,
              private readonly validatorsUtils: ValidatorsUtils) {
    super(hearingStore, hearingsService);
    this.hearingJudgeTypes = this.route.snapshot.data.hearingStages;
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public get getJudgeTypeFormArray(): FormArray {
    return this.formBuilder.array(this.hearingJudgeTypes.map(val => this.formBuilder.group({
      key: [val.key],
      value_en: [val.value_en],
      value_cy: [val.value_cy],
      hintText_EN: [val.hintText_EN],
      hintTextCY: [val.hintTextCY],
      order: [val.order],
      parentKey: [val.parentKey],
      selected: [!!val.selected]
    })));
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
      judgeType: this.getJudgeTypeFormArray,
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
      this.hearingJudgeForm.controls.judgeType.setValidators([this.validatorsUtils.formArraySelectedValidator()]);
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

  public showRadioButtonError(): void {
    if (!this.hearingJudgeForm.controls.specificJudge.valid) {
      this.specificJudgeSelectionError = HearingJudgeSelectionEnum.SelectionError;
      this.validationErrors.push({ id: 'specific-judge-selection', message: HearingJudgeSelectionEnum.SelectionError });
    } else if (this.specificJudgeSelection === RadioOptions.YES && !this.hearingJudgeInfo.isJudgeInputValid() && !this.hearingJudgeForm.controls.findPersonControl.get('email').valid) {
      this.validationErrors.push(this.hearingJudgeInfo.validationError);
    } else if (this.specificJudgeSelection === RadioOptions.NO && !this.hearingJudgeForm.controls.judgeType.valid) {
      this.selectJudgeTypesError = HearingJudgeSelectionEnum.SelectOneJudgeError;
      this.validationErrors.push({ id: 'judgeTypes', message: HearingJudgeSelectionEnum.SelectOneJudgeError });
    }
  }

  public showExcludeJudgeError(): void {
    if (!this.excludedJudge.isExcludeJudgeInputValid()) {
      this.validationErrors.push(this.excludedJudge.validationError);
    }
  }

  public checkFormData(): void {
    this.validationErrors = [];
    this.selectJudgeTypesError = null;
    this.specificJudgeSelectionError = null;
    this.showRadioButtonError();
    this.showExcludeJudgeError();
  }

  public isFormValid(): boolean {
    return this.excludedJudge.isExcludeJudgeInputValid() && this.hearingJudgeForm.valid;
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
  }
}

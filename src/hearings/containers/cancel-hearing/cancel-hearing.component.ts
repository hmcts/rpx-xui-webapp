import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ACTION, CancelHearingMessages } from 'src/hearings/models/hearings.enum';
import { RefDataModel } from 'src/hearings/models/refData.model';
import { HearingsService } from '../../../hearings/services/hearings.service';
import * as fromHearingStore from '../../store';
import { ValidatorsUtils } from '../../utils/validators.utils';
import { RequestHearingPageFlow } from '../request-hearing/request-hearing.page.flow';
@Component({
  selector: 'exui-cancel-hearing',
  templateUrl: './cancel-hearing.component.html',
  styleUrls: ['./cancel-hearing.component.scss']
})
export class CancelHearingComponent extends RequestHearingPageFlow implements OnInit {
  public hearingCancelOptions: RefDataModel[];
  public hearingCancelForm: FormGroup;
  public hearingCancelSelectionError: string;
  public validationErrors: { id: string, message: string }[] = [];
  public selectionValid: boolean = true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly validatorsUtils: ValidatorsUtils,
    private readonly formBuilder: FormBuilder,
    protected readonly hearingStore: Store<fromHearingStore.State>,
    protected readonly hearingsService: HearingsService,
    private readonly fb: FormBuilder) {
    super(hearingStore, hearingsService);
  }

  public get actionHearing() {
    return ACTION;
  }

  public ngOnInit(): void {
    this.hearingCancelOptions = this.route.snapshot.data.hearingCancelOptions;
    this.initForm();
  }

  public get getReasonsTypeFormArray(): FormArray {
    return this.formBuilder.array(this.hearingCancelOptions.map(val => this.formBuilder.group({
      key: [val.key],
      value_en: [val.value_en],
      value_cy: [val.value_cy],
      hintText_EN: [val.hintText_EN],
      hintTextCY: [val.hintTextCY],
      order: [val.order],
      parentKey: [val.parentKey],
      selected: [!!val.selected]
    })), this.validatorsUtils.customValidateArray);
  }

  public initForm(): void {
    this.hearingCancelForm = this.formBuilder.group({
      reasons: this.getReasonsTypeFormArray,
    });
  }

  public isFormValid(): boolean {
    this.selectionValid = true;
    if (this.hearingCancelForm.valid) {
      this.validationErrors.push({
        id: `sdsad`, message: CancelHearingMessages.NOT_SELECTED_A_REASON
      });
      return this.selectionValid = false;
    }
    return this.selectionValid;
  }

  public executeAction(actionHearing: ACTION): void {
    if (actionHearing === ACTION.CANCEL) {
      if (this.isFormValid()) {
        this.prepareHearingRequestData();
        super.navigateAction(ACTION.CANCEL);
      }
    } else if (actionHearing === ACTION.BACK) {
      super.navigateAction(actionHearing);
    }
  }

  public prepareHearingRequestData() {
    this.hearingRequestMainModel = {
      ...this.hearingRequestMainModel,
      hearingDetails: {
        ...this.hearingRequestMainModel.hearingDetails,
        cancelationReasion: this.getChosenReasons()
      }
    };
  }

  public getChosenReasons(): RefDataModel[] {
    const mappedReason: RefDataModel[] = [];
    const reasonChosen = (this.hearingCancelForm.controls.reasons as FormArray).controls
      .filter(reason => reason.value.value_en === true);

    reasonChosen.forEach(element => {
      mappedReason.push({
        key: element.value.key,
        value_en: element.value.value_en,
        value_cy: element.value.value_cy,
        hintText_EN: element.value.hintText_EN,
        hintTextCY: element.value.hintTextCY,
        order: element.value.order,
        parentKey: element.value.parentKey,
      } as RefDataModel);
    });
    console.log(reasonChosen);
    return mappedReason;
  }
}



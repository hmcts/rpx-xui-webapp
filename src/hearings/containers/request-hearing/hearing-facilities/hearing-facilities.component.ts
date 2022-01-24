import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { RefDataModel } from '../../../../hearings/models/refData.model';
import { CaseFlagReferenceModel } from '../../../models/caseFlagReference.model';
import { ACTION, CaseFlagType, HearingFacilitiesEnum } from '../../../models/hearings.enum';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import { RequestHearingPageFlow } from '../request-hearing.page.flow';

@Component({
  selector: 'exui-hearing-facilities',
  templateUrl: './hearing-facilities.component.html',
})
export class HearingFacilitiesComponent extends RequestHearingPageFlow implements OnInit, OnDestroy {
  public caseFlagsRefData: CaseFlagReferenceModel[];
  public caseFlagType: CaseFlagType = CaseFlagType.NON_REASONABLE_ADJUSTMENT;
  public hearingFactilitiesForm: FormGroup;
  public additionSecurityError: string;
  public validationErrors: { id: string, message: string }[] = [];
  public additionalFacilities: RefDataModel[];
  public additionSecurityRequiredValid: boolean = true;
  constructor(
    private readonly route: ActivatedRoute,
    protected readonly hearingStore: Store<fromHearingStore.State>,
    protected readonly hearingsService: HearingsService,
    protected fb: FormBuilder) {
    super(hearingStore, hearingsService);
    this.additionalFacilities = this.route.snapshot.data.additionFacilitiesOptions;
    this.caseFlagsRefData = this.route.snapshot.data.caseFlags;
  }

  public ngOnInit(): void {
    this.hearingFactilitiesForm = this.fb.group({
      'addition-security-required': ['', Validators.required],
      'addition-securities': this.additionalFacilities ? this.getHearingFacilitiesFormArray : [],
    });
  }

  public get getHearingFacilitiesFormArray(): FormArray {
    return this.fb.array(this.additionalFacilities.map(val => this.fb.group({
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

  public get hearingFacilitiesEnum() {
    return HearingFacilitiesEnum;
  }

  public executeAction(action: ACTION): void {
    if (action === ACTION.CONTINUE) {
      if (this.hearingFactilitiesForm && this.hearingFactilitiesForm.controls['addition-security-required']) {
        this.hearingFactilitiesForm.controls['addition-security-required'].markAsDirty();
      }
      this.additionSecurityRequiredValid = this.isFormValid();
      if (this.additionSecurityRequiredValid) {
        this.prepareHearingRequestData();
        super.navigateAction(action);
      }
    } else if (action === ACTION.BACK) {
      super.navigateAction(action);
    }
  }

  public prepareHearingRequestData() {
    const facilitiesRequired: string[] = (this.hearingFactilitiesForm.controls['addition-securities'] as FormArray).controls
      .filter(control => control.value.selected).map(mapControl => mapControl.value.key);
    this.hearingRequestMainModel = {
      ...this.hearingRequestMainModel,
      caseDetails: {
        ...this.hearingRequestMainModel.caseDetails,
        caseAdditionalSecurityFlag: this.hearingFactilitiesForm.controls['addition-security-required'].value === 'Yes'
      },
      hearingDetails: {
        ...this.hearingRequestMainModel.hearingDetails,
        facilitiesRequired
      }
    };
  }

  public isFormValid(): boolean {
    this.additionSecurityError = null;
    this.validationErrors = [];
    if (!this.hearingFactilitiesForm.controls['addition-security-required'].valid) {
      this.additionSecurityError = HearingFacilitiesEnum.additionSecurityError;
      this.validationErrors.push({ id: 'addition-security-confirmation', message: HearingFacilitiesEnum.additionSecurityError });
      return false;
    }
    return true;
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
  }
}

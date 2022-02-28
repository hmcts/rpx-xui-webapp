import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PersonRole } from '@hmcts/rpx-xui-common-lib';
import { Store } from '@ngrx/store';
import { JudicialUserModel } from '../../../../hearings/models/judicialUser.model';
import { PanelPreferenceModel } from '../../../../hearings/models/panelPreference.model';
import { JudicialRefDataService } from '../../../../hearings/services/judicial-ref-data.service';
import { HearingJudgeNameComponent, HearingJudgeNamesListComponent } from '../../../components';
import { ACTION, HearingJudgeSelectionEnum, MemberType, RadioOptions, RequirementType } from '../../../models/hearings.enum';
import { LovRefDataModel } from '../../../models/lovRefData.model';
import { Person } from '../../../models/person.model';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import { ValidatorsUtils } from '../../../utils/validators.utils';
import { RequestHearingPageFlow } from '../request-hearing.page.flow';

@Component({
  selector: 'exui-hearing-judge',
  templateUrl: './hearing-judge.component.html',
})
export class HearingJudgeComponent extends RequestHearingPageFlow implements OnInit, AfterViewInit, OnDestroy {
  public hearingJudgeForm: FormGroup;
  public specificJudgeSelection: string;
  public excludedJudgeList: Person[] = [];
  public hearingJudgeTypes: LovRefDataModel[];
  public personalCodejudgeList: JudicialUserModel[] = [];
  public validationErrors: { id: string, message: string }[] = [];
  public personRole = PersonRole.JUDICIAL;
  public specificJudgeSelectionError: string;
  public selectJudgeTypesError: string;
  public hearingJudgeFormInfo: { includedJudges: string[], judgeTypes: string[], excludedJudges: string[] };
  @ViewChild('hearingJudgeInfo') public hearingJudgeInfo: HearingJudgeNameComponent;
  @ViewChild('excludedJudge') public excludedJudge: HearingJudgeNamesListComponent;

  constructor(protected readonly route: ActivatedRoute,
              private readonly formBuilder: FormBuilder,
              protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly hearingsService: HearingsService,
              protected readonly judicialRefDataService: JudicialRefDataService,
              private readonly validatorsUtils: ValidatorsUtils) {
    super(hearingStore, hearingsService, route);
    this.hearingJudgeTypes = this.route.snapshot.data.hearingStages;
    this.personalCodejudgeList = this.route.snapshot.data.judicialUsers;
  }

  public ngOnInit(): void {
    this.getFormData();
    this.initForm();
    this.setFormData();
  }

  public getFormData(): void {
    let judgeTypes: string[];
    let includedJudges: string[] = [];
    let excludedJudges: string[] = [];
    const panelRequirements = this.hearingRequestMainModel.hearingDetails.panelRequirements;
    if (panelRequirements && panelRequirements.roleType && panelRequirements.roleType.length) {
      this.specificJudgeSelection = RadioOptions.NO;
      judgeTypes = panelRequirements.roleType;
    } else if (panelRequirements && panelRequirements.panelPreferences) {
      this.specificJudgeSelection = RadioOptions.YES;
      includedJudges = panelRequirements.panelPreferences.filter(preferences => preferences.memberType === MemberType.JUDGE && preferences.requirementType === RequirementType.MUSTINC).map(preferences => preferences.memberID);
    }
    excludedJudges = panelRequirements && panelRequirements.panelPreferences.filter(preferences => preferences.memberType === MemberType.JUDGE && preferences.requirementType === RequirementType.EXCLUDE).map(preferences => preferences.memberID);
    this.hearingJudgeFormInfo = {
      includedJudges, judgeTypes, excludedJudges
    };
  }

  public get getJudgeTypeFormArray(): FormArray {
    const preselectedJudgeTypes: string[] = this.hearingJudgeFormInfo.judgeTypes;
    return this.formBuilder.array(this.hearingJudgeTypes.map(val => this.formBuilder.group({
      key: [val.key],
      value_en: [val.value_en],
      value_cy: [val.value_cy],
      hintText_EN: [val.hintText_EN],
      hintTextCY: [val.hintTextCY],
      order: [val.order],
      parentKey: [val.parentKey],
      selected: [!!val.selected || (preselectedJudgeTypes && preselectedJudgeTypes.includes(val.key))]
    })));
  }

  public initForm(): void {
    this.hearingJudgeForm = this.formBuilder.group({
      specificJudge: [this.specificJudgeSelection, Validators.required],
      findPersonControl: this.formBuilder.group({
        domain: '',
        email: [''],
        id: '',
        knownAs: '',
        name: '',
        personalCode: '',
      }),
      judgeType: this.getJudgeTypeFormArray,
    });
  }

  public setFormData(): void {
    if (this.specificJudgeSelection) {
      this.showSpecificJudge(this.specificJudgeSelection);
    }
    if (this.specificJudgeSelection === RadioOptions.YES) {
      const includedJudge = this.personalCodejudgeList.find((judgeInfo) => this.hearingJudgeFormInfo.includedJudges.includes(judgeInfo.personal_code));
      const judgeDetails = {
        domain: this.personRole,
        email: includedJudge.email_id,
        id: includedJudge.sidam_id,
        knownAs: includedJudge.known_as,
        name: includedJudge.surname,
        personalCode: includedJudge.personal_code,
      };
      this.hearingJudgeInfo.setSelectedJudge(judgeDetails);
    }

    if (this.hearingJudgeFormInfo.excludedJudges && this.hearingJudgeFormInfo.excludedJudges.length) {
      this.personalCodejudgeList.forEach(judgeInfo => {
        if (this.hearingJudgeFormInfo.excludedJudges.includes(judgeInfo.personal_code)) {
          const judgeDetail = {
            domain: this.personRole,
            email: judgeInfo.email_id,
            id: judgeInfo.sidam_id,
            knownAs: judgeInfo.known_as,
            name: judgeInfo.surname,
            personalCode: judgeInfo.personal_code,
          };
          this.excludedJudgeList.push(judgeDetail);
        }
      });
    }
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
        this.prepareHearingRequestData();
        super.navigateAction(action);
      }
    } else if (action === ACTION.BACK) {
      super.navigateAction(action);
    }
  }

  public prepareHearingRequestData(): void {
    const selectedPanelJudges: PanelPreferenceModel[] = [] as PanelPreferenceModel[];
    let roleType: string[] = [];
    if (this.hearingJudgeForm.value.specificJudge === RadioOptions.YES) {
      const panelPreference: PanelPreferenceModel = {
        memberID: this.hearingJudgeForm.value.findPersonControl.personalCode,
        memberType: MemberType.JUDGE,
        requirementType: RequirementType.MUSTINC
      };
      selectedPanelJudges.push(panelPreference);
    } else {
      roleType = this.hearingJudgeForm.value.judgeType.filter(judgeType => judgeType.selected).map(judgeType => judgeType.key);
    }
    this.excludedJudge.judgeList.forEach(judgeInfo => {
      const panelPreference: PanelPreferenceModel = {
        memberID: judgeInfo.personalCode,
        memberType: MemberType.JUDGE,
        requirementType: RequirementType.EXCLUDE
      };
      selectedPanelJudges.push(panelPreference);
    });
    const panelRequirements = this.hearingRequestMainModel.hearingDetails.panelRequirements;
    const selectedPanelMembers = panelRequirements && panelRequirements.panelPreferences.filter(preferences => preferences.memberType === MemberType.PANEL_MEMBER) || [];
    this.hearingRequestMainModel = {
      ...this.hearingRequestMainModel,
      hearingDetails: {
        ...this.hearingRequestMainModel.hearingDetails,
        panelRequirements: {
          ...this.hearingRequestMainModel.hearingDetails.panelRequirements,
          roleType,
          panelPreferences: [...selectedPanelMembers, ...selectedPanelJudges]
        }
      }
    };
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

  public ngAfterViewInit(): void {
    this.fragmentFocus();
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
  }
}

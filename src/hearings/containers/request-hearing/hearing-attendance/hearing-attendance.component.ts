import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ACTION, HearingChannelEnum, PartyType, RadioOptions } from '../../../models/hearings.enum';
import { IndividualDetailsModel } from '../../../models/individualDetails.model';
import { LovRefDataModel } from '../../../models/lovRefData.model';
import { PartyDetailsModel } from '../../../models/partyDetails.model';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import { ValidatorsUtils } from '../../../utils/validators.utils';
import { RequestHearingPageFlow } from '../request-hearing.page.flow';

@Component({
  selector: 'exui-hearing-attendance',
  templateUrl: './hearing-attendance.component.html',
  styleUrls: ['./hearing-attendance.component.scss']
})
export class HearingAttendanceComponent extends RequestHearingPageFlow implements OnInit, AfterViewInit, OnDestroy {
  public attendanceFormGroup: FormGroup;
  public validationErrors: { id: string, message: string }[] = [];
  public hint: string = 'Where known, contact details for remote attendees will be included in the request.';
  public title: string = 'Participant attendance';
  public partiesFormArray: FormArray;
  public formValid: boolean = true;
  public partyChannels: LovRefDataModel[];
  public hearingLevelChannels: LovRefDataModel[];
  public selectionValid: boolean = true;
  public isAttendanceSelected: boolean = true;

  constructor(
    protected readonly hearingStore: Store<fromHearingStore.State>,
    protected readonly hearingsService: HearingsService,
    private readonly validatorsUtils: ValidatorsUtils,
    private readonly fb: FormBuilder,
    protected readonly route: ActivatedRoute) {
    super(hearingStore, hearingsService, route);
    this.hearingLevelChannels = this.route.snapshot.data.hearingChannels.filter((channel: LovRefDataModel) => channel.key !== HearingChannelEnum.ONPPR && channel.key !== HearingChannelEnum.NotAttending);
    this.partyChannels = this.route.snapshot.data.hearingChannels.filter((channel: LovRefDataModel) => channel.key !== HearingChannelEnum.ONPPR);
    this.attendanceFormGroup = fb.group({
      estimation: [null, [Validators.pattern(/^\d+$/)]],
      parties: fb.array([]),
      hearingLevelChannels: this.getHearingLevelChannels,
      paperHearing: [this.hearingRequestMainModel.hearingDetails.hearingChannels && this.hearingRequestMainModel.hearingDetails.hearingChannels.includes(HearingChannelEnum.ONPPR) ? RadioOptions.YES : RadioOptions.NO]
    });
    this.partiesFormArray = fb.array([]);
  }

  public get getHearingLevelChannels(): FormArray {
    const hearingLevelParticipantChannels = this.hearingRequestMainModel.hearingDetails.hearingChannels;
    return this.fb.array(this.hearingLevelChannels.map((val) => this.fb.group({
      key: [val.key],
      value_en: [val.value_en],
      value_cy: [val.value_cy],
      hint_text_en: [val.hint_text_en],
      hint_text_cy: [val.hint_text_cy],
      lov_order: [val.lov_order],
      parent_key: [val.parent_key],
      selected: [!!val.selected || (hearingLevelParticipantChannels && hearingLevelParticipantChannels.includes(val.key))]
    })), [this.validatorsUtils.formArraySelectedValidator()]);
  }

  public ngOnInit(): void {
    if (!this.hearingRequestMainModel.partyDetails.length) {
      this.initialiseFromHearingValues();
    } else {
      this.hearingRequestMainModel.partyDetails.filter((party) => party.partyType === PartyType.IND)
        .forEach((partyDetail) => {
          (this.attendanceFormGroup.controls.parties as FormArray).push(this.patchValues({
            partyID: partyDetail.partyID,
            partyType: partyDetail.partyType,
            partyRole: partyDetail.partyRole,
            partyName: `${partyDetail.individualDetails.firstName} ${partyDetail.individualDetails.lastName}`,
            individualDetails: partyDetail.individualDetails,
            organisationDetails: partyDetail.organisationDetails,
            unavailabilityDOW: partyDetail.unavailabilityDOW,
            unavailabilityRange: partyDetail.unavailabilityRange
          } as PartyDetailsModel) as FormGroup);
        });

      this.attendanceFormGroup.controls.estimation.setValue(this.hearingRequestMainModel.hearingDetails.numberOfPhysicalAttendees || 0);
    }
    this.partiesFormArray = this.attendanceFormGroup.controls.parties as FormArray;
  }

  public initialiseFromHearingValues() {
    this.serviceHearingValuesModel.parties.forEach((partyDetailsModel: PartyDetailsModel) => {
      (this.attendanceFormGroup.controls.parties as FormArray).push(this.patchValues(partyDetailsModel) as FormGroup);
    });
    this.attendanceFormGroup.controls.estimation.setValue(this.serviceHearingValuesModel.numberOfPhysicalAttendees);
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
      partyDetails: [...this.getIndividualParties(), ...this.getOrganisationParties()],
      hearingDetails: {
        ...this.hearingRequestMainModel.hearingDetails,
        hearingChannels: this.getHearingChannels(),
        numberOfPhysicalAttendees: parseInt(this.attendanceFormGroup.controls.estimation.value, 0)
      }
    };
  }

  public getIndividualParties(): PartyDetailsModel[] {
    const individualParties: PartyDetailsModel[] = [];
    (this.attendanceFormGroup.controls.parties as FormArray).controls.forEach((control) => {
      const partyDetail: PartyDetailsModel = {
        partyID: control.value.partyID,
        partyType: control.value.partyType,
        partyRole: control.value.partyRole,
        partyName: control.value.partyName,
        individualDetails: control.value.individualDetails,
        unavailabilityDOW: control.value.unavailabilityDOW,
        unavailabilityRange: control.value.unavailabilityRange
      };
      individualParties.push(partyDetail);
    });
    return individualParties;
  }

  public getOrganisationParties(): PartyDetailsModel[] {
    return this.serviceHearingValuesModel.parties.filter((party) => party.partyType === PartyType.ORG);
  }

  public getHearingChannels(): string[] {
    if (this.attendanceFormGroup.controls.paperHearing.value === RadioOptions.YES) {
      return [HearingChannelEnum.ONPPR];
    }
    return this.attendanceFormGroup.controls.hearingLevelChannels.value.filter((channel) => channel.selected).map((channel) => channel.key);
  }

  public isFormValid(): boolean {
    this.validationErrors = [];
    let formValid = true;
    let selectionValid = true;
    this.isAttendanceSelected = true;

    if (this.attendanceFormGroup.controls.paperHearing.value === RadioOptions.YES) {
      return formValid;
    }

    (this.attendanceFormGroup.controls.parties as FormArray).controls.forEach((element) => {
      if (!element.valid) {
        formValid = false;
        selectionValid = false;
        this.validationErrors.push({
          id: `partyChannel${(this.attendanceFormGroup.controls.parties as FormArray).controls.indexOf(element)}`,
          message: 'Select how each participant will attend the hearing'
        });
      }
    });

    this.attendanceFormGroup.controls.estimation.markAsDirty();
    if (!this.attendanceFormGroup.controls.estimation.valid) {
      formValid = false;
      this.validationErrors.push({ id: 'attendance-number', message: 'Enter a valid number of attendees' });
    }
    if (this.attendanceFormGroup.controls.hearingLevelChannels.invalid) {
      formValid = false;
      this.isAttendanceSelected = false;
      this.validationErrors.push({ id: 'attendance-selection-error', message: 'Select a way of participant attendance' });
    }

    this.selectionValid = selectionValid;
    this.formValid = formValid;
    return formValid;
  }

  public patchValues(party: PartyDetailsModel): FormGroup {
    const individualDetails = party.individualDetails && this.initIndividualDetailsFormGroup(party.individualDetails);
    const organisationDetails = party.organisationDetails;
    return this.fb.group({
      partyID: [party.partyID],
      partyType: [party.partyType],
      partyName: [party.partyName],
      partyRole: [party.partyRole],
      ...individualDetails && ({ individualDetails }),
      ...organisationDetails && ({ organisationDetails }),
      unavailabilityDOW: [party.unavailabilityDOW],
      unavailabilityRange: [party.unavailabilityRange]
    });
  }

  public ngAfterViewInit(): void {
    this.fragmentFocus();
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
  }

  private initIndividualDetailsFormGroup(individualDetails: IndividualDetailsModel): FormGroup {
    return this.fb.group({
      firstName: [individualDetails.firstName],
      lastName: [individualDetails.lastName],
      preferredHearingChannel: [individualDetails.preferredHearingChannel, Validators.required],
      interpreterLanguage: [individualDetails.interpreterLanguage],
      reasonableAdjustments: [individualDetails.reasonableAdjustments],
      relatedParties: [individualDetails.relatedParties],
      title: [individualDetails.title],
      vulnerableFlag: [individualDetails.vulnerableFlag],
      vulnerabilityDetails: [individualDetails.vulnerabilityDetails],
      hearingChannelEmail: [individualDetails.hearingChannelEmail],
      hearingChannelPhone: [individualDetails.hearingChannelPhone],
      custodyStatus: [individualDetails.custodyStatus],
      otherReasonableAdjustmentDetails: [individualDetails.otherReasonableAdjustmentDetails]
    });
  }
}

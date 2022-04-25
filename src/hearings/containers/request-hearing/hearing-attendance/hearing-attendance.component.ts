import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {ACTION, HearingCategory} from '../../../models/hearings.enum';
import {IndividualDetailsModel} from '../../../models/individualDetails.model';
import {LovRefDataModel} from '../../../models/lovRefData.model';
import {PartyDetailsModel} from '../../../models/partyDetails.model';
import {HearingsService} from '../../../services/hearings.service';
import {LovRefDataService} from '../../../services/lov-ref-data.service';
import * as fromHearingStore from '../../../store';
import {ValidatorsUtils} from '../../../utils/validators.utils';
import {RequestHearingPageFlow} from '../request-hearing.page.flow';

@Component({
  selector: 'exui-hearing-attendance',
  templateUrl: './hearing-attendance.component.html',
  styleUrls: ['./hearing-attendance.component.scss']
})
export class HearingAttendanceComponent extends RequestHearingPageFlow implements OnInit, AfterViewInit, OnDestroy {
  public attendanceFormGroup: FormGroup;
  public validationErrors: { id: string, message: string }[] = [];
  public hint: string = 'Where known, contact details for remote attendees will be included in the request.';
  public title: string = ' How will each participant attend the hearing?';
  public partiesFormArray: FormArray;
  public formValid: boolean = true;
  public partyChannels$: Observable<LovRefDataModel[]>;
  public selectionValid: boolean = true;

  constructor(
    protected readonly hearingStore: Store<fromHearingStore.State>,
    protected readonly hearingsService: HearingsService,
    private readonly validatorsUtils: ValidatorsUtils,
    private readonly lovRefDataService: LovRefDataService,
    private readonly fb: FormBuilder,
    protected readonly route: ActivatedRoute) {
    super(hearingStore, hearingsService, route);
    this.attendanceFormGroup = fb.group({
      estimation: [null, [this.validatorsUtils.numberLargerThanValidator(0)]],
      parties: fb.array([])
    });
    this.partiesFormArray = fb.array([]);
  }

  public ngOnInit(): void {
    this.partyChannels$ = this.lovRefDataService.getListOfValues(HearingCategory.HearingChannel,
      this.serviceHearingValuesModel.hmctsServiceID);
    if (!this.hearingRequestMainModel.partyDetails.length) {
      this.initialiseFromHearingValues();
    } else {
      this.hearingRequestMainModel.partyDetails.forEach(partyDetail => {
        (this.attendanceFormGroup.controls.parties as FormArray).push(this.patchValues({
          partyID: partyDetail.partyID,
          partyType: partyDetail.partyType,
          partyRole: partyDetail.partyRole,
          partyName: partyDetail.partyName,
          individualDetails: partyDetail.individualDetails,
          organisationDetails: partyDetail.organisationDetails,
          unavailabilityDOW: partyDetail.unavailabilityDOW,
          unavailabilityRanges: partyDetail.unavailabilityRanges
        } as PartyDetailsModel) as FormGroup);
      });

      this.attendanceFormGroup.controls.estimation.setValue(this.hearingRequestMainModel.hearingDetails.numberOfPhysicalAttendees);
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

  public prepareHearingRequestData() {
    const partyDetails: PartyDetailsModel[] = [];
    (this.attendanceFormGroup.controls.parties as FormArray).controls.forEach(control => {
      const partyDetail: PartyDetailsModel = {
        partyID: control.value.partyID,
        partyType: control.value.partyType,
        partyRole: control.value.partyRole,
        partyName: control.value.partyName,
        individualDetails: control.value.individualDetails,
        organisationDetails: control.value.organisationDetails,
        unavailabilityDOW: control.value.unavailabilityDOW,
        unavailabilityRanges: control.value.unavailabilityRanges
      };
      partyDetails.push(partyDetail);
    });

    this.hearingRequestMainModel = {
      ...this.hearingRequestMainModel,
      partyDetails,
      hearingDetails: {
        ...this.hearingRequestMainModel.hearingDetails,
        numberOfPhysicalAttendees: parseInt(this.attendanceFormGroup.controls.estimation.value, 0)
      }
    };
  }

  public isFormValid(): boolean {
    this.validationErrors = [];
    let formValid = true;
    let selectionValid = true;

    (this.attendanceFormGroup.controls.parties as FormArray).controls.forEach(element => {
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
      this.validationErrors.push({id: 'attendance-number', message: 'Enter a valid number of attendees'});
    }

    this.selectionValid = selectionValid;
    this.formValid = formValid;
    return formValid;
  }

  public patchValues(party: PartyDetailsModel): FormGroup {
    const individualDetails = this.initIndividualDetailsFormGroup(party.individualDetails);
    const organisationDetails = party.organisationDetails;
    return this.fb.group({
      partyID: [party.partyID],
      partyType: [party.partyType],
      partyName: [party.partyName],
      partyRole: [party.partyRole],
      ...individualDetails && ({individualDetails}),
      ...organisationDetails && ({organisationDetails}),
      unavailabilityDOW: [party.unavailabilityDOW],
      unavailabilityRanges: [party.unavailabilityRanges],
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
      vulnerabilityDetails: [individualDetails.vulnerabilityDetails],
    });
  }
}

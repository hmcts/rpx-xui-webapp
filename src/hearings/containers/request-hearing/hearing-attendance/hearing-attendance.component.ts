import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {ACTION} from '../../../models/hearings.enum';
import {PartyDetailsModel} from '../../../models/partyDetails.model';
import {PartyUnavailabilityModel} from '../../../models/partyUnavilability.model';
import {RefDataModel} from '../../../models/refData.model';
import {HearingsRefDataService} from '../../../services/hearings-ref-data.service';
import {HearingsService} from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import {ValidatorsUtils} from '../../../utils/validators.utils';
import {RequestHearingPageFlow} from '../request-hearing.page.flow';

@Component({
  selector: 'exui-hearing-attendance',
  templateUrl: './hearing-attendance.component.html',
  styleUrls: ['./hearing-attendance.component.scss']
})
export class HearingAttendanceComponent extends RequestHearingPageFlow implements OnInit, OnDestroy {
  public attendanceFormGroup: FormGroup;
  public validationErrors: { id: string, message: string }[] = [];
  public hint: string = 'Where known, contact details for remote attendees will be included in the request.';
  public title: string = ' How will each participant attend the hearing?';
  public partiesFormArray: FormArray;
  public formValid: boolean = true;
  public partyChannels: Observable<RefDataModel[]>;
  public selectionValid: boolean = true;

  constructor(
    protected readonly hearingStore: Store<fromHearingStore.State>,
    protected readonly hearingsService: HearingsService,
    private readonly validatorsUtils: ValidatorsUtils,
    private readonly hearingsRefDataService: HearingsRefDataService,
    private readonly fb: FormBuilder) {
    super(hearingStore, hearingsService);
    this.attendanceFormGroup = fb.group({
      estimation: [null, [this.validatorsUtils.numberLargerThanValidator(0)]],
      parties: fb.array([])
    });
  }

  public ngOnInit(): void {
    this.partyChannels = this.hearingsRefDataService.getRefData('PartyChannel', this.hearingListMainModel.hmctsServiceID);
    if (!this.hearingRequestMainModel.partyDetails.length) {
      this.initialiseFromHearingValues();
    } else {
      this.hearingRequestMainModel.partyDetails.forEach(partyDetail => {
        (this.attendanceFormGroup.controls.parties as FormArray).push(this.patchValues({
          partyName: partyDetail.partyName,
          partyChannel: partyDetail.partyChannel,
        } as PartyUnavailabilityModel) as FormGroup);
      });

      this.attendanceFormGroup.controls.estimation.setValue(this.hearingRequestMainModel.hearingDetails.totalParticipantAttendingHearing);
    }
    this.partiesFormArray = this.attendanceFormGroup.controls.parties as FormArray;
  }

  public initialiseFromHearingValues() {
    this.serviceHearingValuesModel.parties.forEach((x: PartyUnavailabilityModel) => {
      (this.attendanceFormGroup.controls.parties as FormArray).push(this.patchValues(x) as FormGroup);
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

  public prepareHearingRequestData() {
    const partyDetails: PartyDetailsModel[] = [];
    (this.attendanceFormGroup.controls.parties as FormArray).controls.forEach(control => {
      partyDetails.push({
        partyName: control.value.partyName,
        partyChannel: control.value.partyChannel,
      } as PartyDetailsModel);
    });

    this.hearingRequestMainModel = {
      ...this.hearingRequestMainModel,
      partyDetails: [
        ...partyDetails,
      ],
      hearingDetails: {
        ...this.hearingRequestMainModel.hearingDetails,
        totalParticipantAttendingHearing: parseInt(this.attendanceFormGroup.controls.estimation.value, 0)
      }
    };
  }

  public formGroupControl(formGroup: FormGroup, controlName: string) {
    return formGroup.controls[controlName];
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

  public patchValues(party: PartyUnavailabilityModel): FormGroup {
    return this.fb.group({
      partyName: [party.partyName],
      partyChannel: [party.partyChannel, Validators.required],
      unavailability: [party.unavailability],
    });
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
  }
}

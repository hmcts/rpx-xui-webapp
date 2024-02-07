import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';
import { AmendmentLabelStatus } from '../../../../../hearings/models/hearingsUpdateMode.enum';
import { HearingsService } from '../../../../../hearings/services/hearings.service';
import { EditHearingChangeConfig } from '../../../../models/editHearingChangeConfig.model';
import { HearingRequestMainModel } from '../../../../models/hearingRequestMain.model';
import { LovRefDataModel } from '../../../../models/lovRefData.model';

@Component({
  selector: 'exui-additional-facilities-section',
  templateUrl: './additional-facilities-section.component.html'
})
export class AdditionalFacilitiesSectionComponent implements OnInit {
  @Input() public additionalFacilitiesRefData: LovRefDataModel[];
  @Input() public hearingRequestMainModel: HearingRequestMainModel;
  @Input() public hearingRequestToCompareMainModel: HearingRequestMainModel;
  @Output() public changeEditHearing = new EventEmitter<EditHearingChangeConfig>();

  public additionalFacilitiesRequiredText: string;
  public additionalFacilities: string[] = [];
  public amendmentLabelEnum = AmendmentLabelStatus;
  public nonReasonableAdjustmentChangesRequired: boolean;
  public nonReasonableAdjustmentChangesConfirmed: boolean;
  public caseAdditionalSecurityFlagChanged: boolean;
  public facilitiesChanged: boolean;
  public showAmendedForPageTitle: boolean;
  public facilitiesRequiredToCompare: string[] = [];

  constructor(private readonly hearingsService: HearingsService) {
  }

  public ngOnInit(): void {
    this.additionalFacilitiesRequiredText = this.hearingRequestMainModel.caseDetails?.caseAdditionalSecurityFlag
      ? 'Yes'
      : 'No';

    this.hearingRequestMainModel.hearingDetails?.facilitiesRequired?.forEach((facility) => {
      const facilityFromRefData = this.additionalFacilitiesRefData.find((facilityRefData) => facilityRefData.key === facility);
      if (facilityFromRefData) {
        this.additionalFacilities.push(facilityFromRefData.value_en);
      }
    });

    this.nonReasonableAdjustmentChangesRequired = this.hearingsService.propertiesUpdatedOnPageVisit?.afterPageVisit?.nonReasonableAdjustmentChangesRequired;
    this.nonReasonableAdjustmentChangesConfirmed = this.hearingsService.propertiesUpdatedOnPageVisit?.afterPageVisit?.nonReasonableAdjustmentChangesConfirmed;

    this.caseAdditionalSecurityFlagChanged = !_.isEqual(
      this.hearingRequestToCompareMainModel.caseDetails?.caseAdditionalSecurityFlag,
      this.hearingRequestMainModel.caseDetails?.caseAdditionalSecurityFlag
    );

    this.facilitiesChanged = !_.isEqual(
      this.hearingRequestToCompareMainModel.hearingDetails.facilitiesRequired,
      this.hearingRequestMainModel.hearingDetails.facilitiesRequired
    );

    this.showAmendedForPageTitle = this.nonReasonableAdjustmentChangesConfirmed ||
      this.caseAdditionalSecurityFlagChanged ||
      this.facilitiesChanged;

    this.hearingRequestToCompareMainModel.hearingDetails.facilitiesRequired?.forEach((facility) => {
      const facilityFromRefData = this.additionalFacilitiesRefData.find((additionalFacility) => additionalFacility.key === facility);
      if (facilityFromRefData) {
        this.facilitiesRequiredToCompare.push(facilityFromRefData.value_en);
      }
    });
  }

  public onChange(fragmentId: string): void {
    let changeLink = '';
    if (fragmentId === 'additionalSecurityRequired') {
      changeLink = '/hearings/request/hearing-facilities#additionalSecurityYes';
    } else {
      changeLink = '/hearings/request/hearing-facilities#immigrationDetentionCentre';
    }
    this.changeEditHearing.emit({ fragmentId, changeLink });
  }

  public showAmendedForFacilitiesRequired(facility: string): boolean {
    return !this.facilitiesRequiredToCompare.includes(facility);
  }
}

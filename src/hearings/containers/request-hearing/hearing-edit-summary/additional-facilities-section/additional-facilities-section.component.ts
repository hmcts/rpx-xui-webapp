import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() public changeEditHearing = new EventEmitter<EditHearingChangeConfig>();

  public additionalFacilitiesRequiredText: string;
  public additionalFacilities: string[] = [];

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
}

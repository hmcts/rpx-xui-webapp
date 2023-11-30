import { Component, Input, OnInit } from '@angular/core';
import { HearingRequestMainModel } from '../../../models/hearingRequestMain.model';
import { LovRefDataModel } from '../../../models/lovRefData.model';

@Component({
  selector: 'exui-additional-facilities-section',
  templateUrl: './additional-facilities-section.component.html'
})
export class AdditionalFacilitiesSectionComponent implements OnInit {
  @Input() public facilitiesRefData: LovRefDataModel[];
  @Input() public hearingRequestMainModel: HearingRequestMainModel;
  public additionalFacilitiesRequiredText: string;
  public additionalFacilities: string[] = [];

  public ngOnInit(): void {
    this.additionalFacilitiesRequiredText = this.hearingRequestMainModel.caseDetails?.caseAdditionalSecurityFlag
      ? 'Yes'
      : 'No';

    this.hearingRequestMainModel.hearingDetails?.facilitiesRequired?.forEach((facility) => {
      const facilityFromRefData = this.facilitiesRefData.find((facilityRefData) => facilityRefData.key === facility);
      if (facilityFromRefData) {
        this.additionalFacilities.push(facilityFromRefData.value_en);
      }
    });
  }
}

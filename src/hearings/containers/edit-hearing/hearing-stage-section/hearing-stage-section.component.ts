import { Component, Input, OnInit } from '@angular/core';
import { LovRefDataModel } from '../../../models/lovRefData.model';
import { HearingDetailsModel } from '../../../models/hearingDetails.model';

@Component({
  selector: 'exui-hearing-stage-section',
  templateUrl: './hearing-stage-section.component.html'
})
export class HearingStageSectionComponent implements OnInit {
  @Input() public hearingStageOptionsRefData: LovRefDataModel[];
  @Input() public hearingDetails: HearingDetailsModel;

  public ngOnInit(): void {

    this.hearingDetails.hear

    state.hearingRequest.hearingRequestMainModel.hearingDetails.hearingType;

        return StageAnswerConverter.getHearingTypeDisplayValue(hearingStageOptions, selection);
  }

  private getHearingTypeDisplayValue(hearingStageOptions: LovRefDataModel[], key: string): string {
    const lovData: LovRefDataModel = hearingStageOptions.find((stage) => stage.key === key);
    return lovData ? lovData.value_en : '';
  }
}

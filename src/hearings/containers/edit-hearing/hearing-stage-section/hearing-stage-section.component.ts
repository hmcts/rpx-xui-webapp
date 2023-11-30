import { Component, Input, OnInit } from '@angular/core';
import { HearingRequestMainModel } from '../../../models/hearingRequestMain.model';
import { LovRefDataModel } from '../../../models/lovRefData.model';

@Component({
  selector: 'exui-hearing-stage-section',
  templateUrl: './hearing-stage-section.component.html'
})
export class HearingStageSectionComponent implements OnInit {
  @Input() public hearingStageOptionsRefData: LovRefDataModel[];
  @Input() public hearingRequestMainModel: HearingRequestMainModel;
  public hearingStage: string;

  public ngOnInit(): void {
    const hearingType = this.hearingRequestMainModel.hearingDetails.hearingType;
    const hearingStageFromRefData = this.hearingStageOptionsRefData.find((stage) => stage.key === hearingType);
    this.hearingStage = hearingStageFromRefData
      ? hearingStageFromRefData.value_en
      : '';
  }
}

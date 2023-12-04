import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HearingRequestMainModel } from '../../../models/hearingRequestMain.model';
import { LovRefDataModel } from '../../../models/lovRefData.model';
import { EditHearingChangeConfig } from '../../../models/editHearingChangeConfig.model';

@Component({
  selector: 'exui-hearing-stage-section',
  templateUrl: './hearing-stage-section.component.html'
})
export class HearingStageSectionComponent implements OnInit {
  @Input() public hearingStageOptionsRefData: LovRefDataModel[];
  @Input() public hearingRequestMainModel: HearingRequestMainModel;
  @Output() public changeEditHearing = new EventEmitter<EditHearingChangeConfig>();

  public hearingStage: string;

  public ngOnInit(): void {
    const hearingType = this.hearingRequestMainModel.hearingDetails.hearingType;
    const hearingStageFromRefData = this.hearingStageOptionsRefData.find((stage) => stage.key === hearingType);
    this.hearingStage = hearingStageFromRefData
      ? hearingStageFromRefData.value_en
      : '';
  }

  public onChange(fragmentId: string): void {
    const changeLink = '/hearings/request/hearing-stage#initial';
    this.changeEditHearing.emit({ fragmentId, changeLink });
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HearingRequestMainModel } from '../../../models/hearingRequestMain.model';
import { LovRefDataModel } from '../../../models/lovRefData.model';
import { editHearingChangeConfig } from '../../../models/editHearingChangeConfig.model';

@Component({
  selector: 'exui-hearing-stage-section',
  templateUrl: './hearing-stage-section.component.html'
})
export class HearingStageSectionComponent implements OnInit {
  @Input() public hearingStageOptionsRefData: LovRefDataModel[];
  @Input() public hearingRequestMainModel: HearingRequestMainModel;
  @Output() public changeEditHearing = new EventEmitter<string>();

  public hearingStage: string;

  public ngOnInit(): void {
    const hearingType = this.hearingRequestMainModel.hearingDetails.hearingType;
    const hearingStageFromRefData = this.hearingStageOptionsRefData.find((stage) => stage.key === hearingType);
    this.hearingStage = hearingStageFromRefData
      ? hearingStageFromRefData.value_en
      : '';
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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';
import { AmendmentLabelStatus } from '../../../../../hearings/models/hearingsUpdateMode.enum';
import { EditHearingChangeConfig } from '../../../../models/editHearingChangeConfig.model';
import { HearingRequestMainModel } from '../../../../models/hearingRequestMain.model';
import { HearingsUtils } from '../../../../utils/hearings.utils';
import { HearingsService } from '../../../../services/hearings.service';

@Component({
  selector: 'exui-additional-instructions-section',
  templateUrl: './additional-instructions-section.component.html'
})
export class AdditionalInstructionsSectionComponent implements OnInit {
  @Input() public hearingRequestMainModel: HearingRequestMainModel;
  @Input() public hearingRequestToCompareMainModel: HearingRequestMainModel;
  @Output() public changeEditHearing = new EventEmitter<EditHearingChangeConfig>();

  public additionalInstructions: string;
  public showAmmended: boolean;
  public amendmentLabelEnum = AmendmentLabelStatus;
  public pageTitleDisplayLabel: AmendmentLabelStatus;
  constructor(private readonly hearingsService: HearingsService) {
  }

  public ngOnInit(): void {
    this.showAmmended = !_.isEqual(
      this.hearingRequestToCompareMainModel.hearingDetails.listingComments,
      this.hearingRequestMainModel.hearingDetails.listingComments
    );
    this.additionalInstructions = this.hearingRequestMainModel.hearingDetails.listingComments?.replace(/(?:\r\n|\r|\n)/g, '<br>') || '';

    this.setAmendmentLabels();
  }

  public onChange(fragmentId: string): void {
    const changeLink = '/hearings/request/hearing-additional-instructions#additionalInstructionsTextarea';
    this.changeEditHearing.emit({ fragmentId, changeLink });
  }

  private setAmendmentLabels() {
    const additionalInsrtuctionsChanged = !_.isEqual(
      this.hearingRequestToCompareMainModel.hearingDetails.listingComments,
      this.hearingRequestMainModel.hearingDetails.listingComments
    );

    if (this.hearingsService.propertiesUpdatedOnPageVisit?.afterPageVisit?.additionalInsructionsChangesRequired
      && !this.hearingsService.propertiesUpdatedOnPageVisit?.afterPageVisit?.additionalInsructionsChangesConfirmed){
      this.pageTitleDisplayLabel = AmendmentLabelStatus.ACTION_NEEDED;
    } else {
      if (additionalInsrtuctionsChanged) {
        this.pageTitleDisplayLabel = AmendmentLabelStatus.AMENDED;
      } else {
        this.pageTitleDisplayLabel = AmendmentLabelStatus.EMPTY;
      }
    }
  }
}

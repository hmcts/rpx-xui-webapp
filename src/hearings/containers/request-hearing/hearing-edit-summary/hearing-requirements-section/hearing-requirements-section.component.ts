import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AmendmentLabelStatus } from '../../../../../hearings/models/hearingsUpdateMode.enum';
import { CaseFlagReferenceModel } from '../../../../models/caseFlagReference.model';
import { EditHearingChangeConfig } from '../../../../models/editHearingChangeConfig.model';
import { HearingRequestMainModel } from '../../../../models/hearingRequestMain.model';
import { ServiceHearingValuesModel } from '../../../../models/serviceHearingValues.model';
import { HearingsService } from '../../../../services/hearings.service';
import { CaseFlagsUtils } from '../../../../utils/case-flags.utils';

@Component({
  selector: 'exui-hearing-requirements-section',
  templateUrl: './hearing-requirements-section.component.html'
})
export class HearingRequirementsSectionComponent implements OnInit {
  @Input() public caseFlagsRefData: CaseFlagReferenceModel[];
  @Input() public hearingRequestMainModel: HearingRequestMainModel;
  @Input() public serviceHearingValuesModel: ServiceHearingValuesModel;
  @Output() public changeEditHearing = new EventEmitter<EditHearingChangeConfig>();

  public reasonableAdjustmentChangesConfirmed: boolean;
  public amendmentLabelEnum = AmendmentLabelStatus;
  public partyWithFlags: Map<string, CaseFlagReferenceModel[]>;

  constructor(private readonly hearingsService: HearingsService) {}

  public ngOnInit(): void {
    this.reasonableAdjustmentChangesConfirmed = this.hearingsService.propertiesUpdatedOnPageVisit?.afterPageVisit?.nonReasonableAdjustmentChangesConfirmed;
    this.partyWithFlags = CaseFlagsUtils.convertPartiesToPartyWithFlags(this.caseFlagsRefData, this.hearingRequestMainModel.partyDetails, this.serviceHearingValuesModel.parties);
  }

  public onChange(fragmentId: string): void {
    const changeLink = '/hearings/request/hearing-requirements#linkAmendFlags';
    this.changeEditHearing.emit({ fragmentId, changeLink });
  }
}

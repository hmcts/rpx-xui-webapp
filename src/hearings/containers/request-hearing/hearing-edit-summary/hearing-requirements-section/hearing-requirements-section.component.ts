import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AmendmentLabelStatus } from '../../../../../hearings/models/hearingsUpdateMode.enum';
import { CaseFlagReferenceModel } from '../../../../models/caseFlagReference.model';
import { EditHearingChangeConfig } from '../../../../models/editHearingChangeConfig.model';
import { HearingRequestMainModel } from '../../../../models/hearingRequestMain.model';
import { ServiceHearingValuesModel } from '../../../../models/serviceHearingValues.model';
import { CaseFlagsUtils } from '../../../../utils/case-flags.utils';

@Component({
  selector: 'exui-hearing-requirements-section',
  templateUrl: './hearing-requirements-section.component.html'
})
export class HearingRequirementsSectionComponent implements OnInit {
  @Input() public caseFlagsRefData: CaseFlagReferenceModel[];
  @Input() public hearingRequestMainModel: HearingRequestMainModel;
  @Input() public serviceHearingValuesModel: ServiceHearingValuesModel;
  @Input() public reasonableAdjustmentChangesConfirmed: boolean;
  @Output() public changeEditHearing = new EventEmitter<EditHearingChangeConfig>();
  public amendmentLabelEnum = AmendmentLabelStatus;

  public partyWithFlags: Map<string, CaseFlagReferenceModel[]>;

  public ngOnInit(): void {
    this.partyWithFlags = CaseFlagsUtils.convertPartiesToPartyWithFlags(this.caseFlagsRefData, this.hearingRequestMainModel.partyDetails, this.serviceHearingValuesModel.parties);
  }

  public onChange(fragmentId: string): void {
    const changeLink = '/hearings/request/hearing-requirements#linkAmendFlags';
    this.changeEditHearing.emit({ fragmentId, changeLink });
  }
}

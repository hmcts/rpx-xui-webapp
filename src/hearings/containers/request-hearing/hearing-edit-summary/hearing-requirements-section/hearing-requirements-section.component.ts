import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CaseFlagReferenceModel } from '../../../../models/caseFlagReference.model';
import { EditHearingChangeConfig } from '../../../../models/editHearingChangeConfig.model';
import { HearingRequestMainModel } from '../../../../models/hearingRequestMain.model';
import { ServiceHearingValuesModel } from '../../../../models/serviceHearingValues.model';
import { CaseFlagsUtils } from '../../../../utils/case-flags.utils';
import { PartyType } from 'src/hearings/models/hearings.enum';

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

  public partyWithFlags: Map<string, CaseFlagReferenceModel[]>;

  public ngOnInit(): void {
    this.partyWithFlags = CaseFlagsUtils.convertPartiesToPartyWithFlags(this.caseFlagsRefData, this.hearingRequestMainModel.partyDetails, this.serviceHearingValuesModel.parties);

    console.log('CASE FLAGS REF DATA', this.caseFlagsRefData);
    console.log('SHV REF DATA', this.serviceHearingValuesModel.caseFlags.flags);
    console.log('PARTIES', this.hearingRequestMainModel.partyDetails.filter((party) => party.partyType === PartyType.IND)?.map((detail) => detail.individualDetails));
    console.log('PARTY WITH FLAGS', this.partyWithFlags);
  }

  public onChange(fragmentId: string): void {
    const changeLink = '/hearings/request/hearing-requirements#linkAmendFlags';
    this.changeEditHearing.emit({ fragmentId, changeLink });
  }
}

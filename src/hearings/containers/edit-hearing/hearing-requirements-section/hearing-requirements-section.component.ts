import { Component, Input, OnInit } from '@angular/core';
import { CaseFlagReferenceModel } from '../../../models/caseFlagReference.model';
import { HearingRequestMainModel } from '../../../models/hearingRequestMain.model';
import { ServiceHearingValuesModel } from '../../../models/serviceHearingValues.model';
import { CaseFlagsUtils } from '../../../utils/case-flags.utils';

@Component({
  selector: 'exui-hearing-requirements-section',
  templateUrl: './hearing-requirements-section.component.html'
})
export class HearingRequirementsSectionComponent implements OnInit {
  @Input() public caseFlagsRefData: CaseFlagReferenceModel[];
  @Input() public hearingRequestMainModel: HearingRequestMainModel;
  @Input() public serviceHearingValuesModel: ServiceHearingValuesModel;

  public partyWithFlags: Map<string, CaseFlagReferenceModel[]>;

  public ngOnInit(): void {
    this.partyWithFlags = CaseFlagsUtils.convertPartiesToPartyWithFlags(this.caseFlagsRefData, this.hearingRequestMainModel.partyDetails, this.serviceHearingValuesModel.parties);
  }
}

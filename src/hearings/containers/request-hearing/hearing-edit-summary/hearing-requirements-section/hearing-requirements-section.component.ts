import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PartyType } from '../../../../../hearings/models/hearings.enum';
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
  public partyIdsInHMC: string[];
  public partyNamesInHMC: string[];
  public partiesWithFlags: Map<string, CaseFlagReferenceModel[]>;

  constructor(private readonly hearingsService: HearingsService) {}

  public ngOnInit(): void {
    this.reasonableAdjustmentChangesConfirmed = this.hearingsService.propertiesUpdatedOnPageVisit?.afterPageVisit?.reasonableAdjustmentChangesConfirmed;
    this.partyIdsInHMC = this.hearingRequestMainModel.partyDetails.map(((party) => party.partyID));
    this.partyNamesInHMC = this.hearingRequestMainModel.partyDetails.map(((party) => party.partyName));
    this.partiesWithFlags = this.getPartiesWithFlagData();
  }

  private getPartiesWithFlagData(): Map<string, CaseFlagReferenceModel[]> {
    const partiesWithFlags: Map<string, CaseFlagReferenceModel[]> = new Map();
    const individualParties = this.serviceHearingValuesModel.parties.filter((party) => party.partyType === PartyType.IND);
    individualParties.forEach((party) => {
      if (this.partyIdsInHMC.includes(party.partyID)) {
        const flagIds = party.individualDetails?.reasonableAdjustments;
        if (party.individualDetails?.interpreterLanguage) {
          flagIds.push(party.individualDetails.interpreterLanguage);
        }
        const flags = flagIds?.map((flagId) => CaseFlagsUtils.findFlagByFlagId(this.caseFlagsRefData, flagId));
        if (party.partyName && flags?.length > 0) {
          partiesWithFlags.set(party.partyName, flags);
        }
      }
    });
    return partiesWithFlags;
  }

  public onChange(fragmentId: string): void {
    const changeLink = '/hearings/request/hearing-requirements#linkAmendFlags';
    this.changeEditHearing.emit({ fragmentId, changeLink });
  }
}
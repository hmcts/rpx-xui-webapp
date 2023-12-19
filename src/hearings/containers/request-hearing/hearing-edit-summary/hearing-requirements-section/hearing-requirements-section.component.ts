import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AmendmentLabelStatus } from '../../../../../hearings/models/hearingsUpdateMode.enum';
import { CaseFlagReferenceModel } from '../../../../models/caseFlagReference.model';
import { EditHearingChangeConfig } from '../../../../models/editHearingChangeConfig.model';
import { HearingRequestMainModel } from '../../../../models/hearingRequestMain.model';
import { ServiceHearingValuesModel } from '../../../../models/serviceHearingValues.model';
import { HearingsService } from '../../../../services/hearings.service';
import { CaseFlagsUtils } from '../../../../utils/case-flags.utils';
import { PartyDetailsModel } from 'src/hearings/models/partyDetails.model';
import { PartyType } from 'src/hearings/models/hearings.enum';

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
    this.reasonableAdjustmentChangesConfirmed = this.hearingsService.propertiesUpdatedOnPageVisit?.afterPageVisit?.reasonableAdjustmentChangesConfirmed;

    // this.partyWithFlags = CaseFlagsUtils.convertPartiesToPartyWithFlags(this.caseFlagsRefData, this.hearingRequestMainModel.partyDetails, parties);
    this.partyWithFlags = this.getPartiesWithFlagData();
  }

  private getPartiesWithFlagData(): Map<string, CaseFlagReferenceModel[]> {
    const partyWithFlags: Map<string, CaseFlagReferenceModel[]> = new Map();

    const anotherParty: PartyDetailsModel = {
      partyID: '123456-123456-0987-0987',
      partyType: PartyType.IND,
      partyName: 'New Party',
      partyRole: 'APPL',
      individualDetails: {
        firstName: 'New',
        lastName: 'Party',
        interpreterLanguage: '',
        reasonableAdjustments: [
          'RA0042'
        ],
        vulnerableFlag: false,
        vulnerabilityDetails: '',
        hearingChannelEmail: [
          'newparty@gmail.com'
        ],
        hearingChannelPhone: [
          '44856895462'
        ],
        relatedParties: []
      }
    };

    const parties = [...this.serviceHearingValuesModel.parties, anotherParty];

    const individualParties = parties.filter((party) => party.partyType === PartyType.IND);

    individualParties.forEach((party) => {
      const flagIds = party.individualDetails?.reasonableAdjustments;
      if (party.individualDetails?.interpreterLanguage) {
        flagIds.push(party.individualDetails.interpreterLanguage);
      }
      const flags = flagIds?.map((flagId) => CaseFlagsUtils.findFlagByFlagId(this.caseFlagsRefData, flagId));
      partyWithFlags.set(party.partyName || '', flags);
    });
    return partyWithFlags;
    // partyDetails.forEach((party) => {
    //   const foundPartyFromService = partiesFromServiceValue.find((pt) => pt.partyID === party.partyID);
    //   const partyName = party.partyName ? party.partyName : (foundPartyFromService ? foundPartyFromService.partyName : '');
    //   const reasonableAdjustments: string[] = party.individualDetails?.reasonableAdjustments ? party.individualDetails.reasonableAdjustments : [];
    //   const allFlagsId: string[] = reasonableAdjustments.slice();
    //   if (party.individualDetails?.interpreterLanguage) {
    //     allFlagsId.push(party.individualDetails.interpreterLanguage);
    //   }
    //   const allFlags: CaseFlagReferenceModel[] = allFlagsId.map((flagId) => CaseFlagsUtils.findFlagByFlagId(caseFlagReferenceModels, flagId));
    //   if (partyName) {
    //     partyWithFlags.set(partyName, allFlags);
    //   }
    // });
    // return partyWithFlags;
  }

  public onChange(fragmentId: string): void {
    const changeLink = '/hearings/request/hearing-requirements#linkAmendFlags';
    this.changeEditHearing.emit({ fragmentId, changeLink });
  }
}

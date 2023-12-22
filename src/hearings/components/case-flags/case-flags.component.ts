import { Component, Input, OnInit } from '@angular/core';
import { CaseFlagGroup } from '../../models/caseFlagGroup.model';
import { HearingConditions } from '../../models/hearingConditions';
import { HearingRequestMainModel } from '../../models/hearingRequestMain.model';
import { Mode, PartyType } from '../../models/hearings.enum';
import { AmendmentLabelStatus } from '../../models/hearingsUpdateMode.enum';
import { ServiceHearingValuesModel } from '../../models/serviceHearingValues.model';
import { HearingsService } from '../../services/hearings.service';

@Component({
  selector: 'exui-case-flags',
  templateUrl: './case-flags.component.html',
  styleUrls: ['./case-flags.component.scss']
})
export class CaseFlagsComponent implements OnInit {
  @Input() public caseFlagsGroup: CaseFlagGroup[];
  @Input() public info: string;
  @Input() public hearingCondition: HearingConditions;
  @Input() public hearingRequestMainModel: HearingRequestMainModel;
  @Input() public serviceHearingValuesModel: ServiceHearingValuesModel;

  public reasonableAdjustmentChangesConfirmed: boolean;
  public amendmentLabelEnum = AmendmentLabelStatus;

  constructor(private readonly hearingsService: HearingsService) {}

  public ngOnInit(): void {
    console.log('CASE FLAGS GROUP', this.caseFlagsGroup);
    console.log('PropertiesUpdatedOnPageVisit', this.hearingsService.propertiesUpdatedOnPageVisit);
    this.reasonableAdjustmentChangesConfirmed = this.hearingsService.propertiesUpdatedOnPageVisit?.afterPageVisit?.reasonableAdjustmentChangesConfirmed;

    if (this.hearingCondition.mode === Mode.VIEW_EDIT && this.hearingsService.propertiesUpdatedOnPageVisit?.hasOwnProperty('caseFlags')) {
      
    }
  }

  private pageVisitCaseFlagsChangeExists(): boolean {
    const caseFlagsSHV = this.serviceHearingValuesModel.caseFlags.flags;
    const individualParties = this.hearingRequestMainModel.partyDetails.filter((party) => party.partyType === PartyType.IND);
    // HMC stores only reasonable adjustment flag ids and language interpreter flag ids under parties
    // Get only the reasonable adjustment and language interpreter flag ids from SHV and sort them for easy comparison
    const flagIdsSHV = caseFlagsSHV.map((flag) => flag.flagId)?.filter((flagId) => flagId.startsWith('RA') || flagId === this.LANGUAGE_INTERPRETER_FLAG_ID)?.sort();
    // Get individual parties reasonable adjustment flags and sort the result
    const partyFlagIds = individualParties.map((party) => party.individualDetails?.reasonableAdjustments)?.join(',').split(',').sort();
    // Convert to string for easy comparison as the partyFlagIds can be an array of empty strings;
    const partyFlagIdsString = partyFlagIds?.length > 0
      ? partyFlagIds?.filter((flagId) => flagId !== '').join()
      : '';

    // Return true if there are changes in reasonable adjustments and/or language interpreter flags
    if (flagIdsSHV.join() !== partyFlagIdsString) {
      return true;
    }
    // There are no changes for reasonable adjustments and language interpreter flags when compared SHV with HMC
    return false;
  }
}

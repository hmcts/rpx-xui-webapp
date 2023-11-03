import { PartyDetailsModel } from './partyDetails.model';
import { PartyFlagsModel } from './partyFlags.model';

export enum HearingUpdateMode {
  UPDATED_AUTOMATICALLY,
  UPDATED_ON_PAGE_VISIT
}

export enum PropertiesUpdatedAutomatically {
  // TO BE UPDATED
}

export interface PropertiesUpdatedOnPageVisit {
  caseFlags: {
    flags: PartyFlagsModel[],
    flagAmendURL: string,
  };
  facilitiesRequired: string[],
  parties: PartyDetailsModel[]
}

import { HearingListModel } from './hearingList.model';

// Populated via getHearings call with caseId
// via HMC API
export interface HearingListMainModel {
  hmctsServiceID: string;
  caseRef: string;
  caseHearings: HearingListModel[];
  jurisdictionId?: string;
}

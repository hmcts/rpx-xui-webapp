import { HearingListModel } from './hearingList.model';

export interface HearingListMainModel {
  hmctsServiceID: string;
  caseRef: string;
  caseHearings: HearingListModel[];
  jurisdictionId?: string;
}

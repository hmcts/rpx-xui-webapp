import { HearingListModel } from './hearingList.model';
import { GroupLinkType } from './hearings.enum';

export interface ServiceLinkedCasesModel {
  caseReference: string;
  caseName: string;
  reasonsForLink: string[];
}

export interface ServiceLinkedCasesWithHearingsModel {
  caseRef: string;
  caseName: string;
  reasonsForLink: string[];
  caseHearings?: HearingDetailModel[];
}

export interface HearingDetailModel extends HearingListModel {
  isSelected: boolean;
}

export interface GroupDetailsModel {
  groupName: string;
  groupReason: string;
  groupLinkType: GroupLinkType;
  groupComments: string;
}

export interface LinkedHearingsDetailModel {
  hearingId: string;
  hearingOrder: number;
  caseRef?: string;
}

export interface LinkedHearingGroupResponseModel {
  hearingGroupRequestId: string;
}

export interface LinkedHearingGroupMainModel {
  groupDetails: GroupDetailsModel;
  hearingsInGroup: LinkedHearingsDetailModel[];
}

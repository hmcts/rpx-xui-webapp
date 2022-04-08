import { GroupLinkType } from './hearings.enum';

export interface ServiceLinkedCasesModel {
  caseReference: string;
  caseName: string;
  reasonsForLink: string[];
  hearings?: LinkedHearingsDetailModel[];
}

export interface LinkedHearingGroupMainModel {
  groupDetails: GroupDetailsModel;
  hearingsInGroup: LinkedHearingsDetailModel[];
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
  hearingStage: string;
  isSelected?: boolean;
  hearingStatus?: string;
  hearingIsLinkedFlag?: boolean;
}

export interface LinkedHearingGroupResponseModel {
  hearingGroupRequestId: string;
}

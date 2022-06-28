import { GroupLinkType } from './hearings.enum';

export interface ServiceLinkedCasesModel {
  caseReference: string;
  caseName: string;
  reasonsForLink: string[];
  hearings?: HearingDetailModel[];
}

export interface HearingDetailModel {
  hearingId: string;
  hearingStage: string;
  isSelected: boolean;
  hearingStatus: string;
  hearingIsInLinkedGroup: boolean;
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
  caseRef?: string;
}

export interface LinkedHearingGroupResponseModel {
  hearingGroupRequestId: string;
}

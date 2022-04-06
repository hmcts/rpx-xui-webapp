import {GroupLinkType, HearingStageEnum} from './hearings.enum';

export interface ServiceLinkedCasesModel {
  caseReference: string;
  caseName: string;
  reasonsForLink: string[];
  hearingStage?: string;
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
  hearingStage?: string;
}

export interface LinkedHearingGroupResponseModel {
  hearingGroupRequestId: string;
}

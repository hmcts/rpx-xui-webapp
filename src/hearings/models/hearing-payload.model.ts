import { CaseCategoryModel } from './caseCategory.model';
import { HearingDayScheduleModel } from './hearingDaySchedule.model';
import { PartyDetailsModel } from './partyDetails.model';
import { PartyFlagsModel } from './partyFlags.model';
import {
  HearingLocationModel,
  HearingWindowModel,
  JudiciaryModel,
  PanelRequirementsModel,
  ScreenNavigationModel,
  VocabularyModel,
} from './hearing-payload-support.model';
import { HearingListingStatusEnum, LaCaseStatus } from './hearings.enum';

export interface HearingRequestMainModel {
  requestDetails?: RequestDetailsModel;
  hearingDetails: HearingDetailsModel;
  caseDetails?: CaseDetailsModel;
  partyDetails: PartyDetailsModel[];
  hearingResponse?: HearingResponseModel;
}

export interface CaseDetailsModel {
  hmctsServiceCode: string;
  caseRef: string;
  requestTimeStamp: string;
  hearingID?: string;
  externalCaseReference?: string;
  caseDeepLink: string;
  hmctsInternalCaseName: string;
  publicCaseName: string;
  caseAdditionalSecurityFlag?: boolean;
  caseInterpreterRequiredFlag: boolean;
  caseCategories: CaseCategoryModel[];
  caseManagementLocationCode: string;
  caserestrictedFlag: boolean;
  caseSLAStartDate: string;
}

export interface HearingDetailsModel {
  duration: number;
  hearingType: string;
  hearingLocations: HearingLocationModel[];
  hearingIsLinkedFlag?: boolean;
  hearingWindow: HearingWindowModel;
  privateHearingRequiredFlag?: boolean;
  panelRequirements: PanelRequirementsModel;
  autolistFlag: boolean;
  nonStandardHearingDurationReasons?: string[];
  hearingPriorityType: string;
  numberOfPhysicalAttendees?: number;
  hearingInWelshFlag?: boolean;
  facilitiesRequired?: string[];
  listingComments?: string;
  hearingRequester?: string;
  leadJudgeContractType?: string;
  amendReasonCodes: string[];
  hearingChannels: string[];
  listingAutoChangeReasonCode: string;
  isPaperHearing?: boolean;
}

export interface ResponseDetailsModel {
  hearingRequestID?: string;
  status?: string;
  timestamp: string;
  versionNumber: number;
}

export interface RequestDetailsModel extends ResponseDetailsModel {
  hearingGroupRequestId?: string;
  partiesNotified?: string;
  cancellationReasonCodes?: string[];
}

export interface HearingResponseModel {
  listAssistTransactionID: string;
  receivedDateTime: string;
  responseVersion: number;
  laCaseStatus: LaCaseStatus;
  listingStatus: HearingListingStatusEnum;
  hearingCancellationReason: string;
  hearingDaySchedule: HearingDayScheduleModel[];
  errorTimestamp?: string;
}

export interface ServiceHearingValuesModel {
  caseId: string;
  hmctsServiceID: string;
  hmctsInternalCaseName: string;
  publicCaseName: string;
  caseAdditionalSecurityFlag: boolean;
  caseCategories: CaseCategoryModel[];
  caseDeepLink: string;
  caserestrictedFlag: boolean;
  externalCaseReference: string;
  caseManagementLocationCode: string;
  caseSLAStartDate: string;
  autoListFlag: boolean;
  hearingType: string;
  hearingWindow: HearingWindowModel;
  duration: number;
  hearingPriorityType: string;
  numberOfPhysicalAttendees: number;
  hearingInWelshFlag: boolean;
  hearingLocations: HearingLocationModel[];
  facilitiesRequired: string[];
  listingComments: string;
  hearingRequester: string;
  privateHearingRequiredFlag: boolean;
  caseInterpreterRequiredFlag: boolean;
  panelRequirements: PanelRequirementsModel;
  leadJudgeContractType: string;
  judiciary: JudiciaryModel;
  hearingIsLinkedFlag: boolean;
  parties: PartyDetailsModel[];
  caseFlags: {
    flags: PartyFlagsModel[];
    flagAmendURL: string;
  };
  screenFlow: ScreenNavigationModel[];
  vocabulary: VocabularyModel[];
  hearingChannels: string[];
}

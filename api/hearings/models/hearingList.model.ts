import { HearingDayScheduleModel } from './hearingDaySchedule.model';
import { EXUIDisplayStatusEnum, EXUISectionStatusEnum } from './hearings.enum';

export interface HearingListModel {
  hearingID: string;
  hearingRequestDateTime: string;
  hearingType: string;
  hmcStatus: string;
  lastResponseReceivedDateTime: string;
  responseVersion: string;
  hearingListingStatus: string;
  listAssistCaseStatus: string;
  hearingIsLinkedFlag: boolean;
  hearingGroupRequestId: string;
  hearingDaySchedule: HearingDayScheduleModel[];
  exuiSectionStatus?: EXUISectionStatusEnum;
  exuiDisplayStatus?: EXUIDisplayStatusEnum;
}

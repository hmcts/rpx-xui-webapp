import { HearingDayScheduleModel } from './hearingDaySchedule.model';
import { EXUIDisplayStatusEnum, EXUISectionStatusEnum, HearingListingStatusEnum } from './hearings.enum';
export interface CaseHearingModel {
  hearingID: string;
  hearingType: string;
  hmcStatus: string;
  lastResponseReceivedDateTime: string;
  responseVersion: string;
  hearingListingStatus: string;
  listAssistCaseStatus: string;
  hearingDaySchedule: HearingDayScheduleModel[];
  exuiSectionStatus?: EXUISectionStatusEnum;
  exuiDisplayStatus?: EXUIDisplayStatusEnum;
}
export interface CaseHearingViewModel extends CaseHearingModel {
  creationDateTime: string;
}

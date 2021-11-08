import { HearingDayScheduleModel } from './hearingDaySchedule.model';
import { EXUIDisplayStatusEnum, EXUISectionStatusEnum } from './hearings.enum';

export interface CaseHearingModel {
  hearingID: string;
  hearingType: string;
  hearingRequestDateTime: string,
  hmcStatus: string;
  lastResponseReceivedDateTime: string;
  responseVersion: string;
  hearingListingStatus: string;
  listAssistCaseStatus: string;
  hearingDaySchedule: HearingDayScheduleModel[];
  exuiSectionStatus?: EXUISectionStatusEnum;
  exuiDisplayStatus?: EXUIDisplayStatusEnum;
}

import { HearingDayScheduleModel } from './hearingDaySchedule.model';
import { EXUIDisplayStatusEnum, EXUISectionStatusEnum } from './hearings.enum';

export interface CaseHearingModel {
  hearingID: string;
  hearingType: string;
  hmcStatus: string;
  lastResponseReceivedDateTime: string;
  creationDateTime: string;
  responseVersion: string;
  hearingListingStatus: string;
  listAssistCaseStatus: string;
  hearingDaySchedule: HearingDayScheduleModel[];
  exuiSectionStatus?: EXUISectionStatusEnum;
  exuiDisplayStatus?: EXUIDisplayStatusEnum;
}

import { HearingDayScheduleModel } from './hearingDaySchedule.model';

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
}

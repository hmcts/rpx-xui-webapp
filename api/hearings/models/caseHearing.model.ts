import { HearingDayScheduleModel } from './hearingDaySchedule.model';

export interface CaseHearingModel {
  hearingID: string;
  hearingType: string;
  hmcStatus: string;
  lastResponseReceivedDateTime: string;
  responseVersion: string;
  hearingListingStatus: string;
  hearingsSectionStatus: string;
  hearingDaySchedule: HearingDayScheduleModel[];
}

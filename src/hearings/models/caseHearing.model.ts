import { HearingDayScheduleModel } from './hearingDaySchedule.model';
import { HearingListingStatusEnum } from './hearings.enum';

export interface CaseHearingModel {
  creationDateTime: string;
  hearingDaySchedule: HearingDayScheduleModel[];
  hearingID: string;
  hearingListingStatus: HearingListingStatusEnum;
  hearingType: string;
  hmcStatus: string;
  lastResponseReceivedDateTime: string;
  listAssistCaseStatus: string;
  responseVersion: string;
}

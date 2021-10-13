import { HearingDayScheduleModel } from './hearingDaySchedule.model';
import { HearingListingStatusEnum } from './hearings.enum';

export interface CaseHearingModel {
  hearingID: string;
  hearingType: string;
  hmcStatus: string;
  lastResponseReceivedDateTime: string;
  responseVersion: string;
  hearingListingStatus: HearingListingStatusEnum;
  listAssistCaseStatus: string;
  hearingDaySchedule: HearingDayScheduleModel[];
}

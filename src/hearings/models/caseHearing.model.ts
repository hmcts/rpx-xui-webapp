import { HearingDayScheduleModel } from './hearingDaySchedule.model';
import { HearingListingStatusEnum } from './hearings.enum';

export interface CaseHearingModel {
  hearingID: string;
  hearingType: string;
  lastResponseReceivedDateTime: string;
  hmcStatus: string;
  hearingListingStatus: HearingListingStatusEnum;
  responseVersion: string;
  hearingsSectionStatus: string;
  hearingDaySchedule: HearingDayScheduleModel[];
}

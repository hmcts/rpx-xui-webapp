import { HearingDayScheduleModel } from './hearingDaySchedule.model';

export interface HearingResponseModel {
  listAssistTransactionID: string;
  receivedDateTime: string;
  responseVersion: number;
  laCaseStatus: string;
  listingStatus: string;
  hearingCancellationReason: string;
  hearingDaySchedule: HearingDayScheduleModel;
}

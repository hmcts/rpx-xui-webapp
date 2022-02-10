import { HearingDayScheduleModel } from './hearingDaySchedule.model';

export interface HearingResponseModel {
  listAssistTransactionID: string;
  receivedDateTime: string;
  responseVersion: number;
  laCaseStatus: string;
  hearingCancellationReason: string;
  hearingDaySchedule: HearingDayScheduleModel;
}

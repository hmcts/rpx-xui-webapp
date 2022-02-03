import { HearingDayScheduleModel } from './hearingDaySchedule.model';

export interface HearingResponseModel {
  listAssistTransacrtionID: string;
  receivedDateTime: string;
  responseVersion: number;
  laCaseStatus: string;
  hearingCancellationReason: string;
  hearingDaySchedule: HearingDayScheduleModel
}

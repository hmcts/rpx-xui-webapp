import { HearingDayScheduleModel } from './hearingDaySchedule.model';
import { LaCaseStatus, ListingStatus } from './hearings.enum';

export interface HearingResponseModel {
  listAssistTransactionID: string;
  receivedDateTime: string;
  responseVersion: number;
  laCaseStatus: LaCaseStatus;
  listingStatus: ListingStatus;
  hearingCancellationReason: string;
  hearingDaySchedule: HearingDayScheduleModel[];
  errorTimestamp?: string;
}

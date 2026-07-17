import { HearingDayScheduleModel } from './hearingDaySchedule.model';
import { HearingListingStatusEnum, LaCaseStatus } from './hearings.enum';

export interface HearingResponseModel {
  listAssistTransactionID: string;
  receivedDateTime: string;
  responseVersion: number;
  laCaseStatus: LaCaseStatus;
  listingStatus: HearingListingStatusEnum;
  hearingCancellationReason: string;
  hearingDaySchedule: HearingDayScheduleModel[];
  errorTimestamp?: string;
}

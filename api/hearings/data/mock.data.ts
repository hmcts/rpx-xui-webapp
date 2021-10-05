/* tslint:disable:object-literal-sort-keys */
import { CaseHearingModel } from '../models/caseHearing.model';
import { CaseHearingsMainModel } from '../models/caseHearingsMain.model';
import { HearingDayScheduleModel } from '../models/hearingDaySchedule.model';

const HEARING_DAY_SCHEDULE_1: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-05-01T16:00:00.000+0000',
  hearingEndDateTime: '2021-05-04T16:00:00.000+0000',
  ListAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7ba5',
  hearingVenueId: 'venue 1',
  hearingRoomId: 'room 1',
  hearingPanel: ['child'],
};

const CASE_HEARING_1: CaseHearingModel = {
  hearingID: 'h111111',
  hearingType: 'hearing type 1',
  hmcStatus: 'pending',
  lastResponseReceivedDateTime: '2021-05-05T16:00:00.000+0000',
  responseVersion: 'rv1',
  hearingListingStatus: 'pending',
  listAssistCaseStatus: 'checking',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_1],
};

export const HEARINGS_LIST: CaseHearingsMainModel = {
  hmctsServiceID: 'SSCS',
  caseRef: '1568642646198441',
  caseHearings: [CASE_HEARING_1],
};

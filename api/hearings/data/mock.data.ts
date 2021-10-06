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

const HEARING_DAY_SCHEDULE_2: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-06-01T16:00:00.000+0000',
  hearingEndDateTime: '2021-06-04T16:00:00.000+0000',
  ListAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7ba4',
  hearingVenueId: 'venue 2',
  hearingRoomId: 'room 2',
  hearingPanel: ['child'],
};

const HEARING_DAY_SCHEDULE_3: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-07-01T16:00:00.000+0000',
  hearingEndDateTime: '2021-07-04T16:00:00.000+0000',
  ListAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7bc4',
  hearingVenueId: 'venue 3',
  hearingRoomId: 'room 3',
  hearingPanel: ['child'],
};

const HEARING_DAY_SCHEDULE_4: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-08-01T16:00:00.000+0000',
  hearingEndDateTime: '2021-08-04T16:00:00.000+0000',
  ListAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7bc5',
  hearingVenueId: 'venue 4',
  hearingRoomId: 'room 4',
  hearingPanel: ['child'],
};

const CASE_HEARING_1: CaseHearingModel = {
  hearingID: 'h111111',
  hearingType: 'hearing type 1',
  hmcStatus: 'pending',
  lastResponseReceivedDateTime: '2021-05-05T16:00:00.000+0000',
  responseVersion: 'rv1',
  hearingListingStatus: 'pending',
  listAssistCaseStatus: 'pending',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_1],
};

const CASE_HEARING_2: CaseHearingModel = {
  hearingID: 'h222222',
  hearingType: 'hearing type 2',
  hmcStatus: 'upcoming',
  lastResponseReceivedDateTime: '2021-06-05T16:00:00.000+0000',
  responseVersion: 'rv2',
  hearingListingStatus: 'upcoming',
  listAssistCaseStatus: 'upcoming',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_2],
};

const CASE_HEARING_3: CaseHearingModel = {
  hearingID: 'h333333',
  hearingType: 'hearing type 3',
  hmcStatus: 'past',
  lastResponseReceivedDateTime: '2021-07-05T16:00:00.000+0000',
  responseVersion: 'rv3',
  hearingListingStatus: 'past',
  listAssistCaseStatus: 'past',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_3],
};

const CASE_HEARING_4: CaseHearingModel = {
  hearingID: 'h444444',
  hearingType: 'hearing type 4',
  hmcStatus: 'past',
  lastResponseReceivedDateTime: '2021-08-05T16:00:00.000+0000',
  responseVersion: 'rv4',
  hearingListingStatus: 'cancelled',
  listAssistCaseStatus: 'past',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_4],
};

export const HEARINGS_LIST: CaseHearingsMainModel = {
  hmctsServiceID: 'SSCS',
  caseRef: '1568642646198441',
  caseHearings: [CASE_HEARING_1, CASE_HEARING_2, CASE_HEARING_3, CASE_HEARING_4],
};

/* tslint:disable:object-literal-sort-keys */
import { CaseHearingModel } from '../models/caseHearing.model';
import { CaseHearingsMainModel } from '../models/caseHearingsMain.model';
import { HearingDayScheduleModel } from '../models/hearingDaySchedule.model';

const HEARING_DAY_SCHEDULE_1: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-05-01T16:00:00.000+0000',
  hearingEndDateTime: '2021-05-04T16:00:00.000+0000',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7ba5',
  hearingVenueId: 'venue 1',
  hearingRoomId: 'room 1',
  hearingPanel: ['child'],
};

const HEARING_DAY_SCHEDULE_2: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-06-01T16:00:00.000+0000',
  hearingEndDateTime: '2021-06-04T16:00:00.000+0000',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7ba4',
  hearingVenueId: 'venue 2',
  hearingRoomId: 'room 2',
  hearingPanel: ['child'],
};

const HEARING_DAY_SCHEDULE_3: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-07-01T16:00:00.000+0000',
  hearingEndDateTime: '2021-07-04T16:00:00.000+0000',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7bc4',
  hearingVenueId: 'venue 3',
  hearingRoomId: 'room 3',
  hearingPanel: ['child'],
};

const HEARING_DAY_SCHEDULE_4: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-08-01T16:00:00.000+0000',
  hearingEndDateTime: '2021-08-04T16:00:00.000+0000',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7bc5',
  hearingVenueId: 'venue 4',
  hearingRoomId: 'room 4',
  hearingPanel: ['child'],
};

const HEARING_DAY_SCHEDULE_5: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-09-01T16:00:00.000+0000',
  hearingEndDateTime: '2021-09-04T16:00:00.000+0000',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7bc6',
  hearingVenueId: 'venue 5',
  hearingRoomId: 'room 5',
  hearingPanel: ['child'],
};

const CASE_HEARING_1: CaseHearingModel = {
  hearingID: 'h111111',
  hearingType: 'Case management hearing',
  hmcStatus: 'Upcoming',
  creationDateTime: '2021-01-12T16:00:00.000+0000',
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv1',
  hearingListingStatus: 'WAITING TO BE LISTED',
  listAssistCaseStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_1],
};

const CASE_HEARING_2: CaseHearingModel = {
  hearingID: 'h222222',
  hearingType: 'Final hearing',
  hmcStatus: 'Upcoming',
  creationDateTime: '2021-02-12T16:00:00.000+0000',
  lastResponseReceivedDateTime: '2021-10-12T16:00:00.000+0000',
  responseVersion: 'rv2',
  hearingListingStatus: 'LISTED',
  listAssistCaseStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_2],
};

const CASE_HEARING_3: CaseHearingModel = {
  hearingID: 'h333333',
  hearingType: 'Initial hearing',
  hmcStatus: 'Past and cancelled',
  creationDateTime: '2021-03-12T16:00:00.000+0000',
  lastResponseReceivedDateTime: '2021-09-05T16:00:00.000+0000',
  responseVersion: 'rv3',
  hearingListingStatus: 'COMPLETED',
  listAssistCaseStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_3],
};

const CASE_HEARING_4: CaseHearingModel = {
  hearingID: 'h444444',
  hearingType: 'Case management hearing',
  hmcStatus: 'Past and cancelled',
  creationDateTime: '2021-10-12T16:00:00.000+0000',
  lastResponseReceivedDateTime: '2021-10-22T16:00:00.000+0000',
  responseVersion: 'rv4',
  hearingListingStatus: 'CANCELLED',
  listAssistCaseStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_4],
};

const CASE_HEARING_5: CaseHearingModel = {
  hearingID: 'h555555',
  hearingType: 'Directions hearing',
  hmcStatus: 'Past and cancelled',
  creationDateTime: '2021-04-12T16:00:00.000+0000',
  lastResponseReceivedDateTime: '2021-09-14T16:00:00.000+0000',
  responseVersion: 'rv5',
  hearingListingStatus: 'CANCELLED',
  listAssistCaseStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_5],
};

const CASE_HEARING_6: CaseHearingModel = {
  hearingID: 'h222222',
  hearingType: 'Next hearing',
  hmcStatus: 'Upcoming',
  creationDateTime: '2021-052T16:00:00.000+0000',
  lastResponseReceivedDateTime: '2021-11-12T16:00:00.000+0000',
  responseVersion: 'rv2',
  hearingListingStatus: 'LISTED',
  listAssistCaseStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_2],
};

const CASE_HEARING_7: CaseHearingModel = {
  hearingID: 'h222222',
  hearingType: 'Next hearing',
  hmcStatus: 'Upcoming',
  creationDateTime: '2021-06-12T16:00:00.000+0000',
  lastResponseReceivedDateTime: '2021-03-12T16:00:00.000+0000',
  responseVersion: 'rv2',
  hearingListingStatus: 'LISTED',
  listAssistCaseStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_2],
};

const CASE_HEARING_8: CaseHearingModel = {
  hearingID: 'h111111',
  hearingType: 'Case management hearing 2',
  hmcStatus: 'Upcoming',
  creationDateTime: '2021-02-13T16:00:00.000+0000',
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv1',
  hearingListingStatus: 'WAITING TO BE LISTED',
  listAssistCaseStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_1],
};

const CASE_HEARING_9: CaseHearingModel = {
  hearingID: 'h555555',
  hearingType: 'Directions hearing',
  hmcStatus: 'Past and cancelled',
  creationDateTime: '2021-03-12T16:00:00.000+0000',
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv5',
  hearingListingStatus: 'CANCELLED',
  listAssistCaseStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_5],
};

const CASE_HEARING_10: CaseHearingModel = {
  hearingID: 'h555555',
  hearingType: 'Directions hearing',
  hmcStatus: 'Past and cancelled',
  creationDateTime: '2021-04-12T16:00:00.000+0000',
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv5',
  hearingListingStatus: 'CANCELLED',
  listAssistCaseStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_5],
};

export const HEARINGS_LIST: CaseHearingsMainModel = {
  hmctsServiceID: 'SSCS',
  caseRef: '1568642646198441',
  caseHearings: [CASE_HEARING_1, CASE_HEARING_2, CASE_HEARING_3, CASE_HEARING_4, CASE_HEARING_5, CASE_HEARING_6, CASE_HEARING_7, CASE_HEARING_8, CASE_HEARING_9, CASE_HEARING_10],
};

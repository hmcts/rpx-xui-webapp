/* tslint:disable:object-literal-sort-keys */
import { CaseHearingModel } from '../models/caseHearing.model';
import { CaseHearingsMainModel } from '../models/caseHearingsMain.model';
import { HearingDayScheduleModel } from '../models/hearingDaySchedule.model';
import { HearingListingStatusEnum, HMCStatus } from '../models/hearings.enum';

const HEARING_DAY_SCHEDULE_1: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-01-12T16:00:00.000+0000',
  hearingEndDateTime: '2021-05-04T16:00:00.000+0000',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7ba5',
  hearingVenueId: 'venue 1',
  hearingRoomId: 'room 1',
  hearingPanel: ['hearingJudgeId1'],
};

const HEARING_DAY_SCHEDULE_2: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-02-12T16:00:00.000+0000',
  hearingEndDateTime: '2021-06-04T16:00:00.000+0000',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7ba4',
  hearingVenueId: 'venue 2',
  hearingRoomId: 'room 2',
  hearingPanel: ['hearingJudgeId1'],
};

const HEARING_DAY_SCHEDULE_3: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-03-12T16:00:00.000+0000',
  hearingEndDateTime: '2021-06-12T16:00:00.000+0000',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7bc4',
  hearingVenueId: 'venue 3',
  hearingRoomId: 'room 3',
  hearingPanel: ['hearingJudgeId1'],
};

const HEARING_DAY_SCHEDULE_4: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-10-12T16:00:00.000+0000',
  hearingEndDateTime: '2021-11-12T16:00:00.000+0000',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7bc5',
  hearingVenueId: 'venue 4',
  hearingRoomId: 'room 4',
  hearingPanel: ['hearingJudgeId2'],
};

const HEARING_DAY_SCHEDULE_5: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-04-12T16:00:00.000+0000',
  hearingEndDateTime: '2021-05-12T16:00:00.000+0000',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7bc6',
  hearingVenueId: 'venue 5',
  hearingRoomId: 'room 5',
  hearingPanel: ['hearingJudgeId3'],
};

const HEARING_DAY_SCHEDULE_6: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-05-02T16:00:00.000+0000',
  hearingEndDateTime: '2021-05-20T16:00:00.000+0000',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b55',
  hearingVenueId: 'venue 1',
  hearingRoomId: 'room 1',
  hearingPanel: ['hearingJudgeId1'],
};

const HEARING_DAY_SCHEDULE_7: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-06-12T16:00:00.000+0000',
  hearingEndDateTime: '2021-07-12T16:00:00.000+0000',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b44',
  hearingVenueId: 'venue 2',
  hearingRoomId: 'room 2',
  hearingPanel: ['hearingJudgeId1'],
};

const HEARING_DAY_SCHEDULE_8: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-02-13T16:00:00.000+0000',
  hearingEndDateTime: '2021-03-13T16:00:00.000+0000',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b34',
  hearingVenueId: 'venue 3',
  hearingRoomId: 'room 3',
  hearingPanel: ['hearingJudgeId1'],
};

const HEARING_DAY_SCHEDULE_9: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-03-12T16:00:00.000+0000',
  hearingEndDateTime: '2021-04-12T16:00:00.000+0000',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b15',
  hearingVenueId: 'venue 4',
  hearingRoomId: 'room 4',
  hearingPanel: ['hearingJudgeId2'],
};

const HEARING_DAY_SCHEDULE_10: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-04-12T16:00:00.000+0000',
  hearingEndDateTime: '2021-05-12T16:00:00.000+0000',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b66',
  hearingVenueId: 'venue 5',
  hearingRoomId: 'room 5',
  hearingPanel: ['hearingJudgeId3'],
};

const HEARING_DAY_SCHEDULE_11: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-09-01T16:00:00.000+0000',
  hearingEndDateTime: '2021-09-04T16:00:00.000+0000',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b33',
  hearingVenueId: 'venue 11',
  hearingRoomId: 'room 11',
  hearingPanel: ['child'],
};

const CASE_HEARING_1: CaseHearingModel = {
  hearingID: 'h111111',
  hearingRequestDateTime: '2021-09-01T16:00:00.000+0000',
  hearingType: 'Case management hearing',
  hmcStatus: HMCStatus.AWAITING_LISTING,
  responseVersion: 'rv1',
  listAssistCaseStatus: '',
  hearingListingStatus: HearingListingStatusEnum.AWAITING_LISTING,
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_1],
};

const CASE_HEARING_2: CaseHearingModel = {
  hearingID: 'h222222',
  hearingType: 'Final hearing',
  hearingRequestDateTime: '2021-09-01T16:00:00.000+0000',
  hmcStatus: HMCStatus.AWAITING_LISTING,
  responseVersion: 'rv2',
  listAssistCaseStatus: '',
  hearingListingStatus: HearingListingStatusEnum.LISTED,
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_2],
};

const CASE_HEARING_3: CaseHearingModel = {
  hearingID: 'h333333',
  hearingType: 'Initial hearing',
  hearingRequestDateTime: '2021-09-01T16:00:00.000+0000',
  hmcStatus: HMCStatus.LISTED,
  responseVersion: 'rv3',
  listAssistCaseStatus: '',
  hearingListingStatus: HearingListingStatusEnum.LISTED,
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_3],
};

const CASE_HEARING_4: CaseHearingModel = {
  hearingID: 'h444444',
  hearingType: 'Case management hearing',
  hearingRequestDateTime: '2021-10-01T16:00:00.000+0000',
  hmcStatus: HMCStatus.CANCELLATION_REQUESTED,
  responseVersion: 'rv4',
  listAssistCaseStatus: '',
  hearingListingStatus: HearingListingStatusEnum.CANCELLATION_REQUESTED,
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_4],
};

const CASE_HEARING_5: CaseHearingModel = {
  hearingID: 'h444444',
  hearingType: 'Case management preliminary hearing - open',
  hearingRequestDateTime: '2021-10-01T16:00:00.000+0000',
  hmcStatus: HMCStatus.CANCELLATION_REQUESTED,
  responseVersion: 'rv5',
  listAssistCaseStatus: '',
  hearingListingStatus: HearingListingStatusEnum.CANCELLATION_REQUESTED,
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_5],
};

const CASE_HEARING_6: CaseHearingModel = {
  hearingID: 'h555555',
  hearingType: 'Directions hearing',
  hearingRequestDateTime: '2021-09-01T14:00:00.000+0000',
  hmcStatus: HMCStatus.LISTED,
  responseVersion: 'rv6',
  listAssistCaseStatus: '',
  hearingListingStatus: HearingListingStatusEnum.LISTED,
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_6],
};

const CASE_HEARING_7: CaseHearingModel = {
  hearingID: 'h555555',
  hearingType: 'Full hearing',
  hearingRequestDateTime: '2021-09-01T14:00:00.000+0000',
  hmcStatus: HMCStatus.LISTED,
  responseVersion: 'rv7',
  listAssistCaseStatus: '',
  hearingListingStatus: HearingListingStatusEnum.LISTED,
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_7],
};

const CASE_HEARING_8: CaseHearingModel = {
  hearingID: 'h555555',
  hearingType: 'Directions hearing',
  hmcStatus: HMCStatus.AWAITING_LISTING,
  hearingRequestDateTime: '2021-09-14T16:00:00.000+0000',
  responseVersion: 'rv8',
  listAssistCaseStatus: '',
  hearingListingStatus: HearingListingStatusEnum.AWAITING_LISTING,
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_8],
};

const CASE_HEARING_9: CaseHearingModel = {
  hearingID: 'h555555',
  hearingType: 'Pre-hearing review',
  hearingRequestDateTime: '2021-09-01T14:00:00.000+0000',
  hmcStatus: HMCStatus.VACATED,
  responseVersion: 'rv9',
  listAssistCaseStatus: '',
  hearingListingStatus: HearingListingStatusEnum.VACATED,
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_9],
};

const CASE_HEARING_10: CaseHearingModel = {
  hearingID: 'h555555',
  hearingType: 'Case management preliminary hearing - open',
  hmcStatus: HMCStatus.VACATED,
  hearingRequestDateTime: '2021-09-01T14:00:00.000+0000',
  responseVersion: 'rv10',
  listAssistCaseStatus: '',
  hearingListingStatus: HearingListingStatusEnum.VACATED,
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_10],
};

const CASE_HEARING_11: CaseHearingModel = {
  hearingID: 'h555555',
  hearingType: 'Remedy hearing',
  hearingRequestDateTime: '2021-09-14T16:00:00.000+0000',
  hmcStatus: HMCStatus.AWAITING_ACTUALS,
  responseVersion: 'rv11',
  listAssistCaseStatus: '',
  hearingListingStatus: HearingListingStatusEnum.AWAITING_ACTUALS,
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_11],
};

export const EMPTY_HEARINGS_LIST: CaseHearingsMainModel = {
  hmctsServiceID: 'SSCS',
  caseRef: '1568642646198441',
  caseHearings: [],
};

export const HEARINGS_LIST: CaseHearingsMainModel = {
  hmctsServiceID: 'SSCS',
  caseRef: '1568642646198442',
  caseHearings: [
    CASE_HEARING_1,
    CASE_HEARING_2,
    CASE_HEARING_3,
    CASE_HEARING_4,
    CASE_HEARING_5,
    CASE_HEARING_6,
    CASE_HEARING_7,
    CASE_HEARING_8,
    CASE_HEARING_9,
    CASE_HEARING_10,
    CASE_HEARING_11],
};

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
  hearingType: 'Case management hearing',
  hearingRequestDateTime: '2021-09-01T16:00:00.000+0000',
  lastResponseReceivedDateTime: '',
  hmcStatus: HMCStatus.HEARING_REQUESTD,
  responseVersion: 'rv1',
  hearingListingStatus: HearingListingStatusEnum.UPDATE_REQUESTED,
  listAssistCaseStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_1],
};

const CASE_HEARING_2: CaseHearingModel = {
  hearingID: 'h222222',
  hearingType: 'Final hearing',
  lastResponseReceivedDateTime: '',
  hearingRequestDateTime: '2021-09-01T16:00:00.000+0000',
  hmcStatus: HMCStatus.AWAITING_LISTING,
  responseVersion: 'rv2',
  hearingListingStatus: HearingListingStatusEnum.AWAITING_LISTING,
  listAssistCaseStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_2],
};

const CASE_HEARING_3: CaseHearingModel = {
  hearingID: 'h333333',
  hearingType: 'Initial hearing',
  lastResponseReceivedDateTime: '',
  hearingRequestDateTime: '2021-09-01T16:00:00.000+0000',
  hmcStatus: HMCStatus.LISTED,
  responseVersion: 'rv3',
  hearingListingStatus: HearingListingStatusEnum.LISTED,
  listAssistCaseStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_3],
};

const CASE_HEARING_4: CaseHearingModel = {
  hearingID: 'h444444',
  hearingType: 'Case management hearing',
  lastResponseReceivedDateTime: '',
  hearingRequestDateTime: '2021-10-01T16:00:00.000+0000',
  hmcStatus: HMCStatus.UPDATE_REQUESTED,
  responseVersion: 'rv4',
  hearingListingStatus: HearingListingStatusEnum.UPDATE_REQUESTED,
  listAssistCaseStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_4],
};

const CASE_HEARING_5: CaseHearingModel = {
  hearingID: 'h444444',
  hearingType: 'Case management preliminary hearing - open',
  lastResponseReceivedDateTime: '',
  hearingRequestDateTime: '2021-10-01T16:00:00.000+0000',
  hmcStatus: HMCStatus.UPDATE_SUBMITTED,
  responseVersion: 'rv5',
  hearingListingStatus: HearingListingStatusEnum.UPDATE_SUBMITTED,
  listAssistCaseStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_5],
};

const CASE_HEARING_6: CaseHearingModel = {
  hearingID: 'h555555',
  hearingType: 'Directions hearing',
  lastResponseReceivedDateTime: '',
  hearingRequestDateTime: '2021-09-01T14:00:00.000+0000',
  hmcStatus: HMCStatus.EXCEPTION,
  responseVersion: 'rv6',
  hearingListingStatus: HearingListingStatusEnum.EXCEPTION,
  listAssistCaseStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_6],
};

const CASE_HEARING_7: CaseHearingModel = {
  hearingID: 'h555555',
  hearingType: 'Full hearing',
  lastResponseReceivedDateTime: '',
  hearingRequestDateTime: '2021-09-01T14:00:00.000+0000',
  hmcStatus: HMCStatus.CANCELLATION_REQUESTED,
  responseVersion: 'rv7',
  hearingListingStatus: HearingListingStatusEnum.CANCELLATION_REQUESTED,
  listAssistCaseStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_7],
};

const CASE_HEARING_8: CaseHearingModel = {
  hearingID: 'h555555',
  hearingType: 'Directions hearing',
  lastResponseReceivedDateTime: '',
  hmcStatus: HMCStatus.VACATED,
  hearingRequestDateTime: '2021-09-14T16:00:00.000+0000',
  responseVersion: 'rv8',
  hearingListingStatus: HearingListingStatusEnum.VACATED,
  listAssistCaseStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_8],
};

const CASE_HEARING_9: CaseHearingModel = {
  hearingID: 'h555555',
  hearingType: 'Pre-hearing review',
  lastResponseReceivedDateTime: '',
  hearingRequestDateTime: '2021-09-01T14:00:00.000+0000',
  hmcStatus: HMCStatus.AWAITING_ACTUALS,
  responseVersion: 'rv9',
  hearingListingStatus: HearingListingStatusEnum.AWAITING_ACTUALS,
  listAssistCaseStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_9],
};

const CASE_HEARING_10: CaseHearingModel = {
  hearingID: 'h555555',
  hearingType: 'Case management preliminary hearing - open',
  lastResponseReceivedDateTime: '',
  hmcStatus: HMCStatus.COMPLETED,
  hearingRequestDateTime: '2021-09-01T14:00:00.000+0000',
  responseVersion: 'rv10',
  hearingListingStatus: HearingListingStatusEnum.COMPLETED,
  listAssistCaseStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_10],
};

const CASE_HEARING_11: CaseHearingModel = {
  hearingID: 'h555555',
  hearingType: 'Remedy hearing',
  hearingRequestDateTime: '2021-09-14T16:00:00.000+0000',
  lastResponseReceivedDateTime: '',
  hmcStatus: HMCStatus.ADJOURNED,
  responseVersion: 'rv11',
  hearingListingStatus: HearingListingStatusEnum.ADJOURNED,
  listAssistCaseStatus: '',
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

/* tslint:disable:object-literal-sort-keys */
import { CaseHearingModel } from '../models/caseHearing.model';
import { CaseHearingsMainModel } from '../models/caseHearingsMain.model';
import { HearingDayScheduleModel } from '../models/hearingDaySchedule.model';
import { HearingListingStatusEnum, HMCStatus } from '../models/hearings.enum';

const HEARING_DAY_SCHEDULE_1: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-05-04T09:00:00.000+0000',
  hearingEndDateTime: '2021-05-04T16:00:00.000+0000',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7ba5',
  hearingVenueId: 'venue 1',
  hearingRoomId: 'room 1',
  hearingPanel: ['hearingJudgeId1'],
};

const HEARING_DAY_SCHEDULE_2: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-05-05T09:00:00.000+0000',
  hearingEndDateTime: '2021-05-05T16:00:00.000+0000',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7ba4',
  hearingVenueId: 'venue 2',
  hearingRoomId: 'room 2',
  hearingPanel: ['hearingJudgeId1'],
};

const HEARING_DAY_SCHEDULE_3: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-03-12T09:00:00.000+0000',
  hearingEndDateTime: '2021-03-12T16:00:00.000+0000',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7bc4',
  hearingVenueId: 'venue 3',
  hearingRoomId: 'room 3',
  hearingPanel: ['hearingJudgeId1'],
};

const HEARING_DAY_SCHEDULE_4: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-03-13T09:00:00.000+0000',
  hearingEndDateTime: '2021-03-13T16:00:00.000+0000',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7bc5',
  hearingVenueId: 'venue 4',
  hearingRoomId: 'room 4',
  hearingPanel: ['hearingJudgeId2'],
};

const HEARING_DAY_SCHEDULE_5: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-04-12T09:00:00.000+0000',
  hearingEndDateTime: '2021-04-12T16:00:00.000+0000',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7bc6',
  hearingVenueId: 'venue 5',
  hearingRoomId: 'room 5',
  hearingPanel: ['hearingJudgeId3'],
};

const HEARING_DAY_SCHEDULE_6: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-05-02T09:00:00.000+0000',
  hearingEndDateTime: '2021-05-02T16:00:00.000+0000',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b55',
  hearingVenueId: 'venue 1',
  hearingRoomId: 'room 1',
  hearingPanel: ['hearingJudgeId1'],
};

const HEARING_DAY_SCHEDULE_7: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-07-12T09:00:00.000+0000',
  hearingEndDateTime: '2021-07-12T16:00:00.000+0000',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b44',
  hearingVenueId: 'venue 2',
  hearingRoomId: 'room 2',
  hearingPanel: ['hearingJudgeId1'],
};

const HEARING_DAY_SCHEDULE_8: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-02-13T09:00:00.000+0000',
  hearingEndDateTime: '2021-02-13T16:00:00.000+0000',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b34',
  hearingVenueId: 'venue 3',
  hearingRoomId: 'room 3',
  hearingPanel: ['hearingJudgeId1'],
};

const HEARING_DAY_SCHEDULE_9: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-03-12T09:00:00.000+0000',
  hearingEndDateTime: '2021-03-12T16:00:00.000+0000',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b15',
  hearingVenueId: 'venue 4',
  hearingRoomId: 'room 4',
  hearingPanel: ['hearingJudgeId2'],
};

const HEARING_DAY_SCHEDULE_10: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-04-12T09:00:00.000+0000',
  hearingEndDateTime: '2021-04-12T16:00:00.000+0000',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b66',
  hearingVenueId: 'venue 5',
  hearingRoomId: 'room 5',
  hearingPanel: ['hearingJudgeId3'],
};

const HEARING_DAY_SCHEDULE_11: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-09-01T09:00:00.000+0000',
  hearingEndDateTime: '2021-09-01T16:00:00.000+0000',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b33',
  hearingVenueId: 'venue 11',
  hearingRoomId: 'room 11',
  hearingPanel: ['child'],
};

const CASE_HEARING_1: CaseHearingModel = {
  hearingID: 'h100001',
  hearingRequestDateTime: '2021-09-01T16:00:00.000+0000',
  hearingType: 'Case management hearing',
  hmcStatus: HMCStatus.HEARING_REQUESTD,
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv1',
  hearingListingStatus: HearingListingStatusEnum.UPDATE_REQUESTED,
  listAssistCaseStatus: '',
  hearingDaySchedule: null,
};

const CASE_HEARING_2: CaseHearingModel = {
  hearingID: 'h100002',
  hearingRequestDateTime: '2021-10-01T16:00:00.000+0000',
  hearingType: 'Final hearing',
  hmcStatus: HMCStatus.AWAITING_LISTING,
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv2',
  hearingListingStatus: HearingListingStatusEnum.AWAITING_LISTING,
  listAssistCaseStatus: '',
  hearingDaySchedule: [],
};

const CASE_HEARING_3: CaseHearingModel = {
  hearingID: 'h100003',
  hearingRequestDateTime: '2021-09-01T16:00:00.000+0000',
  hearingType: 'Initial hearing',
  hmcStatus: HMCStatus.LISTED,
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv3',
  hearingListingStatus: HearingListingStatusEnum.LISTED,
  listAssistCaseStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_1, HEARING_DAY_SCHEDULE_2],
};

const CASE_HEARING_4: CaseHearingModel = {
  hearingID: 'h100004',
  hearingRequestDateTime: '2021-10-01T16:00:00.000+0000',
  hearingType: 'Case management hearing',
  hmcStatus: HMCStatus.UPDATE_REQUESTED,
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv4',
  hearingListingStatus: HearingListingStatusEnum.UPDATE_REQUESTED,
  listAssistCaseStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_3, HEARING_DAY_SCHEDULE_4],
};

const CASE_HEARING_5: CaseHearingModel = {
  hearingID: 'h100005',
  hearingRequestDateTime: '2021-10-01T16:00:00.000+0000',
  hearingType: 'Case management preliminary hearing - open',
  hmcStatus: HMCStatus.UPDATE_SUBMITTED,
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv5',
  hearingListingStatus: HearingListingStatusEnum.UPDATE_SUBMITTED,
  listAssistCaseStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_5],
};

const CASE_HEARING_6: CaseHearingModel = {
  hearingID: 'h100006',
  hearingRequestDateTime: '2021-09-01T14:00:00.000+0000',
  hearingType: 'Directions hearing',
  hmcStatus: HMCStatus.EXCEPTION,
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv6',
  hearingListingStatus: HearingListingStatusEnum.EXCEPTION,
  listAssistCaseStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_6],
};

const CASE_HEARING_7: CaseHearingModel = {
  hearingID: 'h100007',
  hearingRequestDateTime: '2021-09-01T14:00:00.000+0000',
  hearingType: 'Full hearing',
  hmcStatus: HMCStatus.CANCELLATION_REQUESTED,
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv7',
  hearingListingStatus: HearingListingStatusEnum.CANCELLATION_REQUESTED,
  listAssistCaseStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_7],
};

const CASE_HEARING_8: CaseHearingModel = {
  hearingID: 'h100008',
  hearingRequestDateTime: '2021-09-14T16:00:00.000+0000',
  hearingType: 'Directions hearing',
  hmcStatus: HMCStatus.VACATED,
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv8',
  hearingListingStatus: HearingListingStatusEnum.VACATED,
  listAssistCaseStatus: '',
  hearingDaySchedule: [],
};

const CASE_HEARING_9: CaseHearingModel = {
  hearingID: 'h100009',
  hearingRequestDateTime: '2021-09-01T14:00:00.000+0000',
  hearingType: 'Pre-hearing review',
  hmcStatus: HMCStatus.AWAITING_ACTUALS,
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv9',
  hearingListingStatus: HearingListingStatusEnum.AWAITING_ACTUALS,
  listAssistCaseStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_9],
};

const CASE_HEARING_10: CaseHearingModel = {
  hearingID: 'h100010',
  hearingRequestDateTime: '2021-09-01T14:00:00.000+0000',
  hearingType: 'Case management preliminary hearing - open',
  hmcStatus: HMCStatus.COMPLETED,
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv10',
  hearingListingStatus: HearingListingStatusEnum.COMPLETED,
  listAssistCaseStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_10],
};

const CASE_HEARING_11: CaseHearingModel = {
  hearingID: 'h100011',
  hearingRequestDateTime: '2021-09-14T16:00:00.000+0000',
  hearingType: 'Remedy hearing',
  hmcStatus: HMCStatus.ADJOURNED,
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv11',
  hearingListingStatus: HearingListingStatusEnum.ADJOURNED,
  listAssistCaseStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_11],
};

const CASE_HEARING_12: CaseHearingModel = {
  hearingID: 'h100012',
  hearingRequestDateTime: '2021-10-14T16:00:00.000+0000',
  hearingType: 'Full hearing',
  hmcStatus: HMCStatus.VACATED,
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv8',
  hearingListingStatus: HearingListingStatusEnum.VACATED,
  listAssistCaseStatus: '',
  hearingDaySchedule: [],
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
    CASE_HEARING_11,
    CASE_HEARING_12],
};

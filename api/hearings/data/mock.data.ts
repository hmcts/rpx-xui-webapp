/* tslint:disable:object-literal-sort-keys */
import { HearingListingStatusEnum, HMCStatus } from 'hearings/models/hearings.enum';
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
  hmcStatus: HMCStatus.hearingRequestd,
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv1',
  hearingListingStatus: HearingListingStatusEnum.WAITING_TO_BE_LISTED,
  hearingsSectionStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_1],
};

const CASE_HEARING_2: CaseHearingModel = {
  hearingID: 'h222222',
  hearingType: 'Final hearing',
  hmcStatus: HMCStatus.awaitingListing,
  lastResponseReceivedDateTime: '2021-10-12T16:00:00.000+0000',
  responseVersion: 'rv2',
  hearingListingStatus: HearingListingStatusEnum.LISTED,
  hearingsSectionStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_2],
};

const CASE_HEARING_3: CaseHearingModel = {
  hearingID: 'h333333',
  hearingType: 'Initial hearing',
  hmcStatus: HMCStatus.listed,
  lastResponseReceivedDateTime: '2021-09-05T16:00:00.000+0000',
  responseVersion: 'rv3',
  hearingListingStatus: HearingListingStatusEnum.COMPLETED,
  hearingsSectionStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_3],
};

const CASE_HEARING_4: CaseHearingModel = {
  hearingID: 'h444444',
  hearingType: 'Case management hearing',
  hmcStatus: HMCStatus.updateRequested,
  lastResponseReceivedDateTime: '2021-10-22T16:00:00.000+0000',
  responseVersion: 'rv4',
  hearingListingStatus: HearingListingStatusEnum.CANCELLED,
  hearingsSectionStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_4],
};

const CASE_HEARING_5: CaseHearingModel = {
  hearingID: 'h444444',
  hearingType: 'Case management hearing',
  hmcStatus: HMCStatus.updateSubmitted,
  lastResponseReceivedDateTime: '2021-10-22T16:00:00.000+0000',
  responseVersion: 'rv4',
  hearingListingStatus: HearingListingStatusEnum.CANCELLED,
  hearingsSectionStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_4],
};

const CASE_HEARING_6: CaseHearingModel = {
  hearingID: 'h555555',
  hearingType: 'Directions hearing',
  hmcStatus: HMCStatus.exception,
  lastResponseReceivedDateTime: '2021-09-14T16:00:00.000+0000',
  responseVersion: 'rv5',
  hearingListingStatus: HearingListingStatusEnum.CANCELLED,
  hearingsSectionStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_5],
};

const CASE_HEARING_7: CaseHearingModel = {
  hearingID: 'h555555',
  hearingType: 'Directions hearing',
  hmcStatus: HMCStatus.cancellationRequested,
  lastResponseReceivedDateTime: '2021-09-14T16:00:00.000+0000',
  responseVersion: 'rv5',
  hearingListingStatus: HearingListingStatusEnum.CANCELLED,
  hearingsSectionStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_5],
};

const CASE_HEARING_8: CaseHearingModel = {
  hearingID: 'h555555',
  hearingType: 'Directions hearing',
  hmcStatus: HMCStatus.vacated,
  lastResponseReceivedDateTime: '2021-09-14T16:00:00.000+0000',
  responseVersion: 'rv5',
  hearingListingStatus: HearingListingStatusEnum.CANCELLED,
  hearingsSectionStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_5],
};

const CASE_HEARING_9: CaseHearingModel = {
  hearingID: 'h555555',
  hearingType: 'Directions hearing',
  hmcStatus: HMCStatus.awaitingActuals,
  lastResponseReceivedDateTime: '2021-09-14T16:00:00.000+0000',
  responseVersion: 'rv5',
  hearingListingStatus: HearingListingStatusEnum.CANCELLED,
  hearingsSectionStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_5],
};

const CASE_HEARING_10: CaseHearingModel = {
  hearingID: 'h555555',
  hearingType: 'Directions hearing',
  hmcStatus: HMCStatus.completed,
  lastResponseReceivedDateTime: '2021-09-14T16:00:00.000+0000',
  responseVersion: 'rv5',
  hearingListingStatus: HearingListingStatusEnum.CANCELLED,
  hearingsSectionStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_5],
};

const CASE_HEARING_11: CaseHearingModel = {
  hearingID: 'h555555',
  hearingType: 'Directions hearing',
  hmcStatus: HMCStatus.adjourned,
  lastResponseReceivedDateTime: '2021-09-14T16:00:00.000+0000',
  responseVersion: 'rv5',
  hearingListingStatus: HearingListingStatusEnum.CANCELLED,
  hearingsSectionStatus: '',
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_5],
};

export const HEARINGS_LIST: CaseHearingsMainModel = {
  hmctsServiceID: 'SSCS',
  caseRef: '1568642646198441',
  caseHearings: [CASE_HEARING_1, 
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

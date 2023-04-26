import { HearingDayScheduleModel } from '../models/hearingDaySchedule.model';
import { HearingListModel } from '../models/hearingList.model';
import { HearingListMainModel } from '../models/hearingListMain.model';
import { HearingListingStatusEnum, HMCStatus, PartyType } from '../models/hearings.enum';

const HEARING_DAY_SCHEDULE_1: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-05-04T09:00:00.000Z',
  hearingEndDateTime: '2021-05-04T16:00:00.000Z',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7ba5',
  hearingVenueId: 'venue 1',
  hearingRoomId: 'room 1',
  hearingJudgeId: 'hearingJudgeId1',
  panelMemberIds: ['hearingJudgeId1'],
  attendees: [
    {
      partyID: 'P1',
      partyName: 'Jane and Smith',
      partyType: PartyType.IND,
      partyRole: 'appellant',
      individualDetails: {
        firstName: 'Jane',
        lastName: 'Smith',
        preferredHearingChannel: 'inPerson'
      }
    },
    {
      partyID: 'P2',
      partyName: 'DWP',
      partyType: PartyType.ORG,
      partyRole: 'claimant',
      individualDetails: {
        firstName: 'Jane',
        lastName: 'Smith',
        preferredHearingChannel: 'byVideo'
      }
    }
  ]
};

const HEARING_DAY_SCHEDULE_2: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-05-05T09:00:00.000Z',
  hearingEndDateTime: '2021-05-05T16:00:00.000Z',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7ba4',
  hearingVenueId: 'venue 2',
  hearingRoomId: 'room 2',
  hearingJudgeId: 'hearingJudgeId1',
  panelMemberIds: ['hearingJudgeId1'],
  attendees: [
    {
      partyID: 'P1',
      partyName: 'Jane and Smith',
      partyType: PartyType.IND,
      partyRole: 'appellant',
      individualDetails: {
        firstName: 'Jane',
        lastName: 'Smith',
        preferredHearingChannel: 'inPerson'
      }
    },
    {
      partyID: 'P2',
      partyName: 'DWP',
      partyType: PartyType.ORG,
      partyRole: 'claimant',
      individualDetails: {
        firstName: 'DWP',
        lastName: null,
        preferredHearingChannel: 'byVideo'
      }
    }
  ]
};

const HEARING_DAY_SCHEDULE_3: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-03-12T09:00:00.000Z',
  hearingEndDateTime: '2021-03-12T16:00:00.000Z',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7bc4',
  hearingVenueId: 'venue 3',
  hearingRoomId: 'room 3',
  hearingJudgeId: 'hearingJudgeId1',
  panelMemberIds: ['hearingJudgeId1'],
  attendees: [
    {
      partyID: 'P1',
      partyName: 'Jane and Smith',
      partyType: PartyType.IND,
      partyRole: 'appellant'
    },
    {
      partyID: 'P2',
      partyName: 'DWP',
      partyType: PartyType.ORG,
      partyRole: 'claimant',
      individualDetails: {
        firstName: 'DWP',
        lastName: null,
        preferredHearingChannel: 'byVideo'
      }
    }
  ]
};

const HEARING_DAY_SCHEDULE_4: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-03-13T09:00:00.000Z',
  hearingEndDateTime: '2021-03-13T16:00:00.000Z',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7bc5',
  hearingVenueId: '815833',
  hearingRoomId: 'room 4',
  hearingJudgeId: 'hearingJudgeId1',
  panelMemberIds: ['hearingJudgeId1'],
  attendees: [
    {
      partyID: 'P1',
      partyName: 'Jane and Smith',
      partyType: PartyType.IND,
      partyRole: 'appellant',
      individualDetails: {
        firstName: 'Jane',
        lastName: 'Smith',
        preferredHearingChannel: 'inPerson'
      }
    },
    {
      partyID: 'P2',
      partyName: 'DWP',
      partyType: PartyType.ORG,
      partyRole: 'claimant',
      individualDetails: {
        firstName: 'DWP',
        lastName: null,
        preferredHearingChannel: 'byVideo'
      }
    }
  ]
};

const HEARING_DAY_SCHEDULE_5: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-04-12T09:00:00.000Z',
  hearingEndDateTime: '2021-04-12T16:00:00.000Z',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7bc6',
  hearingVenueId: 'venue 5',
  hearingRoomId: 'room 5',
  hearingJudgeId: 'hearingJudgeId1',
  panelMemberIds: ['hearingJudgeId1'],
  attendees: [
    {
      partyID: 'P1',
      partyName: 'Jane and Smith',
      partyType: PartyType.IND,
      partyRole: 'appellant'
    },
    {
      partyID: 'P2',
      partyName: 'DWP',
      partyType: PartyType.ORG,
      partyRole: 'claimant',
      individualDetails: {
        firstName: 'DWP',
        lastName: null,
        preferredHearingChannel: 'byVideo'
      }
    }
  ]
};

const HEARING_DAY_SCHEDULE_6: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-05-02T09:00:00.000Z',
  hearingEndDateTime: '2021-05-02T16:00:00.000Z',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b55',
  hearingVenueId: 'venue 1',
  hearingRoomId: 'room 1',
  hearingJudgeId: 'hearingJudgeId1',
  panelMemberIds: ['hearingJudgeId1'],
  attendees: [
    {
      partyID: 'P1',
      partyName: 'Jane and Smith',
      partyType: PartyType.IND,
      partyRole: 'appellant',
      individualDetails: {
        firstName: 'Jane',
        lastName: 'Smith',
        preferredHearingChannel: 'inPerson'
      }
    },
    {
      partyID: 'P2',
      partyName: 'DWP',
      partyType: PartyType.ORG,
      partyRole: 'claimant',
      individualDetails: {
        firstName: 'DWP',
        lastName: null,
        preferredHearingChannel: 'byVideo'
      }
    }
  ]
};

const HEARING_DAY_SCHEDULE_7: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-07-12T09:00:00.000Z',
  hearingEndDateTime: '2021-07-12T16:00:00.000Z',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b44',
  hearingVenueId: 'venue 2',
  hearingRoomId: 'room 2',
  hearingJudgeId: 'hearingJudgeId1',
  panelMemberIds: ['hearingJudgeId1'],
  attendees: [
    {
      partyID: 'P1',
      partyName: 'Jane and Smith',
      partyType: PartyType.IND,
      partyRole: 'appellant',
      individualDetails: {
        firstName: 'Jane',
        lastName: 'Smith',
        preferredHearingChannel: 'inPerson'
      }
    },
    {
      partyID: 'P2',
      partyName: 'DWP',
      partyType: PartyType.ORG,
      partyRole: 'claimant',
      individualDetails: {
        firstName: 'DWP',
        lastName: null,
        preferredHearingChannel: 'byVideo'
      }
    }
  ]
};

const HEARING_DAY_SCHEDULE_8: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-02-13T09:00:00.000Z',
  hearingEndDateTime: '2021-02-13T16:00:00.000Z',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b34',
  hearingVenueId: 'venue 3',
  hearingRoomId: 'room 3',
  hearingJudgeId: 'hearingJudgeId1',
  panelMemberIds: ['hearingJudgeId1'],
  attendees: [
    {
      partyID: 'P1',
      partyName: 'Jane and Smith',
      partyType: PartyType.IND,
      partyRole: 'appellant',
      individualDetails: {
        firstName: 'Jane',
        lastName: 'Smith',
        preferredHearingChannel: 'inPerson'
      }
    },
    {
      partyID: 'P2',
      partyName: 'DWP',
      partyType: PartyType.ORG,
      partyRole: 'claimant',
      individualDetails: {
        firstName: 'DWP',
        lastName: null,
        preferredHearingChannel: 'byVideo'
      }
    }
  ]
};

const HEARING_DAY_SCHEDULE_9: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-03-12T09:00:00.000Z',
  hearingEndDateTime: '2021-03-12T16:00:00.000Z',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b15',
  hearingVenueId: '815833',
  hearingRoomId: 'room 4',
  hearingJudgeId: 'hearingJudgeId1',
  panelMemberIds: ['hearingJudgeId1'],
  attendees: [
    {
      partyID: 'P1',
      partyName: 'Jane and Smith',
      partyType: PartyType.IND,
      partyRole: 'appellant',
      individualDetails: {
        firstName: 'Jane',
        lastName: 'Smith',
        preferredHearingChannel: 'inPerson'
      }
    },
    {
      partyID: 'P2',
      partyName: 'DWP',
      partyType: PartyType.ORG,
      partyRole: 'claimant',
      individualDetails: {
        firstName: 'DWP',
        lastName: null,
        preferredHearingChannel: 'byVideo'
      }
    }
  ]
};

const HEARING_DAY_SCHEDULE_10: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-04-12T09:00:00.000Z',
  hearingEndDateTime: '2021-04-12T16:00:00.000Z',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b66',
  hearingVenueId: 'venue 5',
  hearingRoomId: 'room 5',
  hearingJudgeId: 'hearingJudgeId1',
  panelMemberIds: ['hearingJudgeId1'],
  attendees: [
    {
      partyID: 'P1',
      partyName: 'Jane and Smith',
      partyType: PartyType.IND,
      partyRole: 'appellant',
      individualDetails: {
        firstName: 'Jane',
        lastName: 'Smith',
        preferredHearingChannel: 'inPerson'
      }
    },
    {
      partyID: 'P2',
      partyName: 'DWP',
      partyType: PartyType.ORG,
      partyRole: 'claimant',
      individualDetails: {
        firstName: 'DWP',
        lastName: null,
        preferredHearingChannel: 'byVideo'
      }
    }
  ]
};

const HEARING_DAY_SCHEDULE_11: HearingDayScheduleModel = {
  hearingStartDateTime: '2021-09-01T09:00:00.000Z',
  hearingEndDateTime: '2021-09-01T16:00:00.000Z',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b33',
  hearingVenueId: 'venue 11',
  hearingRoomId: 'room 11',
  hearingJudgeId: 'child',
  panelMemberIds: ['child'],
  attendees: [
    {
      partyID: 'P1',
      partyName: 'Jane and Smith',
      partyType: PartyType.IND,
      partyRole: 'appellant',
      individualDetails: {
        firstName: 'Jane',
        lastName: 'Smith',
        preferredHearingChannel: 'inPerson'
      }
    },
    {
      partyID: 'P2',
      partyName: 'DWP',
      partyType: PartyType.ORG,
      partyRole: 'claimant',
      individualDetails: {
        firstName: 'DWP',
        lastName: null,
        preferredHearingChannel: 'byVideo'
      }
    }
  ]
};

const HEARING_DAY_SCHEDULE_13: HearingDayScheduleModel = {
  hearingStartDateTime: '2022-03-24T09:00:00.000Z',
  hearingEndDateTime: '2021-03-24T16:00:00.000Z',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b16',
  hearingVenueId: '815833',
  hearingRoomId: 'room 5',
  hearingJudgeId: 'hearingJudgeId1',
  panelMemberIds: ['hearingJudgeId1'],
  attendees: [
    {
      partyID: 'P1',
      partyName: 'Jane and Smith',
      partyType: PartyType.IND,
      partyRole: 'claimant',
      individualDetails: {
        firstName: 'Jane',
        lastName: 'Smith',
        preferredHearingChannel: 'inPerson'
      }
    },
    {
      partyID: 'P2',
      partyName: 'DWP',
      partyType: PartyType.ORG,
      partyRole: 'claimant',
      individualDetails: {
        firstName: 'DWP',
        lastName: null,
        preferredHearingChannel: 'byVideo'
      }
    }
  ]
};

const HEARING_DAY_SCHEDULE_14: HearingDayScheduleModel = {
  hearingStartDateTime: '2022-02-28T09:00:00.000Z',
  hearingEndDateTime: '2021-02-28T16:00:00.000Z',
  listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7b18',
  hearingVenueId: '815833',
  hearingRoomId: 'room 5',
  hearingJudgeId: 'hearingJudgeId1',
  panelMemberIds: ['hearingJudgeId1'],
  attendees: [
    {
      partyID: 'P1',
      partyName: 'Jane and Smith',
      partyType: PartyType.IND,
      partyRole: 'claimant',
      individualDetails: {
        firstName: 'Jane',
        lastName: 'Smith',
        preferredHearingChannel: 'inPerson'
      }
    },
    {
      partyID: 'P2',
      partyName: 'DWP',
      partyType: PartyType.ORG,
      partyRole: 'claimant',
      individualDetails: {
        firstName: 'DWP',
        lastName: null,
        preferredHearingChannel: 'byVideo'
      }
    }
  ]
};

const CASE_HEARING_1: HearingListModel = {
  hearingID: 'h100001',
  hearingRequestDateTime: '2021-09-01T16:00:00.000Z',
  hearingType: 'Case management hearing',
  hmcStatus: HMCStatus.HEARING_REQUESTED,
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv1',
  hearingListingStatus: HearingListingStatusEnum.UPDATE_REQUESTED,
  listAssistCaseStatus: '',
  hearingIsLinkedFlag: false,
  hearingGroupRequestId: 'g1000000',
  hearingDaySchedule: null
};

const CASE_HEARING_2: HearingListModel = {
  hearingID: 'h100002',
  hearingRequestDateTime: '2021-10-01T16:00:00.000Z',
  hearingType: 'Final hearing',
  hmcStatus: HMCStatus.AWAITING_LISTING,
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv2',
  hearingListingStatus: HearingListingStatusEnum.AWAITING_LISTING,
  listAssistCaseStatus: '',
  hearingIsLinkedFlag: true,
  hearingGroupRequestId: null,
  hearingDaySchedule: []
};

const CASE_HEARING_3: HearingListModel = {
  hearingID: 'h100003',
  hearingRequestDateTime: '2021-09-01T16:00:00.000Z',
  hearingType: 'Initial hearing',
  hmcStatus: HMCStatus.LISTED,
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv3',
  hearingListingStatus: HearingListingStatusEnum.LISTED,
  listAssistCaseStatus: '',
  hearingIsLinkedFlag: false,
  hearingGroupRequestId: null,
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_1, HEARING_DAY_SCHEDULE_2]
};

const CASE_HEARING_4: HearingListModel = {
  hearingID: 'h100004',
  hearingRequestDateTime: '2021-10-01T16:00:00.000Z',
  hearingType: 'Case management hearing',
  hmcStatus: HMCStatus.UPDATE_REQUESTED,
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv4',
  hearingListingStatus: HearingListingStatusEnum.UPDATE_REQUESTED,
  listAssistCaseStatus: '',
  hearingIsLinkedFlag: false,
  hearingGroupRequestId: null,
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_3, HEARING_DAY_SCHEDULE_4]
};

const CASE_HEARING_5: HearingListModel = {
  hearingID: 'h100005',
  hearingRequestDateTime: '2021-10-01T16:00:00.000Z',
  hearingType: 'Case management preliminary hearing - open',
  hmcStatus: HMCStatus.UPDATE_SUBMITTED,
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv5',
  hearingListingStatus: HearingListingStatusEnum.UPDATE_SUBMITTED,
  listAssistCaseStatus: '',
  hearingIsLinkedFlag: false,
  hearingGroupRequestId: null,
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_5]
};

const CASE_HEARING_6: HearingListModel = {
  hearingID: 'h100006',
  hearingRequestDateTime: '2021-09-01T14:00:00.000Z',
  hearingType: 'Directions hearing',
  hmcStatus: HMCStatus.EXCEPTION,
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv6',
  hearingListingStatus: HearingListingStatusEnum.EXCEPTION,
  listAssistCaseStatus: '',
  hearingIsLinkedFlag: false,
  hearingGroupRequestId: null,
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_6]
};

const CASE_HEARING_7: HearingListModel = {
  hearingID: 'h100007',
  hearingRequestDateTime: '2021-09-01T14:00:00.000Z',
  hearingType: 'Full hearing',
  hmcStatus: HMCStatus.CANCELLATION_REQUESTED,
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv7',
  hearingListingStatus: HearingListingStatusEnum.CANCELLATION_REQUESTED,
  listAssistCaseStatus: '',
  hearingIsLinkedFlag: false,
  hearingGroupRequestId: null,
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_7, HEARING_DAY_SCHEDULE_8]
};

const CASE_HEARING_8: HearingListModel = {
  hearingID: 'h100008',
  hearingRequestDateTime: '2021-09-14T16:00:00.000Z',
  hearingType: 'Directions hearing',
  hmcStatus: HMCStatus.VACATED,
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv8',
  hearingListingStatus: HearingListingStatusEnum.VACATED,
  listAssistCaseStatus: '',
  hearingIsLinkedFlag: false,
  hearingGroupRequestId: null,
  hearingDaySchedule: []
};

const CASE_HEARING_9: HearingListModel = {
  hearingID: 'h100009',
  hearingRequestDateTime: '2021-09-01T14:00:00.000Z',
  hearingType: 'Pre-hearing review',
  hmcStatus: HMCStatus.AWAITING_ACTUALS,
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv9',
  hearingListingStatus: HearingListingStatusEnum.AWAITING_ACTUALS,
  listAssistCaseStatus: '',
  hearingIsLinkedFlag: false,
  hearingGroupRequestId: null,
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_9]
};

const CASE_HEARING_10: HearingListModel = {
  hearingID: 'h100010',
  hearingRequestDateTime: '2021-09-01T14:00:00.000Z',
  hearingType: 'Case management preliminary hearing - open',
  hmcStatus: HMCStatus.COMPLETED,
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv10',
  hearingListingStatus: HearingListingStatusEnum.COMPLETED,
  listAssistCaseStatus: '',
  hearingIsLinkedFlag: false,
  hearingGroupRequestId: null,
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_10]
};

const CASE_HEARING_11: HearingListModel = {
  hearingID: 'h100011',
  hearingRequestDateTime: '2021-09-14T16:00:00.000Z',
  hearingType: 'Remedy hearing',
  hmcStatus: HMCStatus.ADJOURNED,
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv11',
  hearingListingStatus: HearingListingStatusEnum.ADJOURNED,
  listAssistCaseStatus: '',
  hearingIsLinkedFlag: false,
  hearingGroupRequestId: null,
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_11]
};

const CASE_HEARING_12: HearingListModel = {
  hearingID: 'h100012',
  hearingRequestDateTime: '2021-10-14T16:00:00.000Z',
  hearingType: 'Full hearing',
  hmcStatus: HMCStatus.VACATED,
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv12',
  hearingListingStatus: HearingListingStatusEnum.VACATED,
  listAssistCaseStatus: '',
  hearingIsLinkedFlag: false,
  hearingGroupRequestId: null,
  hearingDaySchedule: []
};

const CASE_HEARING_13: HearingListModel = {
  hearingID: 'h100013',
  hearingRequestDateTime: '2022-03-22T13:00:00.000Z',
  hearingType: 'Pre-hearing review',
  hmcStatus: HMCStatus.AWAITING_ACTUALS,
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv13',
  hearingListingStatus: HearingListingStatusEnum.AWAITING_ACTUALS,
  listAssistCaseStatus: '',
  hearingIsLinkedFlag: false,
  hearingGroupRequestId: null,
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_13]
};

const CASE_HEARING_14: HearingListModel = {
  hearingID: 'h100014',
  hearingRequestDateTime: '2022-02-28T10:00:00.000Z',
  hearingType: 'Case management hearing - open',
  hmcStatus: HMCStatus.UPDATE_REQUESTED,
  lastResponseReceivedDateTime: '',
  responseVersion: 'rv14',
  hearingListingStatus: HearingListingStatusEnum.UPDATE_REQUESTED,
  listAssistCaseStatus: '',
  hearingIsLinkedFlag: false,
  hearingGroupRequestId: null,
  hearingDaySchedule: [HEARING_DAY_SCHEDULE_14]
};

export const EMPTY_HEARINGS_LIST: HearingListMainModel = {
  hmctsServiceID: 'BBA3',
  caseRef: '1584618195804035',
  caseHearings: []
};

export const HEARINGS_LIST: HearingListMainModel = {
  hmctsServiceID: 'BBA3',
  caseRef: '1584618195804035',
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
    CASE_HEARING_12,
    CASE_HEARING_13,
    CASE_HEARING_14]
};

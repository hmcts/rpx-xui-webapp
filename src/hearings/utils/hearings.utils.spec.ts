import { initialState } from '../hearing.test.data';
import { KEY_MODE } from '../models/hearingConditions';
import { HearingDayScheduleModel } from '../models/hearingDaySchedule.model';
import { HearingRequestMainModel } from '../models/hearingRequestMain.model';
import { Mode, PartyType, UnavailabilityType } from '../models/hearings.enum';
import { PartyDetailsModel } from '../models/partyDetails.model';
import { HearingsUtils } from './hearings.utils';
import { UnavailabilityRangeModel } from '../models/unavailabilityRange.model';
import { HearingWindowModel } from '../models/hearingWindow.model';

describe('HearingsUtils', () => {
  it('should return true if has the right property', () => {
    const evaluateResult = HearingsUtils.hasPropertyAndValue({ mode: Mode.CREATE }, KEY_MODE, Mode.CREATE);
    expect(evaluateResult).toBeTruthy();
  });

  it('should return false if has not the right property', () => {
    const evaluateResult = HearingsUtils.hasPropertyAndValue({ mode: Mode.VIEW_EDIT }, KEY_MODE, Mode.CREATE);
    expect(evaluateResult).toBeFalsy();
  });

  it('should sort hearing day schedule in correct order', () => {
    const hearingDaySchedule: HearingDayScheduleModel[] = [
      {
        hearingStartDateTime: '2022-08-15T09:00:00',
        hearingEndDateTime: '2022-08-15T16:00:00',
        hearingVenueId: '372653',
        hearingRoomId: 'Cardiff SSCS - Hearing Room 01',
        hearingJudgeId: null,
        panelMemberIds: [],
        attendees: [
          {
            hearingSubChannel: 'APEL',
            partyID: '1',
            partyRole: null,
            partyType: null
          }
        ],
        listAssistSessionID: null
      },
      {
        hearingStartDateTime: '2022-08-17T09:00:00',
        hearingEndDateTime: '2022-08-17T16:00:00',
        hearingVenueId: '372653',
        hearingRoomId: 'Cardiff SSCS - Hearing Room 02',
        hearingJudgeId: null,
        panelMemberIds: [],
        attendees: [
          {
            hearingSubChannel: 'APEL',
            partyID: '1',
            partyRole: null,
            partyType: null
          }
        ],
        listAssistSessionID: null
      },
      {
        hearingStartDateTime: '2022-08-16T09:00:00',
        hearingEndDateTime: '2022-08-16T16:00:00',
        hearingVenueId: '372653',
        hearingRoomId: 'Cardiff SSCS - Hearing Room 03',
        hearingJudgeId: null,
        panelMemberIds: [],
        attendees: [
          {
            hearingSubChannel: 'APEL',
            partyID: '1',
            partyRole: null,
            partyType: null
          }
        ],
        listAssistSessionID: null
      }
    ];
    const expectedResult: HearingDayScheduleModel[] = [
      hearingDaySchedule[0],
      hearingDaySchedule[2],
      hearingDaySchedule[1]
    ];
    const sortedResult = HearingsUtils.sortHearingDaySchedule(hearingDaySchedule);
    expect(sortedResult).toEqual(expectedResult);
  });

  it('should return the unavailability date ranges for parties', () => {
    const UnavailabilityDatesParty1: UnavailabilityRangeModel[] = [{
      unavailableFromDate: '2021-12-10T09:00:00.000Z',
      unavailableToDate: '2021-12-31T09:00:00.000Z',
      unavailabilityType: UnavailabilityType.ALL_DAY
    }];
    const UnavailabilityDatesParty2: UnavailabilityRangeModel[] = [{
      unavailableFromDate: '2021-12-20T09:00:00.000Z',
      unavailableToDate: '2021-12-31T09:00:00.000Z',
      unavailabilityType: UnavailabilityType.ALL_DAY
    }];
    const party1: PartyDetailsModel[] = [{
      partyID: 'party1',
      partyType: PartyType.IND,
      partyRole: 'partyRole',
      unavailabilityRanges: UnavailabilityDatesParty1
    },
    {
      partyID: 'party2',
      partyType: PartyType.ORG,
      partyRole: 'partyRole',
      unavailabilityRanges: UnavailabilityDatesParty2
    }];

    const partiesNotAvailableDates = HearingsUtils.getPartiesNotAvailableDates(party1
    );
    expect(partiesNotAvailableDates.length).toEqual(22);
  });

  describe('HearingLength', () => {
    it('should transform hearing stage days and hours', () => {
      expect(HearingsUtils.getHearingLength(960)).toEqual('2 Days 4 Hours');
    });

    it('should transform hearing stage days and minutes', () => {
      expect(HearingsUtils.getHearingLength(750)).toEqual('2 Days 30 Minutes');
    });

    it('should transform hearing stage both hours and minutes', () => {
      expect(HearingsUtils.getHearingLength(70)).toEqual('1 Hour 10 Minutes');
    });

    it('should transform hearing stage empty', () => {
      expect(HearingsUtils.getHearingLength(null)).toEqual('');
    });
  });

  describe('HearingWindowModel', () => {
    it('should return HearingWindowModel as null when hearingWindow is an empty object', () => {
      const hearingRequestMainModel: HearingRequestMainModel = {
        ...initialState.hearings.hearingRequest.hearingRequestMainModel,
        hearingDetails: {
          ...initialState.hearings.hearingRequest.hearingRequestMainModel.hearingDetails,
          hearingWindow: null
        }
      };
      expect(
        HearingsUtils.getHRMHearingWindow(hearingRequestMainModel)
      ).toBeNull();
    });

    it('should return HearingWindowModel from ServiceHearingVaulesModel when hearingWindow is not empty', () => {
      const hearingRequestMainModel: HearingRequestMainModel = {
        ...initialState.hearings.hearingRequest.hearingRequestMainModel,
        hearingDetails: {
          ...initialState.hearings.hearingRequest.hearingRequestMainModel.hearingDetails,
          hearingWindow: {
            dateRangeStart: '2022-11-23T09:00:00.000Z',
            dateRangeEnd: '2022-11-30T09:00:00.000Z',
            firstDateTimeMustBe: '2022-12-01T09:00:00.000Z'
          }
        }
      };
      expect(
        HearingsUtils.getHRMHearingWindow(hearingRequestMainModel)
      ).toEqual(hearingRequestMainModel.hearingDetails.hearingWindow);
    });
  });

  describe('getPartyNameFormatted', () => {
    it('should getPartyNameFormatted return empty string', () => {
      const individualDetails = null;
      expect(HearingsUtils.getPartyNameFormatted(individualDetails).trim()).toEqual('');
    });

    it('should getPartyNameFormatted return formatted party name', () => {
      const individualDetails = initialState.hearings.hearingRequest.hearingRequestMainModel.partyDetails[0].individualDetails;
      expect(HearingsUtils.getPartyNameFormatted(individualDetails)).toEqual('Jane Smith');
    });
  });

  describe('hasPartyNameChanged', () => {
    it('should hasPartyNameChanged return true', () => {
      const partyInHMC: PartyDetailsModel = {
        partyID: 'P1',
        partyType: PartyType.IND,
        partyRole: 'appellant',
        partyName: 'Jane Smith',
        individualDetails: {
          title: 'Mrs',
          firstName: 'Jane',
          lastName: 'Smith',
          preferredHearingChannel: 'inPerson'
        }
      };
      const partyInSHV: PartyDetailsModel = {
        partyID: 'P1',
        partyType: PartyType.IND,
        partyRole: 'appellant',
        partyName: 'Jane Rogers',
        individualDetails: {
          title: 'Mrs',
          firstName: 'Jane',
          lastName: 'Rogers',
          preferredHearingChannel: 'inPerson'
        }
      };
      const hasPartyNameChangedResult = HearingsUtils.hasPartyNameChanged(partyInHMC, partyInSHV);
      expect(hasPartyNameChangedResult).toEqual(true);
    });

    it('should hasPartyNameChanged return false', () => {
      const partyInHMC: PartyDetailsModel = {
        partyID: 'P1',
        partyType: PartyType.IND,
        partyRole: 'appellant',
        partyName: 'Jane Smith',
        individualDetails: {
          title: 'Mrs',
          firstName: 'Jane',
          lastName: 'Smith',
          preferredHearingChannel: 'inPerson'
        }
      };
      const partyInSHV: PartyDetailsModel = {
        partyID: 'P1',
        partyType: PartyType.IND,
        partyRole: 'appellant',
        partyName: 'Jane Smith',
        individualDetails: {
          title: 'Mrs',
          firstName: 'Jane',
          lastName: 'Smith',
          preferredHearingChannel: 'inPerson'
        }
      };
      const hasPartyNameChangedResult = HearingsUtils.hasPartyNameChanged(partyInHMC, partyInSHV);
      expect(hasPartyNameChangedResult).toEqual(false);
    });
  });
  describe('Test of date functionality', () => {
    it('Date comparison finds dates to be the same', () => {
      const date1 = '2022-11-23T12:59:59.222Z';
      const date2 = '2022-11-23T11:11:11.111Z';
      expect(HearingsUtils.hasDateChanged(date1, date2)).toEqual(false);
    });

    it('Date comparison finds dates to be the different', () => {
      const date1 = '2022-11-22T09:00:00.000Z';
      const date2 = '2022-11-23T09:00:00.000Z';
      expect(HearingsUtils.hasDateChanged(date1, date2)).toEqual(true);
    });
    it('Date comparison null values', () => {
      const date1 = null;
      const date2 = null;
      expect(HearingsUtils.hasDateChanged(date1, date2)).toEqual(false);
    });

    it('Date comparison mix of null and undefined', () => {
      const date1 = null;
      const date2 = undefined;
      expect(HearingsUtils.hasDateChanged(date1, date2)).toEqual(false);
    });
  });

  describe('Test of hasHearingPriorityChanged functionality', () => {
    it('Prioritys entered are the same ', () => {
      const priority1 = 'Standard';
      const priority2 = 'Standard';
      expect(HearingsUtils.hasHearingPriorityChanged(priority1, priority2)).toEqual(false);
    });

    it('Prioritys entered differ', () => {
      const priority1 = 'Standard';
      const priority2 = 'standard';
      expect(HearingsUtils.hasHearingPriorityChanged(priority1, priority2)).toEqual(true);
    });
  });
  describe('Test of hasDurationChanged functionality', () => {
    it('Durations entered are the same ', () => {
      const duration1 = 120;
      const duration2 = 120;
      expect(HearingsUtils.hasHearingDurationChanged(duration1, duration2)).toEqual(false);
    });

    it('Durations entered differ.', () => {
      const duration1 = 120;
      const duration2 = 121;
      expect(HearingsUtils.hasHearingDurationChanged(duration1, duration2)).toEqual(true);
    });
  });
  describe('Test of change of unavailability dates', () => {
    it('should return no difference to the date unavailability dates supplied.', () => {
      const UnavailabilityDatesParty1: UnavailabilityRangeModel[] = [{
        unavailableFromDate: '2021-12-10T09:00:00.000Z',
        unavailableToDate: '2021-12-31T09:00:00.000Z',
        unavailabilityType: UnavailabilityType.ALL_DAY
      }];
      const UnavailabilityDatesParty2: UnavailabilityRangeModel[] = [{
        unavailableFromDate: '2021-12-20T09:00:00.000Z',
        unavailableToDate: '2021-12-31T09:00:00.000Z',
        unavailabilityType: UnavailabilityType.ALL_DAY
      }];
      const party1: PartyDetailsModel[] = [{
        partyID: 'party1',
        partyType: PartyType.IND,
        partyRole: 'partyRole',
        unavailabilityRanges: UnavailabilityDatesParty1
      },
      {
        partyID: 'party2',
        partyType: PartyType.ORG,
        partyRole: 'partyRole',
        unavailabilityRanges: UnavailabilityDatesParty2
      }];

      const UnavailabilityDatesParty3: UnavailabilityRangeModel[] = [{
        unavailableFromDate: '2021-12-10T09:00:00.000Z',
        unavailableToDate: '2021-12-31T09:00:00.000Z',
        unavailabilityType: UnavailabilityType.ALL_DAY
      }];
      const UnavailabilityDatesParty4: UnavailabilityRangeModel[] = [{
        unavailableFromDate: '2021-12-20T09:00:00.000Z',
        unavailableToDate: '2021-12-31T09:00:00.000Z',
        unavailabilityType: UnavailabilityType.ALL_DAY
      }];
      const party2: PartyDetailsModel[] = [{
        partyID: 'party1',
        partyType: PartyType.IND,
        partyRole: 'partyRole',
        unavailabilityRanges: UnavailabilityDatesParty3
      },
      {
        partyID: 'party2',
        partyType: PartyType.ORG,
        partyRole: 'partyRole',
        unavailabilityRanges: UnavailabilityDatesParty4
      }];

      expect(HearingsUtils.hasPartyUnavailabilityDatesChanged(party1, party2)).toEqual(false);
    });

    it('should return a difference to the date unavailability dates supplied.', () => {
      const UnavailabilityDatesParty1: UnavailabilityRangeModel[] = [{
        unavailableFromDate: '2021-12-09T09:00:00.000Z',
        unavailableToDate: '2021-12-31T09:00:00.000Z',
        unavailabilityType: UnavailabilityType.ALL_DAY
      }];
      const UnavailabilityDatesParty2: UnavailabilityRangeModel[] = [{
        unavailableFromDate: '2021-12-20T09:00:00.000Z',
        unavailableToDate: '2021-12-31T09:00:00.000Z',
        unavailabilityType: UnavailabilityType.ALL_DAY
      }];
      const party1: PartyDetailsModel[] = [{
        partyID: 'party1',
        partyType: PartyType.IND,
        partyRole: 'partyRole',
        unavailabilityRanges: UnavailabilityDatesParty1
      },
      {
        partyID: 'party2',
        partyType: PartyType.ORG,
        partyRole: 'partyRole',
        unavailabilityRanges: UnavailabilityDatesParty2
      }];

      const UnavailabilityDatesParty3: UnavailabilityRangeModel[] = [{
        unavailableFromDate: '2021-12-10T09:00:00.000Z',
        unavailableToDate: '2021-12-31T09:00:00.000Z',
        unavailabilityType: UnavailabilityType.ALL_DAY
      }];
      const UnavailabilityDatesParty4: UnavailabilityRangeModel[] = [{
        unavailableFromDate: '2021-12-20T09:00:00.000Z',
        unavailableToDate: '2021-12-31T09:00:00.000Z',
        unavailabilityType: UnavailabilityType.ALL_DAY
      }];
      const party2: PartyDetailsModel[] = [{
        partyID: 'party1',
        partyType: PartyType.IND,
        partyRole: 'partyRole',
        unavailabilityRanges: UnavailabilityDatesParty3
      },
      {
        partyID: 'party2',
        partyType: PartyType.ORG,
        partyRole: 'partyRole',
        unavailabilityRanges: UnavailabilityDatesParty4
      }];

      expect(HearingsUtils.hasPartyUnavailabilityDatesChanged(party1, party2)).toEqual(true);
    });
  });
  describe('Test of change of hearing window dates', () => {
    it('no difference in first date time must be, no change in hearing window found', () => {
      const hearingWindow1: HearingWindowModel = {
        firstDateTimeMustBe: '2021-12-20T09:00:00.000Z'
      };
      const hearingWindow2: HearingWindowModel = {
        firstDateTimeMustBe: '2021-12-20T09:00:00.000Z'
      };
      expect(HearingsUtils.hasHearingDatesChanged(hearingWindow1, hearingWindow2)).toEqual(false);
    });
    it('A difference in first date time must be, change in hearing window found', () => {
      const hearingWindow1: HearingWindowModel = {
        firstDateTimeMustBe: '2021-12-21T09:00:00.000Z'
      };
      const hearingWindow2: HearingWindowModel = {
        firstDateTimeMustBe: '2021-12-20T09:00:00.000Z'
      };
      expect(HearingsUtils.hasHearingDatesChanged(hearingWindow1, hearingWindow2)).toEqual(true);
    });
    it('no difference in hearing date range, no change in hearing window found', () => {
      const hearingWindow1: HearingWindowModel = {
        dateRangeStart: '2021-12-20T09:00:00.000Z',
        dateRangeEnd: '2021-12-20T09:00:00.000Z'
      };
      const hearingWindow2: HearingWindowModel = {
        dateRangeStart: '2021-12-20T09:00:00.000Z',
        dateRangeEnd: '2021-12-20T09:00:00.000Z'
      };
      expect(HearingsUtils.hasHearingDatesChanged(hearingWindow1, hearingWindow2)).toEqual(false);
    });
    it('a difference in hearing end date, a change in hearing window found', () => {
      const hearingWindow1: HearingWindowModel = {
        dateRangeStart: '2021-12-20T09:00:00.000Z',
        dateRangeEnd: '2021-12-21T09:00:00.000Z'
      };
      const hearingWindow2: HearingWindowModel = {
        dateRangeStart: '2021-12-20T09:00:00.000Z',
        dateRangeEnd: '2021-12-20T09:00:00.000Z'
      };
      expect(HearingsUtils.hasHearingDatesChanged(hearingWindow1, hearingWindow2)).toEqual(true);
    });
    it('a difference in hearing start date, a change in hearing window found', () => {
      const hearingWindow1: HearingWindowModel = {
        dateRangeStart: '2021-12-20T09:00:00.000Z',
        dateRangeEnd: '2021-12-21T09:00:00.000Z'
      };
      const hearingWindow2: HearingWindowModel = {
        dateRangeStart: '2021-12-18T09:00:00.000Z',
        dateRangeEnd: '2021-12-20T09:00:00.000Z'
      };
      expect(HearingsUtils.hasHearingDatesChanged(hearingWindow1, hearingWindow2)).toEqual(true);
    });
  });
});

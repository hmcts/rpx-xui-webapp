import { initialState } from '../hearing.test.data';
import { KEY_MODE } from '../models/hearingConditions';
import { HearingDayScheduleModel } from '../models/hearingDaySchedule.model';
import { HearingRequestMainModel } from '../models/hearingRequestMain.model';
import { Mode, PartyType, UnavailabilityType } from '../models/hearings.enum';
import { PartyDetailsModel } from '../models/partyDetails.model';
import { HearingsUtils } from './hearings.utils';
import { UnavailabilityRangeModel } from '../models/unavailabilityRange.model';

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
        HearingsUtils.getHearingWindow(hearingRequestMainModel)
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
        HearingsUtils.getHearingWindow(hearingRequestMainModel)
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
});

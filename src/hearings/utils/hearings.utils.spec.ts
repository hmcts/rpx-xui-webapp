import { initialState } from '../hearing.test.data';
import { HearingConditions, KEY_MODE } from '../models/hearingConditions';
import { HearingDayScheduleModel } from '../models/hearingDaySchedule.model';
import { HearingRequestMainModel } from '../models/hearingRequestMain.model';
import { Mode, PartyType } from '../models/hearings.enum';
import { PropertiesUpdatedOnPageVisit } from '../models/hearingsUpdateMode.enum';
import { PartyDetailsModel } from '../models/partyDetails.model';
import { HearingsUtils } from './hearings.utils';

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

  describe('HearingWindowModel', () => {
    it('should return HearingWindowModel as null when hearingWindow is an empty object', () => {
      const propertiesUpdatedOnPageVisit: PropertiesUpdatedOnPageVisit = null;
      const hearingCondition: HearingConditions = {
        mode: Mode.VIEW_EDIT
      };
      const hearingRequestMainModel: HearingRequestMainModel = {
        ...initialState.hearings.hearingRequest.hearingRequestMainModel,
        hearingDetails: {
          ...initialState.hearings.hearingRequest.hearingRequestMainModel.hearingDetails,
          hearingWindow: null
        }
      };
      expect(
        HearingsUtils.getHearingWindow(propertiesUpdatedOnPageVisit, hearingCondition, hearingRequestMainModel)
      ).toBeNull();
    });

    it('should return HearingWindowModel from ServiceHearingVaulesModel when hearingWindow is not empty', () => {
      const propertiesUpdatedOnPageVisit: PropertiesUpdatedOnPageVisit = null;
      const hearingCondition: HearingConditions = {
        mode: Mode.VIEW_EDIT
      };
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
        HearingsUtils.getHearingWindow(propertiesUpdatedOnPageVisit, hearingCondition, hearingRequestMainModel)
      ).toEqual(hearingRequestMainModel.hearingDetails.hearingWindow);
    });
  });

  describe('HearingWindowModel - Hearing manual amendment enabled', () => {
    it('should return HearingWindowModel as null when hearingWindow is an empty object and hearing manual amendment is enabled', () => {
      const propertiesUpdatedOnPageVisit: PropertiesUpdatedOnPageVisit = {
        caseFlags: null,
        parties: null,
        hearingWindow: null,
        afterPageVisit: {
          reasonableAdjustmentChangesRequired: false,
          nonReasonableAdjustmentChangesRequired: false,
          partyDetailsChangesRequired: false,
          hearingWindowChangesRequired: false
        }
      };
      const hearingCondition: HearingConditions = {
        mode: Mode.VIEW_EDIT,
        isHearingAmendmentsEnabled: true
      };
      const hearingRequestMainModel: HearingRequestMainModel = {
        ...initialState.hearings.hearingRequest.hearingRequestMainModel,
        hearingDetails: {
          ...initialState.hearings.hearingRequest.hearingRequestMainModel.hearingDetails,
          hearingWindow: null
        }
      };
      expect(
        HearingsUtils.getHearingWindow(propertiesUpdatedOnPageVisit, hearingCondition, hearingRequestMainModel)
      ).toBeNull();
    });

    it('should return HearingWindowModel from ServiceHearingVaulesModel when hearingWindow is not empty and hearing manual amendment is enabled', () => {
      const propertiesUpdatedOnPageVisit: PropertiesUpdatedOnPageVisit = {
        caseFlags: null,
        parties: null,
        hearingWindow: {
          dateRangeStart: '2022-11-23T09:00:00.000Z',
          dateRangeEnd: '2022-11-30T09:00:00.000Z',
          firstDateTimeMustBe: '2022-12-02T09:00:00.000Z'
        },
        afterPageVisit: {
          reasonableAdjustmentChangesRequired: false,
          nonReasonableAdjustmentChangesRequired: false,
          partyDetailsChangesRequired: false,
          hearingWindowChangesRequired: true
        }
      };
      const hearingCondition: HearingConditions = {
        mode: Mode.VIEW_EDIT,
        isHearingAmendmentsEnabled: true
      };
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
        HearingsUtils.getHearingWindow(propertiesUpdatedOnPageVisit, hearingCondition, hearingRequestMainModel)
      ).toEqual(propertiesUpdatedOnPageVisit.hearingWindow);
    });
  });
});

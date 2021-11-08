import { CaseHearingModel } from '../../models/caseHearing.model';
import { CaseHearingsMainModel } from '../../models/caseHearingsMain.model';
import { HearingDayScheduleModel } from '../../models/hearingDaySchedule.model';
import { EXUISectionStatusEnum, HearingListingStatusEnum } from '../../models/hearings.enum';
import * as fromActions from '../actions/hearings.action';
import * as fromReducer from './hearings.reducer';

describe('Hearings Reducer', () => {

  describe('Actions', () => {

    describe('Reset action', () => {
      it('should set correct object', () => {
        const initialState = fromReducer.initialState;
        const action = new fromActions.Reset();
        const hearingsState = fromReducer.hearingsReducer(initialState, action);
        expect(hearingsState).toEqual(initialState);
      });
    });

    describe('Load all hearings success action', () => {
      it('should set correct object', () => {
        const initialState = fromReducer.initialState;
        const HEARING_DAY_SCHEDULE_1: HearingDayScheduleModel = {
          hearingStartDateTime: '2021-05-01T16:00:00.000+0000',
          hearingEndDateTime: '2021-05-04T16:00:00.000+0000',
          listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7ba5',
          hearingVenueId: 'venue 1',
          hearingRoomId: 'room 1',
          hearingPanel: ['child'],
        };
        const CASE_HEARING_1: CaseHearingModel = {
          hearingID: 'h111111',
          hearingType: 'hearing type 1',
          hearingRequestDateTime: '2021-09-01T16:00:00.000+0000',
          hmcStatus: 'pending',
          lastResponseReceivedDateTime: '2021-05-05T16:00:00.000+0000',
          responseVersion: 'rv1',
          listAssistCaseStatus: '',
          hearingListingStatus: HearingListingStatusEnum.CANCELLED,
          exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
          hearingDaySchedule: [HEARING_DAY_SCHEDULE_1],
        };
        const HEARINGS_LIST: CaseHearingsMainModel = {
          hmctsServiceID: 'SSCS',
          caseRef: '1568642646198441',
          caseHearings: [CASE_HEARING_1],
        };
        const action = new fromActions.LoadAllHearingsSuccess(HEARINGS_LIST);
        const hearingsState = fromReducer.hearingsReducer(initialState, action);
        expect(hearingsState.caseHearingsMainModel).toEqual(HEARINGS_LIST);
      });
    });
  });
});

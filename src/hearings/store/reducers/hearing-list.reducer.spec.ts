import { HearingDayScheduleModel } from '../../models/hearingDaySchedule.model';
import { HearingListModel } from '../../models/hearingList.model';
import { HearingListMainModel } from '../../models/hearingListMain.model';
import { EXUISectionStatusEnum, HearingListingStatusEnum } from '../../models/hearings.enum';
import * as fromHearingListActions from '../actions/hearing-list.action';
import * as fromHearingListReducer from './hearing-list.reducer';

describe('Hearing List Reducer', () => {

  describe('Actions', () => {

    describe('Reset action', () => {
      it('should set correct object', () => {
        const initialState = fromHearingListReducer.initialHearingListState;
        const action = new fromHearingListActions.ResetHearingList();
        const hearingsState = fromHearingListReducer.hearingListReducer(initialState, action);
        expect(hearingsState).toEqual(initialState);
      });
    });

    describe('Load all hearings success action', () => {
      it('should set correct object', () => {
        const initialState = fromHearingListReducer.initialHearingListState;
        const HEARING_DAY_SCHEDULE_1: HearingDayScheduleModel = {
          hearingStartDateTime: '2021-05-01T16:00:00.000Z',
          hearingEndDateTime: '2021-05-04T16:00:00.000Z',
          listAssistSessionID: '0d22d836-b25a-11eb-a18c-f2d58a9b7ba5',
          hearingVenueId: 'venue 1',
          hearingRoomId: 'room 1',
          hearingJudgeId: 'child',
          panelMemberIds: ['child'],
          attendees: [],
        };
        const CASE_HEARING_1: HearingListModel = {
          hearingID: 'h111111',
          hearingType: 'hearing type 1',
          hearingRequestDateTime: '2021-05-05T16:00:00.000Z',
          lastResponseReceivedDateTime: '',
          hmcStatus: 'pending',
          responseVersion: 'rv1',
          listAssistCaseStatus: '',
          hearingListingStatus: HearingListingStatusEnum.CANCELLED,
          exuiSectionStatus: EXUISectionStatusEnum.UPCOMING,
          hearingIsLinkedFlag: true,
          hearingGroupRequestId: null,
          hearingDaySchedule: [HEARING_DAY_SCHEDULE_1],
        };
        const HEARINGS_LIST: HearingListMainModel = {
          hmctsServiceID: 'BBA3',
          caseRef: '1568642646198441',
          caseHearings: [CASE_HEARING_1],
        };
        const action = new fromHearingListActions.LoadAllHearingsSuccess(HEARINGS_LIST);
        const hearingsState = fromHearingListReducer.hearingListReducer(initialState, action);
        expect(hearingsState.hearingListMainModel).toEqual(HEARINGS_LIST);
      });
    });
  });
});

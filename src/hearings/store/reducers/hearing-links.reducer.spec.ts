import {ServiceLinkedCasesModel} from '../../models/linkHearings.model';
import * as fromHearingLinksActions from '../actions/hearing-links.action';
import * as fromHearingLinksReducer from './hearing-links.reducer';

describe('Hearing Links Reducer', () => {

  describe('Actions', () => {

    describe('Reset action', () => {
      it('should reset init state', () => {
        const initialState = fromHearingLinksReducer.initialHearingLinksState;
        const action = new fromHearingLinksActions.ResetHearingLinks();
        const hearingsState = fromHearingLinksReducer.hearingLinksReducer(initialState, action);
        expect(hearingsState).toEqual(initialState);
      });
    });

    describe('Load all service linked case success action', () => {
      it('should set correct object', () => {
        const initialState = fromHearingLinksReducer.initialHearingLinksState;
        const SERVICE_LINKED_CASES: ServiceLinkedCasesModel[] = [{
          caseReference: '1111222233334444',
          caseName: 'Jane Smith',
          reasonsForLink: ['reason1', 'reason2']
        }, {
          caseReference: '1111222233334445',
          caseName: 'Pete Smith',
          reasonsForLink: ['reason3', 'reason4']
        }];
        const action = new fromHearingLinksActions.LoadServiceLinkedCasesSuccess(SERVICE_LINKED_CASES);
        const hearingsState = fromHearingLinksReducer.hearingLinksReducer(initialState, action);
        expect(hearingsState.serviceLinkedCases).toEqual(SERVICE_LINKED_CASES);
      });
    });

    describe('Load all service linked case failure action', () => {
      it('should set correct object', () => {
        const initialState = fromHearingLinksReducer.initialHearingLinksState;
        const ERROR = {
          status: 500,
          message: 'failed',
        };
        const action = new fromHearingLinksActions.LoadServiceLinkedCasesFailure(ERROR);
        const hearingsState = fromHearingLinksReducer.hearingLinksReducer(initialState, action);
        expect(hearingsState.lastError).toEqual(ERROR);
      });
    });
  });
});

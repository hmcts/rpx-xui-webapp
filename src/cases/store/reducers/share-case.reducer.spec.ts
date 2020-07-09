import { SharedCase } from '@hmcts/rpx-xui-common-lib/lib/models/case-share.model';
import * as fromActions from '../actions/share-case.action';
import * as fromReducer from './share-case.reducer';

describe('Share case reducer', () => {
  describe('Actions', () => {
    let initialState;

    beforeEach(() => {
      initialState = fromReducer.initialSharedCasesState;
    });

    it('should set correct object', () => {
      const payload = {
        sharedCases: []
      };
      const action = new fromActions.AddShareCases(payload);
      const state = fromReducer.shareCasesReducer(initialState, action);
      expect(state).toBeDefined();
    });

    it('should save selected share cases into store', () => {
      const selectedCases = {
        sharedCases: [{caseId: '1', caseTitle: 'James123'}, {caseId: '2', caseTitle: 'Steve321'}]
      };
      const action = new fromActions.AddShareCases(selectedCases);
      const state = fromReducer.shareCasesReducer(initialState, action);
      expect(state.shareCases.length).toEqual(2);
    });

    it('should save selected share cases without duplication', () => {
      const selectedCases = {
        sharedCases: [{caseId: '1', caseTitle: 'James123'}, {caseId: '2', caseTitle: 'Steve321'}]
      };
      const addedSelectedCases = {
        sharedCases: [{caseId: '2', caseTitle: 'Steve321'}, {caseId: '3', caseTitle: 'Kenny456'}]
      };
      const oldAction = new fromActions.AddShareCases(selectedCases);
      const oldState = fromReducer.shareCasesReducer(initialState, oldAction);
      const newAction = new fromActions.AddShareCases(addedSelectedCases);
      const newState = fromReducer.shareCasesReducer(oldState, newAction);
      expect(newState.shareCases.length).toEqual(3);
    });

    it('should delete a case from store', () => {
      const selectedCases = {
        sharedCases: [{caseId: '1', caseTitle: 'James123'}, {caseId: '2', caseTitle: 'Steve321'}]
      };
      const oldAction = new fromActions.AddShareCases(selectedCases);
      const oldState = fromReducer.shareCasesReducer(initialState, oldAction);
      const payload = {
        caseId: '1'
      };
      const newAction = new fromActions.DeleteAShareCase(payload);
      const newState = fromReducer.shareCasesReducer(oldState, newAction);
      expect(newState.shareCases.length).toEqual(1);
    });

    it('should get state properties', () => {
      const selectedCases = {
        sharedCases: [{caseId: '1', caseTitle: 'James123'}, {caseId: '2', caseTitle: 'Steve321'}]
      };
      const action = new fromActions.AddShareCases(selectedCases);
      const state = fromReducer.shareCasesReducer(initialState, action);
      expect(fromReducer.getShareCases(state).length).toEqual(2);
    });

    it('should sort users', () => {
      const sharedCases = [{
        caseId: '9417373995765131',
        caseTitle: 'Neha Vs Sanjet',
        sharedWith: [
          {
            idamId: 'u444444',
            firstName: 'Shaun',
            lastName: 'Coldwell',
            email: 'shaun.coldwell@woodford.com'
          },
          {
            idamId: 'u333333',
            firstName: 'James',
            lastName: 'Priest',
            email: 'james.priest@woodford.com'
          }
        ]
      },
        {
          caseId: '9417373995765133',
          caseTitle: 'Sam Green Vs Williams Lee',
          sharedWith: [
            {
              idamId: 'u666666',
              firstName: 'Kate',
              lastName: 'Grant',
              email: 'kate.grant@lambbrooks.com'
            },
            {
              idamId: 'u888888',
              firstName: 'Joel',
              lastName: 'Molloy',
              email: 'joel.molloy@lambbrooks.com'
            }
          ]
        }];
      const sortedCases: SharedCase[] = fromReducer.sortedUserInCases(sharedCases);
      expect(sortedCases[0].caseId).toEqual('9417373995765131');
      expect(sortedCases[0].sharedWith[0].firstName).toEqual('James');
      expect(sortedCases[0].sharedWith[1].firstName).toEqual('Shaun');
      expect(sortedCases[1].caseId).toEqual('9417373995765133');
      expect(sortedCases[1].sharedWith[0].firstName).toEqual('Joel');
      expect(sortedCases[1].sharedWith[1].firstName).toEqual('Kate');
    });
  });
});

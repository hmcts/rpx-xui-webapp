import * as fromReducer from './share-case.reducer';
import * as fromActions from '../actions/share-case.action';

describe('Share case reducer', () => {
  describe('Actions', () => {
    let initialState;

    beforeEach(() => {
      initialState = fromReducer.initialSharedCasesState;
    });

    it('should set correct object', () => {
      const action = new fromActions.AddShareCases([]);
      const state = fromReducer.shareCasesReducer(initialState, action);
      expect(state).toBeDefined();
    });

    it('should save selected share cases into store', () => {
      const selectedCases = [{caseId: '1', caseTitle: 'James123'}, {caseId: '2', caseTitle: 'Steve321'}];
      const action = new fromActions.AddShareCases(selectedCases);
      const state = fromReducer.shareCasesReducer(initialState, action);
      expect(state.shareCases.length).toEqual(2);
    });

    it('should save selected share cases without duplication', () => {
      const selectedCases = [{caseId: '1', caseTitle: 'James123'}, {caseId: '2', caseTitle: 'Steve321'}];
      const addedSelectedCases = [{caseId: '2', caseTitle: 'Steve321'}, {caseId: '3', caseTitle: 'Kenny456'}];
      const oldAction = new fromActions.AddShareCases(selectedCases);
      const oldState = fromReducer.shareCasesReducer(initialState, oldAction);
      const newAction = new fromActions.AddShareCases(addedSelectedCases);
      const newState = fromReducer.shareCasesReducer(oldState, newAction);
      expect(newState.shareCases.length).toEqual(3);
    });

    it('should delete a case from store', () => {
      const selectedCases = [{caseId: '1', caseTitle: 'James123'}, {caseId: '2', caseTitle: 'Steve321'}];
      const oldAction = new fromActions.AddShareCases(selectedCases);
      const oldState = fromReducer.shareCasesReducer(initialState, oldAction);
      const newAction = new fromActions.DeleteAShareCase('2');
      const newState = fromReducer.shareCasesReducer(oldState, newAction);
      expect(newState.shareCases.length).toEqual(1);
    });

    it('should get state properties', () => {
      const selectedCases = [{caseId: '1', caseTitle: 'James123'}, {caseId: '2', caseTitle: 'Steve321'}];
      const action = new fromActions.AddShareCases(selectedCases);
      const state = fromReducer.shareCasesReducer(initialState, action);
      expect(fromReducer.getShareCases(state).length).toEqual(2);
    });
  });
});

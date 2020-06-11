import * as fromReducer from './share-case.reducer';
import * as fromActions from '../actions/share-case.action';

describe('Share case reducer', () => {
  describe('Actions', () => {
    const initialState = fromReducer.initialSharedCasesState;
    it('should set correct object', () => {
      const action = new fromActions.AddShareCases([]);
      const state = fromReducer.shareCasesReducer(initialState, action);
      expect(state).toBeDefined();
    });

    it('should save selected share cases into store', () => {
      const selectedCases = [{
        case_id: '1',
        case_fields: {
          PersonFirstName: 'James',
          PersonLastName: 'Parker',
          PersonAddress: '123, Fake Street, Hexton, England, HX08 UTG'
        }
      }, {
        case_id: '2',
        case_fields: {
          PersonFirstName: 'Steve',
          PersonLastName: 'Harris',
          PersonAddress: 'Davidson House, Forbury Square, Reading, RG1 3EB'
        }
      }];
      const action = new fromActions.AddShareCases(selectedCases);
      const state = fromReducer.shareCasesReducer(initialState, action);
      expect(state.shareCases.length).toEqual(2);
    });

    it('should save selected share cases without duplication', () => {
      const selectedCases = [{
        case_id: '2',
        case_fields: {
          PersonFirstName: 'Steve',
          PersonLastName: 'Harris',
          PersonAddress: 'Davidson House, Forbury Square, Reading, RG1 3EB'
        }
      }, {
        case_id: '3',
        case_fields: {
          PersonFirstName: 'Kenny',
          PersonLastName: 'Mike',
          PersonAddress: '23, Nithsdale Road, Liverpool, L15 5AX'
        }
      }];
      const action = new fromActions.AddShareCases(selectedCases);
      const state = fromReducer.shareCasesReducer(initialState, action);
      expect(state.shareCases.length).toEqual(3);
    });

    it('should delete a case from store', () => {
      const action = new fromActions.DeleteAShareCase('2');
      const state = fromReducer.shareCasesReducer(initialState, action);
      expect(state.shareCases.length).toEqual(2);
    });

    it('should get state properties', () => {
      expect(fromReducer.getShareCases(initialState).length).toEqual(2);
    });
  });
});

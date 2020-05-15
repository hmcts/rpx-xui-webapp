import { caselistReducer, initialCaselistState } from './case-list.reducer';
import { ApplyCaselistFilter } from '../actions/case-list.action';

describe('CaseList Filter Reducer', () => {
    describe('undefined action', () => {
      it('should return the default state', () => {
        const action = {} as any;
        const state = caselistReducer(undefined, action);
        expect(state).toBe(initialCaselistState);
      });
    });
});


describe('[CaseListFilter] Applied', () => {
  it('should set correct object', () => {
    const action = new ApplyCaselistFilter({
      selected: {
      caseState: {
        id: '1',
        name: 'One',
        description: 'One desc'
      } ,
      jurisdiction: {
        id: '2',
        name: 'Two',
        description: 'Two desc',
        caseTypes: [],
      } ,
      caseType: {
        id: '3',
        name: 'case type',
        description: 'Case Type Desc',
        events: [],
        states: [],
        case_fields: [],
        jurisdiction: null,
        printEnabled: false
      }
    }
    });

    const state = caselistReducer(initialCaselistState, action);

    expect(state.loading).toEqual(true);
    expect(state.loaded).toEqual(false);
    expect(state.filter.caseState).toEqual({
        id: '1',
        name: 'One',
        description: 'One desc'
      });
    expect(state.filter.jurisdiction).toEqual({
        id: '2',
        name: 'Two',
        description: 'Two desc',
        caseTypes: [],
      });
    expect(state.filter.caseType).toEqual({
        id: '3',
        name: 'case type',
        description: 'Case Type Desc',
        events: [],
        states: [],
        case_fields: [],
        jurisdiction: null,
        printEnabled: false
      });
  });
});

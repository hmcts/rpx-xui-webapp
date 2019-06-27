import * as filterCaseList from './case-list.reducer';
import * as fromCases from '../actions/case-list.filter.action';

describe('CaseList Filter Reducer', () => {
    describe('undefined action', () => {
      it('should return the default state', () => {
        const { initialCaseFilterState } = filterCaseList;
        const action = {} as any;
        const state = filterCaseList.reducerCaseListFilter(undefined, action);
        expect(state).toBe(initialCaseFilterState);
      });
    });
});


describe('[CaseListFilter] Applied', () => {
  it('should set correct object', () => {
    const { initialCaseFilterState } = filterCaseList;
    const action = new fromCases.ApplyFilter({
      selected: {
      caseState: {
        id: '1',
        name: 'One',
        description: 'One desc'
      } ,
      jurisdiction: {
        id: '2',
        name: 'Two',
        description: 'Two desc'
      } ,
      caseType: {
        id: '3',
        name: 'case type',
        description: 'Case Type Desc'
      }
    }
    });

    const state = filterCaseList.reducerCaseListFilter(initialCaseFilterState, action);

    expect(state.loading).toEqual(true);
    expect(state.loaded).toEqual(false);
    expect(state.caseState).toEqual({
        id: '1',
        name: 'One',
        description: 'One desc'
      });
    expect(state.jurisdiction).toEqual({
        id: '2',
        name: 'Two',
        description: 'Two desc'
      });
    expect(state.caseType).toEqual({
        id: '3',
        name: 'case type',
        description: 'Case Type Desc'
      });
  });
});

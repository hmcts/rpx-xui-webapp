import * as filterCaseList from './case-list.reducer';
import * as fromCases from '../actions/case-list.action';
import { CaseTypeLite, Jurisdiction } from '@hmcts/ccd-case-ui-toolkit';

describe('CaseList Filter Reducer', () => {
    describe('undefined action', () => {
      it('should return the default state', () => {
        const { initialCaselistState } = filterCaseList;
        const action = {} as any;
        const state = filterCaseList.caselistReducer(undefined, action);
        expect(state).toBe(initialCaselistState);
      });
    });
});


describe('[CaseListFilter] Applied', () => {
  it('should set correct object', () => {
    const { initialCaselistState } = filterCaseList;
    const action = new fromCases.ApplyCaselistFilter({
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

    const state = filterCaseList.caselistReducer(initialCaselistState, action);

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

describe('[CaseListFilterForES] Applied', () => {
  it('should set correct object', () => {
    const { initialCaselistState } = filterCaseList;
    const action = new fromCases.ApplyCaselistFilterForES({
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

    const state = filterCaseList.caselistReducer(initialCaselistState, action);

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

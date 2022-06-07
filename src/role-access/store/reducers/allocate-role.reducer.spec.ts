import { Actions, AllocateRoleState, AllocateTo, DurationOfRole, RoleCategory } from '../../models';
import * as fromActions from '../actions/allocate-role.action';
import * as fromReducer from './allocate-role.reducer';

// Check testing
describe('Allocate Role Reducer', () => {

  // Check testing
  describe('Actions', () => {
    const STATE_DATA = {
      caseId: '111111',
      jurisdiction: 'IA',
      state: AllocateRoleState.CHOOSE_ROLE,
      typeOfRole: null,
      allocateTo: AllocateTo.RESERVE_TO_ME,
      person: null,
      durationOfRole: DurationOfRole.SEVEN_DAYS,
      action: Actions.Allocate,
      period: null
    };
    it('should set correct object', () => {
      const initialState = fromReducer.allocateRoleInitialState;
      const action = new fromActions.AllocateRoleChangeNavigation(AllocateRoleState.CHOOSE_ALLOCATE_TO);
      const state = fromReducer.allocateRoleReducer(initialState, action);
      expect(state).toBeDefined();
    });

    // Check testing
    describe('Change Navigation action', () => {
      it('should set correct object', () => {
        const initialState = fromReducer.allocateRoleInitialState;
        const action = new fromActions.AllocateRoleChangeNavigation(AllocateRoleState.CHOOSE_ALLOCATE_TO);
        const state = fromReducer.allocateRoleReducer(initialState, action);
        expect(state).toBeDefined();
        expect(state.state).toEqual(AllocateRoleState.CHOOSE_ALLOCATE_TO);
      });
    });

    // Check testing
    describe('Reset action', () => {
      it('should set correct object', () => {
        const initialState = fromReducer.allocateRoleInitialState;
        const action = new fromActions.AllocateRoleReset();
        const state = fromReducer.allocateRoleReducer(initialState, action);
        expect(state).toEqual(initialState);
      });
    });

    // Check testing
    describe('AllocateRoleSetInitData action', () => {
      it('should set correct object', () => {
        const initialState = fromReducer.allocateRoleInitialState;
        const action = new fromActions.AllocateRoleSetInitData({ caseId: '111111', jurisdiction: 'IA', roleCategory: RoleCategory.JUDICIAL });
        const state = fromReducer.allocateRoleReducer(initialState, action);
        expect(state.state).toEqual(AllocateRoleState.CHOOSE_ROLE);
      });
    });

    // Check testing
    describe('AllocateRoleSetInitData action', () => {
      it('should set correct object', () => {
        const initialState = fromReducer.allocateRoleInitialState;
        const action = new fromActions.AllocateRoleInstantiate(STATE_DATA);
        const state = fromReducer.allocateRoleReducer(initialState, action);
        expect(state.allocateTo).toEqual(AllocateTo.RESERVE_TO_ME);
      });
    });

    // Check testing
    describe('ChooseRoleAndGo action', () => {
      it('should set correct object', () => {
        const initialState = fromReducer.allocateRoleInitialState;
        const action = new fromActions.ChooseRoleAndGo({ typeOfRole: { id: 'lead-judge', name: 'Lead judge' }, allocateRoleState: AllocateRoleState.CHOOSE_ROLE });
        const state = fromReducer.allocateRoleReducer(initialState, action);
        expect(state.typeOfRole).toEqual({ id: 'lead-judge', name: 'Lead judge' });
      });
    });

    // Check testing
    describe('ChooseAllocateToAndGo action', () => {
      it('should set correct object', () => {
        const initialState = fromReducer.allocateRoleInitialState;
        const action = new fromActions.ChooseAllocateToAndGo({ allocateTo: AllocateTo.RESERVE_TO_ME, allocateRoleState: AllocateRoleState.SEARCH_PERSON });
        const state = fromReducer.allocateRoleReducer(initialState, action);
        expect(state.allocateTo).toEqual(AllocateTo.RESERVE_TO_ME);
      });
    });

    // Check testing
    describe('ChoosePersonAndGo action', () => {
      it('should set correct object', () => {
        const initialState = fromReducer.allocateRoleInitialState;
        const action = new fromActions.ChoosePersonAndGo({
          person: { id: '111111', name: 'test', domain: 'test' },
          allocateRoleState: AllocateRoleState.CHOOSE_DURATION,
          allocateTo: AllocateTo.ALLOCATE_TO_ANOTHER_PERSON
        });
        const state = fromReducer.allocateRoleReducer(initialState, action);
        expect(state.person).toEqual({ id: '111111', name: 'test', domain: 'test' });
      });
    });

    // Check testing
    describe('ChooseDurationAndGo action', () => {
      it('should set correct object', () => {
        const initialState = fromReducer.allocateRoleInitialState;
        const action = new fromActions.ChooseDurationAndGo({ durationOfRole: DurationOfRole.SEVEN_DAYS, period: { startDate: new Date('2021-12-17T03:24:00') }, allocateRoleState: AllocateRoleState.CHECK_ANSWERS });
        const state = fromReducer.allocateRoleReducer(initialState, action);
        expect(state.durationOfRole).toEqual(DurationOfRole.SEVEN_DAYS);
      });
    });
  });

});

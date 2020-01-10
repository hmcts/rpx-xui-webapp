import * as fromApp from './app-config.reducer';
import * as fromActions from '../actions/app.actions';
import {UserInterface, UserModel} from '../../models/user.model';

describe('AppReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromApp;
      const action = {} as any;
      const state = fromApp.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('APP_LOAD_CONFIG_SUCCESS action', () => {
    it('should set correct object', () => {
      const { initialState } = fromApp;
      const action = new fromActions.LoadConfigSuccess({status: null, caseId: 1234});
      const state = fromApp.reducer(initialState, action);

      expect(state.loading).toEqual(false);
      expect(state.loaded).toEqual(true);
      expect(state.config).toEqual({status: null, caseId: 1234});
    });
  });

  describe('GET_USER_DETAILS_SUCCESS action', () => {
    it('should set correct object', () => {
      const user = {
        email: 'some@email.com',
        orgId: '1224',
        roles: ['some-role'],
        userId: '122'
      };
      const { initialState } = fromApp;
      const action = new fromActions.GetUserDetailsSuccess(user);
      const state = fromApp.reducer(initialState, action);

      expect(state.loading).toEqual(false);
      expect(state.loaded).toEqual(true);
      expect(state.userDetails).toEqual(new UserModel(user));
    });
  });

  describe('SET_MODAL action', () => {
    it('should reset to init', () => {
      const { initialState } = fromApp;
      const payload = {session: {isVisible: false}}
      const action = new fromActions.SetModal(payload);
      const state = fromApp.reducer(initialState, action);

      expect(state.loading).toEqual(false);
      expect(state.loaded).toEqual(false);
      expect(state.modal).toEqual(payload);
    });
  });

});

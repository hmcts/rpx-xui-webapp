import * as fromApp from './app.actions';
import any = jasmine.any;
import {GET_USER_DETAILS_SUCCESS} from './app.actions';

describe('App Actions', () => {
  describe('Load Config', () => {
    it('should create an action', () => {
      const action = new fromApp.LoadConfig();

      expect({ ...action }).toEqual({
        type: fromApp.APP_LOAD_CONFIG,
      });
    });
  });

  describe('Load Config Success', () => {
    it('should create an action', () => {
      const payload = {prop: 'value'};
      const action = new fromApp.LoadConfigSuccess(payload);

      expect({ ...action }).toEqual({
        type: fromApp.APP_LOAD_CONFIG_SUCCESS,
        payload,
      });
    });
  });

  describe('Load Config Fail', () => {
    it('should create an action', () => {
      const payload = {error: 'value'};
      const action = new fromApp.LoadConfigFail(payload);

      expect({ ...action }).toEqual({
        type: fromApp.APP_LOAD_CONFIG_FAIL,
        payload,
      });
    });
  });

  describe('Start App Initializer ', () => {
    it('should create an action', () => {
      const action = new fromApp.StartAppInitilizer();

      expect({ ...action }).toEqual({
        type: fromApp.START_APP_INITIALIZER,
      });
    });
  });

  describe('Finish App Initializer ', () => {
    it('should create an action', () => {
      const action = new fromApp.FinishAppInitilizer();

      expect({ ...action }).toEqual({
        type: fromApp.FINISH_APP_INITIALIZER,
      });
    });
  });

  describe('Get user details', () => {
    it('should create an action', () => {
      const action = new fromApp.GetUserDetails();
      expect({ ...action }).toEqual({
        type: fromApp.GET_USER_DETAILS,
      });
    });
  });

  describe('Sign Out ', () => {
    it('should have sign out action', () => {
      const action = new fromApp.SignedOut();
      expect({ ...action }).toEqual({
        type: fromApp.SIGNED_OUT,
      });
    });

    it('should have sign out success action', () => {
      const action = new fromApp.SignedOutSuccess();
      expect({ ...action }).toEqual({
        type: fromApp.SIGNED_OUT_SUCCESS,
      });
    });
  });

  describe('Get user details success', () => {
    it('should create an action', () => {
      const payload = {email: 'test@test.com', userId: '1234'} as any;
      const action = new fromApp.GetUserDetailsSuccess(payload);
      expect({ ...action }).toEqual({
        type: fromApp.GET_USER_DETAILS_SUCCESS,
        payload
      });
    });
  });

  describe('Get user details failure', () => {
    it('should create an action', () => {
      const payload = {error: 'some error text', message: '', name: ''} as any;
      const action = new fromApp.GetUserDetailsFailure(payload);
      expect({ ...action }).toEqual({
        type: fromApp.GET_USER_DETAILS_FAIL,
        payload
      });
    });
  });
});

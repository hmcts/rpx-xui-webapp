import * as fromApp from './app.actions';

describe('App Actions', () => {
  describe('Load Config', () => {
    it('should create an action', () => {
      const action = new fromApp.LoadConfig();

      expect({ ...action }).toEqual({
        type: fromApp.APP_LOAD_CONFIG
      });
    });
  });

  describe('Load Config Success', () => {
    it('should create an action', () => {
      const payload = { prop: 'value' };
      const action = new fromApp.LoadConfigSuccess(payload);

      expect({ ...action }).toEqual({
        type: fromApp.APP_LOAD_CONFIG_SUCCESS,
        payload
      });
    });
  });

  describe('Load Config Fail', () => {
    it('should create an action', () => {
      const payload = { error: 'value' };
      const action = new fromApp.LoadConfigFail(payload);

      expect({ ...action }).toEqual({
        type: fromApp.APP_LOAD_CONFIG_FAIL,
        payload
      });
    });
  });

  describe('Start App Initializer ', () => {
    it('should create an action', () => {
      const action = new fromApp.StartAppInitilizer();

      expect({ ...action }).toEqual({
        type: fromApp.START_APP_INITIALIZER
      });
    });
  });

  describe('Finish App Initializer ', () => {
    it('should create an action', () => {
      const action = new fromApp.FinishAppInitilizer();

      expect({ ...action }).toEqual({
        type: fromApp.FINISH_APP_INITIALIZER
      });
    });
  });
});

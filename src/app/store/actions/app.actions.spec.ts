import { LoadConfig, APP_LOAD_CONFIG, LoadConfigSuccess, APP_LOAD_CONFIG_SUCCESS,
  LoadConfigFail, APP_LOAD_CONFIG_FAIL, StartAppInitilizer, START_APP_INITIALIZER, FinishAppInitilizer, FINISH_APP_INITIALIZER } from './app.actions';

describe('App Actions', () => {
  describe('Load Config', () => {
    it('should create an action', () => {
      const action = new LoadConfig();

      expect({ ...action }).toEqual({
        type: APP_LOAD_CONFIG,
      });
    });
  });

  describe('Load Config Success', () => {
    it('should create an action', () => {
      const payload = {prop: 'value'};
      const action = new LoadConfigSuccess(payload);

      expect({ ...action }).toEqual({
        type: APP_LOAD_CONFIG_SUCCESS,
        payload,
      });
    });
  });

  describe('Load Config Fail', () => {
    it('should create an action', () => {
      const payload = {error: 'value'};
      const action = new LoadConfigFail(payload);

      expect({ ...action }).toEqual({
        type: APP_LOAD_CONFIG_FAIL,
        payload,
      });
    });
  });

  describe('Start App Initializer ', () => {
    it('should create an action', () => {
      const action = new StartAppInitilizer();

      expect({ ...action }).toEqual({
        type: START_APP_INITIALIZER,
      });
    });
  });

  describe('Finish App Initializer ', () => {
    it('should create an action', () => {
      const action = new FinishAppInitilizer();

      expect({ ...action }).toEqual({
        type: FINISH_APP_INITIALIZER,
      });
    });
  });

});

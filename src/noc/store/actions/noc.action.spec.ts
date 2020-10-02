import * as fromNocAction from './noc.action';

describe('Noc Actions', () => {

  describe('ChangeNavigation', () => {
    it('should create an action', () => {
      const action = new fromNocAction.ChangeNavigation(null);
      expect(action.type).toBe(fromNocAction.CHANGE_NAVIGATION);
    });
  });

  describe('Reset', () => {
    it('should create an action', () => {
      const action = new fromNocAction.Reset();
      expect(action.type).toBe(fromNocAction.RESET);
    });
  });

  describe('SetCaseReference', () => {
    it('should create an action', () => {
      const action = new fromNocAction.SetCaseReference('');
      expect(action.type).toBe(fromNocAction.SET_CASE_REFERENCE);
    });
  });

});

import * as fromNocNavigation from './noc-navigation.action';

describe('Noc Navigation Actions', () => {
  describe('ChangeNavigation', () => {
    it('should create an action', () => {
      const action = new fromNocNavigation.ChangeNavigation({});
      expect(action.type).toBe(fromNocNavigation.CHANGE_NAVIGATION);
    });
  });
});

import * as fromHearingsAction from './hearings.action';

describe('Hearings Actions', () => {

  describe('Reset', () => {
    it('should create an action', () => {
      const action = new fromHearingsAction.Reset();
      expect(action.type).toBe(fromHearingsAction.RESET);
    });
  });

  describe('LoadAllHearings', () => {
    it('should load all hearings', () => {
      const action = new fromHearingsAction.LoadAllHearings('1111222233334444');
      expect(action.type).toBe(fromHearingsAction.LOAD_ALL_HEARINGS);
    });
  });
});

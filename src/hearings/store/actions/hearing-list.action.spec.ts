import * as fromHearingListAction from './hearing-list.action';

describe('Hearing List Actions', () => {

  describe('Reset', () => {
    it('should create an action', () => {
      const action = new fromHearingListAction.Reset();
      expect(action.type).toBe(fromHearingListAction.RESET);
    });
  });

  describe('LoadAllHearings', () => {
    it('should load all hearings', () => {
      const action = new fromHearingListAction.LoadAllHearings('1111222233334444');
      expect(action.type).toBe(fromHearingListAction.LOAD_ALL_HEARINGS);
    });
  });
});

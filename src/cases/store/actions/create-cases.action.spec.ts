import * as fromCreateCases from './create-cases.action';

describe('Create Cases Actions', () => {
  describe('Create Cases', () => {
    describe('Selection Changed', () => {
      it('should create an action', () => {
        const action = new fromCreateCases.SelectionChanged();

        expect({ ...action }).toEqual({
          type: fromCreateCases.SELECTION_CHANGED,
        });
      });
    });

    describe('Page Changed', () => {
      it('should create an action', () => {
        const payload = 10;
        const action = new fromCreateCases.PageChanged(payload);

        expect({ ...action }).toEqual({
          type: fromCreateCases.PAGE_CHANGED,
          payload,
        });
      });
    });

    describe('Apply Change', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new fromCreateCases.ApplyChange(payload);

        expect({ ...action }).toEqual({
          type: fromCreateCases.APPLY_CHANGE,
          payload,
        });
      });
    });

    describe('Reset Change', () => {
      it('should create an action', () => {
        const action = new fromCreateCases.ResetChange();

        expect({ ...action }).toEqual({
          type: fromCreateCases.RESET_CHANGE,
        });
      });
    });

  });

});

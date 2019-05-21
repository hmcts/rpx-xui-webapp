import * as fromCreateCases from './create-case.action';

describe('Create Cases Actions', () => {
  describe('Create Cases', () => {
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

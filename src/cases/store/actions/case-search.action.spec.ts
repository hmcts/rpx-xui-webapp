import * as fromSearchCases from './case-search.action';

describe('Case Search Actions', () => {
  describe('Search Cases filter', () => {
    describe('Jurisdiction Selected', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new fromSearchCases.JurisdictionSelected();
        expect({ ...action }).toEqual({
          type: fromSearchCases.JURISTDICTION_SELECTED
        });
      });
    });

    describe('Applied', () => {
      it('should create an action', () => {
        const action = new fromSearchCases.Applied();
        expect({ ...action }).toEqual({
          type: fromSearchCases.APPLIED
        });
      });
    });

    describe('Reset', () => {
      it('should create an action', () => {
        const action = new fromSearchCases.Reset();

        expect({ ...action }).toEqual({
          type: fromSearchCases.RESET
        });
      });
    });

  });

});

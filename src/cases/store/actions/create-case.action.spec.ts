import * as fromCreateCases from './create-case.action';
import {CREATE_CASE_FILTER_APPLY} from './create-case.action';
import {CREATE_CASE_FILTER_CHANGED} from './create-case.action';

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

    describe('Case Create Filter Apply', () => {
      it('should create an action', () => {
        const payload = {jurisdiction: 'SSCS'};
        const action = new fromCreateCases.CaseCreateFilterApply(payload);

        expect({ ...action }).toEqual({
          type: fromCreateCases.CREATE_CASE_FILTER_APPLY,
          payload
        });
      });
    });

    describe('Case Create Filter Changed', () => {
      it('should create an action', () => {
        const payload = {jurisdiction: 'SSCS'};
        const action = new fromCreateCases.CaseCreateFilterChanged(payload);

        expect({ ...action }).toEqual({
          type: fromCreateCases.CREATE_CASE_FILTER_CHANGED,
          payload
        });
      });
    });

  });

});

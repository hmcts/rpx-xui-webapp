
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { JURISDICTION_SELECTED, JurisdictionSelected, RESET, Reset, APPLIED, Applied, ApplySearchFilter, APPLY_SEARCH_FILTER,
  ApplySearchFilterSuccess, APPLY_SEARCH_FILTER_SUCCESS, ApplySearchFilterFail, APPLY_SEARCH_FILTER_FAIL } from './case-search.action';

describe('Case Search Actions', () => {
  describe('Search Cases filter', () => {
    describe('Jurisdiction Selected', () => {
      it('should create an action', () => {
        const action = new JurisdictionSelected();
        expect(action.type).toBe(JURISDICTION_SELECTED);
      });
    });

    describe('Applied', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new Applied({});
        expect({ ...action }).toEqual({
          type: APPLIED,
          payload
        });
      });
    });

    describe('Reset', () => {
      it('should create an action', () => {
        const action = new Reset();

        expect({ ...action }).toEqual({
          type: RESET
        });
      });
    });

    describe('ApplySearchFilter', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new ApplySearchFilter({});
        expect({ ...action }).toEqual({
          type: APPLY_SEARCH_FILTER,
          payload
        });
      });
    });

    describe('ApplySearchFilterSuccess', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new ApplySearchFilterSuccess({});
        expect({ ...action }).toEqual({
          type: APPLY_SEARCH_FILTER_SUCCESS,
          payload
        });
      });
    });

    describe('ApplySearchFilterFail', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new ApplySearchFilterFail({});
        expect({ ...action }).toEqual({
          type: APPLY_SEARCH_FILTER_FAIL,
          payload
        });
      });
    });

  });

});

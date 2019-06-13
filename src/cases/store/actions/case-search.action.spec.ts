
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { JURISDICTION_SELECTED, JurisdictionSelected, RESET, Reset, APPLIED, Applied } from './case-search.action';

describe('Case Search Actions', () => {
  // beforeEach(() => {
  //   TestBed.resetTestEnvironment();
  //   TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  //   TestBed.configureTestingModule({

  //   });
  // });
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

  });

});

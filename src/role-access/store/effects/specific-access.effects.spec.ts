import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Go } from '../../../app/store';
import { SpecificAccessEffects } from './specific-access.effects';
import * as specificAccessAction from '../actions/specific-access.action';

describe('Specific Access Effects', () => {
  let effects: SpecificAccessEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SpecificAccessEffects
      ]
    });
    effects = TestBed.get(SpecificAccessEffects);

  });

  describe('handleError', () => {
    it('should handle 500', () => {
      const action$ = SpecificAccessEffects.handleError({status: 500, message: 'error'}, specificAccessAction.ChangeSpecificAccessNavigation.toString());
      action$.subscribe(action => expect(action).toEqual(new Go({path: ['/service-down']})));
    });
  });

});

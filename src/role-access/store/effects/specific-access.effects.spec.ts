import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Go } from '../../../app/store';
import * as allocateRoleAction from '../actions/allocate-role.action';
import { AllocateRoleEffects } from './allocate-role.effects';
import { SpecificAccessEffects } from './specific-access.effects';

describe('Specific Access Effects', () => {
  let actions$;
  let effects: SpecificAccessEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$)
      ]
    });
    effects = TestBed.get(AllocateRoleEffects);

  });

  describe('handleError', () => {
    it('should handle 500', () => {
      const action$ = AllocateRoleEffects.handleError({status: 500, message: 'error'}, allocateRoleAction.ConfirmAllocation.toString());
      action$.subscribe(action => expect(action).toEqual(new Go({path: ['/service-down']})));
    });

    it('should handle 422', () => {
      const action$ = AllocateRoleEffects.handleError({status: 422, message: 'error'}, allocateRoleAction.ConfirmAllocation.toString());
      action$.subscribe(action => expect(action).toEqual(new Go({path: ['/role-access/user-not-assignable']})));
    });
  });

});

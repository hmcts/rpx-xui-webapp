import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { of } from 'rxjs';
import { Go } from '../../../app/store';
import * as routeAction from '../../../app/store/index';
import { Actions, AllocateRoleState, AllocateTo, DurationOfRole } from '../../models';
import { RoleAllocationMessageText } from '../../models/enums/allocation-text';
import { AllocateRoleService } from '../../services';
import * as allocateRoleAction from '../actions/allocate-role.action';
import { AllocateRoleEffects } from './allocate-role.effects';

describe('Allocate Role Effects', () => {
  let actions$;
  let effects: AllocateRoleEffects;
  const allocateRoleServiceMock = jasmine.createSpyObj('AllocateRoleService', [
    'confirmAllocation'
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AllocateRoleService,
          useValue: allocateRoleServiceMock,
        },
        AllocateRoleEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(AllocateRoleEffects);

  });

  describe('confirmAllocation$', () => {
    it('should return SetSubmissionSuccessPending', () => {

      const STATE_DATA = {
        caseId: '111111',
        state: AllocateRoleState.CHOOSE_ROLE,
        typeOfRole: null,
        allocateTo: AllocateTo.RESERVE_TO_ME,
        person: null,
        durationOfRole: DurationOfRole.SEVEN_DAYS,
        action: Actions.Allocate,
        period: null
      };
      allocateRoleServiceMock.confirmAllocation.and.returnValue(of({
      }));
      const action = new allocateRoleAction.ConfirmAllocation(STATE_DATA);
      const completion = new routeAction.CreateCaseGo({
        path: [`/cases/case-details/111111/roles-and-access`],
        caseId: '111111',
        extras: {
          state: {
            showMessage: true,
            messageText: RoleAllocationMessageText.Add,
          }
        }
      });
      actions$ = hot('-a', {a: action});
      const expected = cold('-b', {b: completion});
      expect(effects.confirmAllocation$).toBeObservable(expected);
    });
  });

  describe('handleError', () => {
    it('should handle 500', () => {
      const action$ = AllocateRoleEffects.handleError({status: 500, message: 'error'}, allocateRoleAction.ConfirmAllocation.toString());
      action$.subscribe(action => expect(action).toEqual(new Go({path: ['/service-down']})));
    });
  });

});

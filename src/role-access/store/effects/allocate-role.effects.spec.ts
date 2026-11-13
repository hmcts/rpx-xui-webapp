import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CreateCaseLoaded } from '../../../cases/store';
import { LoggerService } from '../../../app/services/logger/logger.service';
import { provideMockActions } from '@ngrx/effects/testing';
import { of, Subject, throwError } from 'rxjs';
import { Go } from '../../../app/store';
import { Actions, AllocateRoleState, AllocateTo, DurationOfRole } from '../../models';
import { RoleAllocationMessageText } from '../../models/enums/allocation-text';
import { AllocateRoleService } from '../../services';
import * as allocateRoleAction from '../actions/allocate-role.action';
import { AllocateRoleEffects } from './allocate-role.effects';
import { StoreModule } from '@ngrx/store';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app/store';

describe('Allocate Role Effects', () => {
  let actions$;
  let effects: AllocateRoleEffects;
  const allocateRoleServiceMock = jasmine.createSpyObj('AllocateRoleService', ['confirmAllocation', 'backUrl']);
  let store: Store;
  let dispatchSpy;
  const router = jasmine.createSpyObj<Router>('Router', ['navigateByUrl']);
  const logger = jasmine.createSpyObj<LoggerService>('LoggerService', ['error']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        {
          provide: AllocateRoleService,
          useValue: allocateRoleServiceMock,
        },
        { provide: Router, useValue: router },
        { provide: LoggerService, useValue: logger },
        AllocateRoleEffects,
        provideMockActions(() => actions$),
      ],
    });
    store = TestBed.inject(Store);
    dispatchSpy = spyOn(store, 'dispatch');
    allocateRoleServiceMock.backUrl = '/cases/case-details/IA/Asylum/111111?view=case#Roles%20and%20access';
    router.navigateByUrl.and.returnValue(Promise.resolve(true));
    logger.error.calls.reset();
    router.navigateByUrl.calls.reset();
    effects = TestBed.inject(AllocateRoleEffects);
  });

  describe('confirmAllocation$', () => {
    it('should navigate to the complete return URL and load the case when allocate', fakeAsync(() => {
      const STATE_DATA = {
        caseId: '111111',
        jurisdiction: 'IA',
        state: AllocateRoleState.CHOOSE_ROLE,
        typeOfRole: null,
        allocateTo: AllocateTo.ALLOCATE_TO_ME,
        person: null,
        durationOfRole: DurationOfRole.SEVEN_DAYS,
        action: Actions.Allocate,
        period: null,
      };
      allocateRoleServiceMock.confirmAllocation.and.returnValue(of({}));
      const action = new allocateRoleAction.ConfirmAllocation(STATE_DATA);
      const extras = {
        state: {
          showMessage: true,
          retainMessages: true,
          message: {
            type: 'success',
            message: RoleAllocationMessageText.Add,
          },
          messageText: RoleAllocationMessageText.Add,
        },
      };
      router.navigateByUrl.and.callFake(() => {
        expect(dispatchSpy).toHaveBeenCalledWith(new fromRoot.LoadUserDetails(true));
        return Promise.resolve(true);
      });
      actions$ = of(action);
      const received = [];
      effects.confirmAllocation$.subscribe((result) => received.push(result));
      expect(received).toEqual([]);
      expect(dispatchSpy).toHaveBeenCalledWith(new fromRoot.LoadUserDetails(true));
      flushMicrotasks();
      expect(router.navigateByUrl).toHaveBeenCalledWith(allocateRoleServiceMock.backUrl, extras);
      expect(received).toEqual([new CreateCaseLoaded('111111')]);
    }));

    it('should navigate to the complete return URL and load the case when reallocate', fakeAsync(() => {
      const STATE_DATA = {
        caseId: '111111',
        jurisdiction: 'IA',
        state: AllocateRoleState.CHOOSE_ROLE,
        typeOfRole: null,
        allocateTo: AllocateTo.ALLOCATE_TO_ME,
        person: null,
        durationOfRole: DurationOfRole.SEVEN_DAYS,
        action: Actions.Reallocate,
        period: null,
      };
      allocateRoleServiceMock.confirmAllocation.and.returnValue(of({}));
      const action = new allocateRoleAction.ConfirmAllocation(STATE_DATA);
      const extras = {
        state: {
          showMessage: true,
          retainMessages: true,
          message: {
            type: 'success',
            message: RoleAllocationMessageText.Reallocate,
          },
          messageText: RoleAllocationMessageText.Reallocate,
        },
      };
      router.navigateByUrl.and.callFake(() => {
        expect(dispatchSpy).toHaveBeenCalledWith(new fromRoot.LoadUserDetails(true));
        return Promise.resolve(true);
      });
      actions$ = of(action);
      const received = [];
      effects.confirmAllocation$.subscribe((result) => received.push(result));
      expect(received).toEqual([]);
      expect(dispatchSpy).toHaveBeenCalledWith(new fromRoot.LoadUserDetails(true));
      flushMicrotasks();
      expect(router.navigateByUrl).toHaveBeenCalledWith(allocateRoleServiceMock.backUrl, extras);
      expect(received).toEqual([new CreateCaseLoaded('111111')]);
    }));
  });

  for (const outcome of ['cancelled', 'rejected']) {
    it(`does not load the case when navigation is ${outcome}`, fakeAsync(() => {
      const navigationError = new Error('Navigation failed');
      router.navigateByUrl.and.callFake(() =>
        outcome === 'cancelled' ? Promise.resolve(false) : Promise.reject(navigationError)
      );
      allocateRoleServiceMock.confirmAllocation.and.returnValue(of({}));
      actions$ = of(new allocateRoleAction.ConfirmAllocation({ caseId: '111111', action: Actions.Reallocate } as any));
      const received = [];
      effects.confirmAllocation$.subscribe((result) => received.push(result));
      flushMicrotasks();
      expect(received).toEqual([]);
      if (outcome === 'rejected') {
        expect(logger.error).toHaveBeenCalledWith(`Error navigating to ${allocateRoleServiceMock.backUrl}`, navigationError);
      } else {
        expect(logger.error).not.toHaveBeenCalled();
      }
    }));
  }

  it('continues handling allocations after a rejected navigation', fakeAsync(() => {
    const actionStream = new Subject<allocateRoleAction.ConfirmAllocation>();
    actions$ = actionStream;
    allocateRoleServiceMock.confirmAllocation.and.returnValue(of({}));
    router.navigateByUrl.and.callFake(() => Promise.reject(new Error('Navigation failed')));
    const received = [];
    effects.confirmAllocation$.subscribe((result) => received.push(result));
    actionStream.next(new allocateRoleAction.ConfirmAllocation({ caseId: '111111', action: Actions.Reallocate } as any));
    flushMicrotasks();
    expect(received).toEqual([]);
    expect(logger.error).toHaveBeenCalled();

    router.navigateByUrl.and.returnValue(Promise.resolve(true));
    actionStream.next(new allocateRoleAction.ConfirmAllocation({ caseId: '222222', action: Actions.Reallocate } as any));
    flushMicrotasks();
    expect(received).toEqual([new CreateCaseLoaded('222222')]);
    actionStream.complete();
  }));

  it('keeps HTTP failure routing separate from navigation failure', () => {
    allocateRoleServiceMock.confirmAllocation.and.returnValue(throwError(() => ({ status: 403 })));
    actions$ = of(new allocateRoleAction.ConfirmAllocation({ caseId: '111111', action: Actions.Reallocate } as any));
    const received = [];
    effects.confirmAllocation$.subscribe((result) => received.push(result));
    expect(received).toEqual([new Go({ path: ['/not-authorised'] })]);
    expect(router.navigateByUrl).not.toHaveBeenCalled();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  describe('handleError', () => {
    it('should handle 500', () => {
      const action$ = AllocateRoleEffects.handleError({ status: 500, message: 'error' });
      action$.subscribe((action) => expect(action).toEqual(new Go({ path: ['/service-down'] })));
    });

    it('should handle 422', () => {
      const action$ = AllocateRoleEffects.handleError({ status: 422, message: 'error' });
      action$.subscribe((action) => expect(action).toEqual(new Go({ path: ['/role-access/user-not-assignable'] })));
    });
  });
});

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, lastValueFrom } from 'rxjs';
import { UserDetails } from '../../app/models';
import * as fromActions from '../../app/store';
import { BookingGuard } from './booking-guard';

describe('BookingGuard', () => {
  const USER_1: UserDetails = {
    canShareCases: true,
    sessionTimeout: { idleModalDisplayTime: 10, totalIdleTime: 50 },
    roleAssignmentInfo: [{
      primaryLocation: '',
      jurisdiction: '',
      isCaseAllocator: true,
      // note: bookable can be boolean or string
      bookable: 'true'
    }],
    userInfo: {
      id: '41a90c39-d756-4eba-8e85-5b5bf56b31f5',
      forename: 'Luke',
      surname: 'Wilson',
      email: 'lukesuperuserxui@mailnesia.com',
      roleCategory: 'JUDICIAL',
      active: true,
      roles: [
        'caseworker',
        'caseworker-judge',
        'caseworker-ia',
        'caseworker-ia-legalrep-solicitor',
        'caseworker-publiclaw',
        'caseworker-publiclaw-solicitor',
        'pui-caa',
        'pui-case-manager',
        'pui-finance-manager',
        'pui-organisation-manager',
        'pui-user-manager'
      ]
    }
  };

  const USER_2: UserDetails = {
    canShareCases: true,
    sessionTimeout: { idleModalDisplayTime: 10, totalIdleTime: 50 },
    roleAssignmentInfo: [{
      primaryLocation: '', jurisdiction: '', isCaseAllocator: true, bookable: true // boolean
    }],
    userInfo: {
      id: '41a90c39-d756-4eba-8e85-5b5bf56b31f5',
      forename: 'Luke',
      surname: 'Wilson',
      email: 'lukesuperuserxui@mailnesia.com',
      active: true,
      roles: [
        'caseworker',
        'pui-caa',
        'pui-case-manager',
        'pui-finance-manager',
        'pui-organisation-manager',
        'pui-user-manager'
      ]
    }
  };

  const USER_3: UserDetails = {
    canShareCases: true,
    sessionTimeout: { idleModalDisplayTime: 10, totalIdleTime: 50 },
    roleAssignmentInfo: [{
      primaryLocation: '', jurisdiction: '', isCaseAllocator: true // no "bookable"
    }],
    userInfo: {
      id: '41a90c39-d756-4eba-8e85-5b5bf56b31f5',
      forename: 'Luke',
      surname: 'Wilson',
      email: 'lukesuperuserxui@mailnesia.com',
      active: true,
      roles: [
        'caseworker',
        'caseworker-judge',
        'pui-caa',
        'pui-case-manager',
        'pui-finance-manager',
        'pui-organisation-manager',
        'pui-user-manager'
      ]
    }
  };

  const USER_4: UserDetails = {
    canShareCases: true,
    sessionTimeout: { idleModalDisplayTime: 10, totalIdleTime: 50 },
    roleAssignmentInfo: [{
      primaryLocation: '', jurisdiction: '', isCaseAllocator: true // no "bookable"
    }],
    userInfo: {
      id: '41a90c39-d756-4eba-8e85-5b5bf56b31f5',
      forename: 'Luke',
      surname: 'Wilson',
      email: 'lukesuperuserxui@mailnesia.com',
      active: true,
      roles: [
        'caseworker',
        'pui-caa',
        'pui-case-manager',
        'pui-finance-manager',
        'pui-organisation-manager',
        'pui-user-manager'
      ]
    }
  };

  let bookingGuard: BookingGuard;
  let routerMock: jasmine.SpyObj<Router>;
  let storeMock: jasmine.SpyObj<Store<fromActions.State>>;

  beforeEach(() => {
    routerMock = jasmine.createSpyObj<Router>('router', ['navigate']);
    storeMock = jasmine.createSpyObj<Store<fromActions.State>>('store', ['pipe']);
    bookingGuard = new BookingGuard(routerMock, storeMock);
  });

  it('guard truthy', () => {
    expect(bookingGuard).toBeTruthy();
  });

  it('allows access if user is JUDICIAL and has a bookable role assignment (string "true")', async () => {
    storeMock.pipe.and.returnValue(of(USER_1));
    const allowed = await lastValueFrom(bookingGuard.canActivate());
    expect(allowed).toBeTrue();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('denies access if user is not JUDICIAL but has bookable role assignment', async () => {
    storeMock.pipe.and.returnValue(of(USER_2));
    const allowed = await lastValueFrom(bookingGuard.canActivate());
    expect(allowed).toBeFalse();
    expect(routerMock.navigate).toHaveBeenCalledWith([BookingGuard.defaultUrl]);
  });

  it('denies access if user is JUDICIAL (role list) but no bookable role assignment', async () => {
    storeMock.pipe.and.returnValue(of(USER_3));
    const allowed = await lastValueFrom(bookingGuard.canActivate());
    expect(allowed).toBeFalse();
    expect(routerMock.navigate).toHaveBeenCalledWith([BookingGuard.defaultUrl]);
  });

  it('denies access if user is not JUDICIAL and has no bookable role assignment', async () => {
    storeMock.pipe.and.returnValue(of(USER_4));
    const allowed = await lastValueFrom(bookingGuard.canActivate());
    expect(allowed).toBeFalse();
    expect(routerMock.navigate).toHaveBeenCalledWith([BookingGuard.defaultUrl]);
  });

  it('waits for real user details (filters out falsy/partial emissions)', async () => {
    // emits undefined first, then real details; guard uses filter(...).take(1)
    storeMock.pipe.and.returnValue(of(undefined as any, USER_1));
    const allowed = await lastValueFrom(bookingGuard.canActivate());
    expect(allowed).toBeTrue();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});

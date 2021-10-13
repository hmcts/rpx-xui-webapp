import { inject, TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { SessionStorageService } from '../session-storage/session-storage.service';

import { HttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { AuthGuard } from './auth.guard';

class HttpClientMock {
  public get() {
    return 'response';
  }
}

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({})
      ],
      providers: [
        AuthService,
        SessionStorageService,
        { provide: HttpClient, useClass: HttpClientMock },
      ]
    });
  });

  it('should exist', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should exist', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard.canActivate).toBeDefined();
  }));
});

describe('AuthGuard', () => {
  let authService: any;
  let sessionStorageService: any;
  let windowLocationService: any;

  beforeEach(() => {
    authService = jasmine.createSpyObj('authService', ['loginRedirect', 'isAuthenticated', 'setWindowLocationHref']);
    sessionStorageService = jasmine.createSpyObj('sessionStorageService', ['getItem', 'setItem', 'removeItem']);
    windowLocationService = jasmine.createSpyObj('windowLocationService', ['getPathName']);
  })

  it('canActivate true', () => {
    authService.isAuthenticated.and.returnValue(of(true));
    windowLocationService.getPathName.and.returnValue('/cases');
    const guard = new AuthGuard(authService, sessionStorageService, windowLocationService);

    const canActivate = guard.canActivate();

    canActivate.subscribe(isAct => expect(isAct).toBeTruthy());
    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(authService.loginRedirect).not.toHaveBeenCalled();
  });

  it('canActivate false', () => {
    authService.isAuthenticated.and.returnValue(of(false));
    windowLocationService.getPathName.and.returnValue('/cases');
    const guard = new AuthGuard(authService, sessionStorageService, windowLocationService);

    const canActivate = guard.canActivate();
    canActivate.subscribe(isAct => expect(isAct).toBeFalsy());
    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(authService.loginRedirect).toHaveBeenCalled();
  });


  describe('storeRedirectUrl', () => {
    it('store current path when unauthenticated', () => {
      authService.isAuthenticated.and.returnValue(of(false));
      windowLocationService.getPathName.and.returnValue('/cases/1234');

      const guard = new AuthGuard(authService, sessionStorageService, windowLocationService);

      const canActivate = guard.canActivate();
      canActivate.subscribe(isAct => expect(isAct).toBeFalsy());

      expect(authService.isAuthenticated).toHaveBeenCalled();
      expect(authService.loginRedirect).toHaveBeenCalled();
      expect(sessionStorageService.setItem).toHaveBeenCalledWith('redirectUrl', '/cases/1234')
    });
  })

  describe('redirectToStoredUrl', () => {
    it('should not change the path when the users is not on root', () => {
      authService.isAuthenticated.and.returnValue(of(true));
      authService.setWindowLocationHref.and.callThrough();
      windowLocationService.getPathName.and.returnValue('/cases');

      const guard = new AuthGuard(authService, sessionStorageService, windowLocationService);

      const canActivate = guard.canActivate();
      canActivate.subscribe(isAct => expect(isAct).toBeTruthy());

      expect(authService.setWindowLocationHref).not.toHaveBeenCalled();
    });

    it('should change window location to the storedRedirectUrl', () => {
      authService.isAuthenticated.and.returnValue(of(true));
      authService.setWindowLocationHref.and.callThrough();
      windowLocationService.getPathName.and.returnValue('/');
      sessionStorageService.getItem.and.returnValue('/cheesecakes/1');

      const guard = new AuthGuard(authService, sessionStorageService, windowLocationService);

      const canActivate = guard.canActivate();
      canActivate.subscribe(isAct => expect(isAct).toBeTruthy());

      expect(authService.setWindowLocationHref).toHaveBeenCalledWith('/cheesecakes/1');
    });

    it('should not change the path when a redirectUrl is not found', () => {
      authService.isAuthenticated.and.returnValue(of(true));
      authService.setWindowLocationHref.and.callThrough();
      windowLocationService.getPathName.and.returnValue('/');
      sessionStorageService.getItem.and.returnValue(null);

      const guard = new AuthGuard(authService, sessionStorageService, windowLocationService);

      const canActivate = guard.canActivate();
      canActivate.subscribe(isAct => expect(isAct).toBeTruthy());

      expect(authService.setWindowLocationHref).not.toHaveBeenCalledWith('/cheesecakes/1');
    });
  });
});

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
  it('canActivate true', () => {
    const authService = jasmine.createSpyObj('authService', ['loginRedirect', 'isAuthenticated']);
    const sessionService = jasmine.createSpyObj('sessionService', ['getItem', 'setItem', 'removeItem']);

    authService.isAuthenticated.and.returnValue(of(true));
    const guard = new AuthGuard(authService, sessionService);
    const canActivate = guard.canActivate();
    canActivate.subscribe(isAct => expect(isAct).toBeTruthy());
    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(authService.loginRedirect).not.toHaveBeenCalled();
  });

  it('canActivate false', () => {
    const authService = jasmine.createSpyObj('authService', ['loginRedirect', 'isAuthenticated']);
    const sessionService = jasmine.createSpyObj('sessionService', ['getItem', 'setItem', 'removeItem']);

    authService.isAuthenticated.and.returnValue(of(false));
    const guard = new AuthGuard(authService, sessionService);

    const canActivate = guard.canActivate();
    canActivate.subscribe(isAct => expect(isAct).toBeFalsy());
    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(authService.loginRedirect).toHaveBeenCalled();
  });
});

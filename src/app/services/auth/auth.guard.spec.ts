import { inject, TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

import {HttpClient} from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import {AuthGuard} from './auth.guard';
import { SessionStorageService } from '../session-storage/session-storage.service';


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
    const service = jasmine.createSpyObj('service', ['loginRedirect', 'isAuthenticated']);
    service.isAuthenticated.and.returnValue(of(true));
    const guard = new AuthGuard(service);
    const canActivate = guard.canActivate();
    canActivate.subscribe(isAct => expect(isAct).toBeTruthy());
    expect(service.isAuthenticated).toHaveBeenCalled();
    expect(service.loginRedirect).not.toHaveBeenCalled();
  });

  it('canActivate false', () => {
    const service = jasmine.createSpyObj('service', ['loginRedirect', 'isAuthenticated']);
    service.isAuthenticated.and.returnValue(of(false));
    const guard = new AuthGuard(service);
    const canActivate = guard.canActivate();
    canActivate.subscribe(isAct => expect(isAct).toBeFalsy());
    expect(service.isAuthenticated).toHaveBeenCalled();
    expect(service.loginRedirect).toHaveBeenCalled();
  });
});

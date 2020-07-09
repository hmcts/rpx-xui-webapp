import { inject, TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

import {HttpClient} from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import {AuthGuard} from './auth.guard';


class HttpClientMock {

  get() {
    return 'response';
  }
}

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({})
      ],
      providers: [
        AuthService,
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

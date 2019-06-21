import { inject, TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

import { StoreModule } from '@ngrx/store';
import {AuthGuard} from './auth.guard';
import {CookieOptionsProvider, CookieService} from 'ngx-cookie';
import {AppConfigService} from '../config/configuration.services';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

const config = {
  config: {
    cookies: {
      token: 'bob',
      userId: 'ben'
    },
    services: {
      idam_web: 'http://idam_url.com'
    },
    oauth_callback_url: 'callback_url',
    api_base_url: 'api_base',
    idam_client: 'client_name'
  }
};

const router = {
  navigate: () => { }
};

const cookieService = {
  get: key => {
    return cookieService[key];
  },
  set: (key, value) => {
    cookieService[key] = value;
  },
  removeAll: () => { }
};


class HttpClientMock {

  get() {
    return 'response';
  }
}

class AppConfigServiceMock {
  getRoutesConfig() {
    return {
      idam: {
        idamLoginUrl: 'dummy',
        idamClientID: 'dummy',
        oauthCallbackUrl: 'dummy'
      }
    };
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
        { provide: AppConfigService, useClass: AppConfigServiceMock},
        { provide: environment, useValue: config },
        { provide: Router, useValue: router },
        { provide: CookieService, useValue: cookieService },
        { provide: HttpClient, useClass: HttpClientMock }
      ]
    });
  });

  it('should exist', inject([AuthGuard], (gurad: AuthGuard) => {
    expect(gurad).toBeTruthy();
  }));


  it('should exist', inject([AuthGuard], (gurad: AuthGuard) => {
    expect(gurad.canActivate).toBeDefined();
  }));
});

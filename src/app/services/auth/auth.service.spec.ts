import { inject, TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { HttpClient } from '@angular/common/http';
import {AppConfigService} from '../config/configuration.services';
import {StoreModule} from '@ngrx/store';

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
    return this[key];
  },
  set: (key, value) => {
    this[key] = value;
  },
  removeAll: () => { }
};


class HttpClientMock {

  get() {
    return 'response';
  }
}
let deleteCookiesSpy;
let routerNavigateSpy;

describe('AuthService', () => {
  beforeEach(() => {
    deleteCookiesSpy = spyOn(cookieService, 'removeAll');
    routerNavigateSpy = spyOn(router, 'navigate');
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({})
      ],
      providers: [
        AuthService,
        AppConfigService,
        { provide: environment, useValue: config },
        { provide: Router, useValue: router },
        { provide: CookieService, useValue: cookieService },
        { provide: HttpClient, useClass: HttpClientMock }
      ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  // To do fix
  xdescribe('isAuthenticated', () => {
    it('should return false when jwt is expired, true when still valid', inject([AuthService], (service: AuthService) => {
      let expiry = new Date().getTime() + 3000;
      service.decodeJwt = () => {
        return {
          exp: expiry
        };
      };
      expect(service.isAuthenticated()).toEqual(false);
      expiry = new Date().getTime() - 3000;
      expect(service.isAuthenticated()).toEqual(true);
    }));

  });

});

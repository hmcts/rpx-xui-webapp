import { inject, TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../config/configuration.services';
import { StoreModule } from '@ngrx/store';
import { AppConstants } from 'src/app/app.constants';
import { AppUtils } from 'src/app/app-utils';
import { of, throwError } from 'rxjs';
import {EnvironmentService} from '../../shared/services/environment.service';
import {provideMockActions} from '@ngrx/effects/testing';

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

const expiredJwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOj`
  + `EwNTkyNTE3NDR9.6pdabSR59z99w-OE8_ZMka7IazJbY2cLfax09Cy1JIY`;

const nonExpiredJwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHA`
  + `iOjIwNTkyNTE3NDR9.3XJN4KnwY82gULXpN5tJDcUMmNcypk2MFPRUGB_Frv0`;

const cookieService = {
  get: key => {
    return cookieService[key];
  },
  set: (key, value) => {
    cookieService[key] = value;
  },
  removeAll: () => { }
};

const environmentServiceMock = {
};

class HttpClientMock {
  get() {
    return 'response';
  }
}
let deleteCookiesSpy;
let routerNavigateSpy;

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

class AppConstantsMock {
  static REDIRECT_URL = {
    dummy: 'dummy',
    aat: 'dummy',
    demo: 'dummy',
    ithc: 'dummy',
    prod: 'dummy',
    perftest: 'dummy',
    localhost: 'dummy'
  };
}

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
        { provide: CookieService, useValue: cookieService },
        { provide: AppConfigService, useClass: AppConfigServiceMock},
        { provide: EnvironmentService, useValue: environmentServiceMock},
        { provide: environment, useValue: config },
        { provide: Router, useValue: router },
        { provide: HttpClient, useClass: HttpClientMock },
      ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  describe('isAuthenticated', () => {
    it('should return false when jwt is expired, true when still valid', inject([AuthService], (service: AuthService) => {
      cookieService.set('__auth__', expiredJwt);
      expect(service.isAuthenticated()).toEqual(false);
      cookieService.set('__auth__', nonExpiredJwt);
      expect(service.isAuthenticated()).toEqual(true);
    }));

  });

  describe('canActivate', () => {
    it('should redirect to login if not authenticated', inject([AuthService], (service: AuthService) => {
      cookieService.set('__auth__', expiredJwt);
      const loginRedirectMock = spyOn(service, 'loginRedirect');
      service.canActivate();
      expect(loginRedirectMock).toHaveBeenCalled();
    }));

    it('should return true if authenticated', inject([AuthService], (service: AuthService) => {
      cookieService.set('__auth__', nonExpiredJwt);
      expect(service.canActivate()).toEqual(true);
    }));

  });

  // TODO: Re-implement test around observable.
  xdescribe('generateLoginUrl', () => {
    it('should observe/call environment service config$', inject([AuthService], (service: AuthService) => {
    }));
  });

  describe('logOutAndRedirect', () => {
    it('should work', inject([AuthService], (service: AuthService) => {
      const spy = spyOn(service, 'getWindowLocation').and.returnValue({hostname: 'host', port: 8000});
      const spyOnSetWindowLocation = spyOn(service, 'setWindowLocationHref');
      service.logOutAndRedirect();
      expect(spyOnSetWindowLocation).toHaveBeenCalledWith('api/logout?redirect=http://host:8000/idle-sign-out');
    }));
  });

});

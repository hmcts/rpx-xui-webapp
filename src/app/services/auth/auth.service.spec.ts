import { HttpClient } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { CookieService } from 'ngx-cookie';
import { AppUtils } from 'src/app/app-utils';
import { AppConstants } from 'src/app/app.constants';
import { environment } from '../../../environments/environment';
import { AppConfigService } from '../config/configuration.services';
import { AuthService } from './auth.service';

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

const cookieService: any = {
  get: (key: string): string => {
    return cookieService[key];
  },
  set: (key: string, value: string) => {
    cookieService[key] = value;
  },
  removeAll: (): void => { }
};


class HttpClientMock {
  public get() {
    return 'response';
  }
}

class AppConfigServiceMock {
  public getRoutesConfig() {
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
  public static REDIRECT_URL = {
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

  describe('generateLoginUrl', () => {
    it('should generate url', inject([AuthService], (service: AuthService) => {
      spyOn(AppUtils, 'getEnvironment').and.returnValue('dummy');
      AppConstants.REDIRECT_URL = AppConstantsMock.REDIRECT_URL;
      const base = 'dummy';
      const clientId = 'dummy';
      const callback = `${service.apiBaseUrl}/dummy`;
      const scope = `profile openid roles manage-user create-user`;
      const loginUrl = `${base}/login?response_type=code&client_id=${clientId}&redirect_uri=${callback}&scope=${scope}`;
      expect(service.generateLoginUrl()).toEqual(loginUrl);
    }));
  });

});

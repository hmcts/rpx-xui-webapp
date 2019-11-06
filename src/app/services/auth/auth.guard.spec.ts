import { HttpClient } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { CookieService } from 'ngx-cookie';
import { windowToken } from 'src/app/shared/shared.module';
import { environment } from '../../../environments/environment';
import { AppConfigService } from '../config/configuration.services';
import { AuthGuard } from './auth.guard';
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

const cookieService: any = {
  get: (key: string): string => {
    return cookieService[key];
  },
  set: (key: string, value: string) => {
    cookieService[key] = value;
  },
  removeAll: () => { }
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
        { provide: HttpClient, useClass: HttpClientMock },
        { provide: windowToken, useValue: window }
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

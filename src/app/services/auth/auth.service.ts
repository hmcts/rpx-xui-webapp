import { Inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { AppUtils } from 'src/app/app-utils';
import { AppConstants } from 'src/app/app.constants';
import { JwtContents } from 'src/app/models/jwtContents.model';
import { windowToken } from 'src/app/shared/shared.module';
import { environment as config } from '../../../environments/environment';
import { AppConfigService } from '../config/configuration.services';
import { JwtDecodeWrapper } from '../logger/jwtDecodeWrapper';

@Injectable()
export class AuthService {
  public apiBaseUrl: string;
  public COOKIE_KEYS: { TOKEN: string; USER: string };

  private readonly window: Window;

  constructor(
    private readonly cookieService: CookieService,
    private readonly appConfigService: AppConfigService,
    private readonly jwtDecoder: JwtDecodeWrapper,
    @Inject(windowToken) window: any
  ) {
    this.window = window as Window;
    this.COOKIE_KEYS = {
      TOKEN: config.cookies.token,
      USER: config.cookies.userId
    };

    if (this.window) {
      // tslint:disable-next-line: prefer-template
      this.apiBaseUrl = this.window.location.protocol + '//' + this.window.location.hostname;

      if (this.window.location.port) { // don't add colon if there is no port
        // tslint:disable-next-line: prefer-template
        this.apiBaseUrl += ':' + this.window.location.port;
      }
    } else {
      this.apiBaseUrl = '';
    }
  }

  public canActivate() {
    console.log('reached can activate');
    if (!this.isAuthenticated()) {
      this.loginRedirect();
      return false;
    }

    return true;
  }

  public generateLoginUrl() {
    if (!this.window) {
      return '';
    }
    const env = AppUtils.getEnvironment(this.window.location.origin);
    // const base = this.appConfigService.getRoutesConfig().idam.idamLoginUrl;
    const base = AppConstants.REDIRECT_URL[env] as string;
    const clientId = this.appConfigService.getRoutesConfig().idam.idamClientID;
    const callback = `${this.apiBaseUrl}/${this.appConfigService.getRoutesConfig().idam.oauthCallbackUrl}`;
    const scope = `profile openid roles manage-user create-user`;
    return `${base}/login?response_type=code&client_id=${clientId}&redirect_uri=${callback}&scope=${scope}`;
  }

  public loginRedirect() {
    if (this.window) {
      this.window.location.href = this.generateLoginUrl();
    }
  }

  public isAuthenticated(): boolean {
    const jwt = this.cookieService.get(this.COOKIE_KEYS.TOKEN);
    if (!jwt) {
      return false;
    }
    const jwtData = this.jwtDecoder.decode<JwtContents>(jwt);
    const notExpired = jwtData.exp > Math.round(new Date().getTime() / 1000);
    // do stuff!!
    return notExpired;
  }

  public signOut() {
    if (this.window) {
      this.window.location.href = '/api/logout';
    }
  }
}

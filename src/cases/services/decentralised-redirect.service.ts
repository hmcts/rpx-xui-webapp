import { Inject, Injectable } from '@angular/core';
import { SessionStorageService } from '../../app/services';
import { EnvironmentService } from '../../app/shared/services/environment.service';
import {
  buildDecentralisedEventUrl,
  BuildDecentralisedEventUrlInput,
  getExpectedSubFromUserDetails,
} from '../utils/decentralised-redirect.util';
import { UserInfo } from '../../app/models/user-details.model';

@Injectable({
  providedIn: 'root',
})
export class DecentralisedRedirectService {
  constructor(
    private readonly environmentService: EnvironmentService,
    private readonly sessionStorageService: SessionStorageService,
    @Inject(Window) private readonly window: Window
  ) {}

  public tryEventRedirect(params: BuildDecentralisedEventUrlInput): boolean {
    return this.redirect(
      buildDecentralisedEventUrl(
        params,
        this.environmentService.get('decentralisedCaseTypeConfig'),
        getExpectedSubFromUserDetails(this.sessionStorageService.getItem('userDetails'))
      )
    );
  }

  private redirect(url: string | null): boolean {
    if (!url) {
      return false;
    }

    this.window.location.assign(url);
    return true;
  }

  public addUserInfo(serviceUrl: string, userInfo: UserInfo): string {
    if (serviceUrl) {
      const userId = userInfo.id || userInfo.uid;

      if (userId) {
        const newUrl = new URL(serviceUrl);
        newUrl.searchParams.set('expected_sub', userId);
        return newUrl.toString();
      }
    }
    return serviceUrl;
  }
}

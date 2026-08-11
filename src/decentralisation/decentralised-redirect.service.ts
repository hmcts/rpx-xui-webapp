import { Inject, Injectable } from '@angular/core';
import { SessionStorageService } from '../app/services';
import { EnvironmentService } from '../app/shared/services/environment.service';
import {
  buildDecentralisedEventUrl,
  BuildDecentralisedEventUrlInput,
  getExpectedSubFromUserDetails,
} from '../../common/decentralisation/decentralised-redirect.util';
import { UserInfo } from '../app/models/user-details.model';

@Injectable({
  providedIn: 'root',
})
export class DecentralisedRedirectService {
  /** environment variable name where the service map is configured */
  public static readonly SERVICE_MAP_ENV_VAR_NAME = 'decentralisedServiceMap';

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

  public getUrl(serviceId: string, serviceUrl: string, userInfo: UserInfo): string {
    const absoluteUrl = this.getAbsoluteUrl(serviceId, serviceUrl);
    return absoluteUrl ? this.addUserInfo(absoluteUrl, userInfo).toString() : serviceUrl;
  }

  private addUserInfo(url: URL, userInfo: UserInfo): URL {
    const userId = userInfo.id || userInfo.uid;

    if (userId) {
      url.searchParams.set('expected_sub', userId);
    }

    return url;
  }

  private getAbsoluteUrl(serviceId: string, relativeUrl: string): URL | null {
    if (serviceId && relativeUrl) {
      const serviceMap = this.environmentService.get(DecentralisedRedirectService.SERVICE_MAP_ENV_VAR_NAME);

      if (serviceMap && serviceId in serviceMap) {
        const baseUrl = serviceMap[serviceId].baseUrl;

        // prevent adding the baseURL if it has already been added
        if (relativeUrl.startsWith(baseUrl)) {
          return new URL(relativeUrl);
        }

        // try not to add a double slash
        const newBaseUrl = baseUrl.replace(/\/$/, '');
        const newRelativeUrl = relativeUrl.replace(/^\//, '');

        return new URL(`${newBaseUrl}/${newRelativeUrl}`);
      }
    }
    return null;
  }
}

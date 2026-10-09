import { Inject, Injectable } from '@angular/core';
import { SessionStorageService } from '../app/services';
import { EnvironmentService } from '../app/shared/services/environment.service';
import { getWebUrlForCaseType } from '../../common/decentralisation/decentralised-redirect.util';
import { UserInfo } from '../app/models/user-details.model';
import { DecentralisedEvent } from './decentralised-event';

@Injectable({
  providedIn: 'root',
})
export class DecentralisedRedirectService {
  /** environment variable name where the service map is configured */
  static readonly SERVICE_MAP_ENV_VAR_NAME = 'decentralisedServiceMap';

  /** environment variable name where the case type map is configured */
  static readonly CASE_TYPE_MAP_ENV_VAR_NAME = 'decentralisedCaseTypeConfig';

  /** all decentralised events must have this prefix */
  static readonly DECENTRALISED_EVENT_PREFIX = 'ext:';

  /** name of parameter added to a request query parameters to capture the logged in user ID */
  static readonly USER_ID_REQUEST_PARAM_NAME = 'expected_sub';

  constructor(
    private readonly environmentService: EnvironmentService,
    private readonly sessionStorageService: SessionStorageService,
    @Inject(Window) private readonly window: Window
  ) {}

  public static getExpectedSubFromUserDetails(userInfoStr?: string | null): string | null {
    if (!userInfoStr) {
      return null;
    }

    try {
      const userInfo = JSON.parse(userInfoStr) as { id?: string; uid?: string };
      return userInfo.id || userInfo.uid || null;
    } catch {
      return null;
    }
  }

  public getUrl(serviceId: string, serviceUrl: string, userInfo: UserInfo): string {
    const absoluteUrl = this.getAbsoluteUrl(serviceId, serviceUrl);
    return absoluteUrl ? this.addUserInfo(absoluteUrl, userInfo).toString() : serviceUrl;
  }

  public isDecentralisedEvent(eventId?: string | null): eventId is string {
    return !!eventId && eventId.startsWith(DecentralisedRedirectService.DECENTRALISED_EVENT_PREFIX);
  }

  public tryRedirectEvent(event: DecentralisedEvent): boolean {
    const baseUrl = this.getBaseUrl(event.getCaseType());

    if (baseUrl) {
      this.redirectEvent(baseUrl, event);
      return true;
    } else {
      // fail fast since decentralised events should have the required configuration
      throw new Error(
        `Event ${event.getEventId()} is decentralised for case type ${event.getCaseType()} but the required parameters are not provided`
      );
    }
  }

  private redirectEvent(baseUrl: string, event: DecentralisedEvent): void {
    const expectedSub = DecentralisedRedirectService.getExpectedSubFromUserDetails(
      this.sessionStorageService.getItem('userDetails')
    );
    const absoluteUrl = event.getAbsoluteUrl(baseUrl, expectedSub);

    this.window.location.assign(absoluteUrl);
  }

  private getBaseUrl(caseType: string): string | null {
    const caseTypeMap = this.environmentService.get(DecentralisedRedirectService.CASE_TYPE_MAP_ENV_VAR_NAME);
    return getWebUrlForCaseType(caseTypeMap, caseType);
  }

  private addUserInfo(url: URL, userInfo: UserInfo): URL {
    const userId = userInfo.id || userInfo.uid;

    if (userId) {
      url.searchParams.set(DecentralisedRedirectService.USER_ID_REQUEST_PARAM_NAME, userId);
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

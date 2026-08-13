import { Inject, Injectable } from '@angular/core';
import { SessionStorageService } from '../app/services';
import { EnvironmentService } from '../app/shared/services/environment.service';
import { getWebUrlForCaseType } from '../../common/decentralisation/decentralised-redirect.util';
import { UserInfo } from '../app/models/user-details.model';
import { Params } from '@angular/router';
import { BuildDecentralisedEventUrlInput } from './event-url-types';
import { CaseTypeMap, FrontendDecentralisedCaseType } from 'common/decentralisation/decentralised-casetype';

@Injectable({
  providedIn: 'root',
})
export class DecentralisedRedirectService {
  /** environment variable name where the service map is configured */
  static readonly SERVICE_MAP_ENV_VAR_NAME = 'decentralisedServiceMap';

  private static readonly DECENTRALISED_EVENT_PREFIX = 'ext:';
  private static readonly USER_ID_REQUEST_PARAM_NAME = 'expected_sub';

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

  public tryEventRedirect(params: BuildDecentralisedEventUrlInput): boolean {
    return this.redirect(
      this.buildDecentralisedEventUrl(
        params,
        this.environmentService.get('decentralisedCaseTypeConfig'),
        DecentralisedRedirectService.getExpectedSubFromUserDetails(this.sessionStorageService.getItem('userDetails'))
      )
    );
  }

  public getUrl(serviceId: string, serviceUrl: string, userInfo: UserInfo): string {
    const absoluteUrl = this.getAbsoluteUrl(serviceId, serviceUrl);
    return absoluteUrl ? this.addUserInfo(absoluteUrl, userInfo).toString() : serviceUrl;
  }

  buildDecentralisedEventUrl(
    params: BuildDecentralisedEventUrlInput,
    caseTypeConfig: CaseTypeMap<FrontendDecentralisedCaseType>,
    expectedSub?: string
  ): string | null {
    if (!this.isDecentralisedEvent(params.eventId)) {
      return null;
    }

    const webUrl = getWebUrlForCaseType(caseTypeConfig, params.caseType);
    if (!webUrl) {
      return null;
    }

    let eventPath: string;
    if (params.isCaseCreate === true) {
      eventPath = `/cases/case-create/${encodeURIComponent(params.jurisdiction)}/${encodeURIComponent(params.caseType)}/${encodeURIComponent(params.eventId)}`;
    } else {
      eventPath = `/cases/${encodeURIComponent(params.caseId)}/event/${encodeURIComponent(params.eventId)}`;
    }

    const searchParams = new URLSearchParams();
    this.appendQueryParams(searchParams, params.queryParams);
    if (expectedSub) {
      searchParams.set(DecentralisedRedirectService.USER_ID_REQUEST_PARAM_NAME, expectedSub);
    }

    const queryString = searchParams.toString();
    return queryString ? `${webUrl}${eventPath}?${queryString}` : `${webUrl}${eventPath}`;
  }

  private isDecentralisedEvent(eventId?: string): eventId is string {
    return !!eventId && eventId.startsWith(DecentralisedRedirectService.DECENTRALISED_EVENT_PREFIX);
  }

  private appendQueryParams(params: URLSearchParams, queryParams?: Params): void {
    if (!queryParams) {
      return;
    }
    Object.keys(queryParams).forEach((key) => {
      const value = queryParams[key];
      if (value === undefined || value === null) {
        return;
      }
      if (Array.isArray(value)) {
        value.forEach((item) => params.append(key, String(item)));
      } else {
        params.set(key, String(value));
      }
    });
  }

  private redirect(url: string | null): boolean {
    if (!url) {
      return false;
    }

    this.window.location.assign(url);
    return true;
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
        return baseUrl?.endsWith('/') || relativeUrl.startsWith('/')
          ? new URL(`${baseUrl}${relativeUrl}`)
          : new URL(`${baseUrl}/${relativeUrl}`);
      }
    }
    return null;
  }
}

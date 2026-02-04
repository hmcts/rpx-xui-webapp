import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Params } from '@angular/router';
import { SessionStorageService } from '../../services/session-storage/session-storage.service';
import { EnvironmentService } from './environment.service';

export interface DecentralisedEventContext {
  caseTypeId: string;
  eventId: string;
  caseId?: string;
  jurisdictionId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DecentralisedRoutingService {
  private static readonly EVENT_PREFIX = 'ext:';

  constructor(
    private readonly environmentService: EnvironmentService,
    private readonly sessionStorageService: SessionStorageService
  ) {}

  public getRedirectUrlFromRoute(route: ActivatedRouteSnapshot): string | null {
    if (!route) {
      return null;
    }

    const params = this.collectParams(route);
    const eventId = params.eid;
    const caseTypeId = params.caseType || params.ctid;
    const jurisdictionId = params.jurisdiction || params.jid;
    const caseId = params.cid;

    if (!eventId || !caseTypeId) {
      return null;
    }

    if (!caseId && !jurisdictionId) {
      return null;
    }

    const context: DecentralisedEventContext = {
      caseTypeId,
      eventId,
      caseId,
      jurisdictionId
    };

    return this.buildRedirectUrl(context, route.queryParams);
  }

  private buildRedirectUrl(context: DecentralisedEventContext, queryParams?: Params | URLSearchParams): string | null {
    if (!this.isDecentralisedEvent(context.eventId)) {
      return null;
    }

    const baseUrl = this.getDecentralisedBaseUrl(context.caseTypeId);
    if (!baseUrl) {
      return null;
    }

    const path = context.caseId
      ? `/cases/${encodeURIComponent(context.caseId)}/event/${encodeURIComponent(context.eventId)}`
      : `/cases/case-create/${encodeURIComponent(context.jurisdictionId)}/${encodeURIComponent(context.caseTypeId)}/${encodeURIComponent(context.eventId)}`;

    const searchParams = new URLSearchParams();
    this.appendQueryParams(searchParams, queryParams);

    const expectedSub = this.getExpectedSub();
    if (expectedSub) {
      searchParams.set('expected_sub', expectedSub);
    }

    const url = `${this.normaliseBaseUrl(baseUrl)}${path}`;
    const queryString = searchParams.toString();
    return queryString ? `${url}?${queryString}` : url;
  }

  private isDecentralisedEvent(eventId: string): boolean {
    return !!eventId && eventId.startsWith(DecentralisedRoutingService.EVENT_PREFIX);
  }

  private getDecentralisedBaseUrl(caseTypeId: string): string | null {
    // Supports preview PR case types by allowing prefix matches with optional %s suffix substitution.
    if (!caseTypeId) {
      return null;
    }
    const config = this.environmentService.get('decentralisedEventBaseUrls');
    const mapping = this.normaliseMapping(config);
    if (!mapping) {
      return null;
    }

    const loweredCaseType = caseTypeId.toLowerCase();
    const matches = Object.entries(mapping).filter(([prefix]) =>
      loweredCaseType.startsWith(prefix.toLowerCase())
    );
    if (matches.length !== 1) {
      return null;
    }

    const [prefix, template] = matches[0];
    if (!template || !template.trim()) {
      return null;
    }

    const parts = template.split('%s');
    if (parts.length > 2) {
      return null;
    }

    if (parts.length === 1) {
      return template;
    }

    const suffix = caseTypeId.substring(prefix.length);
    if (!suffix) {
      return null;
    }

    return `${parts[0]}${suffix}${parts[1]}`;
  }

  private normaliseMapping(config: any): Record<string, string> {
    if (!config) {
      return null;
    }
    if (typeof config === 'string') {
      try {
        return JSON.parse(config);
      } catch (error) {
        return null;
      }
    }
    if (typeof config === 'object') {
      return config;
    }
    return null;
  }

  private getExpectedSub(): string | null {
    const userInfoStr = this.sessionStorageService.getItem('userDetails');
    if (!userInfoStr) {
      return null;
    }
    try {
      const userInfo = JSON.parse(userInfoStr);
      return userInfo?.id || userInfo?.uid || null;
    } catch (error) {
      return null;
    }
  }

  private appendQueryParams(searchParams: URLSearchParams, queryParams?: Params | URLSearchParams): void {
    if (!queryParams) {
      return;
    }

    if (queryParams instanceof URLSearchParams) {
      queryParams.forEach((value, key) => {
        searchParams.append(key, value);
      });
      return;
    }

    Object.entries(queryParams).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        return;
      }
      if (Array.isArray(value)) {
        value.forEach((item) => searchParams.append(key, String(item)));
      } else {
        searchParams.append(key, String(value));
      }
    });
  }

  private normaliseBaseUrl(baseUrl: string): string {
    return baseUrl.replace(/\/+$/g, '');
  }

  private collectParams(route: ActivatedRouteSnapshot): Record<string, string> {
    if (route.pathFromRoot && route.pathFromRoot.length) {
      return route.pathFromRoot.reduce((acc, snapshot) => ({
        ...acc,
        ...snapshot.params
      }), {} as Record<string, string>);
    }

    const params: Record<string, string> = {};
    const visit = (snapshot: ActivatedRouteSnapshot): void => {
      if (!snapshot) {
        return;
      }
      Object.assign(params, snapshot.params);
      snapshot.children?.forEach((child) => visit(child));
    };
    visit(route);
    return params;
  }
}

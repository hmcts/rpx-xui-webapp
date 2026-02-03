import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
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

  public getRedirectUrlFromPath(path: any[], queryParams?: Params): string | null {
    const pathString = this.normalisePath(path);
    if (!pathString) {
      return null;
    }
    return this.getRedirectUrlFromPathname(pathString, queryParams);
  }

  public getRedirectUrlFromPathname(pathname: string, queryParams?: Params | URLSearchParams): string | null {
    const context = this.extractContext(pathname);
    if (!context) {
      return null;
    }
    return this.buildRedirectUrl(context, queryParams);
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
    const config = this.environmentService.get('decentralisedCaseTypes');
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

  private extractContext(pathname: string): DecentralisedEventContext | null {
    if (!pathname) {
      return null;
    }
    const cleanedPath = this.stripPath(pathname);
    if (!cleanedPath) {
      return null;
    }

    const segments = cleanedPath.split('/').filter(Boolean);
    const caseCreateIndex = segments.indexOf('case-create');
    if (caseCreateIndex > -1 && segments.length >= caseCreateIndex + 4) {
      return {
        jurisdictionId: segments[caseCreateIndex + 1],
        caseTypeId: segments[caseCreateIndex + 2],
        eventId: segments[caseCreateIndex + 3]
      };
    }

    const triggerIndex = segments.indexOf('trigger');
    if (triggerIndex > -1 && segments.length > triggerIndex + 1) {
      const eventId = segments[triggerIndex + 1];
      const caseDetailsIndex = segments.indexOf('case-details');
      const caseIndex = segments.indexOf('case');
      const detailsIndex = caseDetailsIndex > -1 ? caseDetailsIndex : caseIndex;
      if (detailsIndex > -1 && triggerIndex > detailsIndex + 3) {
        return {
          jurisdictionId: segments[detailsIndex + 1],
          caseTypeId: segments[detailsIndex + 2],
          caseId: segments[detailsIndex + 3],
          eventId
        };
      }
    }

    return null;
  }

  private stripPath(pathname: string): string {
    const withoutQuery = pathname.split('?')[0].split('#')[0];
    return withoutQuery.replace(/^\/+|\/+$/g, '');
  }

  private normaliseBaseUrl(baseUrl: string): string {
    return baseUrl.replace(/\/+$/g, '');
  }

  private normalisePath(path: any[]): string | null {
    if (!path || !path.length) {
      return null;
    }
    const segments = path.filter((segment) => segment !== undefined && segment !== null).map(String);
    if (!segments.length) {
      return null;
    }
    if (segments.length === 1 && segments[0].includes('/')) {
      return segments[0];
    }
    return `/${segments.join('/')}`;
  }
}

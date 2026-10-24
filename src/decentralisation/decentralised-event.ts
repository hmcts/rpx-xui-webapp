import { Params } from '@angular/router';
import { DecentralisedRedirectService } from './decentralised-redirect.service';

export class DecentralisedEvent {
  public static forCase(eventId: string, caseType: string, caseId: string, queryParams?: Params): DecentralisedEvent {
    const eventPath = `/cases/${encodeURIComponent(caseId)}/event/${encodeURIComponent(eventId)}`;
    return new DecentralisedEvent(eventId, caseType, eventPath, queryParams);
  }

  public static forCreateCase(eventId: string, caseType: string, jurisdiction: string, queryParams?: Params): DecentralisedEvent {
    const eventPath = `/cases/case-create/${encodeURIComponent(jurisdiction)}/${encodeURIComponent(caseType)}/${encodeURIComponent(eventId)}`;
    return new DecentralisedEvent(eventId, caseType, eventPath, queryParams);
  }

  private constructor(
    private eventId: string,
    private caseType: string,
    private eventPath: string,
    private queryParams?: Params
  ) {}

  public getEventId(): string {
    return this.eventId;
  }

  public getCaseType(): string {
    return this.caseType;
  }

  public getAbsoluteUrl(baseUrl: string, expectedSub: string | null): string {
    const searchParams = new URLSearchParams();
    this.appendQueryParams(searchParams, this.queryParams);

    if (expectedSub) {
      searchParams.set(DecentralisedRedirectService.USER_ID_REQUEST_PARAM_NAME, expectedSub);
    }

    const queryString = searchParams.toString();
    return queryString ? `${baseUrl}${this.eventPath}?${queryString}` : `${baseUrl}${this.eventPath}`;
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
}

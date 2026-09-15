import { Params } from '@angular/router';

export class DecentralisedEvent {
  private static readonly DECENTRALISED_EVENT_PREFIX = 'ext:';
  private static readonly USER_ID_REQUEST_PARAM_NAME = 'expected_sub';

  public static isDecentralisedEvent(eventId: string): boolean {
    return eventId.startsWith(DecentralisedEvent.DECENTRALISED_EVENT_PREFIX);
  }

  public static of(eventId: string, caseType: string, caseId: string, queryParams?: Params): DecentralisedEvent {
    const eventPath = `/cases/${encodeURIComponent(caseId)}/event/${encodeURIComponent(eventId)}`;
    return new DecentralisedEvent(eventId, caseType, eventPath, queryParams);
  }

  public static createCase(eventId: string, caseType: string, jurisdiction: string, queryParams?: Params): DecentralisedEvent {
    const eventPath = `/cases/case-create/${encodeURIComponent(jurisdiction)}/${encodeURIComponent(caseType)}/${encodeURIComponent(eventId)}`;
    return new DecentralisedEvent(eventId, caseType, eventPath, queryParams);
  }

  private constructor(
    private eventId: string,
    private caseType: string,
    private eventPath: string,
    private queryParams?: Params
  ) {}

  public getAbsoluteUrl(baseUrl: string, expectedSub: string | null): string {
    const searchParams = new URLSearchParams();
    this.appendQueryParams(searchParams, this.queryParams);

    if (expectedSub) {
      searchParams.set(DecentralisedEvent.USER_ID_REQUEST_PARAM_NAME, expectedSub);
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

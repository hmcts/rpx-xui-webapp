import { Params } from '@angular/router';

export const DECENTRALISED_EVENT_PREFIX = 'ext:';

export const isDecentralisedEvent = (eventId?: string): boolean => {
  return !!eventId && eventId.startsWith(DECENTRALISED_EVENT_PREFIX);
};

export const normalizeCaseType = (caseType?: string): string | null => {
  return caseType ? caseType.toUpperCase() : null;
};

export const getDecentralisedBaseUrl = (
  baseUrls: Record<string, string> | null | undefined,
  caseType?: string
): string | null => {
  if (!baseUrls || !caseType) {
    return null;
  }
  const key = normalizeCaseType(caseType);
  if (!key) {
    return null;
  }
  return baseUrls[key] || null;
};

export const getExpectedSub = (userInfo?: { id?: string; uid?: string }): string | null => {
  if (!userInfo) {
    return null;
  }
  return userInfo.id || userInfo.uid || null;
};

const appendQueryParams = (params: URLSearchParams, queryParams?: Params): void => {
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
};

export const buildDecentralisedEventUrl = (params: {
  baseUrls: Record<string, string> | null | undefined;
  caseType?: string;
  eventId?: string;
  caseId?: string;
  jurisdiction?: string;
  queryParams?: Params;
  expectedSub?: string;
  isCaseCreate?: boolean;
}): string | null => {
  const { baseUrls, caseType, eventId, caseId, jurisdiction, queryParams, expectedSub, isCaseCreate } = params;

  if (!isDecentralisedEvent(eventId)) {
    return null;
  }

  const baseUrl = getDecentralisedBaseUrl(baseUrls, caseType);
  if (!baseUrl) {
    return null;
  }

  if (isCaseCreate && (!jurisdiction || !caseType)) {
    return null;
  }

  if (!isCaseCreate && !caseId) {
    return null;
  }

  const base = baseUrl.replace(/\/+$/, '');
  const eventPath = isCaseCreate
    ? `/cases/case-create/${encodeURIComponent(jurisdiction)}/${encodeURIComponent(caseType)}/${encodeURIComponent(eventId)}`
    : `/cases/${encodeURIComponent(caseId)}/event/${encodeURIComponent(eventId)}`;

  const searchParams = new URLSearchParams();
  appendQueryParams(searchParams, queryParams);
  if (expectedSub) {
    searchParams.set('expected_sub', expectedSub);
  }

  const queryString = searchParams.toString();
  return queryString ? `${base}${eventPath}?${queryString}` : `${base}${eventPath}`;
};

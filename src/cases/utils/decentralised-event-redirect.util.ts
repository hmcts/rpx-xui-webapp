import { Params } from '@angular/router';

const DECENTRALISED_EVENT_PREFIX = 'ext:';
const TEMPLATE_PLACEHOLDER = '%s';

const isDecentralisedEvent = (eventId?: string): boolean => {
  return !!eventId && eventId.startsWith(DECENTRALISED_EVENT_PREFIX);
};

const resolveUrlTemplate = (params: { template: string; prefix: string; caseType: string }): string | null => {
  const { template, prefix, caseType } = params;

  const firstPlaceholder = template.indexOf(TEMPLATE_PLACEHOLDER);
  if (firstPlaceholder !== -1 && template.indexOf(TEMPLATE_PLACEHOLDER, firstPlaceholder + TEMPLATE_PLACEHOLDER.length) !== -1) {
    console.error(
      `Decentralised event base URL template for prefix '${prefix}' contains multiple '${TEMPLATE_PLACEHOLDER}' placeholders`
    );
    return null;
  }

  if (firstPlaceholder === -1) {
    return template;
  }

  const suffix = caseType.substring(prefix.length);
  if (!suffix || suffix.trim().length === 0) {
    console.error(
      `Case type '${caseType}' matches prefix '${prefix}' but has no suffix for template substitution in '${template}'`
    );
    return null;
  }

  const resolved = template.replace(TEMPLATE_PLACEHOLDER, suffix);
  return resolved;
};

const getDecentralisedBaseUrl = (baseUrls: Record<string, string> | null | undefined, caseType?: string): string | null => {
  if (!baseUrls || !caseType) {
    return null;
  }

  const lowerCaseType = caseType.toLowerCase();
  const matchingPrefixes = Object.keys(baseUrls).filter((prefix) => lowerCaseType.startsWith(prefix.toLowerCase()));
  if (matchingPrefixes.length === 0) {
    return null;
  }

  const maxPrefixLength = matchingPrefixes.reduce((max, prefix) => Math.max(max, prefix.length), 0);
  const longestMatches = matchingPrefixes.filter((prefix) => prefix.length === maxPrefixLength);

  if (longestMatches.length > 1) {
    console.error(
      `Ambiguous decentralised event base URL configuration for case type '${caseType}'. Multiple longest prefix matches found: [${longestMatches.join(
        ', '
      )}]`
    );
    return null;
  }

  const prefix = longestMatches[0];
  const template = baseUrls[prefix];
  if (!template) {
    return null;
  }

  return resolveUrlTemplate({ template, prefix, caseType });
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

  // Remove any trailing slashes from our base url
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

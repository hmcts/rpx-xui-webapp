import { Params } from '@angular/router';
import type { DecentralisedCaseTypeConfigMap } from '../../models/environmentConfig.model';

const DECENTRALISED_EVENT_PREFIX = 'ext:';
const TEMPLATE_PLACEHOLDER = '%s';

const isDecentralisedEvent = (eventId?: string): eventId is string => {
  return !!eventId && eventId.startsWith(DECENTRALISED_EVENT_PREFIX);
};

const getDecentralisedWebUrl = (caseTypeConfig: DecentralisedCaseTypeConfigMap, caseType?: string): string | null => {
  if (!caseTypeConfig || !caseType) {
    return null;
  }

  const configuredCaseType = getConfiguredCaseType(caseTypeConfig, caseType);
  if (!configuredCaseType) {
    return null;
  }

  const webUrl = caseTypeConfig[configuredCaseType].webUrl;
  return webUrl ? resolveUrl(webUrl, configuredCaseType, caseType) : null;
};

export const getExpectedSubFromUserDetails = (userInfoStr?: string | null): string | null => {
  if (!userInfoStr) {
    return null;
  }

  try {
    const userInfo = JSON.parse(userInfoStr) as { id?: string; uid?: string };
    return userInfo.id || userInfo.uid || null;
  } catch {
    return null;
  }
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

interface BuildDecentralisedEventUrlCommonInput {
  eventId: string;
  caseType: string;
  queryParams?: Params;
}

interface BuildDecentralisedCaseCreateEventUrlInput extends BuildDecentralisedEventUrlCommonInput {
  isCaseCreate: true;
  jurisdiction: string;
}

interface BuildDecentralisedCaseEventUrlInput extends BuildDecentralisedEventUrlCommonInput {
  isCaseCreate: false;
  caseId: string;
}

export type BuildDecentralisedEventUrlInput = BuildDecentralisedCaseCreateEventUrlInput | BuildDecentralisedCaseEventUrlInput;

export const buildDecentralisedEventUrl = (
  params: BuildDecentralisedEventUrlInput,
  caseTypeConfig: DecentralisedCaseTypeConfigMap,
  expectedSub?: string
): string | null => {
  if (!isDecentralisedEvent(params.eventId)) {
    return null;
  }

  const webUrl = getDecentralisedWebUrl(caseTypeConfig, params.caseType);
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
  appendQueryParams(searchParams, params.queryParams);
  if (expectedSub) {
    searchParams.set('expected_sub', expectedSub);
  }

  const queryString = searchParams.toString();
  return queryString ? `${webUrl}${eventPath}?${queryString}` : `${webUrl}${eventPath}`;
};

const getConfiguredCaseType = (caseTypeConfig: DecentralisedCaseTypeConfigMap, caseType: string): string | null => {
  const lowerCaseType = caseType.toLowerCase();
  return (
    Object.keys(caseTypeConfig)
      .filter((configuredCaseType) => lowerCaseType.startsWith(configuredCaseType.toLowerCase()))
      .sort((first, second) => second.length - first.length)[0] || null
  );
};

const resolveUrl = (url: string, configuredCaseType: string, caseType: string): string => {
  let resolvedUrl = url.replace(TEMPLATE_PLACEHOLDER, caseType.substring(configuredCaseType.length));
  while (resolvedUrl.endsWith('/')) {
    resolvedUrl = resolvedUrl.slice(0, -1);
  }
  return resolvedUrl;
};

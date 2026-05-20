import { Params } from '@angular/router';
import { resolveDecentralisedCaseTypeConfig } from '../../../shared/decentralised-case-type-config.util';
import type { DecentralisedCaseTypeConfig, DecentralisedCaseTypeConfigMap } from '../../models/environmentConfig.model';

const DECENTRALISED_EVENT_PREFIX = 'ext:';

const isDecentralisedEvent = (eventId?: string): eventId is string => {
  return !!eventId && eventId.startsWith(DECENTRALISED_EVENT_PREFIX);
};

const getDecentralisedCaseTypeConfig = (
  caseTypeConfig: DecentralisedCaseTypeConfigMap,
  caseType?: string
): DecentralisedCaseTypeConfig | null => {
  return resolveDecentralisedCaseTypeConfig({
    caseTypeConfig,
    caseType,
    urlKey: 'webUrl',
    urlLabel: 'web URL',
    onError: (message) => console.error(message),
  });
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

  const config = getDecentralisedCaseTypeConfig(caseTypeConfig, params.caseType);
  if (!config) {
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
  return queryString ? `${config.webUrl}${eventPath}?${queryString}` : `${config.webUrl}${eventPath}`;
};

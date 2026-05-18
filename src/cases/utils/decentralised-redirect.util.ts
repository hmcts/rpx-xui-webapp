import { Params } from '@angular/router';
import type { DecentralisedCaseTypeConfig, DecentralisedCaseTypeConfigMap } from '../../models/environmentConfig.model';

const DECENTRALISED_EVENT_PREFIX = 'ext:';
const TEMPLATE_PLACEHOLDER = '%s';
const DECENTRALISED_NOC_PATH = '/noc';

const isDecentralisedEvent = (eventId?: string): eventId is string => {
  return !!eventId && eventId.startsWith(DECENTRALISED_EVENT_PREFIX);
};

const resolveUrlTemplate = (params: { template: string; prefix: string; caseType: string }): string | null => {
  const { template, prefix, caseType } = params;

  const placeholderCount = template.split(TEMPLATE_PLACEHOLDER).length - 1;
  if (placeholderCount > 1) {
    console.error(
      `Decentralised case type base URL template for prefix '${prefix}' contains multiple '${TEMPLATE_PLACEHOLDER}' placeholders`
    );
    return null;
  }

  if (placeholderCount === 0) {
    return template;
  }

  const suffix = caseType.substring(prefix.length);
  if (!suffix || suffix.trim().length === 0) {
    console.error(
      `Case type '${caseType}' matches prefix '${prefix}' but has no suffix for template substitution in '${template}'`
    );
    return null;
  }

  return template.replace(TEMPLATE_PLACEHOLDER, suffix);
};

const getDecentralisedCaseTypeConfig = (
  caseTypeConfig: DecentralisedCaseTypeConfigMap,
  caseType?: string
): DecentralisedCaseTypeConfig | null => {
  if (!caseTypeConfig || !caseType || caseType.trim().length === 0) {
    return null;
  }

  const lowerCaseType = caseType.toLowerCase();
  const matchingPrefixes = Object.keys(caseTypeConfig).filter((prefix) => lowerCaseType.startsWith(prefix.toLowerCase()));
  if (matchingPrefixes.length === 0) {
    return null;
  }

  const maxPrefixLength = matchingPrefixes.reduce((max, prefix) => Math.max(max, prefix.length), 0);
  const longestMatches = matchingPrefixes.filter((prefix) => prefix.length === maxPrefixLength);

  if (longestMatches.length > 1) {
    console.error(
      `Ambiguous decentralised case type base URL configuration for case type '${caseType}'. Multiple longest prefix matches found: [${longestMatches.join(
        ', '
      )}]`
    );
    return null;
  }

  const prefix = longestMatches[0];
  const config = caseTypeConfig[prefix];
  if (!config?.baseUrl) {
    return null;
  }

  const resolvedUrl = resolveUrlTemplate({ template: config.baseUrl, prefix, caseType });
  if (!resolvedUrl) {
    return null;
  }

  let trimmedUrl = resolvedUrl;
  while (trimmedUrl.endsWith('/')) {
    trimmedUrl = trimmedUrl.slice(0, -1);
  }
  return { ...config, baseUrl: trimmedUrl };
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

export interface BuildDecentralisedNocUrlInput {
  caseType: string;
  caseId: string;
}

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
  return queryString ? `${config.baseUrl}${eventPath}?${queryString}` : `${config.baseUrl}${eventPath}`;
};

export const buildDecentralisedNocUrl = (
  params: BuildDecentralisedNocUrlInput,
  caseTypeConfig: DecentralisedCaseTypeConfigMap,
  expectedSub?: string
): string | null => {
  const config = getDecentralisedCaseTypeConfig(caseTypeConfig, params.caseType);
  if (!config || config.nocRedirectEnabled === false) {
    return null;
  }

  const searchParams = new URLSearchParams();
  searchParams.set('caseId', params.caseId);
  if (expectedSub) {
    searchParams.set('expected_sub', expectedSub);
  }

  return `${config.baseUrl}${DECENTRALISED_NOC_PATH}?${searchParams.toString()}`;
};

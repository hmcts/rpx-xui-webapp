import { DecentralisedCaseTypeMap } from './decentralised-casetype';

const TEMPLATE_PLACEHOLDER = '%s';

export const getUrlForCaseType = (caseTypeMap: DecentralisedCaseTypeMap, caseType?: string): string | null => {
  if (!caseTypeMap || !caseType) {
    return null;
  }

  const configuredCaseType = getConfiguredCaseType(caseTypeMap, caseType);
  if (!configuredCaseType) {
    return null;
  }

  const webUrl = caseTypeMap[configuredCaseType].webUrl;
  return webUrl ? resolveUrl(webUrl, configuredCaseType, caseType) : null;
};

const getConfiguredCaseType = (caseTypeMap: DecentralisedCaseTypeMap, caseType: string): string | null => {
  const lowerCaseType = caseType.toLowerCase();
  return (
    Object.keys(caseTypeMap)
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

import { DecentralisedCaseTypeMap } from './decentralised-casetype';

const TEMPLATE_PLACEHOLDER = '%s';

export const getDecentralisedWebUrl = (caseTypeConfig: DecentralisedCaseTypeMap, caseType?: string): string | null => {
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

export const getConfiguredCaseType = (caseTypeConfig: DecentralisedCaseTypeMap, caseType: string): string | null => {
  const lowerCaseType = caseType.toLowerCase();
  return (
    Object.keys(caseTypeConfig)
      .filter((configuredCaseType) => lowerCaseType.startsWith(configuredCaseType.toLowerCase()))
      .sort((first, second) => second.length - first.length)[0] || null
  );
};

export const resolveUrl = (url: string, configuredCaseType: string, caseType: string): string => {
  let resolvedUrl = url.replace(TEMPLATE_PLACEHOLDER, caseType.substring(configuredCaseType.length));
  while (resolvedUrl.endsWith('/')) {
    resolvedUrl = resolvedUrl.slice(0, -1);
  }
  return resolvedUrl;
};

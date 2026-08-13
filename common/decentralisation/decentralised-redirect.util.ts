import { CaseTypeMapEntry, DecentralisedCaseTypeMap } from './decentralised-casetype';

const TEMPLATE_PLACEHOLDER = '%s';

export const getWebUrlForCaseType = (caseTypeMap?: DecentralisedCaseTypeMap, caseType?: string): string | null => {
  const caseTypeMapEntry = getMapEntry(caseTypeMap, caseType);
  return augmentUrl(caseTypeMapEntry?.value.webUrl, caseTypeMapEntry?.key, caseType);
};

export const getNocBaseUrlForCaseType = (caseTypeMap?: DecentralisedCaseTypeMap, caseType?: string): string | null => {
  const caseTypeMapEntry = getMapEntry(caseTypeMap, caseType);
  return augmentUrl(caseTypeMapEntry?.value.nocBaseUrl, caseTypeMapEntry?.key, caseType);
};

export const getMapEntry = (caseTypeMap?: DecentralisedCaseTypeMap, caseType?: string): CaseTypeMapEntry | null => {
  if (!caseTypeMap || !caseType) {
    return null;
  }

  const configuredCaseType = getConfiguredCaseType(caseTypeMap, caseType);
  if (!configuredCaseType) {
    return null;
  }

  return {
    key: configuredCaseType,
    value: caseTypeMap[configuredCaseType],
  };
};

export const augmentUrl = (url?: string, configuredCaseType?: string, caseType?: string): string | null => {
  return url && configuredCaseType && caseType ? resolveUrl(url, configuredCaseType, caseType) : null;
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

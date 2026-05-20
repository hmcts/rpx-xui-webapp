const TEMPLATE_PLACEHOLDER = '%s';

export interface ResolveDecentralisedCaseTypeConfigOptions<T extends object> {
  caseTypeConfig: Record<string, T>;
  caseType?: string;
  urlKey: string;
  urlLabel: string;
  onError?: (message: string) => void;
}

export const resolveDecentralisedCaseTypeConfig = <T extends object>(
  options: ResolveDecentralisedCaseTypeConfigOptions<T>
): T | null => {
  const { caseTypeConfig, caseType, urlKey, urlLabel, onError } = options;
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
    onError?.(
      `Ambiguous decentralised case type ${urlLabel} configuration for case type '${caseType}'. Multiple longest prefix matches found: [${longestMatches.join(
        ', '
      )}]`
    );
    return null;
  }

  const prefix = longestMatches[0];
  const config = caseTypeConfig[prefix] as T & Record<string, unknown>;
  const template = config[urlKey];
  if (typeof template !== 'string' || template.length === 0) {
    return null;
  }

  const resolvedUrl = resolveUrlTemplate({ template, prefix, caseType, urlLabel, onError });
  if (!resolvedUrl) {
    return null;
  }

  return { ...config, [urlKey]: trimTrailingSlashes(resolvedUrl) } as T;
};

function resolveUrlTemplate(params: {
  template: string;
  prefix: string;
  caseType: string;
  urlLabel: string;
  onError?: (message: string) => void;
}): string | null {
  const { template, prefix, caseType, urlLabel, onError } = params;
  const placeholderCount = template.split(TEMPLATE_PLACEHOLDER).length - 1;
  if (placeholderCount > 1) {
    onError?.(
      `Decentralised case type ${urlLabel} template for prefix '${prefix}' contains multiple '${TEMPLATE_PLACEHOLDER}' placeholders`
    );
    return null;
  }

  if (placeholderCount === 0) {
    return template;
  }

  const suffix = caseType.substring(prefix.length);
  if (!suffix || suffix.trim().length === 0) {
    onError?.(`Case type '${caseType}' matches prefix '${prefix}' but has no suffix for template substitution in '${template}'`);
    return null;
  }

  return template.replace(TEMPLATE_PLACEHOLDER, suffix);
}

function trimTrailingSlashes(url: string): string {
  let trimmedUrl = url;
  while (trimmedUrl.endsWith('/')) {
    trimmedUrl = trimmedUrl.slice(0, -1);
  }
  return trimmedUrl;
}

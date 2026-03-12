import { readFileSync } from 'node:fs';
import * as path from 'node:path';

/**
 * Shared Playwright configuration utility functions.
 * Used by both playwright.config.ts and playwright.e2e.config.ts to avoid duplication.
 */

type EnvMap = NodeJS.ProcessEnv;
type TagFilterConfig = {
  excludedTags?: string[];
  availableTags?: string[];
  availableServiceTags?: string[];
};

export type ResolvedTagFilters = {
  includeTags: string[];
  excludedTags: string[];
  availableTags: string[];
  grep?: RegExp;
  grepInvert?: RegExp;
  excludedTagsSource: 'file' | 'env';
  configPath: string;
  suiteTag?: string;
};

export type ResolveTagFiltersOptions = {
  env?: EnvMap;
  includeTagsEnvVar: string;
  excludedTagsEnvVar: string;
  configPathEnvVar: string;
  defaultConfigPath: string;
  suiteTag?: string;
};

/**
 * Parses a string environment variable as a non-negative integer.
 * Returns undefined for absent, empty, non-numeric, or negative values.
 */
export function parseNonNegativeInt(raw: string | undefined): number | undefined {
  if (!raw) {
    return undefined;
  }
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return undefined;
  }
  return parsed;
}

/**
 * Resolves the default Playwright reporter from PLAYWRIGHT_DEFAULT_REPORTER env var.
 * Falls back to 'dot' in CI, 'list' locally.
 */
export function resolveDefaultReporter(env: EnvMap = process.env): string {
  const configured = env.PLAYWRIGHT_DEFAULT_REPORTER?.trim();
  if (configured && ['dot', 'list', 'line'].includes(configured)) {
    return configured;
  }
  return env.CI ? 'dot' : 'list';
}

function ensureTagPrefix(value: string): string {
  const normalized = value.trim();
  if (!normalized) {
    return '';
  }
  return normalized.startsWith('@') ? normalized : `@${normalized}`;
}

export function splitTagInput(raw?: string): string[] {
  if (!raw) {
    return [];
  }
  const seen = new Set<string>();
  const tags: string[] = [];
  for (const token of raw.split(/[\s,]+/)) {
    const tag = ensureTagPrefix(token);
    if (!tag || seen.has(tag)) {
      continue;
    }
    seen.add(tag);
    tags.push(tag);
  }
  return tags;
}

const escapeRegex = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`); // NOSONAR typescript:S5852 — replaceAll requires ES2021; tsconfig targets ES2020

export function buildTagRegex(tags: string[]): RegExp | undefined {
  if (!tags.length) {
    return undefined;
  }
  return new RegExp(`(${tags.map(escapeRegex).join('|')})`);
}

function resolveTagFilterConfigPath(env: EnvMap, configPathEnvVar: string, defaultConfigPath: string): string {
  const configuredPath = env[configPathEnvVar]?.trim();
  const candidatePath = configuredPath && configuredPath.length > 0 ? configuredPath : defaultConfigPath;
  return path.isAbsolute(candidatePath) ? candidatePath : path.resolve(process.cwd(), candidatePath);
}

function resolveBooleanEnvFlag(rawValue: string | undefined): boolean {
  if (!rawValue) {
    return false;
  }
  return ['1', 'true', 'yes', 'on'].includes(rawValue.trim().toLowerCase());
}

function normalizeConfiguredTags(rawTags?: string[]): string[] {
  return splitTagInput(rawTags?.join(','));
}

function readTagFilterConfig(configPath: string): TagFilterConfig {
  try {
    const raw = readFileSync(configPath, 'utf8');
    const parsed = JSON.parse(raw) as TagFilterConfig;
    if (!parsed || typeof parsed !== 'object') {
      throw new TypeError('Config must be a JSON object');
    }
    if (parsed.excludedTags !== undefined && !Array.isArray(parsed.excludedTags)) {
      throw new TypeError('excludedTags must be an array');
    }
    if (parsed.availableTags !== undefined && !Array.isArray(parsed.availableTags)) {
      throw new TypeError('availableTags must be an array');
    }
    if (parsed.availableServiceTags !== undefined && !Array.isArray(parsed.availableServiceTags)) {
      throw new TypeError('availableServiceTags must be an array');
    }
    return parsed;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to read tag filter config at "${configPath}": ${message}`);
  }
}

function resolveAvailableTags(config: TagFilterConfig, configPath: string): string[] {
  const configured = Array.isArray(config.availableTags)
    ? config.availableTags
    : Array.isArray(config.availableServiceTags)
      ? config.availableServiceTags
      : [];
  const availableTags = normalizeConfiguredTags(configured);
  if (!availableTags.length) {
    throw new Error(`Tag filter config at "${configPath}" must define availableTags or availableServiceTags`);
  }
  return availableTags;
}

function validateKnownTags({
  tags,
  allowedTags,
  tagSource,
  configPath,
}: {
  tags: string[];
  allowedTags: Set<string>;
  tagSource: string;
  configPath: string;
}): void {
  const unknownTags = tags.filter((tag) => !allowedTags.has(tag));
  if (!unknownTags.length) {
    return;
  }
  throw new Error(`${tagSource} contains unknown tag(s): ${unknownTags.join(', ')}. Allowed tags come from "${configPath}".`);
}

function validateNonEmptyTaggedSelection({
  env,
  includeTags,
  excludedTags,
  availableTags,
  suiteTag,
  includeTagsEnvVar,
  excludedTagsEnvVar,
}: {
  env: EnvMap;
  includeTags: string[];
  excludedTags: string[];
  availableTags: string[];
  suiteTag: string;
  includeTagsEnvVar: string;
  excludedTagsEnvVar: string;
}): void {
  if (resolveBooleanEnvFlag(env.PLAYWRIGHT_ALLOW_EMPTY_TAG_SELECTION)) {
    return;
  }

  const featureTags = availableTags.filter((tag) => tag !== suiteTag);
  const requestedFeatureTags =
    includeTags.length === 0 || includeTags.includes(suiteTag) ? featureTags : includeTags.filter((tag) => tag !== suiteTag);
  const remainingFeatureTags = requestedFeatureTags.filter((tag) => !excludedTags.includes(tag));

  if (excludedTags.includes(suiteTag) || remainingFeatureTags.length === 0) {
    throw new Error(
      `Tag filters from ${includeTagsEnvVar}/${excludedTagsEnvVar} leave no tagged functional tests for ${suiteTag}. ` +
        `Remove the suite-wide exclusion or pick at least one feature/service tag. ` +
        `Set PLAYWRIGHT_ALLOW_EMPTY_TAG_SELECTION=true only when you intentionally want a no-op run.`
    );
  }
}

export function resolveTagFilters({
  env = process.env,
  includeTagsEnvVar,
  excludedTagsEnvVar,
  configPathEnvVar,
  defaultConfigPath,
  suiteTag,
}: ResolveTagFiltersOptions): ResolvedTagFilters {
  const includeTags = splitTagInput(env[includeTagsEnvVar]);
  const configPath = resolveTagFilterConfigPath(env, configPathEnvVar, defaultConfigPath);
  const config = readTagFilterConfig(configPath);
  const availableTags = resolveAvailableTags(config, configPath);
  const allowedTagSet = new Set(availableTags);

  if (suiteTag && !allowedTagSet.has(suiteTag)) {
    throw new Error(`Tag filter config at "${configPath}" must include suite tag "${suiteTag}" in its available tags`);
  }

  const configuredExcludedTags = normalizeConfiguredTags(config.excludedTags);
  const rawOverrideExcludedTags = splitTagInput(env[excludedTagsEnvVar]);
  const clearExcludedTagsOverride = rawOverrideExcludedTags.includes('@none');
  const overrideExcludedTags = rawOverrideExcludedTags.filter((tag) => tag !== '@none');
  const excludedTags = clearExcludedTagsOverride
    ? overrideExcludedTags
    : overrideExcludedTags.length > 0
      ? overrideExcludedTags
      : configuredExcludedTags;

  validateKnownTags({
    tags: configuredExcludedTags,
    allowedTags: allowedTagSet,
    tagSource: `${configPath} excludedTags`,
    configPath,
  });
  validateKnownTags({ tags: includeTags, allowedTags: allowedTagSet, tagSource: includeTagsEnvVar, configPath });
  validateKnownTags({
    tags: overrideExcludedTags,
    allowedTags: allowedTagSet,
    tagSource: excludedTagsEnvVar,
    configPath,
  });
  if (suiteTag) {
    validateNonEmptyTaggedSelection({
      env,
      includeTags,
      excludedTags,
      availableTags,
      suiteTag,
      includeTagsEnvVar,
      excludedTagsEnvVar,
    });
  }

  return {
    includeTags,
    excludedTags,
    availableTags,
    grep: buildTagRegex(includeTags),
    grepInvert: buildTagRegex(excludedTags),
    excludedTagsSource: clearExcludedTagsOverride || overrideExcludedTags.length > 0 ? 'env' : 'file',
    configPath,
    suiteTag,
  };
}

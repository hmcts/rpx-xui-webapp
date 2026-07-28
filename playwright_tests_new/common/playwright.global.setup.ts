import { FullConfig } from '@playwright/test';
import { sessionCapture } from './sessionCapture';
import { resolveIntegrationSessionWarmupUsers } from '../integration/helpers';
import playwrightConfigUtils from '../../playwright-config-utils';

const { resolveTagFilters } = playwrightConfigUtils;

function isIntegrationConfig(fullConfig: FullConfig): boolean {
  return fullConfig.projects.some((project) => project.testDir.replace(/\\/g, '/').endsWith('playwright_tests_new/integration'));
}

function resolveIntegrationTagSelection(env: NodeJS.ProcessEnv) {
  return resolveTagFilters({
    env,
    includeTagsEnvVar: 'INTEGRATION_PW_INCLUDE_TAGS',
    excludedTagsEnvVar: 'INTEGRATION_PW_EXCLUDED_TAGS_OVERRIDE',
    configPathEnvVar: 'INTEGRATION_PW_TAG_FILTER_CONFIG',
    defaultConfigPath: 'playwright_tests_new/integration/tag-filter.json',
    suiteTag: '@integration',
    globalExcludedTagsEnvVar: 'PLAYWRIGHT_GLOBAL_EXCLUDED_TAGS',
    ignoreGlobalExcludesEnvVar: 'PLAYWRIGHT_IGNORE_GLOBAL_EXCLUDES',
    globalExcludedTagsPattern: /^@integration(?:-.+)?$/,
  });
}

async function globalSetup(fullConfig: FullConfig) {
  const tagSelection = isIntegrationConfig(fullConfig) ? resolveIntegrationTagSelection(process.env) : undefined;
  const userIdentifiers = resolveIntegrationSessionWarmupUsers(process.env, tagSelection);
  if (userIdentifiers.length > 0) {
    await sessionCapture(userIdentifiers);
  }
}

export default globalSetup;

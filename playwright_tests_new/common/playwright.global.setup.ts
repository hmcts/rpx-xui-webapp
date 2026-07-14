import { FullConfig } from '@playwright/test';
import { validateIntegrationSessionConfiguration } from './integrationSessionConfiguration';
import { resolveIntegrationSessionUsers } from '../integration/helpers';
import * as playwrightConfigUtils from '../../playwright-config-utils';

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
  if (!isIntegrationConfig(fullConfig)) {
    return;
  }

  const tagSelection = resolveIntegrationTagSelection(process.env);
  const userIdentifiers = resolveIntegrationSessionUsers(process.env, tagSelection);
  validateIntegrationSessionConfiguration(userIdentifiers);
}

export default globalSetup;

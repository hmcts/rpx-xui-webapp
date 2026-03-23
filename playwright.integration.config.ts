import integrationConfigSupport from './playwright.integration.config.support.cjs';
import { resolveTagFilters } from './playwright-config-utils';

const {
  buildConfig: buildSupportConfig,
  resolveOdhinConsoleCapture,
  resolveOdhinHardTimeoutMs,
  resolveOdhinLightweight,
  resolveOdhinRuntimeHookTimeoutMs,
  resolveWorkerCount,
} = integrationConfigSupport as {
  buildConfig: (env: NodeJS.ProcessEnv) => {
    reporter: [string, Record<string, unknown> | undefined][];
    projects: Array<{ name: string; workers?: number; grep?: RegExp; grepInvert?: RegExp; use?: { channel?: string } }>;
  };
  resolveOdhinConsoleCapture: (env: NodeJS.ProcessEnv) => { consoleLog: boolean; consoleError: boolean };
  resolveOdhinHardTimeoutMs: (env: NodeJS.ProcessEnv) => number;
  resolveOdhinLightweight: (env: NodeJS.ProcessEnv) => boolean;
  resolveOdhinRuntimeHookTimeoutMs: (env: NodeJS.ProcessEnv) => number;
  resolveWorkerCount: (env: NodeJS.ProcessEnv) => number;
};

const resolveIntegrationTagFilters = (env: NodeJS.ProcessEnv = process.env) =>
  resolveTagFilters({
    env,
    includeTagsEnvVar: 'INTEGRATION_PW_INCLUDE_TAGS',
    excludedTagsEnvVar: 'INTEGRATION_PW_EXCLUDED_TAGS_OVERRIDE',
    configPathEnvVar: 'INTEGRATION_PW_TAG_FILTER_CONFIG',
    defaultConfigPath: 'playwright_tests_new/integration/tag-filter.json',
    suiteTag: '@integration',
  });

const buildConfig = (env: NodeJS.ProcessEnv = process.env) => {
  const config = buildSupportConfig(env);
  const integrationTagFilters = resolveIntegrationTagFilters(env);

  for (const project of config.projects ?? []) {
    project.grep = integrationTagFilters.grep;
    project.grepInvert = integrationTagFilters.grepInvert;
  }

  return config;
};

const config = buildConfig(process.env);
(config as { __test__?: unknown }).__test__ = {
  buildConfig,
  resolveWorkerCount,
  resolveIntegrationTagFilters,
  resolveOdhinHardTimeoutMs,
  resolveOdhinConsoleCapture,
  resolveOdhinLightweight,
  resolveOdhinRuntimeHookTimeoutMs,
};

export default config;

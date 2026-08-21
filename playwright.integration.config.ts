import integrationConfigSupport from './playwright.integration.config.support.cjs';
import { logResolvedTagFilters, resolveTagFilters } from './playwright-config-utils';

const {
  buildConfig: buildSupportConfig,
  resolveOdhinConsoleCapture,
  resolveOdhinHardTimeoutMs,
  resolveOdhinForceExitOnCompletion,
  resolveOdhinLightweight,
  resolveOdhinRuntimeHookTimeoutMs,
  resolveConfiguredSessionPoolCapacity,
  resolveWorkerCount,
} = integrationConfigSupport as {
  buildConfig: (env: NodeJS.ProcessEnv) => {
    reporter: [string, Record<string, unknown> | undefined][];
    workers?: number;
    projects: Array<{ name: string; workers?: number; grep?: RegExp; grepInvert?: RegExp; use?: { channel?: string } }>;
  };
  resolveOdhinConsoleCapture: (env: NodeJS.ProcessEnv) => { consoleLog: boolean; consoleError: boolean };
  resolveOdhinForceExitOnCompletion: (env: NodeJS.ProcessEnv) => boolean;
  resolveOdhinHardTimeoutMs: (env: NodeJS.ProcessEnv) => number;
  resolveOdhinLightweight: (env: NodeJS.ProcessEnv) => boolean;
  resolveOdhinRuntimeHookTimeoutMs: (env: NodeJS.ProcessEnv) => number;
  resolveConfiguredSessionPoolCapacity: (env: NodeJS.ProcessEnv) => number | undefined;
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
    globalExcludedTagsEnvVar: 'PLAYWRIGHT_GLOBAL_EXCLUDED_TAGS',
    ignoreGlobalExcludesEnvVar: 'PLAYWRIGHT_IGNORE_GLOBAL_EXCLUDES',
    globalExcludedTagsPattern: /^@integration(?:-.+)?$/,
  });

const buildConfig = (env: NodeJS.ProcessEnv = process.env) => {
  const integrationTagFilters = resolveIntegrationTagFilters(env);
  const requestedWorkers = resolveWorkerCount(env);
  const sessionPoolCapacity = resolveConfiguredSessionPoolCapacity(env);
  const effectiveEnv =
    sessionPoolCapacity !== undefined && requestedWorkers > sessionPoolCapacity
      ? { ...env, FUNCTIONAL_TESTS_WORKERS: String(sessionPoolCapacity) }
      : env;
  const config = buildSupportConfig(effectiveEnv);

  if (effectiveEnv !== env) {
    console.warn(
      `[Integration] Capping workers from ${requestedWorkers} to ${sessionPoolCapacity} to match the smallest active session pool (effective=${config.workers})`
    );
  }

  logResolvedTagFilters('Integration', integrationTagFilters, env);

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
  resolveConfiguredSessionPoolCapacity,
  resolveIntegrationTagFilters,
  resolveOdhinHardTimeoutMs,
  resolveOdhinForceExitOnCompletion,
  resolveOdhinConsoleCapture,
  resolveOdhinLightweight,
  resolveOdhinRuntimeHookTimeoutMs,
};

export default config;

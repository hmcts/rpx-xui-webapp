import integrationConfigSupport from './playwright.integration.config.support.cjs';
import { resolveWorkerCount } from './playwright-config-utils.ts';

const {
  buildConfig,
  resolveOdhinConsoleCapture,
  resolveOdhinHardTimeoutMs,
  resolveOdhinLightweight,
  resolveOdhinRuntimeHookTimeoutMs,
} = integrationConfigSupport as {
  buildConfig: (env: NodeJS.ProcessEnv) => unknown;
  resolveOdhinConsoleCapture: (env: NodeJS.ProcessEnv) => { consoleLog: boolean; consoleError: boolean };
  resolveOdhinHardTimeoutMs: (env: NodeJS.ProcessEnv) => number;
  resolveOdhinLightweight: (env: NodeJS.ProcessEnv) => boolean;
  resolveOdhinRuntimeHookTimeoutMs: (env: NodeJS.ProcessEnv) => number;
};

const config = buildConfig(process.env);
(config as { __test__?: unknown }).__test__ = {
  buildConfig,
  resolveWorkerCount,
  resolveOdhinHardTimeoutMs,
  resolveOdhinConsoleCapture,
  resolveOdhinLightweight,
  resolveOdhinRuntimeHookTimeoutMs,
};

export default config;

import path from 'node:path';
import { createRequire } from 'node:module';

export type EnvMap = Record<string, string | undefined>;

export interface ConfigModule {
  __test__?: {
    buildConfig: (env: EnvMap) => unknown;
    resolveWorkerCount: (env: EnvMap) => number;
  };
  default?: ConfigModule;
  [key: string]: unknown;
}

export interface TestableConfigModule extends ConfigModule {
  __test__: {
    buildConfig: (env: EnvMap) => unknown;
    resolveWorkerCount: (env: EnvMap) => number;
  };
}

const require = createRequire(import.meta.url);
require('ts-node/register/transpile-only');

export async function loadConfig(): Promise<TestableConfigModule> {
  return loadConfigAt('playwright.config.ts');
}

export async function loadConfigAt(relativePath: string): Promise<TestableConfigModule> {
  const configPath = path.resolve(process.cwd(), relativePath);
  const loaded = require(configPath) as ConfigModule;
  const resolved = resolveConfigModule(loaded as ConfigModule);
  if (!resolved.__test__) {
    throw new Error('Playwright config module did not expose __test__ helpers');
  }
  return resolved as TestableConfigModule;
}

export function resolveConfigModule(loaded: ConfigModule): ConfigModule {
  let current: ConfigModule = loaded;
  const visited = new Set<ConfigModule>();

  while (current && typeof current === 'object' && !visited.has(current)) {
    visited.add(current);
    if (current.__test__) {
      return current;
    }
    if (current.default) {
      current = current.default as ConfigModule;
      continue;
    }
    break;
  }

  return current ?? loaded;
}

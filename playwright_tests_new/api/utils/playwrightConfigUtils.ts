import path from 'node:path';
import { pathToFileURL } from 'node:url';

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

export async function loadConfig(): Promise<TestableConfigModule> {
  const configPath = path.resolve(process.cwd(), 'playwright.config.ts');
  const configUrl = pathToFileURL(configPath).href;
  const loaded = await import(configUrl);
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

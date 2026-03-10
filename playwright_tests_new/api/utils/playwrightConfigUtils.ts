import path from 'node:path';

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

export async function loadConfig(configFile = 'playwright.config.ts'): Promise<TestableConfigModule> {
  const configPath = path.resolve(process.cwd(), configFile);
  const { createJiti } = await import('jiti');
  const loadModule = createJiti(path.resolve(process.cwd(), 'package.json'));
  const loaded = loadModule(configPath);
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

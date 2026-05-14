import * as fs from 'node:fs';
import * as path from 'node:path';

const cwd = process.cwd();
const repoConfigCandidates = [path.resolve(cwd, 'config'), path.resolve(cwd, '..', 'config')];
const repoConfig = repoConfigCandidates.find((candidate) => fs.existsSync(candidate)) ?? repoConfigCandidates[0];

if (!process.env.NODE_CONFIG_DIR) {
  process.env.NODE_CONFIG_DIR = repoConfig;
}

if (!process.env.NODE_CONFIG_ENV) {
  process.env.NODE_CONFIG_ENV = 'development';
}

if (!process.env.FEATURE_APP_INSIGHTS_ENABLED) {
  process.env.FEATURE_APP_INSIGHTS_ENABLED = 'false';
}

const fs = require('node:fs');
const path = require('node:path');

const cwd = process.cwd();
const apiDirCandidates = [path.resolve(cwd, 'api'), cwd];
const apiDir = apiDirCandidates.find((candidate) => fs.existsSync(path.join(candidate, '.env.defaults'))) ?? apiDirCandidates[0];
const repoRoot = path.resolve(apiDir, '..');
const repoConfigDir = path.join(repoRoot, 'config');

if (!process.env.DOTENV_CONFIG_PATH) {
  process.env.DOTENV_CONFIG_PATH = path.join(repoRoot, '.env');
}

if (!process.env.DOTENV_CONFIG_DEFAULTS) {
  process.env.DOTENV_CONFIG_DEFAULTS = path.join(apiDir, '.env.defaults');
}

if (!process.env.NODE_CONFIG_DIR) {
  process.env.NODE_CONFIG_DIR = repoConfigDir;
}

if (!process.env.NODE_CONFIG_ENV) {
  process.env.NODE_CONFIG_ENV = 'development';
}

if (!process.env.FEATURE_APP_INSIGHTS_ENABLED) {
  process.env.FEATURE_APP_INSIGHTS_ENABLED = 'false';
}

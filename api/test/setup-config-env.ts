import path = require('node:path');

const currentDir = __dirname;
const apiRoot = path.resolve(currentDir, '..');
const repoRoot = path.resolve(apiRoot, '..');
const repoConfig = path.join(repoRoot, 'config');

if (!process.env.NODE_CONFIG_DIR) {
  process.env.NODE_CONFIG_DIR = repoConfig;
}

if (!process.env.NODE_CONFIG_ENV) {
  process.env.NODE_CONFIG_ENV = 'development';
}

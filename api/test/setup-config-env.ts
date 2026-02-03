import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentFilePath = typeof __filename === 'string' ? __filename : fileURLToPath(import.meta.url);

const currentDir = path.dirname(currentFilePath);
const apiRoot = path.resolve(currentDir, '..');
const repoRoot = path.resolve(apiRoot, '..');
const repoConfig = path.join(repoRoot, 'config');

if (!process.env.NODE_CONFIG_DIR) {
  process.env.NODE_CONFIG_DIR = repoConfig;
}

if (!process.env.NODE_CONFIG_ENV) {
  process.env.NODE_CONFIG_ENV = 'development';
}

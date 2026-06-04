#!/usr/bin/env node

import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const roots = [
  'playwright_tests_new/E2E/test',
  'playwright_tests_new/integration/test',
  'playwright_tests_new/api',
];

const walk = (dir, files = []) => {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      walk(fullPath, files);
      continue;
    }
    if (fullPath.endsWith('.spec.ts') || fullPath.endsWith('.api.ts')) {
      files.push(fullPath);
    }
  }
  return files;
};

const discovered = roots.flatMap((root) => {
  try {
    return walk(root, []);
  } catch {
    return [];
  }
});

const output = {
  generatedAt: new Date().toISOString(),
  discoveredCount: discovered.length,
  discovered,
};

process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);

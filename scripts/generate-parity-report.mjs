#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';

const parityMapPath = 'docs/playwright-migration-parity-map.json';
const isGateMode = process.argv.includes('--gate');
const legacyRoots = ['test_codecept'];
const targetRoots = ['playwright_tests_new/E2E/test', 'playwright_tests_new/integration/test', 'playwright_tests_new/api'];
const legacyExecutablePattern = /(?:\.feature|\.test\.[jt]s|\.spec\.[jt]s)$/;
const targetExecutablePattern = /(?:\.spec\.ts|\.api\.ts|\.unit\.api\.ts)$/;

const walk = (dir, predicate, files = []) => {
  if (!existsSync(dir)) {
    return files;
  }

  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      walk(fullPath, predicate, files);
      continue;
    }
    if (predicate(fullPath)) {
      files.push(fullPath);
    }
  }
  return files;
};

const escapeRegex = (value) => value.replace(/[|\\{}()[\]^$+?.]/g, '\\$&');

const patternToRegex = (pattern) => {
  const normalised = pattern.replaceAll('\\', '/');
  if (normalised.endsWith('/**')) {
    return new RegExp(`^${escapeRegex(normalised.slice(0, -3))}(?:/.*)?$`);
  }

  const regex = normalised.split('*').map(escapeRegex).join('[^/]*');
  return new RegExp(`^${regex}$`);
};

const parityMap = JSON.parse(readFileSync(parityMapPath, 'utf8'));
const entries = parityMap.entries.map((entry) => ({
  ...entry,
  matchers: entry.legacy.map(patternToRegex),
}));

const legacyFiles = legacyRoots.flatMap((root) => walk(root, (file) => legacyExecutablePattern.test(file))).sort();
const discoveredTargets = targetRoots.flatMap((root) => walk(root, (file) => targetExecutablePattern.test(file))).sort();

const findEntry = (legacyFile) => entries.find((entry) => entry.matchers.some((matcher) => matcher.test(legacyFile)));
const classified = legacyFiles.map((legacyFile) => ({ legacyFile, entry: findEntry(legacyFile) }));
const unclassified = classified.filter(({ entry }) => !entry).map(({ legacyFile }) => legacyFile);
const matchedLegacyByEntry = Object.fromEntries(
  entries.map((entry) => [
    entry.id,
    legacyFiles.filter((legacyFile) => entry.matchers.some((matcher) => matcher.test(legacyFile))),
  ])
);

const targetExists = (target) => {
  if (!target) {
    return true;
  }
  if (existsSync(target)) {
    return true;
  }
  if (target.endsWith('.ts') || target.endsWith('.md')) {
    return false;
  }
  return discoveredTargets.some((file) => file === target || file.startsWith(`${target}/`)) || existsSync(dirname(target));
};

const missingRequiredTargets = entries
  .filter((entry) => ['covered', 'partial'].includes(entry.status))
  .flatMap((entry) =>
    entry.targets.filter((target) => !targetExists(target)).map((target) => ({ id: entry.id, status: entry.status, target }))
  );

const statusCounts = entries.reduce((counts, entry) => {
  counts[entry.status] = (counts[entry.status] ?? 0) + 1;
  return counts;
}, {});

const priorityCounts = entries.reduce((counts, entry) => {
  counts[entry.priority] = (counts[entry.priority] ?? 0) + 1;
  return counts;
}, {});

const openP1Entries = entries
  .filter((entry) => entry.priority === 'P1' && ['partial', 'port'].includes(entry.status))
  .map((entry) => ({
    id: entry.id,
    status: entry.status,
    targets: entry.targets,
    matchedLegacyCount: matchedLegacyByEntry[entry.id].length,
    evidence: entry.evidence,
  }));

const blockingEntries = entries
  .filter((entry) => ['partial', 'port'].includes(entry.status))
  .map((entry) => ({
    id: entry.id,
    priority: entry.priority,
    status: entry.status,
    evidence: entry.evidence,
  }));

const output = {
  generatedAt: new Date().toISOString(),
  legacyExecutableCount: legacyFiles.length,
  playwrightTargetCount: discoveredTargets.length,
  classifiedLegacyCount: legacyFiles.length - unclassified.length,
  unclassifiedLegacyCount: unclassified.length,
  statusCounts,
  priorityCounts,
  openP1Entries,
  blockingEntries,
  missingRequiredTargets,
  unclassified,
  entries: entries.map(({ matchers, ...entry }) => ({
    ...entry,
    matchedLegacy: matchedLegacyByEntry[entry.id],
  })),
};

process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);

if (isGateMode && (unclassified.length > 0 || missingRequiredTargets.length > 0 || blockingEntries.length > 0)) {
  process.exitCode = 1;
}

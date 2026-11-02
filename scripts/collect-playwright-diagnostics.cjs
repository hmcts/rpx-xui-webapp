#!/usr/bin/env node
/* global console, module, process, require */
/* eslint-disable @typescript-eslint/no-require-imports */

'use strict';

const fs = require('node:fs');
const crypto = require('node:crypto');
const path = require('node:path');

const STRUCTURED_FILES = new Set(['failure-data.json', 'failure-context.json']);
const SCREENSHOT_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg']);

function parseArgs(argv) {
  const options = {
    testsRoot: path.resolve('functional-output/tests'),
    outputDir: path.resolve('functional-output/tests/playwright-diagnostics/failure-data'),
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--tests-root' || argument === '--output-dir') {
      const value = argv[index + 1];
      if (!value) {
        throw new Error(`Missing value for ${argument}`);
      }
      options[argument === '--tests-root' ? 'testsRoot' : 'outputDir'] = path.resolve(value);
      index += 1;
      continue;
    }
    throw new Error(`Unknown argument: ${argument}`);
  }

  return options;
}

function isWithin(candidate, parent) {
  const relative = path.relative(parent, candidate);
  return relative === '' || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative));
}

function readDirectories(root) {
  if (!fs.existsSync(root)) {
    return [];
  }

  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.isSymbolicLink())
    .map((entry) => path.join(root, entry.name))
    .sort();
}

function findLaneResults(testsRoot, excludedRoot) {
  const laneResults = [];
  const pending = [testsRoot];

  while (pending.length > 0) {
    const current = pending.pop();
    if (!current || isWithin(current, excludedRoot)) {
      continue;
    }

    for (const directory of readDirectories(current)) {
      if (isWithin(directory, excludedRoot)) {
        continue;
      }
      if (path.basename(directory) === 'test-results') {
        laneResults.push(directory);
      } else {
        pending.push(directory);
      }
    }
  }

  return laneResults.sort();
}

function findFiles(root) {
  const files = [];
  const pending = [root];

  while (pending.length > 0) {
    const current = pending.pop();
    if (!current) {
      continue;
    }

    for (const entry of fs
      .readdirSync(current, { withFileTypes: true })
      .sort((left, right) => left.name.localeCompare(right.name))) {
      const filePath = path.join(current, entry.name);
      if (entry.isDirectory() && !entry.isSymbolicLink()) {
        pending.push(filePath);
      } else if (entry.isFile()) {
        files.push(filePath);
      }
    }
  }

  return files.sort();
}

function classifyFile(filePath) {
  const basename = path.basename(filePath).toLowerCase();
  if (STRUCTURED_FILES.has(basename)) {
    return basename === 'failure-data.json' ? 'failureData' : 'failureContext';
  }
  if (basename === 'trace.zip') {
    return 'trace';
  }
  if (SCREENSHOT_EXTENSIONS.has(path.extname(basename))) {
    return 'screenshot';
  }
  return null;
}

function safeName(value) {
  return value.replace(/[^A-Za-z0-9._-]+/g, '_').replace(/^_+|_+$/g, '') || 'root';
}

function uniqueDestinationName(testsRoot, diagnostic, relativeFile) {
  const identity = path.relative(testsRoot, diagnostic.filePath).split(path.sep).join('/');
  const suffix = crypto.createHash('sha256').update(identity).digest('hex');
  return `${safeName(diagnostic.laneName)}__${safeName(path.basename(relativeFile))}__${suffix}`;
}

function discoverDiagnostics(testsRoot) {
  const diagnostics = [];
  const consolidatedRoot = path.join(testsRoot, 'playwright-diagnostics');
  for (const laneResults of findLaneResults(testsRoot, consolidatedRoot)) {
    const laneName = path.relative(testsRoot, laneResults) || 'test-results';
    for (const filePath of findFiles(laneResults)) {
      const type = classifyFile(filePath);
      if (type) {
        diagnostics.push({ filePath, laneName, type });
      }
    }
  }
  return diagnostics.sort((left, right) => left.filePath.localeCompare(right.filePath));
}

function resolveBuildId() {
  return (
    process.env.DIAGNOSTIC_BUILD_ID ||
    process.env.BUILD_TAG ||
    (process.env.JOB_NAME && process.env.BUILD_NUMBER ? `${process.env.JOB_NAME}#${process.env.BUILD_NUMBER}` : 'local')
  );
}

function prepareOutputDirectory(outputDir, buildId) {
  fs.mkdirSync(outputDir, { recursive: true });
  const manifestFile = path.join(outputDir, 'diagnostic-manifest.txt');
  const previousManifest = fs.existsSync(manifestFile) ? fs.readFileSync(manifestFile, 'utf8') : '';
  const previousBuildId = previousManifest.match(/^diagnostic_build_id=(.*)$/m)?.[1] ?? null;

  if (previousBuildId !== buildId) {
    for (const entry of fs.readdirSync(outputDir)) {
      fs.rmSync(path.join(outputDir, entry), { recursive: true, force: true });
    }
  }
}

function writeManifest(outputDir, buildId, diagnostics) {
  const counts = diagnostics.reduce((summary, diagnostic) => ({ ...summary, [diagnostic.type]: summary[diagnostic.type] + 1 }), {
    failureData: 0,
    failureContext: 0,
    trace: 0,
    screenshot: 0,
  });
  const count = diagnostics.length;
  const status = count > 0 ? 'present' : 'none-captured';
  const manifest = [
    `diagnostic_build_id=${buildId}`,
    `diagnostic_status=${status}`,
    `diagnostic_count=${count}`,
    `failure_data_count=${counts.failureData}`,
    `failure_context_count=${counts.failureContext}`,
    `trace_count=${counts.trace}`,
    `screenshot_count=${counts.screenshot}`,
  ].join('\n');
  fs.writeFileSync(path.join(outputDir, 'diagnostic-manifest.txt'), `${manifest}\n`);
}

function collectDiagnostics({ testsRoot, outputDir }) {
  const resolvedTestsRoot = path.resolve(testsRoot);
  const resolvedOutputDir = path.resolve(outputDir);
  const diagnostics = discoverDiagnostics(resolvedTestsRoot);
  const buildId = resolveBuildId();
  prepareOutputDirectory(resolvedOutputDir, buildId);

  for (const diagnostic of diagnostics) {
    if (!STRUCTURED_FILES.has(path.basename(diagnostic.filePath).toLowerCase())) {
      continue;
    }
    const relativeFile = path.relative(resolvedTestsRoot, diagnostic.filePath);
    const destination = path.join(resolvedOutputDir, uniqueDestinationName(resolvedTestsRoot, diagnostic, relativeFile));
    fs.copyFileSync(diagnostic.filePath, destination);
  }

  writeManifest(resolvedOutputDir, buildId, diagnostics);
  return { diagnostics, outputDir: resolvedOutputDir };
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const result = collectDiagnostics(options);
  console.log(`[playwright-diagnostics] ${result.diagnostics.length} diagnostic files discovered`);
}

if (require.main === module) {
  main();
}

module.exports = { classifyFile, collectDiagnostics, discoverDiagnostics, parseArgs };

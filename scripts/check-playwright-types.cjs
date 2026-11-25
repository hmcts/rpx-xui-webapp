#!/usr/bin/env node
const { execFileSync } = require('node:child_process');
const { createHash } = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
const baselinePath = path.join(__dirname, 'playwright-type-errors.baseline.json');
const isPlaywrightPath = (file) =>
  file.startsWith('playwright_tests_new/') ||
  file === 'playwright-config-utils.ts' ||
  /^playwright(?:[.-].+)?\.config\.ts$/.test(file);

function newDiagnostics(baseline, actual) {
  const counts = new Map();
  for (const error of baseline) counts.set(error, (counts.get(error) ?? 0) + 1);
  return actual.filter((error) => {
    const remaining = counts.get(error) ?? 0;
    if (remaining === 0) return true;
    counts.set(error, remaining - 1);
    return false;
  });
}

const resolvedDiagnostics = (baseline, actual) => newDiagnostics(actual, baseline);

function missingCompiledPaths(tracked, compiled) {
  const compiledSet = new Set(compiled);
  return tracked.filter((file) => !compiledSet.has(file));
}

function diagnosticKey(diagnostic, file) {
  const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, ' ').replace(/\s+/g, ' ');
  const sourceLine = diagnostic.file
    ? diagnostic.file.text.split(/\r?\n/)[diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start ?? 0).line]?.trim()
    : '';
  const sourceHash = createHash('sha256')
    .update(sourceLine ?? '')
    .digest('hex');
  return `${file}|TS${diagnostic.code}|${message}|${sourceHash}`;
}

function collect() {
  const configPath = path.join(root, 'playwright_tests_new/tsconfig.json');
  const config = ts.readConfigFile(configPath, ts.sys.readFile);
  if (config.error) throw new Error(ts.flattenDiagnosticMessageText(config.error.messageText, ' '));
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, path.dirname(configPath));
  if (parsed.errors.length) {
    throw new Error(parsed.errors.map((error) => ts.flattenDiagnosticMessageText(error.messageText, ' ')).join('\n'));
  }
  const relative = (file) => path.relative(root, file).replaceAll(path.sep, '/');
  const compiled = parsed.fileNames.map(relative);
  const tracked = execFileSync(
    'git',
    [
      'ls-files',
      '--cached',
      '--others',
      '--exclude-standard',
      '--',
      'playwright_tests_new',
      'playwright*.config.ts',
      'playwright-config-utils.ts',
    ],
    {
      cwd: root,
      encoding: 'utf8',
    }
  )
    .trim()
    .split('\n')
    .filter((file) => /\.[cm]?tsx?$/.test(file) && isPlaywrightPath(file));
  const missing = missingCompiledPaths(tracked, compiled);
  if (missing.length) throw new Error(`Playwright files omitted by TypeScript: ${missing.join(', ')}`);

  const program = ts.createProgram(parsed.fileNames, parsed.options);
  const diagnostics = ts.getPreEmitDiagnostics(program).filter((diagnostic) => {
    return !diagnostic.file || isPlaywrightPath(relative(diagnostic.file.fileName));
  });
  const errors = diagnostics.map((diagnostic) => {
    const file = diagnostic.file ? relative(diagnostic.file.fileName) : '<config>';
    return diagnosticKey(diagnostic, file);
  });
  return { errors: errors.sort(), trackedCount: tracked.length };
}

function run() {
  const { errors, trackedCount } = collect();
  const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
  const added = newDiagnostics(baseline, errors);
  const stale = resolvedDiagnostics(baseline, errors);
  if (added.length || stale.length) {
    throw new Error(
      [
        added.length ? `${added.length} new Playwright TypeScript error(s):\n${added.slice(0, 20).join('\n')}` : '',
        stale.length ? `${stale.length} resolved error(s) still in the baseline:\n${stale.slice(0, 20).join('\n')}` : '',
      ]
        .filter(Boolean)
        .join('\n')
    );
  }
  console.log(`Checked ${trackedCount} tracked Playwright TypeScript files; ${errors.length} known errors, 0 new.`);
}

if (require.main === module) {
  try {
    run();
  } catch (error) {
    console.error(`[playwright-typecheck] ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = { collect, diagnosticKey, isPlaywrightPath, missingCompiledPaths, newDiagnostics, resolvedDiagnostics };

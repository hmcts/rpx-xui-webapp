#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, renameSync, unlinkSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const scriptPath = fileURLToPath(import.meta.url);
const workspaceRoot = path.resolve(path.dirname(scriptPath), '..', '..');
const webappRoot = path.join(workspaceRoot, 'rpx-xui-webapp');
const webappManifestPath = path.join(webappRoot, 'package.json');
const statePath = path.join(workspaceRoot, '.local-shared-packages-state.json');
const requiredNodeMajor = 24;

ensureNodeVersion();

const corepackScript = path.join(
  path.dirname(path.dirname(process.execPath)),
  'lib',
  'node_modules',
  'corepack',
  'dist',
  'corepack.js'
);

const sharedPackages = [
  {
    label: 'XUI translation',
    name: 'rpx-xui-translation',
    repository: 'rpx-xui-translation',
    output: 'dist/rpx-xui-translation',
    buildScripts: ['build:library']
  },
  {
    label: 'XUI common library',
    name: '@hmcts/rpx-xui-common-lib',
    repository: 'rpx-xui-common-lib',
    output: 'dist/exui-common-lib',
    buildScripts: ['build:library']
  },
  {
    label: 'Media viewer',
    name: '@hmcts/media-viewer',
    repository: 'rpx-xui-media-viewer',
    output: 'dist/media-viewer',
    buildScripts: ['build:lib', 'sync:dist-dependencies', 'copy:lib-files']
  },
  {
    label: 'CCD case UI toolkit',
    name: '@hmcts/ccd-case-ui-toolkit',
    repository: 'ccd-case-ui-toolkit',
    output: 'dist/ccd-case-ui-toolkit',
    buildScripts: ['build:library']
  },
  {
    label: 'XUI Node library',
    name: '@hmcts/rpx-xui-node-lib',
    repository: 'rpx-xui-node-lib',
    output: '.',
    buildScripts: ['build']
  }
];

const command = process.argv[2] || 'setup';
const skipSourceInstall = process.argv.includes('--skip-source-install');

try {
  validateWorkspace();

  switch (command) {
    case 'setup':
      buildSharedPackages();
      linkSharedPackages();
      printReadyMessage();
      break;
    case 'build':
      buildSharedPackages();
      break;
    case 'link':
      linkSharedPackages();
      printReadyMessage();
      break;
    case 'start':
      buildSharedPackages();
      linkSharedPackages();
      runYarn(webappRoot, ['start:ng']);
      break;
    case 'build-webapp':
      buildSharedPackages();
      linkSharedPackages();
      runYarn(webappRoot, ['build:dev']);
      break;
    case 'restore':
    case 'unlink':
      restoreRegistryPackages();
      break;
    case 'status':
      printStatus();
      break;
    case 'help':
    case '--help':
    case '-h':
      printUsage();
      break;
    default:
      throw new Error(`Unknown command: ${command}`);
  }
} catch (error) {
  console.error(`\nLocal shared-package setup failed: ${error.message}`);
  process.exit(1);
}

function ensureNodeVersion() {
  const currentMajor = Number(process.versions.node.split('.')[0]);
  if (currentMajor >= requiredNodeMajor) {
    return;
  }

  const nvmRoot = process.env.NVM_DIR || path.join(os.homedir(), '.nvm');
  const versionsRoot = path.join(nvmRoot, 'versions', 'node');
  const candidates = existsSync(versionsRoot)
    ? readdirSync(versionsRoot)
      .filter((entry) => entry.startsWith(`v${requiredNodeMajor}.`))
      .sort(compareNodeVersions)
      .reverse()
    : [];
  const nodeBinary = candidates.length
    ? path.join(versionsRoot, candidates[0], 'bin', 'node')
    : '';

  if (!nodeBinary || !existsSync(nodeBinary)) {
    console.error(`Node ${requiredNodeMajor} is required. Install it with nvm, then rerun this script.`);
    process.exit(1);
  }

  const result = spawnSync(nodeBinary, [scriptPath, ...process.argv.slice(2)], {
    cwd: process.cwd(),
    stdio: 'inherit',
    env: process.env
  });
  process.exit(result.status ?? 1);
}

function compareNodeVersions(left, right) {
  const parts = (value) => value.slice(1).split('.').map(Number);
  const leftParts = parts(left);
  const rightParts = parts(right);
  for (let index = 0; index < 3; index += 1) {
    const difference = (leftParts[index] || 0) - (rightParts[index] || 0);
    if (difference) {
      return difference;
    }
  }
  return 0;
}

function validateWorkspace() {
  if (!existsSync(webappManifestPath)) {
    throw new Error(`Webapp manifest not found: ${webappManifestPath}`);
  }
  if (!existsSync(corepackScript)) {
    throw new Error(`Corepack was not found for Node ${process.versions.node}.`);
  }
  for (const sharedPackage of sharedPackages) {
    const repositoryRoot = packageRepositoryRoot(sharedPackage);
    if (!existsSync(path.join(repositoryRoot, 'package.json'))) {
      throw new Error(`${sharedPackage.label} repository not found: ${repositoryRoot}`);
    }
  }
}

function buildSharedPackages() {
  console.log(`Using Node ${process.versions.node}.`);
  for (const sharedPackage of sharedPackages) {
    const repositoryRoot = packageRepositoryRoot(sharedPackage);
    console.log(`\nBuilding ${sharedPackage.label}...`);
    if (!skipSourceInstall) {
      runYarn(repositoryRoot, ['install', '--immutable']);
    }
    for (const buildScript of sharedPackage.buildScripts) {
      runYarn(repositoryRoot, [buildScript]);
    }
    validateBuildOutput(sharedPackage);
  }
  console.log('\nAll shared packages built successfully.');
}

function linkSharedPackages() {
  for (const sharedPackage of sharedPackages) {
    validateBuildOutput(sharedPackage);
  }

  const manifest = readJson(webappManifestPath);
  const resolutions = { ...(manifest.resolutions || {}) };
  let state;

  if (existsSync(statePath)) {
    state = readJson(statePath);
    if (state.webappManifest !== webappManifestPath || state.version !== 1) {
      throw new Error(`Unrecognised local-link state file: ${statePath}`);
    }
  } else {
    state = {
      version: 1,
      webappManifest: webappManifestPath,
      originalResolutions: {}
    };
    for (const sharedPackage of sharedPackages) {
      state.originalResolutions[sharedPackage.name] = Object.hasOwn(resolutions, sharedPackage.name)
        ? { present: true, value: resolutions[sharedPackage.name] }
        : { present: false };
    }
    writeJsonAtomic(statePath, state);
  }

  for (const sharedPackage of sharedPackages) {
    resolutions[sharedPackage.name] = portalResolution(sharedPackage);
  }
  manifest.resolutions = sortObject(resolutions);
  writeJsonAtomic(webappManifestPath, manifest);

  console.log('\nInstalling the webapp with local shared-package portals...');
  runYarn(webappRoot, ['install']);
  printStatus();
}

function restoreRegistryPackages() {
  const manifest = readJson(webappManifestPath);
  const resolutions = { ...(manifest.resolutions || {}) };

  if (existsSync(statePath)) {
    const state = readJson(statePath);
    for (const sharedPackage of sharedPackages) {
      const original = state.originalResolutions?.[sharedPackage.name];
      if (original?.present) {
        resolutions[sharedPackage.name] = original.value;
      } else {
        delete resolutions[sharedPackage.name];
      }
    }
    unlinkSync(statePath);
  } else {
    for (const sharedPackage of sharedPackages) {
      if (resolutions[sharedPackage.name] === portalResolution(sharedPackage)) {
        delete resolutions[sharedPackage.name];
      }
    }
  }

  if (Object.keys(resolutions).length) {
    manifest.resolutions = sortObject(resolutions);
  } else {
    delete manifest.resolutions;
  }
  writeJsonAtomic(webappManifestPath, manifest);

  console.log('Restoring registry-backed packages in the webapp...');
  runYarn(webappRoot, ['install']);
  console.log('Local shared-package portals removed.');
}

function validateBuildOutput(sharedPackage) {
  const outputRoot = packageOutputRoot(sharedPackage);
  const outputManifestPath = path.join(outputRoot, 'package.json');
  if (!existsSync(outputManifestPath)) {
    throw new Error(`${sharedPackage.label} build output is missing: ${outputManifestPath}`);
  }

  const outputManifest = readJson(outputManifestPath);
  if (outputManifest.name !== sharedPackage.name) {
    throw new Error(
      `${sharedPackage.label} output has package name ${outputManifest.name || '<missing>'}; expected ${sharedPackage.name}.`
    );
  }

  const entryPoint = outputManifest.exports?.['.']?.default || outputManifest.module || outputManifest.main;
  const resolvedEntryPoint = entryPoint ? path.resolve(outputRoot, entryPoint) : '';
  const entryPointExists = resolvedEntryPoint && [
    resolvedEntryPoint,
    `${resolvedEntryPoint}.js`,
    `${resolvedEntryPoint}.mjs`,
    `${resolvedEntryPoint}.cjs`
  ].some((candidate) => existsSync(candidate));
  if (!entryPointExists) {
    throw new Error(`${sharedPackage.label} output entry point is missing: ${entryPoint || '<not declared>'}.`);
  }
}

function printStatus() {
  const manifest = readJson(webappManifestPath);
  const resolutions = manifest.resolutions || {};
  console.log('\nLocal shared-package status:');
  for (const sharedPackage of sharedPackages) {
    const expected = portalResolution(sharedPackage);
    const current = resolutions[sharedPackage.name];
    const status = current === expected ? 'linked' : 'registry';
    console.log(`  ${status.padEnd(8)} ${sharedPackage.name}${current && current !== expected ? ` (${current})` : ''}`);
  }
}

function printReadyMessage() {
  console.log('\nThe webapp is ready to use the locally built packages.');
  console.log(`Start it with:\n  cd ${webappRoot}\n  yarn start:ng`);
  console.log(`\nRestore registry packages with:\n  ${scriptPath} restore`);
}

function printUsage() {
  console.log(`Usage: ${path.basename(scriptPath)} <command> [--skip-source-install]\n
Commands:
  setup          Install, build, and link all shared packages (default)
  build          Install and build the shared packages without linking them
  link           Link existing build outputs into the webapp
  start          Set up local packages and start the webapp development server
  build-webapp   Set up local packages and build the webapp in development mode
  status         Show whether each shared package is local or registry-backed
  restore        Remove local portals and restore registry-backed packages
  help           Show this help

Options:
  --skip-source-install  Skip yarn install in each shared-package repository`);
}

function packageRepositoryRoot(sharedPackage) {
  return path.join(workspaceRoot, sharedPackage.repository);
}

function packageOutputRoot(sharedPackage) {
  return path.resolve(packageRepositoryRoot(sharedPackage), sharedPackage.output);
}

function portalResolution(sharedPackage) {
  const relativeOutput = path.relative(webappRoot, packageOutputRoot(sharedPackage)).split(path.sep).join('/');
  return `portal:${relativeOutput}`;
}

function runYarn(cwd, args) {
  const result = spawnSync(process.execPath, [corepackScript, 'yarn', ...args], {
    cwd,
    stdio: 'inherit',
    env: process.env
  });
  if (result.status !== 0) {
    throw new Error(`yarn ${args.join(' ')} failed in ${path.basename(cwd)}.`);
  }
}

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

function writeJsonAtomic(filePath, value) {
  const temporaryPath = `${filePath}.local-shared-packages.tmp`;
  writeFileSync(temporaryPath, `${JSON.stringify(value, null, 2)}\n`);
  renameSync(temporaryPath, filePath);
}

function sortObject(value) {
  return Object.fromEntries(Object.entries(value).sort(([left], [right]) => left.localeCompare(right)));
}

/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS script. */
/* global require, module, process, console */
const packages = ['@playwright/test', 'playwright', 'playwright-core'];

function verifyPlaywrightVersions(manifest, installed) {
  const expected = manifest.devDependencies?.['@playwright/test'];
  if (typeof expected !== 'string' || !/^\d+\.\d+\.\d+$/.test(expected)) {
    return ['devDependencies.@playwright/test must be an exact x.y.z version'];
  }
  const errors = [];
  for (const name of packages) {
    if (installed[name] !== expected) {
      errors.push(`${name}: expected ${expected}, installed ${installed[name] ?? 'missing'}`);
    }
    const declared = manifest.devDependencies[name];
    if (declared !== expected) {
      errors.push(`devDependencies.${name}: expected ${expected}, declared ${declared ?? 'missing'}`);
    }
  }
  return errors;
}

module.exports = { verifyPlaywrightVersions };

if (require.main === module) {
  try {
    const manifest = require('../package.json');
    const installed = Object.fromEntries(packages.map((name) => [name, require(`${name}/package.json`).version]));
    const errors = verifyPlaywrightVersions(manifest, installed);
    if (errors.length) {
      throw new Error(errors.join('\n'));
    }
    console.log(packages.map((name) => `${name}: ${installed[name]}`).join('\n'));
  } catch (error) {
    console.error(`Playwright version verification failed: ${error.message}`);
    process.exitCode = 1;
  }
}

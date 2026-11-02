/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS tests. */
/* global require */
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { readFileSync } = require('node:fs');
const { runInNewContext } = require('node:vm');
const { verifyPlaywrightVersions } = require('../../scripts/verify-playwright-version.cjs');

const version = '1.64.1';
const packages = ['@playwright/test', 'playwright', 'playwright-core'];
const installed = Object.fromEntries(packages.map((name) => [name, version]));
const manifest = { devDependencies: { ...installed }, resolutions: { 'unrelated-package': '2.0.0' } };

test('accepts matched installed packages and manifest pins', () => {
  assert.deepEqual(verifyPlaywrightVersions(manifest, installed), []);
});

for (const name of packages) {
  test(`rejects mismatched installed ${name}`, () => {
    assert.deepEqual(verifyPlaywrightVersions(manifest, { ...installed, [name]: '1.63.0' }), [
      `${name}: expected ${version}, installed 1.63.0`,
    ]);
  });
  test(`rejects missing installed ${name}`, () => {
    assert.deepEqual(verifyPlaywrightVersions(manifest, { ...installed, [name]: undefined }), [
      `${name}: expected ${version}, installed missing`,
    ]);
  });
}

test('requires an exact manifest devDependency', () => {
  for (const pin of [undefined, '^1.64.1', '~1.64.1']) {
    assert.deepEqual(
      verifyPlaywrightVersions({ devDependencies: { ...manifest.devDependencies, '@playwright/test': pin } }, installed),
      ['devDependencies.@playwright/test must be an exact x.y.z version']
    );
  }
});

for (const name of ['playwright', 'playwright-core']) {
  for (const pin of [undefined, '1.63.0', '^1.64.1']) {
    test(`rejects ${name} devDependency pin ${pin ?? 'missing'}`, () => {
      const candidate = { ...manifest, devDependencies: { ...manifest.devDependencies, [name]: pin } };
      assert.deepEqual(verifyPlaywrightVersions(candidate, installed), [
        `devDependencies.${name}: expected ${version}, declared ${pin ?? 'missing'}`,
      ]);
    });
  }
}

for (const state of ['matched', 'mismatched', 'missing']) {
  test(`CLI reports ${state} packages with the correct exit status`, () => {
    const output = [];
    const errors = [];
    const context = {
      module: { exports: {} },
      process: { exitCode: 0 },
      console: { log: (message) => output.push(message), error: (message) => errors.push(message) },
      require: (name) => {
        if (name === '../package.json') return manifest;
        if (name === 'playwright-core/package.json' && state === 'missing') {
          throw new Error(`Cannot find module '${name}'`);
        }
        return { version: state === 'mismatched' ? '1.63.0' : version };
      },
    };
    context.require.main = context.module;
    runInNewContext(readFileSync(require.resolve('../../scripts/verify-playwright-version.cjs'), 'utf8'), context);
    assert.equal(context.process.exitCode, state === 'matched' ? 0 : 1);
    if (state === 'matched') {
      assert.deepEqual(output, [packages.map((name) => `${name}: ${version}`).join('\n')]);
      assert.deepEqual(errors, []);
    } else {
      assert.deepEqual(output, []);
      assert.match(
        errors[0],
        state === 'missing' ? /Cannot find module 'playwright-core/ : /expected 1\.64\.1, installed 1\.63\.0/
      );
    }
  });
}

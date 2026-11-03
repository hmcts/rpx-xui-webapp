/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS tests. */
/* global require */
const assert = require('node:assert/strict');
const { test } = require('node:test');

require('ts-node').register({
  transpileOnly: true,
  experimentalResolver: true,
  moduleTypes: { '**/*.ts': 'cjs' },
  compilerOptions: { module: 'CommonJS', moduleResolution: 'node' },
});
const { resolveSessionStorageKey } = require('./sessionIdentity.ts');

test('explicit cache identity retains account and key dimensions', () => {
  const account = { userIdentifier: 'A', email: 'a@example.test', password: 'dummy', sessionKey: 'shared+session' };
  assert.notEqual(resolveSessionStorageKey(account), resolveSessionStorageKey({ ...account, email: 'b@example.test' }));
  assert.notEqual(resolveSessionStorageKey(account), resolveSessionStorageKey({ ...account, sessionKey: 'shared-session' }));
});

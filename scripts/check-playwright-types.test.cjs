const assert = require('node:assert/strict');
const test = require('node:test');
const ts = require('typescript');
const {
  diagnosticKey,
  isPlaywrightPath,
  newDiagnostics,
  missingCompiledPaths,
  resolvedDiagnostics,
} = require('./check-playwright-types.cjs');

test('includes every root Playwright config in the compiler gate', () => {
  for (const file of ['playwright.config.ts', 'playwright.e2e.config.ts', 'playwright-nightly.config.ts']) {
    assert.equal(isPlaywrightPath(file), true, file);
  }
});

test('allows a moved existing error and resolved debt after baseline cleanup', () => {
  assert.deepEqual(newDiagnostics(['api/a.ts|TS2322|bad type'], ['api/a.ts|TS2322|bad type']), []);
  assert.deepEqual(resolvedDiagnostics([], []), []);
});

test('rejects a stale baseline entry after its compiler error is fixed', () => {
  assert.deepEqual(resolvedDiagnostics(['api/a.ts|TS2322|bad type'], []), ['api/a.ts|TS2322|bad type']);
});

test('rejects an extra occurrence even when its code and message match old debt', () => {
  assert.deepEqual(newDiagnostics(['api/a.ts|TS2322|bad type'], ['api/a.ts|TS2322|bad type', 'api/a.ts|TS2322|bad type']), [
    'api/a.ts|TS2322|bad type',
  ]);
});

test('rejects newly tracked Playwright TypeScript omitted by the compiler', () => {
  assert.deepEqual(missingCompiledPaths(['playwright_tests_new/api/new.spec.ts'], ['playwright_tests_new/api/old.spec.ts']), [
    'playwright_tests_new/api/new.spec.ts',
  ]);
});

test('distinguishes a new bad source line from identical old diagnostic wording', () => {
  const makeDiagnostic = (line) => ({
    code: 2322,
    messageText: "Type 'string' is not assignable to type 'number'.",
    file: ts.createSourceFile('playwright_tests_new/api/a.ts', line, ts.ScriptTarget.Latest),
    start: 0,
  });
  const old = diagnosticKey(makeDiagnostic('const first: number = "x";'), 'playwright_tests_new/api/a.ts');
  const changed = diagnosticKey(makeDiagnostic('const second: number = "x";'), 'playwright_tests_new/api/a.ts');
  assert.deepEqual(newDiagnostics([old], [changed]), [changed]);
});

test('keeps the same fingerprint when an existing bad line moves', () => {
  const makeDiagnostic = (prefix) => {
    const source = `${prefix}const first: number = "x";`;
    return {
      code: 2322,
      messageText: "Type 'string' is not assignable to type 'number'.",
      file: ts.createSourceFile('playwright_tests_new/api/a.ts', source, ts.ScriptTarget.Latest),
      start: source.indexOf('const first'),
    };
  };
  const old = diagnosticKey(makeDiagnostic(''), 'playwright_tests_new/api/a.ts');
  const moved = diagnosticKey(makeDiagnostic('// moved down\n'), 'playwright_tests_new/api/a.ts');
  assert.deepEqual(newDiagnostics([old], [moved]), []);
});

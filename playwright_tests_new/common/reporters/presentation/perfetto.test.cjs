const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(`${__dirname}/report.js`, 'utf8').split("// Perfetto's documented")[1];

async function check(mode) {
  let click, listener;
  let removed = false;
  const messages = [];
  const popup = { closed: false, postMessage: (...args) => messages.push(args) };
  const status = {};
  const button = {
    addEventListener: (_, fn) => {
      click = fn;
    },
    closest: () => ({
      querySelector: (selector) =>
        selector === 'a[download]' ? { href: 'http://localhost/perfetto.json', download: 'perfetto.json' } : status,
    }),
  };
  const buffer = new ArrayBuffer(8);
  const context = {
    document: { querySelectorAll: () => [button] },
    window: {
      open: () => (mode === 'blocked' ? null : popup),
      addEventListener: (_, fn) => {
        listener = fn;
      },
      removeEventListener: (_, fn) => {
        removed = fn === listener;
      },
    },
    AbortController,
    fetch: async () => ({ ok: mode !== 'http-error', status: 403, arrayBuffer: async () => buffer }),
    setInterval: () => 1,
    clearInterval() {},
    setTimeout: () => 2,
    clearTimeout() {},
  };
  vm.runInNewContext("// Perfetto's documented" + source, context);
  const pending = click();
  if (mode === 'ok') {
    listener({ origin: 'https://wrong.example', source: popup, data: 'PONG' });
    listener({ origin: 'https://ui.perfetto.dev', source: {}, data: 'PONG' });
    await new Promise((resolve) => setImmediate(resolve));
    assert.equal(messages.length, 0, 'Untrusted handshakes must not receive a trace');
    listener({ origin: 'https://ui.perfetto.dev', source: popup, data: 'PONG' });
  }
  await pending;
  if (mode === 'ok') {
    assert.equal(messages[0][0].perfetto.buffer, buffer);
    assert.equal(messages[0][1], 'https://ui.perfetto.dev');
    assert.match(status.textContent, /sent to Perfetto/);
  } else assert.match(status.textContent, /Download JSON/);
  if (mode !== 'blocked') {
    assert.equal(button.disabled, false);
    assert.equal(removed, true);
  }
}
(async () => {
  for (const mode of ['blocked', 'http-error', 'ok']) await check(mode);
  console.log('Perfetto handshake, origin/source checks, blocked popup and HTTP failure passed.');
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

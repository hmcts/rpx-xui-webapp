const fs   = require('fs');
const net  = require('net');
const path = require('path');
const { spawn } = require('child_process');

// ─── cheap on-disk lock ─────────────────────────────────────────
const LOCK = path.resolve(__dirname, '../../.ssr.lock');
let   lockFd = null;
let   ssr    = null; 

function acquireLock() {
  try {
    // exclusive create, throws EEXIST when someone else holds the lock
    lockFd = fs.openSync(LOCK, 'wx');
    return lockFd;
  } catch (e) {
    if (e.code !== 'EEXIST') throw e;
    return null;           // another worker owns the lock
  }
}

function releaseLock() {
  if (lockFd !== null) {
    fs.closeSync(lockFd);
    fs.unlinkSync(LOCK);
    lockFd = null;
  }
}

function cleanup(trigger = 0) {
  try {
    if (ssr) ssr.kill('SIGTERM');
    releaseLock();
  } finally {
    // If invoked by a signal, ensure a clean exit
    if (typeof trigger === 'string') process.exit(0);
  }
}

// run cleanup for every relevant termination path
process.on('exit', cleanup);
['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach(sig =>
  process.once(sig, () => cleanup(sig))
);
process.once('uncaughtException',  err => { console.error(err); cleanup(1); });
process.once('unhandledRejection', err => { console.error(err); cleanup(1); });

//
// ──────────────────────────────────────────────────────────────────────────
// helper – resolves once the port probe succeeds/fails
// ──────────────────────────────────────────────────────────────────────────
function isPortFree (port) {
  return new Promise((resolve) => {
    const tester = net.createServer()
      .once('error', () => resolve(false)) // EADDRINUSE
      .once('listening', () => {
        tester.close(() => resolve(true));
      })
      .listen(port, '::');
  });
}

(async () => {
  /* 1 ── copy local-mock.json once ─────────────────────────────── */
  const cfgDir = path.resolve(__dirname, '../../config');
  if (!fs.existsSync(path.join(cfgDir, 'local-mock.json'))) {
    fs.copyFileSync(
      path.join(__dirname, 'local-mock.json'),
      path.join(cfgDir,  'local-mock.json')
    );
  }

  /* 1a ── ensure session folders exist ─────────────────────────── */
  ['../../.sessions', '../../api/.sessions'].forEach(rel => {
    const dir = path.resolve(__dirname, rel);
    fs.mkdirSync(dir, { recursive: true });
    console.log('[mock] ensured', dir);
  });

  /* 2 ── start Mock API (8080) ─────────────────────────────────── */
  const mock = require('./app');
  await mock.startServer();          // will no-op if already started
  process.env.MOCK_ALREADY_RUNNING = 'true';

  /* 3 ── start SSR (3000) only once, via the lock ─────────────── */
  const PORT   = 3000;
  const lockFd = acquireLock();          // null if a lock already exists

  if (lockFd && await isPortFree(PORT)) {
    console.log('[mock] starting SSR on :3000')
    const env = {
      ...process.env,
      NODE_CONFIG_ENV   : 'mock',
      TEST_CSP_OFF      : 'true',
      SSR_ALREADY_RUNNING: 'true'
    };

    const ssr = spawn(
      process.platform === 'win32' ? 'yarn.cmd' : 'yarn',
      ['node', 'dist/rpx-exui/api/server.bundle.js'],
      { cwd: path.resolve(__dirname, '../../'), stdio: 'inherit', env }
    );

    // ensure we don’t leave stray children
    process.on('exit', () => { ssr.kill(); releaseLock(lockFd); });

  } else {
    console.log('[mock] another worker is starting / already started SSR – waiting for it');
    // spin-wait until :3000 is really listening
    while (await isPortFree(PORT)) {
      await new Promise(r => setTimeout(r, 200));
    }
  }
})();

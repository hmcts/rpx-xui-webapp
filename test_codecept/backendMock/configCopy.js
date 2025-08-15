const fs = require('fs');
const net = require('net');
const path = require('path');
const { spawn } = require('child_process');

/* ── reference-count lock ───────────────────────────────────── */
const LOCK_DIR = path.resolve(__dirname, '../../.ssr.lock');
const COUNTER_FILE = path.join(LOCK_DIR, 'counter');
const OWNER_PIDFILE = path.join(LOCK_DIR, 'owner.pid');

let ssr = null; // holds the spawned SSR process (owner only)
let iAmOwner = false; // true if THIS worker started the server

function readInt(fp) { return Number(fs.readFileSync(fp, 'utf8').trim() || '0'); }
function writeInt(fp, n) { fs.writeFileSync(fp, String(n)); }

/** Acquire the lock; return true if THIS worker should spawn SSR */
function acquireLock() {
  try {
    /* first worker creates the directory */
    fs.mkdirSync(LOCK_DIR, { recursive: false });
    writeInt(COUNTER_FILE, 1);
    writeInt(OWNER_PIDFILE, process.pid);
    iAmOwner = true;
    return true; // start SSR
  } catch (e) {
    if (e.code !== 'EEXIST') throw e;     // real error

    /* directory already exists ⇒ bump counter (retry if file busy) */
    for (let retries = 0; retries < 5; retries++) {
      try {
        const n = readInt(COUNTER_FILE);
        writeInt(COUNTER_FILE, n + 1);
        break;
      } catch { /* short wait then retry */ }
    }
    return false; // SSR is already or will be up
  }
}

function releaseLock() {
  try {
    if (!fs.existsSync(COUNTER_FILE)) return; // someone else cleaned up

    const n = Math.max(0, readInt(COUNTER_FILE) - 1);
    writeInt(COUNTER_FILE, n);

    if (n === 0) {
      /* last worker out – remove dir */
      try {
        const ownerPid = readInt(OWNER_PIDFILE);
        if (ownerPid) process.kill(ownerPid, 'SIGTERM');
      } catch { /* already dead */ }

      fs.rmSync(LOCK_DIR, { recursive: true, force: true });
    }
  } catch (e) {
    if (e.code !== 'ENOENT') {  // ignore “file already gone”
      console.error('[lock] release failed:', e);
    }
  }
}

/* unified cleanup for all exit paths */
function cleanup(trigger = 0) {
  try {
    if (iAmOwner && ssr) ssr.kill('SIGTERM');
    releaseLock();
  } finally {
    if (typeof trigger === 'string') process.exit(0);
  }
}

process.on('exit', cleanup);
['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach(sig =>
  process.once(sig, () => cleanup(sig))
);
process.once('uncaughtException', err => { console.error(err); cleanup(1); });
process.once('unhandledRejection', err => { console.error(err); cleanup(1); });

/* ── helper – probe a port ───────────────────────────────────── */
function isPortFree(port) {
  return new Promise(res => {
    const t = net.createServer()
      .once('error', () => res(false))
      .once('listening', () => t.close(() => res(true)))
      .listen(port, '::');
  });
}

(async () => {
  /* 1 - copy local-mock.json once */
  const cfgDir = path.resolve(__dirname, '../../config');
  if (!fs.existsSync(path.join(cfgDir, 'local-mock.json'))) {
    fs.copyFileSync(
      path.join(__dirname, 'local-mock.json'),
      path.join(cfgDir, 'local-mock.json')
    );
  }

  /* 1a - ensure session folders */
  ['../../.sessions', '../../api/.sessions'].forEach(rel => {
    fs.mkdirSync(path.resolve(__dirname, rel), { recursive: true });
  });

  /* 2 - start Mock API */
  const mock = require('./app');
  await mock.startServer();
  process.env.MOCK_ALREADY_RUNNING = 'true';

  /* 3 - SSR behind reference-count lock */
  const PORT = 3000;
  const shouldStart = acquireLock(); // true only for first worker

  if (shouldStart && await isPortFree(PORT)) {
    console.log('[mock] starting SSR on :3000');

    const env = {
      ...process.env,
      NODE_CONFIG_ENV: 'mock',
      TEST_CSP_OFF: 'true',
      SSR_ALREADY_RUNNING: 'true'
    };

    ssr = spawn(
      process.platform === 'win32' ? 'yarn.cmd' : 'yarn',
      ['node', 'dist/rpx-exui/api/server.bundle.js'],
      { cwd: path.resolve(__dirname, '../../'), stdio: 'inherit', env }
    );

  } else {
    console.log('[mock] waiting for shared SSR on :3000 …');
    while (await isPortFree(PORT)) await new Promise(r => setTimeout(r, 200));
  }
})();

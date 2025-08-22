const fs = require('fs');
const net = require('net');
const path = require('path');
const { spawn } = require('child_process');

/* ── reference-count lock ───────────────────────────────────── */
const LOCK_DIR = path.resolve(__dirname, '../../.ssr.lock');
const COUNTER_FILE = path.join(LOCK_DIR, 'counter');
const OWNER_PIDFILE = path.join(LOCK_DIR, 'owner.pid');
const KEEP_SSR_ALIVE = process.env.KEEP_SSR_ALIVE === 'true';

let ssr = null;
let iAmOwner = false;

function readInt(fp) { return Number(fs.readFileSync(fp, 'utf8').trim() || '0'); }
function writeInt(fp, n) { fs.writeFileSync(fp, String(n)); }

function acquireLock() {
  try {
    fs.mkdirSync(LOCK_DIR, { recursive: false });
    writeInt(COUNTER_FILE, 1);
    writeInt(OWNER_PIDFILE, process.pid);
    iAmOwner = true;
    return true;
  } catch (e) {
    if (e.code !== 'EEXIST') throw e;
    for (let retries = 0; retries < 5; retries++) {
      try {
        const n = readInt(COUNTER_FILE);
        writeInt(COUNTER_FILE, n + 1);
        break;
      } catch { }
    }
    return false;
  }
}

function releaseLock() {
  try {
    if (!fs.existsSync(COUNTER_FILE)) return;
    const n = Math.max(0, readInt(COUNTER_FILE) - 1);
    writeInt(COUNTER_FILE, n);
    if (n === 0) {
      const dirs = [
        path.resolve(__dirname, '../../.sessions'),
        path.resolve(__dirname, '../../api/.sessions')
      ];
      for (const dir of dirs) {
        try {
          fs.rmSync(dir, { recursive: true, force: true });
          fs.mkdirSync(dir, { recursive: true });
          console.log('[mock] cleaned', dir);
        } catch (e) {
          console.warn('[mock] could not clean', dir, e.message);
        }
      }
      if (!KEEP_SSR_ALIVE) {
        try {
          const ownerPid = readInt(OWNER_PIDFILE);
          if (ownerPid) process.kill(ownerPid, 'SIGTERM');
        } catch { }
      } else {
        console.log('[mock] SSR kept alive for shared run (KEEP_SSR_ALIVE=true)');
      }
      fs.rmSync(LOCK_DIR, { recursive: true, force: true });
    }
  } catch (e) {
    if (e.code !== 'ENOENT') console.error('[lock] release failed:', e);
  }
}

function cleanup(trigger = 0) {
  try { releaseLock(); } finally {
    if (typeof trigger === 'string') process.exit(0);
  }
}

process.on('exit', cleanup);
['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach(sig => process.once(sig, () => cleanup(sig)));
process.once('uncaughtException', err => { console.error(err); cleanup(1); });
process.once('unhandledRejection', err => { console.error(err); cleanup(1); });

/* ── helper – probe a port (dual stack) ─────────────────────── */
function isPidAlive(pid) {
  try { if (!pid) return false; process.kill(pid, 0); return true; }
  catch { return false; }
}
function probeOnce(port, host) {
  return new Promise((res) => {
    const s = net.createServer()
      .once('error', () => res(false))
      .once('listening', () => s.close(() => res(true)))
      .listen(port, host);
  });
}
async function isPortFree(port) {
  const [v4, v6] = await Promise.allSettled([
    probeOnce(port, '127.0.0.1'),
    probeOnce(port, '::'),
  ]);
  const ok4 = v4.status === 'fulfilled' ? v4.value : false;
  const ok6 = v6.status === 'fulfilled' ? v6.value : false;
  return ok4 && ok6;
}

/* ── main ───────────────────────────────────────────────────── */
(async () => {
  /* 1 - copy local-mock.json once */
  const cfgDir = path.resolve(__dirname, '../../config');
  if (!fs.existsSync(path.join(cfgDir, 'local-mock.json'))) {
    fs.copyFileSync(path.join(__dirname, 'local-mock.json'), path.join(cfgDir, 'local-mock.json'));
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

  // --- stale lock recovery (inside async function) ✅ ---
  try {
    if (fs.existsSync(LOCK_DIR)) {
      const ownerPid = fs.existsSync(OWNER_PIDFILE) ? readInt(OWNER_PIDFILE) : 0;
      if (await isPortFree(PORT) && !isPidAlive(ownerPid)) {
        console.warn('[mock] stale SSR lock detected; cleaning and reclaiming.');
        fs.rmSync(LOCK_DIR, { recursive: true, force: true });
      }
    }
  } catch (e) {
    console.warn('[mock] stale-lock check failed:', e.message);
  }

  const shouldStart = acquireLock(); // true only for first (or reclaimed) worker

  if (shouldStart && await isPortFree(PORT)) {
    console.log('[mock] starting SSR on :3000');

    const env = {
      ...process.env,
      NODE_CONFIG_ENV: 'mock',
      TEST_CSP_OFF: 'true',
      SSR_ALREADY_RUNNING: 'true'
    };

    const serverEntry = path.resolve(__dirname, '../../dist/rpx-exui/api/server.bundle.js');
    if (!fs.existsSync(serverEntry)) {
      console.error('[mock] SSR entry missing:', serverEntry);
    }

    ssr = spawn(process.platform === 'win32' ? 'yarn.cmd' : 'yarn',
      ['node', 'dist/rpx-exui/api/server.bundle.js'],
      { cwd: path.resolve(__dirname, '../../'), stdio: 'inherit', env });

    // Helpful diagnostics if SSR dies before binding:
    ssr.on('exit', (code, signal) => console.error('[mock] SSR exited', { code, signal }));
    ssr.on('error', (err) => console.error('[mock] SSR spawn error', err));

  } else {
    console.log('[mock] waiting for shared SSR on :3000 …');
    const start = Date.now();
    while (await isPortFree(PORT)) {
      await new Promise(r => setTimeout(r, 200));
      if (Date.now() - start > 20000) {  // optional 20s safeguard
        console.warn('[mock] SSR still not up; re-checking stale lock.');
        // try once more to reclaim a stale lock
        try {
          if (fs.existsSync(LOCK_DIR)) {
            const ownerPid = fs.existsSync(OWNER_PIDFILE) ? readInt(OWNER_PIDFILE) : 0;
            if (!isPidAlive(ownerPid)) {
              fs.rmSync(LOCK_DIR, { recursive: true, force: true });
              break; // allow next worker to become owner on next cycle
            }
          }
        } catch { }
      }
    }
  }
})();

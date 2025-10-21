const fs = require('fs');
const net = require('net');
const http = require('http');
const https = require('https');
const path = require('path');
const { spawn } = require('child_process');

/* ── settings ───────────────────────────────────────────────── */
const SSR_PORT = Number(process.env.SSR_PORT || 3000);
const HEALTH_PATH = '/external/configuration-ui/';
const HEALTH_TIMEOUT_MS = Number(process.env.SSR_HEALTH_TIMEOUT_MS || 2500);

/* build the 3 common ways callers may address localhost */
const HEALTH_URLS = [
  `http://127.0.0.1:${SSR_PORT}${HEALTH_PATH}`,
  `http://localhost:${SSR_PORT}${HEALTH_PATH}`,
  `http://[::1]:${SSR_PORT}${HEALTH_PATH}`, // IPv6 literal
];

/* ── reference-count lock for SSR we start ourselves ───────── */
const LOCK_DIR = path.resolve(__dirname, '../../.ssr.lock');
const COUNTER_FILE = path.join(LOCK_DIR, 'counter');
const OWNER_PIDFILE = path.join(LOCK_DIR, 'owner.pid');
const KEEP_SSR_ALIVE = process.env.KEEP_SSR_ALIVE === 'true';

let ssr = null;

/* ── fs helpers ─────────────────────────────────────────────── */
function readInt(fp) { return Number(fs.readFileSync(fp, 'utf8').trim() || '0'); }
function writeInt(fp, n) { fs.writeFileSync(fp, String(n)); }

/* ── lock helpers ───────────────────────────────────────────── */
function acquireLock() {
  try {
    fs.mkdirSync(LOCK_DIR, { recursive: false });
    writeInt(COUNTER_FILE, 1);
    writeInt(OWNER_PIDFILE, process.pid);
    return true;
  } catch (e) {
    if (e.code !== 'EEXIST') throw e;
    for (let i = 0; i < 5; i++) {
      try { const n = readInt(COUNTER_FILE); writeInt(COUNTER_FILE, n + 1); break; } catch { }
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
        try { fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true }); console.log('[mock] cleaned', dir); }
        catch (e) { console.warn('[mock] could not clean', dir, e.message); }
      }
      if (!KEEP_SSR_ALIVE) {
        try { const ownerPid = readInt(OWNER_PIDFILE); if (ownerPid) process.kill(ownerPid, 'SIGTERM'); } catch { }
      } else {
        console.log('[mock] SSR kept alive for shared run (KEEP_SSR_ALIVE=true)');
      }
      fs.rmSync(LOCK_DIR, { recursive: true, force: true });
    }
  } catch (e) {
    if (e.code !== 'ENOENT') console.error('[lock] release failed:', e);
  }
}

/* ── unified cleanup ────────────────────────────────────────── */
function cleanup(trigger = 0) {
  try { releaseLock(); } finally { if (typeof trigger === 'string') process.exit(0); }
}
process.on('exit', cleanup);
['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach(sig => process.once(sig, () => cleanup(sig)));
process.once('uncaughtException', err => { console.error(err); cleanup(1); });
process.once('unhandledRejection', err => { console.error(err); cleanup(1); });

/* ── port & http probes ─────────────────────────────────────── */
function probeOnce(port, host) {
  return new Promise((res) => {
    const s = net.createServer()
      .once('error', () => res(false))
      .once('listening', () => s.close(() => res(true)))
      .listen(port, host);
  });
}

async function isPortFree(port) {
  // try OS-default bind (no host) first, then v4, then v6
  const results = await Promise.allSettled([
    probeOnce(port),               // no host: all interfaces per OS policy
    probeOnce(port, '127.0.0.1'),  // IPv4 loopback
    probeOnce(port, '::1'),        // IPv6 loopback
  ]);

  const anyOK = results.some(r => r.status === 'fulfilled' && r.value === true);
  return anyOK;  // free if we can bind on at least one
}

function httpGetJson(url, timeoutMs) {
  return new Promise((resolve) => {
    const lib = url.startsWith('https:') ? https : http;
    const req = lib.get(url, { timeout: timeoutMs }, (res) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        try {
          resolve({ ok: res.statusCode >= 200 && res.statusCode < 300, status: res.statusCode, json: JSON.parse(data) });
        } catch {
          resolve({ ok: false, status: res.statusCode, json: null });
        }
      });
    });
    req.on('timeout', () => { req.destroy(); resolve({ ok: false, status: 0, json: null }); });
    req.on('error', () => resolve({ ok: false, status: 0, json: null }));
  });
}

async function healthOK() {
  for (const url of HEALTH_URLS) {
    const { ok, status } = await httpGetJson(url, HEALTH_TIMEOUT_MS);
    if (ok) return { ok: true, url, status };
  }
  return { ok: false, url: HEALTH_URLS[0], status: 0 };
}

/* ── tiny stub on :3000 that serves /external/configuration-ui/ ── */
function startStub3000() {
  const cfg = { launchDarklyClientId: 'local-test', appInsightsKey: '', buildVersion: 'test-run' };
  const handler = (req, res) => {
    if (req.url && req.url.startsWith(HEALTH_PATH)) {
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify(cfg));
    } else {
      res.statusCode = 404; res.end('');
    }
  };

  const srv = http.createServer(handler);

  // helper that logs each bind attempt and result
  const tryListen = (label, host) => new Promise((resolve, reject) => {
    console.log(`[mock] stub: attempting bind on :${SSR_PORT} ${label}`);
    const onError = (err) => {
      console.error(`[mock] stub: failed to bind ${label} :${SSR_PORT} — ${err.code || err.message}`);
      srv.removeListener('listening', onListening);
      reject(err);
    };
    const onListening = async () => {
      srv.removeListener('error', onError);
      console.log(`[mock] stub: SUCCESS on ${label} :${SSR_PORT}`);
      // self-probe to prove the handler is alive
      try {
        const probe = await httpGetJson(`http://127.0.0.1:${SSR_PORT}${HEALTH_PATH}`, 1000);
        console.log(`[mock] stub: self probe => ${probe.status} (ok=${probe.ok})`);
      } catch (e) {
        console.warn('[mock] stub: self probe failed', e?.message || e);
      }
      resolve();
    };
    srv.once('error', onError);
    srv.once('listening', onListening);
    // undefined host ⇒ OS default (all interfaces per policy)
    srv.listen(SSR_PORT, host);
  });

  // Try default bind first, then IPv4, then IPv6 (each logs outcome)
  return tryListen('(all interfaces)', undefined)
    .catch(() => tryListen('IPv4', '127.0.0.1'))
    .catch(() => tryListen('IPv6', '::1'))
    .then(() => {
      console.log('[mock] stubbed /external/configuration-ui on :%d', SSR_PORT);
      return srv;
    });
}

/* ── main ───────────────────────────────────────────────────── */
(async () => {
  /* 1 - copy local-mock.json once */
  const cfgDir = path.resolve(__dirname, '../../config');
  if (!fs.existsSync(path.join(cfgDir, 'local-mock.json'))) {
    fs.copyFileSync(path.join(__dirname, 'local-mock.json'), path.join(cfgDir, 'local-mock.json'));
  }

  /* 1a - ensure session folders */
  ['../../.sessions', '../../api/.sessions'].forEach(rel =>
    fs.mkdirSync(path.resolve(__dirname, rel), { recursive: true })
  );

  /* 2 - start Mock API */
  const mock = require('./app');
  await mock.startServer();
  process.env.MOCK_ALREADY_RUNNING = 'true';

  /* 3 - SSR logic: start if free; adopt if busy; fail fast if busy & unhealthy */
  const PORT_FREE = await isPortFree(SSR_PORT);
  const serverEntry = path.resolve(__dirname, '../../dist/rpx-exui/api/server.bundle.js');

  if (PORT_FREE) {
    const shouldStart = acquireLock();
    if (shouldStart && fs.existsSync(serverEntry)) {
      console.log('[mock] starting SSR on :%d', SSR_PORT);

      const env = {
        ...process.env,
        NODE_CONFIG_ENV: 'mock',
        TEST_CSP_OFF: 'true',
        SSR_ALREADY_RUNNING: 'true'
      };

      ssr = spawn(process.platform === 'win32' ? 'yarn.cmd' : 'yarn',
        ['node', 'dist/rpx-exui/api/server.bundle.js'],
        { cwd: path.resolve(__dirname, '../../'), stdio: 'inherit', env });

      // Wait up to ~25s for health, then stub
      const t0 = Date.now();
      while (Date.now() - t0 < 25000) {
        const h = await healthOK();
        if (h.ok) { console.log('[mock] SSR healthy at %s', h.url); return; }
        await new Promise(r => setTimeout(r, 200));
      }
      console.warn('[mock] SSR did not become healthy – starting stub on :%d', SSR_PORT);
      await startStub3000();
      return;
    }

    // Not the owner or no dist artifact: spin a stub immediately so wait-on can pass
    console.log('[mock] no SSR ownership (or dist missing) – starting stub on :%d', SSR_PORT);
    await startStub3000();
    return;
  }

  // Port busy – check if it’s a compatible SSR/stub
  const h = await healthOK();
  if (h.ok) {
    console.log('[mock] adopting existing SSR at %s (status %s)', h.url, h.status);
    process.env.SSR_ALREADY_RUNNING = 'true';
    return; // let wait-on succeed
  }

  // Busy but not healthy ⇒ we still must satisfy wait-on on :SSR_PORT
  console.warn(`[mock] :${SSR_PORT} is busy but not serving ${HEALTH_PATH}. Starting stub so tests can proceed.`);
  try {
    await startStub3000();
    return;
  } catch (e) {
    // If another process owns :SSR_PORT, bind will fail; be explicit so CI doesn't "hang"
    console.error(`[mock] stub: could not bind :${SSR_PORT} (still occupied). ` +
      `Either free the port or set SSR_PORT/WEB_BASE_URL to a free port (e.g. 3100).`);
    process.exit(2);
  }
})();

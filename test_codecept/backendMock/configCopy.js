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
  const [v4, v6] = await Promise.allSettled([
    probeOnce(port, '127.0.0.1'),
    probeOnce(port, '::'),
  ]);
  const ok4 = v4.status === 'fulfilled' ? v4.value : false;
  const ok6 = v6.status === 'fulfilled' ? v6.value : false;
  return ok4 && ok6;
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

  // Try without host (all interfaces), then fall back to v4 or v6
  const srv = http.createServer(handler);
  const tryListen = () => new Promise((resolve, reject) => {
    const onError = (err) => reject(err);
    const onListening = () => resolve();
    srv.once('error', onError);
    srv.once('listening', onListening);
    srv.listen(SSR_PORT, () => { });  // no host ⇒ OS default
  });

  return tryListen().then(() => {
    console.log('[mock] stubbed /external/configuration-ui on :%d', SSR_PORT);
    return srv;
  }).catch(async () => {
    // Retry explicitly on IPv4
    await new Promise((resolve, reject) => {
      srv.removeAllListeners('error'); srv.removeAllListeners('listening');
      srv.once('error', reject); srv.once('listening', resolve);
      srv.listen(SSR_PORT, '127.0.0.1');
    }).catch(async () => {
      // Retry explicitly on IPv6
      await new Promise((resolve, reject) => {
        srv.removeAllListeners('error'); srv.removeAllListeners('listening');
        srv.once('error', reject); srv.once('listening', resolve);
        srv.listen(SSR_PORT, '::1');
      });
    }).then(() => {
      console.log('[mock] stubbed /external/configuration-ui on :%d (single-stack)', SSR_PORT);
      return srv;
    });
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

  // Busy but not healthy ⇒ ignore it; we use :8080 for tests anyway
  console.warn(`[mock] :${SSR_PORT} is busy but not serving ${HEALTH_PATH}. Proceeding; tests target :8080.`);
  // do nothing; mock on :8080 provides the UI and health
})();

const fs   = require('fs');
const path = require('path');
const { spawn } = require('child_process');

(async () => {
  /* 1 ── copy local-mock.json once ─────────────────────────────── */
  const cfgDir = path.resolve(__dirname, '../../config');
  if (!fs.existsSync(path.join(cfgDir, 'local-mock.json'))) {
    fs.copyFileSync(
      path.join(__dirname, 'local-mock.json'),
      path.join(cfgDir,  'local-mock.json')
    );
  }

  /* 2 ── start Mock API (8080) ─────────────────────────────────── */
  const mock = require('./app');   // ✓ relative to this file
  await mock.startServer();        // logs “mock server started …8080”
  process.env.MOCK_ALREADY_RUNNING = 'true';
  process.env.SSR_ALREADY_RUNNING  = 'true';

  /* 3 ── start SSR server (3000) via Yarn shim ─────────────────── */
  const env = {
    ...process.env,
    NODE_CONFIG_ENV: 'mock',
    TEST_CSP_OFF: 'true',
    SSR_ALREADY_RUNNING: 'true'          // <── exported to the child
  };
  const ssr = spawn(
    process.platform === 'win32' ? 'yarn.cmd' : 'yarn',
    ['node', 'dist/rpx-exui/api/server.bundle.js'],
    { cwd: path.resolve(__dirname, '../../'), stdio: 'inherit', env }
  );

  /* 4 ── kill child on parent exit so ports are freed ──────────── */
  process.on('exit', () => ssr.kill());
})();
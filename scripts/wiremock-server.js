#!/usr/bin/env node
/* Simple standalone WireMock starter without Docker.
 * Usage:
 *   node scripts/wiremock-server.js start [port]
 *   node scripts/wiremock-server.js stop
 */
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const WIREMOCK_JAR = require.resolve('wiremock-standalone/wiremock-standalone.jar');
const PID_FILE = path.join(process.cwd(), '.wiremock.pid');
const MAPPINGS_DIR = path.join(process.cwd(), 'wiremock', 'mappings');
const FILES_DIR = path.join(process.cwd(), 'wiremock', '__files');

function ensureDirs() {
  for (const dir of [MAPPINGS_DIR, FILES_DIR]) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }
}

function start(port) {
  if (fs.existsSync(PID_FILE)) {
    console.error('WireMock appears to be already running (pid file exists).');
    process.exit(1);
  }
  ensureDirs();
  const args = [
    '-jar', WIREMOCK_JAR,
    `--port=${port}`,
    `--root-dir=${path.join(process.cwd(), 'wiremock')}`,
    '--disable-gzip',
    '--verbose'
  ];
  const child = spawn('java', args, { stdio: 'inherit' });
  fs.writeFileSync(PID_FILE, String(child.pid));
  console.log(`Started WireMock on port ${port} (pid ${child.pid}).`);
}

function stop() {
  if (!fs.existsSync(PID_FILE)) {
    console.error('No pid file found; WireMock not running?');
    process.exit(1);
  }
  const pid = Number(fs.readFileSync(PID_FILE));
  try {
    process.kill(pid);
    fs.unlinkSync(PID_FILE);
    console.log(`Stopped WireMock process ${pid}.`);
  } catch (e) {
    console.error(`Failed to stop WireMock pid ${pid}:`, e);
    process.exit(1);
  }
}

const cmd = process.argv[2];
const port = process.argv[3] || process.env.WIREMOCK_PORT || '9090';
if (cmd === 'start') start(port); else if (cmd === 'stop') stop(); else {
  console.log('Usage: wiremock-server.js start [port]|stop');
  process.exit(1);
}

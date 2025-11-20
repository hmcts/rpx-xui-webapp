import * as fs from 'fs';
import * as path from 'path';

async function globalTeardown() {
  const pidFile = path.join(process.cwd(), '.wiremock.pid');
  if (fs.existsSync(pidFile)) {
    const pid = Number(fs.readFileSync(pidFile));
    try {
      process.kill(pid);
      fs.unlinkSync(pidFile);
      console.log(`GlobalTeardown: Stopped WireMock pid ${pid}.`);
    } catch (e) {
      console.warn(`GlobalTeardown: Failed to stop WireMock pid ${pid}`, e);
    }
  }
}

export default globalTeardown;

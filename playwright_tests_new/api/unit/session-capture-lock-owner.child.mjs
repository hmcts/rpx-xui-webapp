import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

import lockfile from 'proper-lockfile';

const [lockFilePath, storagePath, staleMsArgument] = process.argv.slice(2);
const staleMs = Number(staleMsArgument);

async function main() {
  fs.mkdirSync(path.dirname(lockFilePath), { recursive: true });
  fs.writeFileSync(lockFilePath, '', { flag: 'a' });
  const release = await lockfile.lock(lockFilePath, { retries: 0, stale: staleMs });
  process.send?.({ type: 'locked' });

  process.on('message', async (message) => {
    if (message === 'publish') {
      const stagingPath = `${storagePath}.${process.pid}.tmp`;
      fs.writeFileSync(stagingPath, JSON.stringify({ cookies: [{ name: 'published', value: 'child' }] }));
      fs.renameSync(stagingPath, storagePath);
      process.send?.({ type: 'published' });
      return;
    }

    if (message === 'release') {
      await release();
      process.send?.({ type: 'released' });
      process.exit(0);
    }
  });
}

main().catch((error) => {
  process.send?.({ type: 'error', message: error.message });
  process.exit(1);
});

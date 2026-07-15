import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

import lockfile from 'proper-lockfile';

const [lockFilePath, storagePath, staleMsArgument, takeoverBudgetMsArgument] = process.argv.slice(2);
const staleMs = Number(staleMsArgument);
const takeoverBudgetMs = Number(takeoverBudgetMsArgument);

function freshAuthStorageState() {
  return {
    cookies: [
      {
        name: 'Idam.Session',
        value: 'child-session',
        domain: '.example.test',
        path: '/',
        expires: Math.floor(Date.now() / 1_000) + 600,
        httpOnly: true,
        secure: true,
        sameSite: 'Lax',
      },
    ],
  };
}

async function main() {
  fs.mkdirSync(path.dirname(lockFilePath), { recursive: true });
  fs.writeFileSync(lockFilePath, '', { flag: 'a' });
  const release = await lockfile.lock(lockFilePath, { retries: 0, stale: staleMs });
  process.send?.({ type: 'locked' });
  globalThis.setTimeout(() => process.send?.({ type: 'stale-window-elapsed' }), staleMs + 250);

  process.on('message', async (message) => {
    if (message === 'start-takeover-budget') {
      globalThis.setTimeout(() => process.send?.({ type: 'takeover-budget-elapsed' }), takeoverBudgetMs + 250);
      return;
    }
    if (message === 'publish') {
      const stagingPath = `${storagePath}.${process.pid}.tmp`;
      fs.writeFileSync(stagingPath, JSON.stringify(freshAuthStorageState()));
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

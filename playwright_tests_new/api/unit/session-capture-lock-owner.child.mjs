import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

import lockfile from 'proper-lockfile';

const [lockFilePath, storagePath, staleMsArgument, updateMsArgument] = process.argv.slice(2);
const staleMs = Number(staleMsArgument);
const updateMs = Number(updateMsArgument);

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
      {
        name: '__auth__',
        value: 'child-auth',
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
  let compromisedError;
  const releaseLock = await lockfile.lock(lockFilePath, {
    retries: 0,
    stale: staleMs,
    update: updateMs,
    onCompromised: (error) => {
      compromisedError = error;
      process.send?.({ type: 'compromised' });
    },
  });
  const assertOwned = () => {
    if (compromisedError) {
      throw new Error('lock ownership lost');
    }
  };
  process.send?.({ type: 'locked' });

  const handleMessage = async (message) => {
    if (message === 'publish') {
      const stagingPath = `${storagePath}.${process.pid}.tmp`;
      fs.writeFileSync(stagingPath, JSON.stringify(freshAuthStorageState()));
      assertOwned();
      fs.renameSync(stagingPath, storagePath);
      process.send?.({ type: 'published' });
      return;
    }

    if (message === 'suspend-before-publish') {
      const stagingPath = `${storagePath}.${process.pid}.tmp`;
      fs.writeFileSync(stagingPath, JSON.stringify(freshAuthStorageState()));
      await new Promise((resolve, reject) => {
        process.send?.({ type: 'publish-ready' }, (error) => (error ? reject(error) : resolve()));
      });
      process.kill(process.pid, 'SIGSTOP');
      assertOwned();
      fs.renameSync(stagingPath, storagePath);
      process.send?.({ type: 'stale-published' });
      await releaseLock();
      process.exit(0);
    }

    if (message === 'release') {
      assertOwned();
      await releaseLock();
      process.send?.({ type: 'released' });
      process.exit(0);
    }
  };

  process.on('message', (message) => {
    void handleMessage(message).catch((error) => {
      process.send?.({ type: 'error', message: error.message });
      process.exit(1);
    });
  });
}

main().catch((error) => {
  process.send?.({ type: 'error', message: error.message });
  process.exit(1);
});

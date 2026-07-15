import { spawn, type ChildProcess } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { expect, test } from '@playwright/test';
import * as properLockfile from 'proper-lockfile';

import { __test__ as sessionCaptureTest } from '../../common/sessionCapture.js';
import type { SessionIdentity } from '../../common/sessionIdentity.js';

const childScript = fileURLToPath(new URL('./session-capture-lock-owner.child.mjs', import.meta.url));
const identity: SessionIdentity = {
  userIdentifier: 'PROCESS_LOCK_USER',
  email: 'process-lock@example.test',
  password: 'not-used',
  sessionKey: 'process-lock-contract',
};

function deferred() {
  let resolve!: () => void;
  const promise = new Promise<void>((resolvePromise) => {
    resolve = resolvePromise;
  });
  return { promise, resolve };
}

function waitForChildMessage(child: ChildProcess, type: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error(`Timed out waiting for child message: ${type}`));
    }, 5_000);
    const onExit = (code: number | null) => reject(new Error(`Lock owner exited before ${type} (code=${code})`));
    const onMessage = (message: { type?: string; message?: string }) => {
      if (message.type === 'error') {
        cleanup();
        reject(new Error(message.message));
      } else if (message.type === type) {
        cleanup();
        resolve();
      }
    };
    const cleanup = () => {
      clearTimeout(timeout);
      child.off('exit', onExit);
      child.off('message', onMessage);
    };
    child.once('exit', onExit);
    child.on('message', onMessage);
  });
}

function waitForExit(child: ChildProcess): Promise<void> {
  if (child.exitCode !== null || child.signalCode !== null) {
    return Promise.resolve();
  }
  return new Promise((resolve) => child.once('exit', () => resolve()));
}

function startLockOwner(lockFilePath: string, storagePath: string): ChildProcess {
  return spawn(process.execPath, [childScript, lockFilePath, storagePath, String(sessionCaptureTest.sessionCaptureLockStaleMs)], {
    stdio: ['ignore', 'ignore', 'inherit', 'ipc'],
  });
}

function observingLockfile(contentionObserved: () => void): typeof properLockfile {
  return {
    ...properLockfile,
    lock: async (...args: Parameters<typeof properLockfile.lock>) => {
      try {
        return await properLockfile.lock(...args);
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ELOCKED') {
          contentionObserved();
        }
        throw error;
      }
    },
  };
}

test.describe('session capture cross-process lock contract', { tag: '@svc-internal' }, () => {
  test('reuses storage published by another process while it retains the identity lock', async () => {
    test.setTimeout(15_000);
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-process-publish-'));
    const previousCwd = process.cwd();
    const sessionsDir = path.join(tempDir, '.sessions');
    const lockFilePath = path.join(sessionsDir, 'process-lock-contract.lock');
    const storagePath = path.join(sessionsDir, 'process-lock-contract.storage.json');
    const contention = deferred();
    let child: ChildProcess | undefined;
    let loginCount = 0;

    try {
      fs.mkdirSync(sessionsDir, { recursive: true });
      process.chdir(tempDir);
      child = startLockOwner(lockFilePath, storagePath);
      await waitForChildMessage(child, 'locked');

      const capture = sessionCaptureTest.sessionCaptureWith([identity], {
        chromiumLauncher: {} as never,
        config: { urls: { exuiDefaultUrl: 'https://manage-case.example.test' } } as never,
        env: {},
        isSessionFresh: () => fs.existsSync(storagePath),
        lockfile: observingLockfile(contention.resolve),
        loginAndPersistSession: async () => {
          loginCount += 1;
        },
        resolveSessionIdentity: () => identity,
      });

      await contention.promise;
      const published = waitForChildMessage(child, 'published');
      child.send('publish');
      await published;
      await capture;

      expect(loginCount).toBe(0);
      expect(JSON.parse(fs.readFileSync(storagePath, 'utf8')).cookies).toHaveLength(1);
    } finally {
      if (child && child.exitCode === null && child.signalCode === null) {
        const released = waitForChildMessage(child, 'released');
        child.send('release');
        await released.catch(() => undefined);
        await waitForExit(child);
      }
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('takes over and publishes once after the owner process terminates', async () => {
    test.setTimeout(25_000);
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-process-takeover-'));
    const previousCwd = process.cwd();
    const sessionsDir = path.join(tempDir, '.sessions');
    const lockFilePath = path.join(sessionsDir, 'process-lock-contract.lock');
    const storagePath = path.join(sessionsDir, 'process-lock-contract.storage.json');
    const contention = deferred();
    let child: ChildProcess | undefined;
    let publicationCount = 0;

    try {
      fs.mkdirSync(sessionsDir, { recursive: true });
      process.chdir(tempDir);
      child = startLockOwner(lockFilePath, storagePath);
      await waitForChildMessage(child, 'locked');

      const capture = sessionCaptureTest.sessionCaptureWith([identity], {
        chromiumLauncher: {} as never,
        config: { urls: { exuiDefaultUrl: 'https://manage-case.example.test' } } as never,
        env: {},
        isSessionFresh: () => fs.existsSync(storagePath),
        lockfile: observingLockfile(contention.resolve),
        loginAndPersistSession: async () => {
          publicationCount += 1;
          fs.writeFileSync(storagePath, JSON.stringify({ cookies: [{ name: 'published', value: 'parent' }] }));
        },
        resolveSessionIdentity: () => identity,
      });

      await contention.promise;
      child.kill('SIGKILL');
      await waitForExit(child);
      await capture;

      expect(publicationCount).toBe(1);
      expect(fs.existsSync(storagePath)).toBe(true);
      expect(fs.existsSync(`${lockFilePath}.lock`)).toBe(false);
    } finally {
      if (child && child.exitCode === null && child.signalCode === null) {
        child.kill('SIGKILL');
        await waitForExit(child);
      }
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });
});

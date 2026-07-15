import { spawn, type ChildProcess } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { expect, test } from '@playwright/test';
import * as properLockfile from 'proper-lockfile';

import { __test__ as sessionCaptureTest } from '../../common/sessionCapture.js';
import type { SessionIdentity } from '../../common/sessionIdentity.js';
import { SessionCaptureError } from '../utils/errors.js';

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

function waitForChildMessage(child: ChildProcess, type: string, timeoutMs = 5_000): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error(`Timed out waiting for child message: ${type}`));
    }, timeoutMs);
    const onExit = (code: number | null) => {
      cleanup();
      reject(new Error(`Lock owner exited before ${type} (code=${code})`));
    };
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
  return spawn(
    process.execPath,
    [
      childScript,
      lockFilePath,
      storagePath,
      String(sessionCaptureTest.sessionCaptureLockStaleMs),
      String(sessionCaptureTest.sessionCaptureLockTakeoverBudgetMs),
    ],
    { stdio: ['ignore', 'ignore', 'inherit', 'ipc'] }
  );
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
  test('a healthy owner remains exclusive beyond the stale window and its published session is reused', async () => {
    test.setTimeout(25_000);
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-process-publish-'));
    const previousCwd = process.cwd();
    const sessionsDir = path.join(tempDir, '.sessions');
    const lockFilePath = path.join(sessionsDir, 'process-lock-contract.lock');
    const storagePath = path.join(sessionsDir, 'process-lock-contract.storage.json');
    const contention = deferred();
    const postStaleContention = deferred();
    let staleWindowElapsed = false;
    let child: ChildProcess | undefined;
    let loginCount = 0;

    try {
      fs.mkdirSync(sessionsDir, { recursive: true });
      process.chdir(tempDir);
      child = startLockOwner(lockFilePath, storagePath);
      await waitForChildMessage(child, 'locked');
      const staleWindowElapsedMessage = waitForChildMessage(
        child,
        'stale-window-elapsed',
        sessionCaptureTest.sessionCaptureLockStaleMs + 5_000
      );

      const capture = sessionCaptureTest.sessionCaptureWith([identity], {
        chromiumLauncher: {} as never,
        config: { urls: { exuiDefaultUrl: 'https://manage-case.example.test' } } as never,
        env: {},
        lockfile: observingLockfile(() => {
          contention.resolve();
          if (staleWindowElapsed) {
            postStaleContention.resolve();
          }
        }),
        loginAndPersistSession: async () => {
          loginCount += 1;
        },
        resolveSessionIdentity: () => identity,
      });

      await contention.promise;
      await staleWindowElapsedMessage;
      staleWindowElapsed = true;
      await postStaleContention.promise;
      expect(loginCount).toBe(0);
      const published = waitForChildMessage(child, 'published');
      child.send('publish');
      await published;
      await capture;

      expect(loginCount).toBe(0);
      expect(JSON.parse(fs.readFileSync(storagePath, 'utf8')).cookies).toEqual([
        expect.objectContaining({ name: 'Idam.Session', domain: '.example.test' }),
      ]);
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

  test('owner death after the takeover budget fails without starting capture or cooldown', async () => {
    test.setTimeout(40_000);
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-process-takeover-'));
    const previousCwd = process.cwd();
    const sessionsDir = path.join(tempDir, '.sessions');
    const lockFilePath = path.join(sessionsDir, 'process-lock-contract.lock');
    const storagePath = path.join(sessionsDir, 'process-lock-contract.storage.json');
    const failurePath = path.join(sessionsDir, 'process-lock-contract.capture-failed.json');
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
        lockfile: observingLockfile(contention.resolve),
        loginAndPersistSession: async () => {
          loginCount += 1;
        },
        resolveSessionIdentity: () => identity,
      });

      await contention.promise;
      child.send('start-takeover-budget');
      await waitForChildMessage(child, 'takeover-budget-elapsed', sessionCaptureTest.sessionCaptureLockTakeoverBudgetMs + 5_000);
      child.kill('SIGKILL');
      await waitForExit(child);
      const captureError = await capture.then(
        () => {
          throw new Error('Expected late lock takeover to refuse session capture');
        },
        (error: SessionCaptureError) => error
      );

      expect(captureError).toBeInstanceOf(SessionCaptureError);
      expect(captureError.message).toContain(
        'refusing to start a capture that cannot complete within the integration test budget'
      );
      expect(captureError.context.lockWaitMs).toBeGreaterThan(sessionCaptureTest.sessionCaptureLockTakeoverBudgetMs);
      expect(captureError.context.lockWaitMs).toBeLessThan(
        sessionCaptureTest.sessionCaptureLockTakeoverBudgetMs + 2 * sessionCaptureTest.sessionCaptureLockStaleMs
      );

      expect(loginCount).toBe(0);
      expect(fs.existsSync(storagePath)).toBe(false);
      expect(fs.existsSync(failurePath)).toBe(false);
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

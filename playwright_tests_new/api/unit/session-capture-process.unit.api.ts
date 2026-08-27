import { spawn, type ChildProcess } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { expect, test } from '@playwright/test';

import { __test__ as sessionCaptureTest } from '../../common/sessionCapture.js';
import { resolveSessionStorageKey, type SessionIdentity } from '../../common/sessionIdentity.js';

const childScript = fileURLToPath(new URL('./session-capture-lock-owner.child.mjs', import.meta.url));
const identity: SessionIdentity = {
  userIdentifier: 'PROCESS_LOCK_USER',
  email: 'process-lock@example.test',
  password: 'not-used',
  sessionKey: 'process-lock-contract',
};
const sessionStorageKey = resolveSessionStorageKey(identity);

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

async function waitForLockHeartbeat(lockDirectoryPath: string, initialMtimeMs: number, timeoutMs = 12_000): Promise<void> {
  await expect
    .poll(() => fs.statSync(lockDirectoryPath).mtimeMs, {
      message: `lock heartbeat updates ${lockDirectoryPath}`,
      timeout: timeoutMs,
    })
    .toBeGreaterThan(initialMtimeMs);
}

function startLockOwner(lockFilePath: string, storagePath: string): ChildProcess {
  return spawn(
    process.execPath,
    [
      childScript,
      lockFilePath,
      storagePath,
      String(sessionCaptureTest.sessionCaptureLockStaleMs),
      String(sessionCaptureTest.sessionCaptureLockUpdateMs),
    ],
    { stdio: ['ignore', 'ignore', 'inherit', 'ipc'] }
  );
}

function captureWith(lockWaitMs: number, onLogin: () => void = () => undefined) {
  return sessionCaptureTest.sessionCaptureWith([identity], {
    chromiumLauncher: {} as never,
    config: { urls: { exuiDefaultUrl: 'https://manage-case.example.test' } } as never,
    env: {},
    lockWaitMs,
    loginAndPersistSession: async () => onLogin(),
    resolveSessionIdentity: () => identity,
  });
}

test.describe('session capture cross-process lock contract', { tag: '@svc-internal' }, () => {
  test('a healthy owner remains exclusive and its published session is reused', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-process-publish-'));
    const previousCwd = process.cwd();
    const sessionsDir = path.join(tempDir, '.sessions');
    const lockFilePath = path.join(sessionsDir, `${sessionStorageKey}.lock`);
    const storagePath = path.join(sessionsDir, `${sessionStorageKey}.storage.json`);
    let child: ChildProcess | undefined;
    let loginCount = 0;

    try {
      fs.mkdirSync(sessionsDir, { recursive: true });
      process.chdir(tempDir);
      child = startLockOwner(lockFilePath, storagePath);
      await waitForChildMessage(child, 'locked');
      const lockDirectoryPath = `${lockFilePath}.lock`;
      const initialMtimeMs = fs.statSync(lockDirectoryPath).mtimeMs;

      const capture = captureWith(12_000, () => {
        loginCount += 1;
      });
      await waitForLockHeartbeat(lockDirectoryPath, initialMtimeMs);
      expect(loginCount).toBe(0);
      const published = waitForChildMessage(child, 'published');
      child.send('publish');
      await published;
      await capture;

      expect(loginCount).toBe(0);
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

  test('a reported lock compromise prevents session publication', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-process-compromised-'));
    const previousCwd = process.cwd();
    const sessionsDir = path.join(tempDir, '.sessions');
    const lockFilePath = path.join(sessionsDir, `${sessionStorageKey}.lock`);
    const storagePath = path.join(sessionsDir, `${sessionStorageKey}.storage.json`);
    let child: ChildProcess | undefined;

    try {
      fs.mkdirSync(sessionsDir, { recursive: true });
      process.chdir(tempDir);
      child = startLockOwner(lockFilePath, storagePath);
      await waitForChildMessage(child, 'locked');
      const compromised = waitForChildMessage(child, 'compromised', 12_000);
      fs.rmSync(`${lockFilePath}.lock`, { recursive: true, force: true });
      await compromised;

      const publication = waitForChildMessage(child, 'published');
      child.send('publish');
      await expect(publication).rejects.toThrow('lock ownership lost');
      await waitForExit(child);
      expect(fs.existsSync(storagePath)).toBe(false);
    } finally {
      if (child && child.exitCode === null && child.signalCode === null) {
        child.kill('SIGKILL');
        await waitForExit(child);
      }
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('a suspended live owner is not taken over and its session is reused after resume', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-process-suspended-'));
    const previousCwd = process.cwd();
    const sessionsDir = path.join(tempDir, '.sessions');
    const lockFilePath = path.join(sessionsDir, `${sessionStorageKey}.lock`);
    const storagePath = path.join(sessionsDir, `${sessionStorageKey}.storage.json`);
    let child: ChildProcess | undefined;
    let captureSettled = false;
    let loginCount = 0;

    try {
      fs.mkdirSync(sessionsDir, { recursive: true });
      process.chdir(tempDir);
      child = startLockOwner(lockFilePath, storagePath);
      await waitForChildMessage(child, 'locked');
      const publishReady = waitForChildMessage(child, 'publish-ready');
      child.send('suspend-before-publish');
      await publishReady;

      const capture = captureWith(5_000, () => {
        loginCount += 1;
      }).finally(() => {
        captureSettled = true;
      });
      await new Promise<void>((resolve) => setTimeout(resolve, 1_500));
      expect(captureSettled).toBe(false);
      expect(loginCount).toBe(0);

      const published = waitForChildMessage(child, 'stale-published');
      child.kill('SIGCONT');
      await published;
      await waitForExit(child);
      await capture;
      expect(loginCount).toBe(0);
    } finally {
      if (child && child.exitCode === null && child.signalCode === null) {
        child.kill('SIGCONT');
        child.kill('SIGKILL');
        await waitForExit(child);
      }
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('an abruptly killed owner fails closed without another login or cooldown marker', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-process-owner-death-'));
    const previousCwd = process.cwd();
    const sessionsDir = path.join(tempDir, '.sessions');
    const lockFilePath = path.join(sessionsDir, `${sessionStorageKey}.lock`);
    const storagePath = path.join(sessionsDir, `${sessionStorageKey}.storage.json`);
    const failurePath = path.join(sessionsDir, `${sessionStorageKey}.capture-failed.json`);
    let child: ChildProcess | undefined;
    let loginCount = 0;

    try {
      fs.mkdirSync(sessionsDir, { recursive: true });
      process.chdir(tempDir);
      child = startLockOwner(lockFilePath, storagePath);
      await waitForChildMessage(child, 'locked');

      const capture = captureWith(2_000, () => {
        loginCount += 1;
      });
      child.kill('SIGKILL');
      await waitForExit(child);

      await expect(capture).rejects.toThrow('Timed out waiting for session lock');
      expect(loginCount).toBe(0);
      expect(fs.existsSync(storagePath)).toBe(false);
      expect(fs.existsSync(failurePath)).toBe(false);
    } finally {
      if (child && child.exitCode === null && child.signalCode === null) {
        child.kill('SIGKILL');
        await waitForExit(child);
      }
      process.chdir(previousCwd);
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('a normal owner release lets the waiting worker capture once', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-process-release-'));
    const previousCwd = process.cwd();
    const sessionsDir = path.join(tempDir, '.sessions');
    const lockFilePath = path.join(sessionsDir, `${sessionStorageKey}.lock`);
    const storagePath = path.join(sessionsDir, `${sessionStorageKey}.storage.json`);
    let child: ChildProcess | undefined;
    let loginCount = 0;

    try {
      fs.mkdirSync(sessionsDir, { recursive: true });
      process.chdir(tempDir);
      child = startLockOwner(lockFilePath, storagePath);
      await waitForChildMessage(child, 'locked');
      const capture = captureWith(5_000, () => {
        loginCount += 1;
      });

      const released = waitForChildMessage(child, 'released');
      child.send('release');
      await released;
      await waitForExit(child);
      await capture;

      expect(loginCount).toBe(1);
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

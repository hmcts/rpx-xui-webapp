import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { expect, test } from '@playwright/test';

import {
  acquireSessionLock,
  recentSessionCaptureFailure,
  writeSessionCaptureFailure,
} from '../../common/sessionCaptureLifecycle.js';

test.describe('session capture lifecycle', { tag: '@svc-internal' }, () => {
  test('records a retryable failure marker with its current storage fingerprint', () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'session-capture-lifecycle-'));
    const failurePath = path.join(directory, 'capture-failed.json');
    const sessionPath = path.join(directory, 'session.json');

    try {
      writeSessionCaptureFailure({
        fsApi: fs,
        failurePath,
        sessionPath,
        error: new Error('request to https://xui.example/auth/login returned status 503'),
        readStorageStateFingerprint: () => 'current-storage-fingerprint',
      });

      expect(recentSessionCaptureFailure(fs, failurePath, 1_000)).toMatchObject({
        message: 'request to https://xui.example/auth/login returned status 503',
        retryable: true,
        storageStateFingerprint: 'current-storage-fingerprint',
      });
    } finally {
      fs.rmSync(directory, { recursive: true, force: true });
    }
  });

  test('reuses a fresh session without acquiring the filesystem lock', async () => {
    const release = await acquireSessionLock({
      lockfileApi: {
        lock: async () => {
          throw new Error('lock should not be acquired');
        },
      } as never,
      lockFilePath: '/tmp/session-capture-lifecycle.lock',
      userIdentifier: 'LIFECYCLE_USER',
      isSessionReusable: () => true,
      force: false,
    });

    expect(release).toBeNull();
  });
});

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import sinon from 'sinon';
import { chromium, request, type APIRequestContext, type BrowserContext, type Page } from '@playwright/test';

import config from '../../E2E/utils/config.utils.js';
import { UserUtils } from '../../E2E/utils/user.utils.js';
import { resolveSessionStorageKey, type SessionIdentity } from '../../common/sessionIdentity.js';

export function createSessionRefreshHarness() {
  const previousCwd = process.cwd();
  const directory = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'session-refresh-')));
  const sandbox = sinon.createSandbox();
  const sessions = path.join(directory, '.sessions');
  fs.mkdirSync(sessions);
  process.chdir(directory);

  const addCookies = sandbox
    .stub<Parameters<BrowserContext['addCookies']>, ReturnType<BrowserContext['addCookies']>>()
    .resolves();
  // Only the browser boundary is a partial double; identity, storage and locks stay real.
  const cookieContext: Pick<BrowserContext, 'addCookies'> = { addCookies };
  const pageBoundary: Pick<Page, 'context'> = { context: () => cookieContext as BrowserContext };
  const page = pageBoundary as Page;
  const launch = sandbox.stub(chromium, 'launch').rejects(new Error('Browser capture is forbidden in synthetic refresh tests'));
  const credentials = sandbox.stub(UserUtils.prototype, 'getUserCredentials').callsFake((identifier) => {
    throw new Error(`Unexpected credential lookup: ${identifier}`);
  });
  const dispose = sandbox.stub().resolves();
  const get = sandbox.stub().rejects(new Error('Unexpected authentication request'));
  const requestBoundary: Pick<APIRequestContext, 'get' | 'dispose'> = { get, dispose };
  const contexts = sandbox.stub(request, 'newContext').resolves(requestBoundary as APIRequestContext);
  const storagePath = (identity: SessionIdentity) => path.join(sessions, `${resolveSessionStorageKey(identity)}.storage.json`);
  const lockPath = (identity: SessionIdentity) => path.join(sessions, `${resolveSessionStorageKey(identity)}.lock`);
  const state = (value: string) =>
    JSON.stringify({
      cookies: [
        { name: 'Idam.Session', domain: new URL(config.urls.idamWebUrl).hostname },
        { name: '__auth__', domain: new URL(config.urls.exuiDefaultUrl).hostname },
      ].map((cookie) => ({ ...cookie, value, path: '/', expires: -1, secure: true, httpOnly: true, sameSite: 'Lax' })),
      origins: [],
    });

  return {
    page,
    addCookies,
    launch,
    credentials,
    contexts,
    get,
    dispose,
    storagePath,
    lockPath,
    state,
    replaceRejectedState(identity: SessionIdentity, authenticatedAfterRefresh = true) {
      const file = storagePath(identity);
      fs.writeFileSync(file, state('rejected'));
      get.onFirstCall().callsFake(async () => {
        // Simulate another worker completing a refresh after this caller loaded the old state.
        fs.writeFileSync(file, state('newer'));
        return { status: () => 200, text: async () => 'false' };
      });
      get.onSecondCall().resolves({ status: () => 200, text: async () => String(authenticatedAfterRefresh) });
    },
    rejectCapture(identity: SessionIdentity) {
      fs.writeFileSync(
        path.join(sessions, `${resolveSessionStorageKey(identity)}.capture-failed.json`),
        JSON.stringify({
          timestamp: Date.now(),
          message: 'IDAM page message: Email or password is incorrect',
          retryable: false,
        })
      );
    },
    restore() {
      sandbox.restore();
      process.chdir(previousCwd);
      fs.rmSync(directory, { recursive: true, force: true });
    },
  };
}

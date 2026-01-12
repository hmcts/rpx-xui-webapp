/**
 * @hmcts-audit-metadata
 * {
 *   "agent_name": "HMCTS-AI-Assistant",
 *   "version": "v1.0",
 *   "audit_reference": "EXUI-4031",
 *   "reviewer": "pending",
 *   "last_audit": "2026-01-12"
 * }
 */

import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'node:path';
import { promises as fsp } from 'node:fs';

import { CookieUtils } from '../E2E/utils/cookie.utils.js';
import { UserUtils } from '../E2E/utils/user.utils.js';
import { isSessionFresh, loadSessionCookies, __test__ as sessionCaptureTest } from '../common/sessionCapture.js';

test.describe.configure({ mode: 'serial' });

test.describe('Session and cookie utilities coverage', () => {
  test('isSessionFresh returns false when stat fails', () => {
    const fsStub = {
      existsSync: () => true,
      statSync: () => {
        throw new Error('boom');
      }
    } as any;
    expect(isSessionFresh('session.json', 1000, { fs: fsStub, now: () => 1000 })).toBe(false);
  });

  test('UserUtils returns credentials for known users and errors on unknown', () => {
    const userUtils = new UserUtils();
    const creds = userUtils.getUserCredentials('IAC_CaseOfficer_R1');
    expect(creds.email).toContain('@');
    expect(creds.password).toBeTruthy();
    expect(() => userUtils.getUserCredentials('UNKNOWN_USER')).toThrow('User "UNKNOWN_USER" not found');
  });

  test('CookieUtils writes and updates session files', async () => {
    const cookieUtils = new CookieUtils();
    const tmpDir = await fsp.mkdtemp(path.join(process.cwd(), 'test-results', 'cookie-utils-'));
    const sessionPath = path.join(tmpDir, 'session.json');

    const initial = { cookies: [{ name: '__userid__', value: 'user-1' }] };
    await fsp.writeFile(sessionPath, JSON.stringify(initial), 'utf8');
    await cookieUtils.addManageCasesAnalyticsCookie(sessionPath);
    const updated = JSON.parse(await fsp.readFile(sessionPath, 'utf8'));
    const added = updated.cookies.find((cookie: any) => cookie.name === 'hmcts-exui-cookies-user-1-mc-accepted');
    expect(added).toBeDefined();
    expect(added.value).toBe('true');

    const noUserPath = path.join(tmpDir, 'no-user.json');
    cookieUtils.writeManageCasesSession(noUserPath, [{ name: 'other', value: '1' }] as any);
    const noUserState = JSON.parse(await fsp.readFile(noUserPath, 'utf8'));
    expect(noUserState.cookies).toHaveLength(1);

    const withUserPath = path.join(tmpDir, 'with-user.json');
    cookieUtils.writeManageCasesSession(withUserPath, [{ name: '__userid__', value: 'user-2' }] as any);
    const withUserState = JSON.parse(await fsp.readFile(withUserPath, 'utf8'));
    const withUserCookie = withUserState.cookies.find((cookie: any) => cookie.name === 'hmcts-exui-cookies-user-2-mc-accepted');
    expect(withUserCookie).toBeDefined();
    expect(withUserCookie.value).toBe('true');

    const nestedPath = path.join(tmpDir, 'nested', 'session.json');
    cookieUtils.writeManageCasesSession(nestedPath, [{ name: '__userid__', value: 'user-3' }] as any);
    const nestedState = JSON.parse(await fsp.readFile(nestedPath, 'utf8'));
    expect(nestedState.cookies.find((cookie: any) => cookie.name === 'hmcts-exui-cookies-user-3-mc-accepted')).toBeDefined();

    const noUserAnalyticsPath = path.join(tmpDir, 'no-user-analytics.json');
    await fsp.writeFile(noUserAnalyticsPath, JSON.stringify({ cookies: [{ name: 'other', value: '1' }] }), 'utf8');
    await cookieUtils.addManageCasesAnalyticsCookie(noUserAnalyticsPath);
    const noUserAnalytics = JSON.parse(await fsp.readFile(noUserAnalyticsPath, 'utf8'));
    expect(noUserAnalytics.cookies.length).toBe(2);
  });

  test('CookieUtils surfaces errors when session data is invalid', async () => {
    const cookieUtils = new CookieUtils();
    const tmpDir = await fsp.mkdtemp(path.join(process.cwd(), 'test-results', 'cookie-utils-error-'));
    const badPath = path.join(tmpDir, 'bad.json');
    await fsp.writeFile(badPath, '{bad-json', 'utf8');
    await expect(cookieUtils.addManageCasesAnalyticsCookie(badPath)).rejects.toThrow('Failed to read or write session data');

    const failingFs = {
      readFileSync: fs.readFileSync,
      writeFileSync: () => {
        throw new Error('write failed');
      },
      existsSync: fs.existsSync,
      mkdirSync: fs.mkdirSync
    };
    const cookieUtilsFailing = new CookieUtils(failingFs);
    expect(() => cookieUtilsFailing.writeManageCasesSession(path.join(tmpDir, 'fail.json'), [])).toThrow(
      'Failed to write session file'
    );
  });

  test('sessionCapture helpers handle fresh, stale, and missing sessions', async () => {
    const tmpDir = await fsp.mkdtemp(path.join(process.cwd(), 'test-results', 'session-utils-'));
    const originalCwd = process.cwd();
    process.chdir(tmpDir);
    try {
      const sessionsDir = path.join(tmpDir, '.sessions');
      await fsp.mkdir(sessionsDir, { recursive: true });

      const userUtils = new UserUtils();
      const creds = userUtils.getUserCredentials('IAC_CaseOfficer_R1');
      const storagePath = path.join(sessionsDir, `${creds.email}.storage.json`);

      expect(isSessionFresh(storagePath)).toBe(false);

      await fsp.writeFile(storagePath, JSON.stringify({ cookies: [{ name: 'a', value: 'b' }] }), 'utf8');
      expect(isSessionFresh(storagePath, 60 * 1000)).toBe(true);

      const oldTime = Date.now() - 10 * 60 * 1000;
      await fsp.utimes(storagePath, oldTime / 1000, oldTime / 1000);
      expect(isSessionFresh(storagePath, 60 * 1000)).toBe(false);

      const loaded = loadSessionCookies('IAC_CaseOfficer_R1');
      expect(loaded.cookies.length).toBe(1);

      await fsp.writeFile(storagePath, JSON.stringify({ cookies: {} }), 'utf8');
      const invalidCookies = loadSessionCookies('IAC_CaseOfficer_R1');
      expect(invalidCookies.cookies).toHaveLength(0);

      await fsp.writeFile(storagePath, '{bad-json', 'utf8');
      expect(() => loadSessionCookies('IAC_CaseOfficer_R1')).toThrow('Storage file missing');

      await fsp.rm(storagePath, { force: true });
      expect(() => loadSessionCookies('IAC_CaseOfficer_R1')).toThrow('Failed parsing storage file');
    } finally {
      process.chdir(originalCwd);
    }
  });

  test('persistSession writes cookies and surfaces errors', async () => {
    const tmpDir = await fsp.mkdtemp(path.join(process.cwd(), 'test-results', 'session-persist-'));
    const sessionPath = path.join(tmpDir, 'session.json');
    const ctx = {
      addCookies: async () => {},
      storageState: async () => {}
    };
    const cookieUtils = {
      writeManageCasesSession: (pathValue: string, cookies: any[]) => {
        fs.writeFileSync(pathValue, JSON.stringify({ cookies }), 'utf8');
      }
    } as any;

    await sessionCaptureTest.persistSession(sessionPath, [{ name: 'a', value: 'b' }], ctx, 'user', {
      cookieUtils,
      fs
    });

    await expect(
      sessionCaptureTest.persistSession(
        sessionPath,
        [],
        ctx,
        'user',
        {
          cookieUtils: { writeManageCasesSession: () => { throw new Error('boom'); } } as any,
          fs
        }
      )
    ).rejects.toThrow('boom');
  });

  test('sessionCaptureWith skips fresh sessions and handles header wait failures', async () => {
    let mkdirCalls = 0;
    const fsStub = {
      existsSync: () => false,
      mkdirSync: () => {
        mkdirCalls += 1;
      }
    } as any;

    const userUtils = {
      getUserCredentials: () => ({ email: 'user@example.com', password: 'pass' })
    } as any;

    await sessionCaptureTest.sessionCaptureWith(['USER'], {
      fs: fsStub,
      userUtils,
      isSessionFresh: () => true
    });
    expect(mkdirCalls).toBe(1);

    let persistCalls = 0;
    const page = {
      goto: async () => {},
      waitForSelector: async (selector: string) => {
        if (selector === 'exui-header') {
          throw new Error('missing header');
        }
      }
    } as any;
    const context = {
      newPage: async () => page,
      cookies: async () => [],
      addCookies: async () => {},
      storageState: async () => {}
    } as any;
    const browser = {
      newContext: async () => context,
      close: async () => {}
    } as any;
    const chromiumOk = {
      launch: async () => browser
    } as any;
    const idamPageFactory = () => ({ login: async () => {} });
    await sessionCaptureTest.sessionCaptureWith(['USER'], {
      fs: fsStub,
      userUtils,
      isSessionFresh: () => false,
      chromiumLauncher: chromiumOk,
      idamPageFactory,
      persistSession: async () => {
        persistCalls += 1;
      },
      env: { TEST_URL: 'https://example.test' } as NodeJS.ProcessEnv,
      config: { urls: { exuiDefaultUrl: 'https://example.test' } } as any
    });
    expect(persistCalls).toBe(1);
  });

  test('sessionCaptureWith surfaces launch failures', async () => {
    const fsStub = {
      existsSync: () => true,
      mkdirSync: () => {}
    } as any;
    const userUtils = {
      getUserCredentials: () => ({ email: 'user@example.com', password: 'pass' })
    } as any;
    const chromiumLauncher = {
      launch: async () => {
        throw new Error('launch failed');
      }
    } as any;
    await expect(
      sessionCaptureTest.sessionCaptureWith(['USER'], {
        fs: fsStub,
        userUtils,
        isSessionFresh: () => false,
        chromiumLauncher
      })
    ).rejects.toThrow('launch failed');
  });

  test('sessionCaptureWith surfaces login failures', async () => {
    const fsStub = {
      existsSync: () => true,
      mkdirSync: () => {}
    } as any;
    const userUtils = {
      getUserCredentials: () => ({ email: 'user@example.com', password: 'pass' })
    } as any;
    const page = {
      goto: async () => {},
      waitForSelector: async () => {}
    } as any;
    const context = {
      newPage: async () => page,
      cookies: async () => [],
      addCookies: async () => {},
      storageState: async () => {}
    } as any;
    const browser = {
      newContext: async () => context,
      close: async () => {}
    } as any;
    const chromiumOk = {
      launch: async () => browser
    } as any;
    const idamPageFactory = () => ({ login: async () => { throw new Error('login failed'); } });
    await expect(
      sessionCaptureTest.sessionCaptureWith(['USER'], {
        fs: fsStub,
        userUtils,
        isSessionFresh: () => false,
        chromiumLauncher: chromiumOk,
        idamPageFactory,
        persistSession: async () => {},
        env: { TEST_URL: 'https://example.test' } as NodeJS.ProcessEnv,
        config: { urls: { exuiDefaultUrl: 'https://example.test' } } as any
      })
    ).rejects.toThrow('login failed');
  });
});

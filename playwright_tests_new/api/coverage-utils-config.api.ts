import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'node:path';
import { promises as fsp } from 'node:fs';

import appTestConfig, { __test__ as appTestConfigTest } from '../common/appTestConfig';
import { __test__ as apiTestConfigTest } from '../common/apiTestConfig';
import config, { __test__ as configUtilsTest } from '../E2E/utils/config.utils.js';
import { CookieUtils } from '../E2E/utils/cookie.utils.js';
import { UserUtils } from '../E2E/utils/user.utils.js';
import { isSessionFresh, loadSessionCookies, __test__ as sessionCaptureTest } from '../common/sessionCapture.js';

type EnvMap = Record<string, string | undefined>;

async function withEnv(vars: EnvMap, fn: () => Promise<void> | void) {
  const previous = new Map<string, string | undefined>();
  for (const [key, value] of Object.entries(vars)) {
    previous.set(key, process.env[key]);
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
  try {
    await fn();
  } finally {
    for (const [key, value] of previous.entries()) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }
}

test.describe.configure({ mode: 'serial' });

test.describe('Config and E2E utility coverage', () => {
  test('apiTestConfig helpers resolve env values', () => {
    expect(apiTestConfigTest.resolveBaseUrl(undefined)).toBe('https://manage-case.aat.platform.hmcts.net/');
    expect(apiTestConfigTest.resolveBaseUrl('https://example.test')).toBe('https://example.test');

    expect(apiTestConfigTest.resolveTestEnv(undefined)).toBe('aat');
    expect(apiTestConfigTest.resolveTestEnv('demo')).toBe('demo');
    expect(apiTestConfigTest.resolveTestEnv('aat')).toBe('aat');
    expect(apiTestConfigTest.resolveTestEnv('prod')).toBe('aat');
  });

  test('appTestConfig helpers resolve preview and test env', () => {
    const preview = appTestConfigTest.resolvePreviewConfig(
      [{ previewUrl: 'preview.example', demoUrl: 'https://demo.example' }],
      'https://preview.example/path'
    );
    expect(preview).toEqual(expect.objectContaining({ demoUrl: 'https://demo.example' }));
    expect(appTestConfigTest.resolvePreviewConfig([], 'https://preview.example/path')).toBeUndefined();
    expect(appTestConfigTest.resolvePreviewConfig([{ previewUrl: 'preview.example', demoUrl: 'https://demo.example' }], undefined)).toBeUndefined();

    expect(appTestConfigTest.resolveTestEnv(undefined)).toBe('aat');
    expect(appTestConfigTest.resolveTestEnv('demo')).toBe('demo');
    expect(appTestConfigTest.resolveTestEnv('aat')).toBe('aat');
    expect(appTestConfigTest.resolveTestEnv('prod')).toBe('aat');
    expect(appTestConfig.getTestEnvFromEnviornment()).toBeTruthy();
  });

  test('config.utils resolves env vars and URLs', async () => {
    expect(configUtilsTest.resolveUrl('https://override', 'https://fallback')).toBe('https://override');
    expect(configUtilsTest.resolveUrl(undefined, 'https://fallback')).toBe('https://fallback');

    await withEnv({ CONFIG_TEST_VAR: 'value' }, () => {
      expect(configUtilsTest.getEnvVar('CONFIG_TEST_VAR')).toBe('value');
    });
    await withEnv({ CONFIG_TEST_VAR: undefined }, () => {
      expect(() => configUtilsTest.getEnvVar('CONFIG_TEST_VAR')).toThrow('CONFIG_TEST_VAR');
    });

    expect(config.urls.exuiDefaultUrl).toContain('manage-case');
  });

  test('withEnv restores pre-existing variables', async () => {
    process.env.CONFIG_TEST_VAR_RESTORE = 'existing';
    await withEnv({ CONFIG_TEST_VAR_RESTORE: 'override' }, () => {
      expect(process.env.CONFIG_TEST_VAR_RESTORE).toBe('override');
    });
    expect(process.env.CONFIG_TEST_VAR_RESTORE).toBe('existing');
    delete process.env.CONFIG_TEST_VAR_RESTORE;
  });

  test('UserUtils returns credentials for known users and errors on unknown', () => {
    const userUtils = new UserUtils();
    const creds = userUtils.getUserCredentials('IAC_CaseOfficer_R1');
    expect(creds.email).toContain('@');
    expect(creds.password).toBeTruthy();
    expect(() => userUtils.getUserCredentials('UNKNOWN_USER')).toThrow('User \"UNKNOWN_USER\" not found');
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

    const chromiumLauncher = {
      launch: async () => {
        throw new Error('should not launch');
      }
    } as any;

    await sessionCaptureTest.sessionCaptureWith(['USER'], {
      fs: fsStub,
      userUtils,
      isSessionFresh: () => true,
      chromiumLauncher
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

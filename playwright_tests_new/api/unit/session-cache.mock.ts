import fs from 'node:fs';
import path from 'node:path';
import { syncBuiltinESMExports } from 'node:module';
import sinon from 'sinon';

import { isSessionFresh, type __test__ as sessionCaptureTest } from '../../common/sessionCapture.js';
import type { SessionIdentity } from '../../common/sessionIdentity.js';

export function syntheticSessionIdentity(email: string, sessionKey?: string, userIdentifier = email): SessionIdentity {
  return { userIdentifier, email, password: 'dummy', sessionKey };
}

export function syntheticSessionState(value: string): string {
  return JSON.stringify({
    cookies: [
      { name: 'Idam.Session', domain: 'idam.example.test' },
      { name: '__auth__', domain: 'manage.example.test' },
    ].map((cookie) => ({ ...cookie, value, path: '/', expires: -1, secure: true, httpOnly: true, sameSite: 'Lax' })),
    origins: [],
  });
}

export function createSessionCacheHarness() {
  const sessionsDir = path.join(process.cwd(), '.sessions');
  const files = new Map<string, string>();
  const events: { operation: 'lock' | 'release' | 'write' | 'delete'; path: string }[] = [];
  const sandbox = sinon.createSandbox();
  const originalExists = fs.existsSync;
  const originalRead = fs.readFileSync;
  const read = (file: string) => {
    const contents = files.get(file);
    if (contents === undefined) throw Object.assign(new Error(`Missing synthetic cache: ${file}`), { code: 'ENOENT' });
    return contents;
  };
  const fsApi = new Proxy(
    {
      existsSync: (file: string) => file === sessionsDir || files.has(file),
      readFileSync: read,
      writeFileSync: (file: string, contents: string) => {
        files.set(file, contents);
        events.push({ operation: 'write', path: file });
      },
      unlinkSync: (file: string) => {
        read(file);
        files.delete(file);
        events.push({ operation: 'delete', path: file });
      },
      rmSync: (file: string) => {
        files.delete(file);
        events.push({ operation: 'delete', path: file });
      },
      statSync: (file: string) => {
        read(file);
        return { mtimeMs: Date.now() };
      },
      utimesSync: (file: string) => {
        read(file);
      },
    },
    {
      get(target, property) {
        if (!(property in target)) throw new Error(`Unsupported synthetic cache operation: ${String(property)}`);
        return Reflect.get(target, property);
      },
    }
  ) as unknown as typeof fs;

  // Public loading has no I/O seam; intercept only this worker's synthetic cache.
  sandbox
    .stub(fs, 'existsSync')
    .callsFake((file) =>
      typeof file === 'string' && file.startsWith(`${sessionsDir}${path.sep}`) ? files.has(file) : originalExists(file)
    );
  sandbox.stub(fs, 'readFileSync').callsFake((file, options) => {
    if (typeof file !== 'string' || !file.startsWith(`${sessionsDir}${path.sep}`)) return originalRead(file, options);
    const contents = read(file);
    return options === 'utf8' ? contents : Buffer.from(contents);
  });
  syncBuiltinESMExports();

  const captureDeps: NonNullable<Parameters<typeof sessionCaptureTest.sessionCaptureWith>[1]> = {
    fs: fsApi,
    env: {},
    config: {
      users: {} as never,
      urls: {
        baseURL: 'https://manage.example.test',
        exuiDefaultUrl: 'https://manage.example.test',
        manageCaseBaseUrl: 'https://manage.example.test/cases',
        citizenUrl: 'https://citizen.example.test',
        idamWebUrl: 'https://idam.example.test',
        idamTestingSupportUrl: 'https://idam-support.example.test',
        serviceAuthUrl: 'https://s2s.example.test',
      },
    },
    isSessionFresh: (file, maxAgeMs, options) => isSessionFresh(file, maxAgeMs, { ...options, fs: fsApi }),
    validateStoredSession: async () => 'authenticated',
    loginAndPersistSession: async ({ sessionPath }) => fsApi.writeFileSync(sessionPath, syntheticSessionState('captured')),
    lockfile: {
      lock: async (file: string) => {
        events.push({ operation: 'lock', path: file });
        return async () => {
          events.push({ operation: 'release', path: file });
        };
      },
    } as NonNullable<Parameters<typeof sessionCaptureTest.sessionCaptureWith>[1]>['lockfile'],
  };

  return {
    files,
    events,
    captureDeps,
    dispose: () => {
      sandbox.restore();
      syncBuiltinESMExports();
    },
  };
}

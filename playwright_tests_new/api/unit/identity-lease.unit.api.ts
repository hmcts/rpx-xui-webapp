import { expect, test } from '@playwright/test';
import { execFileSync, spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { once } from 'node:events';
import { mkdtemp, readFile, rename, rm, stat, unlink, utimes, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

import {
  acquireIdentityLease,
  IDENTITY_POOL_EXHAUSTED_CODE,
  IdentityLeaseTimeoutError,
  resolveIdentityLeaseRuntimeSettings,
} from '../../common/identityLease.js';
import { FrameworkError } from '../../E2E/utils/frameworkError.js';

test.describe('identity lease runtime settings', { tag: '@svc-internal' }, () => {
  test('uses positive defaults for malformed poll and TTL values', () => {
    expect(
      resolveIdentityLeaseRuntimeSettings({ PW_IDENTITY_LEASE_POLL_MS: '-1', PW_IDENTITY_LEASE_TTL_MS: 'not-a-duration' })
    ).toMatchObject({ pollMs: 1_000, ttlMs: 15 * 60_000 });
  });

  test('extends a lease to cover the configured and caller execution windows', () => {
    expect(
      resolveIdentityLeaseRuntimeSettings(
        { PW_IDENTITY_LEASE_EXECUTION_BUDGET_MS: '120000', PW_IDENTITY_LEASE_TTL_MS: '119999' },
        35 * 60_000
      )
    ).toMatchObject({ executionBudgetMs: 35 * 60_000, ttlMs: 35 * 60_000 + 60_000 });
  });

  test('preserves the baseline TTL when the execution window is shorter', () => {
    expect(resolveIdentityLeaseRuntimeSettings({}, 12 * 60_000)).toMatchObject({
      waitMs: 15 * 60_000,
      executionBudgetMs: 12 * 60_000,
      ttlMs: 15 * 60_000,
    });
  });

  test('keeps teardown headroom even when the explicit TTL equals the execution budget', () => {
    expect(resolveIdentityLeaseRuntimeSettings({ PW_IDENTITY_LEASE_TTL_MS: String(5 * 60_000) })).toMatchObject({
      executionBudgetMs: 5 * 60_000,
      ttlMs: 6 * 60_000,
    });
  });

  test('keeps explicit wait and TTL overrides above the execution window', () => {
    expect(
      resolveIdentityLeaseRuntimeSettings({ PW_IDENTITY_LEASE_WAIT_MS: '45000', PW_IDENTITY_LEASE_TTL_MS: String(20 * 60_000) })
    ).toMatchObject({ waitMs: 45_000, executionBudgetMs: 5 * 60_000, ttlMs: 20 * 60_000 });
  });

  test('marks a scheduling timeout as an identity-pool-exhausted setup framework error', () => {
    const error = new IdentityLeaseTimeoutError({ pool: 'PRL_SOLICITOR' }, 3 * 60_000, 'local');
    expect(error).toBeInstanceOf(FrameworkError);
    expect(error.name).toBe('IdentityLeaseTimeoutError');
    expect(error.code).toBe(IDENTITY_POOL_EXHAUSTED_CODE);
    expect(error.phase).toBe('setup');
    expect(error.message.startsWith(`[${IDENTITY_POOL_EXHAUSTED_CODE}] Identity scheduling timed out after 180000ms`)).toBe(true);
  });
});

test('reports coordinator contention once without exposing account details', { tag: '@svc-internal' }, async () => {
  const messages: string[] = [];
  const originalLog = console.log;
  console.log = (...args: unknown[]) => messages.push(args.join(' '));
  let attempts = 0;
  try {
    const lease = await acquireIdentityLease(
      { pool: 'PRL_SOLICITOR' },
      {
        PRL_SOLICITOR_USERNAME: 'private@example.test',
        PRL_SOLICITOR_PASSWORD: 'private-password',
        PW_IDENTITY_LEASE_ENDPOINT: 'https://lease.example.test',
        PW_IDENTITY_LEASE_POLL_MS: '1',
        PW_IDENTITY_LEASE_WAIT_MS: '1000',
      },
      async (url) => {
        if (String(url).endsWith('/release/lease-1')) return new Response(null, { status: 204 });
        attempts += 1;
        return new Response(
          JSON.stringify(
            attempts < 3
              ? { status: 'pending' }
              : {
                  status: 'acquired',
                  leaseId: 'lease-1',
                  userIdentifier: 'PRL_SOLICITOR',
                }
          ),
          { status: 200 }
        );
      }
    );
    await lease.release();
    expect(messages).toEqual([
      '[identity-lease] Waiting for an available identity (coordinator; candidates=1; wait_limit_ms=1000).',
    ]);
    expect(messages.join(' ')).not.toContain('private');
  } finally {
    console.log = originalLog;
  }
});

test('reports local contention and remains silent for an uncontended lease', { tag: '@svc-internal' }, async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'identity-wait-'));
  const messages: string[] = [];
  const originalLog = console.log;
  let notifyWait: () => void = () => undefined;
  const waiting = new Promise<void>((resolve) => {
    notifyWait = resolve;
  });
  console.log = (...args: unknown[]) => {
    messages.push(args.join(' '));
    notifyWait();
  };
  const env = {
    PRL_SOLICITOR_USERNAME: 'private@example.test',
    PRL_SOLICITOR_PASSWORD: 'private-password',
    PW_IDENTITY_LEASE_DIR: dir,
    PW_IDENTITY_LEASE_POLL_MS: '1',
    PW_IDENTITY_LEASE_WAIT_MS: '10000',
  };
  try {
    const first = await acquireIdentityLease({ pool: 'PRL_SOLICITOR' }, env);
    let secondPromise: ReturnType<typeof acquireIdentityLease> | undefined;
    try {
      expect(messages).toEqual([]);
      secondPromise = acquireIdentityLease({ pool: 'PRL_SOLICITOR' }, env);
      const outcome = await Promise.race([waiting.then(() => 'waiting'), secondPromise.then(() => 'acquired')]);
      expect(outcome).toBe('waiting');
    } finally {
      await first.release();
      if (secondPromise) {
        const second = await secondPromise;
        await second.release();
      }
    }
    expect(messages).toEqual(['[identity-lease] Waiting for an available identity (local; candidates=1; wait_limit_ms=10000).']);
    expect(messages.join(' ')).not.toContain('private');
  } finally {
    console.log = originalLog;
    await rm(dir, { recursive: true, force: true });
  }
});

test('does not take an aged local lock while its owner still holds it', { tag: '@svc-internal' }, async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'identity-live-owner-'));
  const email = 'live-owner@example.test';
  const leaseKey = createHash('sha256').update(email).digest('hex').slice(0, 24);
  const lockPath = path.join(dir, `${leaseKey}.lease.lock`);
  const ownerEnv = {
    PRL_SOLICITOR_USERNAME: email,
    PRL_SOLICITOR_PASSWORD: 'synthetic-password',
    PW_IDENTITY_LEASE_DIR: dir,
    PW_IDENTITY_LEASE_TTL_MS: String(2 * 60 * 60_000),
  };
  const waiterEnv = {
    ...ownerEnv,
    PW_IDENTITY_LEASE_TTL_MS: String(15 * 60_000),
    PW_IDENTITY_LEASE_WAIT_MS: '100',
    PW_IDENTITY_LEASE_POLL_MS: '10',
  };
  const owner = await acquireIdentityLease({ pool: 'PRL_SOLICITOR' }, ownerEnv);
  try {
    const aged = new Date(Date.now() - 60 * 60_000);
    await utimes(lockPath, aged, aged);
    const outcome = await acquireIdentityLease({ pool: 'PRL_SOLICITOR' }, waiterEnv).then(
      (lease) => ({ lease, error: undefined }),
      (error: unknown) => ({ lease: undefined, error })
    );
    if (outcome.lease) await outcome.lease.release();
    expect(outcome.error).toBeInstanceOf(IdentityLeaseTimeoutError);
  } finally {
    await owner.release().catch(() => undefined);
    await rm(dir, { recursive: true, force: true });
  }
});

test('a new waiter cannot displace an old live owner in another process', { tag: '@svc-internal' }, async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'identity-old-owner-'));
  const email = 'old-owner@example.test';
  const leaseKey = createHash('sha256').update(email).digest('hex').slice(0, 24);
  const leaseFile = path.join(dir, `${leaseKey}.lease`);
  await writeFile(leaseFile, '');
  const child = spawn(
    process.execPath,
    [
      '-e',
      `
    const lockfile = require('proper-lockfile');
    lockfile.lock(process.argv[1], { realpath: false, retries: 0, stale: 7200000 }).then((release) => {
      process.send('ready');
      process.on('message', async () => { await release(); process.exit(0); });
    }).catch((error) => { process.send({ error: error.message }); process.exit(1); });
  `,
      leaseFile,
    ],
    { cwd: process.cwd(), stdio: ['ignore', 'ignore', 'ignore', 'ipc'] }
  );
  try {
    const [ready] = await once(child, 'message');
    expect(ready).toBe('ready');
    const aged = new Date(Date.now() - 60 * 60_000);
    await utimes(`${leaseFile}.lock`, aged, aged);
    await expect(
      acquireIdentityLease(
        { pool: 'PRL_SOLICITOR' },
        {
          PRL_SOLICITOR_USERNAME: email,
          PRL_SOLICITOR_PASSWORD: 'synthetic-password',
          PW_IDENTITY_LEASE_DIR: dir,
          PW_IDENTITY_LEASE_WAIT_MS: '100',
          PW_IDENTITY_LEASE_POLL_MS: '10',
        }
      )
    ).rejects.toBeInstanceOf(IdentityLeaseTimeoutError);
  } finally {
    if (child.exitCode === null) {
      const exited = once(child, 'exit');
      child.send('release');
      await exited;
    }
    await rm(dir, { recursive: true, force: true });
  }
});

test('an old waiter cannot age-takeover a new owner in another process', { tag: '@svc-internal' }, async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'identity-new-owner-'));
  const email = 'new-owner@example.test';
  const leaseKey = createHash('sha256').update(email).digest('hex').slice(0, 24);
  const leaseFile = path.join(dir, `${leaseKey}.lease`);
  const lockPath = `${leaseFile}.lock`;
  const env = {
    PRL_SOLICITOR_USERNAME: email,
    PRL_SOLICITOR_PASSWORD: 'synthetic-password',
    PW_IDENTITY_LEASE_DIR: dir,
  };
  const owner = await acquireIdentityLease({ pool: 'PRL_SOLICITOR' }, env);
  try {
    const aged = new Date(Date.now() - 60 * 60_000);
    await utimes(lockPath, aged, aged);
    const outcome = execFileSync(
      process.execPath,
      [
        '-e',
        `
      const lockfile = require('proper-lockfile');
      lockfile.lock(process.argv[1], { realpath: false, retries: 0, stale: 2000 }).then(
        async (release) => { await release(); process.stdout.write('ACQUIRED'); },
        (error) => process.stdout.write('BLOCKED:' + error.code)
      );
    `,
        leaseFile,
      ],
      { cwd: process.cwd(), encoding: 'utf8' }
    );
    expect(outcome).toMatch(/^BLOCKED:/);
    expect((await stat(lockPath)).isFile()).toBe(true);
  } finally {
    await owner.release().catch(() => undefined);
    await rm(dir, { recursive: true, force: true });
  }
});

test('release refuses to remove a replacement owner lock', { tag: '@svc-internal' }, async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'identity-replaced-owner-'));
  const email = 'replaced-owner@example.test';
  const leaseKey = createHash('sha256').update(email).digest('hex').slice(0, 24);
  const lockPath = path.join(dir, `${leaseKey}.lease.lock`);
  const owner = await acquireIdentityLease(
    { pool: 'PRL_SOLICITOR' },
    {
      PRL_SOLICITOR_USERNAME: email,
      PRL_SOLICITOR_PASSWORD: 'synthetic-password',
      PW_IDENTITY_LEASE_DIR: dir,
    }
  );
  try {
    await rename(lockPath, `${lockPath}.previous`);
    await writeFile(lockPath, JSON.stringify({ ownerToken: 'replacement-owner' }));
    await expect(owner.release()).rejects.toThrow('Identity lease ownership changed before release');
    expect(JSON.parse(await readFile(lockPath, 'utf8')).ownerToken).toBe('replacement-owner');
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test('a crashed owner stays locked until its orphan is verified and removed', { tag: '@svc-internal' }, async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'identity-crashed-owner-'));
  const email = 'crashed-owner@example.test';
  const leaseKey = createHash('sha256').update(email).digest('hex').slice(0, 24);
  const lockPath = path.join(dir, `${leaseKey}.lease.lock`);
  const crashedPid = Number(
    execFileSync(
      process.execPath,
      [
        '-e',
        `
    const fs = require('node:fs');
    const handle = fs.openSync(process.argv[1], 'wx', 0o600);
    fs.writeSync(handle, JSON.stringify({ pid: process.pid, ownerToken: 'crashed-owner' }));
    fs.closeSync(handle);
    process.stdout.write(String(process.pid));
  `,
        lockPath,
      ],
      { encoding: 'utf8' }
    )
  );
  const env = {
    PRL_SOLICITOR_USERNAME: email,
    PRL_SOLICITOR_PASSWORD: 'synthetic-password',
    PW_IDENTITY_LEASE_DIR: dir,
    PW_IDENTITY_LEASE_WAIT_MS: '100',
    PW_IDENTITY_LEASE_POLL_MS: '10',
  };
  try {
    await expect(acquireIdentityLease({ pool: 'PRL_SOLICITOR' }, env)).rejects.toBeInstanceOf(IdentityLeaseTimeoutError);
    const owner = JSON.parse(await readFile(lockPath, 'utf8')) as { pid: number; ownerToken: string };
    expect(owner.pid).toBe(crashedPid);
    expect(owner.ownerToken).toBe('crashed-owner');
    await unlink(lockPath);
    const recovered = await acquireIdentityLease({ pool: 'PRL_SOLICITOR' }, env);
    await recovered.release();
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

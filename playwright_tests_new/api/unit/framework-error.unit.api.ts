import { expect, test } from '@playwright/test';
import { annotatePhase, derivePhase, FrameworkError, inPhase } from '../../E2E/utils/frameworkError.js';

const buildTestInfo = (annotations: Array<{ type: string; description?: string }> = []) => ({ annotations });

test.describe('framework error and phase helpers', { tag: '@svc-internal' }, () => {
  test('FrameworkError formats the message as [CODE] detail and keeps its fields', () => {
    const error = new FrameworkError('LEASE_RELEASE_FAILED', 'teardown', 'Failed to release 2 identity lease(s)');

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('[LEASE_RELEASE_FAILED] Failed to release 2 identity lease(s)');
    expect(error).toMatchObject({ code: 'LEASE_RELEASE_FAILED', phase: 'teardown', name: 'FrameworkError' });
  });

  test('annotatePhase replaces earlier phase annotations and leaves others alone', () => {
    const testInfo = buildTestInfo([
      { type: 'session-user', description: 'SOLICITOR' },
      { type: 'phase', description: 'setup' },
      { type: 'phase', description: 'auth' },
    ]);

    annotatePhase(testInfo, 'test');

    expect(testInfo.annotations).toEqual([
      { type: 'session-user', description: 'SOLICITOR' },
      { type: 'phase', description: 'test' },
    ]);
  });

  test('inPhase annotates before running and returns the action result', async () => {
    const testInfo = buildTestInfo();
    let phaseWhileRunning: string | undefined;

    const result = await inPhase(testInfo, 'setup', async () => {
      phaseWhileRunning = testInfo.annotations.find((annotation) => annotation.type === 'phase')?.description;
      return 42;
    });

    expect(result).toBe(42);
    expect(phaseWhileRunning).toBe('setup');
  });

  test('inPhase restores the previous phase after success', async () => {
    const testInfo = buildTestInfo([{ type: 'phase', description: 'test' }]);

    await inPhase(testInfo, 'auth', async () => undefined);

    expect(testInfo.annotations).toEqual([{ type: 'phase', description: 'test' }]);
  });

  test('inPhase restores the absence of a phase after a successful first call', async () => {
    const testInfo = buildTestInfo([{ type: 'session-user', description: 'SOLICITOR' }]);

    await inPhase(testInfo, 'auth', async () => undefined);

    expect(testInfo.annotations).toEqual([{ type: 'session-user', description: 'SOLICITOR' }]);
  });

  test('inPhase restores the original phase after an external retry succeeds', async () => {
    const testInfo = buildTestInfo([{ type: 'phase', description: 'test' }]);
    await expect(
      inPhase(testInfo, 'auth', async () => {
        throw new Error('first attempt');
      })
    ).rejects.toThrow('first attempt');
    expect(testInfo.annotations).toEqual([{ type: 'phase', description: 'auth' }]);

    await inPhase(testInfo, 'auth', async () => undefined);

    expect(testInfo.annotations).toEqual([{ type: 'phase', description: 'test' }]);
  });

  test('inPhase restores nested scopes when an inner failure is recovered', async () => {
    const testInfo = buildTestInfo([{ type: 'phase', description: 'test' }]);
    await inPhase(testInfo, 'setup', async () => {
      await expect(
        inPhase(testInfo, 'auth', async () => {
          throw new Error('inner failure');
        })
      ).rejects.toThrow('inner failure');
      await inPhase(testInfo, 'auth', async () => undefined);
      expect(testInfo.annotations).toEqual([{ type: 'phase', description: 'setup' }]);
    });
    expect(testInfo.annotations).toEqual([{ type: 'phase', description: 'test' }]);
  });

  test('inPhase keeps the innermost failing phase and restores the outer baseline on retry', async () => {
    const testInfo = buildTestInfo([{ type: 'phase', description: 'test' }]);
    await expect(
      inPhase(testInfo, 'setup', () =>
        inPhase(testInfo, 'auth', async () => {
          throw new Error('nested failure');
        })
      )
    ).rejects.toThrow('nested failure');
    expect(testInfo.annotations).toEqual([{ type: 'phase', description: 'auth' }]);
    await inPhase(testInfo, 'setup', async () => undefined);
    expect(testInfo.annotations).toEqual([{ type: 'phase', description: 'test' }]);
  });

  test('inPhase keeps the phase annotation and rethrows the original error', async () => {
    const testInfo = buildTestInfo();
    const failure = new Error('boom');

    await expect(
      inPhase(testInfo, 'auth', async () => {
        throw failure;
      })
    ).rejects.toBe(failure);
    expect(testInfo.annotations).toEqual([{ type: 'phase', description: 'auth' }]);
  });

  const phaseCases: Array<[string, string, string, string | undefined, string]> = [
    ['session capture failure', 'AUTHENTICATION_SESSION_UNAVAILABLE', 'Session capture failed', 'test', 'auth'],
    ['auth beats a leftover setup phase', 'AUTHENTICATION_SESSION_UNAVAILABLE', 'login failed', 'setup', 'auth'],
    ['identity scheduling timeout', 'IDENTITY_SCHEDULING_TIMEOUT', 'Timed out waiting for lease', 'test', 'setup'],
    ['lease failure code', 'UNKNOWN', '[LEASE_ACQUIRE_FAILED] no identity', 'test', 'setup'],
    ['beforeEach hook failure', 'ASSERTION_FAILURE', 'Error in beforeEach hook', undefined, 'setup'],
    ['phase left as setup by inPhase', 'UI_ELEMENT_MISSING', 'locator not found', 'setup', 'setup'],
    ['phase left as teardown by lease release', 'UNKNOWN', '[LEASE_RELEASE_FAILED] x', 'teardown', 'teardown'],
    ['browser closed', 'UNKNOWN', 'Target page, context or browser has been closed', 'test', 'runner'],
    ['worker exited', 'UNKNOWN', 'Worker process exited unexpectedly', 'setup', 'runner'],
    ['assertion in test body', 'ASSERTION_FAILURE', 'expect(received).toBe(expected)', 'test', 'test'],
    ['backend 5xx in test body', 'DOWNSTREAM_API_5XX', 'status 500', undefined, 'test'],
  ];
  for (const [name, failureType, error, currentPhase, expected] of phaseCases) {
    test(`derivePhase maps ${name} to ${expected}`, () => {
      expect(derivePhase(failureType, error, currentPhase)).toBe(expected);
    });
  }
});

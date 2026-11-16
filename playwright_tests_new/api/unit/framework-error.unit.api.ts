import { expect, test } from '@playwright/test';
import { annotatePhase, FrameworkError, inPhase } from '../../E2E/utils/frameworkError.js';

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
});

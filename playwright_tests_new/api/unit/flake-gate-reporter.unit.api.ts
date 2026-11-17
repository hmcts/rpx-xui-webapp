import { expect, test } from '@playwright/test';
import { runGate } from './flake-gate-reporter.fixture';

test.describe('flake gate reporter', { tag: '@svc-internal' }, () => {
  test('stays report-only by default even when thresholds are exceeded', () => {
    const outcome = runGate({ PW_MAX_FLAKY_TESTS: '1' }, 5, 10);

    expect(outcome.output).toContain('mode=report-only');
    expect(outcome.exitCode).toBeUndefined();
    expect(outcome.result).toBeUndefined();
  });

  test('enforce mode fails the run when the flaky count exceeds the threshold', () => {
    const outcome = runGate({ PW_FLAKE_GATE: 'enforce', PW_MAX_FLAKY_TESTS: '1', PW_MAX_FLAKY_RATE: '1' }, 2, 10);

    expect(outcome.output).toContain('mode=enforce');
    expect(outcome.exitCode).toBe(1);
    expect(outcome.result).toEqual({ status: 'failed' });
  });

  test('enforce mode fails the run when the flaky rate exceeds the threshold', () => {
    const outcome = runGate({ PW_FLAKE_GATE: 'enforce', PW_MAX_FLAKY_TESTS: '100', PW_MAX_FLAKY_RATE: '0.2' }, 3, 10);

    expect(outcome.exitCode).toBe(1);
  });

  test('enforce mode passes when flakiness is within both thresholds', () => {
    const outcome = runGate({ PW_FLAKE_GATE: 'enforce', PW_MAX_FLAKY_TESTS: '5', PW_MAX_FLAKY_RATE: '0.5' }, 2, 10);

    expect(outcome.output).toContain('mode=enforce');
    expect(outcome.exitCode).toBeUndefined();
    expect(outcome.result).toBeUndefined();
  });
});

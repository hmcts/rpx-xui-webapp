import type { TestInfo } from '@playwright/test';

export type Phase = 'auth' | 'setup' | 'test' | 'teardown' | 'runner';

export const PHASE_ANNOTATION_TYPE = 'phase';

/** Framework failure whose message is `[CODE] detail`, carrying the phase it happened in. */
export class FrameworkError extends Error {
  readonly code: string;
  readonly phase: Phase;
  readonly detail: string;

  constructor(code: string, phase: Phase, detail: string) {
    super(`[${code}] ${detail}`);
    this.name = 'FrameworkError';
    this.code = code;
    this.phase = phase;
    this.detail = detail;
  }
}

const failedPhaseBaselines = new WeakMap<Pick<TestInfo, 'annotations'>, Phase | undefined>();

const readPhase = (testInfo: Pick<TestInfo, 'annotations'>): Phase | undefined =>
  [...testInfo.annotations].reverse().find((annotation) => annotation.type === PHASE_ANNOTATION_TYPE)?.description as
    Phase | undefined;

/** Replaces the `phase` annotation, or removes it when the previous scope had no phase. */
export function annotatePhase(testInfo: Pick<TestInfo, 'annotations'>, phase: Phase | undefined): void {
  for (let index = testInfo.annotations.length - 1; index >= 0; index -= 1) {
    if (testInfo.annotations[index].type === PHASE_ANNOTATION_TYPE) {
      testInfo.annotations.splice(index, 1);
    }
  }
  if (phase) {
    testInfo.annotations.push({ type: PHASE_ANNOTATION_TYPE, description: phase });
  }
}

/**
 * Marks `phase` on the test while `action` runs. On success the previous phase is restored so the test body is not
 * left labelled as setup or auth; on failure the phase stays so the failure is attributed to where it happened.
 */
export async function inPhase<T>(testInfo: Pick<TestInfo, 'annotations'>, phase: Phase, action: () => Promise<T>): Promise<T> {
  // Keep the pre-failure baseline so an external retry can restore it after succeeding.
  const previous = failedPhaseBaselines.has(testInfo) ? failedPhaseBaselines.get(testInfo) : readPhase(testInfo);
  failedPhaseBaselines.delete(testInfo);
  annotatePhase(testInfo, phase);
  try {
    const result = await action();
    failedPhaseBaselines.delete(testInfo);
    annotatePhase(testInfo, previous);
    return result;
  } catch (error) {
    failedPhaseBaselines.set(testInfo, previous);
    throw error;
  }
}

const RUNNER_ERROR_PATTERN = /browser has been closed|worker process exited|worker teardown timeout/i;
const SETUP_ERROR_PATTERN = /beforeEach|beforeAll|\bhook\b|\[LEASE_[A-Z_]+\]|case setup|setupCaseForJourney/i;

/**
 * Maps a classified failure to the coarse phase the harness understands. A phase already left on the test by
 * `inPhase`/`annotatePhase` (anything other than `test`) means the failure happened there, so it is kept.
 */
export function derivePhase(failureType: string, error: string, currentPhase?: string): Phase {
  if (RUNNER_ERROR_PATTERN.test(error)) {
    return 'runner';
  }
  if (failureType === 'AUTHENTICATION_SESSION_UNAVAILABLE') {
    return 'auth';
  }
  if (currentPhase === 'auth' || currentPhase === 'setup' || currentPhase === 'teardown') {
    return currentPhase;
  }
  if (failureType === 'IDENTITY_SCHEDULING_TIMEOUT' || SETUP_ERROR_PATTERN.test(error)) {
    return 'setup';
  }
  return 'test';
}

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

const readPhase = (testInfo: Pick<TestInfo, 'annotations'>): string | undefined =>
  [...testInfo.annotations].reverse().find((annotation) => annotation.type === PHASE_ANNOTATION_TYPE)?.description;

/** Sets the single `phase` annotation, replacing any earlier one so the last phase entered wins. */
export function annotatePhase(testInfo: Pick<TestInfo, 'annotations'>, phase: Phase): void {
  for (let index = testInfo.annotations.length - 1; index >= 0; index -= 1) {
    if (testInfo.annotations[index].type === PHASE_ANNOTATION_TYPE) {
      testInfo.annotations.splice(index, 1);
    }
  }
  testInfo.annotations.push({ type: PHASE_ANNOTATION_TYPE, description: phase });
}

/**
 * Marks `phase` on the test while `action` runs. On success the previous phase is restored so the test body is not
 * left labelled as setup or auth; on failure the phase stays so the failure is attributed to where it happened.
 */
export async function inPhase<T>(testInfo: Pick<TestInfo, 'annotations'>, phase: Phase, action: () => Promise<T>): Promise<T> {
  const previous = readPhase(testInfo);
  annotatePhase(testInfo, phase);
  const result = await action();
  if (previous) {
    annotatePhase(testInfo, previous as Phase);
  }
  return result;
}

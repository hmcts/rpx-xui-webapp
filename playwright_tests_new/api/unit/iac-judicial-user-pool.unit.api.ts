import { expect, test } from '@playwright/test';

import {
  getConfiguredIacJudicialUserIdentifiers,
  resolveIacJudicialUserIdentifier,
  resolveIacJudicialWarmupUsers,
} from '../../integration/helpers/iacJudicialUserPool.helper.js';

const poolEnv = {
  PW_IAC_JUDGE_WA_R1_EMAIL: 'r1@example.test',
  PW_IAC_JUDGE_WA_R1_PASSWORD: 'r1-password',
  IAC_JUDGE_WA_R2_USERNAME: 'r2@example.test',
  IAC_JUDGE_WA_R2_PASSWORD: 'r2-password',
  IAC_JUDGE_WA_R3_USERNAME: 'r3@example.test',
  IAC_JUDGE_WA_R3_PASSWORD: 'r3-password',
} as NodeJS.ProcessEnv;

test.describe('IAC judicial user pool', { tag: '@svc-internal' }, () => {
  test('returns every fully configured judicial identity for warmup', () => {
    expect(getConfiguredIacJudicialUserIdentifiers(poolEnv)).toEqual(['IAC_Judge_WA_R1', 'IAC_Judge_WA_R2', 'IAC_Judge_WA_R3']);
    expect(resolveIacJudicialWarmupUsers(poolEnv)).toEqual(['IAC_Judge_WA_R1', 'IAC_Judge_WA_R2', 'IAC_Judge_WA_R3']);
  });

  test('selects configured users by Playwright parallel index', () => {
    expect(resolveIacJudicialUserIdentifier({ parallelIndex: 0 }, poolEnv)).toBe('IAC_Judge_WA_R1');
    expect(resolveIacJudicialUserIdentifier({ parallelIndex: 1 }, poolEnv)).toBe('IAC_Judge_WA_R2');
    expect(resolveIacJudicialUserIdentifier({ parallelIndex: 2 }, poolEnv)).toBe('IAC_Judge_WA_R3');
    expect(resolveIacJudicialUserIdentifier({ parallelIndex: 3 }, poolEnv)).toBe('IAC_Judge_WA_R1');
  });

  test('falls back to the existing R1 identity when no pool credentials are configured', () => {
    expect(resolveIacJudicialWarmupUsers({})).toEqual(['IAC_Judge_WA_R1']);
    expect(resolveIacJudicialUserIdentifier({ parallelIndex: 2 }, {})).toBe('IAC_Judge_WA_R1');
  });
});

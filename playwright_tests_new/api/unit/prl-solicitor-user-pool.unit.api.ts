import { expect, test } from '@playwright/test';

import {
  getConfiguredPrlSolicitorUserIdentifiers,
  resolvePrlSolicitorSessionCandidates,
} from '../../common/prlSolicitorUserPool.js';
import { __test__ as sessionCaptureTest } from '../../common/sessionCapture.js';
import { resolveSessionIdentity } from '../../common/sessionIdentity.js';

const configuredEnv = {
  PRL_SOLICITOR_USERNAME: 'prl-1@example.test',
  PRL_SOLICITOR_PASSWORD: 'secret-1',
  PRL_SOLICITOR2_USERNAME: 'prl-2@example.test',
  PRL_SOLICITOR2_PASSWORD: 'secret-2',
  PRL_SOLICITOR3_USERNAME: 'prl-3@example.test',
  PRL_SOLICITOR3_PASSWORD: 'secret-3',
} as const;

const prlSolicitorPoolCredentialEnvKeys = [
  'PRL_SOLICITOR_USERNAME',
  'PRL_SOLICITOR_PASSWORD',
  ...Array.from({ length: 7 }, (_, index) => {
    const userNumber = index + 2;
    return [`PRL_SOLICITOR${userNumber}_USERNAME`, `PRL_SOLICITOR${userNumber}_PASSWORD`];
  }).flat(),
] as const;

test.describe('PRL solicitor user pool', { tag: '@svc-internal' }, () => {
  test('selects a distinct configured PRL solicitor per worker and preserves fallback order', () => {
    expect(getConfiguredPrlSolicitorUserIdentifiers(configuredEnv)).toEqual([
      'PRL_SOLICITOR',
      'PRL_SOLICITOR2',
      'PRL_SOLICITOR3',
    ]);

    const candidates = resolvePrlSolicitorSessionCandidates({ parallelIndex: 4 }, configuredEnv);
    expect(candidates).toEqual(['PRL_SOLICITOR2', 'PRL_SOLICITOR', 'PRL_SOLICITOR3']);
  });

  test('falls back to the legacy PRL solicitor only when no pool credentials are configured', () => {
    const candidates = resolvePrlSolicitorSessionCandidates({ parallelIndex: 1 }, {}, {
      getUserCredentials: () => ({ email: 'legacy-prl@example.test', password: 'legacy-secret' }),
    } as never);
    expect(candidates).toEqual([
      { userIdentifier: 'PRL_SOLICITOR', email: 'legacy-prl@example.test', password: 'legacy-secret' },
    ]);
  });

  test('expands the PRL solicitor alias through the shared session-capture resolver', () => {
    const originalValues = Object.fromEntries(prlSolicitorPoolCredentialEnvKeys.map((key) => [key, process.env[key]]));
    try {
      for (const key of prlSolicitorPoolCredentialEnvKeys) {
        delete process.env[key];
      }
      Object.assign(process.env, configuredEnv);
      expect(
        sessionCaptureTest
          .resolveSessionCandidates('PRL_SOLICITOR', 2)
          .map((candidate) => resolveSessionIdentity(candidate).userIdentifier)
          .slice(0, 3)
      ).toEqual(['PRL_SOLICITOR3', 'PRL_SOLICITOR', 'PRL_SOLICITOR2']);
    } finally {
      for (const [key, value] of Object.entries(originalValues)) {
        if (value === undefined) {
          delete process.env[key];
        } else {
          process.env[key] = value;
        }
      }
    }
  });
});

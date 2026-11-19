import { expect, test } from '@playwright/test';

import { FrameworkError } from '../../E2E/utils/frameworkError';
import { __test__ as resolverTest, PRL_HEARINGS_CASE_ACCESS_DENIED_CODE } from '../../E2E/utils/test-setup/hearingsCaseResolver';
import { __test__ as setupTest } from '../../E2E/utils/test-setup/prlHearingsCaseSetup';

const CASE_REFERENCE = '1234567890123456';
const accessContext = {
  userLabel: 'HEARING_MANAGER_CR84_ON',
  createdCase: { caseReference: CASE_REFERENCE, caseManagementLocation: { baseLocation: '234946', region: '2' } },
  userAccessRegions: ['1'],
};

function caseView(accessGranted?: string, accessProcess?: string) {
  const metadataFields = [
    ...(accessGranted === undefined ? [] : [{ id: '[ACCESS_GRANTED]', value: accessGranted }]),
    ...(accessProcess === undefined ? [] : [{ id: '[ACCESS_PROCESS]', value: accessProcess }]),
  ];
  return { metadataFields };
}

function captureError(run: () => unknown): unknown {
  try {
    run();
  } catch (error) {
    return error;
  }
  throw new Error('Expected the access check to throw.');
}

test.describe('PRL hearings case access preflight', { tag: '@svc-internal' }, () => {
  test('mirrors the case viewer standard-access rule', () => {
    expect(resolverTest.resolveCaseViewAccess(caseView('STANDARD', 'NONE')).standard).toBe(true);
    expect(resolverTest.resolveCaseViewAccess(caseView('BASIC,STANDARD', 'CHALLENGED')).standard).toBe(true);
    expect(resolverTest.resolveCaseViewAccess(caseView('BASIC', 'NONE')).standard).toBe(true);
    expect(resolverTest.resolveCaseViewAccess(caseView('BASIC', 'CHALLENGED')).standard).toBe(false);
    expect(resolverTest.resolveCaseViewAccess(caseView('BASIC', 'SPECIFIC')).standard).toBe(false);
    expect(resolverTest.resolveCaseViewAccess(caseView(undefined, 'CHALLENGED')).standard).toBe(false);
    expect(resolverTest.resolveCaseViewAccess({}).standard).toBe(true);
  });

  test('accepts a standard-access case view', () => {
    expect(
      resolverTest.assertStandardCaseAccess({ status: 200, body: caseView('STANDARD', 'NONE') }, accessContext)
    ).toMatchObject({ standard: true });
  });

  test('fails fast with a setup error naming the user, case and location gap for challenged access', () => {
    const error = captureError(() =>
      resolverTest.assertStandardCaseAccess({ status: 200, body: caseView('BASIC', 'CHALLENGED') }, accessContext)
    );
    expect(error).toBeInstanceOf(FrameworkError);
    expect((error as FrameworkError).code).toBe(PRL_HEARINGS_CASE_ACCESS_DENIED_CODE);
    expect((error as FrameworkError).phase).toBe('setup');
    const message = (error as Error).message;
    expect(message).toContain('HEARING_MANAGER_CR84_ON');
    expect(message).toContain(CASE_REFERENCE);
    expect(message).toContain('access process CHALLENGED');
    expect(message).toContain('case region 2');
    expect(message).toContain('access-role regions: 1');
  });

  for (const status of [403, 404]) {
    test(`treats a CCD case view HTTP ${status} as a deterministic access failure`, () => {
      const error = captureError(() => resolverTest.assertStandardCaseAccess({ status }, accessContext));
      expect((error as FrameworkError).code).toBe(PRL_HEARINGS_CASE_ACCESS_DENIED_CODE);
      expect((error as Error).message).toContain(`HTTP ${status}`);
    });
  }

  test('keeps an unavailable case view as an ordinary, non-access failure', () => {
    const error = captureError(() => resolverTest.assertStandardCaseAccess({ status: 502 }, accessContext));
    expect(error).not.toBeInstanceOf(FrameworkError);
    expect((error as Error).message).toContain('could not verify access');
    expect((error as Error).message).toContain('HTTP 502');
  });

  test('lists only substantive PRL access-role regions for diagnostics', () => {
    expect(
      resolverTest.listPrlAccessRoleRegions(
        {
          roleAssignmentInfo: [
            { jurisdiction: 'PRIVATELAW', roleName: 'hearing-centre-admin', region: '1', substantive: 'Y' },
            { jurisdiction: 'PRIVATELAW', roleName: 'task-supervisor', region: ' 1 ', substantive: 'Y' },
            { jurisdiction: 'PRIVATELAW', roleName: 'hearing-manager', region: '7', substantive: 'Y' },
            { jurisdiction: 'PRIVATELAW', roleName: 'case-allocator', region: '9', substantive: 'N' },
            { jurisdiction: 'IA', roleName: 'hearing-centre-admin', region: '5', substantive: 'Y' },
          ],
        },
        'PRIVATELAW'
      )
    ).toEqual(['1']);
  });

  test('returns the created case management location for access diagnostics', () => {
    expect(
      setupTest.validateCreatedCase(
        { state: 'JUDICIAL_REVIEW', data: { caseManagementLocation: { baseLocation: '234946', region: '2' } } },
        '234946'
      )
    ).toEqual({ baseLocation: '234946', region: '2' });
    expect(
      setupTest.validateCreatedCase(
        { state: 'JUDICIAL_REVIEW', data: { caseManagementLocation: { baseLocation: '234946' } } },
        '234946'
      )
    ).toEqual({ baseLocation: '234946' });
  });
});

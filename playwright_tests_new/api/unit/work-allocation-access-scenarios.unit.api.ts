import { expect, test } from '@playwright/test';
import {
  buildEntityToUsersAccessView,
  buildMyAccessResponseFromScenario,
  queryWorkAllocationAccessByUserAndEntity,
  type WorkAllocationAccessScenarioRecord,
} from '../../integration/helpers/workAllocationAccessScenarios.helper.js';

const scenarioRecords: WorkAllocationAccessScenarioRecord[] = [
  {
    assignmentId: 'assignment-alice-case-100',
    actorId: 'user-alice',
    actorName: 'Alice Example',
    actorEmail: 'alice@example.com',
    roleCategory: 'LEGAL_OPERATIONS',
    roleName: 'Case Manager',
    caseId: '1000000000000001',
    caseName: 'Access Case 100',
    caseCategory: 'Protection',
    caseTypeId: 'Asylum',
    jurisdiction: 'IA',
    serviceLabel: 'Immigration & Asylum',
    grantType: 'SPECIFIC',
    created: '2026-01-10T12:00:00.000Z',
    start: '2026-01-11T12:00:00.000Z',
    end: '2026-02-11T12:00:00.000Z',
    myAccessRole: 'specific-access-granted',
    myAccessLabel: 'Specific access granted',
    hasAccess: true,
    isNew: false,
  },
  {
    assignmentId: 'assignment-alice-case-200',
    actorId: 'user-alice',
    actorName: 'Alice Example',
    actorEmail: 'alice@example.com',
    roleCategory: 'LEGAL_OPERATIONS',
    roleName: 'Case Allocator',
    caseId: '1000000000000002',
    caseName: 'Access Case 200',
    caseCategory: 'Human rights',
    caseTypeId: 'Asylum',
    jurisdiction: 'IA',
    serviceLabel: 'Immigration & Asylum',
    grantType: 'CHALLENGED',
    created: '2026-01-12T12:00:00.000Z',
    start: '2026-01-13T12:00:00.000Z',
    end: '2026-02-13T12:00:00.000Z',
    myAccessRole: 'challenged-access-legal-ops',
    myAccessLabel: 'Challenged access granted',
    hasAccess: true,
    isNew: true,
  },
  {
    assignmentId: 'assignment-judge-case-100',
    actorId: 'judge-bob',
    actorName: 'Bob Judge',
    actorEmail: 'judge.bob@example.com',
    roleCategory: 'JUDICIAL',
    roleName: 'Lead Judge',
    caseId: '1000000000000001',
    caseName: 'Access Case 100',
    caseCategory: 'Protection',
    caseTypeId: 'Asylum',
    jurisdiction: 'IA',
    grantType: 'STANDARD',
    created: '2026-01-09T12:00:00.000Z',
    start: '2026-01-10T12:00:00.000Z',
    end: '2026-02-10T12:00:00.000Z',
  },
  {
    assignmentId: 'assignment-judge-case-100-exclusion',
    actorId: 'judge-bob',
    actorName: 'Bob Judge',
    actorEmail: 'judge.bob@example.com',
    roleCategory: 'JUDICIAL',
    roleName: 'Lead Judge',
    caseId: '1000000000000001',
    caseName: 'Access Case 100',
    caseCategory: 'Protection',
    caseTypeId: 'Asylum',
    jurisdiction: 'IA',
    grantType: 'EXCLUDED',
    created: '2026-01-15T12:00:00.000Z',
    notes: 'Judicial conflict flagged.',
  },
];

test.describe('work allocation access scenario helper', { tag: '@svc-internal' }, () => {
  test('returns responsibilities for an allowed user+entity query', () => {
    const decision = queryWorkAllocationAccessByUserAndEntity(scenarioRecords, {
      actorId: 'user-alice',
      caseId: '1000000000000001',
    });

    expect(decision.hasAccess).toBe(true);
    expect(decision.responsibilities).toEqual([
      {
        assignmentId: 'assignment-alice-case-100',
        roleName: 'Case Manager',
        roleCategory: 'LEGAL_OPERATIONS',
        grantType: 'SPECIFIC',
      },
    ]);
    expect(decision.exclusions).toEqual([]);
  });

  test('returns responsibilities and exclusions independently when an EXCLUDED grant exists for the same user+entity', () => {
    const decision = queryWorkAllocationAccessByUserAndEntity(scenarioRecords, {
      actorId: 'judge-bob',
      caseId: '1000000000000001',
    });

    expect(decision.hasAccess).toBe(true);
    expect(decision.responsibilities).toEqual([
      {
        assignmentId: 'assignment-judge-case-100',
        roleName: 'Lead Judge',
        roleCategory: 'JUDICIAL',
        grantType: 'STANDARD',
      },
    ]);
    expect(decision.exclusions).toEqual([
      {
        assignmentId: 'assignment-judge-case-100-exclusion',
        notes: 'Judicial conflict flagged.',
        grantType: 'EXCLUDED',
      },
    ]);
  });

  test('builds the user->entities my-access view from specific-access records only', () => {
    const response = buildMyAccessResponseFromScenario(scenarioRecords, 'user-alice');

    expect(response.total_records).toBe(1);
    expect(response.cases.map((item) => item.case_name)).toEqual(['Access Case 100']);
    expect(response.cases.map((item) => item.access)).toEqual(['Specific access granted']);
    expect(response.cases.filter((item) => item.isNew)).toHaveLength(0);
  });

  test('builds the entity->users view with exclusions separated from active users', () => {
    const response = buildEntityToUsersAccessView(scenarioRecords, '1000000000000001');

    expect(response.roles).toHaveLength(2);
    expect(response.roles).toContainEqual(
      expect.objectContaining({
        id: 'assignment-alice-case-100',
        name: 'Alice Example',
        roleName: 'Case Manager',
        roleCategory: 'LEGAL_OPERATIONS',
      })
    );
    expect(response.roles).toContainEqual(
      expect.objectContaining({
        id: 'assignment-judge-case-100',
        actorId: 'judge-bob',
        roleName: 'Lead Judge',
        roleCategory: 'JUDICIAL',
      })
    );

    expect(response.exclusions).toEqual([
      expect.objectContaining({
        id: 'assignment-judge-case-100-exclusion',
        actorId: 'judge-bob',
        userType: 'JUDICIAL',
        notes: 'Judicial conflict flagged.',
      }),
    ]);

    expect(response.caseworkers).toEqual([
      expect.objectContaining({
        idamId: 'user-alice',
        email: 'alice@example.com',
        service: 'IA',
      }),
    ]);

    expect(response.judicialUsers).toEqual([
      expect.objectContaining({
        sidam_id: 'judge-bob',
        full_name: 'Bob Judge',
        email_id: 'judge.bob@example.com',
      }),
    ]);
  });
});

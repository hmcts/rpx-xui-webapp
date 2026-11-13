import { rolesAndAccessScenarioCaseId, rolesAndAccessScenarioRecords } from './workAllocationAccessScenarios.mock';

export const roleCaseId = rolesAndAccessScenarioCaseId;
export const roleCasePath = `/cases/case-details/IA/Asylum/${roleCaseId}#Roles%20and%20access`;
export const roleRecords = [
  ...rolesAndAccessScenarioRecords,
  {
    ...rolesAndAccessScenarioRecords[0],
    assignmentId: 'exclusion-alice',
    grantType: 'EXCLUDED' as const,
    notes: 'Separate conflict.',
    created: '2026-01-16T12:00:00.000Z',
  },
];
export const replacementPerson = {
  email: 'clara@example.com',
  name: 'Clara Replacement',
  id: 'user-clara',
  domain: 'Legal Ops',
};
export const replacementCaseworker = {
  email: replacementPerson.email,
  firstName: 'Clara',
  lastName: 'Replacement',
  idamId: replacementPerson.id,
  roleCategory: 'LEGAL_OPERATIONS',
  roleCategories: ['LEGAL_OPERATIONS'],
  service: 'IA',
  location: { id: 227101, locationName: 'Taylor House' },
};
export const exclusionReason = 'Synthetic conflict declared by the selected person.';
export const addedExclusionRecords = [
  ...roleRecords,
  {
    ...roleRecords[0],
    assignmentId: 'exclusion-clara',
    actorId: replacementPerson.id,
    actorName: replacementPerson.name,
    actorEmail: replacementPerson.email,
    grantType: 'EXCLUDED' as const,
    notes: exclusionReason,
    created: '2026-11-13T12:00:00.000Z',
  },
];
export const expectedOtherExclusion = {
  caseId: roleCaseId,
  jurisdiction: 'IA',
  caseType: 'Asylum',
  state: 4,
  exclusionOption: 'Exclude another person',
  personRole: 'Legal Ops',
  person: replacementPerson,
  exclusionDescription: exclusionReason,
  lastError: null,
};
export const expectedSelfExclusion = {
  ...expectedOtherExclusion,
  exclusionOption: 'Exclude me',
  personRole: null,
  person: null,
};
export const expectedDeletedExclusion = {
  actorId: 'judge-bob',
  id: 'assignment-judge-case-100-excluded',
  type: 'CASE',
  name: 'Bob Judge',
  userType: 'JUDICIAL',
  notes: 'Judicial conflict flagged.',
  added: '2026-01-15T12:00:00.000Z',
};

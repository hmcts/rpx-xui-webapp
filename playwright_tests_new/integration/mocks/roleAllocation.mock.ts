import { rolesAndAccessScenarioCaseId, rolesAndAccessScenarioRecords } from './workAllocationAccessScenarios.mock';

export const allocationCaseId = rolesAndAccessScenarioCaseId;
export const allocationCasePath = `/cases/case-details/IA/Asylum/${allocationCaseId}#Roles%20and%20access`;
export const existingJudicialRole = rolesAndAccessScenarioRecords[1];
export const allocatedPerson = {
  id: 'user-clara',
  name: 'Clara Replacement',
  email: 'clara@example.com',
  domain: 'Legal Ops',
};
export const allocatedCaseworker = {
  idamId: allocatedPerson.id,
  firstName: 'Clara',
  lastName: 'Replacement',
  email: allocatedPerson.email,
  roleCategory: 'LEGAL_OPERATIONS',
  roleCategories: ['LEGAL_OPERATIONS'],
  service: 'IA',
  location: { id: 227101, locationName: 'Taylor House' },
};
export const allocatedRecord = {
  ...rolesAndAccessScenarioRecords[0],
  assignmentId: 'assignment-clara-case-100',
  actorId: allocatedPerson.id,
  actorName: allocatedPerson.name,
  actorEmail: allocatedPerson.email,
  roleName: 'Case manager',
  start: '2030-01-15T00:00:00.000Z',
  end: '',
};
export const validAllocationRoles = [
  { service: 'IA', roles: [{ roleId: 'case-manager', roleName: 'Case manager', roleCategory: 'LEGAL_OPERATIONS' }] },
];

export const allocationOrganisation = {
  name: 'Playwright Organisation',
  organisationIdentifier: 'PLAYWRIGHT_ORG',
  status: 'ACTIVE',
  contactInformation: [],
  paymentAccount: [],
};

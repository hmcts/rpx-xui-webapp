import { buildHearingsUserDetailsMock } from './hearings.mock';

export const rolesAccessAllocatorRoleAssignments = [
  {
    jurisdiction: 'IA',
    substantive: 'N',
    roleType: 'ORGANISATION',
    baseLocation: '20001',
    roleCategory: 'LEGAL_OPERATIONS',
    roleName: 'case-allocator',
    isCaseAllocator: true,
  },
  {
    jurisdiction: 'SSCS',
    substantive: 'N',
    roleType: 'ORGANISATION',
    baseLocation: '30001',
    roleCategory: 'LEGAL_OPERATIONS',
    roleName: 'case-allocator',
    isCaseAllocator: true,
  },
] as const;

export const rolesAccessNonAllocatorRoleAssignments = [
  {
    jurisdiction: 'IA',
    substantive: 'N',
    roleType: 'ORGANISATION',
    baseLocation: '20001',
    roleCategory: 'LEGAL_OPERATIONS',
    roleName: 'task-supervisor',
    isCaseAllocator: false,
  },
  {
    jurisdiction: 'SSCS',
    substantive: 'N',
    roleType: 'ORGANISATION',
    baseLocation: '30001',
    roleCategory: 'LEGAL_OPERATIONS',
    roleName: 'task-supervisor',
    isCaseAllocator: false,
  },
] as const;

export type RolesAccessRoleAssignment = {
  jurisdiction: string;
  substantive?: string;
  roleType?: string;
  baseLocation?: string;
  roleCategory?: string;
  roleName?: string;
  isCaseAllocator?: boolean;
};

export type RolesAccessCaseRole = {
  id: string;
  actorId: string;
  name: string;
  email: string;
  roleCategory: 'JUDICIAL' | 'LEGAL_OPERATIONS';
  roleName: string;
  roleId: string;
  location: string;
  start: string;
  end: string;
  actions: Array<{ id: string; title: string }>;
};

export type RolesAccessRoleExclusion = {
  actorId: string;
  added: string;
  id: string;
  name: string;
  notes: string;
  type: string;
  userType: string;
};

export type RolesAccessJudicialPerson = {
  appointments: unknown[];
  email_id: string;
  full_name: string;
  idam_id: string;
  known_as: string;
  sidam_id: string;
  surname: string;
};

export const rolesAccessLegalOpsCaseworker = {
  email: 'alice.example@justice.gov.uk',
  firstName: 'Alice',
  idamId: 'legal-ops-person-1',
  lastName: 'Example',
  location: {
    id: 20001,
    locationName: 'Taylor House',
    services: ['IA'],
  },
  roleCategory: 'LEGAL_OPERATIONS' as const,
  service: 'IA' as const,
};

export const rolesAccessJudicialPeople: RolesAccessJudicialPerson[] = [
  {
    appointments: [],
    email_id: 'judge.one@example.com',
    full_name: 'Judge One Full',
    idam_id: 'judicial-person-1',
    known_as: 'Judge One Alias',
    sidam_id: 'judicial-person-1',
    surname: 'One',
  },
  {
    appointments: [],
    email_id: 'replacement.judge@example.com',
    full_name: 'Replacement Judge',
    idam_id: 'judicial-replacement-1',
    known_as: 'Replacement Judge',
    sidam_id: 'judicial-replacement-1',
    surname: 'Judge',
  },
  {
    appointments: [],
    email_id: 'alternate.judge@example.com',
    full_name: 'Alternate Judge',
    idam_id: 'judicial-replacement-2',
    known_as: 'Alternate Judge',
    sidam_id: 'judicial-replacement-2',
    surname: 'Judge',
  },
];

export function hasCaseAllocatorAssignment(roleAssignmentInfo: RolesAccessRoleAssignment[]): boolean {
  return roleAssignmentInfo.some((assignment) => assignment.isCaseAllocator === true || assignment.roleName === 'case-allocator');
}

export function buildRolesAccessUserDetailsMock(options: { userId?: string; roleAssignmentInfo: RolesAccessRoleAssignment[] }) {
  const baseRoles = ['caseworker-ia', 'caseworker-ia-caseofficer', 'caseworker-ia-admofficer'];
  const roles = hasCaseAllocatorAssignment(options.roleAssignmentInfo) ? [...baseRoles, 'case-allocator'] : baseRoles;
  const userDetails = buildHearingsUserDetailsMock(roles);

  return {
    ...userDetails,
    userInfo: {
      ...userDetails.userInfo,
      id: options.userId ?? 'wave2-roles-user',
      uid: options.userId ?? 'wave2-roles-user',
    },
    roleAssignmentInfo: [...options.roleAssignmentInfo],
  };
}

export function buildRolesAccessCaseRoles(): RolesAccessCaseRole[] {
  return [
    {
      id: 'judicial-role-1',
      actorId: 'judicial-person-1',
      name: '',
      email: '',
      roleCategory: 'JUDICIAL',
      roleName: 'Lead Judge',
      roleId: 'lead-judge',
      location: 'Taylor House',
      start: '2030-01-10T12:00:00.000Z',
      end: '2030-02-10T12:00:00.000Z',
      actions: [
        { id: 'reallocate', title: 'Reallocate' },
        { id: 'remove', title: 'Remove Allocation' },
      ],
    },
    {
      id: 'legal-ops-role-1',
      actorId: rolesAccessLegalOpsCaseworker.idamId,
      name: '',
      email: '',
      roleCategory: 'LEGAL_OPERATIONS',
      roleName: 'Case Manager',
      roleId: 'case-manager',
      location: 'Taylor House',
      start: '2030-01-12T12:00:00.000Z',
      end: '2030-02-12T12:00:00.000Z',
      actions: [
        { id: 'reallocate', title: 'Reallocate' },
        { id: 'remove', title: 'Remove Allocation' },
      ],
    },
  ];
}

export function buildRolesAccessExclusions(): RolesAccessRoleExclusion[] {
  return [
    {
      actorId: 'judicial-person-1',
      added: '2030-01-08T12:00:00.000Z',
      id: 'existing-exclusion-1',
      name: '',
      notes: 'Existing judicial exclusion',
      type: 'EXCLUDED',
      userType: 'JUDICIAL',
    },
  ];
}

export function filterJudicialPeopleByIds(userIds: string[]): RolesAccessJudicialPerson[] {
  return rolesAccessJudicialPeople.filter((person) => userIds.includes(person.sidam_id));
}

export function buildFindPersonResults(searchTerm: string, userRole: string) {
  if (userRole !== 'Judicial') {
    return [];
  }

  const normalizedSearchTerm = searchTerm.toLowerCase();

  return rolesAccessJudicialPeople
    .filter((person) => person.full_name.toLowerCase().includes(normalizedSearchTerm))
    .map((person) => ({
      ...person,
      email: person.email_id,
      id: person.sidam_id,
      name: person.full_name,
    }));
}

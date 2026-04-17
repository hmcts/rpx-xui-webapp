import { buildMyAccessCaseMock, type MyAccessCaseMock } from '../mocks/myAccess.mock';
import { formatUiDate } from '../utils/tableUtils';

export type WorkAllocationAccessGrantType = 'STANDARD' | 'SPECIFIC' | 'CHALLENGED' | 'EXCLUDED';
export type WorkAllocationScenarioRoleCategory = 'JUDICIAL' | 'LEGAL_OPERATIONS' | 'ADMIN' | 'CTSC' | 'PROFESSIONAL';

export type WorkAllocationAccessScenarioRecord = {
  assignmentId: string;
  actorId: string;
  actorName: string;
  actorEmail: string;
  roleCategory: WorkAllocationScenarioRoleCategory;
  roleName: string;
  caseId: string;
  caseName: string;
  caseCategory: string;
  caseTypeId: string;
  jurisdiction: string;
  jurisdictionId?: string;
  locationId?: number;
  locationName?: string;
  serviceLabel?: string;
  grantType: WorkAllocationAccessGrantType;
  created?: string;
  start?: string;
  end?: string;
  notes?: string;
  myAccessRole?: MyAccessCaseMock['role'];
  myAccessLabel?: string;
  hasAccess?: boolean;
  isNew?: boolean;
};

export type UserEntityAccessDecision = {
  actorId: string;
  caseId: string;
  hasAccess: boolean;
  responsibilities: Array<{
    assignmentId: string;
    roleName: string;
    roleCategory: WorkAllocationScenarioRoleCategory;
    grantType: Exclude<WorkAllocationAccessGrantType, 'EXCLUDED'>;
  }>;
  exclusions: Array<{
    assignmentId: string;
    notes: string;
    grantType: 'EXCLUDED';
  }>;
};

type ScenarioCaseworker = {
  email: string;
  firstName: string;
  idamId: string;
  lastName: string;
  location: {
    id: number;
    locationName: string;
  };
  roleCategory: WorkAllocationScenarioRoleCategory;
  service: string;
};

type ScenarioJudicialUser = {
  appointments: [];
  known_as: string;
  full_name: string;
  surname: string;
  sidam_id: string;
  idam_id: string;
  email_id: string;
};

type ScenarioCaseRole = {
  name: string;
  roleCategory: WorkAllocationScenarioRoleCategory;
  roleName: string;
  location: string;
  start: string;
  end: string;
  id: string;
  actorId: string;
  email: string;
  created?: string;
  notes?: string;
};

type ScenarioRoleExclusion = {
  actorId: string;
  id: string;
  type: string;
  name: string;
  userType: WorkAllocationScenarioRoleCategory;
  notes: string;
  added: string;
  email?: string;
};

const DEFAULT_CREATED = '2026-01-08T12:00:00.000Z';
const DEFAULT_START = '2026-01-09T12:00:00.000Z';
const DEFAULT_END = '2026-02-09T12:00:00.000Z';
const DEFAULT_LOCATION_ID = 227101;
const DEFAULT_LOCATION_NAME = 'Taylor House';

const getActorCaseKey = (record: Pick<WorkAllocationAccessScenarioRecord, 'actorId' | 'caseId'>) =>
  `${record.actorId}::${record.caseId}`;

const uniqueBy = <T, TKey>(items: T[], selector: (item: T) => TKey): T[] => {
  const seen = new Set<TKey>();

  return items.filter((item) => {
    const key = selector(item);

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
};

const splitActorName = (fullName: string): { firstName: string; lastName: string } => {
  const [firstName = fullName, ...rest] = fullName.trim().split(/\s+/);
  return {
    firstName,
    lastName: rest.join(' ') || 'User',
  };
};

const getAccessLabel = (record: WorkAllocationAccessScenarioRecord): string => {
  if (record.myAccessLabel) {
    return record.myAccessLabel;
  }

  switch (record.grantType) {
    case 'CHALLENGED':
      return 'Challenged access granted';
    case 'SPECIFIC':
      return 'Specific access granted';
    case 'STANDARD':
      return 'Standard access';
    case 'EXCLUDED':
      return 'Excluded';
  }
};

const getMyAccessRole = (record: WorkAllocationAccessScenarioRecord): MyAccessCaseMock['role'] => {
  if (record.myAccessRole) {
    return record.myAccessRole;
  }

  switch (record.grantType) {
    case 'CHALLENGED':
      return 'challenged-access-legal-ops';
    case 'SPECIFIC':
      return 'specific-access-granted';
    case 'STANDARD':
      return 'specific-access-granted';
    case 'EXCLUDED':
      return 'specific-access-denied';
  }
};

const getExclusionKeys = (records: WorkAllocationAccessScenarioRecord[]): Set<string> =>
  new Set(records.filter((record) => record.grantType === 'EXCLUDED').map(getActorCaseKey));

const getActiveAccessRecords = (records: WorkAllocationAccessScenarioRecord[]): WorkAllocationAccessScenarioRecord[] => {
  const excludedKeys = getExclusionKeys(records);

  return records.filter((record) => record.grantType !== 'EXCLUDED' && !excludedKeys.has(getActorCaseKey(record)));
};

const getCaseworkersForScenario = (records: WorkAllocationAccessScenarioRecord[]): ScenarioCaseworker[] =>
  uniqueBy(
    records.filter((record) => record.roleCategory !== 'JUDICIAL'),
    (record) => record.actorId
  ).map((record) => {
    const { firstName, lastName } = splitActorName(record.actorName);

    return {
      email: record.actorEmail,
      firstName,
      idamId: record.actorId,
      lastName,
      location: {
        id: record.locationId ?? DEFAULT_LOCATION_ID,
        locationName: record.locationName ?? DEFAULT_LOCATION_NAME,
      },
      roleCategory: record.roleCategory,
      service: record.jurisdiction,
    };
  });

const getJudicialUsersForScenario = (records: WorkAllocationAccessScenarioRecord[]): ScenarioJudicialUser[] =>
  uniqueBy(
    records.filter((record) => record.roleCategory === 'JUDICIAL'),
    (record) => record.actorId
  ).map((record) => {
    const { lastName } = splitActorName(record.actorName);

    return {
      appointments: [],
      known_as: record.actorName,
      full_name: record.actorName,
      surname: lastName,
      sidam_id: record.actorId,
      idam_id: record.actorId,
      email_id: record.actorEmail,
    };
  });

const toCaseRole = (record: WorkAllocationAccessScenarioRecord): ScenarioCaseRole => ({
  name: record.roleCategory === 'JUDICIAL' ? '' : record.actorName,
  roleCategory: record.roleCategory,
  roleName: record.roleName,
  location: record.locationName ?? DEFAULT_LOCATION_NAME,
  start: record.start ?? DEFAULT_START,
  end: record.end ?? DEFAULT_END,
  id: record.assignmentId,
  actorId: record.actorId,
  email: record.roleCategory === 'JUDICIAL' ? '' : record.actorEmail,
  created: record.created ?? DEFAULT_CREATED,
  notes: record.notes,
});

const toRoleExclusion = (record: WorkAllocationAccessScenarioRecord): ScenarioRoleExclusion => ({
  actorId: record.actorId,
  id: record.assignmentId,
  type: 'CASE',
  name: record.roleCategory === 'JUDICIAL' ? '' : record.actorName,
  userType: record.roleCategory,
  notes: record.notes ?? 'Excluded from the case.',
  added: record.created ?? DEFAULT_CREATED,
  email: record.roleCategory === 'JUDICIAL' ? undefined : record.actorEmail,
});

export function queryWorkAllocationAccessByUserAndEntity(
  records: WorkAllocationAccessScenarioRecord[],
  query: { actorId: string; caseId: string }
): UserEntityAccessDecision {
  const responsibilities = getActiveAccessRecords(records)
    .filter((record) => record.actorId === query.actorId && record.caseId === query.caseId)
    .map((record) => ({
      assignmentId: record.assignmentId,
      roleName: record.roleName,
      roleCategory: record.roleCategory,
      grantType: record.grantType,
    })) as UserEntityAccessDecision['responsibilities'];

  const exclusions = records
    .filter((record) => record.grantType === 'EXCLUDED' && record.actorId === query.actorId && record.caseId === query.caseId)
    .map((record) => ({
      assignmentId: record.assignmentId,
      notes: record.notes ?? 'Excluded from the case.',
      grantType: 'EXCLUDED' as const,
    }));

  return {
    actorId: query.actorId,
    caseId: query.caseId,
    hasAccess: responsibilities.length > 0,
    responsibilities,
    exclusions,
  };
}

export function buildMyAccessResponseFromScenario(
  records: WorkAllocationAccessScenarioRecord[],
  actorId: string
): { cases: MyAccessCaseMock[]; total_records: number } {
  const cases = getActiveAccessRecords(records)
    .filter((record) => record.actorId === actorId)
    .map((record) =>
      buildMyAccessCaseMock({
        id: record.assignmentId,
        case_id: record.caseId,
        case_name: record.caseName,
        case_category: record.caseCategory,
        case_type: record.caseTypeId,
        jurisdiction: record.jurisdiction,
        jurisdictionId: record.jurisdictionId ?? record.jurisdiction,
        expectedServiceLabel: record.serviceLabel ?? record.jurisdiction,
        dateSubmitted: formatUiDate(record.created ?? DEFAULT_CREATED),
        access: getAccessLabel(record),
        startDate: formatUiDate(record.start ?? DEFAULT_START),
        endDate: formatUiDate(record.end ?? DEFAULT_END),
        role: getMyAccessRole(record),
        hasAccess: record.hasAccess ?? true,
        isNew: record.isNew ?? false,
      })
    );

  return {
    cases,
    total_records: cases.length,
  };
}

export function buildEntityToUsersAccessView(
  records: WorkAllocationAccessScenarioRecord[],
  caseId: string
): {
  roles: ScenarioCaseRole[];
  exclusions: ScenarioRoleExclusion[];
  caseworkers: ScenarioCaseworker[];
  judicialUsers: ScenarioJudicialUser[];
} {
  const caseRecords = records.filter((record) => record.caseId === caseId);
  const activeRoles = getActiveAccessRecords(caseRecords).map(toCaseRole);
  const exclusions = caseRecords.filter((record) => record.grantType === 'EXCLUDED').map(toRoleExclusion);

  return {
    roles: activeRoles,
    exclusions,
    caseworkers: getCaseworkersForScenario(caseRecords),
    judicialUsers: getJudicialUsersForScenario(caseRecords),
  };
}

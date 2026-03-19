import { faker } from '@faker-js/faker';
import { formatUiDate } from '../utils/tableUtils';

const toMiddayUtcIso = (date: string): string => {
  const stableDate = new Date(date);
  stableDate.setUTCHours(12, 0, 0, 0);
  return stableDate.toISOString();
};

export type MyAccessCaseMock = {
  id: string;
  case_id: string;
  case_name: string;
  case_category: string;
  case_type: string;
  jurisdiction: string;
  jurisdictionId: string;
  expectedServiceLabel: string;
  dateSubmitted: string;
  access: string;
  startDate: string;
  endDate: string;
  role: string;
  hasAccess: boolean;
  isNew: boolean;
  role_category?: string;
  requestDate?: string;
  reviewer?: string;
  reviewerRoleCategory?: string;
  specificAccessReason?: string;
  infoRequired?: string;
  infoRequiredComment?: string;
};

const myAccessStateDefinitions = [
  { role: 'challenged-access-requested', access: 'Challenged', hasAccess: false, isNew: true, includeDates: false },
  { role: 'challenged-access-pending', access: 'Challenged access pending', hasAccess: false, isNew: true, includeDates: false },
  {
    role: 'challenged-access-legal-ops',
    access: 'Challenged access granted',
    hasAccess: true,
    isNew: false,
    includeDates: false,
  },
  { role: 'specific-access-requested', access: 'Specific', hasAccess: false, isNew: true, includeDates: false },
  { role: 'specific-access-approved', access: 'Specific access approved', hasAccess: true, isNew: false, includeDates: true },
  { role: 'specific-access-granted', access: 'Specific access granted', hasAccess: true, isNew: false, includeDates: true },
  { role: 'specific-access-legal-ops', access: 'Specific access granted', hasAccess: true, isNew: false, includeDates: true },
  { role: 'specific-access-denied', access: 'Specific access denied', hasAccess: false, isNew: true, includeDates: false },
] as const;

type MyAccessStateDefinition = (typeof myAccessStateDefinitions)[number];

export const getMyAccessStateDefinition = (role?: string): MyAccessStateDefinition => {
  if (role) {
    const matchingDefinition = myAccessStateDefinitions.find((definition) => definition.role === role);
    if (matchingDefinition) {
      return matchingDefinition;
    }
  }

  return faker.helpers.arrayElement([...myAccessStateDefinitions]);
};

export const myAccessRoleValues = myAccessStateDefinitions.map((definition) => definition.role);
export const myAccessDisplayValues = [...new Set(myAccessStateDefinitions.map((definition) => definition.access))];

export const buildMyAccessCaseMock = (overrides: Partial<MyAccessCaseMock> = {}): MyAccessCaseMock => {
  const serviceLabelByJurisdiction: Record<string, string> = {
    IA: 'Immigration & Asylum',
    SSCS: 'Social security and child support',
    Other: 'Other',
  };

  const jurisdiction = overrides.jurisdiction ?? faker.helpers.arrayElement(['IA', 'SSCS', 'Other']);
  const caseType = overrides.case_type ?? 'Asylum';
  const caseId = overrides.case_id ?? faker.string.numeric(16);
  const submittedDate = overrides.dateSubmitted ?? formatUiDate(toMiddayUtcIso(faker.date.recent({ days: 45 }).toISOString()));
  const stateDefinition = getMyAccessStateDefinition(overrides.role);
  const role = overrides.role ?? stateDefinition.role;
  const startDate =
    overrides.startDate ??
    (stateDefinition.includeDates ? formatUiDate(toMiddayUtcIso(faker.date.soon({ days: 14 }).toISOString())) : '');
  const endDate =
    overrides.endDate ??
    (stateDefinition.includeDates ? formatUiDate(toMiddayUtcIso(faker.date.soon({ days: 60 }).toISOString())) : '');

  return {
    id: overrides.id ?? faker.string.uuid(),
    case_id: caseId,
    case_name: overrides.case_name ?? faker.company.name(),
    case_category: overrides.case_category ?? faker.helpers.arrayElement(['Protection', 'Human rights', 'EUSS']),
    case_type: caseType,
    jurisdiction,
    jurisdictionId: overrides.jurisdictionId ?? jurisdiction,
    expectedServiceLabel: overrides.expectedServiceLabel ?? serviceLabelByJurisdiction[jurisdiction] ?? jurisdiction,
    dateSubmitted: submittedDate,
    access: overrides.access ?? stateDefinition.access,
    startDate,
    endDate,
    role,
    hasAccess: overrides.hasAccess ?? stateDefinition.hasAccess,
    isNew: overrides.isNew ?? stateDefinition.isNew,
    role_category: overrides.role_category,
    requestDate: overrides.requestDate,
    reviewer: overrides.reviewer,
    reviewerRoleCategory: overrides.reviewerRoleCategory,
    specificAccessReason: overrides.specificAccessReason,
    infoRequired: overrides.infoRequired,
    infoRequiredComment: overrides.infoRequiredComment,
  };
};

export const buildMyAccessCases = (
  count: number,
  overridesFactory?: (index: number) => Partial<MyAccessCaseMock>
): { cases: MyAccessCaseMock[]; total_records: number } => {
  const cases = Array.from({ length: count }, (_, index) => {
    const overrides = overridesFactory ? overridesFactory(index) : {};
    return buildMyAccessCaseMock({
      case_name: overrides.case_name ?? `${faker.company.name()} v ${faker.person.lastName()}`,
      ...overrides,
    });
  });

  return {
    cases,
    total_records: cases.length,
  };
};

export const buildMyAccessMock = (): { cases: MyAccessCaseMock[]; total_records: number } => {
  const cases: MyAccessCaseMock[] = [
    buildMyAccessCaseMock({
      case_name: 'Access Case 1',
      case_category: 'Protection',
      jurisdiction: 'IA',
      access: 'Challenged',
      role: 'challenged-access-requested',
      requestDate: formatUiDate(toMiddayUtcIso('2026-01-08T00:00:00.000Z')),
    }),
    buildMyAccessCaseMock({
      case_name: 'Access Case 2',
      case_category: 'Test case category label',
      jurisdiction: 'SSCS',
      access: 'Challenged access pending',
      role: 'challenged-access-pending',
      requestDate: formatUiDate(toMiddayUtcIso('2026-01-09T00:00:00.000Z')),
    }),
    buildMyAccessCaseMock({
      case_name: 'Access Case 3',
      case_category: 'Human rights',
      jurisdiction: 'IA',
      access: 'Challenged access granted',
      role: 'challenged-access-legal-ops',
    }),
    buildMyAccessCaseMock({
      case_name: 'Access Case 4',
      jurisdiction: 'IA',
      access: 'Specific',
      role: 'specific-access-requested',
      requestDate: formatUiDate(toMiddayUtcIso('2026-01-10T00:00:00.000Z')),
    }),
    buildMyAccessCaseMock({
      case_name: 'Access Case 5',
      jurisdiction: 'IA',
      access: 'Specific access approved',
      startDate: '10 January 2026',
      endDate: '16 February 2026',
      role: 'specific-access-approved',
    }),
    buildMyAccessCaseMock({
      case_name: 'Access Case 6',
      jurisdiction: 'SSCS',
      access: 'Specific access granted',
      startDate: '21 January 2026',
      endDate: '28 February 2026',
      role: 'specific-access-granted',
    }),
    buildMyAccessCaseMock({
      case_name: 'Access Case 7',
      jurisdiction: 'SSCS',
      access: 'Specific access granted',
      startDate: '21 January 2026',
      endDate: '28 February 2026',
      role: 'specific-access-legal-ops',
    }),
    buildMyAccessCaseMock({
      case_name: 'Access Case 8',
      jurisdiction: 'IA',
      access: 'Specific access denied',
      role: 'specific-access-denied',
      role_category: 'LEGAL_OPERATIONS',
      requestDate: formatUiDate(toMiddayUtcIso('2026-01-10T00:00:00.000Z')),
      reviewer: 'Case Allocator',
      reviewerRoleCategory: 'LEGAL_OPERATIONS',
      specificAccessReason: 'Additional access required to review the case.',
      infoRequired: 'Please provide supporting details.',
      infoRequiredComment: 'Need confirmation from the reviewing team.',
    }),
  ];

  return {
    cases,
    total_records: cases.length,
  };
};

export const buildSingleDeniedMyAccessMock = (): { cases: MyAccessCaseMock[]; total_records: number } => {
  const deniedCase = buildMyAccessMock().cases.find((item) => item.role === 'specific-access-denied');

  if (!deniedCase) {
    throw new Error('Expected a specific-access-denied case in the My Access mock.');
  }

  return {
    cases: [deniedCase],
    total_records: 1,
  };
};

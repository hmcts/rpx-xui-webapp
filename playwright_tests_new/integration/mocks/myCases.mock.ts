import { faker } from '@faker-js/faker';

const toMiddayUtcIso = (date: string): string => {
  const stableDate = new Date(date);
  stableDate.setUTCHours(12, 0, 0, 0);
  return stableDate.toISOString();
};

export type MyCaseMock = {
  id: string;
  case_id: string;
  case_name: string;
  case_category: string;
  case_type: string;
  jurisdiction: string;
  jurisdictionId: string;
  expectedServiceLabel: string;
  startDate: string;
  endDate: string;
  next_hearing_date: string;
  case_role: string;
  role: string;
  role_category: string;
  hasAccess: boolean;
  actions: MyCaseActionMock[];
};

export type MyCaseActionMock = {
  id: string;
  title: string;
};

export type MyCasesResponseMock = {
  cases: MyCaseMock[];
  total_records: number;
  unique_cases: number;
};

export const myCasesAllocatorActions: MyCaseActionMock[] = [
  { id: 'reallocate', title: 'Reallocate' },
  { id: 'remove', title: 'Remove Allocation' },
];

export const myCasesNoActions: MyCaseActionMock[] = [];

const myCaseStateDefinitions = [
  { caseRole: 'lead-judge', role: 'Lead Judge', roleCategory: 'JUDICIAL' },
  { caseRole: 'case-manager', role: 'Case Manager', roleCategory: 'LEGAL_OPERATIONS' },
] as const;

type MyCaseStateDefinition = (typeof myCaseStateDefinitions)[number];

export const getMyCaseStateDefinition = (caseRole?: string): MyCaseStateDefinition => {
  if (caseRole) {
    const matchingDefinition = myCaseStateDefinitions.find((definition) => definition.caseRole === caseRole);
    if (matchingDefinition) {
      return matchingDefinition;
    }
  }

  return faker.helpers.arrayElement([...myCaseStateDefinitions]);
};

export const myCaseRoleValues = myCaseStateDefinitions.map((definition) => definition.caseRole);
export const myCaseDisplayValues = [...new Set(myCaseStateDefinitions.map((definition) => definition.role))];

export const buildMyCaseMock = (overrides: Partial<MyCaseMock> = {}): MyCaseMock => {
  const serviceLabelByJurisdiction: Record<string, string> = {
    IA: 'Immigration & Asylum',
    SSCS: 'Social security and child support',
    Other: 'Other',
  };

  const jurisdiction = overrides.jurisdiction ?? faker.helpers.arrayElement(['IA', 'SSCS', 'Other']);
  const caseType = overrides.case_type ?? 'Asylum';
  const caseId = overrides.case_id ?? faker.string.numeric(16);
  const stateDefinition = getMyCaseStateDefinition(overrides.case_role);

  return {
    id: overrides.id ?? faker.string.uuid(),
    case_id: caseId,
    case_name: overrides.case_name ?? `${faker.company.name()} v ${faker.person.lastName()}`,
    case_category: overrides.case_category ?? faker.helpers.arrayElement(['Protection', 'Human rights', 'EUSS']),
    case_type: caseType,
    jurisdiction,
    jurisdictionId: overrides.jurisdictionId ?? jurisdiction,
    expectedServiceLabel: overrides.expectedServiceLabel ?? serviceLabelByJurisdiction[jurisdiction] ?? jurisdiction,
    startDate: overrides.startDate ?? toMiddayUtcIso(faker.date.recent({ days: 45 }).toISOString()),
    endDate: overrides.endDate ?? toMiddayUtcIso(faker.date.soon({ days: 60 }).toISOString()),
    next_hearing_date: overrides.next_hearing_date ?? toMiddayUtcIso(faker.date.soon({ days: 21 }).toISOString()),
    case_role: overrides.case_role ?? stateDefinition.caseRole,
    role: overrides.role ?? stateDefinition.role,
    role_category: overrides.role_category ?? stateDefinition.roleCategory,
    hasAccess: overrides.hasAccess ?? true,
    actions: overrides.actions ?? [...myCasesNoActions],
  };
};

export const buildMyCases = (
  count: number,
  overridesFactory?: (index: number) => Partial<MyCaseMock>,
  uniqueCasesCount?: number
): MyCasesResponseMock => {
  const cases = Array.from({ length: count }, (_, index) => {
    const overrides = overridesFactory ? overridesFactory(index) : {};
    return buildMyCaseMock({
      case_name: overrides.case_name ?? `${faker.company.name()} v ${faker.person.lastName()}`,
      ...overrides,
    });
  });

  return {
    cases,
    total_records: cases.length,
    unique_cases: uniqueCasesCount ?? cases.length,
  };
};

export const buildMyCasesMock = (uniqueCasesCount: number = 2): MyCasesResponseMock => {
  const cases: MyCaseMock[] = [
    buildMyCaseMock({
      id: 'allocation-1',
      case_id: '1234567812345670',
      case_name: 'Jo Fly 1',
      case_category: 'Protection',
      case_type: 'Asylum',
      jurisdiction: 'IA',
      jurisdictionId: 'IA',
      expectedServiceLabel: 'Immigration & Asylum',
      startDate: toMiddayUtcIso('2026-01-10T00:00:00.000Z'),
      endDate: toMiddayUtcIso('2026-02-16T00:00:00.000Z'),
      next_hearing_date: toMiddayUtcIso('2026-01-20T00:00:00.000Z'),
      case_role: 'lead-judge',
      role: 'Lead Judge',
      role_category: 'JUDICIAL',
      hasAccess: true,
      actions: myCasesAllocatorActions,
    }),
    buildMyCaseMock({
      id: 'allocation-2',
      case_id: '1234567812345671',
      case_name: 'Jo Fly 2',
      case_category: 'Human rights',
      case_type: 'Asylum',
      jurisdiction: 'SSCS',
      jurisdictionId: 'SSCS',
      expectedServiceLabel: 'Social security and child support',
      startDate: toMiddayUtcIso('2026-01-12T00:00:00.000Z'),
      endDate: toMiddayUtcIso('2026-02-18T00:00:00.000Z'),
      next_hearing_date: toMiddayUtcIso('2026-01-20T00:00:00.000Z'),
      case_role: 'case-manager',
      role: 'Case Manager',
      role_category: 'LEGAL_OPERATIONS',
      hasAccess: true,
      actions: myCasesNoActions,
    }),
  ];

  return {
    cases,
    total_records: cases.length,
    unique_cases: uniqueCasesCount,
  };
};

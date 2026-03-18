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
  actions: unknown[];
};

export const buildMyCasesMock = (): { cases: MyCaseMock[]; total_records: number } => {
  const cases: MyCaseMock[] = [
    {
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
      actions: [],
    },
    {
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
      actions: [],
    },
  ];

  return {
    cases,
    total_records: cases.length,
  };
};

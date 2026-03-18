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

export const buildMyAccessMock = (): { cases: MyAccessCaseMock[]; total_records: number } => {
  const cases: MyAccessCaseMock[] = [
    {
      id: 'access-1',
      case_id: '2234567812345670',
      case_name: 'Access Case 1',
      case_category: 'Protection',
      case_type: 'Asylum',
      jurisdiction: 'IA',
      jurisdictionId: 'IA',
      expectedServiceLabel: 'Immigration & Asylum',
      dateSubmitted: toMiddayUtcIso('2026-01-15T00:00:00.000Z'),
      access: 'Specific access approved',
      startDate: '10 January 2026',
      endDate: '16 February 2026',
      role: 'specific-access-approved',
      hasAccess: true,
      isNew: false,
    },
    {
      id: 'access-2',
      case_id: '2234567812345671',
      case_name: 'Access Case 2',
      case_category: 'Test case category label',
      case_type: 'Asylum',
      jurisdiction: 'SSCS',
      jurisdictionId: 'SSCS',
      expectedServiceLabel: 'Social security and child support',
      dateSubmitted: toMiddayUtcIso('2026-01-18T00:00:00.000Z'),
      access: 'Challenged access pending',
      startDate: 'Pending',
      endDate: '',
      role: 'challenged-access-pending',
      hasAccess: true,
      isNew: true,
    },
    {
      id: 'access-3',
      case_id: '2234567812345672',
      case_name: 'Access Case 3',
      case_category: 'Human rights',
      case_type: 'Asylum',
      jurisdiction: 'IA',
      jurisdictionId: 'IA',
      expectedServiceLabel: 'Immigration & Asylum',
      dateSubmitted: toMiddayUtcIso('2026-01-20T00:00:00.000Z'),
      access: 'Challenged access granted',
      startDate: '20 January 2026',
      endDate: '',
      role: 'challenged-access-legal-ops',
      hasAccess: true,
      isNew: true,
    },
    {
      id: 'access-4',
      case_id: '2234567812345673',
      case_name: 'Access Case 4',
      case_category: 'Protection',
      case_type: 'Asylum',
      jurisdiction: 'SSCS',
      jurisdictionId: 'SSCS',
      expectedServiceLabel: 'Social security and child support',
      dateSubmitted: toMiddayUtcIso('2026-01-21T00:00:00.000Z'),
      access: 'Specific access granted',
      startDate: '21 January 2026',
      endDate: '28 February 2026',
      role: 'specific-access-legal-ops',
      hasAccess: true,
      isNew: true,
    },
    {
      id: 'access-5',
      case_id: '2234567812345270',
      case_name: 'Access Case 5',
      case_category: 'Protection',
      case_type: 'Asylum',
      jurisdiction: 'IA',
      jurisdictionId: 'IA',
      expectedServiceLabel: 'Immigration & Asylum',
      dateSubmitted: toMiddayUtcIso('2026-01-15T00:00:00.000Z'),
      access: 'Specific access denied',
      startDate: 'Pending',
      endDate: 'Pending',
      role: 'specific-access-denied',
      role_category: 'LEGAL_OPERATIONS',
      requestDate: toMiddayUtcIso('2026-01-10T00:00:00.000Z'),
      reviewer: 'Case Allocator',
      reviewerRoleCategory: 'LEGAL_OPERATIONS',
      specificAccessReason: 'Additional access required to review the case.',
      infoRequired: 'Please provide supporting details.',
      infoRequiredComment: 'Need confirmation from the reviewing team.',
      hasAccess: false,
      isNew: true,
    },
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

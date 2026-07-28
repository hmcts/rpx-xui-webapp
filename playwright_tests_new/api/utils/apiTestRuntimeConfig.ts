type TestEnvironment = 'aat' | 'demo';

type UserCredentials = {
  e: string;
  sec: string;
};

function resolveBaseUrl(value?: string): string {
  const normalized = value?.trim();
  return normalized && normalized.length > 0 ? normalized : 'https://manage-case.aat.platform.hmcts.net/';
}

function resolveTestEnv(value?: string, baseUrl?: string): TestEnvironment {
  const normalized = value?.trim().toLowerCase();
  if (normalized?.includes('demo')) {
    return 'demo';
  }
  if (normalized?.includes('aat')) {
    return 'aat';
  }

  return (baseUrl ?? '').toLowerCase().includes('.demo.') ? 'demo' : 'aat';
}

function resolveCredential(...candidates: Array<string | undefined>): string | undefined {
  return candidates.map((candidate) => candidate?.trim()).find((candidate): candidate is string => Boolean(candidate));
}

function resolveRequiredUser(
  fallbackUsername: string,
  fallbackPassword: string,
  usernameCandidates: Array<string | undefined>,
  passwordCandidates: Array<string | undefined>
): UserCredentials {
  return {
    e: resolveCredential(...usernameCandidates) ?? fallbackUsername,
    sec: resolveCredential(...passwordCandidates) ?? fallbackPassword,
  };
}

function resolveOptionalUser(
  usernameCandidates: Array<string | undefined>,
  passwordCandidates: Array<string | undefined>
): UserCredentials | undefined {
  const username = resolveCredential(...usernameCandidates);
  const password = resolveCredential(...passwordCandidates);
  if (!username || !password) {
    return undefined;
  }

  return { e: username, sec: password };
}

const baseUrl = resolveBaseUrl(process.env.TEST_URL);
const testEnv = resolveTestEnv(process.env.TEST_ENV, baseUrl);

const sharedUiConfigKeys = [
  'clientId',
  'headerConfig',
  'hearingJurisdictionConfig',
  'idamWeb',
  'launchDarklyClientId',
  'oAuthCallback',
  'oidcEnabled',
  'paymentReturnUrl',
  'protocol',
  'ccdGatewayUrl',
  'substantiveEnabled',
  'accessManagementEnabled',
  'judicialBookingApi',
  'waWorkflowApi',
] as const;

const solicitorUsername = resolveCredential(
  process.env.SOLICITOR_USERNAME,
  process.env.DIVORCE_SOLICITOR_USERNAME,
  process.env.WA_SOLICITOR_USERNAME
);
const solicitorPassword = resolveCredential(
  process.env.SOLICITOR_PASSWORD,
  process.env.DIVORCE_SOLICITOR_PASSWORD,
  process.env.WA_SOLICITOR_PASSWORD
);

const users = {
  aat: {
    solicitor: resolveRequiredUser('solicitor@example.test', 'not-configured', [solicitorUsername], [solicitorPassword]),
    waSolicitor: resolveRequiredUser(
      'wa.solicitor@example.test',
      'not-configured',
      [process.env.WA_SOLICITOR_USERNAME, process.env.SOLICITOR_USERNAME, process.env.DIVORCE_SOLICITOR_USERNAME],
      [process.env.WA_SOLICITOR_PASSWORD, process.env.SOLICITOR_PASSWORD, process.env.DIVORCE_SOLICITOR_PASSWORD]
    ),
    caseOfficer_r1: resolveOptionalUser(
      [process.env.PW_IAC_CASEOFFICER_R1_EMAIL, process.env.IAC_CASEOFFICER_R1_USERNAME],
      [process.env.PW_IAC_CASEOFFICER_R1_PASSWORD, process.env.IAC_CASEOFFICER_R1_PASSWORD]
    ),
    caseOfficer_r2: resolveOptionalUser(
      [process.env.PW_IAC_CASEOFFICER_R2_EMAIL, process.env.IAC_CASEOFFICER_R2_USERNAME],
      [process.env.PW_IAC_CASEOFFICER_R2_PASSWORD, process.env.IAC_CASEOFFICER_R2_PASSWORD]
    ),
  },
  demo: {
    solicitor: resolveRequiredUser('solicitor@example.test', 'not-configured', [solicitorUsername], [solicitorPassword]),
    waSolicitor: resolveRequiredUser(
      'wa.solicitor@example.test',
      'not-configured',
      [process.env.WA_SOLICITOR_USERNAME, process.env.SOLICITOR_USERNAME, process.env.DIVORCE_SOLICITOR_USERNAME],
      [process.env.WA_SOLICITOR_PASSWORD, process.env.SOLICITOR_PASSWORD, process.env.DIVORCE_SOLICITOR_PASSWORD]
    ),
    caseOfficer_r1: resolveOptionalUser(
      [process.env.PW_IAC_CASEOFFICER_R1_EMAIL, process.env.IAC_CASEOFFICER_R1_USERNAME],
      [process.env.PW_IAC_CASEOFFICER_R1_PASSWORD, process.env.IAC_CASEOFFICER_R1_PASSWORD]
    ),
    caseOfficer_r2: resolveOptionalUser(
      [process.env.PW_IAC_CASEOFFICER_R2_EMAIL, process.env.IAC_CASEOFFICER_R2_USERNAME],
      [process.env.PW_IAC_CASEOFFICER_R2_PASSWORD, process.env.IAC_CASEOFFICER_R2_PASSWORD]
    ),
  },
};

export const config = {
  baseUrl,
  testEnv,
  jurisdictions: {
    aat: [
      { id: 'DIVORCE', caseTypeIds: ['xuiTestCaseType'] },
      { id: 'IA', caseTypeIds: [] },
      { id: 'PROBATE', caseTypeIds: [] },
    ],
    demo: [
      { id: 'DIVORCE', caseTypeIds: ['DIVORCE', 'FinancialRemedyMVP2', 'FinancialRemedyMVP2'] },
      { id: 'IA', caseTypeIds: ['Asylum'] },
      { id: 'PROBATE', caseTypeIds: ['GrantOfRepresentation'] },
    ],
  },
  jurisdictionNames: {
    aat: ['Family Divorce', 'Public Law', 'Immigration & Asylum', 'Manage probate application'],
    demo: ['Family Divorce - v104-26.1', 'Public Law', 'Immigration & Asylum'],
  },
  em: {
    aat: { docId: '249cfa9e-622c-4877-a588-e9daa3fe10d8' },
    demo: { docId: '005ed16f-be03-4620-a8ee-9bc90635f6f2' },
  },
  users,
  configurationUi: {
    aat: [...sharedUiConfigKeys],
    demo: [...sharedUiConfigKeys],
  },
  workallocation: {
    aat: {
      locationId: '698118',
      judgeUser: {
        email: '330085EMP-@ejudiciary.net',
        id: '519e0c40-d30e-4f42-8a4c-2c79838f0e4e',
        name: 'Tom Cruz',
      },
      legalOpsUser: {
        email: '330085EMP-@ejudiciary.net',
        id: '519e0c40-d30e-4f42-8a4c-2c79838f0e4e',
        name: 'Tom Cruz',
      },
      iaCaseIds: ['1546883526751282'],
    },
    demo: {
      locationId: '765324',
      judgeUser: {
        email: '330085EMP-@ejudiciary.net',
        id: '519e0c40-d30e-4f42-8a4c-2c79838f0e4e',
        name: 'Tom Cruz',
      },
      iaCaseIds: ['1547458486131483'],
    },
  },
} as const;

export const __test__ = {
  resolveBaseUrl,
  resolveTestEnv,
  resolveCredential,
  resolveOptionalUser,
};

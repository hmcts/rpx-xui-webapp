export function resolveBaseUrl(value?: string): string {
  return value ? value : 'https://manage-case.aat.platform.hmcts.net/';
}

export function resolveTestEnv(value?: string): string {
  return value !== undefined && (value.includes('aat') || value.includes('demo')) ? value : 'aat';
}

export const config = {
  baseUrl: resolveBaseUrl(process.env.TEST_URL),
  jurisdictions: {
    aat: [
      { id: 'DIVORCE', caseTypeIds: ['xuiTestCaseType'] },
      { id: 'IA', caseTypeIds: [] },
      { id: 'PROBATE', caseTypeIds: [] }
    ],
    demo: [
      { id: 'DIVORCE', caseTypeIds: ['DIVORCE', 'FinancialRemedyMVP2', 'FinancialRemedyMVP2'] },
      { id: 'IA', caseTypeIds: ['Asylum'] },
      { id: 'PROBATE', caseTypeIds: ['GrantOfRepresentation'] }
    ]
  },
  jurisdictionNames: {
    aat: ['Family Divorce', 'Public Law', 'Immigration & Asylum', 'Manage probate application'],
    demo: ['Family Divorce - v104-26.1', 'Public Law', 'Immigration & Asylum']
  },
  em: {
    aat: { docId: '249cfa9e-622c-4877-a588-e9daa3fe10d8' },
    demo: { docId: '005ed16f-be03-4620-a8ee-9bc90635f6f2' }
  },
  testEnv: resolveTestEnv(process.env.TEST_ENV),
  users: {
    aat: {
      solicitor: { e: 'xui_auto_test_user_solicitor@mailinator.com', sec: 'Monday01' },
      caseOfficer_r1: { e: 'xui_auto_co_r1@justice.gov.uk', sec: 'Welcome01' },
      caseOfficer_r2: { e: 'xui_auto_co_r2@justice.gov.uk', sec: 'Welcome01' }
    },
    demo: {
      solicitor: { e: 'peterxuisuperuser@mailnesia.com', sec: 'Monday01' },
      caseOfficer_r1: { e: 'xui_caseofficer@justice.gov.uk', sec: 'Welcome01' },
      caseOfficer_r2: { e: 'CRD_func_test_demo_user@justice.gov.uk', sec: 'AldgateT0wer' }
    }
  },
  configurationUi: {
    aat: ['clientId', 'headerConfig', 'hearingJurisdictionConfig', 'idamWeb', 'launchDarklyClientId', 'oAuthCallback', 'oidcEnabled', 'paymentReturnUrl', 'protocol', 'ccdGatewayUrl', 'substantiveEnabled', 'accessManagementEnabled', 'judicialBookingApi', 'waWorkflowApi'],
    demo: ['clientId', 'headerConfig', 'hearingJurisdictionConfig', 'idamWeb', 'launchDarklyClientId', 'oAuthCallback', 'oidcEnabled', 'paymentReturnUrl', 'protocol', 'ccdGatewayUrl', 'substantiveEnabled', 'accessManagementEnabled', 'judicialBookingApi', 'waWorkflowApi']
  },
  workallocation: {
    aat: {
      locationId: '698118',
      judgeUser: {
        email: '330085EMP-@ejudiciary.net',
        id: '519e0c40-d30e-4f42-8a4c-2c79838f0e4e',
        name: 'Tom Cruz'
      },
      legalOpsUser: {
        email: '330085EMP-@ejudiciary.net',
        id: '519e0c40-d30e-4f42-8a4c-2c79838f0e4e',
        name: 'Tom Cruz'
      },
      iaCaseIds: ['1546883526751282']
    },
    demo: {
      locationId: '765324',
      judgeUser: {
        email: '330085EMP-@ejudiciary.net',
        id: '519e0c40-d30e-4f42-8a4c-2c79838f0e4e',
        name: 'Tom Cruz'
      },
      iaCaseIds: ['1547458486131483']
    }
  }
};

export const __test__ = {
  resolveBaseUrl,
  resolveTestEnv
};

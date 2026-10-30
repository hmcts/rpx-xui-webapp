export const prodEnableHearingAmendment = {
  '.+': [
    {
      includeCaseTypes: ['CIVIL'],
      jurisdiction: 'CIVIL',
    },
    {
      includeCaseTypes: ['Asylum', 'Bail'],
      jurisdiction: 'IA',
    },
    {
      includeCaseTypes: ['PCS', '(PCS-)\\d+'],
      jurisdiction: 'PCS',
    },
  ],
};

export const prodHearingJurisdictions = {
  '.+': [
    {
      includeCaseTypes: ['Benefit', 'Benefit_SCSS', 'Benefit-sscs-pr-3575'],
      jurisdiction: 'SSCS',
      roles: ['caseworker-sscs', 'caseworker-sscs-judge'],
    },
    {
      caseType: 'PRLAPPS',
      jurisdiction: 'PRIVATELAW',
      roles: ['caseworker-privatelaw', 'caseworker-privatelaw-courtadmin', 'caseworker-privatelaw-judge'],
    },
    {
      includeCaseTypes: ['Bail', 'Asylum'],
      jurisdiction: 'IA',
      roles: [
        'caseworker-ia-caseofficer',
        'caseworker-ia-judiciary',
        'hmcts-ctsc',
        'hmcts-admin',
        'hmcts-legal-operations',
        'hmcts-judiciary',
        'caseworker-ia-admofficer',
        'caseworker-ia-iacjudge',
      ],
    },
    {
      includeCaseTypes: ['CIVIL'],
      jurisdiction: 'CIVIL',
    },
    {
      includeCaseTypes: ['PCS', '(PCS-)\\d+'],
      jurisdiction: 'PCS',
      roles: ['hmcts-ctsc', 'hmcts-admin', 'hmcts-legal-operations', 'hmcts-judiciary'],
    },
  ],
};

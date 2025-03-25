export const aatEnableHearingAmendments = {
  '.+': [
    {
      includeCaseTypes: [
        'CIVIL',
        '(Civil-|CIVIL-)\\d+'
      ],
      jurisdiction: 'CIVIL'
    }
  ]
};

export const aatHearingJurisdictions = {
  '.+': [
    {
      includeCaseTypes: [
        'Benefit',
        'Benefit_SCSS',
        '(Benefit-|BENEFIT-)\\d+',
        '(sscs-pr-|SSCS-PR-)\\d+'
      ],
      jurisdiction: 'SSCS',
      roles: [
        'caseworker-sscs',
        'caseworker-sscs-judge'
      ]
    },
    {
      caseType: 'PRLAPPS',
      jurisdiction: 'PRIVATELAW',
      roles: [
        'caseworker-privatelaw',
        'caseworker-privatelaw-courtadmin',
        'caseworker-privatelaw-judge'
      ]
    },
    {
      includeCaseTypes: [
        'Bail',
        'Asylum'
      ],
      jurisdiction: 'IA',
      roles: [
        'caseworker-ia-caseofficer',
        'caseworker-ia-judiciary',
        'hmcts-ctsc',
        'hmcts-admin',
        'hmcts-legal-operations',
        'hmcts-judiciary',
        'caseworker-ia-admofficer',
        'caseworker-ia-iacjudge'
      ]
    },
    {
      includeCaseTypes: [
        'CIVIL'
      ],
      jurisdiction: 'CIVIL'
    }
  ]
};

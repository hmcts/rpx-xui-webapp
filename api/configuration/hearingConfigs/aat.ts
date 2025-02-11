export const aatHearingJuristictions = {
  '(4ea7b46b-e9c3-4bdd-861c-3e6376d553a4)|(7527ff4a-8b11-4951-9702-1dd0838c490c)|(c6d836f1-723d-4453-9df0-5344a29d77f7)|(7527ff4a-8b11-4951-9702-1dd0838c490c)': [
    {
      includeCaseTypes: [
        'Benefit',
        'Benefit_SCSS',
        'Benefit-sscs-pr-3575'
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
      caseType: 'Asylum',
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
      caseType: 'Bail',
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
        'GENERALAPPLICATION',
        'CIVIL',
        '(Civil-|CIVIL-)\\d+'
      ],
      jurisdiction: 'CIVIL'
    },
    {
      caseType: 'ET_EnglandWales',
      jurisdiction: 'EMPLOYMENT',
      roles: [
        'caseworker-employment'
      ]
    },
    {
      caseType: 'ET_Scotland',
      jurisdiction: 'EMPLOYMENT',
      roles: [
        'caseworker-employment'
      ]
    }
  ],
  '.+': [
    {
      includeCaseTypes: [
        'Benefit',
        'Benefit_SCSS',
        'Benefit-sscs-pr-3575',
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

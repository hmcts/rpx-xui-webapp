export const testHearingJuristictions = {
  '(1fc2b4d1-8f39-4748-bfcc-a2b82645a8ef)|(83d1b5b4-a2f2-4095-a248-41d7f7de1ea9)|(c07a8179-1910-47ff-b905-1edf6b34810f)|(9e2781e6-4a7a-466a-8056-6e3cfdd24cf0)|(adb6703b-1247-4860-94f7-90a83705a6fe)|(b84c4535-affa-4582-9002-16b227b8b57a)|(c83b57a1-add8-4a5a-9b7b-c51b38ddbf86)|(a90c3b7e-96c4-4798-bbd0-87a02aaf2e12)|(3f6fb609-ddd9-4e78-95cc-68e448e74738)|(7b8e1cc2-a59a-48a1-b251-e262bb3305c6)|(8b5a5db7-9fbb-4c6a-b4f8-071b8b797935)|(3a32c2d0-046b-47dd-b240-cfd72b37fb91)|(baf52798-e92f-4451-990e-34e0a0c8da96)|(adb6703b-1247-4860-94f7-90a83705a6fe)|(edbecbb1-1375-4a55-881a-5797e0b68b64)|(368fde82-7b08-4a26-9895-ad563cef3c23)|(6034d1ef-0788-4253-ab78-e871dd75bd4d)|(4a92008c-8112-4f28-8fc4-ddd3a8af46e7)|(5b378128-c773-488a-9ad3-a68a190b69dc)|(97f5e166-7ae2-4612-a804-1a2fcb8e6006)|(ec974cb1-71f0-4bea-bdb4-605e2891f1a7)|(e88d908b-54ee-408c-bb08-bf8353c4fd09)|(55fb1050-f5a2-42d0-a621-b12db2e29618)|(5aba017e-c4c5-4668-8248-043143442474)|(62272836-8772-43e6-aef0-665ebd6d6319)|(1e0c189d-aca1-4158-9307-d0ca4f9ba791)|(b6b0bd85-b93d-4851-aed0-73764a4481c5)|(595e8552-fb10-4a9f-a696-ca8c9ab768eb)|(717a90a6-df0c-42b0-8f9a-744a37647cd0)|(2c323c10-0fe2-44ae-bfd2-59d2dc2e90fd)|(8f55c43d-0008-4db1-b6c8-d386688cba5b)|(c86978a9-6b16-432b-af45-90516a993856)|(d2937bd0-ec30-418d-a52c-9cb493c5d454)|(558ce724-4a69-4981-8785-ed3ca15d51ea)|(cc22c743-5405-4c5f-b9d9-79777792cf71)|(ae528b8e-8bc1-4d63-8df6-2727936408e3)|(1340cd3a-382f-44cc-ab40-a677f2184b8b)|(620f26bf-ab73-4473-9491-86935996c97a)|(76ee2742-6ede-410b-a211-219f33ec36ef)|(e146d1d4-caeb-4381-a162-b0aaf6882fcc)|(50037aea-8a3a-4a85-a1c5-3a24a103004d)|(610ae240-b840-46cd-bba6-b203ed22d9b2)|(d7fac049-ca0c-42f4-b44e-c63982c98214)|(d6fe9dbc-4b0a-45b2-a14f-e41def216053)|(f6c0816e-8a3d-43a1-9c52-883eded755e9)|(4bc71cfa-db59-4e3f-a270-e5f6e31a3861)|(4cef4b28-7ca8-48d1-b404-1232ba8f2ff5)':[
    {
      includeCaseTypes: [
        'Benefit',
        'Benefit_SCSS'
      ],
      jurisdiction: 'SSCS'
    },
    {
      includeCaseType: [
        'PRLAPPS'
      ],
      jurisdiction: 'PRIVATELAW'
    },
    {
      includeCaseTypes: [
        'GENERALAPPLICATION',
        'CIVIL'
      ],
      jurisdiction: 'CIVIL'
    }
  ],
  '(4ea7b46b-e9c3-4bdd-861c-3e6376d553a4)': [
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
        'Benefit-3704',
        'Benefit-3750',
        'Benefit-3751',
        'Benefit-3744',
        'Benefit-3776',
        'Benefit-3741',
        'Benefit-3828',
        'Benefit-3800',
        'Benefit-3832',
        'Benefit-3799',
        'Benefit-3683',
        'Benefit-3846',
        'Benefit-3850',
        'Benefit-3852',
        'Benefit-3856',
        'Benefit-3860',
        'Benefit-3806',
        'Benefit-3863',
        'Benefit-3866',
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
      includeCaseTypes: [
        'PRLAPPS'
      ],
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
        'GENERALAPPLICATION',
        'CIVIL',
        '(Civil-|CIVIL-)\\d+'
      ],
      jurisdiction: 'CIVIL'
    },
    {
      includeCaseTypes: [
        'ET_EnglandWales',
        'ET_Scotland'
      ],
      jurisdiction: 'EMPLOYMENT',
      roles: [
        'caseworker-employment'
      ]
    }
  ]
};

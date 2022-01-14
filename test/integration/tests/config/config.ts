export  const config =  {
    baseUrl: getBaseUrl(),
    jurisdictions : [
        {
            id: 'DIVORCE',
            caseTypeIds : [
                'DIVORCE',
                'FinancialRemedyMVP2',
                'FinancialRemedyContested'
            ]
        },
        {
            id: 'IA',
            caseTypeIds: [
                'Asylum'
            ]
        },
        {
            id: 'PROBATE',
            caseTypeIds: [
                'GrantOfRepresentation'
            ]
        }
    ],
    em: {
        docId: '249cfa9e-622c-4877-a588-e9daa3fe10d8'
    },
    users : {
        solicitor: 'lukesuperuserxui@mailnesia.com',
        caseOfficer_r1: 'xui_caseofficer@justice.gov.uk',
        caseOfficer_r2: 'xui_auto_co_r2@justice.gov.uk'
    }
};

function getBaseUrl() {
    let baseurl = process.env.TEST_URL ? process.env.TEST_URL : 'https://manage-case.aat.platform.hmcts.net/';

    if (!baseurl.endsWith('/')) {
        baseurl += '/';
    }
    return baseurl;
}

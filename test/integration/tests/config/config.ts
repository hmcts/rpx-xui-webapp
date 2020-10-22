export  const config =  {
    baseUrl: getBaseUrl(),
    jurisdictions : [
        {
            id: 'DIVORCE',
            caseTypeIds : [
                'MyAddressBook',
                'DIVORCE',
                'FinancialRemedyMVP2',
                'FinancialRemedyContested'
            ]
        },
        {
            id: 'PUBLICLAW',
            caseTypeIds: [
                'CARE_SUPERVISION_EPO'
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
    ]
};

function getBaseUrl() {
    let baseurl = process.env.TEST_URL ? process.env.TEST_URL : 'https://manage-case.aat.platform.hmcts.net/';

    if (!baseurl.endsWith('/')) {
        baseurl += '/';
    }
    return baseurl;
}

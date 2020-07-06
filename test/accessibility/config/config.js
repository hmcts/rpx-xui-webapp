const conf = {
    reportPath: "reports/tests/a11y/",
    appName:"EXUI Manage Cases a11y Test Report",
    baseUrl:'https://manage-case.aat.platform.hmcts.net/',
    params:{
        username:'lukesuperuserxui@mailnesia.com',
        password:'Monday01'
    },
    authenticatedUrls: [
        {
            url: 'cases',
            pageElementcss:'ccd-workbasket-filters .heading-h2'
        },
        {
            url: 'cases/case-filter',
            pageElementcss: 'exui-ccd-connector'
        },
        {
            url: 'cases/case-search',
            pageElementcss: '.search-block'
        }

    
    ],
    unauthenticatedUrls: [
        'accessibility',
        'cookies',
        'privacy-policy',
        'get-help'
    ],
    caseCreationPages:[
        { jurisdiction: 'Family Divorce', caseType: 'Divorce case - v115.00', event:'Apply for a divorce' },
        { jurisdiction: 'Family Divorce', caseType: 'Financial Remedy Consented', event: 'Consent Order Application' },
        { jurisdiction: 'Family Divorce', caseType: 'Contested Financial Remedy', event: 'Form A Application' },
        { jurisdiction: 'Manage probate application', caseType: 'Grant of representation', event: 'Apply for probate' }
    ]

}

module.exports = {conf}


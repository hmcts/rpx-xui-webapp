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
        },
        {
            url: 'cases/case-details/1574434783416279',
            pageElementcss : '.tabs'
        }

    
    ],
    unauthenticatedUrls: [
        'accessibility',
        'cookies',
        'privacy-policy',
        'get-help'
    ],

}

module.exports = {conf}


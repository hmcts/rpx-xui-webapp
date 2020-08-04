const PallyActions = require('../helpers/pallyActions');

const baseUrl = 'http://localhost:4200/'; 

const conf = {
    reportPath: "reports/tests/a11y/",
    appName:"EXUI Manage Cases a11y Test Report",
    baseUrl: baseUrl,
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
            url: 'cases/case-share',
            pageElementcss: 'exui-case-share #title-selected-cases'
        },
        {
            url: 'cases/case-share',
            pageElementcss: 'exui-case-share #title-selected-cases',
            actions: () => {
                const actions = [];
                actions.push(...PallyActions.navigateTourl(baseUrl + 'cases/case-share'));
                actions.push(...PallyActions.waitForPageWithCssLocator('exui-case-share #title-selected-cases'));
                actions.push(...PallyActions.clickElement('#accordion-with-summary-sections .govuk-accordion__open-all'));

                actions.push(...PallyActions.clickElement('#accordion-with-summary-sections xuilib-selected-case  .govuk-accordion__section-content a'));
                actions.push(...PallyActions.clickElement('#share-case-nav button'));
                actions.push(...PallyActions.waitForPageWithCssLocator('exui-case-share-confirm #summarySections'));
                return actions;
            }
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


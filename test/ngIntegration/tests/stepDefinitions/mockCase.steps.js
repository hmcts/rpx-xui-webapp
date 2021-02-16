var { defineSupportCode } = require('cucumber');

const MockApp = require('../../../nodeMock/app');

const caseEditPage = require('../pageObjects/ccdCaseEditPages');

const browserUtil = require('../../util/browserUtil');
const nodeAppMockData = require('../../../nodeMock/nodeApp/mockData');
const CucumberReporter = require('../../../e2e/support/reportLogger');

const headerpage = require('../../../e2e/features/pageObjects/headerPage');

const { getTestJurisdiction,getMockJurisdictionWorkbaseketConfig } = require('../../mockData/ccdCaseMock');
const getEventConfig = require('../../mockData/ccdMockEventConfigs');


defineSupportCode(function ({ And, But, Given, Then, When }) {

    Given('I set mock case create config {string}', async function (configReference) {
        const caseConfig = getTestJurisdiction();
        global.scenarioData[configReference] = caseConfig;
        MockApp.onGet('/data/internal/case-types/:jurisdiction/event-triggers/:caseType', (req, res) => { 
            res.send(caseConfig.getCase());
        });
      
    });

    Given('I set MOCK event {string} props', async function(caseConfigReference, dataTable){
        const caseConfig = global.scenarioData[caseConfigReference]; 
        const eventprops = convertDatatablePropsToccdObj(dataTable);
        caseConfig.updateEventProps(eventprops);
    });

    Given('I set mock case workbasket config {string}', async function(workbasketRef){
        const workbasetConfigurator = getMockJurisdictionWorkbaseketConfig();
        global.scenarioData[workbasketRef] = workbasetConfigurator;
        MockApp.onGet('/data/internal/case-types/:jurisdiction/work-basket-inputs', (req, res) => {
            res.send(workbasetConfigurator.getConfig());
        });

    });

    Given('I set MOCK event {string} config with reference {string}', async function(eventId, eventReference){
        const caseConfig = getEventConfig(eventId);
        global.scenarioData[eventReference] = caseConfig;
        MockApp.onGet('/data/internal/case-types/:jurisdiction/event-triggers/:caseType', (req, res) => {
            res.send(caseConfig.getCase());
        });
    });

    Given('I set MOCK event config {string} field {string} properties', async function(eventConfigRef, fieldId, datatable){
        const eventConfig = global.scenarioData[eventConfigRef];
        const fieldProps = convertDatatablePropsToccdObj(datatable); 
        eventConfig.updateFieldProps(fieldId, fieldProps); 
    });


 
});

function convertDatatablePropsToccdObj(datatable){
    const tableRowshash = datatable.rowsHash();
    for (const key in tableRowshash){

        if (tableRowshash[key].toUpperCase() === "YES"){
            tableRowshash[key] = true; 
        } else if (tableRowshash[key].toUpperCase() === "NO"){
            tableRowshash[key] = false; 
        }
    } 
    return tableRowshash;
}

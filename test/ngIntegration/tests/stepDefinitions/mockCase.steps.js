var { defineSupportCode } = require('cucumber');

const MockApp = require('../../../nodeMock/app');

const caseEditPage = require('../pageObjects/ccdCaseEditPages');

const browserUtil = require('../../util/browserUtil');
const nodeAppMockData = require('../../../nodeMock/nodeApp/mockData');
const CucumberReporter = require('../../../e2e/support/reportLogger');
const dummyCaseDetails = require('../../../nodeMock/ccd/caseDetails_data');

const headerpage = require('../../../e2e/features/pageObjects/headerPage');
const workAlloctionMockData = require('../../../nodeMock/workAllocation/mockData');

const { getTestJurisdiction, getMockJurisdictionWorkbaseketConfig, getMockJurisdictionSearchInputConfig } = require('../../mockData/ccdCaseMock');
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

    Given('I set mock case searchinput config {string}', async function(searchInputRef){
        const searchInputConfigurator = getMockJurisdictionSearchInputConfig();
        global.scenarioData[searchInputRef] = searchInputConfigurator;
        MockApp.onGet('/data/internal/case-types/:jurisdiction/search-inputs', (req, res) => {
            res.send(searchInputConfigurator.getConfig());
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

    Given('I set MOCK case details with reference {string}', async function(caseDetailsReference){
       const caseDetails = JSON.parse(JSON.stringify(dummyCaseDetails));
        global.scenarioData[caseDetailsReference] = caseDetails;
        MockApp.onGet('/data/internal/cases/:caseid', (req, res) => {
            res.send(caseDetails);
        });
    });

    Given('I set MOCK case details {string} property {string} as {string}', async function(caseDetailsRef, property, value){
        const caseDetails = global.scenarioData[caseDetailsRef];

        if(property.toLowerCase().includes('jurisdiction')) {
            const field = getCaseDetailsMetadataField(caseDetails,'[JURISDICTION]');
            field.value = value;
        }else {
            throw Error(` metada field ${property} is not recognised or not implemented in test`);
        }
    });

    Given('I set MOCK case roles', async function(caseRolesDatatable){
        const dateTableHashes = caseRolesDatatable.hashes();
        for (const hash of dateTableHashes){
            for(const key of Object.keys(hash)){
                if ((key === 'start' || key === 'end') && hash[key] !== ''){
                    const dateObj = new Date();
                    dateObj.setDate(dateObj.getDate() + parseInt(hash[key]));
                    hash[key] = dateObj.toISOString();
                }
            }
        }
        const caseRoles = workAlloctionMockData.getCaseRoles(dateTableHashes);
        MockApp.onGet('/workallocation2/roles/:caseId', (req, res) => {
            res.send(caseRoles);
        });
    }); 

    Given('I set MOCK case role exclusions', async function (caseRoleExclusionsDatatable) {
        const dateTableHashes = caseRoleExclusionsDatatable.hashes();
        for (const hash of dateTableHashes) {
            for (const key of Object.keys(hash)) {
                if (key === 'added' ) {
                    const dateObj = new Date();
                    dateObj.setDate(dateObj.getDate() + parseInt(hash[key]));
                    hash[key] = dateObj.getTime();
                }
            }
        }
        const caseRoleExclusions = workAlloctionMockData.getCaseExclusions(dateTableHashes);
        MockApp.onGet('/api/role-access/exclusions/get', (req, res) => {
            res.send(caseRoleExclusions);
        });
    });

    Given('I set MOCK case tasks with userDetails from reference {string}', async function (userDetailsRef, caseTasksDatatable) {
        const userDetails = global.scenarioData[userDetailsRef];

        const dateTableHashes = caseTasksDatatable.hashes();
        const tasks = workAlloctionMockData.getCaseTasks(dateTableHashes, userDetails);
        MockApp.onGet('/workallocation2/case/task/:caseid', (req, res) => {
            CucumberReporter.AddJson(tasks);
            res.send(tasks);
        });
    });
});

function getCaseDetailsMetadataField(caseDetails, metadatFieldId){
    const fields = caseDetails.metadataFields;
    let returnField = null;
    for(const field of fields){
        if (field.id === metadatFieldId){
            returnField = field;
            break;
        }
    }
    return returnField;
}

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

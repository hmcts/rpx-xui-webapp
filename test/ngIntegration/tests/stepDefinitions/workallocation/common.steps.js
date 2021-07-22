var { defineSupportCode } = require('cucumber');

const MockApp = require('../../../../nodeMock/app');
const workAllocationMockData = require('../../../../nodeMock/workAllocation/mockData');

const BrowserWaits = require('../../../../e2e/support/customWaits');
const taskListPage = require('../../../../e2e/features/pageObjects/workAllocation/taskListPage');
const taskManagerPage = require('../../../../e2e/features/pageObjects/workAllocation/taskManagerPage');
const taskAssignmentPage = require('../../../../e2e/features/pageObjects/workAllocation/taskAssignmentPage');

const caseDetailsPage = require('../../pageObjects/caseDetailsPage');

const headerPage = require('../../../../e2e/features/pageObjects/headerPage');
const CaseListPage = require('../../../../e2e/features/pageObjects/CaseListPage');
const errorPage = require('../../../../e2e/features/pageObjects/errorPage');

const SoftAssert = require('../../../util/softAssert');
const browserUtil = require('../../../util/browserUtil');
const errorMessageForResponseCode = require('../../../util/errorResonseMessage');


const MockUtil = require('../../../util/mockUtil');
const WAUtil = require('../../workAllocation/utils');
const nodeAppMockData = require('../../../../nodeMock/nodeApp/mockData');
const CucumberReporter = require('../../../../e2e/support/reportLogger');

const headerpage = require('../../../../e2e/features/pageObjects/headerPage');
const taskActionPage = require('../../../../e2e/features/pageObjects/workAllocation/taskActionPage');
const TaskListTable = require('../../../../e2e/features/pageObjects/workAllocation/taskListTable');

const workAllocationDataModel = require("../../../../dataModels/workAllocation");

defineSupportCode(function ({ And, But, Given, Then, When }) {
    const taskListTable = new TaskListTable();
    When('I click task list pagination link {string} and wait for req reference {string} not null', async function (paginationLinktext, reference) {
        
        await BrowserWaits.retryWithActionCallback(async () => {
            await browserUtil.addTextToElementWithCssSelector('tbody tr:nth-of-type(1) .cdk-column-case_category exui-task-field', 'Sort test', true);
            
            await taskListTable.clickPaginationLink(paginationLinktext);
            await BrowserWaits.waitForConditionAsync(async () => {
                const caseCatColVal = await taskListTable.getColumnValueForTaskAt('Case category', 1);
                return !caseCatColVal.includes('Sort test');
            });
            await BrowserWaits.waitForConditionAsync(async () => {
                return global.scenarioData[reference] !== null
            }, 5000);
        });
       
    });


    Given('I set MOCK case workers for release {string}', async function(forRelease,datatable){
        const persons = getPersonResponse(datatable);
        let url = null;
        if (forRelease === "1"){
            MockApp.onGet('workallocation/caseworker', (req,res) => {
                res.send(persons);
            });
        } else if (forRelease === "2"){
            MockApp.onGet('workallocation2/caseworker', (req, res) => {
                res.send(persons);
            });
        } else{
            throw new Error(`Unexpected release identifier "${forRelease}"  passed to setup mock`);
        }

    });

    Then('I validate task table values displayed', async function(datatable){
        const tableRowHashes = datatable.hashes();
        const softAssert= new SoftAssert();
        for (let i = 0; i < tableRowHashes.length; i++){
            const expectRowHash = tableRowHashes[i];
            const rowNum = parseInt(expectRowHash["row"]);

            const hashkeys = Object.keys(expectRowHash);

            for (let j = 0; j < hashkeys.length; j++){
                const columnName = hashkeys[j];
                const expectedValue = expectRowHash[columnName];

                let actualColumnValue = null;
                if (columnName === "row"){
                    continue;
                }else{
                    actualColumnValue = await taskListTable.getColumnValueForTaskAt(columnName, rowNum)
                }

                softAssert.setScenario(`At row ${rowNum} validation of column ${columnName}`);
                await softAssert.assert(async () => expect(actualColumnValue).to.includes(expectedValue));

            }

            
        }
        softAssert.finally();
    });

    function getLocationsResponse(datatable){
        const locationHashes = datatable.hashes();
        const locations = [];
        for (let i = 0; i < locationHashes.length; i++) {
            const locationFromDatatable = locationHashes[i];
            const location = workAllocationDataModel.getLocation();

            const locationInputKeys = Object.keys(locationFromDatatable);
            for (let j = 0; j < locationInputKeys.length; j++) {
                const key = locationInputKeys[j];
                location[key] = locationFromDatatable[key];
            }
            locations.push(location);
           
        }
        return locations;
    }
    
    function getPersonResponse(datatable){
        const personHashes = datatable.hashes();
        const personsData = [];
        for (let i = 0; i < personHashes.length;i++){
            const personFromDatatable = personHashes[i];
            const person = workAllocationDataModel.getCaseWorkerOrperson();
            
            const personInputKeys = Object.keys(personFromDatatable);
            for (let j = 0; j < personInputKeys.length;j++ ){
                const key = personInputKeys[j];
                if (key === "location.id"){
                    person.location.id = personFromDatatable[key]
                } else if (key === "location.locationName"){
                    person.location.locationName = personFromDatatable[key]
                }else{
                    person[key] = personFromDatatable[key];
                }
                
            }
            personsData.push(person);
        }
        return personsData;
    }

});
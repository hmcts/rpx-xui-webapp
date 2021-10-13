var { defineSupportCode } = require('cucumber');


const CucumberReportLogger = require('../../../e2e/support/reportLogger');

var { defineSupportCode } = require('cucumber');

const MockApp = require('../../../nodeMock/app');
const SoftAssert = require('../../../ngIntegration/util/softAssert');
defineSupportCode(function ({ And, But, Given, Then, When }) {

    Given('I setup caselist mock {string}', async function (caselistMockRef) {
        const caseListConfig = new CaseListConfig();
        global.scenarioData[caselistMockRef] = caseListConfig;
       
    });

    Given('I add case field columns to caselist config {string}', async function (caselistMockRef, datatable){
        const caseListConfigGenerator = global.scenarioData[caselistMockRef];
        const caseColumnRowHashes = datatable.hashes();
        
        for (let i = 0; i < caseColumnRowHashes.length; i++){
            caseListConfigGenerator.addCaseField(caseColumnRowHashes[i]);
        }
        
    });

    Given('I add case field type props to caselist config {string}', async function (caselistMockRef ,datatable) {
        const caseListConfigGenerator = global.scenarioData[caselistMockRef];
        const caseFiledTypeRowHashes = datatable.hashes();

        for (let i = 0; i < caseFiledTypeRowHashes.length; i++) {
            const caseFieldId = caseFiledTypeRowHashes[i].case_field_id;
            delete caseFiledTypeRowHashes[i].case_field_id;
            caseListConfigGenerator.setCaseFieldTypeProps(caseFieldId, caseFiledTypeRowHashes[i]);
        }

    });

    Given('I add case list data rows for config {string}', async function (caselistMockRef, datatable){
        const caseListConfigGenerator = global.scenarioData[caselistMockRef];
        caseListConfigGenerator.addCaseData(datatable.hashes());
    });

    Given('I set mock case list config {string}', async function (caselistMockRef){
        const caseListConfigGenerator = global.scenarioData[caselistMockRef];
        MockApp.onPost('/data/internal/searchCases', (req, res) => {
            res.send(caseListConfigGenerator.getCaseListConfig());
        });
    });

    Then('I validate case list column values', async function(datatable){
        const softAssert = new SoftAssert(this);
        const dataRowsHash = datatable.hashes();
        const columns = Object.keys(dataRowsHash[0]);
        const columnValueDisplayed = {};
        for (let i = 0; i < columns.length; i++){
            columnValueDisplayed[columns[i]] = await caseListPage.getColumnValues(columns[i]);
        }
        for (let i = 0; i < dataRowsHash.length; i++ ){
            const expectedRow = dataRowsHash[i];
            for (let j = 0; j < columns.length; j++){
                const expectedVal = expectedRow[columns[j]];
                const actualVal = columnValueDisplayed[columns[j]][i];
                softAssert.setScenario(`row ${i + 1} column ${columns[j]}`);
                softAssert.assert(() => expect(actualVal, `${columns[j]} value at row ${i} mismatch `).to.equal(expectedVal))
                
            } 
        }
        softAssert.finally();
        
    });


});

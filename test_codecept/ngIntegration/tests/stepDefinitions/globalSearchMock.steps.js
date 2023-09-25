var { defineSupportCode } = require('cucumber');

// const MockApp = require('../../../nodeMock/app');
const BrowserWaits = require('../../../e2e/support/customWaits');
const browserUtil = require('../../util/browserUtil');
// const nodeAppMockData = require('../../../nodeMock/nodeApp/mockData');
const CucumberReporter = require('../../../codeceptCommon/reportLogger');

const headerpage = require('../../../e2e/features/pageObjects/headerPage');
const globalSearchMockData = require('../../mockData/globalSearch/mockData');
const globalSearchDataModel = require('../../../dataModels/globalSearch'); 
const { DataTableArgument } = require('codeceptjs');


const backendMockClient = require('../../../backendMock/client/index')


    Given('I set global search mock results count {int}', async function (count) {
        globalSearchMockData.searchResponse.resultInfo.caseStartRecord = 1;
        globalSearchMockData.searchResponse.resultInfo.casesReturned = count;
        globalSearchMockData.searchResponse.resultInfo.moreResultsToGo = false;
        globalSearchMockData.searchResponse.results = [];

        for(let i = 0; i < count; i++){
            globalSearchMockData.searchResponse.results.push(globalSearchDataModel.getCaseResult());
        }

        globalSearchMockData.mockName = "TEST_UPDATED_1"

    });


    Given('I set set global search mock results response and resultInfo', async function (datatable){
        const datatableHashes = datatable.parse().hashes();
       
        globalSearchMockData.searchResponse.resultInfo.caseStartRecord = parseInt(datatableHashes[0].caseStartRecord);
        globalSearchMockData.searchResponse.resultInfo.casesReturned = parseInt(datatableHashes[0].casesReturned);
        globalSearchMockData.searchResponse.resultInfo.moreResultsToGo = datatableHashes[0].moreResultsToGo.includes('true');
        globalSearchMockData.searchResponse.results = [];

        for (let i = 0; i < datatableHashes[0].casesReturned; i++) {
            globalSearchMockData.searchResponse.results.push(globalSearchDataModel.getCaseResult());
        }
        const authCookies = await browser.driver.manage().getCookies()
        const authCookie = authCookies.find(cookie => cookie.name === '__auth__')

        await backendMockClient.setUserApiData(authCookie.value, 'GlobalSearchResults', { status: 200, data: globalSearchMockData.searchResponse } );

        

        // MockApp.onPost('/api/globalsearch/results', (req, res) => {
        //     res.send(globalSearchMockData.getResults());
        // });
       
    });






    Given('I set global search mock results with values', async function (datatable) {
        
        const datatableHashes = datatable.parse().hashes();

        for (const datatableHash of datatableHashes){
            const caseInResult = globalSearchMockData.searchResponse.results[parseInt(datatableHash.index)];

            const keys = Object.keys(datatableHash)
            
            for(const key of keys){
                if(key === 'index'){
                    //do nothing
                } else if (key === 'otherReferences'){
                    caseInResult.otherReferences.push(datatableHash[key]);
                }else{
                    caseInResult[key] = datatableHash[key];
                }
            }
        }
        const authCookies = await browser.driver.manage().getCookies()
        const authCookie = authCookies.find(cookie => cookie.name === '__auth__')

        await backendMockClient.setUserApiData(authCookie.value, 'GlobalSearchResults', { status: 200, data: globalSearchMockData.searchResponse });


    });

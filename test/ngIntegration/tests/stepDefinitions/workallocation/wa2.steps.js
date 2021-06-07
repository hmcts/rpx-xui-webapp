
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

const myWorkPage = require('../../../../e2e/features/pageObjects/workAllocation/myWorkPage');

defineSupportCode(function ({ And, But, Given, Then, When }) {

    const caseListPage = new CaseListPage();
    Given('I set MOCK tasks with permissions for view {string} and assigned state {string}', async function (view,assignedState ,taskPermissionsTable) {
        const taskPermissionHashes = taskPermissionsTable.hashes();
        
        const tasks = [];

        for (let i = 0; i < taskPermissionHashes.length; i++){
            tasks.push(workAllocationMockData.getRelease2TaskWithPermissions(taskPermissionHashes[i]['Permissions'].split(","), view, assignedState));
        }
        
        MockApp.onPost("/workallocation2/task/", (req, res) => {
            res.send({ tasks : tasks });
        });

    });

}) ;
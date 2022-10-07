
const BrowserWaits = require("../../../support/customWaits");

const WorkFlowContainer = require('./common/workFlowContainer');
const ChooseRadioOptionComponent = require("../common/chooseRadioOptionComponent");
const FindPersonComponent = require("./common/findPersonComponent");
const ChooseDuration = require('./common/chooseDurationPage');
const CheckYourChangesTable = require("../common/checkYourChangesTable");
const selectRoleTypeContainer = require('./common/selectRoleTypePage');
class ReassignTaskWorkflow {

    constructor() {

        this.workFlowContainer = new WorkFlowContainer($('exui-task-container-assignment'));
        this.selectRoleTypePage = selectRoleTypeContainer; 
        this.findPersonPage = new FindPersonComponent(this.workFlowContainer.container);
        this.checkYourchanges = new CheckYourChangesTable(this.workFlowContainer.container);

    }
}

module.exports = new ReassignTaskWorkflow();

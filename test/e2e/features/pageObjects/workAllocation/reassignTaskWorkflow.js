
const BrowserWaits = require("../../../support/customWaits");

const WorkFlowContainer = require('./common/workFlowContainer');
const ChooseRadioOptionComponent = require("../common/chooseRadioOptionComponent");
const FindPersonComponent = require("./common/findPersonComponent");
const ChooseDuration = require('./common/chooseDurationPage');
const checkYourAnswersPage = require("./common/checkYourAnswersPage");

class ReassignTaskWorkflow {

    constructor() {

        this.workFlowContainer = new WorkFlowContainer($('exui-task-container-assignment'));

        this.findPersonPage = new FindPersonComponent(this.workFlowContainer.container);
        this.checkYourAnswers = checkYourAnswersPage;

    }


}

module.exports = new ReassignTaskWorkflow();

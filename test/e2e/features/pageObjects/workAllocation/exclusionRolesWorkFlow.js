
const BrowserWaits = require("../../../support/customWaits");

const WorkFlowContainer = require('./common/workFlowContainer');

const ChooseRadioOptionComponent = require("../common/chooseRadioOptionComponent");
const FindPersonComponent = require("./common/findPersonComponent");

const describeExclusionPage = require("./describeExclusionPage");
const checkYourAnswersPage = require("./common/checkYourAnswersPage");

class ExclusionRoleWorkFlow {

    constructor() {
        this.workFlowContainer = new WorkFlowContainer($('exui-exclusion-navigation'));

        this.chooseWhoExclusion = new ChooseRadioOptionComponent(this.workFlowContainer.container.$('exui-choose-exclusion'));
        this.choosePersonRole = new ChooseRadioOptionComponent(this.workFlowContainer.container.$('exui-choose-person-role'));
        this.findPersonPage = new FindPersonComponent(this.workFlowContainer.container);
        this.describeExclusion = describeExclusionPage;

        this.checkYourAnswers = checkYourAnswersPage;

    }


}

module.exports = new ExclusionRoleWorkFlow();

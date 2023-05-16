
const BrowserWaits = require("../../../support/customWaits");

const WorkFlowContainer = require('./common/workFlowContainer');

const ChooseRadioOptionComponent = require("../common/chooseRadioOptionComponent");
const FindPersonComponent = require("./common/findPersonComponent");

const describeExclusionPage = require("./describeExclusionPage");
const checkYourAnswersPage = require("./common/checkYourAnswersPage");

class ExclusionRoleWorkFlow {

    constructor() {
        this.workFlowContainer = new WorkFlowContainer();

        this.chooseWhoExclusion = new ChooseRadioOptionComponent('exui-exclusion-navigation exui-choose-exclusion');
        this.choosePersonRole = new ChooseRadioOptionComponent('exui-exclusion-navigation exui-choose-person-role');
        this.findPersonPage = new FindPersonComponent($('exui-exclusion-navigation'));
        this.describeExclusion = describeExclusionPage;

        this.checkYourAnswers = checkYourAnswersPage;

    }


}

module.exports = new ExclusionRoleWorkFlow();

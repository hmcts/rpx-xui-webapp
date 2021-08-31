
const BrowserWaits = require("../../../support/customWaits");

const WorkFlowContainer = require('./common/workFlowContainer');
const ChooseRadioOptionComponent = require("../common/chooseRadioOptionComponent");
const FindPersonComponent = require("./common/findPersonComponent");
const ChooseDuration = require('./common/chooseDurationPage');
const checkYourAnswersPage = require("./common/checkYourAnswersPage");

class AllocateRoleWorkFlow{

    constructor(){
      
        this.workFlowContainer = new WorkFlowContainer($('exui-allocate-role-navigation'));

        this.chooseRolesPage = new ChooseRadioOptionComponent(this.workFlowContainer.container);
        this.chooseHowToAllocateRolePage = new ChooseRadioOptionComponent(this.workFlowContainer.container.$('exui-choose-allocate-to'));
        this.findPersonPage = new FindPersonComponent(this.workFlowContainer.container);
        this.durationOfRolePage = new ChooseDuration(this.workFlowContainer.container.$('exui-choose-duration'));
        this.checkYourAnswers = checkYourAnswersPage;

    }


}

module.exports = new AllocateRoleWorkFlow();

const { $ } = require('../../../../helpers/globals');
const ChooseRadioOptionComponent = require('../common/chooseRadioOptionComponent');
const checkYourAnswersPage = require('./common/checkYourAnswersPage');
const FindPersonComponent = require('./common/findPersonComponent');
const WorkFlowContainer = require('./common/workFlowContainer');
const describeExclusionPage = require('./describeExclusionPage');

class ExclusionRoleWorkFlow {
  constructor() {
    this.workFlowContainer = new WorkFlowContainer();

    this.chooseWhoExclusion = new ChooseRadioOptionComponent('exui-exclusion-navigation exui-choose-exclusion');
    this.choosePersonRole = new ChooseRadioOptionComponent('exui-exclusion-navigation exui-choose-person-role');
    this.describeExclusion = describeExclusionPage;

    this.checkYourAnswers = checkYourAnswersPage;
  }

  get findPersonPage() {
    return new FindPersonComponent($('exui-exclusion-navigation'));
  }
}

module.exports = new ExclusionRoleWorkFlow();

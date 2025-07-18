
const BrowserWaits = require('../../../support/customWaits');

const WorkFlowContainer = require('./common/workFlowContainer');
const ChooseRadioOptionComponent = require('../common/chooseRadioOptionComponent');
const FindPersonComponent = require('./common/findPersonComponent');
const ChooseDuration = require('./common/chooseDurationPage');
const checkYourAnswersPage = require('./common/checkYourAnswersPage');

class AllocateRoleWorkFlow{
  constructor(){
    this.checkYourAnswers = checkYourAnswersPage;
  }

  get workFlowContainer() {
    return this._wfContainer ??= new WorkFlowContainer();
  }

  get chooseRolesPage() {
    return this._chooseRolesPage ??=
      new ChooseRadioOptionComponent(this.workFlowContainer.container);
  }

  get chooseHowToAllocateRolePage() {
    return this._chooseHowToAllocateRolePage ??=
      new ChooseRadioOptionComponent(
        this.workFlowContainer.container.locator('exui-choose-allocate-to')
      );
  }

  get findPersonPage() {
    return this._findPersonPage ??=
      new FindPersonComponent(this.workFlowContainer.container);
  }

  get durationOfRolePage() {
    return this._durationOfRolePage ??=
      new ChooseDuration(this.workFlowContainer.container);
  }
}

module.exports = new AllocateRoleWorkFlow();

const { $ } = require('../../../../helpers/globals');
const CheckYourChangesTable = require('../common/checkYourChangesTable');
const FindPersonComponent = require('./common/findPersonComponent');
const selectRoleTypeContainer = require('./common/selectRoleTypePage');
const WorkFlowContainer = require('./common/workFlowContainer');

class ReassignTaskWorkflow {
  constructor() {
    this.selectRoleTypePage = selectRoleTypeContainer;
  }

  get findPersonPage() {
    return this._findPersonPage ??= new FindPersonComponent(this.workFlowContainer.container);
  }

  get checkYourchanges() {
    return this._checkYourchanges ??= new CheckYourChangesTable(this.workFlowContainer.container);
  }

  get workFlowContainer() {
    return new WorkFlowContainer($('exui-task-container-assignment'));
  }
}

module.exports = new ReassignTaskWorkflow();

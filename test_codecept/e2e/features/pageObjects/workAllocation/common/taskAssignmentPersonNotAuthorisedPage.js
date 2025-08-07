const { $ } = require('../../../../../helpers/globals');

class TaskAssignmentPersonNotAuthorised{
  get container() {
    return $('exui-task-assignment-person-not-authorised');
  }

  get message() {
    return $('exui-task-assignment-person-not-authorised h1');
  }

  get backButton() {
    return $('exui-task-assignment-person-not-authorised button');
  }
}

module.exports = new TaskAssignmentPersonNotAuthorised();

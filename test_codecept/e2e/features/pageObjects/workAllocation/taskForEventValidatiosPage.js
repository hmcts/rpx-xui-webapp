const { $, isPresent } = require('../../../../helpers/globals');

class TaskForEventCompletionValidationPage {
  get _validationPageSelectors() {
    return [
      'app-no-tasks-available',
      'app-multiple-tasks-exist',
      'app-task-assigned',
      'app-case-event-completion-task-reassigned',
      'app-case-event-completion-task-cancelled',
      'app-case-event-completion-task-completed',
      'app-case-event-completion-task-terminated'
    ];
  }

  get validationPages() { return $(this._validationPageSelectors.join(',')); }

  get summaryHeading() { return $('.govuk-error-summary h2'); }
  get summaryBody() { return $('.govuk-error-summary__body'); }

  get errorDetailsContainer() { return $('div.govuk-form-group--error'); }
  get errorDetailsHeader() { return $('div.govuk-form-group--error h2'); }
  get errorDetailsMessage() { return $('div.govuk-form-group--error'); }
  get errorDetailsNavLink() { return $('div.govuk-form-group--error a'); }

  get continueButton() { return $('ccd-case-event-completion button'); }
  get cancelButton() { return $('ccd-case-event-completion a.govuk-button'); }

  async isPageDisplayed() {
    const present = await isPresent(this.validationPages);
    if (present) {
      return await this.validationPages.isVisible();
    }
    return present;
  }
}

module.exports = new TaskForEventCompletionValidationPage();

const { $, elementByXpath } = require('../../../../../helpers/globals');
const HearingRequirementsPage = require('./HearingRequirementsPage');
const HearingFacilitiesPage = require('./HearingFacilitiesPage');
const HearingStagePage = require('./HearingStagePage');
const ParticipantAttendancePage = require('./ParticipantAttendancePage');
const HearingVenueDetails = require('./HearingVenueDetails');
const HearingJudgePage = require('./HearingJudgePage');
const HearingPanelPage = require('./HearingPanelPage');
const HearingTimingPage = require('./HearingTimingPage');
const HearingLinkPage = require('./HearingLinkPage');
const HearingAdditionalInstructionsPage = require('./HearingAdditionalInstractions');
const HearingCreateEditSummaryPage = require('./HearingCreateEditSummaryPage');
const HearingSubmitConfirmationPage = require('./HearingSubmitConfirmationPage');
const HearingWelshPage = require('./hearingWelshPage');
const HearingChangeReasonsPage = require('./HearingChangeReasonsPage');

class CreateHearingWorkflow{
  get pages() {
    return {
      'Hearing requirements': new HearingRequirementsPage(),
      'Do you require any additional facilities?': new HearingFacilitiesPage(),
      'What stage is this hearing at?': new HearingStagePage(),
      'Participant attendance': new ParticipantAttendancePage(),
      'What are the hearing venue details?': new HearingVenueDetails(),
      'Does this hearing need to be in Welsh?': new HearingWelshPage(),
      'Do you want a specific judge?': new HearingJudgePage(),
      'Do you require a panel for this hearing?': new HearingPanelPage(),
      'Length, date and priority level of hearing': new HearingTimingPage(),
      'Will this hearing need to be linked to other hearings?': new HearingLinkPage(),
      'Enter any additional instructions for the hearing': new HearingAdditionalInstructionsPage(),
      'Check your answers before sending your request': new HearingCreateEditSummaryPage(),
      'Hearing request submitted': new HearingSubmitConfirmationPage(),
      'Provide a reason for changing this hearing': new HearingChangeReasonsPage()
    }
  }

  get continueBtn() {
    return elementByXpath("//button[contains(text(),'Continue')]");
  }

  get submitBtn() {
    return elementByXpath("//button[contains(text(),'Submit request')]");
  }

  get backLink() {
    return $('exui-request-hearing a.govuk-back-link');
  }

  get pageHeading() {
    return $('h1.govuk-heading-l');
  }

  get createhearingContainer() {
    return $('exui-request-hearing');
  }

  async isCreateHearingWorkflowDIsplayed(){
    return await this.createhearingContainer.isVisible();
  }

  async clickSubmitRequest(){
    await this.submitBtn.click();
  }
}

module.exports = new CreateHearingWorkflow();

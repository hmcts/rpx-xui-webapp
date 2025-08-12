const { $ } = require('../../../helpers/globals');
const BrowserWaits = require('../../../e2e/support/customWaits');

class CaseDetailsPage {
  get ccdCaseDetailsContainer() {
    return $('exui-case-details-home');
  }

  get exuiAlert() {
    return $('exui-alert');
  }

  get caseTitle() {
    return $('.title');
  }

  get eventTriggerContainer() {
    return $('ccd-event-trigger');
  }

  get challengedAccessRequestContainer() {
    return $('ccd-case-challenged-access-request');
  }

  get specificAccessRequestContainer() {
    return $('ccd-case-specific-access-request');
  }

  async amOnPage() {
    try {
      await this.waitForPage();
      return true;
    } catch (err) {
      console.log('Case details page is not displayed.', err);
      return false;
    }
  }

  async waitForPage() {
    await BrowserWaits.waitForElement(this.ccdCaseDetailsContainer);
  }

  async isAlertMessageDisplayed() {
    await this.amOnPage();
    return await this.exuiAlert.isVisible();
  }

  async getAlertMessageText() {
    if (await this.isAlertMessageDisplayed()) {
      return await this.exuiAlert.textContent();
    }
    throw new Error('Alert/notification message is not displayed or disappeared.');
  }

  async isCaseTitleDisplayed() {
    await this.amOnPage();
    return await this.caseTitle.isVisible();
  }

  async getCaseTitle() {
    await this.amOnPage();
    return await this.caseTitle.textContent();
  }

  async isEventTriggerDisplayed() {
    await this.amOnPage();
    return await this.eventTriggerContainer.isVisible();
  }

  async getEvents() {
    if (!await this.isEventTriggerDisplayed()) {
      throw new Error('Event trigger element not displayed');
    }
    const options = this.eventTriggerContainer.locator('option');
    const count = await options.count();
    const events = [];
    for (let i = 0; i < count; i++) {
      events.push(await options.nth(i).textContent());
    }
    return events;
  }

  async selectNextStepEvent(eventName) {
    await this.eventTriggerContainer.locator(`option[title="${eventName}"]`).click();
  }

  async isEventTriggerGoButtonEnabled() {
    await this.amOnPage();
    return await this.eventTriggerContainer.locator('button').isEnabled();
  }

  async clickEventTriggerGoButton() {
    await this.amOnPage();
    if (await this.isEventTriggerGoButtonEnabled()) {
      return await this.eventTriggerContainer.locator('button').click();
    }
    throw new Error('Event trigger Go button not enabled');
  }
}

module.exports = new CaseDetailsPage();
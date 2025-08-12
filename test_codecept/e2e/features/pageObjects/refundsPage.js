const { $, $$, elementByXpath } = require('../../../helpers/globals');
const BrowserWaits = require('../../support/customWaits');

class RefundsPage {
  get header() { return $('#content h1'); }

  get refundsToBeApproved() { return elementByXpath('//h2[contains(text(),"Refunds to be approved")]'); }
  get refundsReturnedToCaseworker() { return elementByXpath('//h2[contains(text(),"Refunds returned to caseworker")]'); }

  get reviewCase() { return $('a:has-text("Review case")'); }
  get processRefundLink() { return $('a:has-text("Process refund")'); }
  get reviewRefundLink() { return $('a:has-text("Review refund")'); }

  get processRefundPage() {
    return {
      submitButton: $('.govuk-button.button'),
      reviewRefundDetailsHeading: elementByXpath('//h1[contains(text(),"Review refund details")]'),
      whatDoYouWantToDoWithThisRefundHeading: elementByXpath('//h1[contains(text(),"What do you want to do with this refund?")]'),
      reviewRefundDetailsTableColumns: $$('.payment-view-alignment  table td:nth-child(1)'),
      whatDoYouWantToDoWithThisRefundInfo: {
        refundActionsLables: $$('#main-content .process-refund__panel label'),
        refundActionsLinks: $$('#sign-in-item-hint'),
        returnToCaseWorkerRadioButton: $('#refundAction-2')
      }
    };
  }

  get reviewRefundPage() {
    return {
      refundDetailsHeading: elementByXpath('//h2[contains(text(),"Refund details")]'),
      refundStatusHistoryHeading: elementByXpath('//h2[contains(text(),"Refund status history")]'),
      refundDetailsTableColumns: $$('ccpay-refund-status table tr td:nth-child(1)'),
      refundStatusHistoryColumns: $$('ccpay-refund-status table thead td')
    };
  }

  async _gettAllText(ptorDomElements) {
    const elementsTextArr = await ptorDomElements.map((element) => {
      return element.textContent();
    });
    return elementsTextArr;
  }

  async getPageHeader() {
    return await this.header.textContent();
  }

  async amOnPage() {
    await BrowserWaits.waitForElement(this.header);
    const header = await this.header.textContent();
    await BrowserWaits.waitForElement(this.refundsToBeApproved);
    const subHeader1 = await this.refundsToBeApproved.textContent();
    await BrowserWaits.waitForElement(this.refundsReturnedToCaseworker);
    const subHeader2 = await this.refundsReturnedToCaseworker.textContent();
    return [header, subHeader1, subHeader2];
  }

  async amOnReviewCasePage() {
    await BrowserWaits.waitForElementClickable($('#wb-jurisdiction'));
    const subHeader1 = await this.header.textContent();
    return subHeader1;
  }

  async amOnProcessRefundPage() {
    await BrowserWaits.waitForElement(this.processRefundPage.whatDoYouWantToDoWithThisRefundHeading);
    const subHeader1 = await this.processRefundPage.reviewRefundDetailsHeading.textContent();
    const subHeader2 = await this.processRefundPage.whatDoYouWantToDoWithThisRefundHeading.textContent();
    return [subHeader1, subHeader2];
  }

  async amOnReviewRefundPage() {
    await BrowserWaits.waitForElement(this.reviewRefundPage.refundStatusHistoryHeading);
    const subHeader1 = await this.reviewRefundPage.refundDetailsHeading.textContent();
    const subHeader2 = await this.reviewRefundPage.refundStatusHistoryHeading.textContent();
    return [subHeader1, subHeader2];
  }

  async getRefundDetailsInfo() {
    return this.processRefund.reviewRefundDetailsTableColumns.textContent();
  }

  async getProcessRefundsInfo() {
    await BrowserWaits.waitForElementClickable(this.processRefundPage.whatDoYouWantToDoWithThisRefundInfo.returnToCaseWorkerRadioButton);
    const reviewRefundDetailsTableColumns = await this._gettAllText(this.processRefundPage.reviewRefundDetailsTableColumns);
    const refundActionsLabels = await this._gettAllText(this.processRefundPage.whatDoYouWantToDoWithThisRefundInfo.refundActionsLables);
    const refundActionsHints = await this._gettAllText(this.processRefundPage.whatDoYouWantToDoWithThisRefundInfo.refundActionsLinks);
    return {
      reviewRefundDetailsTableColumns: reviewRefundDetailsTableColumns,
      refundActionsLabels: refundActionsLabels,
      refundActionsHints: refundActionsHints
    };
  }

  async getReviewRefundsInfo() {
    await BrowserWaits.waitForElement(this.reviewRefundPage.refundStatusHistoryColumns.first());
    const refundDetailsTableColumns = await this._gettAllText(this.reviewRefundPage.refundDetailsTableColumns);
    const refundStatusHistoryColumns = await this._gettAllText(this.reviewRefundPage.refundStatusHistoryColumns);
    return {
      refundDetailsTableColumns: refundDetailsTableColumns,
      refundStatusHistoryColumns: refundStatusHistoryColumns
    };
  }

  async clickReviewCase() {
    await BrowserWaits.waitForElementClickable(this.reviewCase);
    await this.reviewCase.click();
  }

  async clickProcessRefund() {
    await BrowserWaits.waitForElementClickable(this.processRefundLink);
    await this.processRefundLink.click();
  }

  async clickReviewRefund() {
    await BrowserWaits.waitForElementClickable(this.reviewRefundLink);
    await this.reviewRefundLink.click();
  }
}

module.exports = RefundsPage;

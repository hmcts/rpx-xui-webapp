const BrowserWaits = require('../../support/customWaits');

class RefundsPage {

  constructor(){
    this.header = $('#content h1');
    this.refundsToBeApproved = element(by.xpath('//h2[contains(text(),"Refunds to be approved")]'));
    this.refundsReturnedToCaseworker = element(by.xpath('//h2[contains(text(),"Refunds returned to caseworker")]'));
    this.reviewCase = element.all(by.linkText('Review case')).first();
    this.processRefundLink = element.all(by.linkText('Process refund')).first();
    this.reviewRefundLink = element.all(by.linkText('Review refund')).first();
    this.processRefundPage = {
      submitButton: $('.govuk-button.button'),
      reviewRefundDetailsHeading: element(by.xpath('//h1[contains(text(),"Review refund details")]')),
      whatDoYouWantToDoWithThisRefundHeading: element(by.xpath('//h1[contains(text(),"What do you want to do with this refund?")]')),
      reviewRefundDetailsTableColumns: $$('.payment-view-alignment  table td:nth-child(1)'),
      whatDoYouWantToDoWithThisRefundInfo: {
        refundActionsLables: $$('#main-content .process-refund__panel label'),
        refundActionsLinks: $$('#sign-in-item-hint'),
        returnToCaseWorkerRadioButton:  $('#refundAction-2')
      }
    };
    this.reviewRefundPage = {
      refundDetailsHeading: element(by.xpath('//h2[contains(text(),"Refund details")]')),
      refundStatusHistoryHeading: element(by.xpath('//h2[contains(text(),"Refund status history")]')),
      refundDetailsTableColumns: $$('ccpay-refund-status table tr td:nth-child(1)'),
      refundStatusHistoryColumns: $$('ccpay-refund-status table thead td')
    };
  }

  async _gettAllText(ptorDomElements){
    let  elementsTextArr = await ptorDomElements.map( element => {
      return element.getText();
   });
   return elementsTextArr;
  }

  async getPageHeader(){
    return await this.header.getText();
  }

  async amOnPage(){
    await BrowserWaits.waitForElement(this.header);
    let header = await this.header.getText();
    await BrowserWaits.waitForElement(this.refundsToBeApproved);
    let subHeader1 = await this.refundsToBeApproved.getText();
    await BrowserWaits.waitForElement(this.refundsReturnedToCaseworker);
    let subHeader2 = await this.refundsReturnedToCaseworker.getText();
    return [header, subHeader1, subHeader2];
  }

  async amOnReviewCasePage(){
    await BrowserWaits.waitForElementClickable($('#wb-jurisdiction'));
    let subHeader1 = await this.header.getText()
    return subHeader1;
  }
    async amOnProcessRefundPage(){
    await BrowserWaits.waitForElement(this.processRefundPage.whatDoYouWantToDoWithThisRefundHeading);
    let subHeader1 = await this.processRefundPage.reviewRefundDetailsHeading.getText();
    let subHeader2 = await this.processRefundPage.whatDoYouWantToDoWithThisRefundHeading.getText();
    return [subHeader1, subHeader2];
  }

  async amOnReviewRefundPage(){
    await BrowserWaits.waitForElement(this.reviewRefundPage.refundStatusHistoryHeading);
    let subHeader1 = await this.reviewRefundPage.refundDetailsHeading.getText();
    let subHeader2 = await this.reviewRefundPage.refundStatusHistoryHeading.getText();
    return [subHeader1, subHeader2];
  }

  async getRefundDetailsInfo(){
    return this.processRefund.reviewRefundDetailsTableColumns.getText();
  }

  async getProcessRefundsInfo(){
    await BrowserWaits.waitForElementClickable(this.processRefundPage.whatDoYouWantToDoWithThisRefundInfo.returnToCaseWorkerRadioButton);
    let  reviewRefundDetailsTableColumns = await this._gettAllText(this.processRefundPage.reviewRefundDetailsTableColumns);
    let  refundActionsLabels = await this._gettAllText(this.processRefundPage.whatDoYouWantToDoWithThisRefundInfo.refundActionsLables);    
    let  refundActionsHints =  await  this._gettAllText(this.processRefundPage.whatDoYouWantToDoWithThisRefundInfo.refundActionsLinks);
    return {
      reviewRefundDetailsTableColumns: reviewRefundDetailsTableColumns,
      refundActionsLabels: refundActionsLabels,
      refundActionsHints: refundActionsHints
    }    
  }

  async getReviewRefundsInfo(){
    await BrowserWaits.waitForElement(this.reviewRefundPage.refundStatusHistoryColumns.first());
    let refundDetailsTableColumns = await this._gettAllText(this.reviewRefundPage.refundDetailsTableColumns);
    let refundStatusHistoryColumns = await this._gettAllText(this.reviewRefundPage.refundStatusHistoryColumns);
    return {
      refundDetailsTableColumns: refundDetailsTableColumns,
      refundStatusHistoryColumns: refundStatusHistoryColumns
    };
  }

  async clickReviewCase(){
    await BrowserWaits.waitForElementClickable(this.reviewCase);
    await this.reviewCase.click();
  }

  async clickProcessRefund(){
    await BrowserWaits.waitForElementClickable(this.processRefundLink);
    await this.processRefundLink.click();
  }

  async clickReviewRefund(){
    await BrowserWaits.waitForElementClickable(this.reviewRefundLink);
    await this.reviewRefundLink.click();
  }

}

module.exports = RefundsPage;

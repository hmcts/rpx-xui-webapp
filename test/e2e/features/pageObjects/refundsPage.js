Dropdown = require('./webdriver-components/dropdown.js')
Button = require('./webdriver-components/button.js')

var BrowserWaits = require('../../support/customWaits');

class RefundsPage {

  constructor(){
    this.header = '#content h1';
    this.refundsToBeApproved = element(by.xpath('//h2[contains(text(),"Refunds to be approved")]'));
    this.refundsReturnedToCaseworker = element(by.xpath('//h2[contains(text(),"Refunds returned to caseworker")]'));
    this._jurisdiction = new Dropdown('#cc-jurisdiction');
    this._caseType = new Dropdown('#cc-case-type');
    this._event = new Dropdown('#cc-event');
    this._submitButton = new Button('#content button');
    this._jurisdictionSelector = '#cc-jurisdiction' ;

    this._startBtn = element(by.xpath("//button[text() = 'Start']"));
    this.reviewCase = element.all(by.linkText('Review case')).first();
    this.processRefund = element.all(by.linkText('Process refund')).first();
    this.reviewRefund = element.all(by.linkText('Review refund')).first();

    this.processRefund = {
      reviewRefundDetailsHeading: '',
      whatDoYouWantToDoWithThisRefundHeading: '',
      reviewRefundDetailsTableColumns: $$('.payment-view-alignment  table td:nth-child(1)'),
      refundActionFields: {
        approve: $('#refundAction-0'),
        reject: $('#refundAction-1'),
        returnToCaseWorker: $('#refundAction-2')
      },

      reviewRefundDetails : {
        labels: [],
      },
      whatDoYouWantToDoWithThisRefundInfo: {
        approve : {
          radioButton : $('#refundAction-0'),
          label: $$('#main-content .process-refund__panel label(').get(1),
          furtherActionHint: $$('//*[@id="sign-in-item-hint"]').get(1)
        },
        reject : {
          radioButton : $('#refundAction-1'),
          label: $$('#main-content .process-refund__panel label(').get(2),
          furtherActionHint: $$('//*[@id="sign-in-item-hint"]').get(2)
        },
        returnToCaseWorker : {
          radioButton : $('#refundAction-2'),
          label: $$('#main-content .process-refund__panel label(').get(3),
          furtherActionHint: $$('//*[@id="sign-in-item-hint"]').get(3)
        },
      }

    }

  }

  async getPageHeader(){
    return await $(this.header).getText();
  }

  async amOnPage(){
    await BrowserWaits.waitForElement($(this.header));
    let header = await $(this.header).getText();
    await BrowserWaits.waitForElement(this.refundsToBeApproved);
    let subHeader1 = await this.refundsToBeApproved.getText();
    await BrowserWaits.waitForElement(this.refundsReturnedToCaseworker);
    let subHeader2 = await this.refundsReturnedToCaseworker.getText();
    return header === 'Refund list' &&
        subHeader1 == 'Refunds to be approved' &&
        subHeader2 == 'Refunds returned to caseworker'
  }

  async getRefundDetailsInfo(){
    return this.processRefund.reviewRefundDetailsTableColumns.getText();
  }

  // async amOnProcessRefundsPage(){
  //   let reviewRefundDetailsTableColumns = [
  //     'Payment to be refunded',
  //     'Reason for refund',
  //     'Amount to be refunded',
  //     'Submitted by',
  //     'Date submitted'
  //   ];

  //   reviewRefundDetailsTableColumns.forEach( column => {
  //     let reviewRefundInfo = refundsPage.reviewRefundInfo;
  //     expect(await reviewRefundInfo.reviewRefundDetailsTableColumns.getText())
  //     .to
  //     .contain(column);
  //   });

  //   Object.keys(reviewRefundInfo.whatDoYouWantToDoWithThisRefundInfo).forEach(key => {
  //     Browser.waitsreviewRefundInfo.whatDoYouWantToDoWithThisRefundInfo[key]
  //   });
  // }

  async clickReviewCase(){
    await BrowserWaits.waitForElementClickable(this.reviewCase);
    await this.reviewCase.click();
  }

  async clickProcessRefund(){
    await BrowserWaits.waitForElementClickable(this.processRefund);
    await this.processRefund.click();
  }

  async clickReviewRefund(){
    await BrowserWaits.waitForElementClickable(this.reviewRefund);
    await this.reviewRefund.click();
  }



}

module.exports = RefundsPage;

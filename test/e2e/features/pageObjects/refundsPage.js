Dropdown = require('./webdriver-components/dropdown.js')
Button = require('./webdriver-components/button.js')

const { $$ } = require('protractor');
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
    this.processRefundLink = element.all(by.linkText('Process refund')).first();
    this.reviewRefundLink = element.all(by.linkText('Review refund')).first();

    this.processRefundPage = {
      reviewRefundDetailsHeading: element(by.xpath('//h1[contains(text(),"Review refund details")]')),
      whatDoYouWantToDoWithThisRefundHeading: element(by.xpath('//h1[contains(text(),"What do you want to do with this refund?")]')),
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

    };

    this.reviewRefundPage = {
      refundDetailsHeading: element(by.xpath('//h2[contains(text(),"Refund details")]')),
      refundStatusHistoryHeading: element(by.xpath('//h2[contains(text(),"Refund status history")]')),
      refundDetailsTableColumns: $$('ccpay-refund-status table tr td:nth-child(1)'),
      refundStatusHistoryColumns: $$('ccpay-refund-status table thead tr td')
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
    return [header, subHeader1, subHeader2];
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

  async getReviewRefundsInfo(){
    return [
      this.reviewRefund.refundDetailsTableColumns.getText(),
      this.reviewRefund.refundStatusHistoryColumns.getText()
    ];
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
    await BrowserWaits.waitForElementClickable(this.processRefundLink);
    await this.processRefundLink.click();
  }

  async clickReviewRefund(){
    await BrowserWaits.waitForElementClickable(this.reviewRefundLink);
    await this.reviewRefundLink.click();
  }



}

module.exports = RefundsPage;

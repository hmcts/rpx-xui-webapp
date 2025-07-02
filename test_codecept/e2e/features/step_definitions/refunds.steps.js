const RefundsPage = require('../pageObjects/refundsPage.js');
function headerPage () { return require('../pageObjects/headerPage')(); }

const refundsPage = new RefundsPage();

When(/^I click on Refunds button$/, async function () {
  await headerPage().clickRefunds();
});

Then(/^Refunds page should be displayed$/, async function () {
  const refundPageHeadings = [
    'Refund list',
    'Refunds to be approved',
    'Refunds returned to caseworker'
  ];
  await browser.waitForAngular();
  const renderedHeadings = await refundsPage.amOnPage();
  expect(renderedHeadings).to.include.all.members(refundPageHeadings);
});

When(/^I click Review case$/, async function () {
  await refundsPage.clickReviewCase();
});

Then(/^Review case page should be displayed$/, async function () {
  expect(await refundsPage.amOnReviewCasePage()).to.equal('Case list');
});

When(/^I click Process refund$/, async function () {
  await refundsPage.clickProcessRefund();
});

Then(/^Process refund page should be displayed$/, async function () {
  const processRefundPageHeadings = [
    'Review refund details',
    'What do you want to do with this refund?'
  ];
  const renderedHeadings = await refundsPage.amOnProcessRefundPage();
  const processRefundPageFields = {
    reviewRefundDetailsTableColumns: [
      'Payment to be refunded',
      'Reason for refund',
      'Amount to be refunded',
      'Submitted by',
      'Date submitted'
    ],
    refundActionsLabels: ['Approve', 'Reject', 'Return to caseworker'],
    refundActionsHints: [
      'Send to middle office',
      'There is no refund due',
      'Some information needs correcting'
    ]
  };
  const processDetailsInfo = await refundsPage.getProcessRefundsInfo();
  expect(renderedHeadings).to.include.all.members(processRefundPageHeadings);
  Object.keys(processRefundPageFields).forEach((key) => {
    expect(processDetailsInfo[key]).to.include.all.members(processRefundPageFields[key]);
  });
});

When(/^I click Review refund$/, async function () {
  await refundsPage.clickReviewRefund();
});

Then(/^Review refund page should be displayed$/, async function () {
  const reviewRefundPageHeadings = [
    'Refund details',
    'Refund status history'
  ];
  const renderedHeadings = await refundsPage.amOnReviewRefundPage();
  const reviewRefundPageFields = {
    refundDetailsTableColumns: [
      'Refund reference',
      'Payment to be refunded',
      'Reason for refund',
      'Amount refunded'
    ],
    refundStatusHistoryColumns: ['Status', 'Date and time', 'Users', 'Notes']
  };
  const reviewDetailsInfo = await refundsPage.getReviewRefundsInfo();
  expect(renderedHeadings).to.include.all.members(reviewRefundPageHeadings);
  Object.keys(reviewRefundPageFields).forEach((key) => {
    expect(reviewDetailsInfo[key]).to.include.all.members(reviewRefundPageFields[key]);
  });
});


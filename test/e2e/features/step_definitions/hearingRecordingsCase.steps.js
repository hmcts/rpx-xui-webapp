
var HearingRecordingsCase = require('../pageObjects/hearingRecordingsCase');
const browserWaits = require('../../support/customWaits');
var { defineSupportCode } = require('cucumber');


defineSupportCode(function ({ And, But, Given, Then, When }) {

  let hearingRecordingsCase = new HearingRecordingsCase();

  When('I click on Case Hearing Files tab', async function () {
    await hearingRecordingsCase.hearingFilesTab();
  });

  When('I click on a file', async function () {
    await browserWaits.retryWithActionCallback(async () => {
      await hearingRecordingsCase.clickFileLink();
    });
   
  });


  Then('I see the file displayed in Media Viewer', async function () {
    await hearingRecordingsCase.checkFile();
  });

});

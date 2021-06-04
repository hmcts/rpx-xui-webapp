var CaseManager = require('../pageObjects/common/CaseManager');

var { defineSupportCode } = require('cucumber');

defineSupportCode(function ({ And, But, Given, Then, When }) {

  let caseManager = new CaseManager();

    When('I Add Comment to the case', async function () {
      await caseManager.startNextStep('Add Comment');
      await caseManager.submitComment();
    });


    Then('I see the event with the correct timestamp', async function () {
      let currentDate = new Date();
      expect(await caseManager.getTimestampDisplayed()).to.be.contain(currentDate.toLocaleTimeString());
    });

});


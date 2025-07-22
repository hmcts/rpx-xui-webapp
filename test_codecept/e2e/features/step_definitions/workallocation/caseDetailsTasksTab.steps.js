const reportLogger = require('../../../../codeceptCommon/reportLogger');
const { $, isPresent } = require('../../../../helpers/globals');
const BrowserWaits = require('../../../support/customWaits');
const SoftAssert = require('../../../../ngIntegration/util/softAssert');
const caseDetailsTaskTabPage = require('../../pageObjects/workAllocation/caseDetailsTaskTab');
const WorkAllocationDateUtil = require('../../pageObjects/workAllocation/common/workAllocationDateUtil');

const { DataTableArgument } = require('codeceptjs');

When('I click manage link {string} for task at position {int} in case details tasks tab', async function(manageLinkText, taskPos){
  await BrowserWaits.retryWithActionCallback(async () => {
    await BrowserWaits.waitForSeconds(5);
    const taskAttributes = await caseDetailsTaskTabPage.getAttributeElementssDisplayedForTaskAtPos(taskPos);
    reportLogger.AddMessage(`Manage links dislayed for this task ${await taskAttributes.Manage.getText()}`);
    await caseDetailsTaskTabPage.clickLinkFromTaskAttribute(taskAttributes, 'Manage', manageLinkText);
  });
});

Then('I validate case details task tab page is displayed', async function(){
  await BrowserWaits.retryWithActionCallback(async () => {
    try {
      expect(await isPresent(caseDetailsTaskTabPage.container), 'Task details tab page display ').be.true;
    } catch (err){
      reportLogger.AddMessage('Error occured '+err);
      await browser.refresh();
      // await caseDetailsPage.clickTabWithLabel("Roles and access");
      // await caseRolesAndAccessPage.waitForPage();
      // await caseDetailsPage.clickTabWithLabel("Tasks");
      throw new Error(err);
    }
  });
});

Then('I validate task tab alert container displayed', async function(){
  expect(await isPresent(caseDetailsTaskTabPage.alertBanner)).be.true;
});

Then('I validate task tab alert banner header is {string}', async function (alertheader) {
  await BrowserWaits.retryWithActionCallback(async () => {
    expect(await caseDetailsTaskTabPage.alertBannerHeading.textContent()).includes(alertheader);
  });
});

Then('I validate task tab alert banner message is {string}', async function (alertMessagee) {
  await BrowserWaits.retryWithActionCallback(async () => {
    expect(await caseDetailsTaskTabPage.alertBannerMessage.textContent()).includes(alertMessagee);
  });
});

Then('I validate task tab active tasks container displayed', async function () {
  await BrowserWaits.retryWithActionCallback(async () => {
    expect(await isPresent(caseDetailsTaskTabPage.activeTasksContainer)).to.be.true;
  });
});

Then('I validate task tab active tasks displayed count {int}', async function (taskCount) {
  await BrowserWaits.retryWithActionCallback(async () => {
    expect(await caseDetailsTaskTabPage.tasks.count()).to.equal(taskCount);
  });
});

Then('I validate task tab active task with task name {string} is displayed', async function (taskName) {
  expect(await caseDetailsTaskTabPage.getTaskContainerWithName(taskName)).to.not.equal(null);
});

Then('I validate task tab active task at position {int} is {string}', async function (position, taskName) {
  expect(await caseDetailsTaskTabPage.getTaskNameForTaskAtPosition(position)).to.include(taskName);
});

When('I click active tast attribute Next steps link {string} for task at position {int} with name {string}', async function (attributeLinktext, position, taskNameExpected){
  let taskAttributes = null;

  await BrowserWaits.retryWithActionCallback(async () => {
    taskAttributes = await caseDetailsTaskTabPage.getAttributeElementssDisplayedForTaskAtPos(position);
    reportLogger.AddMessage('*** Actual values displayed ***');

    const actualDisplayValues = {};
    for (const taskAttrib of Object.keys(taskAttributes)) {
      const attriText = await taskAttributes[taskAttrib].textContent();
      actualDisplayValues[taskAttrib] = attriText;
    }
    reportLogger.FormatPrintJson(actualDisplayValues);
  });
  const nextSteps = taskAttributes['Next steps'];
  const links = nextSteps.locator('a');
  const linksCount = await links.count();

  let linkToClick = null;
  for (let i =0; i < linksCount; i++){
    const link = await links.nth(i);
    const linktext = await link.textContent();
    if (linktext.includes(attributeLinktext)){
      linkToClick = link;
      break;
    }
  }
  expect(linkToClick !== null, `lnk with text ${attributeLinktext} not found in next steps`).to.be.true;
  await BrowserWaits.retryWithActionCallback(async () => {
    await linkToClick.click();
  });
  await BrowserWaits.retryWithActionCallback(async () => {
    await BrowserWaits.waitForElement($('ccd-case-edit-page'));
  });
});

Then('I validate task tab active task at position {int} with task name {string} has attributes', async function(position, taskNameExpected, attributesDatatable){
  reportLogger.reportDatatable(attributesDatatable);
  await BrowserWaits.retryWithActionCallback(async () => {
    const softAssert = new SoftAssert();
    const taskName = await caseDetailsTaskTabPage.getTaskNameForTaskAtPosition(position);
    let taskAttributes = null;

    await BrowserWaits.retryWithActionCallback(async () => {
      taskAttributes = await caseDetailsTaskTabPage.getAttributeElementssDisplayedForTaskAtPos(position);
      reportLogger.AddMessage('*** Actual values displayed ***');

      const actualDisplayValues = {};
      for (const taskAttrib of Object.keys(taskAttributes)) {
        const attriText = await taskAttributes[taskAttrib].textContent();
        actualDisplayValues[taskAttrib] = attriText;
      }
      reportLogger.FormatPrintJson(actualDisplayValues);
    });

    softAssert.setScenario('Task name match');
    await softAssert.assert(async () => expect(taskName).to.includes(taskNameExpected));

    const expectedAttributeHashes = attributesDatatable.parse().hashes();

    for (const attributeHash of expectedAttributeHashes) {
      const attribName = attributeHash.name;
      const attributeIsDisplayed = attributeHash.isDisplayed.toLowerCase();
      const validateContentType = attributeHash.contentType;
      let contentText = attributeHash.text;

      if (attribName.toLowerCase().includes('date') || attribName.toLowerCase().includes('task created')) {
        contentText = WorkAllocationDateUtil.getDateFormat_D_Month_YYYY(contentText);
      }

      reportLogger.AddMessage(`Validating task attributes ${attribName}, attributeIsDisplayed ${attributeIsDisplayed}, validateContentType ${validateContentType}, content ${contentText}`);

      if (attributeIsDisplayed.includes('true') || attributeIsDisplayed.includes('yes')) {
        softAssert.setScenario('Task attribute displayed and match content');

        await softAssert.assert(async () => expect(Object.keys(taskAttributes), `Task details missing : ${attribName}`).to.includes(attribName));
        await softAssert.assert(async () => expect(await taskAttributes[attribName].textContent()).to.includes(contentText));

        if (validateContentType.toLowerCase().includes('link')) {
          const links = taskAttributes[attribName].locator('a');
          const linksCount = await links.count();

          let linktext = '';
          let isLinkWithTextPresent = false;
          for (let i = 0; i < linksCount; i++) {
            const linkElement = await links.nth(i);
            linktext = await linkElement.textContent();
            isLinkWithTextPresent = linktext.includes(contentText);
            if (isLinkWithTextPresent) {
              if (validateContentType.toLowerCase().includes('urlcontains')) {
                const linkHref = await linkElement.getAttribute('href');
                const expectedHref = attributeHash.href;
                reportLogger.AddMessage(`linl href expected "${expectedHref}", actual "${linkHref}"`);

                softAssert.assert(async () => {
                  expect(linkHref.includes(expectedHref), `link href ${linkHref} not not contains "${expectedHref}"`).to.be.true;
                });
              }
              break;
            }
          }
          await softAssert.setScenario('Task attribute content link');
          await softAssert.assert(async () => expect(isLinkWithTextPresent).to.be.true, `${linktext} to include ${contentText}`);
        }
      } else {
        await softAssert.setScenario('Task attribute not displayed');
        await softAssert.assert(async () => expect(Object.keys(taskAttributes)).to.not.includes(attribName));
      }
      softAssert.finally();
    }
  });
});

When('I click next step {string} for task with name {string}', async function(linkText, taskName){
  await BrowserWaits.retryWithActionCallback(async () => {
    await caseDetailsTaskTabPage.clickTaskNextStepLink(taskName, linkText);
  });
});


const { isPresent } = require('../../../helpers/globals');
const caseFileViewPageObject = require('../pageObjects/caseFileViewPage');
const browserWaits = require('../../support/customWaits');

Then('In case file view tab, I see documents tree view', async function () {
  expect(await caseFileViewPageObject.docTreeContainer.isVisible()).to.be.true;
});

Then('In case file view tab, I see documents media view', async function () {
  expect(await caseFileViewPageObject.mediaViewContainer.isVisible()).to.be.true;
});

Then('In case file view tab, I see documents tree view header with text {string}', async function (headerText) {
  await browserWaits.retryWithActionCallback(async () => {
    expect(await caseFileViewPageObject.documentFolderHeader.textContent()).to.includes(headerText);
  });
});

Then('In case file view tab, I see documents sort icon displayed', async function () {
  expect(await caseFileViewPageObject.sortDocumentsIcon.isVisible()).to.be.true;
});

When('In case file view tab, I click documents sort icon', async function () {
  await caseFileViewPageObject.sortDocumentsIcon.click();
});

Then('In case file view tab, I see documents sort options menu displayed', async function () {
  expect(await caseFileViewPageObject.sortDocumentsMenuContainer.isVisible()).to.be.true;
});

Then('In case file view tab, I see documents sort options', async function (datatable) {
  const datatableHash = datatable.parse().hashes();

  for (const row of datatableHash) {
    expect(await caseFileViewPageObject.isSortMenuOptionDisplayed(row.option)).to.be.true;
  }
});

Then('In case file view tab, I dont see documents sort options', async function (datatable) {
  const datatableHash = datatable.parse().hashes();

  for (const row of datatableHash) {
    expect(await caseFileViewPageObject.isSortMenuOptionDisplayed(row.option)).to.be.false;
  }
});

Then('In case file view tab, I see tree view displays folder {string}', async function (folderPath) {
  const folderContainer = await caseFileViewPageObject.getFolderContainer(folderPath);
  expect(await folderContainer.isVisible()).to.be.true;
});

Then('In case file view tab, I see tree view displays folders', async function (datatable) {
  const datatableHash = datatable.parse().hashes();

  for (const row of datatableHash){
    const folderContainer = await caseFileViewPageObject.getFolderContainer(row.folderPath);
    expect(await folderContainer.isDisplayed()).to.be.true;
  }
});

Then('In case file view tab, I see tree view displays folder files count', async function (datatable) {
  const datatableHash = datatable.parse().hashes();

  for (const row of datatableHash) {
    const folderContainer = await caseFileViewPageObject.getFolderContainer(row.folderPath);
    expect(await folderContainer.nodeCountElement.textContent()).to.equal(row.count);
  }
});

Then('In case file view tab, I see files under folder {string}', async function (folderPath, datatable) {
  const datatableHash = datatable.parse().hashes();
  const folderContainer = await caseFileViewPageObject.getFolderContainer(folderPath);

  for (const row of datatableHash) {
    const fileContainer = await folderContainer.getChildFileContainer(row.file);
    expect(await fileContainer.fileElement.isVisible()).to.be.true;
  }
});

Then('In case file view tab, I see file upload stamp for files under folder {string}', async function (folderPath, datatable) {
  const datatableHash = datatable.parse().hashes();
  const folderContainer = await caseFileViewPageObject.getFolderContainer(folderPath);

  for (const row of datatableHash) {
    const fileContainer = await folderContainer.getChildFileContainer(row.file);
    expect(await isPresent(fileContainer.fileElement)).to.be.true;
    expect(await isPresent(fileContainer.fileUploadTimestamp)).to.be.true;
    // expect(await fileContainer.fileUploadTimestamp.textContent()).to.includes(row.uploadDate)
  }
});

Then('In case file view tab, I dont see file upload stamp for files under folder {string}', async function (folderPath, datatable) {
  const datatableHash = datatable.parse().hashes();
  const folderContainer = await caseFileViewPageObject.getFolderContainer(folderPath);

  for (const row of datatableHash) {
    const fileContainer = await folderContainer.getChildFileContainer(row.file);
    expect(await fileContainer.fileElement.isVisible()).to.be.true;
    expect(await fileContainer.fileUploadTimestamp.textContent()).to.equal('');
  }
});

When('In case file view tab, I select file {string} under folder {string}', async function (fileName, folderPath) {
  const folderContainer = await caseFileViewPageObject.getFolderContainer(folderPath);
  const fileContainer = await folderContainer.getChildFileContainer(fileName);
  await fileContainer.fileElement.click();
});

Then('In case file view tab, I see file {string} in media viewer', async function (fileName) {
  await browserWaits.retryWithActionCallback(async () => {
    const fileDisplayed = await caseFileViewPageObject.getFileDisplayedInMediaViewer();
    expect(fileDisplayed).to.includes(fileName);
  });
});

When('In case file view tab, I select file {string} under folder {string}, I see file in media viewer', async function (fileName, folderPath) {
  const folderContainer = await caseFileViewPageObject.getFolderContainer(folderPath);
  const fileContainer = await folderContainer.getChildFileContainer(fileName);
  await fileContainer.fileElement.click();
  await browserWaits.retryWithActionCallback(async () => {
    const fileDisplayed = await caseFileViewPageObject.getFileDisplayedInMediaViewer();
    expect(fileDisplayed !== '').to.be.true;
  });
});


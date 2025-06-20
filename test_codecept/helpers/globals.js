let currentPage = null;

function setPage(pageInstance) {
  currentPage = pageInstance;
}

function $(selector) {
  if (!currentPage) throw new Error('page is not set. Call setPage(page) first.');
  return currentPage.locator(selector);
}

function $$(selector) {
  if (!currentPage) throw new Error('page is not set. Call setPage(page) first.');
  return currentPage.locator(selector);
}

function elementByXpath(xpath) {
  if (!currentPage) throw new Error('page is not set. Call setPage(page) first.');
  return currentPage.locator(`xpath=${xpath}`);
}

// exactly the same as elementByXpath but used for code clarity
function elementsByXpath(xpath) {
  if (!currentPage) throw new Error('page is not set. Call setPage(page) first.');
  return currentPage.locator(`xpath=${xpath}`);
}

function elementByCss(selector) {
  if (!currentPage) throw new Error('page is not set. Call setPage(page) first.');
  return currentPage.locator(selector);
}

module.exports = {
  setPage,
  $,
  $$,
  elementByXpath,
  elementsByXpath,
  elementByCss
};
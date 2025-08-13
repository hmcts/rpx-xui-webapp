const { $ } = require('./globals');

function toLocator (elementFinder) {
  if (!elementFinder?.locator) {
    throw new Error('toLocator: argument is not an ElementFinder');
  }
  const sel = elementFinder.locator().value;
  return $(sel);
}

module.exports = { toLocator };
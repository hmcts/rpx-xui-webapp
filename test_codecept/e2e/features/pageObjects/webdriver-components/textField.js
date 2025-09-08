const { $, isPresent } = require('../../../../helpers/globals');
/**
 * WebDriver Text field component class
 */
const DEFAULT_TIMEOUT = 5000;
class TextField {
  /**
   * This css should be an <input> tag
   * @param css
   */
  constructor(css) {
    this.css = css;
  }

  /**
   * Enter text value into the text boy
   * @param text
   */
  async enterText(text) {
    await $(this.css).fill(text);
  }

  /**
   * Check the input tag is present
   * @returns {Promise<boolean|*>}
   */
  async isType(type) {
    return await $(this.css).getAttribute('type') === type;
  }

  /**
   * Check the input tag is present
   * @returns {Promise<boolean|*>}
   */
  async isPresent() {
    return await isPresent($(this.css));
  }

  /**
   * Check the input tag is displayed
   * @returns {Promise<boolean|*>}
   */
  async isDisplayed() {
    return await $(this.css).isVisible();
  }

  async waitForElementToBeInvisible(page, timeout = DEFAULT_TIMEOUT) {
    try {
      const locator = page.locator(this.css);
      await locator.waitFor({ state: 'hidden', timeout });
      return true;
    } catch (e) {
      const message = `timed out after ${timeout}ms waiting for element "${this.css}" to be invisible`;
      throw new CustomError(message, e);
    }
  }

  async waitForElementToBeVisible(page, timeout= DEFAULT_TIMEOUT) {
  try {
    const locator = page.locator(this.css);
    await locator.waitFor({ state: 'visible', timeout });
    return true;
  } catch (e) {
    const message = `timed out after ${timeout}ms waiting for element "${this.css}" to be visible`;
    throw new CustomError(message, e);
  }
}

  /**
   * Clear contents of an input field
   */
  async clearField() {
    await $(this.css).clear();
  }

  /**
   * Get value of text box contents
   * @returns {Promise<String>}
   */
  async getText() {
    return await $(this.css).getAttribute('value');
  }
}

module.exports = TextField;

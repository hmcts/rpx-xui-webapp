const { $, isPresent } = require('../../../../helpers/globals');
/**
 * WebDriver Radio field component class
 */
const DEFAULT_TIMEOUT = 5000;
class RadioField{
  /**
   * This css should be an <input> tag
   * @param css
   * @param radioButtonId
   */
  constructor(css, radioButtonId){
    this.css = css;
    this.wrapperXPath = `//ccd-field-write[div/ccd-write-yes-no-field//*[@id="${radioButtonId}"]]`;
  }

  /**
   * Click value
   * @param text
   */
  async click(){
    await $(this.css).click();
  }

  async waitForElementToBeInvisible(page, timeout = DEFAULT_TIMEOUT) {
  try {
    const locator = page.locator(this.wrapperXPath);
    await locator.waitFor({ state: 'hidden', timeout });
    return true;
  } catch (e) {
    const message = `timed out after ${timeout}ms waiting for radio element "${this.wrapperXPath}" to be invisible`;
    throw new CustomError(message, e);
  }
}

async waitForElementToBeVisible(page, timeout = DEFAULT_TIMEOUT) {
  try {
    const locator = page.locator(this.wrapperXPath);
    await locator.waitFor({ state: 'visible', timeout });
    return true;
  } catch (e) {
    const message = `timed out after ${timeout}ms waiting for radio element "${this.wrapperXPath}" to be visible`;
    throw new CustomError(message, e);
  }
}

  /**
   * Check the input tag is present
   * @returns {Promise<boolean|*>}
   */
  async isPresent(){
    return await isPresent($(this.css));
  }

  /**
   * Check the input tag is enabled
   * @returns {Promise<boolean|*>}
   */
  async isEnabled(){
    return await $(this.css).isEnabled();
  }
}

module.exports = RadioField;

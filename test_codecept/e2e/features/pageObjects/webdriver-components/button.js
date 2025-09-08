const { $, elementByCss, elementByXpath, getText, isPresent } = require('../../../../helpers/globals');
CustomError = require('../../../utils/errors/custom-error.js');
/**
 * WebDriver Button component class
 */
const DEFAULT_TIMEOUT = 5000;
class Button{
  /**
   * This css and content should be an <button> tag
   * @param css
   * @param content
   */
  constructor(css, content){
    this.css = css;
    this.content = content;
    this.xpath = `.//*[contains(text(), '${this.content}')]`;
  }

  /**
   * Checks if the button is present
   * @returns {Promise<Boolean>}
   */
  async isPresent(){
    const button = await this._getElementFinder();
    return await isPresent(button);
  }

  /**
   * Checks if the button is enabled
   * @returns {Promise<Boolean>}
   */
  async isEnabled(){
    const button = await this._getElementFinder();
    return await button.isEnabled();
  }

  async isDisplayed(){
    let displayed = null;
    try {
      displayed = await $(this.css).isVisible();
    } catch (e) {
      if (e.name === 'NoSuchElementError'){
        displayed = false; //element not present so not displayed
      } else {
        throw new CustomError(e);
      }
    }

    return displayed;
  }

  /**
   * Click Button element
   */
  async click(){
    const button = await this._getElementFinder();
    await button.click();
  }

  /**
   * Gets button text
   * @returns {Promise<String>}
   */
  async getText(){
    return await getText($(this.css));
  }

  async _getElementFinder() {
    return this.content ? elementByXpath(this.xpath) : elementByCss(this.css);
  }
}

module.exports = Button;

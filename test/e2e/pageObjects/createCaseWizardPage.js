BasePage = require('./basePage');
Button = require('./webdriver-components/button.js');

class CreateCaseWizardPage extends BasePage{


    constructor() {
      super();
      this.continueButton = new Button('button[type=submit]');
      this.collectionAddNewElementButtonXPathTemplate = '//ccd-write-collection-field/*[@id="COLLECTION-ID-PLACEHOLDER"]/div/button[1]'; //MySchool_Class
      this.CollectionNewButton = new Button('.button', 'Add new');
      this.answerValueXpathTemplate = '//span[text()="LABEL-TEXT-PLACEHOLDER"]/../following-sibling::td//ccd-field-read-label/*';
      this.answerChangeLinkXpathTemplate = '//span[text()="LABEL-TEXT-PLACEHOLDER"]/../../td[2]/a';
      this.fieldLabels = 'fieldset span';
      this.greyBarFieldLabels = '.show-condition-grey-bar span';
      this.topErrorBox = '.error-summary';
      this.fieldError = '.error-message';
      this.header = '.page .heading-h1';
    }

    async fieldLabelContains(fieldDataType, fieldId, labelText) {
      return await new FieldUtils().fieldLabelContains(fieldDataType, fieldId, labelText);
    }

    async isTextFieldHiddenById(fieldId) {
      return await new FieldUtils().textFieldIsHidden(fieldId);
    }

  /**
   * Check that a particular field type is present on the current wizard page
   * @param fieldDataType
   * @returns {Promise<promise.Promise<boolean> | !webdriver.promise.Promise<boolean> | jQuery>}
   */
  async isFieldPresent(fieldDataType, id){
    return await new FieldUtils().isFieldPresent(fieldDataType, id);
  }
    async clickCollectionAddNewButton(collectionFieldId) {
      let xpathLocator = await this.collectionAddNewElementButtonXPathTemplate.replace('COLLECTION-ID-PLACEHOLDER', collectionFieldId);
      await element(by.xpath(xpathLocator)).click();
    }

  /**
   * Get contents of number field
   * @returns {Promise<Promise<*>|Promise<String>>}
   */
    async getNumberFieldValue(){
      return await this.fieldUtils.getNumberFieldValue();
    }

  /**
   * Button to progress the case, may be called continue or may be the final
   * Submit button with a different name as it can be dynamic
   * @returns {Promise<void>}
   */
    async clickContinueButton(){
        await this.continueButton.click();
    }

  /**
   * Final button to submit the case/event
   * @returns {Promise<void>}
   */
    async clickSubmitCaseButton(){
        await this.continueButton.click();
        //await new CaseDetailsPage().waitForPageToLoad();
    }

    async getFieldLabels(){
        let labelElements = await $$(this.fieldLabels);
        let labels = [];
        for (const labelElem of labelElements){
            let labelText = await labelElem.getText();
            let label = labelText.replace(' (Optional)', '');
            labels.push(label)
        }

        return labels;
    }

    async getGreyBarFieldLabels(){
      let labelElements = await $$(this.greyBarFieldLabels);
      let labels = [];
      for (const labelElem of labelElements){
        let labelText = await labelElem.getText();
        let label = labelText.replace(' (Optional)', '');
        labels.push(label)
      }

      return labels;
    }

    async getCheckYourAnswersValueByLabel(labelText){
      let label = await labelText.replace(' (Optional)','');
      let xpathLocator = await this.answerValueXpathTemplate.replace('LABEL-TEXT-PLACEHOLDER',label);

      return await element(by.xpath(xpathLocator.toString())).getText();
    }

    async clickChangeLink(labelText){
      let label = await labelText.replace(' (Optional)','');
      let xpathLocator = await this.answerChangeLinkXpathTemplate.replace('LABEL-TEXT-PLACEHOLDER',label);
      await element(by.xpath(xpathLocator)).click();
    }

    async getPageHeader(){
      return await $(this.header).getText();
    }

    async errorSummaryDispalyed() {
      return await this.elementDisplayed($(this.topErrorBox));
    }

    async fieldErrorDispalyed() {
      return await this.elementDisplayed($(this.fieldError));
    }

    async continueButtonEnabled(){
      return await this.continueButton.isEnabled();
    }

    async continueButtonDisplayed(){
      return await this.continueButton.isDisplayed();
    }

    async clickGenericCollectionAddNewButton() {
      await this.CollectionNewButton.click();
    }

  async amOnPage(){
    let header = await this.getPageHeader();
    return header === 'Case Details - Appeal created'
  }

}

module.exports = CreateCaseWizardPage;

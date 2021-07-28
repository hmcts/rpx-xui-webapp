
const BrowserWaits = require("../../../support/customWaits");

class CheckYourAnswersPage{

    constructor(){
        this.container = $('exui-check-answers exui-answers');
        this.header = this.container.$('h1');
        this.headerCaption = this.header .$('span');

        this.hintText = this.container.$('.govuk-hint');

        this.summaryListContainer = this.container.$('.govuk-summary-list');
        this.questionRows = this.container.$$('.govuk-summary-list__row');
        this.submitButton = $(".govuk-button-group button");
        this.cancelLink = $(".govuk-button-group p>a");

    }

    async getTotalQuestionsCount(){
        return await this.questionRows.count();
    }

    async isSubmitButtonWithLabelPresent(label){
        return await this.getSubmitButtonElementWithLabel(label).isPresent();
    }

    async clickSubmitButtonWithLabel(label){
        await this.getSubmitButtonElementWithLabel(label).click()
    }

    async clickCancelLink(){
        await element(by.xpath(`//div[contains(@class,'govuk-button-group')]//p/a[contains(text(),'Cancel')]`)).click();
    }

    getSubmitButtonElementWithLabel(label){
        return element(by.xpath(`//div[contains(@class,'govuk-button-group')]//button[contains(text(),'${label}')]`));
    }

    async isDisplayed(){
        return this.container.isDisplayed();
    }

    async getHeaderText(){
        await BrowserWaits.waitForElement(this.container);
        return await this.header.getText();
    }

    async getHeaderCaption() {
        await BrowserWaits.waitForElement(this.container);
        return await this.headerCaption.getText();
    }

    async getHintText() {
        await BrowserWaits.waitForElement(this.container);
        return await this.hintText.getText();
    }

    async isSummayListPresent(){
        await BrowserWaits.waitForElement(this.container);
        return await this.summaryListContainer.isPresent();
    }

    async isQuestionRowPresent(question){
        await BrowserWaits.waitForElement(this.container);

        const rowWithQuestion = this.getRowElementWithQuestion(question);
        return await rowWithQuestion.isPresent();
    }

    async getAnswerForQuestion(question) {
        await BrowserWaits.waitForElement(this.container);
        
        const rowWithQuestion = this.getRowElementWithQuestion(question);
        if(!(await rowWithQuestion.isPresent())){
            throw new Error("Question is now found in page");
        }
        const answer = await rowWithQuestion.$('.govuk-summary-list__value').getText();
        return answer;
    }

    async isChangeLinkPresentForQuestion(question) {
        await BrowserWaits.waitForElement(this.container);

        const rowWithQuestion = this.getRowElementWithQuestion(question);
        if (!(await rowWithQuestion.isPresent())) {
            throw new Error("Question is now found in page");
        }
        return await rowWithQuestion.$('.govuk-summary-list__actions a').isPresent();
    }

    async clickChangeForQuestion(question) {
        await BrowserWaits.waitForElement(this.container);

        const rowWithQuestion = this.getRowElementWithQuestion(question);
        if (!(await rowWithQuestion.isPresent())) {
            throw new Error("Question is now found in page");
        }
        await rowWithQuestion.$('.govuk-summary-list__actions a').click();
    }

    getRowElementWithQuestion(question){
        return this.summaryListContainer.element(by.xpath(`//*[contains(@class,'govuk-summary-list__row')]//dt[contains(@class,'govuk-summary-list__key') and contains(text(),'${question}')]//ancestor::div[contains(@class,'govuk-summary-list__row')]`));
    }

}

module.exports = new CheckYourAnswersPage();

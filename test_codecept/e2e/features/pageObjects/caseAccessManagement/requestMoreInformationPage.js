

class SARRequestMoreInformationPage{
    constructor(){
        this.header = $('exui-specific-access-information h1');
        this.headerCaption = $('exui-specific-access-information h1 span')
        this.hint = $('exui-specific-access-information .govuk-hint');

        this.textArea = $('exui-specific-access-information textarea');

    }

    async isDisplayed(){
        return await this.header.isDisplayed(); 
    }


    async enterInTextArea(text) {
        return await this.textArea.sendKeys(text);
    }
}

module.exports = new SARRequestMoreInformationPage();

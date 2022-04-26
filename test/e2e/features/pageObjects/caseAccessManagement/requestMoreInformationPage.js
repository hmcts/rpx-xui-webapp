

class SARRequestMoreInformationPage{
    constructor(){
        this.header = $('exui-specific-access-information h1');
        this.headerCaption = $('exui-specific-access-information h1 span')
        this.hint = $('exui-specific-access-information .govuk-hint');

        this.textArea = $('exui-specific-access-information textarea');

    }
}

module.exports = new SARRequestMoreInformationPage();

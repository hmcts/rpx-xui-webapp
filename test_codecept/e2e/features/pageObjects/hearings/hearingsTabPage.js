

class HearingsTab{

    constructor(){
        this.tabContainer = $('exui-case-hearings')
    }


    async isHearingsTabDisplayed(){
        return await this.tabContainer.isDisplayed()
    }


}

module.exports = new HearingsTab();




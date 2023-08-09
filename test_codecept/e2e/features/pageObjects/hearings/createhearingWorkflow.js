

class CreateHearingWorkflow{

    constructor(){
        this.createhearingContainer = $('exui-request-hearing')
    }

    async isCreateHearingWorkflowDIsplayed(){
        return await this.createhearingContainer.isDisplayed();
    }

}

module.exports = new CreateHearingWorkflow();

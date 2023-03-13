


const browserUtil = require('../../../../ngIntegration/util/browserUtil');
class CaseDetailsTaskTab{

    constructor(){
        this.container = $('exui-tasks-container');
        this.alertBanner = $('exui-tasks-container exui-task-alert-banner');
        this.alertBannerHeading = $('.task-alert-banner h2');
        this.alertBannerMessage = $('.task-alert-banner .govuk-warning-text');

        this.activeTasksContainer = $('exui-tasks-container .active-tasks-container');

        this.activeTasksHeading = $('exui-tasks-container .active-tasks-container h2');

        this.tasks = $$('exui-tasks-container .active-tasks-container exui-case-task');

        this.taskNameLocator = 'p strong';
    }


    async getTaskContainerAtPosition(pos){
        const taskCount = await this.tasks.count();
        if (taskCount < pos ){
            throw new Error(`Total Tasks displayed are ${taskCount}. Cannot get task at position ${pos}`);
        }
        return await this.tasks.get(pos - 1);
    }

    async getTaskNameForTaskAtPosition(pos){
        const taskContainer = await this.getTaskContainerAtPosition(pos);
        await browserUtil.scrollToElement(taskContainer);
        const taskName = await taskContainer.$(this.taskNameLocator).getText();
        return taskName;
    }

    async getTaskContainerWithName(name){
        const taskCount = await this.tasks.count();
        let returnVal = null;

        const tasksInPage = [];
        for (let i = 0; i < taskCount; i++){
            const task = await this.tasks.get(i);
            const taskName = await task.$(this.taskNameLocator).getText();
            tasksInPage.push(taskName);
            if (taskName.includes(name)){
                returnVal = task;
                break;
            }
        }
        if (returnVal === null){
            throw new Error(`Task with name ${name} not found. ${tasksInPage.join(',')}`);
        }
        return returnVal;
    }


    async isAttributeDisplayedForTaskAtPos(pos, attributeName){
        const taskAttributes = await this.getAttributeElementssDisplayedForTaskAtPos(pos); 
        return Object.keys(taskAttributes).includes(attributeName);
    }

    async isAttributeDisplayedForTaskWithName(name, attributeName){
        const taskAttributes = await this.getAttributesDisplayedForTaskWithName(name);
        return Object.keys(taskAttributes).includes(attributeName);
    }

    async getAttributeValueForAtPos(pos, attributeName) {
        const taskAttributes = await this.getAttributeElementssDisplayedForTaskAtPos(pos);
        return await taskAttributes[attributeName].getText();;
    }

    async getAttributeValueForTaskWithName(name, attributeName) {
        const taskAttributes = await this.getAttributesDisplayedForTaskWithName(name);
        return await taskAttributes[attributeName].getText();;
    }

    async clickLinkFromTaskAttribute(taskAttributes,attributeName,linktext){
        const attribuetLink = await this.getAttributeLink(taskAttributes, attributeName, linktext);
        if (attribuetLink === null){
            throw new Error(`Attribute link ${linktext} not is present`);
        }
        await attribuetLink.click();
    }

    async getAttributeLink(taskAttributes, attributeName, linktext){
        const manageLinks = taskAttributes[attributeName].$$('a');
        const linksCount = await manageLinks.count();
        let linkElementToClick = null;
        let linksdisplayed = ';'
        for (let i = 0; i < linksCount; i++) {
            const linkElement = await manageLinks.get(i);
            const linkElementText = await linkElement.getText();
            linksdisplayed = `${linksdisplayed}, ${linkElementText}`
            if (linkElementText.includes(linktext)) {
                linkElementToClick = linkElement;
                break;
            }
        }

        return linkElementToClick;
    }

    async getAttributesDisplayedForTaskWithName(taskName){
        const taskContainer = await this.getTaskContainerWithName(taskName);
        return await this.getTaskAttributeElementsFromTaskContainer(taskContainer);
    }

    async getAttributeElementssDisplayedForTaskAtPos(pos) {
        const taskContainer = await this.getTaskContainerAtPosition(pos);
        return await this.getTaskAttributeElementsFromTaskContainer(taskContainer);
    }

    async getTaskAttributeElementsFromTaskContainer(taskContainer){
        const taskDetailsRows = taskContainer.$$('.govuk-summary-list__row');
        let rowsCount = await taskDetailsRows.count();
        const attributeElements = {};
        for (let i = 0; i < rowsCount ; i ++){
            const row = taskDetailsRows.get(i);
            const rowName = await row.$('.govuk-summary-list__key').getText();
            attributeElements[rowName] = row.$('.govuk-summary-list__value');
        }

        return attributeElements;
    }

    async clickTaskNextStepLink(taskName, linkText){
        const attributes = await this.getAttributesDisplayedForTaskWithName(taskName);
        const link = await this.getAttributeLink(attributes, 'Next steps', linkText);
        await link.click();
    }

}

module.exports = new CaseDetailsTaskTab();

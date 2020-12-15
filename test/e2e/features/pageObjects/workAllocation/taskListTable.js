const BrowserWaits = require('../../../support/customWaits');


class TaskListTable{

    constructor(){
        this.table = $('');
    }

    async waitForTable(){
        await BrowserWaits.waitForElement(this.table);
    }

    async isTableDisplayed(){
        return await this.table.isPresent(); 
    }
}

module.exports = TaskListTable; 
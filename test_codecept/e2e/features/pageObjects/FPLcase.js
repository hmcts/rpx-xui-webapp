
var CaseManager = require("./common/CaseManager");

class FPLCase {

    constructor() {
        this.caseManager = new CaseManager();
    }

    async createCase(isAccessibilityTest) {
        var caseData = {
        };


        await this.caseManager.createCase(caseData, isAccessibilityTest);
    }



}

module.exports = FPLCase;
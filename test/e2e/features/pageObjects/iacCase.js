
var CaseManager = require("./common/CaseManager");

class IACCase {

    constructor() {
        this.caseManager = new CaseManager();
    }

    async createCase(isAccessibilityTest) {
        var caseData = {
            "Home Office Reference/Case ID" : "012345678",
            "Appeal number[0]." : "IA123451234",
            "Has your client appealed against any other UK immigration decisions?": "No"
        };


        await this.caseManager.createCase(caseData, isAccessibilityTest);
    }



}

module.exports = IACCase;
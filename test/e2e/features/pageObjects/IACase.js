
var CaseManager = require("./common/CaseManager");

class IACase {

    constructor() {
        this.caseManager = new CaseManager();
    }

    async createCase(caseType) {
        var caseData = {
            
        };
        await this.caseManager.createCase(caseData);
    }
}

module.exports = IACase;
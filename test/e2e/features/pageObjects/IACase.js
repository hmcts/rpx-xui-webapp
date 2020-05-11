
var CaseManager = require("./common/CaseManager");

class IACase {

    constructor() {
        this.caseManager = new CaseManager();
    }

    async createCase(caseType) {
        var caseData = {
           "Home Office reference":"A1234567/001" 
        };
        await this.caseManager.createCase(caseData);
    }
}

module.exports = IACase;
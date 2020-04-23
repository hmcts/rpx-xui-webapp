
var CaseManager = require("./common/CaseManager");

class PublicLawCase {

    constructor() {
        this.caseManager = new CaseManager();
    }

    async createCase(caseType) {
        var caseData = {
        };


        await this.caseManager.createCase(caseData);
    }



}

module.exports = PublicLawCase;

var CaseManager = require("./common/CaseManager");

class DivorceCase {

    constructor() {
        this.caseManager = new CaseManager();
    }

    async createCase(caseType) {
        var caseData = {
            'Petitioner Solicitor Phone number':'0987654321',
            'Marriage date':'01-01-2005',
            'Fact': '5-year separation',
            'Date the petitioner decided the marriage was over':'01-01-2011',
            'Date the petitioner and respondent started living apart': '01-01-2012'
        };
        await this.caseManager.createCase(caseData);
    }
}

module.exports = DivorceCase;
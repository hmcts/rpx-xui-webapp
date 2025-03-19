
const CaseManager = require('./common/CaseManager');

class ProbateCase {
  constructor() {
    this.caseManager = new CaseManager();
  }

  async createCase(isAccessibilityTest) {
    const caseData = {
    };

    await this.caseManager.createCase(caseData, isAccessibilityTest);
  }
}

module.exports = ProbateCase;

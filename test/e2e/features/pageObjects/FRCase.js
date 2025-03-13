const CaseManager = require('./common/CaseManager');

class FRCase {
  constructor(){
    this.caseManager = new CaseManager();
  }

  async createCase(isAccessibilityTest){
    const caseData = {
      'Divorce Case Number': 'BV18D00152'
    };
    await this.caseManager.createCase(caseData, isAccessibilityTest);
  }
}

module.exports = FRCase;

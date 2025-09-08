
const { $, elementByXpath, elementsByXpath, getText, selectOption, getXUITestPage } = require('../../../../../helpers/globals');
const reportLogger = require('../../../../../codeceptCommon/reportLogger');
const partyCaseFlags = require('./partyCaseFlagsTable');

class ParticipantAttendancePage {
  get pageContainer() { return $('exui-hearing-attendance'); }
  get partiesContainer() { return $('div[formGroupName="parties"]'); }

  get paperHearingYes() { return $('#paperHearingYes'); }
  get paperHearingNo() { return $('#paperHearingNo'); }
  get methodOfAttendance() { return $('#checkbox-addition-facility'); }
  get attendanceNumber() { return $('#attendance-number'); }

  get fieldMapping() {
    return {
      'Will this be a paper hearing?':
        elementByXpath('//h3[contains(text(), "Will this be a paper hearing?")]'),

      'What will be the methods of attendance for this hearing?':
        elementByXpath('//h1[contains(text(), "What will be the methods of attendance for this hearing?")]'),

      'How will each participant attend the hearing?':
        elementByXpath('//label[contains(text(), "How will each participant attend the hearing?")]'),

      'How many people will attend the hearing in person?':
        elementByXpath('//label[contains(text(), "How many people will attend the hearing in person?")]')
    };
  }

  async inputValue(field, value) {
    reportLogger.AddMessage(`input to field ${field}`);
    switch (field) {
      case 'Will this be a paper hearing?':
        if (value.toLowerCase().includes('yes')) {
          await this.paperHearingYes.first().check();
        } else {
          await this.paperHearingNo.first().check();
        }
        break;
      case 'What will be the methods of attendance for this hearing?':
        const values = value.split(',');
        for (const val of values) {
          await this.slectMethodOfHearing(val.trim());
        }
        break;
      case 'How will each participant attend the hearing?':
        const valueMap = value.split(',');
        await this.selectParticipantHearingMethod(valueMap[0].trim(), valueMap[1].trim());
        break;
      case 'How many people will attend the hearing in person?':
        await this.enterAttendanceNumber(value);
        break;

      default:
        throw new Error(`${field} is not recognised`);
    }
  }

  async isVisible() {
    return await this.pageContainer.isVisible();
  }

  async validateFieldsDisplayed() {
    expect(await this.paperHearingYes.isVisible(), 'Radio button not displayed').to.be.true;
    expect(await this.paperHearingNo.isVisible(), 'Radio button not displayed').to.be.true;
    expect(await this.methodOfAttendanceForHearing.isVisible(), 'not displayed: What will be the methods of attendance for this hearing?').to.be.true;
    expect(await this.partiesContainer.isVisible(), 'Parties list not displayed').to.be.true;
    expect(await this.attendanceNumber.isVisible(), 'attendance count not displayed').to.be.true;
  }

  async selectIsPaperhearing(booleanValue) {
    if (booleanValue) {
      await this.paperHearingYes.first().check();
    } else {
      await this.paperHearingNo.first().check();
    }
  }

  async slectMethodOfHearing(method) {
    const ele = elementByXpath(`//div[@id='checkbox-addition-facility']//label[contains(text(),'${method}')]/../input`);
    await ele.click();
  }

  async selectParticipantHearingMethod(partyname, method) {
    const ele = elementByXpath(`//div[contains(@class,'party-row')]//label[contains(text(),'${partyname}')]/../select`);
    await selectOption(ele, method);
  }

  async getPartiesDisplayed() {
    const elements = elementsByXpath('//div[contains(@class,\'party-row\')]//label');
    const parties = [];
    const count = await elements.count();
    for (let i = 0; i < count; i++) {
      const e = await elements.nth(i);
      parties.push(await getText(e));
    }
    return parties;
  }

  async isPartyWithNameDisplayed(partyname) {
    const ele = elementByXpath(`//div[contains(@class,'party-row')]//label[contains(text(),'${partyname}')]`);
    await ele.isVisible();
  }

  async enterAttendanceNumber(count) {
    await this.attendanceNumber.fill(count);
  }

  async getPartiesWithCaseFlagsDisplayed() {
    return await partyCaseFlags.getPartiesWithCaseFlagsDisplayed();
  }

  async getCaseFlagsDisplayedForParty(partyName) {
    return await partyCaseFlags.getCaseFlagsDisplayedForParty(partyName);
  }
}

module.exports = ParticipantAttendancePage;

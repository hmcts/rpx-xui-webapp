const { $, elementByXpath } = require('../../../../../helpers/globals');

class HearingTimingPage {
  get pageContainer()                       { return $('exui-hearing-timing'); }

  get durationDays()                        { return $('#hearing-length #durationdays'); }
  get durationHours()                       { return $('#hearing-length #durationhours'); }
  get durationMinutes()                     { return $('#hearing-length #durationmins'); }

  get noSpecificDate()                      { return $('#hearing-specific-dates #noSpecificDate'); }
  get hearingSingleDate()                   { return $('#hearing-specific-dates #hearingSingleDate'); }
  get hearingDateRange()                    { return $('#hearing-specific-dates #hearingDateRange'); }

  get firstHearingDate_day()                { return $("input[name='firstHearingDate-day']"); }
  get firstHearingDate_month()              { return $("input[name='firstHearingDate-month']"); }
  get firstHearingDate_year()               { return $("input[name='firstHearingDate-year']"); }

  get earliestHearingDate_day()             { return $("input[name='earliestHearingDate-day']"); }
  get earliestHearingDate_month()           { return $("input[name='earliestHearingDate-month']"); }
  get earliestHearingDate_year()            { return $("input[name='earliestHearingDate-year']"); }

  get latestHearingDate_day()               { return $("input[name='latestHearingDate-day']"); }
  get latestHearingDate_month()             { return $("input[name='latestHearingDate-month']"); }
  get latestHearingDate_year()              { return $("input[name='latestHearingDate-year']"); }

  get firstDateHearingAmendedLabel()        { return $('#first-date-amendment-label'); }
  get earliestHearingDateAmendedLabel()     { return $('#earliest-hearing-date-amendment-label'); }
  get latestHearingDateAmendedLabel()       { return $('#latest-hearing-date-amendment-label'); }
  get specificHearingDateAmendedLabel()     { return $('#hearing-specific-dates-label'); }
  get lengthOfHearingAmendedLabel()         { return $('#length-of-hearing-label'); }
  get hearingPriorityAmendmentLabel()       { return $('#hearing-priority-amendment-label'); }

  get fieldMapping() {
    return {
      'Length of hearing'                                              : $('#hearing-length'),
      'Does the hearing need to take place on a specific date?'        : $('#hearing-specific-dates'),
      'What is the priority of this hearing?'                          : $('#hearing-priority'),
      'The first date of the hearing must be'                          : $('#firstHearingDate-date'),
      'Earliest start date'                                            : $('#earliestHearingDate-date'),
      'Latest end date'                                                : $('#latestHearingDate-date')
    };
  }

  async isDisplayed() {
    return await this.pageContainer.isVisible();
  }

  async getEarliestDate(){
    const date = await this.earliestHearingDate_day.getAttribute('value');
    const month = await this.earliestHearingDate_month.getAttribute('value');
    const year = await this.earliestHearingDate_year.getAttribute('value');
    return `${date}-${month}-${year}`;
  }

  async getLatestate() {
    const date = await this.latestHearingDate_day.getAttribute('value');
    const month = await this.latestHearingDate_month.getAttribute('value');
    const year = await this.latestHearingDate_year.getAttribute('value');
    return `${date}-${month}-${year}`;
  }

  async inputValue(field, value) {
    switch (field) {
      case 'Length of hearing':
        const valueMap = value.split(',');
        await this.durationDays.fill(valueMap[0].trim());
        await this.durationHours.fill(valueMap[1].trim());
        await this.durationMinutes.fill(valueMap[2].trim());
        break;
      case 'Does the hearing need to take place on a specific date?':
        const opt = value.toLowerCase().trim();
        if (opt.includes('no')){
          await this.noSpecificDate.click();
        } else if (opt.includes('yes')){
          await this.hearingSingleDate.click();
        } else if (opt.includes('choose a date range')) {
          await this.hearingDateRange.click();
        } else {
          throw new Error(`Unrecognised option for ${field}`);
        }
        break;
      case 'What is the priority of this hearing?':
        await this.selectHearingPriority(value.trim());
        break;
      case 'The first date of the hearing must be':
        const firstDateMap = value.split(',');
        await this.firstHearingDate_day.fill(firstDateMap[0].trim());
        await this.firstHearingDate_month.fill(firstDateMap[1].trim());
        await this.firstHearingDate_year.fill(firstDateMap[2].trim());
        break;
      case 'Earliest start date':
        const earliestDate = value.split(',');
        await this.earliestHearingDate_day.fill(earliestDate[0].trim());
        await this.earliestHearingDate_month.fill(earliestDate[1].trim());
        await this.earliestHearingDate_year.fill(earliestDate[2].trim());
        break;
      case 'Latest end date':
        const latestEndDate = value.split(',');
        await this.latestHearingDate_day.fill(latestEndDate[0].trim());
        await this.latestHearingDate_month.fill(latestEndDate[1].trim());
        await this.latestHearingDate_year.fill(latestEndDate[2].trim());
        break;
      default:
        throw new Error(`${field} not recognised.`);
    }
  }

  async selectHearingPriority(priority){
    const ele = elementByXpath(`//fieldset[@id='hearing-priority']//label[contains(text(),'${priority}')]/../input`);
    await ele.click();
  }

  async isActionNeededLabelDisplayedForField(fieldName){
    let retVal = false;
    switch (fieldName){
      case 'The first date of the hearing must be':
        retVal = await this.firstDateHearingAmendedLabel.isVisible();
        break;
      case 'Length of hearing':
        retVal = await this.lengthOfHearingAmendedLabel.isVisible();
        break;
      case 'Does the hearing need to take place on a specific date?':
        retVal = await this.specificHearingDateAmendedLabel.isVisible();
        break;
      case 'What is the priority of this hearing?':
        retVal = await this.hearingPriorityAmendmentLabel.isVisible();
        break;
      case 'Earliest start date':
        retVal = await this.earliestHearingDateAmendedLabel.isVisible();
        break;
      case 'Latest end date':
        retVal = await this.latestHearingDateAmendedLabel.isVisible();
        break;
      default:
    }

    return retVal;
  }
}

module.exports = HearingTimingPage;

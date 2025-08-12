const { $, elementByXpath } = require('../../../../../helpers/globals');

class HearingVenueDetailsPage {
  get pageContainer() { return $('exui-hearing-venue'); }

  get locationSearchInput() { return $('xuilib-search-venue input'); }

  get addLocationBtn() {
    return elementByXpath("//exui-hearing-venue//a[contains(text(),'Add location')]");
  }

  get fieldMapping() {
    return {
      'Search for a location by name': $('div.search-location')
    };
  }

  async inputValue(field, value) {
    switch (field) {
      case 'Search for a location by name':
        const values = value.split(',');
        await this.locationSearchInput.type(values[0], { delay: 75 });
        await this.selectLocation(values[1]);
        await this.addLocationBtn.click();
        break;
      default:
        throw new Error(`${field} is not recognised`);
    }
  }

  async isDisplayed() {
    return await this.pageContainer.isVisible();
  }

  async selectLocation(location) {
    // 1. wait for the overlay container to become visible
    const panel = $('.mat-autocomplete-panel');
    await panel.waitFor({ state: 'visible', timeout: 10_000 });

    // 2. wait for the specific option inside the panel
    const option = elementByXpath(
      `//div[contains(@class,'mat-autocomplete-panel')]` +
      `//mat-option//span[normalize-space(text())='${location}']`
    );
    await option.waitFor({ state: 'visible', timeout: 10_000 });

    // 3. click it
    await option.click();
  }
}

module.exports = HearingVenueDetailsPage;

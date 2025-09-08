const { $, isPresent } = require('../../../../helpers/globals');

class Application{
  get loadingSpinner() {
    return $('.loading-spinner-in-action');
  }

  async isSpinnerDisplayed(){
    return await isPresent(this.loadingSpinner);
  }
}

module.exports = Application;

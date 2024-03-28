const jwt = require('jsonwebtoken');
const reportLogger = require('../../e2e/support/reportLogger');
// const addContext = require('mochawesome/addContext');
const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));

const axios = require('axios');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

axios.defaults.headers.common['Content-Type'] = 'application/json';
const axiosOptions = {

};
axios.defaults.withCredentials = true;

const http = axios.create(axiosOptions);
const nodeAppMockData = require('../../nodeMock/nodeApp/mockData');
class BrowserUtil{
  async gotoHomePage(){
    const baseUrl = argv.debug ? 'http://localhost:3000/': 'http://localhost:4200/';
    await browser.get(baseUrl);
  }

  setAuthCookie(){
    const token = jwt.sign({
      data: 'foobar'
    }, 'secret', { expiresIn: 60 * 60 });
    this.addCookie('__auth__', token);
  }

  addCookie(cookieName, cookieVal){
    const cookie = {
      name: cookieName,
      value: cookieVal,
      domain: 'localhost:4200',
      path: '/',
      httpOnly: false,
      secure: false,
      session: true
    };
    browser.manage().addCookie(cookie);
  }

  async browserInitWithAuth(roles){
    await this.gotoHomePage();
    this.setAuthCookie();

    if (roles){
      console.log('j:' + JSON.stringify(roles));
      const encodedRoles = encodeURIComponent('j:' + JSON.stringify(roles));
      console.log(encodedRoles);
      this.addCookie('roles', encodedRoles);
    }

    // await this.gotoHomePage();
  }

  setUserDetailsWithRoles(rolesArray) {
    nodeAppMockData.getUserDetailsWithRoles(rolesArray);
  }

  async waitForLD(){
    try {
      return await this.waitForNetworkResponse('app.launchdarkly.com/sdk/evalx');
    } catch (err){
      reportLogger.AddMessage(err);
      console.log(err);
      return false;
    }
  }

  onLDReceivedLogFeatureValue(name){
    let togglesToLogs = global.scenarioData.featureToggleToLog;
    if (!togglesToLogs){
      global.scenarioData.featureToggleToLog = [];
      togglesToLogs = global.scenarioData.featureToggleToLog;
    }
    togglesToLogs.push(name);
  }

  async waitForNetworkResponse(url){
    const startTime = new Date();
    let elapsedTime = 0;
    let ldDone = false;
    while (!ldDone && elapsedTime < 15) {
      const perf = await browser.executeScript('return window.performance.getEntriesByType(\'resource\')');
      if (!perf){
        break;
      }
      for (let i = 0; i < perf.length; i++) {
        reportLogger.AddMessage(elapsedTime + ' ::Retrieved ' + perf[i].name);
        if (perf[i].name.includes(url)) {
          ldDone = true;
          await this.stepWithRetry(async () => global.scenarioData.featureToggles = (await http.get(perf[i].name, {})).data, 3, 'Get LD feature toggles request');
          // await browser.sleep(2000);
          reportLogger.AddMessage('LD response received');
          this.logFeatureToggleForScenario();
          //reportLogger.AddJson(global.scenarioData['featureToggles']);
          return true;
        }
      }
      elapsedTime = (new Date() - startTime) / 1000;
    }
    reportLogger.AddMessage('LD response not received in 15sec');

    return false;
  }

  logFeatureToggleForScenario(){
    const ldfeatureToggles = global.scenarioData.featureToggles;
    const togglesToLog = global.scenarioData.featureToggleToLog;
    reportLogger.AddMessage(`Logging scenario features toggle values ${JSON.stringify(togglesToLog)}`);

    if (!togglesToLog){
      return;
    }
    const toggleValuesToLog = {};
    for (let i = 0; i < togglesToLog.length; i++) {
      const toggleName = togglesToLog[i];
      toggleValuesToLog[toggleName] = ldfeatureToggles[toggleName].value;
    }
    reportLogger.AddJson(toggleValuesToLog);
  }

  async stepWithRetry(action, retryCount, stepDesc) {
    retryCount = retryCount ? retryCount : 5;
    let retryCounter = 0;
    while (retryCounter <= retryCount) {
      try {
        return action();
      } catch (e) {
        retryCounter++;
        reportLogger.AddMessage(stepDesc ? stepDesc : '' + ' : Error occurred ' + e);
        reportLogger.AddMessage('Retrying attempt  ' + retryCounter);
      }
    }
  }

  async getScenarioIdCookieValue(){
    const scenarioId = await browser.manage().getCookie('scenarioId');
    return scenarioId ? scenarioId.value : null;
  }

  async isTextPresentInElementWithCssSelector(cssSelector, text){
    const elementtext = await $(cssSelector).getText();
    return elementtext.includes(text);
  }

  async addTextToElementWithCssSelector(cssSelector, text, append){
    return await browser.executeScript(() => {
      const div = document.querySelector(arguments[0]);
      if (div === undefined || div === null){
        return `no element found with query selector ${arguments[0]}`;
      }
      if (arguments[2]){
        div.innerHTML += arguments[1];
      } else {
        div.innerHTML = arguments[1];
      }
      return 'success';
    }, cssSelector, text, append);
  }

  async scrollToElement(element){
    await browser.executeScript('arguments[0].scrollIntoView()',
      element);
  }

  async getFromSessionStorage(key){
    return await browser.executeScript('return window.sessionStorage["'+key+'"]',
      key);
  }

  async getFromLocalStorage(key) {
    return await browser.executeScript('return window.localStorage["' + key + '"]',
      key);
  }
}
module.exports = new BrowserUtil();

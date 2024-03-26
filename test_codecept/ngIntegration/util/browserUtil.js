const jwt = require('jsonwebtoken');
const reportLogger = require('../../codeceptCommon/reportLogger');
// const addContext = require('mochawesome/addContext');

const axios = require('axios');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

axios.defaults.headers.common['Content-Type'] = 'application/json';
const axiosOptions = {};
axios.defaults.withCredentials = true;

const http = axios.create(axiosOptions);
const nodeAppMockData = require('../mockData/nodeApp/mockData');

class BrowserUtil {
  async gotoHomePage() {
    const baseUrl = process.env.TEST_TYPE === 'e2e' ? process.env.TEST_URL : 'http://localhost:3000/';
    await browser.get(baseUrl);
  }

  setAuthCookie() {
    const token = jwt.sign({
      data: 'foobar'
    }, 'secret', { expiresIn: 60 * 60 });
    this.addCookie('__auth__', token);
  }

  async getAuthCookieValue() {
    const cookies = await browser.driver.manage().getCookies();
    return cookies.find((cookie) => cookie.name === '__auth__').value;
  }

  addCookie(cookieName, cookieVal) {
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

  async browserInitWithAuth(roles) {
    await this.gotoHomePage();
    this.setAuthCookie();

    if (roles) {
      const r = 'j:' + JSON.stringify(roles);
      console.log(r);
      const encodedRoles = encodeURIComponent(r);
      console.log(encodedRoles);
      this.addCookie('roles', encodedRoles);
    }
  }

  setUserDetailsWithRoles(rolesArray) {
    nodeAppMockData.getUserDetailsWithRoles(rolesArray);
  }

  async waitForLD() {
    try {
      return await this.waitForNetworkResponse('app.launchdarkly.com/sdk/evalx');
    } catch (err) {
      reportLogger.AddMessage(err);
      console.log(err);
      return false;
    }
  }

  onLDReceivedLogFeatureValue(name) {
    let togglesToLogs = global.scenarioData.featureToggleToLog;
    if (!togglesToLogs) {
      global.scenarioData.featureToggleToLog = [];
      togglesToLogs = global.scenarioData.featureToggleToLog;
    }
    togglesToLogs.push(name);
  }

  async waitForNetworkResponse(url) {
    const startTime = new Date();
    const TIMEOUT = 15;
    let elapsedTime = 0;
    let ldDone = false;
    // let logs = await browser.browserLogs()
    while (!ldDone && elapsedTime < TIMEOUT) {
      let perf = await browser.executeScript(function () {
        return JSON.stringify(window.performance.getEntriesByType('resource'));
      });
      if (!perf) {
        break;
      }
      perf = JSON.parse(perf);
      for (let i = 0; i < perf.length; i++) {
        if (perf[i].name.includes(url)) {
          ldDone = true;
          await this.stepWithRetry(async () => global.scenarioData.featureToggles = (await http.get(perf[i].name, {})).data, 3, 'Get LD feature toggles request');
          reportLogger.AddMessage('LD response received');
          // this.logFeatureToggleForScenario();
          //reportLogger.AddJson(global.scenarioData['featureToggles']);
          return true;
        }
      }
      elapsedTime = (new Date() - startTime) / 1000;
    }
    reportLogger.AddMessage(`LD response not received in ${TIMEOUT} sec`);

    return false;
  }

  logFeatureToggleForScenario() {
    const ldfeatureToggles = global.scenarioData.featureToggles;
    const togglesToLog = global.scenarioData.featureToggleToLog;
    reportLogger.AddMessage(`Logging scenario features toggle values ${JSON.stringify(togglesToLog)}`);

    if (!togglesToLog) {
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
    retryCount = retryCount ? retryCount : 3;
    let retryCounter = 0;
    while (retryCounter <= retryCount) {
      try {
        return action();
      } catch (e) {
        retryCounter++;
        await browser.sleepInMillisec(200);
        reportLogger.AddMessage(stepDesc ? stepDesc : '' + ' : Error occurred ' + e);
        reportLogger.AddMessage('Retring attempt  ' + retryCounter);
      }
    }
  }

  async getScenarioIdCookieValue() {
    const scenarioId = await browser.manage().getCookie('scenarioId');
    return scenarioId ? scenarioId.value : null;
  }

  async isTextPresentInElementWithCssSelector(cssSelector, text) {
    const elementtext = await $(cssSelector).getText();
    return elementtext.includes(text);
  }

  async addTextToElementWithCssSelector(cssSelector, text, append) {
    return await browser.executeScript(() => {
      const div = document.querySelector(arguments[0]);
      if (div === undefined || div === null) {
        return `no element found with query selector ${arguments[0]}`;
      }
      if (arguments[2]) {
        div.innerHTML += arguments[1];
      } else {
        div.innerHTML = arguments[1];
      }
      return 'success';
    }, cssSelector, text, append);
  }

  async scrollToElement(element) {
    await browser.scrollToElement(element);
  }

  async getFromSessionStorage(key) {
    return await browser.getSessionStorage(key);
  }

  async getFromLocalStorage(key) {
    return await browser.getLocalStorage(key);
  }
}

module.exports = new BrowserUtil();

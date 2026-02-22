const { container, event, output } = require('codeceptjs');
const path = require('path');
const fs = require('fs');
const browser = require('./browser');
const codeceptMochawesomeLog = require('./reportLogger');
const statsReporter = require('./statsReporter');
const e2eTestDataManager = require('../e2e/utils/testDataManager/index');
const mockClient = require('../backendMock/client/index');
const idamLogin = require('../ngIntegration/util/idamLogin');

const isIntegrationTestType = process.env.TEST_TYPE === 'ngIntegration';
const testType = process.env.TEST_TYPE;
global.scenarioData = {};

let featureLogFile = null;

console.log('[Hook] ✅ hooks.js loaded');
console.log('[Hook] ✅ CODECEPT COMMON HOOK LOADED:', __dirname);

function overrideConsoleLogforWorkersThreads() {
  const consoleLogRef = console.log;
  const consoleErrorRef = console.error;

  global.console.log = function (message) {
    const folderName = path.resolve(__dirname, `../../functional-output/tests/featureLogs-${testType}`);
    if (!featureLogFile) {
      featureLogFile = path.join(folderName, 'executionLogs.log');
    }
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName, { recursive: true });
    }
    const dateTime = new Date().toLocaleTimeString('en-GB');
    consoleLogRef(message);
    fs.appendFileSync(featureLogFile, `\n ${dateTime} : ${message}`);
  };

  global.console.error = function (error) {
    const folderName = path.resolve(__dirname, `../../functional-output/tests/featureLogs-${testType}`);
    if (!featureLogFile) {
      featureLogFile = path.join(folderName, 'executionLogs.log');
    }
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName, { recursive: true });
    }
    fs.appendFileSync(featureLogFile, '\n ERROR \n');
    fs.appendFileSync(featureLogFile, '\n' + error);
    consoleErrorRef(error);
  };
}

function getFeatureFileName(test) {
  const filePathSplit = test.file.split('/');
  return filePathSplit[filePathSplit.length - 1];
}

function setFeatureLogFile(test) {
  const fileName = getFeatureFileName(test);
  const folderName = `${__dirname}/../../functional-output/tests/featureLogs-${testType}`;
  featureLogFile = `${folderName}/${fileName}.txt`;
  codeceptMochawesomeLog.featureLogFilePath = featureLogFile;
}

function featureLogsMessage(test, message) {
  const fileName = getFeatureFileName(test);
  const folderName = `${__dirname}/../../functional-output/tests/featureRunLogs-${testType}`;
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName, { recursive: true });
  }
  fs.appendFileSync(`${folderName}/${fileName}.txt`, message);
}

// ✅ Hook: setup logs
event.dispatcher.on(event.suite.before, () => {
  console.log('[Hook] ✅ Custom hooks active via suite.before');
  overrideConsoleLogforWorkersThreads();
});

event.dispatcher.on(event.test.before, async (test) => {
  const helperNames = Object.keys(container.helpers());
  console.log('[Hook] ✅ test.before fired');
  console.log('[Hook] ✅ Available helpers:', helperNames);

  global.scenarioData = {}; // 👈 still safe to reset here

  setFeatureLogFile(test);
  output.print(`Test started : ${test.title}`);
  codeceptMochawesomeLog.AddMessage(`************ Test started : ${test.title}`);
  await mockClient.logMessage(`************ Test started : ${test.title}`);
  const dateTime = new Date().toLocaleTimeString('en-GB');
  featureLogsMessage(test, `\n${dateTime}| ************ Test started | ${test.title}`);
  statsReporter.run();
});

/* event.dispatcher.on(event.step.before, async (step) => {

  console.log('[Hook] Playwright helper:', playwrightHelper);
  console.log('[Hook] WebDriver helper:', webdriverHelper);

  const helpers = container.helpers();

  // Avoid double-setting
  if (global.page) return;

  const playwrightHelper = helpers['Playwright'];
  const webdriverHelper = helpers['WebDriver'];

  if (playwrightHelper?.page) {
    setXUITestPage(playwrightHelper.page);
    console.log('[Hook] ✅ setXUITestPage assigned (Playwright)');
  } else if (webdriverHelper?.browser) {
    setXUITestPage(webdriverHelper.browser);
    console.log('[Hook] ✅ setXUITestPage assigned (WebDriver)');
  } else {
    console.warn('[Hook] ⚠️ Still no page/browser in step.before');
  }
}); */

// ✅ Hook: after each test
event.dispatcher.on(event.test.after, async (test) => {
  output.print(`Test ${test.state} : ${test.title}`);
  await mockClient.logMessage(`************ Test status|${test.title}:${test.state}`);
  actor().flushLogsToReport();

  const authCookies = idamLogin.authToken;
  if (test.state === 'failed' && process.env.TEST_TYPE !== 'e2e') {
    const mockSessiondataResponse = await mockClient.getUserSesionData(authCookies);
    featureLogsMessage(test, `${JSON.stringify(mockSessiondataResponse.data, null, 2)}`);
    codeceptMochawesomeLog.AddJson(authCookies);
  }

  if (test.state === 'failed' || true) {
    codeceptMochawesomeLog.AddMessage('*************** Browser error logs ***************');
    let errorLogs = await actor().grabBrowserLogs();
    errorLogs = errorLogs.filter((error) => error._event.type.includes('error'));
    for (const error of errorLogs) {
      codeceptMochawesomeLog.AddMessage(`${error._event.type}:${error._event.location.url} =>  ${error._event.text}`);
    }
  }

  const dateTime = new Date().toLocaleTimeString('en-GB');
  featureLogsMessage(test, `\n${dateTime}| ************ Test status|${test.state}|${test.title}`);
  statsReporter.run();
});

// ✅ Hook: passed
event.dispatcher.on(event.test.passed, async () => {
  codeceptMochawesomeLog.AddMessage('************ Test passed');
});

// ✅ Hook: BDD step
event.dispatcher.on(event.bddStep.before, async (bddStep) => {
  const log = `=== BDD) ${bddStep.keyword} ${bddStep.text}`;
  codeceptMochawesomeLog.AddMessage(log);

  if (bddStep.text.trim() === 'I see case details tab label "Hearings" is displayed is "true"') {
    await new Promise((resolve) => setTimeout(resolve, 300 * 60));
  }
});

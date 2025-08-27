const path = require('path');
const fs = require('fs');
import applicationServer from '../localServer';
const backendMockApp = require('../backendMock/app');
const generateMergedReport = require('../accessibility/reporter/reportsMerger');

/*───────────────────────────────────────────────────────────────*/
const headed = /^(true|1)$/i.test(process.env.HEAD ?? '');
console.log(`[conf] headed run: ${headed}`);

const testType = 'a11y';
const CODECEPT_OUT = path.resolve(__dirname, `../../functional-output/tests/codecept-${testType}`);
fs.mkdirSync(CODECEPT_OUT, { recursive: true });

const externalServers = process.env.EXTERNAL_SERVERS === 'true';

exports.config = {
  tests: '../accessibility/tests/**/*.test.js',
  output: CODECEPT_OUT,

  helpers: {
    Puppeteer: {
      url: externalServers
        ? (process.env.WEB_BASE_URL || 'http://localhost:8080')
        : 'https://manage-case.aat.platform.hmcts.net',
      show: headed,
      headless: !headed,
      restart: true,
      waitForNavigation: 'domcontentloaded',
      smartWait: 50000,
      waitForTimeout: 90000,
      chrome: {
        ignoreHTTPSErrors: true,
        defaultViewport: { width: 1280, height: 960 },
        args: [
          ...(headed ? [] : ['--headless', '--disable-gpu']),
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-notifications',
          '--ignore-certificate-errors',
          '--window-size=1440,1400'
        ]
      }
    }
  },

  mocha: {
    reporter: path.resolve(__dirname, '../accessibility/reporter/customReporter.js'),
    reporterOptions: { reportDir: CODECEPT_OUT, html: false, json: true }
  },

  plugins: {
    screenshotOnFail: { enabled: true, fullPageScreenshots: true },
    retryFailedStep: { enabled: true }
  },

  // ⬇️ Only start/stop local servers when we are NOT using external servers
  bootstrap: async () => {
    await backendMockApp.startServer();
    await applicationServer.start();
  },

  teardown: async () => {
    await backendMockApp.stopServer();
    await applicationServer.stop();
    await generateMergedReport();
  }
};

console.log('[conf] Puppeteer show flag =', exports.config.helpers.Puppeteer.show);

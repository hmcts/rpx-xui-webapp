const supportedBrowsers = {
  microsoft: {
    ie11_win: {
      browserName: 'internet explorer',
      platformName: 'Windows 10',
      browserVersion: 'latest',
      'sauce:options': {
        name: 'Manage Case: IE11'
      }
    },
    edge_win_latest: {
      browserName: 'MicrosoftEdge',
      platformName: 'Windows 10',
      browserVersion: 'latest',
      'sauce:options': {
        name: 'Manage Case: Edge_Win10'
      }
    }
  },
  safari: {
    safari_mac: {
      browserName: 'safari',
      platformName: 'macOS 10.14',
      browserVersion: 'latest',
      'sauce:options': {
        name: 'Manage Case: MAC_SAFARI',
        seleniumVersion: '3.141.59'
      }
    }
  },
  chrome: {
    chrome_win_latest: {
      browserName: 'chrome',
      platformName: 'Windows 10',
      browserVersion: 'latest',
      'sauce:options': {
        name: 'Manage Case: WIN_CHROME_LATEST'
      }
    },
    chrome_mac_latest: {
      browserName: 'chrome',
      platformName: 'macOS 10.15',
      browserVersion: 'latest',
      'sauce:options': {
        name: 'Manage Case: MAC_CHROME_LATEST'
      }
    }
  },
  firefox: {
    firefox_win_latest: {
      browserName: 'firefox',
      platformName: 'Windows 10',
      browserVersion: 'latest',
      'sauce:options': {
        name: 'Manage Case: WIN_FIREFOX_LATEST'
      }
    },
    firefox_mac_latest: {
      browserName: 'firefox',
      platformName: 'macOS 10.15',
      browserVersion: 'latest',
      'sauce:options': {
        name: 'Manage Case: MAC_FIREFOX_LATEST'
      }
    }
  }
};

const waitForTimeout = 45000;
const smartWait = 30000;
const browser = 'chromium';
const defaultSauceOptions = {
  username: process.env.SAUCE_USERNAME,
  accessKey: process.env.SAUCE_ACCESS_KEY,
  tunnelIdentifier: 'reformtunnel',
  acceptSslCerts: true,
  windowSize: '1600x900',
  tags: []
};

function merge (intoObject, fromObject) {
  return Object.assign({}, intoObject, fromObject);
}

function getBrowserConfig(browserGroup) {
  const browserConfig = [];
  for (const candidateBrowser in supportedBrowsers[browserGroup]) {
    if (candidateBrowser) {
      const candidateCapabilities = supportedBrowsers[browserGroup][candidateBrowser];
      candidateCapabilities['sauce:options'] = merge(
        defaultSauceOptions, candidateCapabilities['sauce:options']
      );
      browserConfig.push({
        browser: candidateCapabilities.browserName,
        capabilities: candidateCapabilities
      });
    } else {
      // eslint-disable-next-line no-console
      console.error('ERROR: supportedBrowsers.js is empty or incorrectly defined');
    }
  }
  return browserConfig;
}

const setupConfig = {
  tests: '../features/app/**/*.feature',
  output: 'reports/tests/crossbrowser',
  sauceConnect: true,
  helpers: {
    WebDriver: {
      url: 'https://manage-case.aat.platform.hmcts.net',
      browser,
      smartWait,
      waitForTimeout,
      waitForNavigation: "domcontentloaded",
      cssSelectorsEnabled: 'true',
      host: 'ondemand.eu-central-1.saucelabs.com',
      port: 443,
      region: 'eu',
      capabilities: {}
    },
    Mochawesome: {
      uniqueScreenshotNames: 'true'
    }
  },
  include: {
    I: "../**/*.steps.js"
  },
  plugins: {
    screenshotOnFail: {
      enabled: true,
      fullPageScreenshots: true
    },
    retryFailedStep: {
      enabled: true
    },
    pauseOnFail: {}
  },
  mocha: {
    reporterOptions: {
      'codeceptjs-cli-reporter': {
        stdout: '-',
        options: { steps: true }
      },
      mochawesome: {
        stdout: './e2e-output/console.log',
        options: {
          reportDir: 'reports/tests/crossbrowser',
          reportName: 'index',
          inlineAssets: true
        }
      }
    }
  },
  multiple: {
    microsoft: {
      browsers: getBrowserConfig('microsoft')
    },
    chrome: {
      browsers: getBrowserConfig('chrome')
    },
    firefox: {
      browsers: getBrowserConfig('firefox')
    },
    safari: {
      browsers: getBrowserConfig('safari')
    }
  },
  name: 'Manage case Cross-Browser Tests'
};

console.log('using features: ', setupConfig.tests);
console.log('using browsers: ', setupConfig.multiple);

exports.config = setupConfig;

const supportedBrowsers = {
  microsoftEdge: {
    edge: {
      browserName: 'MicrosoftEdge',
      platformName: 'Windows 10',
      browserVersion: '18.17763',
      'sauce:options': {
        name: 'MC_WIN10_EDGE_18',
      }
    }
  },
  chrome: {
    chrome_win_latest: {
      browserName: 'chrome',
      browserVersion: 'latest',
      platformName: 'Windows 10',
      'sauce:options': {
        name: 'MC_WIN10_CHROME_LATEST',
        extendedDebugging: true
      }
    },
    chrome_mac_latest: {
      browserName: 'chrome',
      browserVersion: 'latest',
      platformName: 'macOS 10.13',
      'sauce:options': {
        name: 'MC_MAC_CHROME_LATEST',
        extendedDebugging: true
      }
    }
  },
  firefox: {
    firefox_win_latest: {
      browserName: 'firefox',
      platformName: 'Windows 10',
      browserVersion: 'latest',
      'sauce:options': {
        name: 'MC_WIN10_FIREFOX_LATEST',
        extendedDebugging: true
      }
    },
    firefox_mac_latest: {
      browserName: 'firefox',
      platformName: 'macOS 10.13',
      browserVersion: 'latest',
      'sauce:options': {
        name: 'MC_MAC_FIREFOX_LATEST',
        extendedDebugging: true
      }
    }
  },
  safari: {
    safari11: {
      browserName: 'safari',
      browserVersion: '11.1',
      platformName: 'macOS 10.13',
      'sauce:options': {
        name: 'MC_MAC_SAFARI_11'
      }
    }
  }
};

const browser = process.env.SAUCELABS_BROWSER;
const tunnelName = process.env.TUNNEL_IDENTIFIER || 'reformtunnel';
const getBrowserConfig = (browserGroup) => {
  const browserConfig = [];
  for (const candidateBrowser in supportedBrowsers[browserGroup]) {
    if (candidateBrowser) {
      const desiredCapability = supportedBrowsers[browserGroup][candidateBrowser];
      desiredCapability['sauce:options'].tunnelIdentifier = tunnelName;
      desiredCapability['sauce:options'].acceptSslCerts = true;
      desiredCapability['sauce:options'].tags = ['MC-frontend'];
      browserConfig.push({
        browser: desiredCapability.browserName,
        desiredCapabilities: desiredCapability
      });
    } else {
      console.error('ERROR: supportedBrowsers.js is empty or incorrectly defined');
    }
  }
  return browserConfig;
};

const setupConfig = {
  output: `${process.cwd()}/functional-output`,
  helpers: {
    WebDriver: {
      url: process.env.TEST_URL || 'https://manage-case.aat.platform.hmcts.net',
      browser,
      cssSelectorsEnabled: 'true',

      user: process.env.SAUCE_USERNAME,
      key: process.env.SAUCE_ACCESS_KEY,
      region: 'eu',
      sauceConnect: true,
      services: ['sauce'],
      // This line is required to ensure test name and browsers are set correctly for some reason.
      desiredCapabilities: {'sauce:options': {}}
    }
  },
  plugins: {
    autoDelay: {
      enabled: true
    },
    retryFailedStep: {
      enabled: true
    }
  },
  gherkin: {
    features: '../e2e/features/**/*.feature',
    steps: ['../e2e/features/step_definitions/**/*.steps.js']
  },
  include: {
    'I': '../e2e/features/step_definitions/**/*.steps.js'
  },
  mocha: {
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: process.env.E2E_CROSSBROWSER_OUTPUT_DIR || './functional-output',
      reportTitle: 'Crossbrowser results',
      inline: true
    }
  },
  multiple: {
    microsoftEdge: {
      browsers: getBrowserConfig('microsoftEdge')
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
  }
};

exports.config = setupConfig;
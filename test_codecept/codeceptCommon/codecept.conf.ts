
const { setDefaultResultOrder } = require('dns');

const report = require('cucumber-html-reporter');
const { merge } = require('mochawesome-merge');
const marge = require('mochawesome-report-generator');
const fs = require('fs');
const path = require('path');

const global = require('./globals');
import applicationServer from '../localServer';

const spawn = require('child_process').spawn;
const backendMockApp = require('../backendMock/app');
const statsReporter = require('./statsReporter');

setDefaultResultOrder('ipv4first');

const externalServers = process.env.EXTERNAL_SERVERS === 'true';
function findStepFiles(basePath) {
  const results = [];

  function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (file.endsWith('.steps.js')) {
        results.push(fullPath);
      }
    }
  }

  walk(basePath);
  return results;
}

const e2eStepFiles = findStepFiles(path.resolve(__dirname, '../e2e/features/step_definitions'));
const ngIntegrationStepFiles = findStepFiles(path.resolve(__dirname, '../ngIntegration/tests/stepDefinitions'));

console.log('Loaded step files:', [...e2eStepFiles, ...ngIntegrationStepFiles]);

let executionResult = 'passed';

const appWithMockBackend = null;
const testType = process.env.TEST_TYPE;

const CODECEPT_OUT = path.resolve(
  __dirname,
  '../../functional-output/tests/codecept-' + testType   // screenshots etc.
);


const CUKE_OUT = path.resolve(
  __dirname,
  '../../functional-output/tests/codecept-' + testType
);
fs.mkdirSync(CUKE_OUT, { recursive: true });

const debugMode = process.env.DEBUG && process.env.DEBUG.includes('true');

const parallel = process.env.PARALLEL ? process.env.PARALLEL === 'true' : false;
const head = process.env.HEAD === 'true';
console.log(`testType : ${testType}`);
console.log(`parallel : ${parallel}`);
console.log(`headless : ${head}`);

const TEST_URL = process.env.TEST_URL || '';
const pipelineBranch = externalServers //   running against localhost
  ? 'local' //   value won’t be used later
  : (TEST_URL.includes('pr-') || TEST_URL.includes('manage-case.aat.platform.hmcts.net')
    ? 'preview'
    : 'master');
let features = '';
if (testType === 'e2e' || testType === 'smoke') {
  features = '../e2e/features/app/**/*.feature';
} else if (testType === 'ngIntegration') {
  features = '../ngIntegration/tests/features/**/*.feature';
} else {
  throw new Error(`Unrecognized test type ${testType}`);
}

const functional_output_dir = path.resolve(`${__dirname}/../../functional-output/tests/codecept-${testType}`);
const cucumber_functional_output_dir = path.resolve(`${__dirname}/../../functional-output/tests/codecept-${testType}`);
fs.mkdirSync(cucumber_functional_output_dir, { recursive: true });

let bddTags = testType === 'ngIntegration' ? 'functional_enabled' : 'fullFunctional';

if (pipelineBranch === 'master' && testType === 'ngIntegration') {
  bddTags = 'AAT_only';
  process.env.LAUNCH_DARKLY_CLIENT_ID = '645baeea2787d812993d9d70';
}

const tags = process.env.DEBUG ? 'functional_debug' : bddTags;
const grepTags = `(?=.*@${testType === 'smoke' ? 'smoke' : tags})^(?!.*@ignore)`;
console.log(grepTags);

exports.config = {
  require: [path.resolve(__dirname, 'steps_file.js')],
  timeout: 600,
  'gherkin': {
    'features': features,
    'steps': [
      // Ensure this sets up setXUITestPage(page) before anything else
      '../e2e/features/step_definitions/setup.steps.js',
      ...e2eStepFiles,
      ...ngIntegrationStepFiles
    ]
  },
  grep: grepTags,
  output: CODECEPT_OUT,

  helpers: {
    CustomHelper: {
      require: './customHelper.js'
    },
    'Mochawesome': {
      'uniqueScreenshotNames': 'true'
    },
    // Puppeteer: {
    //   url: 'https://manage-case.aat.platform.hmcts.net/',
    //   show: true,
    //   waitForNavigation: ['domcontentloaded'],
    //   restart: true,
    //   keepCookies: false,
    //   keepBrowserState: false,
    //   smartWait: 50000,
    //   waitForTimeout: 90000,
    //   chrome: {
    //     ignoreHTTPSErrors: true,
    //     defaultViewport: {
    //       width: 1280,
    //       height: 960
    //     },
    //     args: [
    //       `${head ? '' : '--headless'}`,
    //       '—disable-notifications',
    //       '--smartwait',
    //       '--disable-gpu',
    //       '--no-sandbox',
    //       '--allow-running-insecure-content',
    //       '--ignore-certificate-errors',
    //       '--window-size=1440,1400',
    //       '--viewport-size=1440,1400',

    //        '--disable-setuid-sandbox', '--no-zygote ', '--disableChecks'
    //     ]
    //   }

    // },
    Playwright: {
      url: externalServers ? (process.env.WEB_BASE_URL || 'http://localhost:8080')
        : 'https://manage-case.aat.platform.hmcts.net',
      restart: true,
      show: head,
      waitForNavigation: 'domcontentloaded',
      waitForAction: 10,
      browser: 'chromium',
      // disableScreenshots: false,
      fullPageScreenshots: true,
      uniqueScreenshotNames: true,
      video: false,
      screenshot: true,
      windowSize: '1600x900'
    }
  },
  'mocha': {
    // reporter: 'mochawesome',

    // "reporterOptions": {
    //   "reportDir": functional_output_dir,
    //   reportName:'XUI_MC',
    //   "overwrite": false,
    //   "html": false,
    //   "json": true,
    //   "codeceptjs-cli-reporter": {
    //     "stdout": "-",
    //     "options": {
    //       "verbose": false,
    //       "steps": true,
    //     }
    //   },
    //   "mocha-junit-reporter": {
    //     "stdout": `${functional_output_dir}/console.log`,
    //     "options": {
    //       "mochaFile": "./output/result.xml"
    //     }
    //   }
    //   // inlineAssets: true,

    // },

    //   "mochawesome": {
    //     "stdout": `${functional_output_dir}/`,
    //     "options": {
    //       "reportDir": `${functional_output_dir}/output`,
    //       "reportFilename": `${functional_output_dir}/output/report`,
    //       "overwrite": false,
    //       "html":false,
    //       "json":true
    //     }
    //   },
    //   "mocha-junit-reporter": {
    //     "stdout": "./output/console.log",
    //     "options": {
    //       "mochaFile": "./output/result.xml",
    //       "attachments": true //add screenshot for a failed test
    //     }
    //   }
    // }

  },
  plugins: {
    screenshotOnFail: {
      enabled: true,
      fullPageScreenshots: true
    },
    retryFailedStep: {
      enabled: true
    },
    pauseOnFail: {},
    cucumberJsonReporter: {      // 3rd-party plugin that WRITES the *.json
      require: 'codeceptjs-cucumber-json-reporter',
      enabled: true,

      // NOTE: correct option name is *outputDir*, not output
      outputDir: cucumber_functional_output_dir,     // ← single place we chose
      fileNamePrefix: 'cucumber_output_',
      uniqueFileNames: true,     // 1 JSON per worker
      attachScreenshots: true,
      attachComments: true,
      includeExampleValues: false,
      timeMultiplier: 1000000
    }
  },
  include: {
  },
  retry: {
    Feature: 3

  },
  bootstrap: async () => {
    share({ users: [], reuseCounter: 0 });
    if (!parallel && testType !== 'smoke') { // smoke tests are run in serial even with PARALLEL=true
      await setup();
    }
  },
  bootstrapAll: async () => {
    global.scenarioData = {};
    const path = require('path');
    require(path.resolve(__dirname, './hooks.js')); // 🟢 Will now run your hook IIFE immediately

    if (parallel && testType !== 'smoke') { // smoke tests are run in serial even with PARALLEL=true
      await setup();
    }
  },
  teardown: async () => {                  // ← worker‑level finaliser
    if (!parallel) await teardown();       // no report here any more
  },
  teardownAll: async () => {               // ← fires after *all* workers
    if (parallel) {
      await teardown();

      exitWithStatus();
    }
    await generateCucumberReport();        // JSON is now on disk
    exitWithStatus();                      // evaluate pass / fail
  },
};

function exitWithStatus() {
  // const status = await mochawesomeGenerateReport()
  console.log(`*************** executionResult: ${executionResult}  *************** `);
  process.exit(executionResult === 'passed' ? 0 : 1);
}

async function setup() {
  if (!externalServers && !debugMode && (testType === 'ngIntegration' || testType === 'a11y')) {
    await backendMockApp.startServer(debugMode);
    await applicationServer.initialize();
    await applicationServer.start();
  }
}

async function teardown() {
  console.log('Tests execution completed');
  if (!externalServers && !debugMode && (testType === 'ngIntegration' || testType === 'a11y')) {
    await backendMockApp.stopServer();
    await applicationServer.stop();
  }
  statsReporter.run();
  await generateCucumberReport();

  // process.exit(1);
}

async function mochawesomeGenerateReport() {
  const report = await merge({
    files: [`${functional_output_dir}/*.json`]
  });
  await marge.create(report, {
    'reportDir': `${functional_output_dir}/`,
    'reportFilename': `${functional_output_dir}/report`
  });

  console.log(`FAILED: ${report.stats.failures}, PASSED: ${report.stats.passes}, TOTAL: ${report.stats.tests}`);

  return report.stats.failures > 0 ? 'FAIL' : 'PASS';
}

async function generateCucumberReport() {
  console.log('Generating cucumber report');

  // --- collect only NON-EMPTY cucumber_output_*.json files -------------
  const jsonFiles = fs.readdirSync(CUKE_OUT)
    .filter(f => f.startsWith('cucumber_output_') && f.endsWith('.json'))
    .map(f => path.join(CUKE_OUT, f))
    .filter(f => {
      try {
        const data = JSON.parse(fs.readFileSync(f, 'utf8'));
        return Array.isArray(data) && data.length > 0; // keep only real results
      } catch {
        return false;          // skip broken JSON
      }
    });

  if (jsonFiles.length === 0) {
    console.warn('⚠️  No cucumber JSONs with features – skipping HTML report');
    return;                    // nothing to show, so don’t throw
  }

  const reportFile = path.join(CUKE_OUT, 'cucumber_report.html');

  await new Promise(r => setTimeout(r, 2000)); // let reporters flush
  report.generate({
    theme: 'bootstrap',
    jsonDir: CUKE_OUT,      // folder that holds all accepted files
    output: reportFile,
    files: jsonFiles,     // ← tell reporter which files to read
    displayDuration: true,
    ignoreBadJsonFile: true,
    metadata: {
      browser: { name: 'chrome', version: '60' },
      device: 'Local test machine',
      platform: { name: 'ubuntu', version: '16.04' }
    }
  });
  console.log('completed cucumber report');
}

function processCucumberJsonReports() {
  const executionOutcomes: Record<string, string> = {};
  const goodFiles = fs.readdirSync(CUKE_OUT)
    .filter(f => f.startsWith('cucumber_output_') && f.endsWith('.json'));
  for (const f of goodFiles) {
    const full = path.join(CUKE_OUT, f);
    const json = JSON.parse(fs.readFileSync(full, 'utf8'));
    if (!Array.isArray(json) || json.length === 0) continue; // skip empties

    for (const feature of json) {
      for (const element of feature.elements) {
        for (const step of element.steps) {
          executionOutcomes[step.result.status] = step.result.status;
          if (executionResult === 'passed') executionResult = step.result.status;

          for (const embedd of step.embeddings ?? []) {
            if (embedd.mime_type === 'text/plain' && !embedd.data.startsWith('=>')) {
              embedd.data = Buffer.from(embedd.data, 'base64').toString('ascii');
            }
          }
        }
      }
    }
    fs.writeFileSync(full, JSON.stringify(json, null, 2));
  }
  console.log(executionOutcomes);
  return executionResult;
}

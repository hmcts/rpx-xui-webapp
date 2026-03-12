import { setDefaultResultOrder } from 'node:dns';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { container } from 'codeceptjs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const report = require('cucumber-html-reporter');
import backendMockApp from '../backendMock/app';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const statsReporter = require('./statsReporter');
import './globals';

setDefaultResultOrder('ipv4first');

if (process.platform === 'darwin' && process.arch === 'arm64' && !process.env.PLAYWRIGHT_HOST_PLATFORM_OVERRIDE) {
  const major = Number.parseInt(os.release().split('.')[0] ?? '', 10);
  const lastStable = 15;
  let macVersion: string;
  if (Number.isFinite(major)) {
    if (major < 18) {
      macVersion = 'mac10.13';
    } else if (major === 18) {
      macVersion = 'mac10.14';
    } else if (major > 19) {
      macVersion = `mac${Math.min(major - 9, lastStable)}`;
    } else {
      macVersion = 'mac10.15';
    }
  } else {
    macVersion = 'mac10.15';
  }
  process.env.PLAYWRIGHT_HOST_PLATFORM_OVERRIDE = `${macVersion}-arm64`;
}

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

const testType = process.env.TEST_TYPE;

const CODECEPT_OUT = path.resolve(
  __dirname,
  '../../functional-output/tests/codecept-' + testType // screenshots etc.
);

const CUKE_OUT = path.resolve(__dirname, '../../functional-output/tests/codecept-' + testType);
fs.mkdirSync(CUKE_OUT, { recursive: true });

const debugMode = process.env.DEBUG?.includes('true') ?? false;

const parallel = process.env.PARALLEL ? process.env.PARALLEL === 'true' : false;
const head = process.env.HEAD === 'true' || (process.platform === 'darwin' && process.arch === 'arm64' && !process.env.CI);
console.log(`testType : ${testType}`);
console.log(`parallel : ${parallel}`);
console.log(`headless : ${head}`);

const TEST_URL = process.env.TEST_URL || '';
const pipelineBranch = resolvePipelineBranch(externalServers, TEST_URL);
let features = '';
if (testType === 'e2e' || testType === 'smoke') {
  features = '../e2e/features/app/**/*.feature';
} else if (testType === 'ngIntegration') {
  features = '../ngIntegration/tests/features/**/*.feature';
} else {
  throw new Error(`Unrecognized test type ${testType}`);
}

const cucumber_functional_output_dir = path.resolve(`${__dirname}/../../functional-output/tests/codecept-${testType}`);
fs.mkdirSync(cucumber_functional_output_dir, { recursive: true });

let bddTags = testType === 'ngIntegration' ? 'functional_enabled' : 'fullfunctional';

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
  gherkin: {
    features: features,
    steps: [
      // Ensure this sets up setXUITestPage(page) before anything else
      '../e2e/features/step_definitions/setup.steps.js',
      ...e2eStepFiles,
      ...ngIntegrationStepFiles,
    ],
  },
  grep: grepTags,
  output: CODECEPT_OUT,

  helpers: {
    CustomHelper: {
      require: './customHelper.js',
    },
    Mochawesome: {
      uniqueScreenshotNames: 'true',
    },
    Playwright: {
      url: externalServers ? process.env.WEB_BASE_URL || 'http://localhost:8080' : 'https://manage-case.aat.platform.hmcts.net',
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
      windowSize: '1600x900',
    },
  },
  mocha: {},
  plugins: {
    screenshotOnFail: {
      enabled: true,
      fullPageScreenshots: true,
    },
    retryFailedStep: {
      enabled: true,
    },
    pauseOnFail: {},
    cucumberJsonReporter: {
      // 3rd-party plugin that WRITES the *.json
      require: 'codeceptjs-cucumber-json-reporter',
      enabled: true,

      // NOTE: correct option name is *outputDir*, not output
      outputDir: cucumber_functional_output_dir, // ← single place we chose
      fileNamePrefix: 'cucumber_output_',
      uniqueFileNames: true, // 1 JSON per worker
      attachScreenshots: true,
      attachComments: true,
      includeExampleValues: false,
      timeMultiplier: 1000000,
    },
  },
  include: {},
  retry: {
    Feature: 3,
  },
  bootstrap: async () => {
    container.append({
      users: [],
      reuseCounter: 0,
    });
    if (!parallel && testType !== 'smoke') {
      // smoke tests are run in serial even with PARALLEL=true
      await setup();
    }
  },
  bootstrapAll: async () => {
    globalThis.scenarioData = {};
    await import(path.resolve(__dirname, './hooks.js')); // 🟢 Will now run your hook IIFE immediately

    if (parallel && testType !== 'smoke') {
      // smoke tests are run in serial even with PARALLEL=true
      await setup();
    }
  },
  teardown: async () => {
    // ← worker‑level finaliser
    if (!parallel) await teardown(); // no report here any more
  },
  teardownAll: async () => {
    // ← fires after *all* workers
    console.log('tearing down all');
    if (parallel) {
      await teardown();
    }
    await generateCucumberReport(); // JSON is now on disk
    exitWithStatus(); // evaluate pass / fail
  },
};

function exitWithStatus() {
  console.log('Evaluating test results for exit status...');

  // Check for failed tests by reading the generated report
  let status = 'PASS';
  try {
    const cucumberReports = fs
      .readdirSync(CUKE_OUT)
      .filter((f) => f.startsWith('cucumber_output_') && f.endsWith('.json'))
      .map((f) => path.join(CUKE_OUT, f));

    if (cucumberReports.length === 0) {
      console.warn('No cucumber JSON files found - failing the run');
      process.exit(1);
    }
    let nonEmpty = 0;
    let failedScenarios = 0;
    let failedSteps = 0;

    for (const cucumberFile of cucumberReports) {
      let fileData;
      try {
        fileData = JSON.parse(fs.readFileSync(cucumberFile, 'utf-8'));
      } catch (fileError) {
        console.warn(`Skipping bad JSON: ${path.basename(cucumberFile)} (${fileError.message})`);
        continue;
      }

      if (!Array.isArray(fileData) || fileData.length === 0) {
        console.log(`Empty report: ${path.basename(cucumberFile)} - skipping`);
        continue;
      }

      nonEmpty++;

      for (const feature of fileData) {
        const elements = feature.elements || [];
        for (const scenario of elements) {
          const steps = scenario.steps || [];
          const scenarioFailed = steps.some((step) => step.result?.status === 'failed');
          if (scenarioFailed) {
            failedScenarios++;
            failedSteps += steps.filter((step) => step.result?.status === 'failed').length;
          }
        }
      }
    }

    const status = nonEmpty === 0 ? 'FAIL' : failedScenarios > 0 ? 'FAIL' : 'PASS';
    console.log(
      `Non-empty reports: ${nonEmpty}, Failed scenarios: ${failedScenarios}, Failed steps: ${failedSteps}, Status: ${status}`
    );
    process.exit(status === 'PASS' ? 0 : 1);
  } catch (err) {
    console.error('Error checking test results:', err);
    status = 'FAIL';
  }
}

async function setup() {
  if (!externalServers && !debugMode && (testType === 'ngIntegration' || testType === 'a11y')) {
    await backendMockApp.startServer(debugMode);
    const appServer = await getApplicationServer();
    await appServer.initialize();
    await appServer.start();
  }
}

async function teardown() {
  console.log('Tests execution completed');
  if (!externalServers && !debugMode && (testType === 'ngIntegration' || testType === 'a11y')) {
    await backendMockApp.stopServer();
    const appServer = await getApplicationServer();
    await appServer.stop();
  }
  statsReporter.run();

  // process.exit(1);
}

type ApplicationServer = {
  initialize: () => Promise<void>;
  start: () => Promise<void>;
  stop: () => Promise<void>;
};

let applicationServer: ApplicationServer | undefined;

async function getApplicationServer(): Promise<ApplicationServer> {
  if (!applicationServer) {
    const mod = await import('../localServer');
    applicationServer = (mod as { default: ApplicationServer }).default;
  }
  return applicationServer;
}

async function generateCucumberReport() {
  console.log('Generating cucumber report');

  // --- collect only NON-EMPTY cucumber_output_*.json files -------------
  const jsonFiles = fs
    .readdirSync(CUKE_OUT)
    .filter((f) => f.startsWith('cucumber_output_') && f.endsWith('.json'))
    .map((f) => path.join(CUKE_OUT, f))
    .filter((f) => {
      try {
        const data = JSON.parse(fs.readFileSync(f, 'utf8'));
        return Array.isArray(data) && data.length > 0; // keep only real results
      } catch {
        return false; // skip broken JSON
      }
    });

  if (jsonFiles.length === 0) {
    console.warn('⚠️  No cucumber JSONs with features – skipping HTML report');
    return; // nothing to show, so don’t throw
  }

  for (const file of jsonFiles) {
    try {
      const features = JSON.parse(fs.readFileSync(file, 'utf8'));
      if (Array.isArray(features)) {
        for (const feature of features) {
          updateExecutionOutcomes(feature);
        }
      }
    } catch {
      // ignore parse issues for execution status aggregation
    }
  }

  const reportFile = path.join(CUKE_OUT, 'cucumber_report.html');

  await new Promise((r) => setTimeout(r, 2000)); // let reporters flush
  report.generate({
    theme: 'bootstrap',
    jsonDir: CUKE_OUT, // folder that holds all accepted files
    output: reportFile,
    reportSuiteAsScenarios: true,
    launchReport: false,
    ignoreBadJsonFile: true,
    metadata: {
      browser: 'chrome 60',
      device: 'Local test machine',
      platform: 'ubuntu 16.04',
    },
  });
  console.log('completed cucumber report');
}

function resolvePipelineBranch(isExternal: boolean, testUrl: string) {
  if (isExternal) {
    return 'local';
  }
  if (testUrl.includes('pr-') || testUrl.includes('manage-case.aat.platform.hmcts.net')) {
    return 'preview';
  }
  return 'master';
}

function updateExecutionOutcomes(feature: unknown) {
  if (!feature || typeof feature !== 'object' || !Array.isArray((feature as { elements?: unknown }).elements)) {
    return;
  }

  const elements = (feature as { elements: unknown[] }).elements;
  for (const element of elements) {
    updateStepOutcomes(element);
  }
}

function updateStepOutcomes(element: unknown) {
  if (!element || typeof element !== 'object' || !Array.isArray((element as { steps?: unknown }).steps)) {
    return;
  }

  const steps = (element as { steps: unknown[] }).steps;
  for (const step of steps) {
    const status = step && typeof step === 'object' ? (step as { result?: { status?: unknown } }).result?.status : undefined;
    if (typeof status === 'string') {
      if (executionResult === 'passed') {
        executionResult = status;
      }
    }
    decodeTextEmbeddings(step);
  }
}

function decodeTextEmbeddings(step: unknown) {
  const embeddings = step && typeof step === 'object' ? (step as { embeddings?: unknown }).embeddings : undefined;
  if (!Array.isArray(embeddings)) {
    return;
  }
  for (const embedd of embeddings) {
    if (
      embedd &&
      typeof embedd === 'object' &&
      (embedd as { mime_type?: unknown }).mime_type === 'text/plain' &&
      typeof (embedd as { data?: unknown }).data === 'string' &&
      !(embedd as { data: string }).data.startsWith('=>')
    ) {
      embedd.data = Buffer.from(embedd.data, 'base64').toString('ascii');
    }
  }
}

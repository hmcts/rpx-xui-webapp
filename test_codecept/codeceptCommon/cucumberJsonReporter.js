/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */

const { event, output, recorder } = require('codeceptjs');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const btoa = require('btoa');

const allFeatures = [];
const report = {
  feature: null,
  scenario: null,
  step: null,
  stepPosition: 0,
};

const defaultConfig = {
  attachScreenshots: true,
  attachComments: true,
  outputFile: 'cucumber_output.json',
  uniqueFileNames: false,
  includeExampleValues: false,
  timeMultiplier: 1000000, // nanoseconds
};

module.exports = function (config) {
  // eslint-disable-next-line no-param-reassign
  config = Object.assign(defaultConfig, config);
  const plugin = {};

  plugin.addScreenshot = (file_path) => {
    addScreenshotToReport(file_path);
  };

  // Before suite starts, parse the feature file and set report feature position
  event.dispatcher.on(event.suite.before, (suite) => {
    const feature = buildReportFeature(suite);
    allFeatures.push(feature);
    report.feature = feature;
  });

  event.dispatcher.on(event.test.before, (test) => {
    recorder.add('Set scenario position for reporter', async () => {
      report.scenario = getScenarioFromReport(report.feature, test.title);
      report.scenario.executed = true;
      report.stepPosition = 0;
    });
  });

  event.dispatcher.on(event.test.finished, () => {
    report.scenario = null;
  });

  event.dispatcher.on(event.test.failed, (test, error) => {
    report.step.result.status = 'failed';
    if ('params' in error) {
      const { params } = error;
      const message = `Error ${params.customMessage} - Expected "${params.jar}" ${params.type} "${params.needle}"`;
      report.step.result.error_message = message;
    }
    if ('stack' in error) report.step.result.error_message = error.stack;
  });

  event.dispatcher.on(event.step.passed, (step) => {
    if (!isBDD(step)) return;
    report.step.result.status = 'passed';
    // if step retried and passed, remove error message
    if (report.step.result.error_message) delete report.step.result.error_message;
  });

  event.dispatcher.on(event.step.failed, (step) => {
    if (!isBDD(step)) return;
    report.step.result.status = 'failed';
  });

  event.dispatcher.on(event.step.finished, (step) => {
    if (step.helperMethod === 'saveScreenshot') {
      const filePath = path.join(global.output_dir, step.args[0]);
      addScreenshotToReport(filePath);
    } else if (getRootMetaStep(step).helperMethod === 'saveScreenshot') {
      const filePath = path.join(global.output_dir, getRootMetaStep(step).args[0]);
      addScreenshotToReport(filePath);
    }
  });

  event.dispatcher.on(event.step.comment, (step) => {
    addCommentToReport(step);
  });

  event.dispatcher.on(event.bddStep.before, () => {
    recorder.add('Set step position', async () => {
      report.step = report.scenario.steps[report.stepPosition];
    });
    recorder.add('Set step starting time', async () => {
      if (report && report.step) report.step.start_time = Date.now();
    });
  });

  event.dispatcher.on(event.bddStep.after, () => {
    recorder.add('Increment step position', async () => {
      report.stepPosition += 1;

      // if the bddStep had no helper methods it will never be updated to 'passed'
      // and if bddStep after event is emitted, it should have passed
      if (report.step.result.status === 'skipped') report.step.result.status = 'passed';
    });
    recorder.add('Set step end time and duration', async () => {
      if (report && report.step) {
        report.step.end_time = Date.now();
        // calculate the duration based on config timeMultiplier for reporting tools
        report.step.result.duration = (report.step.end_time - report.step.start_time) * config.timeMultiplier;
      }
    });
  });

  // finalize and write your json file after all complete
  event.dispatcher.on(event.all.after, () => {
    // remove scenarios that weren't run
    // since we parse the whole feature file at start
    removeNotExecutedScenarios();

    const filename = config.uniqueFileNames
      ? `cucumber_output_${Math.floor(new Date().getTime() / 1000)}.json`
      : config.outputFile;

    fs.writeFile(path.join(global.output_dir, filename), JSON.stringify(allFeatures, null, 2), (err) => {
      if (err) throw err;
    });
  });

  /* ************** Codecept Feature Parsing *************************
   * Parses the suite.feature object in codeceptjs and creates
   * cucumber json repport structure.
   * No runtime results in this initial parsing
   ******************************************************************* */

  function buildReportFeature(codeceptSuiteObject) {
    const codeceptFeatureObject = codeceptSuiteObject.feature;
    const reportFeatureObject = {
      description: codeceptFeatureObject.description,
      keyword: codeceptFeatureObject.keyword,
      name: codeceptFeatureObject.name,
      line: codeceptFeatureObject.location.line,
      id: `${codeceptFeatureObject.name.replace(/ /g, '_').replace(/-/g, '')}.feature`,
      tags: [],
      elements: [],
    };
    // TODO:
    // cant figure out how to extract file name during run atm
    // included temp value, as most html report builders expect
    reportFeatureObject.uri = `features/${reportFeatureObject.id}`;

    // get feature level tags
    codeceptFeatureObject.tags.forEach((tag) => {
      const featureTag = {};
      featureTag.name = tag.name;
      featureTag.line = tag.location.line;
      reportFeatureObject.tags.push(featureTag);
    });

    const scenarios = buildReportScenarios(codeceptFeatureObject);
    reportFeatureObject.elements = scenarios;
    return reportFeatureObject;
  }

  function buildReportScenarios(feature) {
    let allScenarios = [];
    let backgroundSteps = [];

    // get all scenarios
    feature.children.forEach((codeceptObject) => {
      const codeceptScenarioObject = codeceptObject.scenario || codeceptObject.background || codeceptObject;
      const reportScenarioObject = {
        executed: false,
        id: codeceptScenarioObject.name.replace(/ /g, '_').replace(/,/g, ''),
        keyword: codeceptScenarioObject.keyword,
        name: codeceptScenarioObject.name,
        description: codeceptScenarioObject.description,
        type: 'scenario',
        line: codeceptScenarioObject.location.line,
        tags: [],
        steps: [],
      };

      // get all scenario steps
      const steps = buildReportSteps(codeceptScenarioObject);

      // get all tags for scenario
      if (codeceptScenarioObject.keyword === 'Background') {
        backgroundSteps = steps;
        return;
      }

      codeceptScenarioObject.tags.forEach((tag) => {
        const scenarioTag = {};
        scenarioTag.name = tag.name;
        scenarioTag.line = tag.location.line;
        reportScenarioObject.tags.push(scenarioTag);
      });
      const clonedBackground = _.cloneDeep(backgroundSteps);
      reportScenarioObject.steps = [...clonedBackground, ...steps];

      if (codeceptScenarioObject.examples === undefined || codeceptScenarioObject.examples.length === 0) {
        allScenarios.push(reportScenarioObject);
      } else {
        const separatedOutlines = separateScenarioOutline(codeceptScenarioObject, reportScenarioObject);
        allScenarios = [...allScenarios, ...separatedOutlines];
      }
    });
    return allScenarios;
  }

  function separateScenarioOutline(codeceptScenarioObject, reportScenarioObject) {
    const splitScenarios = [];
    const { examples } = codeceptScenarioObject;

    // a given scenario outline can have multiple example tables
    examples.forEach((example) => {
      const headerCells = example.tableHeader.cells;
      const bodyRows = example.tableBody;

      bodyRows.forEach((row) => {
        const rowCells = row.cells;
        const outlineExample = {};

        let outlineScenario = _.cloneDeep(reportScenarioObject);
        for (let i = 0; i < rowCells.length; i++) {
          const headerCell = headerCells[i].value;
          const rowCell = rowCells[i].value;
          outlineExample[headerCell] = rowCell;
          // append actual value to example variable place holders in steps
          if (config.includeExampleValues) {
            const re = new RegExp(`<${headerCell}>`, 'g');
            outlineScenario = JSON.parse(JSON.stringify(outlineScenario).replace(re, `<${headerCell}:${rowCell}>`));
          }
        }

        outlineScenario.name += ` ${JSON.stringify(outlineExample)}`;

        // example tables can have tagging associated with them
        if (example.tags.length > 0) {
          outlineScenario.tags = example.tags;
        }
        splitScenarios.push(outlineScenario);
      });
    });
    return splitScenarios;
  }

  function buildReportSteps(codeceptScenarioObject) {
    const allSteps = [];

    // get all gherkin steps for a scenario
    codeceptScenarioObject.steps.forEach((codeceptStepObject) => {
      const reportStep = {
        keyword: codeceptStepObject.keyword,
        line: codeceptStepObject.location.line,
        name: codeceptStepObject.text,
        match: {
          location: 'unavailable',
        },
        result: {
          status: 'skipped',
        },
        arguments: [],
        embeddings: [],
      };

      // update to handle codecept >= 3.4.0
      const buildArgument = () => {
        let arg = null;
        if (codeceptStepObject.docString) {
          arg = {
            type: 'DocString',
            content: codeceptStepObject.docString.content,
          };
        }
        if (codeceptStepObject.dataTable) {
          arg = {
            type: 'DataTable',
            ...codeceptStepObject.dataTable,
          };
        }
        return arg;
      };
      // get all arguments for a step
      const argument = codeceptStepObject.argument || buildArgument();
      if (argument) reportStep.arguments.push(getArgumentsFromCodecept(argument));
      allSteps.push(reportStep);
    });
    return allSteps;
  }

  function getArgumentsFromCodecept(argument) {
    let reportArgument = null;

    if (argument.type === 'DocString') {
      reportArgument = {
        content: argument.content,
      };
    } else if (argument.type === 'DataTable') {
      const tableRow = {
        rows: [],
      };

      argument.rows.forEach((row) => {
        const rowCells = {
          cells: [],
        };

        row.cells.forEach((cell) => {
          rowCells.cells.push(cell.value);
        });
        tableRow.rows.push(rowCells);
      });

      reportArgument = tableRow;
    } else {
      reportArgument = {
        content: 'Could not parse argument from step.',
      };
    }
    return reportArgument;
  }

  /* ******************************************************************
   * ************* Utility ********************************************
   ****************************************************************** */

  function getScenarioFromReport(feature, scenarioName) {
    const availablescenarios = [];
    for (let i = 0; i < feature.elements.length; i++) {
      const scenario = feature.elements[i];
      // if (!scenario.steps) scenario = scenario[0];
      let scenarioWithTag = scenario.name;

      scenario.tags.forEach((tag) => {
        scenarioWithTag += ` ${tag.name}`;
      });
      availablescenarios.push(scenarioWithTag);

      if (scenarioWithTag === scenarioName) return scenario;
    }
    output.log(`[CucumberJsonReporter] Could not find scenario: ${scenarioName}`);
    output.log('[CucumberJsonReporter] Available Scenarios:');
    availablescenarios.forEach((scenario) => output.log(`[CucumberJsonReporter] ${scenario}`));

    return null;
  }

  function removeNotExecutedScenarios() {
    allFeatures.forEach((feature) => {
      for (let i = feature.elements.length - 1; i >= 0; i--) {
        if (feature.elements[i].executed === false) {
          feature.elements.splice(i, 1);
        }
      }
    });
  }

  // BDD steps are meta steps of steps
  // However this can be multiple levels when using PageObjects.
  // Using recursive call we can get to lowest level which is BDD
  function getRootMetaStep(step) {
    const rootStep = step.metaStep ? getRootMetaStep(step.metaStep) : step;
    return rootStep;
  }

  // Checks if step is actually BDD
  // Before-After Hooks aren't BDD and we want to exclude those from reporting pass/fail
  function isBDD(step) {
    const metaStep = getRootMetaStep(step);
    const bdd = ['Given', 'When', 'Then', 'And'];
    const bddCheck = bdd.includes(metaStep.actor);
    return bddCheck;
  }

  function addScreenshotToReport(file_path) {
    if (!config.attachScreenshots) return;
    if (!report.step || !Array.isArray(report.step.embeddings)) {
      output.log('[CucumberJsonReporter] Skipping screenshot attachment; no active step to attach to.');
      return;
    }
    try {
      const convertedImg = fs.readFileSync(file_path, 'base64');
      const screenshot = {
        data: convertedImg,
        mime_type: 'image/png',
      };
      output.log(`[CucumberJsonReporter] Adding ${file_path} to:\n ${JSON.stringify(report.step)}`);
      report.step.embeddings.push(screenshot);
    } catch (error) {
      output.log(`[CucumberJsonReporter] Couldn't add ${file_path} to:\n ${JSON.stringify(report.step)}`);
    }
  }

  function addCommentToReport(step) {
    if (!config.attachComments) return;
    if (!report.step || !Array.isArray(report.step.embeddings)) {
      output.log(`[CucumberJsonReporter] Skipping comment "${step}" – no active step context.`);
      return;
    }
    const comment = {
      data: btoa(step),
      mime_type: 'text/plain',
    };
    output.log(`[CucumberJsonReporter] Adding comment "${step}" to:\n ${JSON.stringify(report.step)}`);
    report.step.embeddings.push(comment);
  }

  return plugin;
};

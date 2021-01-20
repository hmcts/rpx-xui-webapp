const aChecker = require("accessibility-checker");
const { conf } = require('../config/config');

const fs = require('fs');

let reportObj = {
  appName: 'Manage cases',
  pass: 0,
  fail: 0,
  tests: []
}

let testTitle = '';
function setA11yTestDetails(title) {
  testTitle = title;
}

async function accessibilityCheckerAuditor(description) {
  let pageContent = await browser.getPageSource();
  // const returnCode = aChecker.assertCompliance(result.report);
  // console.log(result.report.results);
  const complianceResult = await aChecker.getCompliance(pageContent, testTitle + '|' + description);
  const returnCode = aChecker.assertCompliance(complianceResult.report);

  let result = await geta11yResult(complianceResult.report);

  if (returnCode === 0) {
    reportObj.pass++;
  } else {
    reportObj.fail++;
  }
  let url = await browser.getCurrentUrl();
  let urlArr = url.split("/");
  reportObj.tests.push(getTestDetails(urlArr[urlArr.length - 1], returnCode === 0 ? 'passed' : 'failed', null, result));
}

async function takeScreenShot() {
  let screenshotPath = process.env.PWD + "/" + conf.reportPath + 'assets/';
  if (!fs.existsSync(screenshotPath)) {
    fs.mkdirSync(screenshotPath, { recursive: true });
  }
  screenshotName = Date.now() + '.png';
  screenshotPath = screenshotPath + Date.now() + '.png';
  screenshotReportRef = 'assets/' + screenshotName;
  let screenshotData = await global.screenShotUtils.takeScreenshot();
  var stream = fs.createWriteStream(screenshotPath);
  stream.write(new Buffer(screenshotData, 'base64'));
  stream.end();
  return screenshotReportRef;
}

async function geta11yResult(report) {
  let resultDetails = {
    documentTitle: await browser.getTitle(),
    pageUrl: await browser.getCurrentUrl(),
    screenshot: await takeScreenShot(),
    issues: []
  }

  for (let resultCounter = 0; resultCounter < report.results.length; resultCounter++) {
    let result = report.results[resultCounter];
    if (result.level !== 'pass') {
      resultDetails.issues.push({
        code: result.ruleId,
        type: result.level,
        typeCode: result.category,
        message: result.message,
        context: result.snippet,
        selector: "path: " + result.path.dom + " , Aria roles: " + result.path.aria,
        runner: "accessibility-checker",
        runnerExtras: {}

      });
    }

  }
  return resultDetails;

}

function getTestDetails(title, status, error, result) {
  return {
    name: testTitle + ' | ' + title,
    status: status,
    error: error,
    a11yResult: result
  };

}

module.exports = { accessibilityCheckerAuditor, reportObj, setA11yTestDetails }

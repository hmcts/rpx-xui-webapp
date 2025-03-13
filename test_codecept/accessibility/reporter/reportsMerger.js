
const fs = require('fs');
const { conf } = require('../config/config');

//generateMergedReport();

async function generateMergedReport() {
  const destDir = conf.reportPath;
  console.log('destDir ' + destDir);
  const results = fs.readdirSync(destDir, { withFileTypes: true })
    .filter((item) => !item.isDirectory())
    .map((item) => item.name);

  const mergedReportData = {
    appName: 'EXUI Manage Cases a11y Test Report',
    passed: 0,
    failed: 0,
    tests: []
  };

  for (const result of results) {
    if (!result.includes('.json')) {
      continue;
    }
    console.log('reading individual json '+result);
    const reportData = fs.readFileSync(destDir + result);
    const jsonObj = JSON.parse(reportData);

    mergedReportData.passed += jsonObj.passed;
    mergedReportData.failed += jsonObj.failed;
    mergedReportData.tests.push(...jsonObj.tests);
  }

  const sourceReport = __dirname + '/../reporter/Report.html';

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
  }
  const destReport = `${destDir}Report.html`;
  const destJson = `${destDir}report_output.json`;

  console.log('destRepprt :' + destReport);
  console.log('destJson :' + destJson);

  fs.copyFileSync(sourceReport, destReport);

  let htmlData = fs.readFileSync(sourceReport, 'utf8');
  console.log('html read done : ');
  fs.writeFileSync(destJson, JSON.stringify(mergedReportData));
  console.log('merged json done ');

  htmlData = htmlData.replace('replacejsoncontent', JSON.stringify(mergedReportData));
  console.log('html update done ');

  fs.writeFileSync(destReport, htmlData);
  console.log('html update write done');
}

module.exports = generateMergedReport;


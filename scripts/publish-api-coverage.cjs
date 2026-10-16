/* global require, module, process */
const fs = require('node:fs');
const path = require('node:path');
const { parse } = require('node-html-parser');

function publishApiCoverage(reportFolder, coverageRoot) {
  const reportFile = path.join(reportFolder, 'xui-playwright-api.html');
  if (!fs.existsSync(reportFile) || !fs.existsSync(path.join(coverageRoot, 'index.html'))) {
    throw new Error('API report or c8 coverage index missing; coverage was not published');
  }
  fs.cpSync(coverageRoot, path.join(reportFolder, 'coverage'), { recursive: true });
  const root = parse(fs.readFileSync(reportFile, 'utf8'));
  root.querySelector('#TabCoverage')?.remove();
  root.querySelector('.main-tablinks[onclick*="TabCoverage"]')?.remove();
  root
    .querySelector('.tab')
    ?.insertAdjacentHTML(
      'beforeend',
      '<button class="main-tablinks" onclick="openMainTab(event, \'TabCoverage\')">Coverage</button>'
    );
  root
    .querySelector('body')
    .insertAdjacentHTML(
      'beforeend',
      '<div id="TabCoverage" style="display: none" class="main-tabcontent"><h2>API test coverage</h2><p><a href="coverage/index.html">Open coverage report</a></p></div>'
    );
  fs.writeFileSync(reportFile, root.toString());
}

if (require.main === module)
  publishApiCoverage('functional-output/tests/playwright-api/odhin-report', 'reports/tests/coverage/api-playwright');
module.exports = { publishApiCoverage };

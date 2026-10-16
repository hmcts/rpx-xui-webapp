const assert = require('node:assert/strict');
const fs = require('node:fs');
const { JSDOM } = require('jsdom');

const source = fs.readFileSync(`${__dirname}/report.js`, 'utf8');
const dom = new JSDOM(
  `<!doctype html><html><body>
    <div class="tab"></div>
    <div id="TabDashboard"><div class="container-fluid"><div class="row">
      <div><div class="odhin-thin-border"><div class="info-box-header">Run info</div><table><tr><th>Total Execution Time</th><td>0h 17m 55s 0ms</td></tr></table></div></div>
      <div><div class="odhin-thin-border"><div class="info-box-header">Global Summary</div><div><table><tr><td><canvas id="chart-status"></canvas></td></tr></table></div><table>
        <tr><td class="chart-status-passed">Passed</td><td class="chart-status-passed-info">311</td><td class="chart-status-passed-info fst-italic">97.49%</td></tr>
        <tr><td class="chart-status-failed">Failed</td><td class="chart-status-failed-info">0</td><td class="chart-status-failed-info fst-italic">0%</td></tr>
        <tr><td class="chart-status-timedOut">Timed Out</td><td class="chart-status-timedOut-info">0</td><td class="chart-status-timedOut-info fst-italic">0%</td></tr>
        <tr><td class="chart-status-skipped">Skipped</td><td class="chart-status-skipped-info">7</td><td class="chart-status-skipped-info fst-italic">2.19%</td></tr>
        <tr><td class="chart-status-interrupted">Interrupted</td><td class="chart-status-interrupted-info">0</td><td class="chart-status-interrupted-info fst-italic">0%</td></tr>
        <tr><td class="chart-status-flaky">Flaky</td><td class="chart-status-flaky-info">1</td><td class="chart-status-flaky-info fst-italic">0.31%</td></tr>
      </table></div></div>
      <div><div class="odhin-thin-border"><div class="info-box-header">Projects Summary</div></div></div>
      <div><div class="odhin-thin-border"><div class="info-box-header">Status by project</div><table>
        <tr><td>chromium</td><td>319</td><td>0h 17m 47s 0ms</td><td class="result-status-passed">311 (<label class="fst-italic">97.49%</label>)</td><td class="result-status-failed">0 (<label class="fst-italic">0%</label>)</td><td class="result-status-timedOut">0 (<label class="fst-italic">0%</label>)</td><td class="result-status-skipped">7 (<label class="fst-italic">2.19%</label>)</td><td class="result-status-interrupted">0 (<label class="fst-italic">0%</label>)</td><td class="result-status-flaky">1 (<label class="fst-italic">0.31%</label>)</td></tr>
      </table></div></div>
    </div></div></div>
  </body></html>`,
  { url: 'https://static-build.hmcts.net/report/index.html', runScripts: 'outside-only' }
);

dom.window.eval(source);

const metrics = [...dom.window.document.querySelectorAll('.report-metric')].map((metric) =>
  [...metric.children].map((part) => part.textContent)
);
assert.deepEqual(metrics[0], ['Tests in this run', '319', 'Across all projects']);
assert.deepEqual(metrics[1], ['Pass rate', '100%', '312 passed · 7 skipped · 1 flaky']);
assert.deepEqual(metrics[2], ['Needs attention', '0', 'Failed · timed out · interrupted']);
assert.equal(dom.window.document.querySelector('.chart-status-passed-info').textContent, '312');
assert.equal(dom.window.document.querySelector('.chart-status-passed-info.fst-italic').textContent, '100%');
assert.equal(dom.window.document.querySelector('.result-status-passed').textContent, '312 (100%)');
assert(dom.window.document.querySelector('.report-redundant-chart'));
console.log('Dashboard metrics treat flaky final passes as pass-rate neutral.');

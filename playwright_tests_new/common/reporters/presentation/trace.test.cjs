const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { parse } = require('node-html-parser');
const source = fs
  .readFileSync(`${__dirname}/report.js`, 'utf8')
  .split('// Trace Viewer loads')[1]
  .split("// Perfetto's documented")[0];
for (const [baseURI, href] of [
  ['https://reports.example/job/1/report.html', 'traces/test%20one/trace.zip?attempt=1&x=2'],
  ['http://localhost:8080/report.html', 'traces/test/trace.zip'],
  ['file:///tmp/report.html', 'traces/test/trace.zip'],
  ['https://reports.example/report.html', 'data:application/zip;base64,UEs='],
  ['https://reports.example/report.html', null],
]) {
  const panel = parse(
    `<div id="TabTrace-test">${href ? `<a class="download-btn" download="trace.zip" href="${href}">Download Trace</a><a href="#">View Trace</a>` : ''}</div>`
  ).firstChild;
  const download = panel.querySelector('a[download]');
  const append = panel.append.bind(panel);
  if (download) {
    download.href = href;
    const insertAfter = download.after.bind(download);
    download.after = (node) =>
      insertAfter(
        parse(
          `<a class="${node.className}" href="${node.href}" target="${node.target}" rel="${node.rel}">${node.textContent}</a>`
        ).firstChild
      );
    download.parentElement = panel;
  }
  panel.append = (node) => append(parse(`<p>${node.textContent}</p>`).firstChild);
  vm.runInNewContext('// Trace Viewer loads' + source, {
    URL,
    document: {
      baseURI,
      querySelectorAll: () => [panel],
      createElement: () => ({}),
    },
  });
  const open = panel.querySelector('.trace-open');
  assert.equal(Boolean(open), Boolean(href));
  if (!href) {
    assert.match(panel.textContent, /No trace was retained/);
    continue;
  }
  assert.equal(download.getAttribute('href'), href, 'Download URL must remain unchanged');
  assert.equal(panel.querySelectorAll('a').length, 2, 'Only one viewer action');
  assert.equal(open.getAttribute('target'), '_blank');
  assert.equal(open.getAttribute('rel'), 'noopener noreferrer');
  const actual = new URL(open.getAttribute('href'));
  assert.equal(actual.origin, 'https://trace.playwright.dev');
  const trace = new URL(href, baseURI);
  assert.equal(actual.searchParams.get('trace'), /^https?:$/.test(trace.protocol) ? trace.href : null);
  assert.match(panel.textContent, /download.*trace/i);
}
console.log('Trace controls passed: HTTP(S), URL encoding, file/data fallback, native link replacement and no trace.');

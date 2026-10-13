/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS script. */
/* global require, module, process */
const fs = require('node:fs');
const path = require('node:path');

function writeIntegrationReportIndex(root, reportFile, profiles) {
  const escape = (value) =>
    value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  if (
    !profiles.length ||
    profiles.some((profile) => !/^[A-Za-z0-9_-][A-Za-z0-9._-]*$/.test(profile)) ||
    path.basename(reportFile) !== reportFile
  ) {
    throw new Error('Expected a report filename and safe profile directory names');
  }
  const rows = profiles.map((profile) => {
    const report = path.join(root, profile, reportFile);
    const results = fs.existsSync(path.join(root, 'test-results'))
      ? path.join(root, 'test-results')
      : path.join(root, profile, 'test-results');
    const traces = fs.existsSync(results)
      ? fs
          .readdirSync(results)
          .filter((file) => /^perfetto.*\.json$/.test(file))
          .sort()
      : [];
    const link = (file, label) => `<a href="${file.split('/').map(encodeURIComponent).join('/')}">${escape(label)}</a>`;
    const html = fs.existsSync(report) ? link(`${profile}/${reportFile}`, 'Open Odhín report') : 'Report unavailable';
    const perfetto = traces.length
      ? traces.map((file) => link(path.relative(root, path.join(results, file)), file)).join('<br>')
      : 'Perfetto unavailable';
    return `<tr><th scope="row">${escape(profile)}</th><td>${html}</td><td>${perfetto}</td></tr>`;
  });
  fs.mkdirSync(root, { recursive: true });
  fs.writeFileSync(
    path.join(root, 'index.html'),
    `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Playwright integration reports</title><h1>Playwright integration reports</h1><p>Each profile has independent results. Open its report for the test outcome. Download a Perfetto file to inspect its timeline.</p><table><thead><tr><th>Profile</th><th>Test report</th><th>Perfetto timeline</th></tr></thead><tbody>${rows.join('')}</tbody></table></html>\n`
  );
}

if (require.main === module) writeIntegrationReportIndex(...process.argv.slice(2, 4), process.argv.slice(4));
module.exports = { writeIntegrationReportIndex };

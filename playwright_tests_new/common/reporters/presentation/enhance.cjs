const fs = require('node:fs');
const path = require('node:path');
const escape = (value) =>
  String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

function applyPresentation(root, metadata = []) {
  root.querySelectorAll('#webapp-report-theme, #webapp-report-ui').forEach((node) => node.remove());
  const table = root.querySelector('#test-list-table');
  if (table && metadata.length) {
    table.querySelectorAll('[data-report-metadata]').forEach((node) => node.remove());
    const byTarget = new Map(metadata.map((test) => [test.target, test]));
    table.querySelectorAll('thead tr, tfoot tr').forEach((row) => {
      row.insertAdjacentHTML(
        'beforeend',
        '<th data-report-metadata>Feature</th><th data-report-metadata>Tags</th><th data-report-metadata>Attempt</th>'
      );
    });
    table.querySelectorAll('tbody tr').forEach((row) => {
      const test = byTarget.get(row.getAttribute('data-bs-target'));
      row.setAttribute('data-duration-ms', String(test?.durationMs ?? 0));
      row.insertAdjacentHTML(
        'beforeend',
        `<td data-report-metadata>${escape(test?.feature ?? 'Uncategorised')}</td><td data-report-metadata>${escape((test?.tags ?? []).join(', '))}</td><td data-report-metadata>${escape((test?.retry ?? 0) + 1)}</td>`
      );
    });
  }
  // Accessibility issue columns are inserted before duration; keep native footer column counts aligned.
  if (table?.querySelector('thead .odhin-a11y-issues-header')) {
    table
      .querySelector('tfoot tr')
      ?.querySelectorAll('th')[1]
      ?.insertAdjacentHTML(
        'afterend',
        '<th class="odhin-a11y-issues-header">Issue groups</th><th class="odhin-a11y-issues-header">Fix hint</th>'
      );
  }
  root.querySelector('meta[name="viewport"]')?.setAttribute('content', 'width=device-width, initial-scale=1');
  root
    .querySelector('head')
    ?.insertAdjacentHTML(
      'beforeend',
      `<style id="webapp-report-theme">${fs.readFileSync(path.join(__dirname, 'report.css'), 'utf8')}</style>`
    );
  root
    .querySelector('body')
    ?.insertAdjacentHTML(
      'beforeend',
      `<script id="webapp-report-ui">${fs.readFileSync(path.join(__dirname, 'report.js'), 'utf8')}</script>`
    );
}
module.exports = { applyPresentation };

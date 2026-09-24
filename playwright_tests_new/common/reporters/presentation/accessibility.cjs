const { randomUUID } = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const escape = (value) =>
  String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const sources = {
  summary: ['Journey summary', 'Combined scanner outcomes, reachability and explicit interaction checks.'],
  axe: ['axe-core', 'Automated rules. Review incomplete results in the attached evidence.'],
  'wave-like': ['WAVE-like heuristics', 'Local DOM checks; not the WebAIM WAVE service.'],
  'screen-reader': ['Screen-reader heuristics', 'Local DOM checks; no NVDA, JAWS or VoiceOver session is executed.'],
  lighthouse: ['Lighthouse', 'Automated audit and configured threshold; not a conformance score.'],
};
const manualChecks = [
  [
    'keyboard',
    'Keyboard and focus',
    'Complete the journey with Tab, Shift+Tab, Enter, Space and Escape. Check visible focus, logical order, dialogs and focus restoration.',
  ],
  [
    'assistive',
    'Assistive technology',
    'Record actual NVDA, JAWS or VoiceOver and browser versions. Check names, reading order, changing content and errors through the whole journey.',
  ],
  [
    'reflow',
    'Zoom and reflow',
    'Check enlarged text, 200% zoom and a 320 CSS-pixel viewport. Record clipped content, lost controls and scrolling that prevents use.',
  ],
  [
    'visual',
    'Visual presentation',
    'Inspect contrast states, focus indicators, forced colours, text spacing and information conveyed only by colour. Record the tool and measurements.',
  ],
  [
    'content',
    'Content and language',
    'Review meaningful headings, link text, alternative text, English/Welsh language changes and understandable instructions.',
  ],
  [
    'forms',
    'Forms and recovery',
    'Trigger validation, recover from errors and check timeout warnings. Confirm errors are understandable and users can continue without losing their work.',
  ],
  [
    'media',
    'Media and documents',
    'Where present, review captions, transcripts, audio descriptions and document accessibility. Explain any not-applicable result.',
  ],
];

function injectAccessibilityWorkspace(root, entries, issueSummary) {
  root.querySelectorAll('#TabAccessibility, #a11y-workspace-tab, #a11y-workspace-script').forEach((node) => node.remove());
  if (!entries.length) return;
  const scenarios = [
    ...new Set(entries.map((entry) => JSON.stringify([entry.testTitle, entry.feature, entry.pageState, entry.context ?? {}]))),
  ];
  const label = (entry) => sources[entry.engine]?.[0] ?? entry.engine;
  const safeLink = (file, title) =>
    file && !/[\\/]/.test(file) && file !== '.' && file !== '..'
      ? `<a href="./accessibility-evidence/${encodeURIComponent(file)}" target="_blank" rel="noopener noreferrer">${escape(title)} ↗</a>`
      : '';
  const cards = entries
    .map(
      (
        entry
      ) => `<article class="a11y-evidence-card" data-source="${escape(entry.engine)}" data-status="${escape(entry.status || 'not-recorded')}">
    <div class="a11y-card-heading"><strong>${escape(label(entry))}</strong><span class="a11y-status">${escape(entry.status || 'not-recorded')}</span></div>
    <h3>${escape(entry.feature || entry.testTitle)}${entry.pageState ? ` · ${escape(entry.pageState)}` : ''}</h3>
    <p>${escape(entry.testTitle)}</p><p class="a11y-context">${escape(
      Object.entries(entry.context ?? {})
        .map(([key, value]) => `${key}: ${value}`)
        .join(' · ')
    )}</p>
    <p>${escape(entry.summary || `${entry.violationCount} reported findings`)}</p>
    <p>${entry.rules.map(escape).join(' · ') || 'No rule identifiers recorded'}</p>
    <div class="a11y-links">${safeLink(entry.htmlFileName, 'Read evidence')}${safeLink(entry.jsonFileName, 'JSON')}${safeLink(entry.screenshotFileName, 'Screenshot')}${safeLink(entry.reportFileName, 'Native report')}</div>
  </article>`
    )
    .join('');
  const options = (values) => values.map(([value, text]) => `<option value="${escape(value)}">${escape(text)}</option>`).join('');
  const sourceRows = Object.entries(sources)
    .map(([engine, [name, description]]) => {
      const count = entries.filter((entry) => entry.engine === engine).length;
      return `<li><strong>${escape(name)}</strong><span>${count ? `${count} evidence records` : 'No evidence in this run'}</span><p>${escape(description)}</p></li>`;
    })
    .join('');
  const blocked = entries.filter((entry) => ['blocked', 'unreachable', 'error'].includes(entry.status)).length;
  root
    .querySelector('.tab')
    ?.insertAdjacentHTML(
      'beforeend',
      '<button id="a11y-workspace-tab" class="main-tablinks" onclick="openMainTab(event, \'TabAccessibility\')">Accessibility</button>'
    );
  root.querySelector('body')?.insertAdjacentHTML(
    'beforeend',
    `<div id="TabAccessibility" class="main-tabcontent" style="display:none">
    <main class="a11y-workspace" data-report-id="${randomUUID()}">
      <header class="a11y-intro"><p class="a11y-eyebrow">ACCESSIBILITY · DEVELOPER WORKSPACE</p><h1>Build access into every journey</h1><p>Understand the evidence, remove barriers, and record the human checks automation cannot perform.</p>
      <nav aria-label="Accessibility sections"><a href="#a11y-evidence">Evidence</a><a href="#a11y-patterns">Recurring issues</a><a href="#a11y-sources">Tools and coverage</a><a href="#a11y-manual">Manual review</a><a href="#a11y-next">Developer workflow</a></nav></header>
      <div class="a11y-metrics"><div><strong>${scenarios.length}</strong>Recorded journey contexts</div><div><strong>${entries.length}</strong>Evidence records</div><div><strong>${blocked}</strong>Blocked / error records</div><div><strong id="a11y-manual-count">0 / ${scenarios.length * manualChecks.length}</strong>Manual checks recorded</div></div>
      <p class="a11y-note">This is evidence from this run, not a WCAG conformance verdict or full route inventory. Multiple engines can report the same barrier; summaries repeat scanner findings. Missing evidence and unreviewed checks are not passes.</p>
      <section id="a11y-evidence"><h2>Explore the evidence</h2><div class="a11y-controls"><label>Search journeys, rules or personas<input id="a11y-search" type="search" placeholder="Try: heading, cy, solicitor"></label><label>Source<select aria-label="Source" id="a11y-source"><option value="">All sources</option>${options([...new Set(entries.map((e) => e.engine))].map((engine) => [engine, sources[engine]?.[0] ?? engine]))}</select></label><label>Outcome<select aria-label="Outcome" id="a11y-status"><option value="">All outcomes</option>${options([...new Set(entries.map((e) => e.status || 'not-recorded'))].map((status) => [status, status]))}</select></label><button type="button" id="a11y-clear">Clear filters</button></div><p id="a11y-results" role="status">${entries.length} evidence records shown</p><div class="a11y-card-grid">${cards}</div></section>
      <section id="a11y-patterns"><h2>Fix repeated barriers at their source</h2><p>Review the affected states before choosing a shared-component fix. Counts represent test titles, not unique pages or confirmed defects.</p><div class="a11y-table-scroll">${issueSummary || '<p>No rule groups recorded. Check blocked states and manual coverage before drawing conclusions.</p>'}</div></section>
      <section id="a11y-sources"><h2>Tools and coverage</h2><ul class="a11y-source-grid">${sourceRows}</ul><p>Manual results can record evidence from assistive technology, contrast tools, WAVE, Accessibility Insights or other evaluation methods. These tools are not automatically run by this worksheet.</p></section>
      <section id="a11y-manual"><h2>Manual review worksheet</h2><p>Choose a journey context and record observations. This starter worksheet complements <a href="https://www.w3.org/WAI/test-evaluate/conformance/wcag-em/" target="_blank" rel="noopener noreferrer">WCAG-EM evaluation</a>; it is not a complete WCAG checklist. Keep case details and credentials out of notes.</p>
      <p><strong>Session only:</strong> export before closing or reloading. Import restores a worksheet exported from this exact report and replaces the current worksheet.</p>
      <div class="a11y-controls"><label>Journey context<select id="a11y-scenario">${options(
        scenarios.map((key, index) => {
          const [title, feature, state, context] = JSON.parse(key);
          return [String(index), [title, feature, state, ...Object.values(context)].filter(Boolean).join(' · ')];
        })
      )}</select></label></div>
      <form id="a11y-review-form"><div class="a11y-controls"><label>Reviewer<input name="reviewer" maxlength="120" required></label><label>Review date<input name="date" type="date" required></label><label>Browser, OS, tools and versions<input name="environment" maxlength="500" required></label></div>
      ${manualChecks.map(([id, title, instruction]) => `<details class="a11y-manual-check" open><summary>${title}</summary><p>${instruction}</p><div class="a11y-controls"><label>Outcome for ${title}<select aria-label="Outcome for ${title}" name="${id}-status"><option value="not-run">Not run</option><option value="passed">Passed</option><option value="failed">Failed</option><option value="blocked">Blocked</option><option value="not-applicable">Not applicable</option></select></label><label>Observations, steps and evidence reference<textarea name="${id}-notes" maxlength="4000" rows="2"></textarea></label></div></details>`).join('')}
      <button type="submit">Record this review</button></form><div class="a11y-controls"><button type="button" id="a11y-export">Export recorded reviews (JSON)</button><label>Import recorded reviews<input id="a11y-import" type="file" accept="application/json,.json"></label></div><p id="a11y-review-message" role="status">No manual checks recorded.</p><p id="a11y-review-results"></p></section>
      <section id="a11y-next"><h2>Build accessibility into the change</h2><ol><li>Choose representative roles, languages and journey states, including validation, dialogs and recovery.</li><li>Read the rule evidence and confirm the user impact. Fix shared components when multiple journeys expose the same cause.</li><li>Add a focused interaction regression test, rerun the scanners, and complete the relevant manual checks.</li><li>Attach evidence and remaining gaps to the pull request for human review.</li></ol><p><a href="https://www.w3.org/WAI/test-evaluate/" target="_blank" rel="noopener noreferrer">W3C evaluation guidance</a> · <a href="https://www.w3.org/WAI/WCAG22/quickref/" target="_blank" rel="noopener noreferrer">WCAG 2.2 reference</a></p></section>
    </main></div><script id="a11y-workspace-script">${fs.readFileSync(path.join(__dirname, 'accessibility.js'), 'utf8')}</script>`
  );
}
module.exports = { injectAccessibilityWorkspace };

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
function injectAccessibilityWorkspace(root, entries, issueSummary, developerHints) {
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
    ${
      entry.rules.length || entry.violationCount > 0 || ['blocked', 'error', 'unreachable'].includes(entry.status)
        ? `<div class="a11y-fix-guidance"><h4>Where to investigate and what to change</h4><ul>${developerHints([entry])
            .map((hint) => `<li>${escape(hint)}</li>`)
            .join(
              ''
            )}</ul><p><strong>Verify:</strong> reopen this exact page state with the same persona and language, rerun the named rule, and exercise the affected control with keyboard and assistive technology as applicable. Inspect the evidence to confirm the target; suggested locations are starting points, not source mappings.</p></div>`
        : ''
    }
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
    <main class="a11y-workspace">
      <header class="a11y-intro"><p class="a11y-eyebrow">ACCESSIBILITY · DEVELOPER WORKSPACE</p><h1>Build access into every journey</h1><p>Find the affected page and element, understand the likely fix, and verify the change.</p>
      <nav aria-label="Accessibility sections"><a href="#a11y-evidence">Evidence</a><a href="#a11y-patterns">Recurring issues</a><a href="#a11y-sources">Tools and coverage</a><a href="#a11y-next">Developer workflow</a></nav></header>
      <div class="a11y-metrics"><div><strong>${scenarios.length}</strong>Recorded journey contexts</div><div><strong>${entries.length}</strong>Evidence records</div><div><strong>${blocked}</strong>Blocked / error records</div></div>
      <p class="a11y-note">This is evidence from this run, not a WCAG conformance verdict or full route inventory. Multiple engines can report the same barrier; summaries repeat scanner findings. Missing evidence is not a pass. Automated checks cannot establish full accessibility.</p>
      <section id="a11y-evidence"><h2>Explore the evidence</h2><div class="a11y-controls"><label>Search journeys, rules or personas<input id="a11y-search" type="search" placeholder="Try: heading, cy, solicitor"></label><label>Source<select aria-label="Source" id="a11y-source"><option value="">All sources</option>${options([...new Set(entries.map((e) => e.engine))].map((engine) => [engine, sources[engine]?.[0] ?? engine]))}</select></label><label>Outcome<select aria-label="Outcome" id="a11y-status"><option value="">All outcomes</option>${options([...new Set(entries.map((e) => e.status || 'not-recorded'))].map((status) => [status, status]))}</select></label><button type="button" id="a11y-clear">Clear filters</button></div><p id="a11y-results" role="status">${entries.length} evidence records shown</p><div class="a11y-card-grid">${cards}</div></section>
      <section id="a11y-patterns"><h2>Fix repeated barriers at their source</h2><p>Review the affected states before choosing a shared-component fix. Counts represent test titles, not unique pages or confirmed defects.</p><div class="a11y-table-scroll">${issueSummary || '<p>No rule groups recorded. Check blocked states and scanner coverage before drawing conclusions.</p>'}</div></section>
      <section id="a11y-sources"><h2>Tools and coverage</h2><ul class="a11y-source-grid">${sourceRows}</ul><p>Use the linked engine evidence for rule details, DOM snippets and available standards references. Heuristic checks do not execute assistive technology.</p></section>
      <section id="a11y-next"><h2>Build accessibility into the change</h2><ol><li>Choose representative roles, languages and journey states, including validation, dialogs and recovery.</li><li>Read the rule evidence and confirm the user impact. Fix shared components when multiple journeys expose the same cause.</li><li>Add a focused interaction regression test, rerun the scanners, and complete the relevant manual checks.</li><li>Attach evidence and remaining gaps to the pull request for human review.</li></ol><p><a href="https://www.w3.org/WAI/test-evaluate/" target="_blank" rel="noopener noreferrer">W3C evaluation guidance</a> · <a href="https://www.w3.org/WAI/WCAG22/quickref/" target="_blank" rel="noopener noreferrer">WCAG 2.2 reference</a></p></section>
    </main></div><script id="a11y-workspace-script">${fs.readFileSync(path.join(__dirname, 'accessibility.js'), 'utf8')}</script>`
  );
}
module.exports = { injectAccessibilityWorkspace };

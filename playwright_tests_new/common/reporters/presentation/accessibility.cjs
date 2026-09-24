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
const contextKey = (entry) =>
  JSON.stringify([
    entry.testTitle,
    entry.feature,
    entry.pageState,
    Object.entries(entry.context ?? {}).sort(([a], [b]) => a.localeCompare(b)),
  ]);
function outcome(entry) {
  if (entry.rules.includes('lighthouse-report-missing')) return 'unavailable';
  if (['blocked', 'unreachable'].includes(entry.status)) return 'blocked';
  if (entry.status === 'error' || entry.rules.some((rule) => rule.endsWith(':engine-execution'))) return 'error';
  if (entry.status === 'known-findings') return 'known-findings';
  if (entry.violationCount > 0 || entry.status === 'issues-found') return 'issues-found';
  return entry.status || 'unavailable';
}
const outcomes = {
  'issues-found': 'Findings reported',
  'known-findings': 'Known findings',
  blocked: 'Blocked check',
  error: 'Scanner error',
  passed: 'Passed recorded checks',
  unavailable: 'Outcome unavailable',
};
function injectAccessibilityWorkspace(root, entries, _issueSummary, developerHints) {
  root.querySelectorAll('#TabAccessibility, #a11y-workspace-tab, #a11y-workspace-script').forEach((node) => node.remove());
  if (!entries.length) return;
  const label = (entry) => sources[entry.engine]?.[0] ?? entry.engine;
  const safeLink = (file, title) =>
    file && !/[\\/]/.test(file) && file !== '.' && file !== '..'
      ? `<a href="./accessibility-evidence/${encodeURIComponent(file)}" target="_blank" rel="noopener noreferrer">${escape(title)} ↗</a>`
      : '';
  const statusLabel = (entry) => outcomes[outcome(entry)] || outcome(entry);
  const details = (
    entry
  ) => `<details class="a11y-evidence-card" data-source="${escape(entry.engine)}" data-status="${escape(outcome(entry))}">
    <summary><strong>${escape(entry.pageState || entry.testTitle)}</strong> <span class="a11y-status">${escape(statusLabel(entry))}</span></summary>
    <p>${escape(entry.testTitle)} · ${escape(entry.feature)}</p>
    <p class="a11y-context">${escape(
      Object.entries(entry.context ?? {})
        .map(([key, value]) => `${key}: ${value}`)
        .join(' · ')
    )}</p>
    <p>${escape(entry.summary || `${entry.violationCount} reported findings`)}</p>
    <p><strong>Source:</strong> ${escape(label(entry))} · ${entry.rules.map(escape).join(' · ') || 'No rule identifiers recorded'}</p>
    ${entry.targets.length ? `<p><strong>DOM targets (for this evidence record):</strong></p><ul>${entry.targets.map((target) => `<li><code>${escape(target)}</code></li>`).join('')}</ul>` : ''}
    <div class="a11y-links">${safeLink(entry.htmlFileName, 'Read evidence')}${safeLink(entry.screenshotFileName, 'Screenshot')}</div>
    <details><summary>Technical evidence</summary><div class="a11y-links">${safeLink(entry.jsonFileName, 'JSON')}${safeLink(entry.reportFileName, 'Native report')}</div></details>
  </details>`;
  const groups = new Map();
  for (const entry of entries) {
    if (!['issues-found', 'known-findings', 'blocked', 'error'].includes(outcome(entry))) continue;
    let rules = entry.rules;
    if (entry.engine === 'summary')
      rules = rules.filter(
        (rule) =>
          !entries.some(
            (detail) =>
              detail.engine !== 'summary' &&
              contextKey(detail) === contextKey(entry) &&
              detail.rules.some((detailRule) => rule === `${detail.engine}:${detailRule}` || rule === detailRule)
          )
      );
    if (!rules.length && entry.rules.length) continue;
    for (const rule of new Set(rules.length ? rules : ['Unclassified finding'])) {
      const key = JSON.stringify([entry.engine, rule, outcome(entry)]);
      if (!groups.has(key)) groups.set(key, { rule, entries: [], status: outcome(entry) });
      groups.get(key).entries.push(entry);
    }
  }
  const groupRows = [...groups.values()]
    .sort(
      (a, b) => new Set(b.entries.map(contextKey)).size - new Set(a.entries.map(contextKey)).size || a.rule.localeCompare(b.rule)
    )
    .map((group) => {
      const count = new Set(group.entries.map(contextKey)).size;
      // Targets belong to the full record, not necessarily this individual rule.
      const hints = developerHints(group.entries.map((entry) => ({ ...entry, rules: [group.rule], targets: [] })));
      return `<details class="a11y-issue-group" data-source="${escape(group.entries[0].engine)}" data-count="${count}" data-status="${escape(group.status)}">
      <summary><strong>${escape(group.rule)}</strong><span>${count} affected context${count === 1 ? '' : 's'}</span><span>${escape(label(group.entries[0]))}</span><span class="a11y-status">${escape(outcomes[group.status])}</span></summary>
      <div class="a11y-group-body"><div class="a11y-fix-guidance"><h3>What to investigate</h3><ul>${hints.map((hint) => `<li>${escape(hint)}</li>`).join('')}</ul></div>
      <h3>Affected pages and states</h3>${group.entries.map((entry) => details({ ...entry, rules: [group.rule] })).join('')}</div></details>`;
    })
    .join('');
  const options = (values) => values.map(([value, text]) => `<option value="${escape(value)}">${escape(text)}</option>`).join('');
  const sourceRows = Object.entries(sources)
    .map(
      ([engine, [name, description]]) =>
        `<li><strong>${escape(name)}</strong><span>${entries.filter((entry) => entry.engine === engine).length} evidence records</span><p>${escape(description)}</p></li>`
    )
    .join('');
  const blocked = entries.filter((entry) => ['blocked', 'error', 'unavailable'].includes(outcome(entry))).length;
  root
    .querySelector('.tab')
    ?.insertAdjacentHTML(
      'beforeend',
      '<button id="a11y-workspace-tab" class="main-tablinks" onclick="openMainTab(event, \'TabAccessibility\')">Accessibility</button>'
    );
  root.querySelector('body')?.insertAdjacentHTML(
    'beforeend',
    `<div id="TabAccessibility" class="main-tabcontent" style="display:none"><main class="a11y-workspace">
    <header class="a11y-intro"><p class="a11y-eyebrow">ACCESSIBILITY · DEVELOPER WORKSPACE</p><h1>Accessibility findings</h1><p>Choose a rule, inspect an affected state, then follow the evidence to the fix.</p>
    <nav aria-label="Accessibility sections"><a href="#a11y-patterns">Issues</a><a href="#a11y-evidence">All evidence</a><a href="#a11y-sources">Tools and guidance</a></nav></header>
    <div class="a11y-metrics"><div><strong>${groups.size}</strong>Tool / rule / outcome groups</div><div><strong>${new Set(entries.map(contextKey)).size}</strong>Recorded journey contexts</div><div><strong>${blocked}</strong>Blocked, error or unavailable records</div></div>
    <p class="a11y-note">Groups are not unique defects or a conformance score. Different tools may detect the same barrier. Missing evidence is not a pass. Test execution results remain in Dashboard and Tests.</p>
    <div class="a11y-controls"><label>Search journeys, rules or personas<input id="a11y-search" type="search" placeholder="Try: heading, cy, solicitor"></label><label>Source<select aria-label="Source" id="a11y-source"><option value="">All sources</option>${options([...new Set(entries.map((e) => e.engine))].map((engine) => [engine, sources[engine]?.[0] ?? engine]))}</select></label><label>Outcome<select aria-label="Outcome" id="a11y-status"><option value="">All outcomes</option>${options([...new Set(entries.map(outcome))].map((status) => [status, outcomes[status] || status]))}</select></label><button type="button" id="a11y-clear">Clear filters</button></div>
    <p id="a11y-results" role="status"></p>
    <section id="a11y-patterns"><h2>Issues to investigate</h2><p>Most affected contexts first. Expand a rule for guidance and page evidence. Matching summary rules are omitted here only when detailed findings exist for the same context.</p>${groupRows}<p id="a11y-empty" hidden>No matching issue groups. Check all evidence for passed checks, unavailable outcomes and missing coverage.</p></section>
    <section id="a11y-evidence"><h2>All evidence</h2><details id="a11y-all-records"><summary>Browse all ${entries.length} records, including summaries and coverage gaps</summary><p>Summary records can repeat scanner findings. Counts cover recorded contexts only, not every webapp route.</p>${entries.map(details).join('')}</details></section>
    <section id="a11y-sources"><h2>Tools and guidance</h2><details><summary>Tool coverage and limitations</summary><ul class="a11y-source-grid">${sourceRows}</ul><p>Automated and heuristic checks cannot establish full accessibility or replace assistive-technology testing.</p></details>
    <details><summary>How to verify a fix</summary><ol><li>Open the exact affected state with the same persona, language and data mode.</li><li>Confirm the target and user impact in the linked evidence. Suggested source locations are starting points, not verified source mappings.</li><li>Rerun the named check and add a focused interaction regression test. Exercise keyboard and assistive technology where applicable.</li></ol><p><a href="https://www.w3.org/WAI/test-evaluate/" target="_blank" rel="noopener noreferrer">W3C evaluation guidance</a> · <a href="https://www.w3.org/WAI/WCAG22/quickref/" target="_blank" rel="noopener noreferrer">WCAG 2.2 reference</a></p></details></section>
    </main></div><script id="a11y-workspace-script">${fs.readFileSync(path.join(__dirname, 'accessibility.js'), 'utf8')}</script>`
  );
}
module.exports = { injectAccessibilityWorkspace };

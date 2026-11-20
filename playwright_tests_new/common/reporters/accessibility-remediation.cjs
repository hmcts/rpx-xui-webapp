/* global __dirname, module, require */
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { redactText, redactUrl } = require('./failure-context.cjs');

const instructionsFile = 'ACCESSIBILITY_FIX_INSTRUCTIONS.md';
const findingsFile = 'accessibility-findings.json';
const contextKeys = ['persona', 'language', 'authentication', 'dataMode'];
const missingEvidence = 'Some referenced evidence files are missing or unsafe; inspect the original run before proposing fixes.';

function safeEvidenceFile(evidenceDir, fileName) {
  if (typeof fileName !== 'string' || !/^[a-zA-Z0-9][a-zA-Z0-9_.-]*\.(?:html|json|png)$/.test(fileName)) return null;
  try {
    if (!fs.lstatSync(evidenceDir).isDirectory()) return null;
    const candidate = path.join(evidenceDir, fileName);
    return fs.lstatSync(candidate).isFile() ? candidate : null;
  } catch {
    return null;
  }
}

function safeText(value) {
  return redactText(typeof value === 'string' ? value : '').replace(/\p{Cc}/gu, ' ');
}

function safeSelector(value) {
  if (typeof value !== 'string' || /^https?:/i.test(value)) return null;
  const sanitized = safeText(value).replace(
    /\[(aria-label|title|value|placeholder|alt)\s*([~|^$*]?=)\s*(?:"[^"]*"|'[^']*'|[^\]]*)\]/gi,
    '[$1$2"[redacted]"]'
  );
  return sanitized || null;
}

function familyFor(rule) {
  return ['label', 'accessible-name', 'sr-accessible-name'].includes(rule) ? 'accessible-name' : rule;
}

// Project only the structured facts needed for triage; raw report artifacts stay protected.
function investigationData(evidenceDir, entries, warnings) {
  const files = new Map();
  const summaryFiles = new Set(entries.filter((entry) => entry.engine === 'summary').map((entry) => entry.jsonFileName));
  for (const entry of entries) {
    for (const name of [entry.htmlFileName, entry.jsonFileName, entry.screenshotFileName]) {
      if (!name || files.has(name)) continue;
      const file = safeEvidenceFile(evidenceDir, name);
      if (!file) continue;
      let descriptor;
      try {
        descriptor = fs.openSync(file, fs.constants.O_RDONLY | fs.constants.O_NOFOLLOW);
        const stat = fs.fstatSync(descriptor);
        if (!stat.isFile() || stat.size > 32 * 1024 * 1024) {
          warnings.add(
            'Some evidence artifacts exceed the digest size limit or are not regular files; their byte identity was not recorded.'
          );
          continue;
        }
        const bytes = fs.readFileSync(descriptor);
        files.set(name, {
          // Only page summaries need to remain in memory after hashing.
          bytes: summaryFiles.has(name) && bytes.length <= 1024 * 1024 ? bytes : undefined,
          sha256: createHash('sha256').update(bytes).digest('hex'),
        });
      } catch {
        warnings.add(missingEvidence);
      } finally {
        if (descriptor !== undefined) fs.closeSync(descriptor);
      }
    }
  }
  const pages = [];
  let missingPageSummaries = 0;
  const strictValues = [];
  const statuses = ['passed', 'failed', 'known-findings', 'issues-found', 'needs-review', 'error', 'blocked', 'unreachable'];
  const countKeys = ['issueCount', 'reviewCount', 'knownIssueCount', 'unexpectedIssueCount'];
  for (const entry of entries.filter((candidate) => candidate.engine === 'summary')) {
    let summary;
    try {
      const bytes = files.get(entry.jsonFileName)?.bytes;
      if (!bytes || bytes.length > 1024 * 1024) throw new Error('Missing or oversized page summary');
      summary = JSON.parse(bytes.toString('utf8'));
      if (!summary || !Array.isArray(summary.outcomes) || (summary.checks !== undefined && !Array.isArray(summary.checks))) {
        throw new Error('Invalid page summary');
      }
      const conflictingPage = ['feature', 'pageState'].some(
        (key) => summary[key] !== undefined && entry[key] !== undefined && summary[key] !== entry[key]
      );
      const conflictingContext = ['scenarioId', ...contextKeys].some(
        (key) =>
          summary.context?.[key] !== undefined &&
          entry.context?.[key] !== undefined &&
          summary.context[key] !== entry.context[key]
      );
      if (conflictingPage || conflictingContext) {
        warnings.add('Some page summaries conflict with their manifest page/context identity; their projections were omitted.');
        throw new Error('Conflicting page identity');
      }
    } catch {
      missingPageSummaries += 1;
      continue;
    }
    const strict = typeof summary.strict === 'boolean' ? summary.strict : null;
    strictValues.push(strict);
    pages.push({
      feature: safeText(entry.feature),
      pageState: safeText(entry.pageState),
      scenarioId: safeText(entry.context?.scenarioId),
      context: Object.fromEntries(
        contextKeys.filter((key) => entry.context?.[key]).map((key) => [key, safeText(entry.context[key])])
      ),
      strict,
      outcomes: summary.outcomes
        .filter((outcome) => outcome && ['axe', 'wave-like', 'screen-reader', 'lighthouse'].includes(outcome.engine))
        .map((outcome) => ({
          engine: outcome.engine,
          status: statuses.includes(outcome.status) ? outcome.status : 'unknown',
          ...Object.fromEntries(
            countKeys.filter((key) => Number.isSafeInteger(outcome[key]) && outcome[key] >= 0).map((key) => [key, outcome[key]])
          ),
          rules: Array.isArray(outcome.rules) ? outcome.rules.filter((rule) => typeof rule === 'string').map(safeText) : [],
          reviewRules: Array.isArray(outcome.reviewRules)
            ? outcome.reviewRules.filter((rule) => typeof rule === 'string').map(safeText)
            : [],
        })),
      checks: (summary.checks ?? [])
        .filter((check) => check && typeof check.name === 'string')
        .map((check) => ({
          name: safeText(check.name).slice(0, 200),
          status: ['passed', 'failed'].includes(check.status) ? check.status : 'unknown',
        })),
    });
  }
  if (missingPageSummaries) warnings.add('Some page summaries are missing, invalid or oversized; embedded outcomes are partial.');
  const observed = new Set(strictValues.filter((value) => value !== null));
  const strictMode =
    observed.size > 1
      ? 'mixed'
      : missingPageSummaries || strictValues.includes(null) || !strictValues.length
        ? null
        : strictValues[0];
  return {
    strictMode,
    data: {
      privacy:
        'Privacy-minimized structured data, not guaranteed sanitized or publicly shareable. Protected raw artifacts are not embedded.',
      completeness: 'not-established',
      runAndAttemptIdentity: 'not-recorded',
      missingPageSummaries,
      pages,
      artifacts: [...files]
        .map(([name, file]) => ({ reference: `./accessibility-evidence/${name}`, sha256: file.sha256 }))
        .sort((a, b) => a.reference.localeCompare(b.reference)),
      digestMeaning:
        'SHA-256 identifies the bytes read during export; it does not prove authenticity, completeness, historical run identity or privacy clearance.',
    },
  };
}

function writeAccessibilityRemediationPack(outputFolder, entries, evidenceWarnings = []) {
  const evidenceDir = path.join(outputFolder, 'accessibility-evidence');
  try {
    if (!fs.lstatSync(evidenceDir).isDirectory()) return null;
  } catch {
    return null;
  }
  const warnings = new Set(evidenceWarnings);
  warnings.add(
    'Original runner checkout and deployed application revision are not recorded; verify them separately against original run evidence.'
  );
  warnings.add(
    'Original run and attempt identity are not recorded; stale, mixed or overwritten evidence cannot be ruled out from these files.'
  );
  const investigation = investigationData(evidenceDir, entries, warnings);
  const groups = new Map();
  const summaries = entries.filter((entry) => entry.engine === 'summary');
  const engineEntries = entries.filter((entry) => entry.engine !== 'summary');

  function add(entry, classification, rule, target) {
    const context = Object.fromEntries(
      contextKeys.filter((key) => entry.context?.[key]).map((key) => [key, safeText(entry.context[key])])
    );
    const selector = safeSelector(target);
    const family = familyFor(safeText(rule));
    const feature = safeText(entry.feature);
    // shortcut: selector matches are candidates, source ownership must be verified before combining fixes.
    const targetIdentity = selector !== target && target ? createHash('sha256').update(String(target)).digest('hex') : '';
    const key = JSON.stringify([
      classification,
      feature,
      context,
      family,
      selector,
      targetIdentity,
      selector ? '' : safeText(entry.pageState),
    ]);
    const evidence = {};
    for (const [kind, fileName] of [
      ['html', entry.htmlFileName],
      ['json', entry.jsonFileName],
      ['screenshot', entry.screenshotFileName],
    ]) {
      if (!fileName) continue;
      if (safeEvidenceFile(evidenceDir, fileName)) evidence[kind] = `./accessibility-evidence/${fileName}`;
      else warnings.add(missingEvidence);
    }
    if (!groups.has(key))
      groups.set(key, {
        id: `a11y-${createHash('sha256').update(key).digest('hex').slice(0, 12)}`,
        classification,
        knownDisposition: classification === 'known-finding' ? 'known' : 'not-recorded-at-target-level',
        feature,
        context,
        family,
        selector,
        rules: [],
        engines: [],
        occurrences: [],
      });
    const group = groups.get(key);
    if (!group.rules.includes(safeText(rule))) group.rules.push(safeText(rule));
    if (!group.engines.includes(safeText(entry.engine))) group.engines.push(safeText(entry.engine));
    const pageSummary = summaries.find(
      (other) =>
        other.testTitle === entry.testTitle &&
        ['scenarioId', ...contextKeys].every((key) => other.context?.[key] === entry.context?.[key])
    );
    const route = [...(entry.targets ?? []), ...(pageSummary?.targets ?? [])].find((target) => /^https?:\/\//i.test(target));
    const occurrence = {
      route: route ? redactUrl(route) : null,
      pageState: safeText(entry.pageState),
      testTitle: safeText(entry.testTitle),
      scenarioId: safeText(entry.context?.scenarioId),
      engine: safeText(entry.engine),
      rule: safeText(rule),
      status: safeText(entry.status),
      evidence,
    };
    if (!group.occurrences.some((existing) => JSON.stringify(existing) === JSON.stringify(occurrence)))
      group.occurrences.push(occurrence);
  }

  for (const entry of engineEntries) {
    const classification =
      entry.status === 'error'
        ? 'execution-error'
        : ['blocked', 'unreachable'].includes(entry.status)
          ? 'unreachable'
          : entry.status === 'known-findings'
            ? 'known-finding'
            : entry.status === 'issues-found'
              ? 'reported-violation'
              : 'needs-review';
    if (entry.violationCount > 0 || ['error', 'blocked', 'unreachable'].includes(entry.status)) {
      const findings = entry.findings?.length
        ? entry.findings
        : (entry.rules?.length ? entry.rules : ['unclassified']).map((rule) => ({
            rule,
            targets: entry.rules?.length === 1 ? entry.targets : [],
          }));
      for (const finding of findings) {
        for (const target of finding.targets?.length ? finding.targets : [null]) add(entry, classification, finding.rule, target);
      }
    }
    if (entry.reviewCount > 0 || entry.status === 'needs-review') {
      for (const rule of entry.reviewRules?.length ? entry.reviewRules : ['incomplete-result'])
        add(entry, 'needs-review', rule, null);
    }
  }
  for (const entry of summaries) {
    const related = engineEntries.some(
      (other) =>
        other.testTitle === entry.testTitle &&
        ['scenarioId', ...contextKeys].every((key) => other.context?.[key] === entry.context?.[key])
    );
    const rules = (entry.rules ?? []).filter(
      (rule) =>
        rule.startsWith('behavior:') || rule.endsWith(':engine-execution') || ['blocked', 'unreachable'].includes(entry.status)
    );
    for (const rule of rules) {
      const classification = rule.endsWith(':engine-execution')
        ? 'execution-error'
        : ['blocked', 'unreachable'].includes(entry.status)
          ? 'unreachable'
          : 'reported-violation';
      add(entry, classification, rule, null);
    }
    if (!related && !rules.length && entry.status !== 'passed') {
      add(
        entry,
        entry.status === 'known-findings' ? 'known-finding' : entry.status === 'error' ? 'execution-error' : 'needs-review',
        'summary-only-result',
        null
      );
    }
  }
  if (!entries.length)
    warnings.add(
      'No usable accessibility evidence entries were available; this is an incomplete report, not an accessibility pass.'
    );
  if (!summaries.length)
    warnings.add(
      'Page summaries are unavailable; scan coverage and journey completion must be verified against the original run.'
    );
  const findings = Array.from(groups.values())
    .map((group) => ({
      ...group,
      rules: group.rules.sort(),
      engines: group.engines.sort(),
      occurrences: group.occurrences.sort((left, right) => JSON.stringify(left).localeCompare(JSON.stringify(right))),
    }))
    .sort((left, right) => left.id.localeCompare(right.id));
  const pack = {
    schemaVersion: 2,
    provenance: {
      testedCommit: null,
      buildUrl: null,
      note: 'Original runner checkout and deployed application revision are unknown. A checkout SHA does not prove a deployment. Bind historical claims to original evidence; identify a fresh current-source reproduction separately.',
    },
    source: { entryCount: entries.length, pageSummaryCount: summaries.length, strictMode: investigation.strictMode },
    reportMode:
      'Strict mode describes only readable observed page summaries (mixed or null means mixed or unknown/partial). Run completeness and blocking CI outcome are not established.',
    grouping:
      'Candidate groups by feature, persona/language/setup, rule family and selector. These are not confirmed root causes or PR counts.',
    investigation: investigation.data,
    warnings: Array.from(warnings).sort(),
    findings,
  };
  const template = fs.readFileSync(path.join(__dirname, 'accessibility-fix-instructions.md'), 'utf8');
  const overview = `\n## This report\n\n${entries.length} evidence entries; ${summaries.length} page summaries; ${findings.length} candidate groups; ${pack.warnings.length} evidence warnings.\n\nOpen [the structured findings](./${findingsFile}) for classifications, context, selectors and relative evidence links. Counts are observations, not confirmed defects. Zero groups does not establish accessibility conformance.\n`;
  const flags = fs.constants.O_WRONLY | fs.constants.O_CREAT | fs.constants.O_TRUNC | fs.constants.O_NOFOLLOW;
  fs.writeFileSync(path.join(outputFolder, findingsFile), `${JSON.stringify(pack, null, 2)}\n`, { flag: flags });
  fs.writeFileSync(path.join(outputFolder, instructionsFile), template + overview, { flag: flags });
  return pack;
}

module.exports = { safeEvidenceFile, writeAccessibilityRemediationPack };

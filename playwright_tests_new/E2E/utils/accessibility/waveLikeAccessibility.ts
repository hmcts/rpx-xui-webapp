import type { Page, TestInfo } from '@playwright/test';
import * as fs from 'fs/promises';
import * as path from 'path';

export const WAVE_LIKE_A11Y_TAG = '@wave-a11y';
export const waveLikeA11ySpecPattern = '**/*.wave-a11y.spec.ts';

const splitTags = (raw: string | undefined): string[] =>
  (raw ?? '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

export const includesWaveLikeA11y = (env: NodeJS.ProcessEnv): boolean =>
  env.PLAYWRIGHT_INCLUDE_WAVE_A11Y === 'true' ||
  [...splitTags(env.E2E_PW_INCLUDE_TAGS), ...splitTags(env.PLAYWRIGHT_TAGS)].includes(WAVE_LIKE_A11Y_TAG);

type WaveLikeViolation = {
  rule: string;
  message: string;
  selector?: string;
  html?: string;
};

type PublishedEvidenceEntry = {
  testTitle: string;
  attachmentPrefix: string;
  htmlFileName: string;
  jsonFileName: string;
  screenshotFileName: string;
  violationCount: number;
  rules: string[];
  targets: string[];
};

const EVIDENCE_MANIFEST_FILE = 'manifest.json';
const EVIDENCE_ENTRY_PREFIX = 'manifest-entry-';

export async function collectWaveLikeAccessibilityViolations(page: Page): Promise<WaveLikeViolation[]> {
  return page.evaluate<WaveLikeViolation[]>(() => {
    const visible = (element: Element): element is HTMLElement => {
      if (!(element instanceof HTMLElement)) {
        return false;
      }
      if (element.hidden || element.getAttribute('aria-hidden') === 'true') {
        return false;
      }
      if (element instanceof HTMLInputElement && element.type === 'hidden') {
        return false;
      }
      const style = window.getComputedStyle(element);
      return style.visibility !== 'hidden' && style.display !== 'none' && element.getClientRects().length > 0;
    };

    const text = (element: Element | null): string => element?.textContent?.replace(/\s+/g, ' ').trim() ?? '';
    const selectorFor = (element: Element): string => {
      const id = element.getAttribute('id');
      if (id) {
        return `#${id}`;
      }
      const testId = element.getAttribute('data-testid') ?? element.getAttribute('data-test-id');
      if (testId) {
        return `[data-testid="${testId}"]`;
      }
      return element.tagName.toLowerCase();
    };
    const htmlFor = (element: Element): string => element.outerHTML.slice(0, 500);
    const add = (violations: WaveLikeViolation[], rule: string, message: string, element?: Element) => {
      violations.push({
        rule,
        message,
        ...(element ? { selector: selectorFor(element), html: htmlFor(element) } : {}),
      });
    };
    const labelledByText = (element: Element): string =>
      (element.getAttribute('aria-labelledby') ?? '')
        .split(/\s+/)
        .filter(Boolean)
        .map((id) => text(document.getElementById(id)))
        .filter(Boolean)
        .join(' ');
    const controlLabels = (element: Element): string => {
      if (
        element instanceof HTMLInputElement ||
        element instanceof HTMLSelectElement ||
        element instanceof HTMLTextAreaElement ||
        element instanceof HTMLButtonElement ||
        element instanceof HTMLOutputElement
      ) {
        return Array.from(element.labels ?? [])
          .map((label) => text(label))
          .filter(Boolean)
          .join(' ');
      }
      const id = element.getAttribute('id');
      if (!id) {
        return '';
      }
      return Array.from(document.querySelectorAll(`label[for="${CSS.escape(id)}"]`))
        .map((label) => text(label))
        .filter(Boolean)
        .join(' ');
    };
    const accessibleName = (element: Element): string => {
      const ariaLabel = element.getAttribute('aria-label')?.trim() ?? '';
      const labelledBy = labelledByText(element);
      const labelText = controlLabels(element);
      const title = element.getAttribute('title')?.trim() ?? '';
      const placeholder = element.getAttribute('placeholder')?.trim() ?? '';
      const value =
        element instanceof HTMLInputElement && ['button', 'submit', 'reset'].includes(element.type) ? element.value.trim() : '';
      const imageAlt = Array.from(element.querySelectorAll('img'))
        .map((image) => image.getAttribute('alt')?.trim() ?? '')
        .filter(Boolean)
        .join(' ');
      return [ariaLabel, labelledBy, labelText, title, placeholder, value, imageAlt, text(element)]
        .filter(Boolean)
        .join(' ')
        .trim();
    };

    const violations: WaveLikeViolation[] = [];

    if (!document.documentElement.getAttribute('lang')?.trim()) {
      add(violations, 'document-language', 'The html element should declare a lang attribute.');
    }

    const title = document.title.trim();
    if (!title || /^untitled$/i.test(title)) {
      add(violations, 'document-title', 'The page should have a meaningful document title.');
    }

    const mainLandmarks = Array.from(document.querySelectorAll('main, [role="main"]')).filter(visible);
    if (mainLandmarks.length !== 1) {
      add(violations, 'main-landmark', `Expected exactly one visible main landmark, found ${mainLandmarks.length}.`);
    }

    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).filter(visible);
    const h1s = headings.filter((heading) => heading.tagName.toLowerCase() === 'h1');
    if (h1s.length !== 1) {
      add(violations, 'h1-count', `Expected exactly one visible h1, found ${h1s.length}.`, h1s[0]);
    }
    headings.reduce((previousLevel, heading) => {
      const level = Number(heading.tagName.slice(1));
      if (previousLevel > 0 && level > previousLevel + 1) {
        add(violations, 'heading-order', `Heading level jumps from h${previousLevel} to h${level}.`, heading);
      }
      return level;
    }, 0);

    const ids = new Map<string, Element[]>();
    document.querySelectorAll('[id]').forEach((element) => {
      const id = element.getAttribute('id') ?? '';
      ids.set(id, [...(ids.get(id) ?? []), element]);
    });
    ids.forEach((elements, id) => {
      if (id && elements.length > 1) {
        add(violations, 'duplicate-id', `Duplicate id "${id}" appears ${elements.length} times.`, elements[0]);
      }
    });

    Array.from(document.querySelectorAll('a[href], button, input, select, textarea, [role="button"], [role="link"]'))
      .filter(visible)
      .filter((element) => !accessibleName(element))
      .forEach((element) =>
        add(violations, 'accessible-name', 'Interactive controls and links should expose an accessible name.', element)
      );

    Array.from(document.querySelectorAll('img'))
      .filter(visible)
      .filter((image) => {
        const role = image.getAttribute('role')?.trim().toLowerCase() ?? '';
        return role !== 'presentation' && role !== 'none' && image.getAttribute('alt') === null;
      })
      .forEach((image) => add(violations, 'image-alt', 'Images should have alt text or be marked decorative.', image));

    Array.from(document.querySelectorAll('fieldset'))
      .filter(visible)
      .filter((fieldset) => !text(fieldset.querySelector('legend')))
      .forEach((fieldset) =>
        add(violations, 'fieldset-legend', 'Fieldsets should expose a visible legend for grouped controls.', fieldset)
      );

    Array.from(document.querySelectorAll('table'))
      .filter(visible)
      .filter((table) => table.querySelectorAll('td').length > 0)
      .filter((table) => table.querySelectorAll('th, [role="columnheader"], [role="rowheader"]').length === 0)
      .forEach((table) => add(violations, 'table-headers', 'Data tables should expose row or column headers.', table));

    Array.from(document.querySelectorAll('.govuk-error-summary a[href]')).forEach((link) => {
      const href = link.getAttribute('href') ?? '';
      if (!href.startsWith('#')) {
        add(violations, 'error-summary-target', 'Error summary links should target controls on the same page.', link);
        return;
      }
      if (!document.getElementById(decodeURIComponent(href.slice(1)))) {
        add(violations, 'error-summary-target', `Error summary link target "${href}" does not exist.`, link);
      }
    });

    return violations;
  });
}

export async function attachWaveLikeAccessibilityEvidence(
  page: Page,
  testInfo: TestInfo | undefined,
  violations: WaveLikeViolation[],
  attachmentPrefix = 'wave-accessibility-issues'
): Promise<void> {
  if (!testInfo || violations.length === 0) {
    return;
  }

  const json = JSON.stringify({ url: page.url(), violationCount: violations.length, violations }, null, 2);
  await testInfo.attach(`${attachmentPrefix}.json`, {
    body: json,
    contentType: 'application/json',
  });
  await testInfo.attach(`${attachmentPrefix}.html`, {
    body: buildIssueSummaryHtml(page.url(), violations),
    contentType: 'text/html',
  });

  const cleanup = await markViolationsOnPage(page, violations);
  let screenshot: Buffer;
  try {
    screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach(`${attachmentPrefix}-highlighted-screenshot.png`, {
      body: screenshot,
      contentType: 'image/png',
    });
  } finally {
    await cleanup();
  }

  await writePublishedEvidence(testInfo, page.url(), violations, screenshot, attachmentPrefix);
}

function buildIssueSummaryHtml(url: string, violations: WaveLikeViolation[]): string {
  const cards = violations
    .map(
      (violation, index) => `
        <section class="issue">
          <h2>${index + 1}. ${escapeHtml(violation.rule)}</h2>
          <p><strong>${escapeHtml(violation.message)}</strong></p>
          <p><strong>Selector:</strong> <code>${escapeHtml(violation.selector ?? 'page')}</code></p>
          <pre>${escapeHtml(violation.html ?? '')}</pre>
        </section>
      `
    )
    .join('');

  return `
    <html>
      <head>
        <title>WAVE-like Accessibility Issues</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 24px; color: #0b0c0c; }
          .banner { background: #d4351c; color: #fff; padding: 16px; margin-bottom: 24px; }
          .issue { border: 4px solid #d4351c; padding: 16px; margin-bottom: 18px; }
          .issue h2 { margin-top: 0; }
          code, pre { background: #f3f2f1; padding: 4px; white-space: pre-wrap; }
        </style>
      </head>
      <body>
        <div class="banner">
          <h1>WAVE-LIKE ACCESSIBILITY ISSUES FOUND</h1>
          <p>${violations.length} issue(s) on ${escapeHtml(url)}. Match marker numbers here to the highlighted screenshot.</p>
        </div>
        ${cards}
      </body>
    </html>
  `;
}

async function markViolationsOnPage(page: Page, violations: WaveLikeViolation[]): Promise<() => Promise<void>> {
  await page.evaluate(
    (items) => {
      const overlayRoot = document.createElement('div');
      overlayRoot.setAttribute('data-testid', 'wave-violation-overlays');
      overlayRoot.style.position = 'absolute';
      overlayRoot.style.left = '0';
      overlayRoot.style.top = '0';
      overlayRoot.style.width = '0';
      overlayRoot.style.height = '0';
      overlayRoot.style.zIndex = '2147483647';
      overlayRoot.style.pointerEvents = 'none';
      document.body.appendChild(overlayRoot);

      for (const item of items) {
        if (!item.selector) {
          continue;
        }
        let element: Element | null = null;
        try {
          element = document.querySelector(item.selector);
        } catch {
          element = null;
        }
        if (!element) {
          continue;
        }
        const rect = element.getBoundingClientRect();
        const marker = document.createElement('div');
        marker.style.position = 'absolute';
        marker.style.left = `${rect.left + window.scrollX}px`;
        marker.style.top = `${rect.top + window.scrollY}px`;
        marker.style.width = `${Math.max(rect.width, 2)}px`;
        marker.style.height = `${Math.max(rect.height, 2)}px`;
        marker.style.outline = '6px solid #d4351c';
        marker.style.background = 'rgba(255, 221, 0, 0.24)';
        marker.style.boxSizing = 'border-box';

        const label = document.createElement('div');
        label.textContent = `${item.index + 1} ${item.rule}`;
        label.style.position = 'absolute';
        label.style.left = '0';
        label.style.top = '-32px';
        label.style.background = '#d4351c';
        label.style.color = '#fff';
        label.style.font = 'bold 16px Arial, sans-serif';
        label.style.padding = '4px 8px';
        label.style.whiteSpace = 'nowrap';

        marker.appendChild(label);
        overlayRoot.appendChild(marker);
      }
    },
    violations.map((violation, index) => ({ ...violation, index }))
  );

  return async () => {
    await page.evaluate(() => {
      document.querySelector('[data-testid="wave-violation-overlays"]')?.remove();
    });
  };
}

async function writePublishedEvidence(
  testInfo: TestInfo,
  url: string,
  violations: WaveLikeViolation[],
  screenshot: Buffer,
  attachmentPrefix: string
): Promise<void> {
  const evidenceDir = path.resolve(
    process.env.PW_A11Y_EVIDENCE_DIR ||
      path.join(
        process.env.PLAYWRIGHT_REPORT_FOLDER || 'functional-output/tests/playwright-wave-a11y/odhin-report',
        'accessibility-evidence'
      )
  );
  const safeTitle = sanitiseFileName(testInfo.title);
  const baseName = `${safeTitle}-${attachmentPrefix}`;
  const htmlFileName = `${baseName}.html`;
  const jsonFileName = `${baseName}.json`;
  const screenshotFileName = `${baseName}-highlighted-screenshot.png`;
  const entry: PublishedEvidenceEntry = {
    testTitle: testInfo.title,
    attachmentPrefix,
    htmlFileName,
    jsonFileName,
    screenshotFileName,
    violationCount: violations.length,
    rules: violations.map((violation) => violation.rule),
    targets: violations.map((violation) => violation.selector ?? url),
  };

  await fs.mkdir(evidenceDir, { recursive: true });
  await fs.writeFile(path.join(evidenceDir, htmlFileName), buildIssueSummaryHtml(url, violations));
  await fs.writeFile(
    path.join(evidenceDir, jsonFileName),
    JSON.stringify({ url, violationCount: violations.length, violations }, null, 2)
  );
  await fs.writeFile(path.join(evidenceDir, screenshotFileName), screenshot);
  await writeEvidenceEntry(evidenceDir, baseName, entry);
  await writeEvidenceManifest(evidenceDir, entry);
  await writeEvidenceIndex(evidenceDir);
}

async function writeEvidenceEntry(evidenceDir: string, baseName: string, entry: PublishedEvidenceEntry): Promise<void> {
  await fs.writeFile(path.join(evidenceDir, `${EVIDENCE_ENTRY_PREFIX}${baseName}.json`), JSON.stringify(entry, null, 2));
}

async function writeEvidenceManifest(evidenceDir: string, entry: PublishedEvidenceEntry): Promise<void> {
  const manifestPath = path.join(evidenceDir, EVIDENCE_MANIFEST_FILE);
  const existingEntries = await readEvidenceManifest(evidenceDir);
  const retainedEntries = existingEntries.filter(
    (existingEntry) => existingEntry.testTitle !== entry.testTitle || existingEntry.attachmentPrefix !== entry.attachmentPrefix
  );

  await fs.writeFile(manifestPath, JSON.stringify([...retainedEntries, entry], null, 2));
}

async function readEvidenceManifest(evidenceDir: string): Promise<PublishedEvidenceEntry[]> {
  const manifestPath = path.join(evidenceDir, EVIDENCE_MANIFEST_FILE);
  const entriesByKey = new Map<string, PublishedEvidenceEntry>();

  try {
    const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
    if (Array.isArray(manifest)) {
      for (const entry of manifest.filter(isPublishedEvidenceEntry)) {
        entriesByKey.set(evidenceEntryKey(entry), entry);
      }
    }
  } catch {
    // Missing or partially written aggregate manifests are tolerated; per-test entry files are the source of truth.
  }

  try {
    const fileNames = await fs.readdir(evidenceDir);
    await Promise.all(
      fileNames
        .filter((fileName) => fileName.startsWith(EVIDENCE_ENTRY_PREFIX) && fileName.endsWith('.json'))
        .map(async (fileName) => {
          try {
            const entry = JSON.parse(await fs.readFile(path.join(evidenceDir, fileName), 'utf8'));
            if (isPublishedEvidenceEntry(entry)) {
              entriesByKey.set(evidenceEntryKey(entry), entry);
            }
          } catch {
            // Ignore a single corrupt entry so one failed write does not break the whole report.
          }
        })
    );
  } catch {
    return Array.from(entriesByKey.values());
  }

  return Array.from(entriesByKey.values());
}

function evidenceEntryKey(entry: PublishedEvidenceEntry): string {
  return `${entry.testTitle}\u0000${entry.attachmentPrefix}`;
}

function isPublishedEvidenceEntry(value: unknown): value is PublishedEvidenceEntry {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<PublishedEvidenceEntry>;
  return (
    typeof candidate.testTitle === 'string' &&
    typeof candidate.attachmentPrefix === 'string' &&
    typeof candidate.htmlFileName === 'string' &&
    typeof candidate.jsonFileName === 'string' &&
    typeof candidate.screenshotFileName === 'string' &&
    typeof candidate.violationCount === 'number' &&
    Array.isArray(candidate.rules) &&
    Array.isArray(candidate.targets)
  );
}

async function writeEvidenceIndex(evidenceDir: string): Promise<void> {
  const manifestEntries = await readEvidenceManifest(evidenceDir);
  const rows = manifestEntries
    .sort((a, b) => a.testTitle.localeCompare(b.testTitle) || a.attachmentPrefix.localeCompare(b.attachmentPrefix))
    .map((entry) => {
      return `
        <li>
          <a class="issue-link" href="./${escapeAttribute(entry.htmlFileName)}">${escapeHtml(entry.testTitle)}</a>
          <p>${entry.violationCount} WAVE-like rule issue(s): ${escapeHtml(entry.rules.join(', '))}</p>
          <br />
          <a href="./${escapeAttribute(entry.screenshotFileName)}">highlighted screenshot</a>
          |
          <a href="./${escapeAttribute(entry.jsonFileName)}">DOM and WAVE-like JSON</a>
        </li>
      `;
    })
    .join('');

  await fs.writeFile(
    path.join(evidenceDir, 'index.html'),
    `
      <html>
        <head>
          <title>WAVE-like Accessibility Evidence</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 24px; color: #0b0c0c; }
            .banner { background: #d4351c; color: #fff; padding: 16px; margin-bottom: 24px; }
            .issue-link { font-weight: bold; font-size: 18px; }
            li { margin-bottom: 16px; }
          </style>
        </head>
        <body>
          <div class="banner">
            <h1>WAVE-LIKE ACCESSIBILITY EVIDENCE</h1>
            <p>Open each item for rule, DOM selector, failing HTML, and a red highlighted screenshot.</p>
          </div>
          <ol>${rows}</ol>
        </body>
      </html>
    `
  );
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function escapeAttribute(value: string): string {
  return escapeHtml(value).replace(/`/g, '&#96;');
}

function sanitiseFileName(value: string): string {
  return (
    value
      .replace(/[^a-z0-9._-]+/gi, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 120) || 'wave-accessibility'
  );
}

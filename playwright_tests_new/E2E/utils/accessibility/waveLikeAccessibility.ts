import type { Page, TestInfo } from '@playwright/test';
import { escapeAttribute, escapeHtml, publishAccessibilityEvidence } from './accessibilityEvidencePublisher';

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

type PublishedEvidenceMetadata = {
  engine: 'wave-like';
  feature: string;
  pageState: string;
};

type WaveLikePageSnapshot = {
  title: string;
  headings: Array<{ level: number; text: string }>;
  landmarks: Array<{ role: string; text: string }>;
  order: Array<{ type: string; name: string; selector: string }>;
};

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
  attachmentPrefix = 'wave-accessibility-issues',
  metadata?: PublishedEvidenceMetadata
): Promise<void> {
  if (!testInfo || violations.length === 0) {
    return;
  }

  const json = JSON.stringify({ url: page.url(), violationCount: violations.length, violations }, null, 2);
  await testInfo.attach(`${attachmentPrefix}.json`, {
    body: json,
    contentType: 'application/json',
  });

  const pageSnapshot = await collectWaveLikePageSnapshot(page);
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

  await testInfo.attach(`${attachmentPrefix}.html`, {
    body: buildIssueSummaryHtml(page.url(), violations, pageSnapshot, screenshot),
    contentType: 'text/html',
  });

  await writePublishedEvidence(testInfo, page.url(), violations, pageSnapshot, screenshot, attachmentPrefix, metadata);
}

async function collectWaveLikePageSnapshot(page: Page): Promise<WaveLikePageSnapshot> {
  return page.evaluate<WaveLikePageSnapshot>(() => {
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
      return '';
    };
    const accessibleName = (element: Element): string => {
      const ariaLabel = element.getAttribute('aria-label')?.trim() ?? '';
      const labelledBy = labelledByText(element);
      const labelText = controlLabels(element);
      const title = element.getAttribute('title')?.trim() ?? '';
      const value =
        element instanceof HTMLInputElement && ['button', 'submit', 'reset'].includes(element.type) ? element.value.trim() : '';
      const imageAlt = Array.from(element.querySelectorAll('img'))
        .map((image) => image.getAttribute('alt')?.trim() ?? '')
        .filter(Boolean)
        .join(' ');
      return [ariaLabel, labelledBy, labelText, title, value, imageAlt, text(element)].filter(Boolean).join(' ').trim();
    };

    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
      .filter(visible)
      .map((heading) => ({ level: Number(heading.tagName.slice(1)), text: text(heading).slice(0, 160) }));
    const landmarks = Array.from(document.querySelectorAll('header, nav, main, aside, footer, [role]'))
      .filter(visible)
      .map((landmark) => ({
        role: landmark.getAttribute('role') || landmark.tagName.toLowerCase(),
        text: (landmark.getAttribute('aria-label') || text(landmark)).slice(0, 160),
      }))
      .filter((landmark) =>
        ['banner', 'navigation', 'main', 'complementary', 'contentinfo', 'header', 'nav', 'main', 'aside', 'footer'].includes(
          landmark.role
        )
      );
    const order = Array.from(document.querySelectorAll('a[href], button, input, select, textarea, [tabindex]'))
      .filter(visible)
      .filter((element) => element.getAttribute('tabindex') !== '-1')
      .map((element) => ({
        type:
          element instanceof HTMLInputElement
            ? `${element.type || 'input'} input`
            : element.tagName.toLowerCase() === 'a'
              ? 'link'
              : element.tagName.toLowerCase(),
        name: accessibleName(element).slice(0, 160) || '(no accessible name)',
        selector: selectorFor(element),
      }));

    return {
      title: document.title.trim(),
      headings,
      landmarks,
      order,
    };
  });
}

function buildIssueSummaryHtml(
  url: string,
  violations: WaveLikeViolation[],
  pageSnapshot: WaveLikePageSnapshot,
  screenshot: Buffer
): string {
  const screenshotDataUrl = `data:image/png;base64,${screenshot.toString('base64')}`;
  const ruleCounts = new Map<string, number>();
  for (const violation of violations) {
    ruleCounts.set(violation.rule, (ruleCounts.get(violation.rule) ?? 0) + 1);
  }
  const ruleRows = Array.from(ruleCounts.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(
      ([rule, count]) => `
        <li><span class="count">${count}</span>${escapeHtml(rule)}</li>
      `
    )
    .join('');
  const orderRows = pageSnapshot.order
    .map(
      (item, index) => `
        <li>
          <span class="marker">${index + 1}</span>
          <strong>${escapeHtml(item.type)}</strong>: ${escapeHtml(item.name)}
          <code>${escapeHtml(item.selector)}</code>
        </li>
      `
    )
    .join('');
  const structureRows = [
    ...pageSnapshot.headings.map(
      (heading) =>
        `<li><span class="structure-token">h${heading.level}</span>${escapeHtml(heading.text || '(empty heading)')}</li>`
    ),
    ...pageSnapshot.landmarks.map(
      (landmark) =>
        `<li><span class="structure-token">${escapeHtml(landmark.role)}</span>${escapeHtml(landmark.text || '(unlabelled)')}</li>`
    ),
  ].join('');
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
          body { font-family: Arial, sans-serif; margin: 0; color: #0b0c0c; background: #f3f2f1; }
          .layout { display: grid; grid-template-columns: minmax(280px, 360px) 1fr; min-height: 100vh; }
          .panel { background: #d5dce0; border-right: 1px solid #b1b4b6; padding: 12px; position: sticky; top: 0; height: 100vh; overflow: auto; }
          .panel h1 { font-size: 22px; margin: 0 0 12px; }
          .toolbar { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; margin-bottom: 12px; }
          .toolbar span { background: #fff; border-bottom: 3px solid #1d70b8; padding: 8px 4px; text-align: center; font-weight: bold; font-size: 12px; }
          .scorecard { background: #fff; border-radius: 4px; padding: 12px; margin-bottom: 12px; }
          .metric-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
          .metric { border-left: 6px solid #f47738; padding-left: 8px; font-size: 14px; }
          .metric strong { display: block; font-size: 26px; }
          .count { display: inline-block; min-width: 24px; margin-right: 8px; background: #1d70b8; color: #fff; border-radius: 3px; text-align: center; font-weight: bold; }
          .marker { display: inline-block; min-width: 24px; margin-right: 8px; background: #1d70b8; color: #fff; border-radius: 3px; text-align: center; font-weight: bold; }
          .structure-token { display: inline-block; min-width: 42px; margin-right: 8px; background: #4c2c92; color: #fff; border-radius: 3px; text-align: center; font-weight: bold; }
          .content { background: #fff; padding: 24px; overflow: auto; }
          .banner { background: #d4351c; color: #fff; padding: 16px; margin-bottom: 24px; }
          .visual { border: 1px solid #b1b4b6; margin-bottom: 24px; background: #f3f2f1; }
          .visual img { display: block; max-width: 100%; height: auto; }
          .issue { border: 4px solid #d4351c; padding: 16px; margin-bottom: 18px; background: #fff; }
          .issue h2 { margin-top: 0; }
          code, pre { background: #f3f2f1; padding: 4px; white-space: pre-wrap; }
          li { margin-bottom: 8px; }
          details { background: #fff; border: 1px solid #b1b4b6; margin-bottom: 12px; padding: 8px; }
          summary { cursor: pointer; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="layout">
          <aside class="panel">
            <h1>WAVE-like panel</h1>
            <div class="toolbar">
              <span>Details</span>
              <span>Order</span>
              <span>Structure</span>
              <span>Contrast</span>
            </div>
            <div class="scorecard">
              <p><strong>${escapeHtml(pageSnapshot.title || 'Untitled page')}</strong></p>
              <div class="metric-grid">
                <div class="metric"><strong>${violations.length}</strong>Issues</div>
                <div class="metric"><strong>${ruleCounts.size}</strong>Rules</div>
                <div class="metric"><strong>${pageSnapshot.order.length}</strong>Order</div>
                <div class="metric"><strong>${pageSnapshot.headings.length}</strong>Headings</div>
              </div>
            </div>
            <details open>
              <summary>Details</summary>
              <ol>${ruleRows || '<li>No WAVE-like issues found.</li>'}</ol>
            </details>
            <details open>
              <summary>Order</summary>
              <ol>${orderRows || '<li>No keyboard-order items detected.</li>'}</ol>
            </details>
            <details open>
              <summary>Structure</summary>
              <ol>${structureRows || '<li>No headings or landmarks detected.</li>'}</ol>
            </details>
            <details>
              <summary>Contrast</summary>
              <p>Contrast signal is provided by axe and Lighthouse in the unified pack. This WAVE-like panel focuses on structure, order, names, labels, and target evidence.</p>
            </details>
          </aside>
          <main class="content">
            <div class="banner">
              <h1>WAVE-like accessibility evidence</h1>
              <p>${violations.length} issue(s) on ${escapeHtml(url)}. Match marker numbers here to the highlighted page image.</p>
            </div>
            <section class="visual">
              <img alt="Highlighted page screenshot with WAVE-like issue markers" src="${screenshotDataUrl}" />
            </section>
            ${cards}
          </main>
        </div>
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

      const unresolved: Array<{ index: number; rule: string; selector?: string }> = [];

      for (const item of items) {
        if (!item.selector) {
          unresolved.push(item);
          continue;
        }
        let element: Element | null = null;
        try {
          element = document.querySelector(item.selector);
        } catch {
          element = null;
        }
        if (!element) {
          unresolved.push(item);
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

      if (unresolved.length > 0) {
        const banner = document.createElement('div');
        banner.style.position = 'absolute';
        banner.style.left = `${window.scrollX + 16}px`;
        banner.style.top = `${window.scrollY + 16}px`;
        banner.style.maxWidth = '760px';
        banner.style.background = '#d4351c';
        banner.style.color = '#fff';
        banner.style.border = '6px solid #ffdd00';
        banner.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.35)';
        banner.style.font = 'bold 18px Arial, sans-serif';
        banner.style.padding = '12px 16px';
        banner.textContent = `Page-level WAVE-like finding(s): ${unresolved
          .slice(0, 5)
          .map((item) => `${item.index + 1} ${item.rule}${item.selector ? ` (${item.selector})` : ''}`)
          .join('; ')}${unresolved.length > 5 ? '; ...' : ''}`;
        overlayRoot.appendChild(banner);
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
  pageSnapshot: WaveLikePageSnapshot,
  screenshot: Buffer,
  attachmentPrefix: string,
  metadata?: PublishedEvidenceMetadata
): Promise<void> {
  await publishAccessibilityEvidence(testInfo, {
    attachmentPrefix,
    entry: {
      engine: 'wave-like',
      feature: metadata?.feature,
      pageState: metadata?.pageState,
      violationCount: violations.length,
      rules: violations.map((violation) => violation.rule),
      targets: violations.map((violation) => violation.selector ?? url),
    },
    html: buildIssueSummaryHtml(url, violations, pageSnapshot, screenshot),
    json: { url, violationCount: violations.length, pageSnapshot, violations },
    screenshot,
    screenshotSuffix: '-highlighted-screenshot.png',
  });
}

import type { Page, TestInfo } from '@playwright/test';
import * as fs from 'fs/promises';
import * as path from 'path';
import type { AccessibilityEngine } from './accessibilityAudit';

export type ScreenReaderLikeViolation = {
  rule: string;
  message: string;
  selector?: string;
  html?: string;
};

export type ScreenReaderLikeSnapshot = {
  title: string;
  url: string;
  headings: Array<{ level: number; text: string }>;
  landmarks: Array<{ role: string; name: string; selector: string }>;
  keyboardOrder: Array<{ type: string; name: string; selector: string; tabIndex: number }>;
  liveRegions: Array<{ role: string; name: string; selector: string }>;
  axTree: Array<{ role: string; name: string }>;
};

export type ScreenReaderLikeEvidence = {
  url: string;
  violations: ScreenReaderLikeViolation[];
  snapshot: ScreenReaderLikeSnapshot;
};

type EvidenceMetadata = {
  engine: AccessibilityEngine | 'summary';
  feature: string;
  pageState: string;
  status?: string;
  summary?: string;
};

type EngineOutcomeSummary = {
  engine: AccessibilityEngine;
  status: string;
  issueCount: number;
  knownIssueCount?: number;
  unexpectedIssueCount?: number;
  rules: string[];
  message?: string;
  evidenceFiles?: string[];
};

type PublishedEvidenceEntry = {
  engine: AccessibilityEngine | 'summary';
  feature: string;
  pageState: string;
  testTitle: string;
  attachmentPrefix: string;
  htmlFileName: string;
  jsonFileName: string;
  screenshotFileName: string;
  violationCount: number;
  status?: string;
  summary?: string;
  rules: string[];
  targets: string[];
};

const EVIDENCE_MANIFEST_FILE = 'manifest.json';
const EVIDENCE_ENTRY_PREFIX = 'manifest-entry-';

export async function collectScreenReaderLikeAccessibilityViolations(page: Page): Promise<ScreenReaderLikeEvidence> {
  const snapshot = await collectScreenReaderLikePageSnapshot(page);
  const violations = await page.evaluate<ScreenReaderLikeViolation[]>(() => {
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
      const tag = element.tagName.toLowerCase();
      const name = element.getAttribute('name');
      return name ? `${tag}[name="${name}"]` : tag;
    };
    const htmlFor = (element: Element): string => element.outerHTML.slice(0, 800);
    const add = (items: ScreenReaderLikeViolation[], rule: string, message: string, element?: Element) => {
      items.push({
        rule,
        message,
        ...(element ? { selector: selectorFor(element), html: htmlFor(element) } : {}),
      });
    };
    const labelReferences = (element: Element, attribute: string): Element[] =>
      (element.getAttribute(attribute) ?? '')
        .split(/\s+/)
        .filter(Boolean)
        .map((id) => document.getElementById(id))
        .filter((target): target is HTMLElement => target instanceof HTMLElement);
    const labelledByText = (element: Element): string => labelReferences(element, 'aria-labelledby').map(text).join(' ');
    const controlLabels = (element: Element): string => {
      if (
        element instanceof HTMLInputElement ||
        element instanceof HTMLSelectElement ||
        element instanceof HTMLTextAreaElement ||
        element instanceof HTMLButtonElement ||
        element instanceof HTMLOutputElement
      ) {
        return Array.from(element.labels ?? [])
          .map(text)
          .filter(Boolean)
          .join(' ');
      }
      return '';
    };
    const accessibleName = (element: Element): string =>
      [
        element.getAttribute('aria-label')?.trim() ?? '',
        labelledByText(element),
        controlLabels(element),
        element.getAttribute('title')?.trim() ?? '',
        element.getAttribute('placeholder')?.trim() ?? '',
        element instanceof HTMLInputElement && ['button', 'submit', 'reset'].includes(element.type) ? element.value.trim() : '',
        Array.from(element.querySelectorAll('img'))
          .map((image) => image.getAttribute('alt')?.trim() ?? '')
          .filter(Boolean)
          .join(' '),
        text(element),
      ]
        .filter(Boolean)
        .join(' ')
        .trim();
    const focusableSelector =
      'a[href], button, input, select, textarea, summary, [tabindex], [role="button"], [role="link"], [role="menuitem"]';
    const focusable = (element: Element): boolean => {
      if (!visible(element)) {
        return false;
      }
      if (element.getAttribute('tabindex') === '-1') {
        return false;
      }
      if (element instanceof HTMLButtonElement || element instanceof HTMLInputElement || element instanceof HTMLSelectElement) {
        return !element.disabled;
      }
      return element.matches(focusableSelector);
    };

    const violations: ScreenReaderLikeViolation[] = [];

    if (!document.documentElement.lang?.trim()) {
      add(violations, 'sr-document-language', 'Screen readers need the document language on the html element.');
    }
    if (!document.title.trim() || /^untitled$/i.test(document.title.trim())) {
      add(violations, 'sr-document-title', 'Screen readers need a meaningful document title.');
    }
    if (!document.body.classList.contains('govuk-template__body')) {
      add(violations, 'govuk-template-body', 'The page should use the GOV.UK template body class during the template migration.');
    }

    const skipLink = Array.from(document.querySelectorAll('a[href^="#"]'))
      .filter(visible)
      .find((link) => /skip to main content/i.test(text(link)));
    if (!skipLink) {
      add(violations, 'skip-link', 'The page should expose a visible skip-to-main-content link.');
    } else {
      const targetId = skipLink.getAttribute('href')?.slice(1) ?? '';
      if (!targetId || !document.getElementById(decodeURIComponent(targetId))) {
        add(violations, 'skip-link-target', `Skip link target "#${targetId}" should exist.`, skipLink);
      }
    }

    const mainLandmarks = Array.from(document.querySelectorAll('main, [role="main"]')).filter(visible);
    if (mainLandmarks.length !== 1) {
      add(violations, 'main-landmark', `Expected exactly one visible main landmark, found ${mainLandmarks.length}.`);
    }

    Array.from(document.querySelectorAll(focusableSelector))
      .filter(focusable)
      .filter((element) => !accessibleName(element))
      .forEach((element) => add(violations, 'sr-accessible-name', 'Focusable controls need an accessible name.', element));

    Array.from(document.querySelectorAll('[tabindex]'))
      .filter(visible)
      .filter((element) => Number(element.getAttribute('tabindex')) > 0)
      .forEach((element) =>
        add(violations, 'positive-tabindex', 'Positive tabindex creates a non-natural keyboard order.', element)
      );

    Array.from(document.querySelectorAll('[aria-hidden="true"]'))
      .filter((element) => Array.from(element.querySelectorAll(focusableSelector)).some(focusable))
      .forEach((element) =>
        add(violations, 'aria-hidden-focusable', 'aria-hidden containers must not contain focusable controls.', element)
      );

    Array.from(document.querySelectorAll('[aria-labelledby], [aria-describedby]')).forEach((element) => {
      for (const attribute of ['aria-labelledby', 'aria-describedby']) {
        const ids = (element.getAttribute(attribute) ?? '').split(/\s+/).filter(Boolean);
        const missing = ids.filter((id) => !document.getElementById(id));
        if (missing.length > 0) {
          add(violations, 'aria-reference-target', `${attribute} references missing id(s): ${missing.join(', ')}.`, element);
        }
      }
    });

    Array.from(document.querySelectorAll('.govuk-error-summary'))
      .filter(visible)
      .forEach((summary) => {
        if (!document.title.startsWith('Error:')) {
          add(
            violations,
            'error-title-prefix',
            'Pages with an error summary should prefix the document title with "Error:".',
            summary
          );
        }
        Array.from(summary.querySelectorAll('a[href^="#"]')).forEach((link) => {
          const targetId = decodeURIComponent((link.getAttribute('href') ?? '').slice(1));
          if (!targetId || !document.getElementById(targetId)) {
            add(violations, 'error-summary-target', `Error summary link target "#${targetId}" should exist.`, link);
          }
        });
      });

    Array.from(document.querySelectorAll('.govuk-form-group--error'))
      .filter(visible)
      .forEach((group) => {
        const errorMessage = group.querySelector('.govuk-error-message');
        if (!errorMessage || !visible(errorMessage)) {
          add(violations, 'govuk-error-message', 'Invalid GOV.UK form groups should include a visible error message.', group);
        }
        Array.from(group.querySelectorAll('input, select, textarea'))
          .filter(visible)
          .forEach((control) => {
            const describedByIds = (control.getAttribute('aria-describedby') ?? '').split(/\s+/).filter(Boolean);
            const describesVisibleError = describedByIds.some((id) => {
              const target = document.getElementById(id);
              return target instanceof HTMLElement && visible(target) && target.classList.contains('govuk-error-message');
            });
            if (!describesVisibleError) {
              add(violations, 'error-describedby', 'Invalid controls should reference the visible error message.', control);
            }
          });
      });

    Array.from(document.querySelectorAll('[role="status"], [role="alert"], [aria-live]'))
      .filter(visible)
      .filter((region) => !text(region) && !accessibleName(region))
      .forEach((region) => add(violations, 'live-region-empty', 'Live regions should expose useful announcement text.', region));

    Array.from(document.querySelectorAll('table'))
      .filter(visible)
      .filter((table) => table.querySelectorAll('td').length > 0)
      .filter((table) => table.querySelectorAll('th, [role="columnheader"], [role="rowheader"]').length === 0)
      .forEach((table) =>
        add(violations, 'table-headers', 'Screen-reader users need row or column headers in data tables.', table)
      );

    return violations;
  });

  return { url: page.url(), violations, snapshot };
}

export async function collectScreenReaderLikePageSnapshot(page: Page): Promise<ScreenReaderLikeSnapshot> {
  const domSnapshot = await page.evaluate<Omit<ScreenReaderLikeSnapshot, 'url' | 'axTree'>>(() => {
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
    const referencedText = (element: Element, attribute: string): string =>
      (element.getAttribute(attribute) ?? '')
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
          .map(text)
          .filter(Boolean)
          .join(' ');
      }
      return '';
    };
    const accessibleName = (element: Element): string =>
      [
        element.getAttribute('aria-label')?.trim() ?? '',
        referencedText(element, 'aria-labelledby'),
        controlLabels(element),
        element.getAttribute('title')?.trim() ?? '',
        element.getAttribute('placeholder')?.trim() ?? '',
        element instanceof HTMLInputElement && ['button', 'submit', 'reset'].includes(element.type) ? element.value.trim() : '',
        text(element),
      ]
        .filter(Boolean)
        .join(' ')
        .trim();

    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
      .filter(visible)
      .map((heading) => ({ level: Number(heading.tagName.slice(1)), text: text(heading).slice(0, 180) }));
    const landmarks = Array.from(document.querySelectorAll('header, nav, main, aside, footer, [role]'))
      .filter(visible)
      .map((landmark) => ({
        role: landmark.getAttribute('role') || landmark.tagName.toLowerCase(),
        name: (landmark.getAttribute('aria-label') || accessibleName(landmark)).slice(0, 180),
        selector: selectorFor(landmark),
      }))
      .filter((landmark) =>
        ['banner', 'navigation', 'main', 'complementary', 'contentinfo', 'header', 'nav', 'main', 'aside', 'footer'].includes(
          landmark.role
        )
      );
    const keyboardOrder = Array.from(
      document.querySelectorAll('a[href], button, input, select, textarea, summary, [tabindex], [role="button"], [role="link"]')
    )
      .filter(visible)
      .filter((element) => element.getAttribute('tabindex') !== '-1')
      .map((element) => ({
        type:
          element instanceof HTMLInputElement
            ? `${element.type || 'input'} input`
            : element.tagName.toLowerCase() === 'a'
              ? 'link'
              : element.tagName.toLowerCase(),
        name: accessibleName(element).slice(0, 180) || '(no accessible name)',
        selector: selectorFor(element),
        tabIndex: Number(element.getAttribute('tabindex') ?? '0'),
      }));
    const liveRegions = Array.from(document.querySelectorAll('[role="status"], [role="alert"], [aria-live]'))
      .filter(visible)
      .map((region) => ({
        role: region.getAttribute('role') || `aria-live:${region.getAttribute('aria-live') ?? 'unknown'}`,
        name: accessibleName(region).slice(0, 180),
        selector: selectorFor(region),
      }));

    return {
      title: document.title.trim(),
      headings,
      landmarks,
      keyboardOrder,
      liveRegions,
    };
  });

  return {
    ...domSnapshot,
    url: page.url(),
    axTree: await collectChromiumAxTree(page),
  };
}

export async function attachScreenReaderLikeAccessibilityEvidence(
  page: Page,
  testInfo: TestInfo | undefined,
  evidence: ScreenReaderLikeEvidence,
  attachmentPrefix = 'screen-reader-accessibility',
  metadata: EvidenceMetadata
): Promise<void> {
  if (!testInfo) {
    return;
  }

  await testInfo.attach(`${attachmentPrefix}.json`, {
    body: JSON.stringify(evidence, null, 2),
    contentType: 'application/json',
  });

  const cleanup = await markViolationsOnPage(page, evidence.violations);
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
    body: buildScreenReaderEvidenceHtml(evidence, screenshot),
    contentType: 'text/html',
  });

  await writePublishedEvidence(testInfo, {
    attachmentPrefix,
    metadata,
    html: buildScreenReaderEvidenceHtml(evidence, screenshot),
    json: evidence,
    screenshot,
    violationCount: evidence.violations.length,
    rules: evidence.violations.map((violation) => violation.rule),
    targets: evidence.violations.map((violation) => violation.selector ?? evidence.url),
  });
}

export async function attachAccessibilityPageSummaryEvidence(
  page: Page,
  testInfo: TestInfo | undefined,
  summary: {
    feature: string;
    pageState: string;
    strict: boolean;
    url: string;
    outcomes: EngineOutcomeSummary[];
  }
): Promise<void> {
  if (!testInfo) {
    return;
  }

  const snapshot = await collectScreenReaderLikePageSnapshot(page);
  const unexpectedCount = summary.outcomes.reduce(
    (count, outcome) => count + (outcome.unexpectedIssueCount ?? outcome.issueCount),
    0
  );
  const screenshot =
    unexpectedCount > 0
      ? await captureOptionalScreenshot(
          page,
          summary.outcomes
            .filter((outcome) => (outcome.unexpectedIssueCount ?? outcome.issueCount) > 0)
            .map(
              (outcome) =>
                `${outcome.engine}: ${outcome.unexpectedIssueCount ?? outcome.issueCount} unexpected (${outcome.rules.join(', ')})`
            )
        )
      : await page.screenshot({ fullPage: true });
  const summaryEvidence = {
    ...summary,
    snapshot,
  };
  const html = buildPageSummaryHtml(summaryEvidence, screenshot);
  const attachmentPrefix = `${sanitiseFileName(summary.feature)}-${sanitiseFileName(summary.pageState)}-page-summary`;

  await testInfo.attach(`${attachmentPrefix}.json`, {
    body: JSON.stringify(summaryEvidence, null, 2),
    contentType: 'application/json',
  });
  await testInfo.attach(`${attachmentPrefix}-screenshot.png`, {
    body: screenshot,
    contentType: 'image/png',
  });
  await testInfo.attach(`${attachmentPrefix}.html`, {
    body: html,
    contentType: 'text/html',
  });

  await writePublishedEvidence(testInfo, {
    attachmentPrefix,
    metadata: {
      engine: 'summary',
      feature: summary.feature,
      pageState: summary.pageState,
      status: unexpectedCount > 0 ? 'issues-found' : 'passed',
      summary: `${summary.outcomes.length} engine(s), ${unexpectedCount} unexpected issue(s)`,
    },
    html,
    json: summaryEvidence,
    screenshot,
    violationCount: unexpectedCount,
    rules: summary.outcomes.flatMap((outcome) => outcome.rules.map((rule) => `${outcome.engine}:${rule}`)),
    targets: [summary.url],
  });
}

export async function attachAccessibilityReachabilityFailureEvidence(
  page: Page,
  testInfo: TestInfo | undefined,
  context: {
    feature: string;
    pageState: string;
    strict: boolean;
    error: unknown;
  }
): Promise<void> {
  if (!testInfo) {
    return;
  }

  const url = page.url();
  const snapshot = await collectOptionalPageSnapshot(page, context);
  const message = context.error instanceof Error ? context.error.message : String(context.error);
  const screenshot = await captureOptionalScreenshot(page, [`page-state-reachability: ${message}`]);
  const evidence = {
    feature: context.feature,
    pageState: context.pageState,
    strict: context.strict,
    url,
    status: 'unreachable',
    error: message,
  };
  const html = buildEvidenceShell({
    title: 'Accessibility page-state reachability failure',
    bannerClass: 'banner issue-banner',
    summary: `${context.feature} / ${context.pageState}`,
    snapshot,
    screenshotDataUrl: `data:image/png;base64,${screenshot.toString('base64')}`,
    body: `
      <section class="issue">
        <h2>Page state was not reachable</h2>
        <p>This page state did not reach its ready condition before the accessibility engines could run.</p>
        <p><strong>URL:</strong> <code>${escapeHtml(url)}</code></p>
        <p><strong>Strict mode:</strong> ${context.strict ? 'on' : 'off'}</p>
        <pre>${escapeHtml(message)}</pre>
      </section>
    `,
  });
  const attachmentPrefix = `${sanitiseFileName(context.feature)}-${sanitiseFileName(context.pageState)}-reachability`;

  await testInfo.attach(`${attachmentPrefix}.json`, {
    body: JSON.stringify(evidence, null, 2),
    contentType: 'application/json',
  });
  await testInfo.attach(`${attachmentPrefix}-screenshot.png`, {
    body: screenshot,
    contentType: 'image/png',
  });
  await testInfo.attach(`${attachmentPrefix}.html`, {
    body: html,
    contentType: 'text/html',
  });

  await writePublishedEvidence(testInfo, {
    attachmentPrefix,
    metadata: {
      engine: 'summary',
      feature: context.feature,
      pageState: context.pageState,
      status: 'error',
      summary: `Page state was not reachable: ${message}`,
    },
    html,
    json: evidence,
    screenshot,
    violationCount: 1,
    rules: ['page-state-reachability'],
    targets: [url],
  });
}

async function collectChromiumAxTree(page: Page): Promise<Array<{ role: string; name: string }>> {
  try {
    const session = await page.context().newCDPSession(page);
    const response = (await session.send('Accessibility.getFullAXTree')) as {
      nodes?: Array<{ role?: { value?: string }; name?: { value?: string } }>;
    };
    await session.detach();
    return (response.nodes ?? [])
      .map((node) => ({
        role: String(node.role?.value ?? ''),
        name: String(node.name?.value ?? ''),
      }))
      .filter((node) => node.role || node.name)
      .slice(0, 80);
  } catch {
    return [];
  }
}

async function collectOptionalPageSnapshot(
  page: Page,
  context: {
    feature: string;
    pageState: string;
  }
): Promise<ScreenReaderLikeSnapshot> {
  try {
    return await collectScreenReaderLikePageSnapshot(page);
  } catch {
    return {
      title: `${context.feature} / ${context.pageState}`,
      url: page.url(),
      headings: [],
      landmarks: [],
      keyboardOrder: [],
      liveRegions: [],
      axTree: [],
    };
  }
}

async function captureOptionalScreenshot(page: Page, pageLevelFindings: string[] = []): Promise<Buffer> {
  let cleanup: (() => Promise<void>) | undefined;
  try {
    if (pageLevelFindings.length > 0) {
      cleanup = await markPageLevelFindingsOnPage(page, pageLevelFindings);
    }
    return await page.screenshot({ fullPage: true });
  } catch {
    return Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAFgwJ/l8hS+QAAAABJRU5ErkJggg==',
      'base64'
    );
  } finally {
    await cleanup?.();
  }
}

function buildScreenReaderEvidenceHtml(evidence: ScreenReaderLikeEvidence, screenshot: Buffer): string {
  const screenshotDataUrl = `data:image/png;base64,${screenshot.toString('base64')}`;
  const issueCards = evidence.violations
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

  return buildEvidenceShell({
    title: 'Screen-reader-like accessibility evidence',
    bannerClass: evidence.violations.length > 0 ? 'banner issue-banner' : 'banner pass-banner',
    summary: `${evidence.violations.length} screen-reader-like issue(s) on ${evidence.url}`,
    snapshot: evidence.snapshot,
    screenshotDataUrl,
    body:
      issueCards ||
      '<section class="issue pass"><h2>No screen-reader-like issues found</h2><p>Keyboard order, naming, landmarks, template structure, and announcement contracts passed this heuristic lane.</p></section>',
  });
}

function buildPageSummaryHtml(
  summary: {
    feature: string;
    pageState: string;
    strict: boolean;
    url: string;
    outcomes: EngineOutcomeSummary[];
    snapshot: ScreenReaderLikeSnapshot;
  },
  screenshot: Buffer
): string {
  const screenshotDataUrl = `data:image/png;base64,${screenshot.toString('base64')}`;
  const outcomeCards = summary.outcomes
    .map(
      (outcome) => `
        <section class="metric ${outcome.status === 'passed' ? 'pass' : 'warn'}">
          <strong>${escapeHtml(outcome.engine)}</strong>
          <span>${escapeHtml(outcome.status)}</span>
          <small>${outcome.issueCount} total, ${outcome.unexpectedIssueCount ?? outcome.issueCount} unexpected</small>
        </section>
      `
    )
    .join('');

  return buildEvidenceShell({
    title: 'Accessibility page-state summary',
    bannerClass: 'banner summary-banner',
    summary: `${summary.feature} / ${summary.pageState}`,
    snapshot: summary.snapshot,
    screenshotDataUrl,
    body: `
      <section class="summary-card">
        <h2>Engine summary</h2>
        <p><strong>URL:</strong> <code>${escapeHtml(summary.url)}</code></p>
        <p><strong>Strict mode:</strong> ${summary.strict ? 'on' : 'off'}</p>
        <div class="metrics">${outcomeCards}</div>
      </section>
    `,
  });
}

function buildEvidenceShell(context: {
  title: string;
  bannerClass: string;
  summary: string;
  snapshot: ScreenReaderLikeSnapshot;
  screenshotDataUrl: string;
  body: string;
}): string {
  return `
    <html>
      <head>
        <title>${escapeHtml(context.title)}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; color: #0b0c0c; background: #f3f2f1; }
          .layout { display: grid; grid-template-columns: minmax(300px, 380px) 1fr; min-height: 100vh; }
          .panel { background: #e6f0f7; border-right: 1px solid #b1b4b6; padding: 14px; position: sticky; top: 0; height: 100vh; overflow: auto; }
          .panel h1 { font-size: 22px; margin: 0 0 12px; }
          .scorecard { background: #fff; border-left: 6px solid #1d70b8; padding: 12px; margin-bottom: 12px; }
          .score-grid, .metrics { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
          .score, .metric { background: #fff; border: 1px solid #b1b4b6; padding: 10px; }
          .metric.pass { border-left: 6px solid #00703c; }
          .metric.warn { border-left: 6px solid #d4351c; }
          .metric strong, .metric span, .metric small { display: block; }
          .token { display: inline-block; min-width: 46px; margin-right: 8px; background: #4c2c92; color: #fff; border-radius: 3px; text-align: center; font-weight: bold; }
          .marker { display: inline-block; min-width: 24px; margin-right: 8px; background: #1d70b8; color: #fff; border-radius: 3px; text-align: center; font-weight: bold; }
          .content { background: #fff; padding: 24px; overflow: auto; }
          .banner { color: #fff; padding: 16px; margin-bottom: 24px; }
          .issue-banner { background: #d4351c; }
          .pass-banner { background: #00703c; }
          .summary-banner { background: #1d70b8; }
          .visual { border: 1px solid #b1b4b6; margin-bottom: 24px; background: #f3f2f1; }
          .visual img { display: block; max-width: 100%; height: auto; }
          .issue, .summary-card { border: 1px solid #b1b4b6; border-left: 8px solid #d4351c; padding: 16px; margin-bottom: 18px; background: #fff; }
          .issue.pass, .summary-card { border-left-color: #00703c; }
          code, pre { background: #f3f2f1; padding: 4px; white-space: pre-wrap; }
          li { margin-bottom: 8px; }
          details { background: #fff; border: 1px solid #b1b4b6; margin-bottom: 12px; padding: 8px; }
          summary { cursor: pointer; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="layout">
          <aside class="panel">
            <h1>${escapeHtml(context.title)}</h1>
            <div class="scorecard">
              <p><strong>${escapeHtml(context.snapshot.title || 'Untitled page')}</strong></p>
              <div class="score-grid">
                <div class="score"><strong>${context.snapshot.headings.length}</strong><br/>Headings</div>
                <div class="score"><strong>${context.snapshot.landmarks.length}</strong><br/>Landmarks</div>
                <div class="score"><strong>${context.snapshot.keyboardOrder.length}</strong><br/>Focus items</div>
                <div class="score"><strong>${context.snapshot.axTree.length}</strong><br/>AX nodes</div>
              </div>
            </div>
            <details open>
              <summary>Headings</summary>
              <ol>${context.snapshot.headings.map((heading) => `<li><span class="token">h${heading.level}</span>${escapeHtml(heading.text || '(empty)')}</li>`).join('') || '<li>No headings detected.</li>'}</ol>
            </details>
            <details open>
              <summary>Landmarks</summary>
              <ol>${context.snapshot.landmarks.map((landmark) => `<li><span class="token">${escapeHtml(landmark.role)}</span>${escapeHtml(landmark.name || '(unlabelled)')} <code>${escapeHtml(landmark.selector)}</code></li>`).join('') || '<li>No landmarks detected.</li>'}</ol>
            </details>
            <details open>
              <summary>Keyboard order</summary>
              <ol>${context.snapshot.keyboardOrder.map((item, index) => `<li><span class="marker">${index + 1}</span><strong>${escapeHtml(item.type)}</strong>: ${escapeHtml(item.name)} <code>${escapeHtml(item.selector)}</code></li>`).join('') || '<li>No focusable controls detected.</li>'}</ol>
            </details>
            <details>
              <summary>Accessibility tree sample</summary>
              <ol>${
                context.snapshot.axTree
                  .slice(0, 30)
                  .map(
                    (node) =>
                      `<li><span class="token">${escapeHtml(node.role || '-')}</span>${escapeHtml(node.name || '(unnamed)')}</li>`
                  )
                  .join('') || '<li>Chromium accessibility tree was not available.</li>'
              }</ol>
            </details>
          </aside>
          <main class="content">
            <div class="${context.bannerClass}">
              <h1>${escapeHtml(context.title)}</h1>
              <p>${escapeHtml(context.summary)}</p>
            </div>
            <section class="visual">
              <img alt="Accessibility evidence screenshot" src="${context.screenshotDataUrl}" />
            </section>
            ${context.body}
          </main>
        </div>
      </body>
    </html>
  `;
}

async function markViolationsOnPage(page: Page, violations: ScreenReaderLikeViolation[]): Promise<() => Promise<void>> {
  await page.evaluate(
    (items) => {
      const overlayRoot = document.createElement('div');
      overlayRoot.setAttribute('data-testid', 'screen-reader-violation-overlays');
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
        marker.style.outline = '6px solid #4c2c92';
        marker.style.background = 'rgba(29, 112, 184, 0.18)';
        marker.style.boxSizing = 'border-box';

        const label = document.createElement('div');
        label.textContent = `${item.index + 1} ${item.rule}`;
        label.style.position = 'absolute';
        label.style.left = '0';
        label.style.top = '-32px';
        label.style.background = '#4c2c92';
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
        banner.style.background = '#4c2c92';
        banner.style.color = '#fff';
        banner.style.border = '6px solid #ffdd00';
        banner.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.35)';
        banner.style.font = 'bold 18px Arial, sans-serif';
        banner.style.padding = '12px 16px';
        banner.textContent = `Page-level screen-reader finding(s): ${unresolved
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
      document.querySelector('[data-testid="screen-reader-violation-overlays"]')?.remove();
    });
  };
}

async function markPageLevelFindingsOnPage(page: Page, findings: string[]): Promise<() => Promise<void>> {
  await page.evaluate((items) => {
    const overlayRoot = document.createElement('div');
    overlayRoot.setAttribute('data-testid', 'accessibility-page-summary-overlays');
    overlayRoot.style.position = 'absolute';
    overlayRoot.style.left = '0';
    overlayRoot.style.top = '0';
    overlayRoot.style.width = '0';
    overlayRoot.style.height = '0';
    overlayRoot.style.zIndex = '2147483647';
    overlayRoot.style.pointerEvents = 'none';
    document.body.appendChild(overlayRoot);

    const banner = document.createElement('div');
    banner.style.position = 'absolute';
    banner.style.left = `${window.scrollX + 16}px`;
    banner.style.top = `${window.scrollY + 16}px`;
    banner.style.maxWidth = '820px';
    banner.style.background = '#d4351c';
    banner.style.color = '#fff';
    banner.style.border = '6px solid #ffdd00';
    banner.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.35)';
    banner.style.font = 'bold 18px Arial, sans-serif';
    banner.style.padding = '12px 16px';
    banner.textContent = `Accessibility finding(s): ${items.slice(0, 5).join('; ')}${items.length > 5 ? '; ...' : ''}`;
    overlayRoot.appendChild(banner);
  }, findings);

  return async () => {
    await page.evaluate(() => {
      document.querySelector('[data-testid="accessibility-page-summary-overlays"]')?.remove();
    });
  };
}

async function writePublishedEvidence(
  testInfo: TestInfo,
  evidence: {
    attachmentPrefix: string;
    metadata: EvidenceMetadata;
    html: string;
    json: unknown;
    screenshot: Buffer;
    violationCount: number;
    rules: string[];
    targets: string[];
  }
): Promise<void> {
  const evidenceDir = getEvidenceDir();
  const safeTitle = sanitiseFileName(testInfo.title);
  const baseName = `${safeTitle}-${evidence.attachmentPrefix}`;
  const htmlFileName = `${baseName}.html`;
  const jsonFileName = `${baseName}.json`;
  const screenshotFileName = `${baseName}-screenshot.png`;
  const entry: PublishedEvidenceEntry = {
    engine: evidence.metadata.engine,
    feature: evidence.metadata.feature,
    pageState: evidence.metadata.pageState,
    testTitle: testInfo.title,
    attachmentPrefix: evidence.attachmentPrefix,
    htmlFileName,
    jsonFileName,
    screenshotFileName,
    violationCount: evidence.violationCount,
    status: evidence.metadata.status,
    summary: evidence.metadata.summary,
    rules: evidence.rules,
    targets: evidence.targets,
  };

  await fs.mkdir(evidenceDir, { recursive: true });
  await fs.writeFile(path.join(evidenceDir, htmlFileName), evidence.html);
  await fs.writeFile(path.join(evidenceDir, jsonFileName), JSON.stringify(evidence.json, null, 2));
  await fs.writeFile(path.join(evidenceDir, screenshotFileName), evidence.screenshot);
  await writeEvidenceEntry(evidenceDir, baseName, entry);
  await writeEvidenceManifest(evidenceDir, entry);
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
  try {
    const manifest = JSON.parse(await fs.readFile(path.join(evidenceDir, EVIDENCE_MANIFEST_FILE), 'utf8'));
    return Array.isArray(manifest) ? manifest.filter(isPublishedEvidenceEntry) : [];
  } catch {
    return [];
  }
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

function getEvidenceDir(): string {
  return path.resolve(
    process.env.PW_A11Y_EVIDENCE_DIR ||
      path.join(
        process.env.PLAYWRIGHT_REPORT_FOLDER || 'functional-output/tests/playwright-accessibility/odhin-report',
        'accessibility-evidence'
      )
  );
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function sanitiseFileName(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9._-]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 120) || 'accessibility'
  );
}

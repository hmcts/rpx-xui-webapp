import { expect, type Locator, type Page } from '@playwright/test';

export async function expectReachableMainContent(page: Page, path: string): Promise<void> {
  await page.goto(path, { waitUntil: 'domcontentloaded' });

  expect(
    page.url(),
    `Expected accessibility assessment to reach "${path}". Current URL "${page.url()}" means this is a reachability/setup problem, not an axe issue.`
  ).not.toMatch(/chrome-error:\/\/chromewebdata/i);

  const main = page.locator('main').first();
  await expect(
    main,
    `Expected "${path}" to expose visible main content before running any accessibility assertions.`
  ).toBeVisible({
    timeout: 3000,
  });
}

export async function expectHeaderLinksHaveTextAlternative(page: Page): Promise<void> {
  const unnamedHeaderLinks = await page.locator('header a, .hmcts-header a, .hmcts-header__link').evaluateAll((links) =>
    links
      .filter((link) => {
        const element = link as HTMLElement;
        const style = window.getComputedStyle(element);
        return style.visibility !== 'hidden' && style.display !== 'none' && element.getClientRects().length > 0;
      })
      .map((link, index) => {
        const element = link as HTMLAnchorElement;
        const imageText = Array.from(element.querySelectorAll('img'))
          .map((image) => image.getAttribute('alt')?.trim() ?? '')
          .filter(Boolean)
          .join(' ');
        return {
          index,
          href: element.getAttribute('href') ?? '',
          html: element.outerHTML,
          textAlternative: [
            element.textContent?.trim() ?? '',
            element.getAttribute('aria-label')?.trim() ?? '',
            element.getAttribute('title')?.trim() ?? '',
            imageText,
          ]
            .filter(Boolean)
            .join(' '),
        };
      })
      .filter((link) => link.textAlternative.length === 0)
  );

  expect(
    unnamedHeaderLinks,
    [
      'Header links must expose visible text, aria-label, title, or image alt text.',
      'When this fails, keyboard and screen-reader users cannot identify the destination.',
      `Current URL: ${page.url()}`,
      `Unnamed links: ${JSON.stringify(unnamedHeaderLinks, null, 2)}`,
    ].join('\n')
  ).toEqual([]);
}

export async function expectFirstErrorSummaryLinkTargetsInvalidControl(page: Page): Promise<void> {
  const problems: string[] = [];
  const errorSummary = page.locator('.govuk-error-summary').first();
  await expect(
    errorSummary,
    'Expected a GOV.UK error summary after submitting an invalid form so users get a single error entry point.'
  ).toBeVisible({ timeout: 3000 });

  const title = await page.title();
  if (!title.startsWith('Error:')) {
    problems.push(`Document title should start with "Error:" after invalid form submission. Current title: "${title}".`);
  }

  const firstErrorLink = errorSummary.locator('a').first();
  const hasVisibleTargetLink = (await firstErrorLink.count()) > 0 && (await firstErrorLink.isVisible());
  if (!hasVisibleTargetLink) {
    const summaryHtml = await errorSummary.evaluate((element) => element.outerHTML);
    problems.push(
      [
        'Error summary should include a visible link targeting the invalid control or field group.',
        `Error summary HTML: ${summaryHtml}`,
      ].join(' ')
    );
    expect(
      problems,
      [
        'GOV.UK invalid-form accessibility contract failed.',
        'These checks are user-impacting accessibility assertions, not page readiness checks.',
        `Current URL: ${page.url()}`,
        ...problems.map((problem) => `- ${problem}`),
      ].join('\n')
    ).toEqual([]);
    return;
  }

  const href = await firstErrorLink.getAttribute('href');
  const targetLink = resolveSamePageFragmentTarget(href, page.url());
  if (!targetLink.targetId) {
    problems.push(targetLink.error);
    expect(
      problems,
      [
        'GOV.UK invalid-form accessibility contract failed.',
        `Current URL: ${page.url()}`,
        ...problems.map((problem) => `- ${problem}`),
      ].join('\n')
    ).toEqual([]);
    return;
  }

  const targetId = targetLink.targetId;
  const target = page.locator(`#${cssEscape(targetId)}`).first();
  await expect(target, `Expected error summary target "${targetLink.href}" to exist on the page.`).toBeVisible();

  await firstErrorLink.click();
  const focusState = await getFocusState(page, targetId);
  if (!focusState.activeIsTarget && !focusState.targetContainsFocus) {
    problems.push(
      [
        `Clicking the first error-summary link should move focus to target "#${targetId}" or a control inside it.`,
        `Focus state: ${JSON.stringify(focusState)}`,
      ].join(' ')
    );
  }

  const descriptionState = await getTargetDescriptionState(target);
  if (!descriptionState.hasVisibleErrorDescription) {
    problems.push(
      [
        `Invalid control "#${targetId}" should reference a visible error message via aria-describedby.`,
        `Description state: ${JSON.stringify(descriptionState)}`,
      ].join(' ')
    );
  }

  expect(
    problems,
    [
      'GOV.UK invalid-form accessibility contract failed.',
      'These checks are user-impacting accessibility assertions, not page readiness checks.',
      `Current URL: ${page.url()}`,
      ...problems.map((problem) => `- ${problem}`),
    ].join('\n')
  ).toEqual([]);
}

export async function expectFilterControlsHaveAccessibleNames(filterPanel: Locator): Promise<void> {
  const unnamedControls = await filterPanel.locator('input, select, textarea, button').evaluateAll((controls) =>
    controls
      .filter((control) => {
        const element = control as HTMLElement;
        const style = window.getComputedStyle(element);
        return style.visibility !== 'hidden' && style.display !== 'none' && element.getClientRects().length > 0;
      })
      .map((control, index) => {
        const element = control as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLButtonElement;
        const id = element.id;
        const labels = id
          ? Array.from(document.querySelectorAll(`label[for="${id.replace(/"/g, '\\"')}"]`))
              .map((label) => label.textContent?.trim() ?? '')
              .filter(Boolean)
          : [];
        return {
          index,
          id,
          name: element.getAttribute('name') ?? '',
          type: element.getAttribute('type') ?? element.tagName.toLowerCase(),
          html: element.outerHTML,
          textAlternative: [
            element.textContent?.trim() ?? '',
            element.getAttribute('aria-label')?.trim() ?? '',
            element.getAttribute('aria-labelledby')?.trim() ?? '',
            element.getAttribute('title')?.trim() ?? '',
            element.getAttribute('placeholder')?.trim() ?? '',
            ...labels,
          ]
            .filter(Boolean)
            .join(' '),
        };
      })
      .filter((control) => control.textAlternative.length === 0)
  );

  expect(
    unnamedControls,
    [
      'Filter controls must have accessible names via label, aria-label, aria-labelledby, title, placeholder, or visible button text.',
      'Unnamed filters make task/case lists unusable for screen-reader users.',
      `Unnamed controls: ${JSON.stringify(unnamedControls, null, 2)}`,
    ].join('\n')
  ).toEqual([]);
}

export async function expectTableHeadersAreNamed(table: Locator): Promise<void> {
  const unnamedHeaders = await table.locator('th').evaluateAll((headers) =>
    headers
      .map((header, index) => ({
        index,
        html: (header as HTMLElement).outerHTML,
        text: (header.textContent ?? '').trim(),
        ariaLabel: (header as HTMLElement).getAttribute('aria-label')?.trim() ?? '',
      }))
      .filter((header) => !header.text && !header.ariaLabel)
  );

  expect(
    unnamedHeaders,
    [
      'Data tables must expose named column headers so users understand each cell value.',
      `Unnamed headers: ${JSON.stringify(unnamedHeaders, null, 2)}`,
    ].join('\n')
  ).toEqual([]);
}

async function getFocusState(
  page: Page,
  targetId: string
): Promise<{
  targetId: string;
  activeId: string;
  activeTag: string;
  activeHtml: string;
  targetContainsFocus: boolean;
  activeIsTarget: boolean;
}> {
  return page.evaluate((id) => {
    const targetElement = document.getElementById(id);
    const activeElement = document.activeElement;
    return {
      targetId: id,
      activeId: activeElement?.id ?? '',
      activeTag: activeElement?.tagName ?? '',
      activeHtml: activeElement instanceof HTMLElement ? activeElement.outerHTML : '',
      targetContainsFocus: Boolean(targetElement && activeElement && targetElement.contains(activeElement)),
      activeIsTarget: Boolean(targetElement && activeElement === targetElement),
    };
  }, targetId);
}

async function getTargetDescriptionState(target: Locator): Promise<{
  describedBy: string[];
  visibleDescriptions: { id: string; className: string; text: string }[];
  hasVisibleErrorDescription: boolean;
}> {
  return target.evaluate((element) => {
    const describedBy = (element.getAttribute('aria-describedby') ?? '').split(/\s+/).filter(Boolean);
    const visibleDescriptions = describedBy
      .map((id) => document.getElementById(id))
      .filter((description): description is HTMLElement => Boolean(description))
      .filter((description) => {
        const style = window.getComputedStyle(description);
        return style.visibility !== 'hidden' && style.display !== 'none' && description.getClientRects().length > 0;
      })
      .map((description) => ({
        id: description.id,
        className: description.className,
        text: description.textContent?.trim() ?? '',
      }));

    return {
      describedBy,
      visibleDescriptions,
      hasVisibleErrorDescription: visibleDescriptions.some(
        (description) => /error/i.test(description.id) || /error/i.test(String(description.className))
      ),
    };
  });
}

function cssEscape(value: string): string {
  return value.replaceAll(/([ !"#$%&'()*+,./:;<=>?@[\\\]^`{|}~])/g, String.raw`\$1`);
}

function resolveSamePageFragmentTarget(
  href: string | null,
  currentUrl: string
): { href: string; targetId: string; error: string } {
  if (!href) {
    return {
      href: '',
      targetId: '',
      error: 'Error summary link should target an element id, for example "#reason". Current href is empty.',
    };
  }

  const targetUrl = new URL(href, currentUrl);
  const pageUrl = new URL(currentUrl);
  if (!targetUrl.hash) {
    return {
      href,
      targetId: '',
      error: `Error summary link should include a fragment targeting the invalid control, for example "#reason". Current href: "${href}".`,
    };
  }

  if (targetUrl.origin !== pageUrl.origin || targetUrl.pathname !== pageUrl.pathname || targetUrl.search !== pageUrl.search) {
    return {
      href,
      targetId: '',
      error: `Error summary link should target the current page plus an element fragment. Current href: "${href}", current URL: "${currentUrl}".`,
    };
  }

  const targetId = decodeURIComponent(targetUrl.hash.slice(1));
  if (!/^[A-Za-z][\w:.-]*$/.test(targetId)) {
    return {
      href,
      targetId: '',
      error: `Error summary link fragment should be a valid element id. Current href: "${href}".`,
    };
  }

  return { href, targetId, error: '' };
}

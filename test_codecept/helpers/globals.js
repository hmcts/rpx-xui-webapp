/* helpers/globals.js  – CLEAN, PAGE-SAFE VERSION */
'use strict';

const { container } = require('codeceptjs');

/* ------------------------------------------------------------------ */
/*  Always ask CodeceptJS for the current Playwright page.            */
/*  No global `currentPage`, so no stale references survive a         */
/*  scenario—even if CodeceptJS recreated the page internally.        */
/* ------------------------------------------------------------------ */
function resolvePage() {
  const pw = container.helpers().Playwright;
  if (pw && pw.page) return pw.page;

  throw new Error(
    '[globals] Playwright page is not yet available. ' +
    'This helper must be called from inside a running scenario.'
  );
}

async function ensurePage () {
  const pw = container.helpers().Playwright;
  if (pw.page) return pw.page;            // already initialised

  await actor()._within(async () => {
    // 👇 official internal helper that opens a new page + context
    await pw._createContextPage();
  });
  return pw.page;                         // now guaranteed
}

async function refresh() {
  const page = await ensurePage();
  await page.reload({ waitUntil: 'load' });
}

function getXUITestPage() {
  return resolvePage();
}

async function currentUrl() {
  return resolvePage().url();
}

/* ------------------------------------------------------------------ */
/*  Shorthand element helpers – each call re-resolves the page        */
/* ------------------------------------------------------------------ */
function $(selector) { return resolvePage().locator(selector); }
function $$(selector) { return resolvePage().locator(selector); }
function elementByXpath(xpath) { return resolvePage().locator(`xpath=${xpath}`); }

/* ------------------------------------------------------------------ */
/*  Utility helpers                                                   */
/* ------------------------------------------------------------------ */
async function isPresent(locator) {
  const count = await locator.count?.() ?? 0;
  return count > 0;
}

async function navigate(url, options = {}) {
  const page = resolvePage();
  await page.goto(url, { waitUntil: 'domcontentloaded', ...options });
}

async function waitForElement(selectorOrLocator, options = {}) {
  const page = resolvePage();
  const timeout = options.timeout ?? 15000;
  const state = options.state ?? 'visible';

  let locator;
  if (typeof selectorOrLocator === 'string') {
    locator = page.locator(selectorOrLocator);
  } else if (selectorOrLocator?.locator) {
    locator = selectorOrLocator;                     // already a Locator
  } else if (typeof selectorOrLocator.then === 'function') {
    const h = await selectorOrLocator;               // maybe ElementHandle
    locator = h?.locator ? h.locator() : h;
  } else {
    throw new Error('waitForElement: invalid selector / locator');
  }
  await locator.waitFor({ timeout, state });
}

async function getTagName(locator) {
  return await locator.evaluate(el => el.tagName.toLowerCase());
}

async function selectOption(selectLoc, opts) {
  if (typeof opts === 'string') {
    // treat as label, for backward-compat
    return selectLoc.selectOption({ label: opts });
  }
  // opts might be { label }, { value } or { index }
  return selectLoc.selectOption(opts);
}

async function getSelectOptions(selectLoc) {
  return await selectLoc.locator('option').allTextContents();
}

async function getText(locator) {
  return (await locator.textContent())?.trim();
}

/* ------------------------------------------------------------------ */
module.exports = {
  getXUITestPage,

  currentUrl,
  navigate,
  refresh,

  /* element helpers */
  $,
  $$,
  elementByXpath,
  elementsByXpath: elementByXpath,
  elementByCss: $,
  elementsByCss: $$,

  /* util helpers */
  isPresent,
  waitForElement,
  selectOption,
  getSelectOptions,
  getText,
  getTagName
};

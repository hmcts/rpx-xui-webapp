/* helpers/globals.js  – CLEAN, PAGE-SAFE VERSION */
'use strict';

const { container } = require('codeceptjs');

/* ------------------------------------------------------------------ */
/*  Always ask CodeceptJS for the current Playwright page.            */
/*  No global `currentPage`, so no stale references survive a         */
/*  scenario—even if CodeceptJS recreated the page internally.        */
/* ------------------------------------------------------------------ */
function resolvePage () {
  const pw = container.helpers().Playwright;
  if (pw && pw.page) return pw.page;

  throw new Error(
    '[globals] Playwright page is not yet available. ' +
    'This helper must be called from inside a running scenario.'
  );
}

function getXUITestPage () {
  return resolvePage();
}

/* ------------------------------------------------------------------ */
/*  Shorthand element helpers – each call re-resolves the page        */
/* ------------------------------------------------------------------ */
function $(selector)           { return resolvePage().locator(selector); }
function $$(selector)          { return resolvePage().locator(selector); }
function elementByXpath(xpath) { return resolvePage().locator(`xpath=${xpath}`); }

/* ------------------------------------------------------------------ */
/*  Utility helpers                                                   */
/* ------------------------------------------------------------------ */
async function isPresent(locator) {
  const count = await locator.count?.() ?? 0;
  return count > 0;
}

async function waitForElement(selectorOrLocator, options = {}) {
  const page    = resolvePage();
  const timeout = options.timeout ?? 15000;
  const state   = options.state   ?? 'visible';

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

async function selectOption(selectLoc, visibleText) {
  await selectLoc.selectOption({ label: visibleText });
}
async function getSelectOptions(selectLoc) {
  return await selectLoc.locator('option').allTextContents();
}

/* ------------------------------------------------------------------ */
module.exports = {
  getXUITestPage,

  /* element helpers */
  $,
  $$,
  elementByXpath,
  elementsByXpath: elementByXpath,
  elementByCss: $,

  /* util helpers */
  isPresent,
  waitForElement,
  selectOption,
  getSelectOptions
};

import { Page, expect } from '@playwright/test';
import { SearchPage } from '../pageObjects/SearchPage';

export async function clickToSearchPage(page: Page) {
  console.log("Going to Search Page");
  const numberOfTries = 5;
  for (let i = 0; i < numberOfTries; i++) {
    try {
      await page.click('.hmcts-primary-navigation__link.transparent-background.hmcts-search-toggle__button'); 
      await page.waitForSelector('text=Search', { state: 'visible', timeout: 1000 });
      break;
    } catch (error) {
      console.log(`Click to search page failed, retrying (${i + 1}/${numberOfTries})...`);
      if (i !== numberOfTries - 1) await page.waitForTimeout(1000); // Wait 1 second before the next attempt
      else throw error;
    }
  }
}

export async function validateCaseEventNextStepTriggerActions(page: Page) {
  const searchPage = new SearchPage(page);
  
  await clickToSearchPage(page);
  await searchPage.amOnPage();
  await searchPage.selectJurisdiction('Family Divorce');
  await searchPage.selectCaseType('XUI Case PoC');
  await searchPage.clickApplyButton();

  await searchPage.waitForAtleastOneSearchResult();
  expect(await searchPage.hasSearchReturnedResults()).toBe(true);

  await searchPage.openFirstCaseInResults();

  await expect(page).toHaveURL(/.*case-details.*/);

  // Implement the necessary steps for validation
}

export async function validateUpdateFormPageNextStepTriggerActions(page: Page) {
  const searchPage = new SearchPage(page);

  await clickToSearchPage(page);

  await searchPage.amOnPage();

  await searchPage.selectJurisdiction('Family Divorce');
  await searchPage.selectCaseType('XUI Case PoC');
  await searchPage.clickApplyButton();

  await searchPage.waitForAtleastOneSearchResult();
  expect(await searchPage.hasSearchReturnedResults()).toBe(true);

  await searchPage.openFirstCaseInResults();

  await expect(page).toHaveURL(/.*case-details.*/);

  await page.click('button#updateCase'); // Replace with new selector
  // Implement the necessary steps for validation
}

export async function validateInvalidDateErrorMessage(page: Page) {
  const searchPage = new SearchPage(page);

  await page.click('#createCaseTab'); // Replace with new selector

  await searchPage.amOnPage();

  await searchPage.selectJurisdiction('Family Divorce');
  await searchPage.selectCaseType('XUI Test Case type dev');
  await page.click('button#createCase'); // Replace with new selector
  await expect(page).toHaveURL(/.*case-form.*/);

  await page.fill('#generatedDOB-day', 'invalid date'); // Replace with new selector
  await page.click('button#submitCase'); // Replace with new selector

  await expect(page.locator('.error-message')).toHaveText('Date is not valid'); // Replace with new selector
}

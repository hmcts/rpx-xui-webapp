import { Page, expect } from '@playwright/test';
import { SearchPage } from '../pageObjects/SearchPage';
import { CaseView } from '../pageObjects/CaseView';
import { UpdateCase } from '../pageObjects/UpdateCase';

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
  await searchPage.amOnPage('Search');
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
  const caseview = new CaseView(page);
  const updateCase = new UpdateCase(page);

  await clickToSearchPage(page);

  //await page.click("(//a[normalize-space()='Create case'])[1]"); 

  await searchPage.amOnPage('Search');

  await searchPage.selectJurisdiction('Family Divorce');
  await searchPage.selectCaseType('XUI Case PoC');
  await searchPage.clickApplyButton();

  await searchPage.waitForAtleastOneSearchResult();
  expect(await searchPage.hasSearchReturnedResults()).toBe(true);

  await searchPage.openFirstCaseInResults();

  await expect(page).toHaveURL(/.*case-details.*/);

  await caseview.clickNextStep('Update case');
  await expect(page).toHaveURL(/.*updateCase.*/);

  //await page.click('#next-step'); // Replace with new selector
  // Implement the necessary steps for validation

}

import { Page, expect } from '@playwright/test';
import { CreateCase } from '../pageObjects/CreateCase';


export async function validateInvalidDateErrorMessage(page: Page) {
    const createCase = new CreateCase(page);

    await page.click("(//a[normalize-space()='Create case'])[1]"); 

    await createCase.amOnPage("Create Case");

    await createCase.selectJurisdiction('Family Divorce');
    await createCase.selectCaseType('XUI Test Case type dev');
    await page.click("button[type='submit']"); 
    await expect(page).toHaveURL(/.*case-create.*/);

    await page.fill('#TextField','Text Test')

    await page.click("button[type='submit']");

    await page.fill('#DateField-day','11');
    //await expect(page.locator('.error-message')).toHaveText('The data entered is not valid for Date');
    await page.fill('#DateField-month','11');
    //await expect(page.locator('.error-message')).toHaveText('The data entered is not valid for Date');
    await page.fill('#DateField-year','1111');
    await expect(page.locator('.error-message')).toHaveText('The data entered is not valid for Date');

    await page.click("button[type='submit']");

    await page.isVisible("//a[normalize-space()='Date is not valid']");

  }

import { test, expect } from '@playwright/test';
import { userLogin } from "./steps/login-steps"

test('staff user details', async ({ page }) => {
  await userLogin(page, 'STAFF_ADMIN');

  console.log("Going to staff page");
  await expect(page.getByRole('link', { name: 'Staff' })).toBeVisible();
  await page.getByRole('link', { name: 'Staff' }).click();
  await expect(page.getByRole('heading', { name: 'User search' })).toBeVisible();

  console.log("Using user search");
  await page.locator('#main-content').getByRole('textbox').click();
  await page.locator('#main-content').getByRole('textbox').fill('xui');
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page.getByRole('columnheader', { name: 'Name' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'xui caseworker all services' })).toBeVisible();
  await page.getByRole('link', { name: 'xui caseworker all services' }).click();
  await expect(page.getByRole('heading', { name: 'User details' })).toBeVisible();
  await expect(page.getByText('Name')).toBeVisible();
  await expect(page.getByText('Email address')).toBeVisible();
  await expect(page.getByText('Service', { exact: true })).toBeVisible();
  await expect(page.getByText('User type')).toBeVisible();
  await expect(page.getByText('Status')).toBeVisible();
  expect(page.locator('dl')).toContainText('xui caseworker all services');
  await expect(page.locator('dl')).toContainText('Legal office');
});
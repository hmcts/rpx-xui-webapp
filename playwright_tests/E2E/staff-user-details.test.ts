import { test, expect } from '@playwright/test';
import config from "../config"
const testConfig = require('../../test_codecept/e2e/config/appTestConfig');

test('staff user details', async ({ page }) => {
  page.setDefaultTimeout(30000);
  await page.goto('https://manage-case.aat.platform.hmcts.net/');
  await expect(page.getByRole('heading', { name: 'Sign in or create an account' })).toBeVisible();
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill('xui_caseofficer@justice.gov.uk');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Welcome01');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('link', { name: 'Staff' })).toBeVisible();
  await page.getByRole('link', { name: 'Staff' }).click();
  await expect(page.getByRole('heading', { name: 'User search' })).toBeVisible();
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
  expect(page.locator('dl')).toContainText('xui_caseworker_aat@justice.gov.uk');
  await expect(page.locator('dl')).toContainText('Legal office');
  expect(page.locator('exui-staff-status')).toContainText('ACTIVE');
});
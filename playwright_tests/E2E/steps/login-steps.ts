import { expect } from '@playwright/test';
import config from "../../config"
const testConfig = require('../../../test_codecept/e2e/config/appTestConfig');

export async function userLogin(page: any,  userIdentifier: string) {
  const matchingUsers = testConfig.users[testConfig.testEnv].filter((user: any) => user.userIdentifier === userIdentifier);
  const email = matchingUsers[0].email;
  await page.goto(config.CaseBaseURL);
  await expect(page.getByRole('heading', { name: 'Sign in or create an account' })).toBeVisible();  
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill(email);
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill(matchingUsers[0].key);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByText('Sign out')).toBeVisible();
  console.log("Logged in as " + email);
}

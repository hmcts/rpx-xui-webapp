import { expect, type Page } from '@playwright/test';
import { applySessionCookies } from '../../common/sessionCapture';
import { buildHearingsUserDetailsMock } from '../mocks/hearings.mock';
import { dynamicFieldConfigCaseData } from '../mocks/dynamicFieldConfig.mock';

const CASE_TYPE = 'xuiTestJurisdiction';

export async function openDynamicFieldConfigJourney(page: Page): Promise<void> {
  await applySessionCookies(page, 'SOLICITOR');
  const userDetails = buildHearingsUserDetailsMock(['caseworker-divorce', 'caseworker-divorce-solicitor']);
  await page.addInitScript((seededUserInfo) => {
    window.sessionStorage.setItem('userDetails', JSON.stringify(seededUserInfo));
  }, userDetails.userInfo);

  await page.route('**/api/user/details*', async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(userDetails) });
  });
  await page.route(`**/data/internal/case-types/${CASE_TYPE}/event-triggers/createCase*`, async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(dynamicFieldConfigCaseData()) });
  });
  await page.route(`**/data/case-types/${CASE_TYPE}/validate*`, async (route) => {
    const requestBody = route.request().postDataJSON() as { data?: unknown } | undefined;
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: requestBody?.data ?? {}, _links: { self: { href: route.request().url() } } }),
    });
  });

  await page.goto(`/cases/case-create/DIVORCE/${CASE_TYPE}/createCase/`);
  await expect(page.getByLabel('Case title')).toBeVisible();
}

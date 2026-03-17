import { expect, test } from '../../../E2E/fixtures';
import { HEARINGS_LISTED_HEARING_ID, LISTED_HEARING_SCENARIO } from '../../mocks/hearings.mock';
import { HEARING_MANAGER_CR84_OFF_USER, hearingManagerRoles, openHearingsTab } from '../../helpers';

test.describe(
  `Hearings linked journey integration as ${HEARING_MANAGER_CR84_OFF_USER}`,
  { tag: ['@integration', '@integration-hearings'] },
  () => {
    test('links hearings and submits linked-group payload', async ({ page, caseDetailsPage, hearingsTabPage }) => {
      await openHearingsTab(page, caseDetailsPage, {
        userIdentifier: HEARING_MANAGER_CR84_OFF_USER,
        routeConfig: {
          userRoles: hearingManagerRoles,
          hearings: [{ ...LISTED_HEARING_SCENARIO, hearingIsLinkedFlag: true }],
        },
      });

      await hearingsTabPage.waitForReady(HEARINGS_LISTED_HEARING_ID);
      await page.locator(`#link-hearing-link-${HEARINGS_LISTED_HEARING_ID}`).click();

      await expect(page.getByRole('heading', { name: /which hearings should be linked\?/i })).toBeVisible();
      await page.locator('#linked-form input[type="radio"]').first().check();

      await page.getByRole('button', { name: /^continue$/i }).click();
      await expect(page.getByRole('heading', { name: /how should these linked hearings be heard\?/i })).toBeVisible();

      await page.locator('#particularOrder').check();
      const orderSelects = page.locator('select[id^="hearingsOrder"]');
      const orderCount = await orderSelects.count();
      for (let index = 0; index < orderCount; index += 1) {
        await orderSelects.nth(index).selectOption(String(index + 1));
      }

      await page.getByRole('button', { name: /^continue$/i }).click();
      await expect(page.getByRole('heading', { name: /check your answers/i })).toBeVisible();

      const linkedRequest = page.waitForRequest(
        (request) => request.url().includes('/api/hearings/postLinkedHearingGroup') && request.method() === 'POST'
      );
      await page.getByRole('button', { name: /link hearings/i }).click();

      const request = await linkedRequest;
      expect(request.postDataJSON()).toEqual(
        expect.objectContaining({
          groupDetails: expect.any(Object),
          hearingsInGroup: expect.any(Array),
        })
      );

      await expect(page).toHaveURL(/\/hearings\/link\/.*\/.*\/final-confirmation$/);
      await expect(page.getByRole('heading', { name: /(hearing is now linked|hearings are now linked)/i })).toBeVisible();
    });
  }
);

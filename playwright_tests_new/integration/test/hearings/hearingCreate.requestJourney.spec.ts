import { expect, test } from '../../../E2E/fixtures';
import { LISTED_HEARING_SCENARIO } from '../../mocks/hearings.mock';
import { HEARING_MANAGER_CR84_OFF_USER, hearingManagerRoles, openHearingsTab } from '../../helpers';

test.describe(
  `Hearings create request journey as ${HEARING_MANAGER_CR84_OFF_USER}`,
  { tag: ['@integration', '@integration-hearings'] },
  () => {
    test('covers the initial create-hearing workflow subset', async ({ page, caseDetailsPage }) => {
      await openHearingsTab(page, caseDetailsPage, {
        userIdentifier: HEARING_MANAGER_CR84_OFF_USER,
        routeConfig: {
          userRoles: hearingManagerRoles,
          hearings: [LISTED_HEARING_SCENARIO],
        },
      });

      await page.getByRole('button', { name: /request a hearing/i }).click();
      await expect(page.getByRole('heading', { name: /hearing requirements/i })).toBeVisible();

      await page.getByRole('button', { name: /^continue$/i }).click();
      await expect(page.getByRole('heading', { name: /do you require any additional facilities\?/i })).toBeVisible();
    });
  }
);

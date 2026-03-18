import { expect, test } from '../../../E2E/fixtures';
import { HEARINGS_LISTED_HEARING_ID, LISTED_HEARING_SCENARIO } from '../../mocks/hearings.mock';
import {
  continueHearingsFlow,
  HEARING_MANAGER_CR84_OFF_USER,
  hearingManagerRoles,
  openHearingsTab,
  selectOrderedLinkedHearings,
} from '../../helpers';

const expectedOrderedLinkedHearings = [
  { hearingId: 'h100001', hearingOrder: 1 },
  { hearingId: 'h100010', hearingOrder: 2 },
];

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
      await hearingsTabPage.openLinkHearing(HEARINGS_LISTED_HEARING_ID);

      await expect(page.getByRole('heading', { name: /which hearings should be linked\?/i })).toBeVisible();
      await selectOrderedLinkedHearings(page);
      await expect(page.getByRole('heading', { name: /how should these linked hearings be heard\?/i })).toBeVisible();
      await continueHearingsFlow(page);
      await expect(page.getByRole('heading', { name: /check your answers/i })).toBeVisible();
      const positionCells = page.locator('tbody.govuk-table__body td:nth-child(3)');
      await expect(positionCells.filter({ hasText: /^1$/ })).toHaveCount(1);
      await expect(positionCells.filter({ hasText: /^2$/ })).toHaveCount(1);
      await expect(positionCells.filter({ hasText: /^3$/ })).toHaveCount(0);

      const linkedRequest = page.waitForRequest(
        (request) => request.url().includes('/api/hearings/postLinkedHearingGroup') && request.method() === 'POST'
      );
      await page.getByRole('button', { name: /link hearings/i }).click();

      const request = await linkedRequest;
      const payload = request.postDataJSON();
      expect(payload.groupDetails).toEqual({
        groupLinkType: 'Ordered',
      });
      expect(payload.hearingsInGroup).toEqual(expectedOrderedLinkedHearings);

      await expect(page).toHaveURL(/\/hearings\/link\/.*\/.*\/final-confirmation$/);
      await expect(page.getByRole('heading', { name: /(hearing is now linked|hearings are now linked)/i })).toBeVisible();
    });

    test('shows server error and stays on check-your-answers when link hearings submit fails', async ({
      page,
      caseDetailsPage,
      hearingsTabPage,
    }) => {
      await openHearingsTab(page, caseDetailsPage, {
        userIdentifier: HEARING_MANAGER_CR84_OFF_USER,
        routeConfig: {
          userRoles: hearingManagerRoles,
          hearings: [{ ...LISTED_HEARING_SCENARIO, hearingIsLinkedFlag: true }],
          hearingsApiOverrides: {
            postLinkedHearingGroup: {
              status: 500,
              body: { message: 'linked-hearing-submit-failed' },
            },
          },
        },
      });

      await hearingsTabPage.waitForReady(HEARINGS_LISTED_HEARING_ID);
      await hearingsTabPage.openLinkHearing(HEARINGS_LISTED_HEARING_ID);
      await expect(page.getByRole('heading', { name: /which hearings should be linked\?/i })).toBeVisible();

      await selectOrderedLinkedHearings(page);
      await expect(page.getByRole('heading', { name: /how should these linked hearings be heard\?/i })).toBeVisible();
      await continueHearingsFlow(page);
      await expect(page.getByRole('heading', { name: /check your answers/i })).toBeVisible();

      const linkedFailureResponse = page.waitForResponse(
        (response) =>
          response.url().includes('/api/hearings/postLinkedHearingGroup') &&
          response.request().method() === 'POST' &&
          response.status() === 500
      );
      await page.getByRole('button', { name: /link hearings/i }).click();
      await linkedFailureResponse;

      await expect(page.getByRole('heading', { name: /check your answers/i })).toBeVisible();
      await expect(page.getByText('There is a problem')).toBeVisible();
      await expect(
        page.getByText('There was a system error and your request could not be processed. Please try again.')
      ).toBeVisible();
      await expect(page).not.toHaveURL(/\/hearings\/link\/.*\/.*\/final-confirmation$/);
    });
  }
);

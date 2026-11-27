import { expect, test } from '../../helpers/migrationTest.fixture';
import { openMigrationLinkedHearingReview } from '../../helpers/migrationHearingRoutes.helper';
import { MIGRATION_ORDERED_HEARINGS } from '../../mocks/migrationHearings.mock';

test(
  'linked-hearing failures retain the reviewed group and clear the error title after correction',
  { tag: ['@integration', '@integration-govuk-migration'] },
  async ({ page, migrationOrigin }) => {
    const state = await openMigrationLinkedHearingReview(page, migrationOrigin);
    const review = page.locator('exui-check-your-answers');
    await expect(review.getByRole('heading', { name: 'Check your answers', exact: true })).toBeVisible();
    const cleanTitle = await page.title();
    expect(cleanTitle).not.toMatch(/^Error:/);
    const dataRows = review.locator('tbody').getByRole('row');
    await expect(dataRows).toHaveCount(2);
    const reviewedHearingOrder: Array<{ hearingId: string; hearingOrder: number }> = [];
    for (const row of await dataRows.all()) {
      reviewedHearingOrder.push({
        hearingId: (await row.getByRole('cell').nth(2).innerText()).trim(),
        hearingOrder: Number(await row.getByRole('cell').nth(3).innerText()),
      });
    }
    expect(reviewedHearingOrder).toEqual(MIGRATION_ORDERED_HEARINGS);
    const reviewedRows = await review.getByRole('row').allTextContents();
    expect(reviewedRows).toHaveLength(3);

    for (let attempt = 1; attempt <= 2; attempt++) {
      const [failure] = await Promise.all([
        page.waitForResponse(
          (response) =>
            new URL(response.url()).origin === migrationOrigin &&
            new URL(response.url()).pathname === '/api/hearings/postLinkedHearingGroup' &&
            response.request().method() === 'POST'
        ),
        review.getByRole('button', { name: 'Link hearings', exact: true }).click(),
      ]);
      expect(failure.status()).toBe(500);
      await expect(review.getByRole('heading', { name: 'There is a problem', exact: true })).toBeVisible();
      await expect(page).toHaveTitle(`Error: ${cleanTitle}`);
      await expect(review.getByRole('row')).toHaveText(reviewedRows);
      expect(state.submissions).toHaveLength(attempt);
      const submittedGroup = state.submissions[attempt - 1].postDataJSON();
      expect(submittedGroup).toMatchObject({
        groupDetails: { groupLinkType: 'Ordered' },
      });
      expect(submittedGroup.hearingsInGroup).toEqual(reviewedHearingOrder);
    }
    await review.getByRole('link', { name: 'Back', exact: true }).click();
    await expect(page.getByRole('heading', { name: /how should these linked hearings be heard/i })).toBeVisible();
    await expect(page).toHaveTitle('HMCTS Hearings | Linked Hearings | Group Selection - HM Courts & Tribunals Service - GOV.UK');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await expect(review.getByRole('heading', { name: 'Check your answers', exact: true })).toBeVisible();
    await expect(review.getByRole('heading', { name: 'There is a problem', exact: true })).toHaveCount(0);
    await expect(page).toHaveTitle(cleanTitle);
    await expect(review.getByRole('row')).toHaveText(reviewedRows);
    state.allowSubmission();
    const [success] = await Promise.all([
      page.waitForResponse(
        (response) =>
          new URL(response.url()).origin === migrationOrigin &&
          new URL(response.url()).pathname === '/api/hearings/postLinkedHearingGroup' &&
          response.request().method() === 'POST'
      ),
      review.getByRole('button', { name: 'Link hearings', exact: true }).click(),
    ]);
    expect(success.status()).toBe(200);
    await expect(page.getByRole('heading', { name: /hearings? (?:is|are) now linked/i })).toBeVisible();
    await expect(page).toHaveTitle(
      'HMCTS Hearings | Linked Hearings | Final confirmation - HM Courts & Tribunals Service - GOV.UK'
    );
    expect(state.submissions).toHaveLength(3);
    expect(state.submissions[2].postDataJSON()).toEqual(state.submissions[0].postDataJSON());
  }
);

import { expect, test } from '@playwright/test';
import { HearingsJourneyPage } from '../../E2E/page-objects/pages/exui/hearingsJourney.po';
import { createHearingJourneyModel } from '../../E2E/testData/hearings/hearingJourneyScenarios';
import { hearingVenueSelectionMarkup } from '../../integration/mocks/hearing-venue-selection.mock';

test.describe('hearing venue autocomplete ownership', { tag: '@svc-internal' }, () => {
  test.use({ viewport: { width: 800, height: 480 }, actionTimeout: 1500 });

  test('selects the associated panel when an unrelated matching option is outside the viewport', async ({ page }) => {
    await page.setContent(hearingVenueSelectionMarkup({ stalePanel: true }));
    const stale = page.locator('#unrelated-options [role=option]');
    expect((await stale.boundingBox())!.y).toBeLessThan(0);
    await expect(stale).toBeVisible(); // Visibility alone does not imply click actionability.
    const selected = await new HearingsJourneyPage(page).setHearingVenue(createHearingJourneyModel());
    expect(selected).toBe('Basingstoke County Court');
    await expect(page.getByRole('link', { name: /^Click to remove:/ })).toHaveCount(2);
  });

  test('handles a modern associated panel rebuilt for each search keystroke', async ({ page }) => {
    await page.setContent(hearingVenueSelectionMarkup({ relation: 'aria-controls' }));
    expect(await new HearingsJourneyPage(page).setHearingVenue(createHearingJourneyModel())).toBe('Basingstoke County Court');
  });

  test('fails closed when the input has no associated panel', async ({ page }) => {
    await page.setContent(hearingVenueSelectionMarkup({ missingAssociation: true }));
    await expect(new HearingsJourneyPage(page).setHearingVenue(createHearingJourneyModel())).rejects.toThrow(
      'Hearing venue input did not expose an associated autocomplete panel.'
    );
    await expect(page.getByRole('link', { name: /^Click to remove:/ })).toHaveCount(1);
  });

  test('scrolls an already focused input into view before opening the results', async ({ page }) => {
    await page.setContent(hearingVenueSelectionMarkup({ focusedOffscreen: true }));
    expect(await page.locator('#searchVenueLocation').evaluate((input) => document.activeElement === input)).toBe(true);
    expect((await page.locator('#searchVenueLocation').boundingBox())!.y).toBeGreaterThan(480);
    expect(await new HearingsJourneyPage(page).setHearingVenue(createHearingJourneyModel())).toBe('Basingstoke County Court');
  });

  test('reports associated no-results rather than clicking an unrelated matching option', async ({ page }) => {
    test.setTimeout(35_000); // Preserve the helper's bounded 30-second wait for a matching search response.
    await page.setContent(hearingVenueSelectionMarkup({ noResults: true, stalePanel: true }));
    await expect(new HearingsJourneyPage(page).setHearingVenue(createHearingJourneyModel())).rejects.toThrow(
      'Location search for "Basingstoke" returned "No results found".'
    );
    await expect(page.getByRole('link', { name: /^Click to remove:/ })).toHaveCount(1);
  });

  test('ignores another panel reporting no results when the associated venue is available', async ({ page }) => {
    await page.setContent(hearingVenueSelectionMarkup({ unrelatedNoResults: true }));
    expect(await new HearingsJourneyPage(page).setHearingVenue(createHearingJourneyModel())).toBe('Basingstoke County Court');
  });

  test('waits through a previous empty response until the current venue result arrives', async ({ page }) => {
    await page.setContent(hearingVenueSelectionMarkup({ delayedResults: true }));
    expect(await new HearingsJourneyPage(page).setHearingVenue(createHearingJourneyModel())).toBe('Basingstoke County Court');
  });

  test('still rejects an added tag that does not match the requested venue', async ({ page }) => {
    await page.setContent(hearingVenueSelectionMarkup({ wrongSelection: true }));
    await expect(new HearingsJourneyPage(page).setHearingVenue(createHearingJourneyModel())).rejects.toThrow(
      'but the page added "Different court"'
    );
  });
});

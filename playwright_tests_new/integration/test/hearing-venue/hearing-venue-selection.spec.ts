import { expect, test } from '@playwright/test';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { HearingsJourneyPage } from '../../../E2E/page-objects/pages/exui/hearingsJourney.po';
import { createHearingJourneyModel } from '../../../E2E/testData/hearings/hearingJourneyScenarios';

let fixture: string;
test.beforeAll(async () => {
  const require = createRequire(import.meta.url);
  const result = await build({
    entryPoints: [fileURLToPath(new URL('../../mocks/hearing-venue/material.fixture.ts', import.meta.url))],
    bundle: true,
    write: false,
    platform: 'browser',
    format: 'iife',
    // Resolve this checkout's installed packages, including in a workspace with a parent PnP manifest.
    plugins: [
      {
        name: 'installed-dependencies',
        setup(builder) {
          builder.onResolve({ filter: /^[^./]/ }, (args) => ({ path: require.resolve(args.path) }));
        },
      },
    ],
  });
  fixture = result.outputFiles[0].text;
});

test.describe('real hearing venue Material selection', { tag: ['@integration', '@integration-hearings'] }, () => {
  test.use({ viewport: { width: 800, height: 480 }, actionTimeout: 1500 });
  for (const offscreen of [false, true]) {
    test(`preserves seeded and exact selected venue with panel ${offscreen ? 'offscreen' : 'onscreen'}`, async ({ page }) => {
      await page.setContent('<venue-fixture></venue-fixture>');
      await page.addScriptTag({ content: fixture });
      if (offscreen) {
        // Reproduce the retained failure: the input owns a visible but unclickable offscreen option.
        await page.addStyleTag({ content: '.cdk-overlay-pane { position: fixed !important; top: -2000px !important; }' });
      }
      const result = await new HearingsJourneyPage(page).setHearingVenue(createHearingJourneyModel());
      expect(result).toBe('Basingstoke County Court');
      await expect(page.getByRole('link', { name: /^Click to remove:/ })).toHaveCount(2);
      await expect(page.locator('[data-venue-id="seed"]')).toHaveText('Click to remove: Seeded Court');
      await expect(page.locator('[data-venue-id="target"]')).toHaveText('Click to remove: Basingstoke County Court');
      await expect(page.locator('[data-venue-id="other"]')).toHaveCount(0);
    });
  }
  test('rejects an added venue that shares the search prefix but is not the selected option', async ({ page }) => {
    await page.setContent('<body data-wrong-venue="true"><venue-fixture></venue-fixture></body>');
    await page.addScriptTag({ content: fixture });
    await expect(new HearingsJourneyPage(page).setHearingVenue(createHearingJourneyModel())).rejects.toThrow(
      'but the page added "Basingstoke Different Court"'
    );
    await expect(page.locator('[data-venue-id="seed"]')).toHaveText('Click to remove: Seeded Court');
  });
  test('does not press Enter when the active option is a different court', async ({ page }) => {
    await page.setContent('<body data-wrong-active="true"><venue-fixture></venue-fixture></body>');
    await page.addScriptTag({ content: fixture });
    await expect(new HearingsJourneyPage(page).setHearingVenue(createHearingJourneyModel())).rejects.toThrow(
      'aria-activedescendant'
    );
    await expect(page.getByRole('link', { name: /^Click to remove:/ })).toHaveCount(1);
  });
});

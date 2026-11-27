import { expect, test } from '@playwright/test';
import { mockMigrationRequest } from '../../helpers/migrationVisualRoutes.helper';
import { measureControlFit } from '../../helpers/migrationVisualChecks.helper';

test(
  'a visible button clipped by a container fails the control-fit check',
  { tag: ['@integration', '@integration-govuk-migration'] },
  async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 600 });
    await page.setContent(`
    <main style="width: 150px; overflow: clip">
      <button style="margin-left: 140px;">Continue</button>
    </main>`);
    const button = page.getByRole('button', { name: 'Continue' });
    await expect(button).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
    expect(await measureControlFit(button)).toMatchObject({ fits: false });
    await button.evaluate((element) => element.removeAttribute('style'));
    expect(await measureControlFit(button)).toMatchObject({ fits: true });
  }
);

test(
  'a migration mock fulfils only its configured origin and method',
  { tag: ['@integration', '@integration-govuk-migration'] },
  async ({ page }) => {
    const origin = 'http://127.0.0.1:1';
    const otherOrigin = 'http://127.0.0.1:2';
    await page.route('**/*', (route) => route.abort('blockedbyclient'));
    await page.route(origin + '/', (route) => route.fulfill({ contentType: 'text/html', body: '<main>Fixture</main>' }));
    await mockMigrationRequest(page, origin, 'GET', '/api/example', (route) => route.fulfill({ json: { matched: true } }));

    await page.goto(origin + '/');
    const valid = await page.evaluate(() => fetch('/api/example').then((response) => response.json()));
    expect(valid).toEqual({ matched: true });
    expect(
      await page.evaluate(() =>
        fetch('/api/example', { method: 'POST' }).then(
          () => 'fulfilled',
          () => 'blocked'
        )
      )
    ).toBe('blocked');
    expect(
      await page.evaluate(
        (url) =>
          fetch(url + '/api/example', { mode: 'no-cors' }).then(
            () => 'fulfilled',
            () => 'blocked'
          ),
        otherOrigin
      )
    ).toBe('blocked');
  }
);

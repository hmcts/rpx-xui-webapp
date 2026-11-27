import { expect, test } from '../../helpers/migrationTest.fixture';
import { captureMigrationState } from '../../helpers/migrationStateEvidence.helper';
import { measureControlFit } from '../../helpers/migrationVisualChecks.helper';
import { setupMigrationVisualRoutes } from '../../helpers/migrationVisualRoutes.helper';

const states = [
  { path: '/cookies', heading: 'Cookies', content: /How cookies are used in this service/ },
  { path: '/service-down', heading: 'Sorry, there is a problem with the service', content: /try again/i },
  { path: '/not-authorised', heading: "Sorry, you're not authorised to perform this action", content: /not authorised/i },
] as const;

for (const width of [1280, 320]) {
  test.describe(`Shared pages at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });

    for (const { path, heading, content } of states) {
      test(
        `${path} shows the intended page and usable shared navigation`,
        { tag: ['@integration', '@integration-govuk-migration'] },
        async ({ page }, testInfo) => {
          await setupMigrationVisualRoutes(page, ['caseworker-cmc']);
          await page.goto(path);
          await expect(page.getByRole('heading', { level: 1, name: heading, exact: true })).toBeVisible();
          await expect(page.getByRole('main')).toContainText(content);
          await expect(page.getByRole('link', { name: 'Case list', exact: true })).toHaveAttribute('href', /\/cases$/);
          const state = await captureMigrationState(page, testInfo);
          expect.soft(state.documentWidth, 'Shared page should fit the viewport').toBeLessThanOrEqual(width + 1);
          const input = page.locator('#exuiCaseReferenceSearch');
          const find = page.getByRole('button', { name: 'Find', exact: true });
          for (const [name, control] of [
            ['case-reference input', input],
            ['Find button', find],
          ] as const) {
            await expect(control).toBeVisible();
            expect
              .soft(await measureControlFit(control), `Header ${name} should fit without clipping`)
              .toMatchObject({ fits: true });
          }
          expect.soft(state.violations).toEqual([]);
        }
      );
    }
  });
}

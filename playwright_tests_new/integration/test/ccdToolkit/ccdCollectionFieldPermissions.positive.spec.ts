import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { CCD_COLLECTION_FIELD_PERMISSIONS_PEOPLE_VALUE, CCD_COLLECTION_PERMISSION_SCENARIOS, TEST_USERS } from '../../testData';
import { divorcePocCaseData } from '../../mocks/createCase.mock';

const userIdentifier = TEST_USERS.SOLICITOR;
const jurisdiction = 'DIVORCE';
const caseType = 'xuiTestJurisdiction';

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);
});

test.describe(
  'CCD toolkit collection field permissions',
  {
    tag: ['@integration', '@integration-create-case', '@integration-ccd-toolkit'],
  },
  () => {
    for (const scenario of CCD_COLLECTION_PERMISSION_SCENARIOS) {
      test(`renders Add and Remove state for ${scenario.displayContextParameter ?? 'null'} display_context_parameter`, async ({
        page,
        createCasePage,
      }) => {
        await test.step('Mock create-case routes for the collection display context', async () => {
          await page.route(`**/data/case-types/${caseType}/validate*`, async (route) => {
            const requestBody = route.request().postDataJSON?.() as { data?: unknown } | undefined;

            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify({
                data: requestBody?.data ?? {},
                _links: {
                  self: {
                    href: route.request().url(),
                  },
                },
              }),
            });
          });
          await page.route(`**/data/internal/case-types/${caseType}/event-triggers/createCase*`, async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(
                divorcePocCaseData({
                  peopleDisplayContextParameter: scenario.displayContextParameter,
                  peopleValue: CCD_COLLECTION_FIELD_PERMISSIONS_PEOPLE_VALUE,
                })
              ),
            });
          });
        });

        await test.step('Open the create-case form', async () => {
          await page.goto(`/cases/case-create/${jurisdiction}/${caseType}/createCase/`);
          await createCasePage.waitForCreateCaseFormReady('CCD collection permissions setup');
        });

        await test.step('Verify collection Add and Remove states', async () => {
          const addButton = createCasePage.addNewPersonButton.first();
          const removeButton = createCasePage.additionalPeople.getByRole('button', { name: /Remove/ }).first();

          await expect(addButton).toBeVisible();
          await expect(removeButton).toBeVisible();

          if (scenario.addEnabled) {
            await expect(addButton).toBeEnabled();
          } else {
            await expect(addButton).toBeDisabled();
          }

          if (scenario.removeEnabled) {
            await expect(removeButton).toBeEnabled();
          } else {
            await expect(removeButton).toBeDisabled();
          }
        });
      });
    }
  }
);

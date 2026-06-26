import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { TEST_USERS } from '../../testData';
import { divorcePocCaseData } from '../../mocks/createCase.mock';

const userIdentifier = TEST_USERS.SOLICITOR;
const jurisdiction = 'DIVORCE';
const caseType = 'xuiTestJurisdiction';

const collectionPermissionScenarios = [
  {
    displayContextParameter: null,
    addEnabled: false,
    removeEnabled: false,
  },
  {
    displayContextParameter: '#COLLECTION(allowInsert,allowDelete)',
    addEnabled: true,
    removeEnabled: true,
  },
  {
    displayContextParameter: '#COLLECTION(allowInsert)',
    addEnabled: true,
    removeEnabled: false,
  },
  {
    displayContextParameter: '#COLLECTION(allowDelete)',
    addEnabled: false,
    removeEnabled: true,
  },
  {
    displayContextParameter: '#TABLE(AddressLine1,AddressLine2),#COLLECTION(allowInsert,allowDelete)',
    addEnabled: true,
    removeEnabled: true,
  },
  {
    displayContextParameter: '#COLLECTION()',
    addEnabled: false,
    removeEnabled: false,
  },
] as const;

const peopleValue = [
  {
    id: 'ccd-collection-field-permissions-person',
    value: {
      Title: 'Ms',
      FirstName: 'Ada',
      LastName: 'Lovelace',
      PersonGender: 'female',
      PersonJob: {
        Title: 'Engineer',
        Description: 'Builds reliable tests',
      },
    },
  },
];

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);
});

test.describe(
  'CCD toolkit collection field permissions',
  {
    tag: ['@integration', '@integration-create-case', '@integration-ccd-toolkit'],
  },
  () => {
    for (const scenario of collectionPermissionScenarios) {
      test(`renders Add and Remove state for ${scenario.displayContextParameter ?? 'null'} display_context_parameter`, async ({
        page,
        createCasePage,
      }) => {
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
                peopleValue,
              })
            ),
          });
        });

        await page.goto(`/cases/case-create/${jurisdiction}/${caseType}/createCase/`);
        await createCasePage.waitForCreateCaseFormReady('CCD collection permissions setup');

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
    }
  }
);

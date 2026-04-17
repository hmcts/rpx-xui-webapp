import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { setupNgIntegrationToolkitCreateCaseRoutes } from '../../helpers';
import {
  buildNgIntegrationCollectionPermissionsEvent,
  NG_INTEGRATION_CASE_TYPE,
  NG_INTEGRATION_EVENT_ID,
  NG_INTEGRATION_JURISDICTION,
} from '../../mocks/ngIntegration.mock';

const CASE_EDIT_URL = `/cases/case-create/${NG_INTEGRATION_JURISDICTION}/${NG_INTEGRATION_CASE_TYPE}/${NG_INTEGRATION_EVENT_ID}/page1`;

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

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, 'STAFF_ADMIN');
});

test.describe(
  'ngIntegration collection field permission parity',
  { tag: ['@integration', '@integration-platform-services'] },
  () => {
    for (const scenario of collectionPermissionScenarios) {
      test(`renders collection buttons for ${scenario.displayContextParameter ?? 'null'} display_context_parameter`, async ({
        page,
      }) => {
        await setupNgIntegrationToolkitCreateCaseRoutes(
          page,
          buildNgIntegrationCollectionPermissionsEvent(scenario.displayContextParameter)
        );

        await page.goto(CASE_EDIT_URL);
        await expect(page.locator('ccd-case-edit-page')).toBeVisible();

        const collectionField = page.locator('#textCollection');
        const addNewButton = collectionField.getByRole('button', { name: 'Add new', exact: true }).first();
        const removeButton = collectionField.getByRole('button', { name: /Remove/ }).first();

        await expect(addNewButton).toBeVisible();
        await expect(removeButton).toBeVisible();

        if (scenario.addEnabled) {
          await expect(addNewButton).toBeEnabled();
        } else {
          await expect(addNewButton).toBeDisabled();
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

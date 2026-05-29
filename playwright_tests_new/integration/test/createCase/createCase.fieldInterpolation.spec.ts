import { expect, test } from '../../../E2E/fixtures';
import { applySessionCookies } from '../../../common/sessionCapture';
import { interpolatedMandatoryComplexCaseData } from '../../mocks/createCase.mock';
import { TEST_USERS } from '../../testData';

const userIdentifier = TEST_USERS.SOLICITOR;
const jurisdiction = 'DIVORCE';
const caseType = 'xuiTestJurisdiction';
const expectedInterpolatedLabel = 'Is this order ready to be sealed and issued';

test.describe(
  `Create case field interpolation as ${userIdentifier}`,
  { tag: ['@integration', '@integration-create-case'] },
  () => {
    test.beforeEach(async ({ page }) => {
      await applySessionCookies(page, userIdentifier);

      await page.route(`**/data/case-types/${caseType}/validate*`, async (route) => {
        const request = route.request();
        const requestBody = request.postDataJSON?.() as { data?: unknown } | undefined;
        const responseBody = {
          data: requestBody?.data ?? {},
          _links: {
            self: {
              href: request.url(),
            },
          },
        };

        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(responseBody),
        });
      });

      await page.route(`**/data/internal/case-types/${caseType}/event-triggers/createCase*`, async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(interpolatedMandatoryComplexCaseData()),
        });
      });

      await page.goto(`/cases/case-create/${jurisdiction}/${caseType}/createCase/`);
      await expect(page.locator('#judgeApproval1')).toBeVisible();
    });

    test('Interpolates complex child labels in required validation and check your answers', async ({
      createCasePage,
      page,
    }) => {
      await test.step('Verify the complex child label is resolved on the event page', async () => {
        await expect(page.getByText(expectedInterpolatedLabel)).toBeVisible();
        await expect(page.getByText('${judgeApproval1.inlineDocType}')).toHaveCount(0);
      });

      await test.step('Submit the page without answering the mandatory child field', async () => {
        await createCasePage.continueButton.click();

        await expect(createCasePage.validationErrorMessage).toHaveText(`${expectedInterpolatedLabel} is required`);
        await expect(createCasePage.validationErrorMessage).not.toContainText('${judgeApproval1.inlineDocType}');
      });

      await test.step('Answer the mandatory child field and continue to check your answers', async () => {
        await page.locator('#judgeApproval1_isReady_Yes').check();
        await createCasePage.clickContinueAndWaitForNext('after answering the interpolated mandatory complex child field');

        await expect(createCasePage.checkYourAnswersHeading).toContainText('Check your answers');
        await expect(createCasePage.checkYourAnswers).toContainText(expectedInterpolatedLabel);
        await expect(createCasePage.checkYourAnswers).not.toContainText('${judgeApproval1.inlineDocType}');
      });
    });
  }
);

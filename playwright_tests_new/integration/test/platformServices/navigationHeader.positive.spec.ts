import { expect, test } from '../../../E2E/fixtures';
import { platformServicesHeaderScenarios, setupPlatformServicesCaseListRoutes, visibleNavigationTexts } from '../../helpers';

test.describe('platform services header parity', { tag: ['@integration', '@integration-platform-services'] }, () => {
  for (const scenario of platformServicesHeaderScenarios) {
    test(`renders ${scenario.name}`, async ({ caseListPage, page }) => {
      await setupPlatformServicesCaseListRoutes(page, {
        userId: scenario.userIdentifier,
        roles: [...scenario.roles],
      });

      await caseListPage.navigateTo();
      await expect(caseListPage.exuiHeader.header).toBeVisible();

      const leftNavigationTexts = await visibleNavigationTexts(
        page.locator('.hmcts-primary-navigation__nav .hmcts-primary-navigation__link')
      );
      const rightNavigationTexts = await visibleNavigationTexts(
        page.locator('.hmcts-primary-navigation__search a.hmcts-primary-navigation__link')
      );

      expect(leftNavigationTexts).toEqual(scenario.expectedLeft);
      expect(rightNavigationTexts).toEqual(scenario.expectedRight);

      if (scenario.quickSearchVisible) {
        await expect(caseListPage.quickSearchCaseReferenceInput).toBeVisible();
      } else {
        await expect(caseListPage.quickSearchCaseReferenceInput).toBeHidden();
      }
    });
  }
});
